import type { Product } from "@cimplify/sdk";

const PRODUCT_IMAGE_SETS = {
  bags: [
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510503/ljj3oeyopgp8efbnwf2y.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510503/tsmc4kuo5pqlidm0eudc.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510503/bm7qonwul5yvba52kiup.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510489/xkg1nb9d6dxkksty15qp.png",
  ],
  caps: [
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510499/et0zrxuqks2virpcawpv.png",
  ],
  tshirts: [
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510907/uena6wmptavrpntqgtu8.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510914/ps6trocxztlzdwu4gmpo.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510907/ktvro8hshqfa25vsjnxh.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780510903/to3gholfbjdn5j8wajtv.png",
  ],
  jerseys: [
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780511339/ktyhvgirz6e7cvqq5pxc.png",
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780511351/d7bc1jeg1saibxjisiaj.png",
  ],
  bottoms: [
    "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487898/tyinud3c4kowb0c4ilm3.png",
  ],
} as const;

type ProductImageBucket = keyof typeof PRODUCT_IMAGE_SETS;

const ALL_SUPPLIED_PRODUCT_IMAGES = Object.values(PRODUCT_IMAGE_SETS).flat();

function metadataText(product: Product) {
  try {
    return product.metadata ? JSON.stringify(product.metadata) : "";
  } catch {
    return "";
  }
}

function productText(product: Product) {
  return [
    product.name,
    product.slug,
    product.tags?.join(" "),
    metadataText(product),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function imageBucketForProduct(product: Product): ProductImageBucket | undefined {
  const text = productText(product);

  if (/\b(bag|bags|backpack|tote|duffle|pouch)\b/.test(text)) return "bags";
  if (/\b(cap|caps|hat|hats)\b/.test(text)) return "caps";
  if (/\b(jersey|jerseys)\b/.test(text)) return "jerseys";
  if (/\b(t-?shirt|t-?shirts|tee|tees)\b/.test(text)) return "tshirts";
  if (/\b(bottom|bottoms|pant|pants|trouser|trousers|short|shorts|jogger|joggers)\b/.test(text)) {
    return "bottoms";
  }

  return undefined;
}

function stableIndex(value: string, modulo: number) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % modulo;
}

function overrideImage(product: Product) {
  const bucket = imageBucketForProduct(product);
  const images = bucket ? PRODUCT_IMAGE_SETS[bucket] : ALL_SUPPLIED_PRODUCT_IMAGES;

  const key = `${product.id}:${product.slug}:${product.name}`;
  return images[stableIndex(key, images.length)];
}

export function getProductImage(product: Product) {
  return overrideImage(product);
}

export function withProductImage<T extends Product>(product: T): T {
  const image = overrideImage(product);
  if (!image) return product;

  const images = [image, ...(product.images ?? []).filter((src) => src !== image)];
  return {
    ...product,
    image_url: image,
    images,
  };
}

export function withProductImages<T extends Product>(products: T[]): T[] {
  return products.map(withProductImage);
}
