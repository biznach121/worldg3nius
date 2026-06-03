"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Category } from "@cimplify/sdk";
import { TypewriterHeading } from "@/components/typewriter-heading";

interface EditorialItem {
  src: string;
  title: string;
  eyebrow: string;
  fallbackHref: string;
  categoryTerms: string[];
}

interface ResolvedEditorialItem extends Omit<EditorialItem, "fallbackHref" | "categoryTerms"> {
  href: string;
}

const APPAREL_IMAGES = [
  {
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487795/mdk3hegmfalvep7b4iuw.png",
    title: "Jerseys",
    eyebrow: "01",
    fallbackHref: "/search?q=jerseys",
    categoryTerms: ["jerseys", "jersey"],
  },
  {
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487898/tyinud3c4kowb0c4ilm3.png",
    title: "Bottoms",
    eyebrow: "02",
    fallbackHref: "/search?q=bottoms",
    categoryTerms: ["bottoms", "bottom", "pants", "trousers", "shorts"],
  },
  {
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487772/joqwg0bxi6imuhrsexmg.png",
    title: "T-shirts",
    eyebrow: "03",
    fallbackHref: "/search?q=t-shirts",
    categoryTerms: ["t-shirts", "tshirts", "t shirts", "tees", "tee"],
  },
] satisfies EditorialItem[];

const ACCESSORY_IMAGES = [
  {
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487772/ox8pws8rohmebom7z1ao.png",
    title: "Hats",
    eyebrow: "04",
    fallbackHref: "/search?q=hats",
    categoryTerms: ["hats", "hat", "caps", "cap", "accessories"],
  },
  {
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780488107/lf1dafvzwbbkrbbggcmp.png",
    title: "Bags",
    eyebrow: "05",
    fallbackHref: "/search?q=bags",
    categoryTerms: ["bags", "bag", "accessories"],
  },
] satisfies EditorialItem[];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function categoryHref(item: EditorialItem, categories: Category[]) {
  const matches = categories.map((category) => ({
    category,
    name: normalize(category.name),
    slug: normalize(category.slug ?? category.id),
  }));
  const terms = item.categoryTerms.map(normalize);

  const exactMatch = matches.find(({ name, slug }) =>
    terms.some((term) => term === name || term === slug),
  );
  const looseMatch = matches.find(({ name, slug }) =>
    terms.some((term) => name.includes(term) || slug.includes(term)),
  );
  const match = exactMatch ?? looseMatch;

  return match ? `/categories/${match.category.slug ?? match.category.id}` : item.fallbackHref;
}

function resolveItems(items: EditorialItem[], categories: Category[]): ResolvedEditorialItem[] {
  return items.map((item) => ({
    src: item.src,
    title: item.title,
    eyebrow: item.eyebrow,
    href: categoryHref(item, categories),
  }));
}

export function EditorialSlideShow({ categories }: { categories: Category[] }) {
  const sceneRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const rect = scene.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const nextProgress = Math.min(1, Math.max(0, -rect.top / travel));
        setProgress(nextProgress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const incomingY = (1 - progress) * 100;
  const outgoingScale = 1 - progress * 0.045;
  const apparelItems = resolveItems(APPAREL_IMAGES, categories);
  const accessoryItems = resolveItems(ACCESSORY_IMAGES, categories);

  return (
    <section ref={sceneRef} className="relative h-[200svh] bg-black text-white">
      <span data-sticky-logo-start className="absolute left-0 top-[100svh] h-px w-px" />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <EditorialGrid
          items={apparelItems}
          mode="apparel"
          style={{
            opacity: 1 - progress * 0.36,
            transform: `scale(${outgoingScale})`,
          }}
        />
        <EditorialGrid
          items={accessoryItems}
          mode="accessories"
          style={{
            transform: `translateY(${incomingY}%)`,
          }}
        />
      </div>
    </section>
  );
}

function EditorialGrid({
  items,
  mode,
  style,
}: {
  items: ResolvedEditorialItem[];
  mode: "apparel" | "accessories";
  style: CSSProperties;
}) {
  if (mode === "accessories") {
    return (
      <section
        className="absolute inset-0 grid bg-black text-white transition-transform duration-150 ease-out md:grid-cols-2"
        style={style}
      >
        {items.map((item, index) => (
          <EditorialTile
            key={item.title}
            src={item.src}
            eyebrow={item.eyebrow}
            title={item.title}
            href={item.href}
            typeIndex={index === 0 ? 0 : 1}
            className="min-h-[50svh] md:min-h-[100svh]"
          />
        ))}
      </section>
    );
  }

  return (
    <section
      className="absolute inset-0 grid bg-black text-white transition-[opacity,transform] duration-150 ease-out grid-rows-3 md:grid-cols-2 md:grid-rows-2"
      style={style}
    >
      <EditorialTile
        src={items[0].src}
        eyebrow={items[0].eyebrow}
        title={items[0].title}
        href={items[0].href}
        typeIndex={0}
        className="row-span-1 md:row-span-2"
        priority
      />
      <EditorialTile
        src={items[1].src}
        eyebrow={items[1].eyebrow}
        title={items[1].title}
        href={items[1].href}
        typeIndex={1}
      />
      <EditorialTile
        src={items[2].src}
        eyebrow={items[2].eyebrow}
        title={items[2].title}
        href={items[2].href}
        typeIndex={2}
      />
    </section>
  );
}

function EditorialTile({
  src,
  eyebrow,
  title,
  href,
  typeIndex,
  className = "",
  priority = false,
}: {
  src: string;
  eyebrow: string;
  title: string;
  href: string;
  typeIndex: 0 | 1 | 2;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className={`group relative min-h-[33.333svh] overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={`World G3nius ${title}`}
        fill
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent transition-opacity group-hover:opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-8">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
            {eyebrow}
          </p>
          <TypewriterHeading
            className="m-0 font-display text-[clamp(2.75rem,7vw,6.5rem)] uppercase leading-[0.84]"
            typeIndex={typeIndex}
          >
            {title}
          </TypewriterHeading>
        </div>
        <span className="hidden border border-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors group-hover:bg-white group-hover:text-black sm:inline-flex">
          Shop
        </span>
      </div>
    </Link>
  );
}
