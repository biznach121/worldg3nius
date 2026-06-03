import Link from "next/link";
import type { Collection, Product } from "@cimplify/sdk";
import { StoreProductCard } from "./store-product-card";

interface CollectionStripProps {
  collection: Collection;
  products: Product[];
  collectionHref?: string;
}

/**
 * Horizontal strip of products under a collection title. Cards come from the
 * SDK so every variant (Food, Bundle, Composite, Service, …) renders
 * correctly; clicks open the shared URL-driven product modal.
 */
export function CollectionStrip({ collection, products, collectionHref }: CollectionStripProps) {
  if (products.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12">
      <header className="grid grid-cols-[1fr_auto] items-end gap-4 mb-5">
        <h2 className="font-serif text-[28px] font-semibold m-0">{collection.name}</h2>
        {collectionHref && (
          <Link
            href={collectionHref}
            className="text-[13px] font-semibold text-black transition-opacity hover:opacity-60"
          >
            See all →
          </Link>
        )}
        {collection.description && (
          <p className="col-span-full m-0 mt-1 text-sm text-muted-foreground">
            {collection.description}
          </p>
        )}
      </header>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <div key={p.id} className="h-full min-w-0">
            <StoreProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
