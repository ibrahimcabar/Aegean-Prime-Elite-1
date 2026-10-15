"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Property = {
  id: number;
  title: string;
  city: string;
  country: string;
  price: number;
  currency: string;
  image: string | null;
  beds: number | null;
  area_sqm: number | null;
  description: string | null;
  street_address: string | null;
};

export default function PropertyDetail() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) setProperty(data);
      setLoading(false);
    }

    loadProperty();
  }, [params.id]);

  if (loading) return <main style={{ padding: 30 }}>Loading...</main>;

  if (!property) {
    return <main style={{ padding: 30 }}>Property not found.</main>;
  }

  return (
    <main style={{
      maxWidth: 1100,
      margin: "auto",
      padding: "30px 20px",
      color: "#222"
    }}>
      <a href="/" style={{ color: "#b89b68" }}>
        ← Back to Properties
      </a>

      <h1 style={{ marginTop: 30 }}>{property.title}</h1>

      <p>{property.city}, {property.country}</p>

      {property.image && (
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: "100%",
            maxHeight: 550,
            objectFit: "cover",
            borderRadius: 12
          }}
        />
      )}

      <h2 style={{ color: "#b89b68", marginTop: 25 }}>
        {new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: property.currency || "EUR",
          maximumFractionDigits: 0
        }).format(property.price)}
      </h2>

      <p>🛏️ {property.beds ?? 0} Bedrooms</p>
      <p>📐 {property.area_sqm ?? 0} m²</p>

      <h2>Property Description</h2>
      <p>{property.description || "No description available."}</p>

      {property.street_address && (
        <p>📍 {property.street_address}</p>
      )}
    </main>
  );
}
