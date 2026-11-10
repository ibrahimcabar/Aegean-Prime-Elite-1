
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import HomeClient from "../HomeClient";

const languages = ["en", "tr", "de", "ru", "ar"];

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!languages.includes(lang)) {
    return { robots: { index: false } };
  }

  return {
    

title:
  lang === "de"
    ? "Immobilien in der Türkei kaufen | Velora Prime Elite"
    : lang === "tr"
    ? "Türkiye'de Satılık Lüks Villa ve Daire | Velora Prime Elite"
    
: lang === "en"
? "Luxury Real Estate in Turkey | Velora Prime Elite"

: lang === "ru"
    ? "Недвижимость в Турции | Виллы и квартиры | Velora Prime Elite"
    
: lang === "ar"
    ? "عقارات فاخرة للبيع في تركيا | Velora Prime Elite"
    : `Velora Prime Elite | ${lang.toUpperCase()} Real Estate`,





    

description:
  lang === "de"
    ? "Entdecken Sie exklusive Immobilien in der Türkei. Kaufen Sie luxuriöse Villen, Wohnungen und attraktive Anlageimmobilien mit Velora Prime Elite."
    : lang === "tr"
    ? "Türkiye'de satılık lüks villa, daire ve seçkin gayrimenkul yatırım fırsatlarını Velora Prime Elite ile keşfedin."
    
: lang === "en"
    ? "Discover luxury villas, apartments and premium real estate investment opportunities in Turkey with Velora Prime Elite."
    
: lang === "ru"
    ? "Элитная недвижимость в Турции: роскошные виллы, квартиры и инвестиционные возможности. Найдите свою идеальную недвижимость с Velora Prime Elite."
    
: lang === "ar"
    ? "اكتشف العقارات الفاخرة للبيع في تركيا، من الفلل والشقق الراقية إلى الفرص الاستثمارية العقارية المميزة مع Velora Prime Elite."
    : "Discover luxury properties and real estate investment opportunities with Velora Prime Elite.",





openGraph: {
  title: "Velora Prime Elite | Global Real Estate",
  description:
    "Discover luxury properties and real estate investment opportunities with Velora Prime Elite.",
  siteName: "Velora Prime Elite",
  type: "website",
  url: `https://veloraprimeelite.com/${lang}`,
  images: [
    {
      url: "/velora-prime-elite-social-1200x630.jpg",
      width: 1200,
      height: 630,
      alt: "Velora Prime Elite - Global Real Estate",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title: "Velora Prime Elite | Global Real Estate",
  description:
    "Discover luxury properties and real estate investment opportunities with Velora Prime Elite.",
  images: [
    "/velora-prime-elite-social-1200x630.jpg",
  ],
},

    alternates: {
      canonical: `https://veloraprimeelite.com/${lang}`,
      languages: {
        en: "/en",
        tr: "/tr",
        de: "/de",
        ru: "/ru",
        ar: "/ar",
      },
    },
  };
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!languages.includes(lang)) {
    notFound();
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error("Language properties:", error.message);
  }

  return (
    <HomeClient
      initialProperties={data ?? []}
      initialLanguage={lang}
    />
  );
}
