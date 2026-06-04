"use client";

import { useMemo, useState } from "react";
import {
  DefaultSearchLayout,
  ProductGrid,
  SearchPage,
  type SearchLayoutProps,
} from "@cimplify/sdk/react";
import { StoreProductCard } from "@/components/store-product-card";
import { demoProducts, shouldUseDemoCatalogue } from "@/lib/demo-catalogue";

function FourUpSearchLayout(props: SearchLayoutProps) {
  return (
    <DefaultSearchLayout
      {...props}
      className={["wg-four-up-product-grid", props.className].filter(Boolean).join(" ")}
    />
  );
}

export function SearchClient() {
  const [query, setQuery] = useState("");
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return demoProducts;
    return demoProducts.filter((product) =>
      [
        product.name,
        product.description,
        ...(product.tags ?? []),
        product.category?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  if (shouldUseDemoCatalogue()) {
    return (
      <section>
        <form
          className="relative mb-8 flex min-h-14 max-w-xl items-center border border-black bg-white text-black"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <label htmlFor="demo-search" className="sr-only">
            Search products
          </label>
          <input
            id="demo-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search demo products..."
            className="h-14 min-w-0 flex-1 bg-transparent px-4 font-display text-sm uppercase outline-none placeholder:text-black/35 sm:text-lg"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mr-2 grid h-10 w-10 place-items-center border border-black/10 text-lg transition-colors hover:bg-black hover:text-white"
              aria-label="Clear search"
            >
              x
            </button>
          ) : null}
        </form>
        <ProductGrid
          products={filteredProducts}
          columns={{ sm: 1, md: 2, lg: 4, xl: 4 }}
          emptyMessage="No demo products matched that search."
          renderCard={(product) => <StoreProductCard product={product} />}
        />
      </section>
    );
  }

  return (
    <SearchPage
      layouts={{ default: FourUpSearchLayout }}
      renderCard={(product) => <StoreProductCard product={product} />}
    />
  );
}
