import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * Full-width promo banner — reads brand.promo. Renders nothing if the
 * brand doesn't define a promo, so this component is safe to drop in
 * across templates that may or may not run a campaign.
 */
export function PromoBanner() {
  const promo = brand.promo;
  if (!promo) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
      <div className="wg-drop-banner relative overflow-hidden rounded-lg border border-black bg-black text-white">
        <div className="absolute inset-0 wg-drop-banner__grain pointer-events-none" aria-hidden />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" aria-hidden />
        <div className="relative grid min-h-[230px] gap-7 px-5 py-7 sm:min-h-[250px] sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_20rem_auto] lg:items-center">
          <div className="max-w-xl">
            <span className="mb-4 inline-flex items-center gap-2 border border-white/22 bg-white/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              <span className="h-1.5 w-1.5 bg-primary" />
              {promo.badge}
            </span>
            <h2 className="m-0 max-w-2xl font-display text-[clamp(2.7rem,6vw,5.5rem)] uppercase leading-[0.82]">
              {promo.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm uppercase leading-6 tracking-[0.08em] text-white/72 sm:text-base">
              {promo.body}
            </p>
          </div>

          <div className="wg-drop-signature relative h-24 w-full max-w-[20rem] justify-self-start lg:justify-self-center">
            <svg
              viewBox="0 0 520 150"
              role="img"
              aria-label="World G3nius"
              className="h-full w-full overflow-visible"
            >
              <text
                x="20"
                y="92"
                className="wg-drop-signature__stroke"
              >
                World G3nius
              </text>
              <text
                x="20"
                y="92"
                className="wg-drop-signature__fill"
              >
                World G3nius
              </text>
              <path
                className="wg-drop-signature__line"
                d="M34 112 C125 135 319 128 478 106"
                fill="none"
              />
            </svg>
          </div>

          <Link
            href={promo.ctaHref}
            className="inline-flex h-12 items-center justify-center gap-2 justify-self-start border border-white bg-white px-5 text-[12px] font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:justify-self-end"
          >
            {promo.ctaLabel}
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M3 6h7m0 0L7 3m3 3L7 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
