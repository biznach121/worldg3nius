import Link from "next/link";
import Image from "next/image";

interface FeatureHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageUrl: string;
  imageAlt: string;
  badge?: string;
}

/**
 * Editorial full-bleed fashion hero. Image fills the viewport; copy sits
 * over a dark gradient. Strings come from `brand.hero` at the call site.
 */
export function FeatureHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,
  badge,
}: FeatureHeroProps) {
  return (
    <section className="relative w-full h-[clamp(440px,65vh,640px)] sm:h-[clamp(560px,80vh,820px)] overflow-hidden bg-foreground text-background">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/0 pointer-events-none" />
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 lg:pb-20">
          {badge && (
            <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-background/10 border border-background/30 backdrop-blur-md text-[11px] uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          )}
          {eyebrow && (
            <p className="text-[12px] uppercase tracking-[0.3em] text-background/70 mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-[clamp(3.5rem,11vw,9rem)] m-0 mb-4 leading-[0.92] uppercase">
            {title}
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-background/85 leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-background text-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {primaryCta.label}
              <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M3 6h7m0 0L7 3m3 3L7 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-background/40 text-background hover:bg-background/10 transition-colors text-sm uppercase tracking-wider font-medium"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
