import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { createClient } from "@supabase/supabase-js";
export const metadata: Metadata = {
  title: "Velora Prime Elite | Luxury Real Estate in Turkey",
  description:
    "Discover luxury villas, apartments and premium real estate investment opportunities in Turkey with Velora Prime Elite.",
  alternates: {
    canonical: "https://veloraprimeelite.com/",
  },
  openGraph: {
    title: "Velora Prime Elite | Luxury Real Estate in Turkey",
    description:
      "Explore luxury properties and international real estate investment opportunities with Velora Prime Elite.",
    url: "https://veloraprimeelite.com/",
    siteName: "Velora Prime Elite",
    type: "website",
    images: [
  {
    url: "/velora-prime-elite-social-1200x630.jpg",
    alt: "Velora Prime Elite - Global Real Estate",
  },
],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Prime Elite | Luxury Real Estate in Turkey",
    description:
      "Discover premium villas and real estate investment opportunities in Turkey.",
 images: ["/velora-prime-elite-social-1200x630.jpg"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
