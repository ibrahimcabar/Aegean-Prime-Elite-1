
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/giris",
        "/api/",
      ],
    },
    sitemap: "https://veloraprimeelite.com/sitemap.xml",
    host: "https://veloraprimeelite.com",
  };
}
