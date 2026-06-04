"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { getProductImage } from "@/lib/product-images";

const STORAGE_KEY = "worldg3nius-demo-cart";
const CHANGE_EVENT = "worldg3nius-demo-cart-change";
const DRAWER_EVENT = "worldg3nius-demo-cart-drawer";

export type DemoCartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image?: string;
  price: number;
  currency: string;
  quantity: number;
  size?: string;
};

function readCart(): DemoCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(lines: DemoCartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function productPrice(product: Product) {
  const raw = product.default_price;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return Number(raw) || 0;
  return 0;
}

export function addDemoCartItem(product: Product, quantity = 1, size?: string) {
  const slug = product.slug || product.id;
  const key = [product.id, size ?? "one-size"].join(":");
  const lines = readCart();
  const existing = lines.find((line) => line.key === key);

  if (existing) {
    existing.quantity += quantity;
    writeCart(lines);
    return;
  }

  writeCart([
    ...lines,
    {
      key,
      productId: product.id,
      slug,
      name: product.name,
      image: getProductImage(product),
      price: productPrice(product),
      currency: brand.currency,
      quantity,
      size,
    },
  ]);
}

export function openDemoCartDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DRAWER_EVENT, { detail: { open: true } }));
}

export function closeDemoCartDrawer() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DRAWER_EVENT, { detail: { open: false } }));
}

export function useDemoCartDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);

  useEffect(() => {
    const sync = (event: Event) => {
      const nextOpen = (event as CustomEvent<{ open?: boolean }>).detail?.open;
      setIsOpen(nextOpen === undefined ? true : nextOpen);
    };
    window.addEventListener(DRAWER_EVENT, sync);
    return () => window.removeEventListener(DRAWER_EVENT, sync);
  }, []);

  return { isOpen, open, close, toggle };
}

export function useDemoCart() {
  const [lines, setLines] = useState<DemoCartLine[]>([]);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    const next = readCart()
      .map((line) => (line.key === key ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    writeCart(next);
  }, []);

  const remove = useCallback((key: string) => {
    writeCart(readCart().filter((line) => line.key !== key));
  }, []);

  const clear = useCallback(() => {
    writeCart([]);
  }, []);

  const count = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.price * line.quantity, 0),
    [lines],
  );

  return { lines, count, subtotal, setQuantity, remove, clear };
}
