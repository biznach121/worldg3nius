import { createCartFlowSuite } from "@cimplify/sdk/testing/suite";
import { expect } from "vitest";
import { brand } from "../lib/brand";

/**
 * Cart flow suite — base + per-merchant assertions.
 *
 * The base suite (from `@cimplify/sdk/testing/suite`) exercises the
 * universal contract: empty cart, add, dedupe, remove, businessId
 * round-trip. The `extend` hook below adds Studio FRX-specific
 * invariants — copy this pattern when a merchant has unique business
 * rules that need their own coverage.
 *
 *   • `getHandle()` returns the suite's current `TestClientHandle`
 *     (per `it`) so the seed and session are already wired.
 *   • `it` is the vitest API; cases land inside the suite's `describe`
 *     so its `beforeEach`/`afterEach` hooks apply automatically.
 */
createCartFlowSuite({
  seed: brand.mock.seed,
  businessId: brand.mock.businessId,
  extend: ({ getHandle, it }) => {
    it("Studio FRX prices everything in GHS", async () => {
      // Currency is brand-level (not per-product) — Product carries the price
      // string only. Catalog completeness here is just a sanity check.
      expect(brand.currency).toBe("GHS");
      const h = getHandle();
      const list = await h.client.catalogue.getProducts();
      if (!list.ok) throw list.error;
      const items = (list.value as unknown as { items?: unknown[] }).items ?? [];
      expect(items.length).toBeGreaterThan(0);
    });

    it("every apparel product covers the studio's core size run (S/M/L)", async () => {
      const h = getHandle();
      const list = await h.client.catalogue.getProducts();
      if (!list.ok) throw list.error;
      const items = (list.value as unknown as { items?: { id: string; name: string }[] }).items ?? [];

      // Apparel only — caps/socks/totes intentionally lack size variants.
      const apparel = items.filter((p) => /tee|hoodie|jacket|trouser|pant/i.test(p.name));
      expect(apparel.length).toBeGreaterThan(0);

      const required = new Set(["S", "M", "L"]);
      for (const product of apparel) {
        const variants = await h.client.catalogue.getVariants(product.id);
        if (!variants.ok) throw variants.error;
        const sizes = new Set(variants.value.map((v) => v.name).filter(Boolean));
        for (const size of required) {
          expect(sizes, `${product.name} missing size ${size}`).toContain(size);
        }
      }
    });
  },
});
