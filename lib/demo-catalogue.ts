import type {
  Category,
  Collection,
  Product,
  ProductWithDetails,
  VariantAxisWithValues,
  VariantView,
} from "@cimplify/sdk";

const CREATED_AT = "2026-01-01T00:00:00.000Z";
const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

type DemoProductInput = {
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  basePrice: string;
  image: string;
  tags?: string[];
  collections?: string[];
  isSignature?: boolean;
  isNew?: boolean;
};

type DemoProduct = ProductWithDetails & {
  collection_ids: string[];
  category?: Category;
  tags?: string[];
};

export function shouldUseDemoCatalogue() {
  return process.env.NEXT_PUBLIC_CIMPLIFY_USE_LIVE_PRODUCTS !== "true";
}

export const demoCategories = [
  {
    id: "cat_new-arrivals",
    business_id: "bus_demo_worldg3nius",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Just dropped pieces for the current demo edit.",
    product_count: 0,
    display_order: 0,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "cat_hoodies",
    business_id: "bus_demo_worldg3nius",
    name: "Hoodies",
    slug: "hoodies",
    description: "Heavyweight layers with oversized street proportions.",
    product_count: 0,
    display_order: 1,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "cat_tees",
    business_id: "bus_demo_worldg3nius",
    name: "Tees",
    slug: "tees",
    description: "Graphic cotton staples for daily rotation.",
    product_count: 0,
    display_order: 2,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "cat_outerwear",
    business_id: "bus_demo_worldg3nius",
    name: "Outerwear",
    slug: "outerwear",
    description: "Bombers and field jackets made for layering.",
    product_count: 0,
    display_order: 3,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "cat_bottoms",
    business_id: "bus_demo_worldg3nius",
    name: "Bottoms",
    slug: "bottoms",
    description: "Wide-leg trousers and track pants.",
    product_count: 0,
    display_order: 4,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "cat_accessories",
    business_id: "bus_demo_worldg3nius",
    name: "Accessories",
    slug: "accessories",
    description: "Caps, totes, beanies, and finishing pieces.",
    product_count: 0,
    display_order: 5,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
] as unknown as Category[];

export const demoCollections = [
  {
    id: "col_drop_04",
    business_id: "bus_demo_worldg3nius",
    name: "Drop 04",
    slug: "drop-04",
    description: "Spring 2026 capsule. 412 pieces left.",
    product_ids: [
      "prod_heavyweight-hoodie-charcoal",
      "prod_heavyweight-hoodie-cream",
      "prod_heavyweight-hoodie-cobalt",
      "prod_graphic-tee-frx-mark",
      "prod_field-jacket-olive",
    ],
    display_order: 0,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
  {
    id: "col_best_sellers",
    business_id: "bus_demo_worldg3nius",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "What everyone's buying.",
    product_ids: [
      "prod_studio-tee-black",
      "prod_heavyweight-hoodie-charcoal",
      "prod_carbon-bomber",
      "prod_studio-cap",
      "prod_track-pant-charcoal",
    ],
    display_order: 1,
    is_active: true,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  },
] as unknown as Collection[];

const demoProductInputs: DemoProductInput[] = [
  {
    slug: "heavyweight-hoodie-charcoal",
    name: "Heavyweight Hoodie · Charcoal",
    description: "500gsm garment-dyed cotton, hand-screened FRX seal at chest. Numbered run of 600. Oversized fit; size down for regular cut.",
    categoryId: "cat_hoodies",
    price: 650,
    basePrice: "650.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/heavyweight-hoodie-charcoal.jpg",
    tags: ["hoodie", "signature", "drop-04"],
    collections: ["col_drop_04", "col_best_sellers"],
    isSignature: true,
  },
  {
    slug: "heavyweight-hoodie-cream",
    name: "Heavyweight Hoodie · Cream",
    description: "500gsm garment-dyed cotton in natural cream. Numbered run of 600.",
    categoryId: "cat_hoodies",
    price: 650,
    basePrice: "650.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/heavyweight-hoodie-cream.jpg",
    tags: ["hoodie", "drop-04"],
    collections: ["col_drop_04"],
    isNew: true,
  },
  {
    slug: "heavyweight-hoodie-cobalt",
    name: "Heavyweight Hoodie · Cobalt",
    description: "Limited cobalt-blue colourway. 500gsm garment-dyed cotton. Numbered run of 200.",
    categoryId: "cat_hoodies",
    price: 650,
    basePrice: "650.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/heavyweight-hoodie-cobalt.jpg",
    tags: ["hoodie", "limited", "drop-04"],
    collections: ["col_drop_04"],
    isNew: true,
  },
  {
    slug: "studio-tee-black",
    name: "Studio Tee · Black",
    description: "14oz heavyweight cotton, garment-dyed. Dropped shoulder, oversized fit. The everyday FRX.",
    categoryId: "cat_tees",
    price: 220,
    basePrice: "220.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/studio-tee-black.jpg",
    tags: ["tee", "signature"],
    collections: ["col_best_sellers"],
    isSignature: true,
  },
  {
    slug: "studio-tee-natural",
    name: "Studio Tee · Natural",
    description: "14oz heavyweight cotton in undyed natural. Softens beautifully with wear.",
    categoryId: "cat_tees",
    price: 220,
    basePrice: "220.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/studio-tee-natural.jpg",
    tags: ["tee"],
  },
  {
    slug: "graphic-tee-frx-mark",
    name: "Graphic Tee · FRX Mark",
    description: "Hand-screened FRX seal, oversized fit. 14oz cotton. Numbered run of 400.",
    categoryId: "cat_tees",
    price: 260,
    basePrice: "260.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/graphic-tee-frx-mark.jpg",
    tags: ["tee", "graphic", "drop-04"],
    collections: ["col_drop_04"],
    isNew: true,
  },
  {
    slug: "carbon-bomber",
    name: "Carbon Bomber",
    description: "Waxed cotton outer, ribbed cuffs, two-way zip. Cut for layering over a hoodie.",
    categoryId: "cat_outerwear",
    price: 1200,
    basePrice: "1200.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/carbon-bomber.jpg",
    tags: ["outerwear", "premium"],
    collections: ["col_best_sellers"],
    isSignature: true,
  },
  {
    slug: "field-jacket-olive",
    name: "Field Jacket · Olive",
    description: "Garment-dyed military canvas, four utility pockets, drawcord hem. A workhorse.",
    categoryId: "cat_outerwear",
    price: 1450,
    basePrice: "1450.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/field-jacket-olive.jpg",
    tags: ["outerwear", "premium", "drop-04"],
    collections: ["col_drop_04"],
    isNew: true,
  },
  {
    slug: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    description: "Heavy twill cotton, pleated front, side pockets. Cut for an oversized silhouette.",
    categoryId: "cat_bottoms",
    price: 480,
    basePrice: "480.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/wide-leg-trouser.jpg",
    tags: ["bottom"],
  },
  {
    slug: "track-pant-charcoal",
    name: "Track Pant · Charcoal",
    description: "Heavyweight loopback fleece, tapered leg, elasticated cuffs. The bottom half of the hoodie set.",
    categoryId: "cat_bottoms",
    price: 380,
    basePrice: "380.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/track-pant-charcoal.jpg",
    tags: ["bottom"],
    collections: ["col_best_sellers"],
  },
  {
    slug: "studio-cap",
    name: "Studio Cap",
    description: "Brushed cotton 6-panel, embroidered FRX. Adjustable strap.",
    categoryId: "cat_accessories",
    price: 120,
    basePrice: "120.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/studio-cap.jpg",
    tags: ["accessory"],
    collections: ["col_best_sellers"],
  },
  {
    slug: "tote-natural",
    name: "Studio Tote · Natural",
    description: "12oz natural canvas, screen-printed FRX seal. Roomy.",
    categoryId: "cat_accessories",
    price: 150,
    basePrice: "150.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/tote-natural.jpg",
    tags: ["accessory"],
  },
  {
    slug: "knit-beanie",
    name: "Knit Beanie",
    description: "Merino wool blend, woven label. Two colourways.",
    categoryId: "cat_accessories",
    price: 140,
    basePrice: "140.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/knit-beanie.jpg",
    tags: ["accessory"],
  },
  {
    slug: "studio-sock-3pack",
    name: "Studio Sock · 3-pack",
    description: "Heavy-cuff crew socks, 3-pack. Cotton-rich blend.",
    categoryId: "cat_accessories",
    price: 180,
    basePrice: "180.00",
    image: "https://static-tmp.cimplify.io/seed/fashion/studio-sock-3pack.jpg",
    tags: ["accessory"],
  },
];

function categoryFor(id: string) {
  return demoCategories.find((category) => category.id === id) ?? demoCategories[0];
}

function axisIdFor(productSlug: string) {
  return `axis_${productSlug}_size`;
}

function axisValueIdFor(productSlug: string, size: string) {
  return `axv_${productSlug}_size_${size.toLowerCase()}`;
}

function variantAxesFor(productSlug: string) {
  const axisId = axisIdFor(productSlug);

  return [
    {
      id: axisId,
      business_id: "bus_demo_worldg3nius",
      product_id: `prod_${productSlug}`,
      name: "Size",
      display_order: 0,
      affects_recipe: false,
      values: SIZES.map((size, index) => ({
        id: axisValueIdFor(productSlug, size),
        business_id: "bus_demo_worldg3nius",
        axis_id: axisId,
        name: size,
        display_order: index,
        created_at: CREATED_AT,
        updated_at: CREATED_AT,
      })),
      created_at: CREATED_AT,
      updated_at: CREATED_AT,
    },
  ] as unknown as VariantAxisWithValues[];
}

function variantsFor(productSlug: string) {
  const axisId = axisIdFor(productSlug);

  return SIZES.map((size, index) => ({
    id: `var_${productSlug}_size_${size.toLowerCase()}`,
    product_id: `prod_${productSlug}`,
    business_id: "bus_demo_worldg3nius",
    name: size,
    sku: `${productSlug.toUpperCase()}-${size}`,
    price_adjustment: 0,
    is_default: index === 0,
    is_active: true,
    axis_selections: { [axisId]: axisValueIdFor(productSlug, size), Size: size },
    display_attributes: [
      {
        axis_id: axisId,
        axis_name: "Size",
        value_id: axisValueIdFor(productSlug, size),
        value_name: size,
      },
    ],
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  })) as unknown as VariantView[];
}

export const demoProducts = demoProductInputs.map((input) => {
  const category = categoryFor(input.categoryId);
  return {
    id: `prod_${input.slug}`,
    business_id: "bus_demo_worldg3nius",
    category_id: input.categoryId,
    name: input.name,
    slug: input.slug,
    description: input.description,
    image_url: input.image,
    images: [input.image],
    default_price: input.price,
    base_price: input.basePrice,
    currency: "GHS",
    type: "product",
    product_type: "product",
    render_hint: "physical",
    inventory_type: "none",
    variant_strategy: "use_axes",
    is_active: true,
    is_available: true,
    inventory_status: { in_stock: true, stock_level: 50, low_stock: false },
    tags: input.tags ?? [],
    is_signature: input.isSignature ?? false,
    is_new: input.isNew ?? false,
    category_ids: [input.categoryId],
    collection_ids: input.collections ?? [],
    add_on_ids: [],
    variant_ids: SIZES.map((size) => `var_${input.slug}_size_${size.toLowerCase()}`),
    variants: variantsFor(input.slug),
    variant_axes: variantAxesFor(input.slug),
    metadata: { sizes: SIZES },
    category,
    created_at: CREATED_AT,
    updated_at: CREATED_AT,
  };
}) as unknown as DemoProduct[];

for (const category of demoCategories) {
  (category as Category & { product_count: number }).product_count = demoProducts.filter(
    (product) => product.category_id === category.id,
  ).length;
}

export function getDemoCategoryBySlug(slug: string) {
  return demoCategories.find((category) => category.slug === slug || category.id === slug);
}

export function getDemoCollectionBySlug(slug: string) {
  return demoCollections.find((collection) => collection.slug === slug || collection.id === slug);
}

export function getDemoProductBySlug(slug: string) {
  return demoProducts.find((product) => product.slug === slug || product.id === slug);
}

export function getDemoProductsByCategory(categoryId: string) {
  return demoProducts.filter((product) => product.category_id === categoryId);
}

export function getDemoProductsByCollection(collectionId: string) {
  return demoProducts.filter((product) => product.collection_ids?.includes(collectionId));
}

export function getDemoRelatedProducts(product: Product) {
  return demoProducts
    .filter((candidate) => candidate.category_id === product.category_id && candidate.id !== product.id)
    .slice(0, 4);
}
