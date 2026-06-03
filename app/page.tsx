import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  getServerClient,
  tags,
  type Category,
  type Collection,
  type Product,
} from "@cimplify/sdk/server";
import { CollectionStrip } from "@/components/collection-strip";
import { PromoBanner } from "@/components/promo-banner";
import { BrandMarquee } from "@/components/brand-marquee";
import { Newsletter } from "@/components/newsletter";
import { SectionHeading } from "@/components/section-heading";
import { StoreProductCard } from "@/components/store-product-card";
import { EditorialSlideShow } from "@/components/editorial-slide-show";
import { WorldGeniusHero } from "@/components/world-genius-hero";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "WORLD G3NIUS",
  description: brand.description,
};

export const revalidate = 3600;

interface CollectionWithProducts {
  collection: Collection;
  products: Product[];
}

async function getHomeData() {
  const client = getServerClient();
  const [colRes, catRes, productsRes] = await Promise.all([
    client.catalogue.getCollections({
      cacheOptions: { revalidate: 3600, tags: [tags.collections()] },
    }),
    client.catalogue.getCategories({
      cacheOptions: { revalidate: 3600, tags: [tags.categories()] },
    }),
    client.catalogue.getProducts(
      { limit: 12 },
      { cacheOptions: { revalidate: 3600, tags: [tags.products()] } },
    ),
  ]);
  const collections = colRes.ok ? colRes.value : [];
  const categories: Category[] = catRes.ok ? catRes.value : [];
  const allProducts = productsRes.ok ? productsRes.value.items : [];

  const collectionsWithProducts: CollectionWithProducts[] = await Promise.all(
    collections.map(async (col) => {
      const r = await client.catalogue.getCollectionProducts(
        col.id,
        undefined,
        {
          cacheOptions: {
            revalidate: 3600,
            tags: [tags.collectionProducts(col.id)],
          },
        },
      );
      const items = r.ok
        ? ((r.value as { items?: Product[] }).items ?? (r.value as Product[]))
        : [];
      return { collection: col, products: items };
    }),
  );

  return {
    collections: collectionsWithProducts.filter((x) => x.products.length > 0),
    categories,
    featured: allProducts.slice(0, 4),
    newArrivals: allProducts.slice(4, 12),
  };
}

const CAMPAIGN_IMAGES = [
  "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487915/qerbwdhglaeawnbejedx.png",
  "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780488107/lf1dafvzwbbkrbbggcmp.png",
];

export default async function HomePage() {
  const { collections, categories, featured, newArrivals } = await getHomeData();
  const dropCollection =
    collections.find(({ collection }) => /drop\s*04|drop/i.test(collection.name)) ??
    collections[0];

  return (
    <>
      <WorldGeniusHero />

      <EditorialSlideShow categories={categories} />

      <ProductSpotlight products={featured} />

      <PromoBanner />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20">
        <SectionHeading
          eyebrow="Just dropped"
          title="New uniform."
          description="Pieces built for heat, concrete, night movement, and the afters."
          link={{ label: "Browse all", href: "/shop" }}
        />
        <Suspense fallback={<GridSkeleton count={4} />}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.slice(0, 4).map((p) => (
              <StoreProductCard key={p.id} product={p} />
            ))}
          </div>
        </Suspense>
      </section>

      <BrandMarquee />

      <CampaignStatement />

      {dropCollection ? (
        <Suspense
          key={dropCollection.collection.id}
          fallback={<StripSkeleton title={dropCollection.collection.name} />}
        >
          <CollectionStrip
            collection={dropCollection.collection}
            products={dropCollection.products}
            collectionHref={`/collections/${dropCollection.collection.slug ?? dropCollection.collection.id}`}
          />
        </Suspense>
      ) : null}

      <Newsletter />
    </>
  );
}

function ProductSpotlight({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-y border-border bg-[oklch(0.975_0_0)] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Shop the edit
            </p>
            <h2 className="m-0 font-display text-[clamp(2.4rem,5vw,4.75rem)] uppercase leading-[0.82]">
              Four pieces. Full signal.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden border border-black px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white sm:inline-flex"
          >
            All products
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <StoreProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignStatement() {
  return (
    <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-between gap-8 py-2">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-black/54">
              World code
            </p>
            <h2 className="m-0 max-w-xl font-display text-[clamp(3.1rem,15vw,9.5rem)] uppercase leading-[0.82] sm:text-[clamp(4rem,10vw,9.5rem)]">
              Genius is a uniform.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base leading-7 text-black/72">
              WORLD G3NIUS moves like a street label and edits like a magazine:
              hard silhouettes, clean contrast, loud marks, zero apology.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/lookbook"
                className="inline-flex bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
              >
                View lookbook
              </Link>
              <Link
                href="/shop"
                className="inline-flex border border-black px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
              >
                Shop men
              </Link>
            </div>
          </div>
        </div>
        <div className="grid min-h-[52svh] gap-5 sm:min-h-[70svh] sm:grid-cols-2">
          {CAMPAIGN_IMAGES.map((src, index) => (
            <div
              key={src}
              className={[
                "relative min-h-[46svh] overflow-hidden bg-muted sm:min-h-[58svh]",
                index === 1 ? "sm:mt-16" : "",
              ].join(" ")}
            >
              <Image
                src={src}
                alt={`World G3nius campaign editorial ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white mix-blend-difference">
                Look 0{index + 4}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-[4/3] bg-muted rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

function StripSkeleton({ title }: { title: string }) {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      <h2 className="text-[26px] font-semibold m-0 mb-5">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    </section>
  );
}
