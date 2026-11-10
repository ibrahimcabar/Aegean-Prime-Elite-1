
import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
// Dynamic property sitemap for Velora Prime Elite
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://veloraprimeelite.com";

  const languages = ["en", "tr", "de", "ru", "ar"];

  const languagePages: MetadataRoute.Sitemap = languages.map(
    (lang) => ({
      url: `${baseUrl}/${lang}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          tr: `${baseUrl}/tr`,
          de: `${baseUrl}/de`,
          ru: `${baseUrl}/ru`,
          ar: `${baseUrl}/ar`,
        },
      },
    })
  );

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/dream-to-reality`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/golden-life`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    
{
  url: `${baseUrl}/de/antalya`,
  changeFrequency: "weekly",
  priority: 0.9,
},

    {
      url: `${baseUrl}/longevity`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  
if (!url || !key) {
  return [...pages, ...languagePages];
}


  try {
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("properties")
      .select("id");

    if (error) {
      console.error("Sitemap ilan hatası:", error.message);
      
return [...pages, ...languagePages];

    }

    const properties = (data || []).map((property) => ({
      url: `${baseUrl}/ilan/${property.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    
return [...pages, ...languagePages, ...properties];

  } catch (error) {
    console.error("Sitemap hatası:", error);
    
return [...pages, ...languagePages];

  }
}

