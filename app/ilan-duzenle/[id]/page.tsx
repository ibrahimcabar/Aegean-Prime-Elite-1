
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [property, setProperty] = useState<{
    id: number;
    title: string;
    owner_id: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProperty() {
      if (!Number.isSafeInteger(propertyId) || propertyId <= 0) {
        setError("Geçersiz ilan numarası.");
        setLoading(false);
        return;
      }

      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        router.replace("/giris");
        return;
      }

      const { data, error: propertyError } = await supabase
        .from("properties")
        .select("id, title, owner_id, status")
        .eq("id", propertyId)
        .eq("owner_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (propertyError || !data) {
        setError("İlan bulunamadı veya erişim yetkiniz yok.");
      } else {
        setProperty(data);
      }

      setLoading(false);
    }

    loadProperty();

    return () => {
      cancelled = true;
    };
  }, [propertyId, router]);

  if (loading) {
    return <main style={{ padding: 30 }}>Loading...</main>;
  }

  if (error || !property) {
    return (
      <main style={{ padding: 30 }}>
        <p>{error || "Property not found."}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Edit Property</h1>
      <h2>{property.title}</h2>
      <p>Property ID: {property.id}</p>
      <p>Status: {property.status}</p>
      <p>Editing form will be added next.</p>
    </main>
  );
}
