"use client";

import { CataloguePage } from "@cimplify/sdk/react";
import type { Category, Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the shop page. Server-side fetches all products and
 * categories (ISR-cached in `app/shop/page.tsx`), then hands
 * them to `<CataloguePage>` which owns the interactive filter / sort state.
 *
 * The page hero (in `app/shop/page.tsx`) already provides the title; we
 * pass an empty `title` and override the SDK heading via className so the
 * page reads as one continuous design.
 */
export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <CataloguePage
      title="All products"
      products={products}
      categories={categories}
      renderCard={(p) => <StoreProductCard product={p} />}
      className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12"
    />
  );
}
