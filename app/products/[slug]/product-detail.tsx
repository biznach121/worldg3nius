"use client";

import Image from "next/image";
import { ProductPage as SdkProductPage, useCart } from "@cimplify/sdk/react";
import type { AddToCartOptions } from "@cimplify/sdk/react";
import type { Product, ProductWithDetails } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";
import { addDemoCartItem, openDemoCartDrawer } from "@/lib/demo-cart";
import { shouldUseDemoCatalogue } from "@/lib/demo-catalogue";
import { withProductImage } from "@/lib/product-images";

/**
 * Client island for the product detail page.
 *
 * - Receives a server-fetched `ProductWithDetails` (no client refetch).
 * - Renders the SDK `<ProductPage>` which picks the right layout
 *   (Default / Wholesale / Service / Bundle / Composite) automatically.
 * - On add-to-cart success, opens the side cart drawer.
 * - Custom Next.js Image renderer for optimised, lazy-loaded gallery shots.
 * - Renders a "You may also like" rail of in-category products below.
 */
export function ProductDetail({
  product,
  related,
}: {
  product: ProductWithDetails;
  related: Product[];
}) {
  return shouldUseDemoCatalogue() ? (
    <DemoProductDetail product={product} related={related} />
  ) : (
    <LiveProductDetail product={product} related={related} />
  );
}

function DemoProductDetail({
  product,
  related,
}: {
  product: ProductWithDetails;
  related: Product[];
}) {
  return (
    <ProductDetailView
      product={product}
      related={related}
      onAddToCart={async (p, qty, options) => {
        const variantName = options && "variant" in options ? options.variant?.name : undefined;
        addDemoCartItem(p, qty, variantName);
        openDemoCartDrawer();
      }}
    />
  );
}

function LiveProductDetail({
  product,
  related,
}: {
  product: ProductWithDetails;
  related: Product[];
}) {
  const { addItem } = useCart();
  return (
    <ProductDetailView
      product={product}
      related={related}
      onAddToCart={async (p, qty, options) => {
        await addItem(p, qty, options);
      }}
    />
  );
}

function ProductDetailView({
  product,
  related,
  onAddToCart,
}: {
  product: ProductWithDetails;
  related: Product[];
  onAddToCart: (
    product: ProductWithDetails,
    quantity: number,
    options: AddToCartOptions,
  ) => Promise<void>;
}) {
  const displayProduct = withProductImage(product);

  return (
    <>
      <SdkProductPage
        product={displayProduct}
        showRelated={false}
        onAddToCart={onAddToCart}
        renderImage={({ src, alt, className }) => (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className={className}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            priority
          />
        )}
        className="wg-product-detail-page max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10 font-display"
      />

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-16 border-t border-border mt-8">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-[11px] font-display uppercase tracking-[0.16em] text-foreground mb-2">
                You may also like
              </p>
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold m-0">
                More from this category.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <StoreProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
