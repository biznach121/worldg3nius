"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Price, useCart, useCartDrawer } from "@cimplify/sdk/react";
import type { AddToCartOptions, CardVariant } from "@cimplify/sdk/react";
import type { CurrencyCode, Product, VariantView } from "@cimplify/sdk";
import { brand } from "@/lib/brand";
import { getProductImage } from "@/lib/product-images";

const FALLBACK_SIZES = ["XS", "S", "M", "L", "XL"];
const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

interface Props {
  product: Product;
  /** Kept for compatibility with SDK renderCard call sites. */
  variant?: CardVariant;
}

type ProductWithVariantPreview = Product & {
  variants?: VariantView[];
};

function normalizeSize(size: string) {
  return size.trim().toUpperCase();
}

function productSizes(product: ProductWithVariantPreview) {
  const sizes = new Map<string, string>();

  for (const variant of product.variants ?? []) {
    const displaySize = variant.display_attributes?.find((attr) =>
      attr.axis_name.toLowerCase().includes("size"),
    )?.value_name;
    const axisSize = Object.entries(variant.axis_selections ?? {}).find(([axis]) =>
      axis.toLowerCase().includes("size"),
    )?.[1];
    const size = displaySize || axisSize;
    if (size) sizes.set(normalizeSize(size), size);
  }

  const metadataSizes = product.metadata?.sizes;
  if (Array.isArray(metadataSizes)) {
    for (const size of metadataSizes) {
      if (typeof size === "string") sizes.set(normalizeSize(size), size);
    }
  }

  const values = sizes.size > 0 ? Array.from(sizes.values()) : FALLBACK_SIZES;
  return values.sort((a, b) => {
    const aIndex = SIZE_ORDER.indexOf(normalizeSize(a));
    const bIndex = SIZE_ORDER.indexOf(normalizeSize(b));
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

function variantSize(variant: VariantView) {
  const displaySize = variant.display_attributes?.find((attr) =>
    attr.axis_name.toLowerCase().includes("size"),
  )?.value_name;
  const axisSize = Object.entries(variant.axis_selections ?? {}).find(([axis]) =>
    axis.toLowerCase().includes("size"),
  )?.[1];
  return displaySize || axisSize;
}

function findSizeVariant(product: ProductWithVariantPreview, size: string) {
  const normalized = normalizeSize(size);
  return product.variants?.find((variant) => {
    const candidate = variantSize(variant);
    return candidate && normalizeSize(candidate) === normalized;
  });
}

/**
 * Fashion-first product card for WORLD G3NIUS. The product page remains the
 * source of truth for variant matching and cart payload assembly.
 */
export function StoreProductCard({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const { open } = useCartDrawer();
  const [addingSize, setAddingSize] = useState<string | null>(null);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const [failedSize, setFailedSize] = useState<string | null>(null);
  const slug = product.slug || product.id;
  const href = `/products/${encodeURIComponent(slug)}`;
  const image = getProductImage(product);
  const productWithVariants = product as ProductWithVariantPreview;
  const sizes = productSizes(productWithVariants);
  const inStock = product.inventory_status?.in_stock ?? true;

  function goToDetails() {
    router.push(href);
  }

  async function quickAddSize(size: string) {
    const variant = findSizeVariant(productWithVariants, size);
    const options: AddToCartOptions = variant
      ? {
          variantId: variant.id,
          variant: {
            id: variant.id,
            name: variant.name || size,
            price_adjustment: variant.price_adjustment,
          },
        }
      : {};

    setAddingSize(size);
    setFailedSize(null);

    try {
      await addItem(product, 1, options);
      setAddedSize(size);
      open();
      window.setTimeout(() => setAddedSize((current) => (current === size ? null : current)), 1600);
    } catch {
      setFailedSize(size);
    } finally {
      setAddingSize((current) => (current === size ? null : current));
    }
  }

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onClick={goToDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToDetails();
        }
      }}
      className="group relative flex h-full min-w-0 cursor-pointer flex-col bg-white text-black"
    >
      <div className="relative flex-none overflow-hidden border border-black/10 bg-[oklch(0.94_0_0)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:contrast-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-black text-center font-display text-3xl uppercase leading-none text-white">
              WG3
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black shadow-sm">
            New
          </span>
          {!inStock ? (
            <span className="bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
              Sold out
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="border border-white/28 bg-black/82 p-3 text-white shadow-2xl backdrop-blur-md">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Select size
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  type="button"
                  disabled={!inStock || addingSize === size}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    void quickAddSize(size);
                  }}
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                  className="grid h-9 place-items-center border border-white/30 text-[11px] font-bold uppercase text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label={`Add ${product.name} in size ${size} to cart`}
                >
                  {addingSize === size ? "..." : addedSize === size ? "OK" : size}
                </button>
              ))}
            </div>
            {failedSize ? (
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/70">
                Open details for size {failedSize}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex min-h-[5.75rem] flex-1 flex-col justify-center border-x border-b border-black/10 bg-white p-3 sm:min-h-[6.25rem] sm:p-4">
        <div className="grid min-h-[4.4rem] grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h3 className="m-0 line-clamp-2 min-w-0 font-display text-[1.55rem] uppercase leading-[0.88] transition-colors group-hover:text-foreground/70 sm:text-[1.8rem]">
            {product.name}
          </h3>
          <Price
            amount={product.default_price}
            currency={brand.currency as CurrencyCode}
            className="shrink-0 pt-0.5 text-sm font-black tabular-nums"
          />
        </div>
      </div>
    </article>
  );
}
