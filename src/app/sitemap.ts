import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/resume", "/card"];
  return pages.map((path) => ({
    url: `${SITE_URL}/en${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: { languages: { en: `${SITE_URL}/en${path}`, fr: `${SITE_URL}/fr${path}` } },
  }));
}
