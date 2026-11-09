
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const baseUrl = "https://veloraprimeelite.com";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const fallback: Metadata = {
    title: "Gayrimenkul Detayı | Velora Prime Elite",
    description:
      "Velora Prime Elite ile uluslararası gayrimenkul fırsatlarını keşfedin.",
    robots: { index: false, follow: true },
  };

  if (!url || !key) return fallback;

  try {
    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("properties")
      
.select("title, city, country, description, image, price, currency, beds, area_sqm")

      .eq("id", id)
      .single();

    if (error || !data) return fallback;

    const title = `${data.title} | Velora Prime Elite`;

    
const details = [
  data.city,
  data.country,
  data.area_sqm ? `${data.area_sqm} m²` : null,
  data.beds ? `${data.beds} yatak odası` : null,
  data.price != null
    ? `${new Intl.NumberFormat("tr-TR").format(data.price)} ${data.currency || "EUR"}`
    : null,
].filter(Boolean).join(", ");

const description = [
  data.title,
  details,
  data.description?.trim(),
  "Velora Prime Elite",
].filter(Boolean).join(". ").slice(0, 160);


    const propertyUrl = `${baseUrl}/ilan/${id}`;

    return {
      title: { absolute: title },
      description,
      alternates: {
        canonical: propertyUrl,
      },
      openGraph: {
        title,
        description,
        url: propertyUrl,
        siteName: "Velora Prime Elite",
        type: "website",
        ...(data.image
          ? { images: [{ url: data.image }] }
          : {}),
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("SEO metadata hatası:", error);
    return fallback;
  }
}

export default function PropertyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
