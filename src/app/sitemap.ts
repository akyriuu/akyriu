import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://devmarcus.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/resume`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
