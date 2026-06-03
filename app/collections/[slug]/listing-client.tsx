"use client";

import { ProductGrid } from "@cimplify/sdk/react";
import type { Product } from "@cimplify/sdk";
import { EmptyProductState } from "@/components/empty-product-state";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the collection listing. Receives server-fetched
 * products as props (serializable) and owns the `renderCard` function
 * (which can't cross the server/client boundary).
 */
export function ListingClient({
  products,
  collectionName,
}: {
  products: Product[];
  collectionName: string;
}) {
  if (products.length === 0) {
    return (
      <EmptyProductState
        label={`${collectionName} is off rack`}
        detail="This collection has no live pieces right now. The next WORLD G3NIUS edit is being prepared."
      />
    );
  }

  return (
    <ProductGrid
      products={products}
      columns={{ sm: 2, md: 3, lg: 4, xl: 4 }}
      emptyMessage=""
      renderCard={(p) => <StoreProductCard product={p} />}
    />
  );
}
