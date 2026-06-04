"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartPage as SdkCartPage } from "@cimplify/sdk/react";
import { useDemoCart } from "@/lib/demo-cart";
import { shouldUseDemoCatalogue } from "@/lib/demo-catalogue";

export default function CartPage() {
  return shouldUseDemoCatalogue() ? <DemoCartPage /> : <LiveCartPage />;
}

function LiveCartPage() {
  const router = useRouter();
  return <SdkCartPage onCheckout={() => router.push("/checkout")} />;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function DemoCartPage() {
  const { lines, subtotal, setQuantity, remove, clear } = useDemoCart();
  const currency = lines[0]?.currency ?? "GHS";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Demo cart
          </p>
          <h1 className="m-0 font-display text-[clamp(2.8rem,8vw,6.5rem)] uppercase leading-[0.86]">
            Your edit.
          </h1>
        </div>
        {lines.length > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="inline-flex min-h-11 items-center justify-center border border-black px-5 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Clear cart
          </button>
        ) : null}
      </div>

      {lines.length === 0 ? (
        <section className="border border-black/10 bg-white p-8 text-black sm:p-12">
          <h2 className="m-0 font-display text-4xl uppercase leading-none">Cart is empty.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">
            Add a few demo pieces from the shop. This cart is local to this browser for demo purposes.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-12 items-center justify-center bg-black px-6 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-primary"
          >
            Shop demo products
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="grid gap-4">
            {lines.map((line) => (
              <article
                key={line.key}
                className="grid gap-4 border border-black/10 bg-white p-4 text-black sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center"
              >
                <Link
                  href={`/products/${line.slug}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-[oklch(0.94_0_0)]"
                >
                  {line.image ? (
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="grid h-full place-items-center bg-black font-display text-2xl text-white">
                      WG3
                    </span>
                  )}
                </Link>
                <div className="min-w-0">
                  <Link
                    href={`/products/${line.slug}`}
                    className="font-display text-3xl uppercase leading-none transition-opacity hover:opacity-65"
                  >
                    {line.name}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black/50">
                    {line.size ? <span>Size {line.size}</span> : <span>One size</span>}
                    <span>{formatMoney(line.price, line.currency)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="inline-flex border border-black">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity - 1)}
                      className="grid h-10 w-10 place-items-center text-lg transition-colors hover:bg-black hover:text-white"
                      aria-label={`Decrease ${line.name} quantity`}
                    >
                      -
                    </button>
                    <span className="grid h-10 min-w-10 place-items-center border-x border-black px-3 text-sm font-bold tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.key, line.quantity + 1)}
                      className="grid h-10 w-10 place-items-center text-lg transition-colors hover:bg-black hover:text-white"
                      aria-label={`Increase ${line.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.key)}
                    className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/50 transition-colors hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit border border-black bg-white p-5 text-black">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-black/50">
              Summary
            </p>
            <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-4">
              <span className="text-sm uppercase text-black/60">Subtotal</span>
              <strong className="text-lg tabular-nums">{formatMoney(subtotal, currency)}</strong>
            </div>
            <p className="mb-5 text-sm leading-6 text-black/65">
              Demo cart only. Checkout is disabled until live products are enabled.
            </p>
            <Link
              href="/checkout"
              className="inline-flex min-h-12 w-full items-center justify-center bg-black px-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-primary"
            >
              Continue
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
