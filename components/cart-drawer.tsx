"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartDrawer as SdkCartDrawer } from "@cimplify/sdk/react";
import { useDemoCart, useDemoCartDrawer } from "@/lib/demo-cart";
import { shouldUseDemoCatalogue } from "@/lib/demo-catalogue";

/**
 * Side-drawer cart. Auto-opens when an item is added (via
 * `<CartDrawerProvider>` in `providers.tsx`). The header's cart pill
 * also calls `useCartDrawer().open()` to reveal it on click.
 */
export function CartDrawer() {
  return shouldUseDemoCatalogue() ? <DemoCartDrawer /> : <LiveCartDrawer />;
}

function LiveCartDrawer() {
  const router = useRouter();
  return <SdkCartDrawer onCheckout={() => router.push("/checkout")} />;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function DemoCartDrawer() {
  const router = useRouter();
  const { isOpen, close } = useDemoCartDrawer();
  const { lines, count, subtotal, setQuantity, remove } = useDemoCart();
  const currency = lines[0]?.currency ?? "GHS";

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, isOpen]);

  function checkout() {
    close();
    router.push("/checkout");
  }

  function shop() {
    close();
    router.push("/shop");
  }

  return (
    <div
      data-cimplify-cart-drawer
      data-open={isOpen ? "true" : "false"}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[200] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full flex-col bg-background shadow-2xl transition-transform duration-300 sm:max-w-[480px] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="relative flex shrink-0 items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-baseline gap-2">
            <h2 className="m-0 text-xl font-bold tracking-tight">Cart</h2>
            {count > 0 ? (
              <span className="text-sm text-muted-foreground tabular-nums">
                {count} {count === 1 ? "item" : "items"}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div data-cimplify-cart-empty className="grid h-full place-items-center py-16 text-center">
              <div className="max-w-[260px] space-y-5">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 rounded-full bg-muted" />
                  <svg
                    className="relative m-auto h-10 w-10 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="m-0 text-base font-semibold">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Discover something you'll love.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={shop}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-all hover:bg-foreground/90 active:scale-[0.99]"
                >
                  Shop now
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pb-6">
              {lines.map((line) => (
                <article
                  key={line.key}
                  className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-b border-border pb-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      router.push(`/products/${line.slug}`);
                    }}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
                    aria-label={`View ${line.name}`}
                  >
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    ) : null}
                  </button>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => {
                            close();
                            router.push(`/products/${line.slug}`);
                          }}
                          className="block truncate text-left text-sm font-semibold hover:text-foreground/70"
                        >
                          {line.name}
                        </button>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {line.size ? `Size ${line.size}` : "One size"}
                        </p>
                      </div>
                      <p className="m-0 shrink-0 text-sm font-semibold tabular-nums">
                        {formatMoney(line.price * line.quantity, line.currency)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex h-9 items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          className="grid h-9 w-9 place-items-center text-sm"
                          aria-label={`Decrease ${line.name} quantity`}
                        >
                          -
                        </button>
                        <span className="grid h-9 min-w-8 place-items-center text-xs font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          className="grid h-9 w-9 place-items-center text-sm"
                          aria-label={`Increase ${line.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.key)}
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 ? (
          <footer className="shrink-0 space-y-3 border-t border-border bg-background px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold tabular-nums">{formatMoney(subtotal, currency)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Tax and shipping calculated at checkout.
            </p>
            <button
              type="button"
              onClick={checkout}
              className="h-12 w-full rounded-full bg-foreground text-sm font-semibold text-background transition-all hover:bg-foreground/90 active:scale-[0.99]"
            >
              Checkout - {formatMoney(subtotal, currency)}
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Continue shopping
            </button>
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure checkout</span>
            </div>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
