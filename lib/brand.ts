/**
 * Brand & content configuration — single source of truth for every visible
 * string. Edit this file to rebrand. See ../AGENTS.md.
 */

import type { SeedName } from "@cimplify/sdk/testing/suite";

export interface BrandSocial {
  label: string;
  href: string;
  icon?: "instagram" | "x" | "tiktok" | "facebook" | "youtube" | "linkedin" | "whatsapp";
}

export interface BrandFaqEntry { q: string; a: string }
export interface BrandFaqSection { title: string; items: BrandFaqEntry[] }
export interface BrandPolicySection {
  heading: string;
  body: string | { intro: string; bullets: string[] };
}
export interface BrandSitemapSection { title: string; links: { label: string; href: string }[] }

export interface Brand {
  name: string;
  shortName: string;
  microTag: string;
  description: string;
  schemaType:
    | "Store" | "Bakery" | "Restaurant" | "BeautySalon"
    | "GroceryStore" | "LocalBusiness" | "Organization";
  currency: string;
  locale: string;
  contact: {
    address: string; streetAddress: string; city: string; countryCode: string;
    phone: string; phoneTel: string; email: string; privacyEmail: string;
    supportEmail?: string; businessEmail?: string; hours: string;
  };
  socials: BrandSocial[];
  header: { nav: { label: string; href: string }[] };
  hero: {
    badge: string; title: string; subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel?: string; secondaryCtaHref?: string;
  };
  trustItems?: { label: string; value: string; description: string; iconKey: string }[];
  brandStrip?: { headline: string; brands: string[] };
  promo?: { badge: string; title: string; body: string; ctaLabel: string; ctaHref: string };
  tradeIn?: {
    eyebrow: string; title: string; body: string;
    primaryCtaLabel: string; primaryCtaHref: string;
    secondaryCtaLabel: string; secondaryCtaHref: string;
    steps: { step: string; title: string; body: string }[];
  };
  newsletter: {
    eyebrow: string; title: string; body: string; placeholder: string;
    submitLabel: string; successLabel: string;
  };
  about: {
    eyebrow: string; title: string; paragraphs: string[];
    sections: { heading: string; body: string }[];
  };
  faq: {
    eyebrow: string; title: string; sections: BrandFaqSection[];
    contactPrompt: string; contactEmail: string;
  };
  terms: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  privacy: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  shipping: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  returns: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  accessibility: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  account: {
    loginEyebrow: string; loginTitle: string; loginSubtitle: string;
    signupEyebrow: string; signupTitle: string; signupSubtitle: string;
    accountEyebrow: string; accountTitle: string;
  };
  contactPage: {
    eyebrow: string; title: string; body: string;
    reasons: string[];
    directLines: { label: string; value: string; href: string }[];
  };
  trackOrder: { eyebrow: string; title: string; body: string };
  footer: {
    blurb: string; sitemap: BrandSitemapSection[];
    poweredBy?: { label: string; href: string };
  };
  llms: { summary: string };
  mock: { seed: SeedName; businessId: string };
}

export const brand: Brand = {
  name: "WORLD G3NIUS",
  shortName: "WG3",
  microTag: "",
  description:
    "Modern street fashion by WORLD G3NIUS. Graphic-heavy uniforms, sharp silhouettes, limited drops, shipped worldwide.",
  schemaType: "Store",

  currency: "GHS",
  locale: "en_GH",

  contact: {
    address: "Osu Oxford Street, Accra",
    streetAddress: "Osu Oxford Street",
    city: "Accra",
    countryCode: "GH",
    phone: "+233 244 000 000",
    phoneTel: "+233244000000",
    email: "hello@worldg3nius.test",
    privacyEmail: "privacy@worldg3nius.test",
    supportEmail: "help@worldg3nius.test",
    hours: "Tue–Sat · 11am–8pm",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/worldg3nius", icon: "instagram" },
    { label: "TikTok", href: "https://tiktok.com/@worldg3nius", icon: "tiktok" },
    { label: "X", href: "https://x.com/worldg3nius", icon: "x" },
    { label: "YouTube", href: "https://youtube.com/@worldg3nius", icon: "youtube" },
  ],

  header: {
    nav: [
      { label: "New", href: "/categories/new-arrivals" },
      { label: "Men", href: "/shop" },
      { label: "Drops", href: "/collections/latest-drop" },
      { label: "Shop", href: "/shop" },
      { label: "Lookbook", href: "/lookbook" },
    ],
  },

  hero: {
    badge: "Live now",
    title: "World code.\nStreet uniform.",
    subtitle:
      "A graphic streetwear system for people who move like the city is watching. Heavy silhouettes, loud marks, clean finish.",
    primaryCtaLabel: "Shop the drop",
    secondaryCtaLabel: "View the lookbook",
    secondaryCtaHref: "/lookbook",
  },

  trustItems: [
    {
      label: "Drop edit",
      value: "Four-product focus",
      description: "Rotating hero picks from the current run.",
      iconKey: "delivery",
    },
    {
      label: "Fit",
      value: "Size-led shopping",
      description: "Hover each product to pick your size.",
      iconKey: "warranty",
    },
    {
      label: "Cuts",
      value: "Oversized shape",
      description: "Dropped shoulders, heavy cotton, clean finish.",
      iconKey: "verified",
    },
    {
      label: "Signal",
      value: "Limited run",
      description: "Designed for city heat, night air, and motion.",
      iconKey: "support",
    },
  ],

  brandStrip: {
    headline: "Stocked at",
    brands: ["VOGUE", "HIGHSNOBIETY", "GQ", "DAZED", "i-D", "COMPLEX", "HYPEBEAST"],
  },

  promo: {
    badge: "New drop",
    title: "Fresh pieces just landed.",
    body: "Jerseys, tees, bags, caps, and the uniform codes built for the next move.",
    ctaLabel: "Shop the drop",
    ctaHref: "/shop",
  },

  tradeIn: {
    eyebrow: "Genius access",
    title: "Wear the code.\nEnter the system.",
    body: "Every drop opens the next door: first access, private previews, and the pieces we do not put on the public wall.",
    primaryCtaLabel: "Join access",
    primaryCtaHref: "/lookbook",
    secondaryCtaLabel: "How it works",
    secondaryCtaHref: "/faq",
    steps: [
      { step: "01", title: "Pick your code", body: "Choose the silhouette that says it before you do." },
      { step: "02", title: "Lock the drop", body: "Limited quantities. No dead stock. No lazy restocks." },
      { step: "03", title: "Move different", body: "First access, private previews, and early drop signals." },
    ],
  },

  newsletter: {
    eyebrow: "WG3 list",
    title: "Get the signal first.",
    body: "Drop alerts, private links, lookbook notes, and early access before the public timer starts.",
    placeholder: "you@email.com",
    submitLabel: "Join the list",
    successLabel: "On the list ✓",
  },

  about: {
    eyebrow: "About WORLD G3NIUS",
    title: "Streetwear for\nthe switched-on.",
    paragraphs: [
      "WORLD G3NIUS is a street fashion system built around loud marks, clean silhouettes, and a uniform mentality.",
      "We drop in focused runs, not endless restocks. Every release has a point of view: graphic codes, oversized proportion, hard contrast, and motion-ready comfort.",
      "Designed in Accra for the world. Built for people who enter the room already edited.",
    ],
    sections: [
      {
        heading: "The collective",
        body: "Every order activates access: private previews, drop notes, and the earliest signals before a public release.",
      },
      {
        heading: "Sizing",
        body: "Our pieces are cut for an oversized, dropped-shoulder fit. Order true to size if you want oversized; size down for a regular fit. Charts on every product page.",
      },
      {
        heading: "Visit",
        body: "Osu Oxford Street, Accra · Tue–Sat, 11am–8pm. Private fittings by appointment.",
      },
    ],
  },

  faq: {
    eyebrow: "Q&A",
    title: "Things people ask.",
    sections: [
      {
        title: "Sizing & fit",
        items: [
          {
            q: "How do I find my size?",
            a: "Every product page has a size chart with chest, length, and shoulder measurements. Our pieces fit oversized — order true to size for the intended fit, or size down for a regular cut.",
          },
          {
            q: "Do you offer larger sizes?",
            a: "Most pieces run S–3XL. A few drops are smaller — XS–XL — and that's flagged on the product page.",
          },
          {
            q: "What if it doesn't fit?",
            a: "Free returns within 30 days from the US, UK, and EU. Anywhere else, return shipping is on you, but we'll refund or exchange immediately.",
          },
        ],
      },
      {
        title: "Shipping & delivery",
        items: [
          {
            q: "How fast is shipping?",
            a: "DHL Express worldwide. 2–4 business days from when you order. Free over $80 (or local equivalent).",
          },
          {
            q: "Do you ship to my country?",
            a: "We ship to 80+ countries via DHL. Enter your address at checkout to see rates and ETA.",
          },
          {
            q: "Customs and duties?",
            a: "Charged on delivery in some countries. DHL will contact you. We can prepay for orders over $300; email help@worldg3nius.test before placing the order.",
          },
        ],
      },
      {
        title: "Drops & restocks",
        items: [
          {
            q: "Will you restock my size?",
            a: "No. Every drop is a closed run, numbered and dated. When a size sells out, it's gone.",
          },
          {
            q: "How do I find out about the next drop?",
            a: "Join the WG3 list. You get a head start before each drop opens to the public.",
          },
          {
            q: "Do you ever do collabs?",
            a: "Two or three a year. They're announced on the list first, then on Instagram. Most sell out the same day.",
          },
        ],
      },
      {
        title: "Returns",
        items: [
          {
            q: "What's your return policy?",
            a: "30 days from delivery. Item must be unworn, with original tags. Underwear and final-sale items aren't returnable.",
          },
          {
            q: "How do I start a return?",
            a: "Email help@worldg3nius.test with your order number. We'll email a prepaid label (US/UK/EU) or instructions.",
          },
        ],
      },
    ],
    contactPrompt: "Anything else? Email",
    contactEmail: "help@worldg3nius.test",
  },

  terms: {
    eyebrow: "Terms of service",
    title: "Terms of Service",
    lastUpdated: "1 May 2026",
    sections: [
      {
        heading: "1. Who we are",
        body: "WORLD G3NIUS (\"we\", \"us\") is an apparel brand operating from Osu, Accra, Ghana. By placing an order on this site, you (\"you\", \"customer\") agree to these terms.",
      },
      {
        heading: "2. Limited drops",
        body: "Every product is part of a closed, numbered run. We do not restock. Pricing reflects the numbered nature of each drop.",
      },
      {
        heading: "3. Pricing and payment",
        body: "Prices are displayed in your local currency where supported (auto-detected at checkout). Payment is taken at the time of order via card or Mobile Money.",
      },
      {
        heading: "4. Shipping",
        body: "DHL Express worldwide. Customs and duties are the customer's responsibility unless prepaid options are available at checkout.",
      },
      {
        heading: "5. Returns",
        body: "30-day return window from delivery date. Items must be unworn with original tags. Underwear, sale items, and bespoke pieces are final.",
      },
      {
        heading: "6. Intellectual property",
        body: "All graphics, prints, and product designs are original works of WORLD G3NIUS. Reproduction or commercial use without written permission is prohibited.",
      },
      {
        heading: "7. Liability",
        body: "Our maximum liability for any order is the value of that order. We're not liable for indirect or consequential losses.",
      },
      {
        heading: "8. Governing law",
        body: "These terms are governed by the laws of Ghana. Disputes are resolved in the courts of Greater Accra.",
      },
      {
        heading: "9. Contact",
        body: "Questions? Email hello@worldg3nius.test.",
      },
    ],
  },

  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    lastUpdated: "1 May 2026",
    sections: [
      {
        heading: "What we collect",
        body: "Order details (name, address, phone, email), garment measurements if you fill our size finder, and payment data via our processors (Paystack, Stripe). We do not store payment cards on our servers.",
      },
      {
        heading: "How we use it",
        body: {
          intro: "We use your data to:",
          bullets: [
            "Fulfil and ship your order.",
            "Send order updates by SMS and email.",
            "Send drop announcements (only if you opted in).",
            "Improve sizing recommendations across the catalogue.",
          ],
        },
      },
      {
        heading: "Who we share it with",
        body: "DHL (shipping), Paystack/Stripe (payments), and our email/SMS providers. We do not sell or rent personal data.",
      },
      {
        heading: "Cookies",
        body: "Strictly-necessary cookies for cart and session, plus optional analytics (toggleable in our cookie banner).",
      },
      {
        heading: "Your rights",
        body: "Under the Ghana Data Protection Act, 2012 (Act 843), you have the right to access, correct, or delete your data. Email privacy@worldg3nius.test.",
      },
      {
        heading: "Retention",
        body: "Order records: 7 years (tax law). Marketing list: until you unsubscribe.",
      },
    ],
  },

  shipping: {
    eyebrow: "Shipping",
    title: "Shipping",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "Worldwide via DHL Express", body: "2–4 business days from order. Free over $80 (or local equivalent)." },
      { heading: "Customs & duties", body: "Charged on delivery in some countries. DHL contacts you. Prepay for orders over $300; email help@worldg3nius.test before placing the order." },
      { heading: "Studio pickup", body: "Free, ready in 30 minutes. Tue–Sat 11am–8pm at Osu Oxford Street, Accra." },
      { heading: "Tracking", body: "DHL tracking link sent by email and SMS within an hour of dispatch." },
    ],
  },

  returns: {
    eyebrow: "Returns",
    title: "Returns & Exchanges",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "30 days, on us (US/UK/EU)", body: "Free return labels prepaid by us. Item must be unworn with original tags." },
      { heading: "Worldwide", body: "Return shipping is on you, but we'll refund or exchange immediately on receipt." },
      { heading: "Final sale", body: "Underwear, swim, custom pieces, and anything marked final-sale on the product page is non-returnable." },
      { heading: "How to start", body: "Email help@worldg3nius.test with your order number. We'll send a label or instructions within 24 hours." },
    ],
  },

  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "Our commitment", body: "We aim for WCAG 2.1 AA on this site, tested on each release." },
      { heading: "What we've done", body: { intro: "Specifically, we've:", bullets: [
        "Maintained a minimum 4.5:1 contrast on body text.",
        "Ensured every interactive element is keyboard-reachable.",
        "Provided alt text on every image, including lookbook editorials.",
        "Respected `prefers-reduced-motion` for the homepage editorial transitions.",
      ] } },
      { heading: "Reporting issues", body: "Email accessibility@worldg3nius.test. We respond within 5 business days." },
    ],
  },

  account: {
    loginEyebrow: "Welcome back",
    loginTitle: "Sign in to WG3",
    loginSubtitle: "Track orders, manage access, and view past drops.",
    signupEyebrow: "Welcome",
    signupTitle: "Create your account",
    signupSubtitle: "First-look at the next drop, faster checkout, and your size remembered.",
    accountEyebrow: "Your account",
    accountTitle: "Welcome back",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Talk to WORLD G3NIUS.",
    body: "Order question, sizing help, collab pitch — message us and we'll reply within a business day.",
    reasons: ["General question", "An order issue", "Sizing help", "Returns / exchanges", "Press / collabs", "Wholesale"],
    directLines: [
      { label: "Email", value: "help@worldg3nius.test", href: "mailto:help@worldg3nius.test" },
      { label: "Phone", value: "+233 244 000 000", href: "tel:+233244000000" },
    ],
  },

  trackOrder: {
    eyebrow: "Track an order",
    title: "Where's my drop?",
    body: "Enter your order number and the email used at checkout. We'll show DHL's latest scan and the live ETA.",
  },

  footer: {
    blurb:
      "Limited-run streetwear from Accra. Heavyweight cotton, hand-screened, numbered. Each drop is a closed run.",
    sitemap: [
      {
        title: "Shop",
        links: [
          { label: "All products", href: "/shop" },
          { label: "New arrivals", href: "/categories/new-arrivals" },
          { label: "Hoodies", href: "/categories/hoodies" },
          { label: "Tees", href: "/categories/tees" },
          { label: "Outerwear", href: "/categories/outerwear" },
          { label: "Drops", href: "/collections/latest-drop" },
        ],
      },
      {
        title: "Studio",
        links: [
          { label: "About", href: "/about" },
          { label: "The collective", href: "/about" },
          { label: "Lookbook", href: "/about" },
          { label: "Press", href: "mailto:press@worldg3nius.test" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Track an order", href: "/track-order" },
          { label: "Size guide", href: "/size-guide" },
          { label: "Shipping", href: "/shipping" },
          { label: "Returns", href: "/returns" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Sign in", href: "/login" },
          { label: "Create account", href: "/signup" },
          { label: "Your orders", href: "/account/orders" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Accessibility", href: "/accessibility" },
          { label: "Sitemap", href: "/sitemap-page" },
        ],
      },
    ],
    poweredBy: { label: "Cimplify", href: "https://app.cimplify.io" },
  },

  llms: {
    summary:
      "WORLD G3NIUS is a modern street fashion storefront with graphic-heavy uniforms, limited drops, worldwide shipping, and 30-day returns from US/UK/EU.",
  },

  mock: {
    seed: "fashion",
    businessId: "bus_studio_frx",
  },
};
