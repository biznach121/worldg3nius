"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckoutPage as SdkCheckoutPage } from "@cimplify/sdk/react";
import { useDemoCart } from "@/lib/demo-cart";
import { shouldUseDemoCatalogue } from "@/lib/demo-catalogue";

export default function CheckoutPage() {
  return shouldUseDemoCatalogue() ? <DemoCheckoutPage /> : <LiveCheckoutPage />;
}

function LiveCheckoutPage() {
  const router = useRouter();
  return (
    <SdkCheckoutPage
      onComplete={(result) => {
        if (result.success && result.order) {
          router.push(`/orders/${result.order.id}`);
        }
      }}
    />
  );
}

function DemoCheckoutPage() {
  const { count, subtotal } = useDemoCart();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
        Demo checkout
      </p>
      <h1 className="m-0 font-display text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.86]">
        Ready for live mode.
      </h1>
      <div className="mt-8 border border-black bg-white p-6 text-black">
        <p className="m-0 text-base leading-7 text-black/70">
          This demo cart has {count} {count === 1 ? "item" : "items"} with a subtotal of{" "}
          <strong className="text-black">GHS {subtotal.toLocaleString("en-GH")}</strong>.
          Payment is intentionally disabled because these demo products are hardcoded and do not
          exist in the live Cimplify catalogue yet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cart"
            className="inline-flex min-h-12 items-center justify-center border border-black px-6 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Back to cart
          </Link>
          <Link
            href="/shop"
            className="inline-flex min-h-12 items-center justify-center bg-black px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-primary"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
