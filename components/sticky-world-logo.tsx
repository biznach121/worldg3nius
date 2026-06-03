"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function StickyWorldLogo() {
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(pathname !== "/");

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const startSection = document.querySelector<HTMLElement>("[data-sticky-logo-start]");
        const footer = document.querySelector<HTMLElement>("footer");
        const startReached = pathname !== "/" || Boolean(startSection && startSection.getBoundingClientRect().top <= 72);
        const logoBottom = logoRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;
        const footerReached = Boolean(footer && footer.getBoundingClientRect().top <= logoBottom + 8);

        setVisible(startReached && !footerReached);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  return (
    <Link
      ref={logoRef}
      href="/"
      aria-label="WORLD G3NIUS home"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={[
        "wg-sticky-logo group fixed right-2 top-[64vh] z-30 hidden h-16 w-16 -translate-y-1/2 sm:block md:right-4 md:h-20 md:w-20",
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none translate-x-4 opacity-0",
      ].join(" ")}
    >
      <span className="wg-sticky-logo__halo" aria-hidden="true" />
      <svg
        className="wg-sticky-logo__mark h-full w-full"
        viewBox="0 0 140 140"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="wg-sticky-globe-clip">
            <path d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z" />
          </clipPath>
        </defs>
        <g className="wg-sticky-logo__bob">
          <path
            className="wg-sticky-logo__shadow"
            d="M37 133c17 5 48 5 66 0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <g clipPath="url(#wg-sticky-globe-clip)">
            <path
              d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z"
              fill="#76bed0"
            />
            <path d="M-5 63c15-14 31-18 50-15l-7 30 18 12-10 38c-20-5-39-21-49-39Z" fill="#22a6bd" />
            <path d="M63 17 94 9l29 14 7 32-16 20-24-10-5-28-23-2Z" fill="#b7d7dc" />
            <path d="M24 27 53 12l42 8-33 14 4 25-36 10-22-24Z" fill="#6bb7c8" />
            <path d="M75 79 101 68l33 16-13 33-41 17-13-27Z" fill="#22a6bd" />
            <path d="M47 20 70 17l-7 13-27 5Z" fill="#3f963a" />
            <path d="M32 54 54 39l33 5 3 19-31 17-32-2Z" fill="#3f963a" />
            <path d="M90 30 112 22l23 22-19 24-27-9Z" fill="#3f963a" />
            <path d="M116 62 146 47l8 45-30 14Z" fill="#559846" />
            <path d="M5 81 26 67l19 18-4 27-25-6Z" fill="#559846" />
            <path d="M64 94 84 101l4 30-35-5Z" fill="#559846" />
            <path
              className="wg-sticky-logo__shine"
              d="M30 16 124 112"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeWidth="13"
            />
          </g>
          <path
            d="M70 5c21 0 45 7 56 23 11 17 11 42 2 62-9 21-27 40-50 44-24 4-49-7-63-27C1 87-3 59 8 38 19 18 44 5 70 5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <g className="wg-sticky-logo__type" fill="#fff">
            <g className="wg-sticky-logo__word wg-sticky-logo__word--top">
              <g transform="translate(22 68) rotate(-15) scale(0.9 1.22)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="38">W</text>
              </g>
              <g transform="translate(47 62) rotate(-6) scale(0.9 1.36)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="38">O</text>
              </g>
              <g transform="translate(72 62) rotate(1) scale(0.92 1.4)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="38">R</text>
              </g>
              <g transform="translate(96 65) rotate(8) scale(0.9 1.3)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="38">L</text>
              </g>
              <g transform="translate(119 71) rotate(16) scale(0.9 1.2)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="38">D</text>
              </g>
            </g>
            <g className="wg-sticky-logo__word wg-sticky-logo__word--bottom">
              <g transform="translate(26 98) rotate(13) scale(0.92 1.22)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">G</text>
              </g>
              <g transform="translate(51 102) rotate(6) scale(0.84 1.32)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">3</text>
              </g>
              <g transform="translate(75 103) rotate(1) scale(0.88 1.38)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">N</text>
              </g>
              <g transform="translate(96 102) rotate(-2) scale(0.82 1.34)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">I</text>
              </g>
              <g transform="translate(116 100) rotate(-8) scale(0.85 1.3)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">U</text>
              </g>
              <g transform="translate(136 96) rotate(-15) scale(0.82 1.2)">
                <text textAnchor="middle" dominantBaseline="middle" fontSize="36">S</text>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Link>
  );
}
