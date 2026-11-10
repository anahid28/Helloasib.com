import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { site } from "@/lib/content";
import { themeBootScript } from "@/lib/themes";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Contact from "@/sections/Contact";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Not here to make ordinary`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.name} — Not here to make ordinary`, description: site.description, url: site.url, siteName: site.name, type: "website", images: ["/images/asib-portrait.jpg"] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#F4F0E8", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.roles[0],
  worksFor: { "@type": "Organization", name: "Musemind" },
  image: `${site.url}${site.portrait.replace(".webp", ".jpg")}`,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="paper-ink" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScroll />
          <Loader />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Contact />
        </ThemeProvider>
      </body>
    </html>
  );
}
