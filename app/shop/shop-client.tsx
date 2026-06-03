"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@cimplify/sdk/react";
import type { Category, Product } from "@cimplify/sdk";
import { StoreProductCard } from "@/components/store-product-card";

type SortKey = "newest" | "name" | "price-asc" | "price-desc";

function productPrice(product: Product) {
  const raw = product.default_price;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return Number(raw) || 0;
  return 0;
}

function categoryName(product: Product, categories: Category[]) {
  return categories.find((category) => category.id === product.category_id)?.name ?? "";
}

function productSearchText(product: Product, categories: Category[]) {
  return [
    product.name,
    product.description,
    categoryName(product, categories),
    ...(product.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;
    const original = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersOpen]);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) + (inStockOnly ? 1 : 0) + (sort !== "newest" ? 1 : 0);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const next = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
      const matchesStock = !inStockOnly || product.inventory_status?.in_stock !== false;
      const matchesSearch =
        normalizedQuery.length === 0 || productSearchText(product, categories).includes(normalizedQuery);

      return matchesCategory && matchesStock && matchesSearch;
    });

    next.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "price-asc") return productPrice(a) - productPrice(b);
      if (sort === "price-desc") return productPrice(b) - productPrice(a);
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });

    return next;
  }, [categories, inStockOnly, products, query, selectedCategory, sort]);

  function resetFilters() {
    setSelectedCategory("all");
    setInStockOnly(false);
    setSort("newest");
  }

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
      <div className="mb-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <form
          className="relative flex min-h-14 flex-1 items-center border border-black bg-white text-black"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className="ml-4 h-5 w-5 shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id="shop-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jerseys, bags, tees..."
            className="h-14 min-w-0 flex-1 bg-transparent px-4 font-display text-base uppercase outline-none placeholder:text-black/35 sm:text-lg"
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

        <div className="flex items-center gap-3">
          <p className="m-0 text-sm uppercase text-muted-foreground">
            {filteredProducts.length} / {products.length}
          </p>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-14 items-center gap-3 border border-black bg-black px-5 font-display text-sm uppercase text-white transition-colors hover:bg-white hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M4 7h16" />
              <path d="M7 12h10" />
              <path d="M10 17h4" />
            </svg>
            Filters
            {activeFilterCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center bg-white px-1.5 text-[11px] text-black">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <ProductGrid
        products={filteredProducts}
        columns={{ sm: 2, md: 3, lg: 4, xl: 4 }}
        emptyMessage="No products matched that search."
        renderCard={(product) => <StoreProductCard product={product} />}
      />

      {filtersOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shop filters"
          className="fixed inset-0 z-[110] bg-black/45"
          onClick={() => setFiltersOpen(false)}
        >
          <aside
            className="ml-auto flex h-full w-full max-w-md flex-col bg-white text-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div>
                <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-black/50">
                  Catalogue
                </p>
                <h2 className="m-0 text-3xl uppercase leading-none">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="grid h-10 w-10 place-items-center border border-black text-lg transition-colors hover:bg-black hover:text-white"
                aria-label="Close filters"
              >
                x
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <section className="border-b border-black/10 pb-6">
                <h3 className="m-0 mb-3 text-sm uppercase tracking-[0.18em] text-black/50">
                  Category
                </h3>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={[
                      "flex min-h-12 items-center justify-between border px-4 text-left font-display uppercase transition-colors",
                      selectedCategory === "all"
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-black hover:border-black",
                    ].join(" ")}
                  >
                    <span>All products</span>
                    <span>{products.length}</span>
                  </button>
                  {categories.map((category) => {
                    const count = products.filter((product) => product.category_id === category.id).length;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={[
                          "flex min-h-12 items-center justify-between border px-4 text-left font-display uppercase transition-colors",
                          selectedCategory === category.id
                            ? "border-black bg-black text-white"
                            : "border-black/15 bg-white text-black hover:border-black",
                        ].join(" ")}
                      >
                        <span>{category.name}</span>
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="border-b border-black/10 py-6">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="block text-sm uppercase tracking-[0.18em] text-black/50">
                      Availability
                    </span>
                    <span className="block text-2xl uppercase leading-none">In stock only</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) => setInStockOnly(event.target.checked)}
                    className="h-6 w-6 accent-black"
                  />
                </label>
              </section>

              <section className="py-6">
                <label htmlFor="shop-sort" className="mb-3 block text-sm uppercase tracking-[0.18em] text-black/50">
                  Sort
                </label>
                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  className="h-12 w-full border border-black bg-white px-4 font-display uppercase outline-none focus:ring-2 focus:ring-black/20"
                >
                  <option value="newest">Newest</option>
                  <option value="name">Name</option>
                  <option value="price-asc">Price low to high</option>
                  <option value="price-desc">Price high to low</option>
                </select>
              </section>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-black/10 p-5">
              <button
                type="button"
                onClick={resetFilters}
                className="h-12 border border-black bg-white font-display uppercase text-black transition-colors hover:bg-black hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="h-12 border border-black bg-black font-display uppercase text-white transition-colors hover:bg-white hover:text-black"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
