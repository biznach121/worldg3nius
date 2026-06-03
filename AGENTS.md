# AGENTS.md — Fashion / streetwear storefront template

If you are an AI agent (Claude, Cursor, Aider, devin, …) working on this storefront, **start here.**

## TL;DR for rebranding

1. **Edit `lib/brand.ts`** — every visible string lives here.
2. **Edit `app/globals.css`** — `@theme { … }` for palette + radius + font references.
3. **Edit `.env.local`** — `NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY` (optional: `NEXT_PUBLIC_SITE_URL`).

## Aesthetic

Streetwear / lookbook-led brands (Nike, Aritzia, Highsnobiety, drop culture):

- **Anton display + Inter** — uppercase condensed display, clean body sans.
- **High-contrast palette** — near-black foreground on near-white background, electric primary (default coral, `oklch(0.7 0.24 30)`).
- **Sharp corners**: `0.125rem` — minimal rounding.
- **Editorial full-bleed hero** with image gradient overlay.
- **Block-letter header** — no logo mark, just the shortName in display type.
- Schema.org `@type` is `Store`.

## Page surface

```
app/
  page.tsx                       Multi-section home — full-bleed editorial hero,
                                  trust bar, category tiles, promo banner,
                                  "Just dropped" grid, brand strip, collections,
                                  studio-collective CTA, best sellers, newsletter
  shop/page.tsx                  SDK <CataloguePage/> with custom hero
  search/page.tsx                Search
  collections/[slug]/page.tsx    Collection landing (drops)
  categories/[slug]/page.tsx     Category landing
  products/[slug]/page.tsx       Full product detail page (Product JSON-LD)

  size-guide/page.tsx            ⭐ Fashion-specific: chest/length/shoulder + waist/hip/inseam
                                  tables, "how to measure" callout
  lookbook/page.tsx              ⭐ Fashion-specific: editorial multi-drop lookbook —
                                  hero + 3-up tile galleries per drop, "Shop Drop X" CTAs

  cart/page.tsx, checkout/page.tsx, orders/[id]/page.tsx

  account/page.tsx               <AccountDashboardPage /> (native, Server Component)
  account/orders/page.tsx        <AccountOrdersPage /> (native)
  login/page.tsx, signup/page.tsx  redirects → /account

  contact/page.tsx, track-order/page.tsx

  about/page.tsx, faq/page.tsx
  shipping/page.tsx (DHL Express worldwide), returns/page.tsx (30 days),
  accessibility/page.tsx, terms/page.tsx, privacy/page.tsx

  sitemap-page/page.tsx, sitemap.ts, robots.ts, llms.txt/route.ts, opensearch.xml/route.ts
  error.tsx, not-found.tsx
```

## File ↔ brand-field map

| File | Reads from `brand` |
|---|---|
| `app/layout.tsx` | identity, contact, socials, Store JSON-LD |
| `app/page.tsx` | `brand.hero`, `brand.trustItems`, `brand.brandStrip`, `brand.promo`, `brand.tradeIn` (= studio-collective copy), `brand.newsletter` |
| `app/about/page.tsx` | `brand.about` |
| `app/faq/page.tsx` | `brand.faq` (sizing, drops, returns, customs) |
| `app/shipping/page.tsx` | `brand.shipping` (worldwide DHL, customs) |
| `app/returns/page.tsx` | `brand.returns` (30 days, free US/UK/EU) |
| `app/accessibility/page.tsx` | `brand.accessibility` |
| `app/terms/page.tsx`, `app/privacy/page.tsx` | `brand.terms`, `brand.privacy` |
| `app/contact/page.tsx` | `brand.contactPage`, `brand.contact` |
| `app/track-order/page.tsx` | `brand.trackOrder` |
| `app/account/*/page.tsx` | `brand.account` (SDK account pages render the UI) |
| `app/products/[slug]/page.tsx` | `brand.name`, `brand.currency` (Product JSON-LD) |
| `app/size-guide/page.tsx` | currently has its size charts inlined — hoist to `brand.sizeGuide` if you want agents to edit them |
| `app/lookbook/page.tsx` | currently has the lookbook entries inlined (image URLs + drop names) — hoist to `brand.lookbook` for agent editing |
| `app/llms.txt/route.ts` | `brand.llms`, contact, currency |
| `components/header.tsx`, `footer.tsx` | `brand.header`, `brand.footer`, `brand.contact`, `brand.socials` |
| `components/promo-banner.tsx`, `trade-in-cta.tsx`, `brand-marquee.tsx`, `trust-bar.tsx`, `newsletter.tsx` | corresponding optional sections in `brand` |

## Fashion-specific notes

- **Hero is full-bleed editorial.** Replace `HERO_FALLBACK_IMAGE` in `app/page.tsx` with the merchant's drop campaign shot for maximum impact.
- **Drop badges and "limited run" copy** drive urgency. Keep `brand.hero.badge` and `brand.promo.badge` short and time-bounded.
- **`brand.tradeIn`** is repurposed as the "Studio collective" / membership programme — three-step access flow.
- **Product detail uses the page-driven model** (`/products/[slug]`) — fashion is a consideration purchase (sizing, fit, fabric details), not impulse.
- **`brandStrip.headline` is `"Stocked at"`** with editorial publication wordmarks (Vogue, Highsnobiety, etc.) — typography-led, no logo licensing required.

## Known TODOs

- `app/size-guide/page.tsx` has its size charts inlined as constants. Move them to `brand.sizeGuide` (typed) so agents can edit per-merchant size charts in one file.
- `app/lookbook/page.tsx` has its drop entries inlined. Move to `brand.lookbook` for agent editing — each drop becomes `{ drop, title, date, byline, hero, tiles[] }`.
- Contact form + newsletter fake submits.

## Mock seed

Wired to `--seed fashion` (Studio FRX apparel catalogue — 14 products with size variants XS–2XL, Drop 04 + Best Sellers collections, full-bleed product imagery served from `static-tmp.cimplify.io`).

## Customizing SDK components

For anything beyond `lib/brand.ts` + `app/globals.css`, you'll likely want to lean on the SDK's prebuilt components rather than reinvent. Particularly for **product customization** (variants, add-ons, bundles, composites, services with scheduling), the SDK already gets the price math, variant axis matching, and cart payload contracts right. Default to ejecting and restyling:

```bash
cimplify add variant-selector    # copies into ./components/
cimplify add cart-drawer
cimplify add product-page
```

Then edit the local copy. **Don't change the cart payload shape** unless you're also touching the SDK's mock and the backend lens.

If you're considering a from-scratch rebuild of the customizer, read these SDK source files first to understand the contract you must reproduce:
- `src/react/product-customizer.tsx` — top-level state machine + final `onAddToCart` payload assembly
- `src/react/variant-selector.tsx` — multi-axis matching via `display_attributes`; default-variant init runs in a `useEffect` and is easy to break
- `src/react/{add-on,bundle,composite}-selector.tsx` — group constraints, exclusivity rules, per-component variants
- `src/mock/domain/cart/{index,pricing}.ts` — the contract: `computeUnitPrice`, `computeBundlePrice`, `computeCompositePrice` (4 modes), `computeLineKey`

Full ejection + customization rules are in the SDK-level [`AGENTS.md`](../../AGENTS.md) under "Don't reinvent product customization".

## Quick start

```bash
bun install
bun dev
```

Open <http://localhost:3000>.
