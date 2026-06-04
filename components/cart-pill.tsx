"use client";

import { useCartDrawer } from "@cimplify/sdk/react";
import { useCartCount } from "@/lib/cart";
import { openDemoCartDrawer, useDemoCart } from "@/lib/demo-cart";
import { shouldUseDemoCatalogue } from "@/lib/demo-catalogue";

/**
 * Cart pill — dynamic island. Reads the live cart count via the SDK and
 * opens the side cart drawer on click (instead of navigating to /cart).
 * Wrap in `<Suspense fallback={<CartPillSkeleton/>}>` so the cached
 * header chrome streams without blocking on the cart fetch.
 */
export function CartPill() {
  return shouldUseDemoCatalogue() ? <DemoCartPill /> : <LiveCartPill />;
}

function LiveCartPill() {
  const { count } = useCartCount();
  const { open } = useCartDrawer();
  return <CartButton count={count} onClick={open} />;
}

function DemoCartPill() {
  const { count } = useDemoCart();
  return <CartButton count={count} onClick={openDemoCartDrawer} />;
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      title={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative inline-grid h-10 w-10 place-items-center rounded-full bg-transparent text-current transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer"
    >
      <CartIcon />
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border border-background bg-foreground px-1 text-[10px] font-bold leading-none text-background tabular-nums">
        {count}
      </span>
    </button>
  );
}

export function CartPillSkeleton() {
  return (
    <span
      aria-hidden
      className="relative inline-grid h-10 w-10 place-items-center rounded-full bg-transparent text-current"
    >
      <CartIcon />
      <span className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full border border-background bg-foreground/80" />
    </span>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4.5 w-4.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}
