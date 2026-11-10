
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
    title: `Velora Prime Elite | ${lang.toUpperCase()} Real Estate`,
    description:
      "Discover luxury properties and real estate investment opportunities with Velora Prime Elite.",
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
