"use client";

import { ProductGrid } from "@cimplify/sdk/react";
import type { Product } from "@cimplify/sdk";
import { EmptyProductState } from "@/components/empty-product-state";
import { StoreProductCard } from "@/components/store-product-card";

/**
 * Client island for the category listing. Receives server-fetched products
 * as props (serializable) and owns the `renderCard` function.
 */
export function ListingClient({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  if (products.length === 0) {
    return (
      <EmptyProductState
        label={`${categoryName} is off rack`}
        detail="This category has no live pieces right now. The next WORLD G3NIUS run is being prepared."
      />
    );
  }

  return (
    <ProductGrid
      products={products}
      columns={{ sm: 1, md: 2, lg: 4, xl: 4 }}
      emptyMessage=""
      renderCard={(p) => <StoreProductCard product={p} />}
    />
  );
}
