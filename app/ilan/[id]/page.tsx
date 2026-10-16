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
  const [images, setImages] = useState<string[]>([]);
const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) {
  setProperty(data);

  const { data: photos, error: photosError } = await supabase
    .from("property_images")
    .select("image_url")
    .eq("property_id", data.id)
    .order("sort_order", { ascending: true });

  const photoUrls = photosError
    ? []
    : (photos || []).map((photo) => photo.image_url);

  setImages(
    photoUrls.length > 0
      ? photoUrls
      : data.image
        ? [data.image]
        : []
  );
  setActiveImage(0);
}
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

      {images.length > 0 && (
  <div>
    <img
      src={images[activeImage]}
      alt={property.title}
      style={{
        width: "100%",
        maxHeight: 550,
        objectFit: "cover",
        borderRadius: 12
      }}
    />

    {images.length > 1 && (
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 15,
        marginTop: 15
      }}>
        <button
          type="button"
          onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
        >
          ❮ Önceki
        </button>

        <span>{activeImage + 1} / {images.length}</span>

        <button
          type="button"
          onClick={() => setActiveImage((activeImage + 1) % images.length)}
        >
          Sonraki ❯
        </button>
      </div>
    )}
  </div>
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
