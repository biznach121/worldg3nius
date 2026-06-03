"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CartPill, CartPillSkeleton } from "./cart-pill";
import { MobileNav } from "./mobile-nav";
import { AccountPill } from "./account-pill";
import { brand } from "@/lib/brand";

/**
 * Server-rendered header chrome. Big block-letter brand mark, mono-spaced
 * uppercase nav. Active-link styling and live cart count live in client
 * islands behind their own Suspense boundaries.
 */
export function Header() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setPastHero(true);
      return;
    }

    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.92;
      setPastHero(window.scrollY >= heroHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isTransparent = pathname === "/" && !pastHero;

  return (
    <>
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10 py-3 transition-all duration-500",
        isTransparent
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-border bg-background/92 text-foreground shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="flex items-center justify-start">
        <nav className="hidden sm:flex items-center gap-5 sm:gap-7 uppercase tracking-wide text-[12px]">
          {brand.header.nav.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className={[
                "text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors",
                pathname === link.href
                  ? isTransparent
                    ? "text-white"
                    : "text-primary"
                  : isTransparent
                    ? "text-white/75 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
      <Link
        href="/"
        className="group flex min-w-0 flex-col items-center justify-center text-center"
        aria-label={`${brand.name} home`}
      >
        <span
          className={[
            "font-display text-[21px] uppercase leading-[0.86] transition-all duration-500 sm:text-[27px]",
            pastHero ? "scale-95" : "scale-100",
          ].join(" ")}
        >
          WORLD
        </span>
        <span
          className={[
            "mt-0.5 font-display text-[21px] uppercase leading-[0.86] transition-all duration-500 sm:text-[27px]",
            pastHero ? "scale-95" : "scale-100",
          ].join(" ")}
        >
          G3NIUS
        </span>
      </Link>
      <div className="flex items-center justify-end gap-3 sm:gap-5">
        <AccountPill />
        <Suspense fallback={<CartPillSkeleton />}>
          <CartPill />
        </Suspense>
      </div>
    </header>
    {pathname === "/" ? null : <div className="h-[72px]" aria-hidden />}
    </>
  );
}
