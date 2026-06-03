"use client";

import {
  DefaultSearchLayout,
  SearchPage,
  type SearchLayoutProps,
} from "@cimplify/sdk/react";
import { StoreProductCard } from "@/components/store-product-card";

function FourUpSearchLayout(props: SearchLayoutProps) {
  return (
    <DefaultSearchLayout
      {...props}
      className={["wg-four-up-product-grid", props.className].filter(Boolean).join(" ")}
    />
  );
}

export function SearchClient() {
  return (
    <SearchPage
      layouts={{ default: FourUpSearchLayout }}
      renderCard={(product) => <StoreProductCard product={product} />}
    />
  );
}
