import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Editorial photography from WORLD G3NIUS drops.",
};

interface LookbookEntry {
  drop: string;
  title: string;
  hero: string;
  tiles: string[];
  byline: string;
  date: string;
}

// Each entry is a drop; tiles are the editorial shots. Replace the URLs
// with your own asset bucket / CDN before going live.
const ENTRIES: LookbookEntry[] = [
  {
    drop: "Drop 01",
    title: "World code.",
    date: "Spring 2026",
    byline: "A street uniform study by WORLD G3NIUS.",
    hero: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487795/mdk3hegmfalvep7b4iuw.png",
    tiles: [
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780488090/cplqhjp5g7n2fevyzftc.png",
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487772/joqwg0bxi6imuhrsexmg.png",
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487915/qerbwdhglaeawnbejedx.png",
    ],
  },
  {
    drop: "Drop 03",
    title: "Motion uniform.",
    date: "Winter 2025",
    byline: "Campaign shapes, concrete pace.",
    hero: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780488107/lf1dafvzwbbkrbbggcmp.png",
    tiles: [
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487772/ox8pws8rohmebom7z1ao.png",
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487992/c1ogmweapq2bk2vqdlam.png",
      "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487795/mdk3hegmfalvep7b4iuw.png",
    ],
  },
  {
    drop: "Drop 02",
    title: "From the studio floor.",
    date: "Autumn 2025",
    byline: "Studio days, Osu.",
    hero: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1800&h=1100&fit=crop&auto=format&q=85",
    tiles: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&h=1200&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&auto=format&q=85",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&h=1200&fit=crop&auto=format&q=85",
    ],
  },
];

export default function LookbookPage() {
  return (
    <article>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-3">
            Lookbook
          </p>
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase mb-4 leading-[0.92]">
            The systems, in full.
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Each drop is photographed in the room it's built in. Editorials below;
            full collection in the shop.
          </p>
        </div>
      </section>

      {ENTRIES.map((entry, i) => (
        <section key={entry.drop} className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {entry.drop} · {entry.date}
                </p>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase m-0 leading-[0.95]">
                  {entry.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">{entry.byline}</p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Shop {entry.drop}
              </Link>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-3">
              <Image
                src={entry.hero}
                alt={`${entry.drop} hero — ${entry.title}`}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {entry.tiles.map((src, ti) => (
                <div
                  key={src}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted"
                >
                  <Image
                    src={src}
                    alt={`${entry.drop} editorial ${ti + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
