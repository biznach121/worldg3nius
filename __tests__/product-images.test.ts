import { describe, expect, it } from "vitest";
import { money, type Product } from "@cimplify/sdk";
import { getProductImage, withProductImage } from "../lib/product-images";

function product(name: string): Product {
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    business_id: "test-business",
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    default_price: money(100),
    type: "product",
    inventory_type: "none",
    variant_strategy: "fetch_all",
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

describe("product image overrides", () => {
  it("uses supplied bag images for bag products", () => {
    expect(getProductImage(product("WORLD G3NIUS Bag"))).toMatch(
      /ljj3oeyopgp8efbnwf2y|tsmc4kuo5pqlidm0eudc|bm7qonwul5yvba52kiup|xkg1nb9d6dxkksty15qp/,
    );
  });

  it("uses the cap image for cap products", () => {
    expect(getProductImage(product("Logo Cap"))).toContain("et0zrxuqks2virpcawpv");
  });

  it("keeps supplied images in the product shape for SDK detail components", () => {
    const decorated = withProductImage(product("Match Jersey"));

    expect(decorated.image_url).toContain("/v17805113");
    expect(decorated.images?.[0]).toBe(decorated.image_url);
  });

  it("uses a supplied image for products outside the named buckets", () => {
    expect(getProductImage(product("Mystery Drop"))).toMatch(
      /dcc5ggnkc\/image\/upload\/v17805|dcc5ggnkc\/image\/upload\/v1780487898/,
    );
  });
});
