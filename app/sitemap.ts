import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work/", "/about/", "/playground/", "/contact/"];
  return [...pages, ...projects.map((p) => `/work/${p.slug}/`)].map((p) => ({ url: `${site.url}${p}` }));
}
