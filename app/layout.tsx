import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductModal } from "@/components/product-modal";
import { CartDrawer } from "@/components/cart-drawer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { StickyWorldLogo } from "@/components/sticky-world-logo";
import { Suspense } from "react";
import { brand } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site-url";

const jerseyM54 = localFont({
  src: "../public/fonts/jersey-m54.woff",
  variable: "--font-jersey-m54",
  weight: "400",
  style: "normal",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: brand.name,
      template: `%s — ${brand.name}`,
    },
    description: brand.description,
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: brand.locale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jerseyM54.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground font-sans"
      >
        <Suspense fallback={null}>
          <OrganizationJsonLd />
        </Suspense>
        <Providers>
          <Header />
          <StickyWorldLogo />
          <main className="flex-1 pb-12 w-full">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ProductModal />
          </Suspense>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
