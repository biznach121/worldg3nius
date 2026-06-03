"use client";

import Image from "next/image";
import Link from "next/link";
import { Price } from "@cimplify/sdk/react";
import type { CardVariant } from "@cimplify/sdk/react";
import type { CurrencyCode, Product, VariantView } from "@cimplify/sdk";
import { brand } from "@/lib/brand";

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

function firstImage(product: Product): string | undefined {
  return product.image_url || product.images?.[0];
}

function stripDescription(description?: string) {
  if (!description) return "";
  return description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

/**
 * Fashion-first product card for WORLD G3NIUS. The product page remains the
 * source of truth for variant matching and cart payload assembly.
 */
export function StoreProductCard({ product }: Props) {
  const slug = product.slug || product.id;
  const href = `/products/${encodeURIComponent(slug)}`;
  const image = firstImage(product);
  const sizes = productSizes(product as ProductWithVariantPreview);
  const description = stripDescription(product.description);
  const inStock = product.inventory_status?.in_stock ?? true;

  return (
    <article className="group relative min-w-0 bg-white text-black">
      <div className="relative overflow-hidden border border-black/10 bg-[oklch(0.94_0_0)]">
        <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
        </Link>

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
                <Link
                  key={size}
                  href={`${href}?size=${encodeURIComponent(size)}`}
                  className="grid h-9 place-items-center border border-white/30 text-[11px] font-bold uppercase text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={`View ${product.name} in size ${size}`}
                >
                  {size}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-2 border-x border-b border-black/10 bg-white p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={href}
            className="min-w-0 font-display text-[clamp(1.45rem,3vw,2rem)] uppercase leading-[0.86] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {product.name}
          </Link>
          <Price
            amount={product.default_price}
            currency={brand.currency as CurrencyCode}
            className="shrink-0 pt-0.5 text-sm font-black tabular-nums"
          />
        </div>
        {description ? (
          <p className="line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-black/58">
            {description}
          </p>
        ) : (
          <p className="min-h-[2.5rem] text-xs uppercase tracking-[0.14em] text-black/42">
            Limited run street uniform.
          </p>
        )}
        <div className="flex items-center justify-between border-t border-black/10 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            XS-2XL
          </span>
          <Link
            href={href}
            className="text-[11px] font-black uppercase tracking-[0.16em] text-black transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
