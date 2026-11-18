
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
  
const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState("");
const [saveSuccess, setSaveSuccess] = useState("");

  const [property, setProperty] = useState<{
    id: number;
    title: string;
    owner_id: string;
    status: string;
    property_type: string | null;
    country: string | null;
    city: string | null;
    street_address: string | null;
    price: number | null;
    currency: string | null;
    area_sqm: number | null;
    beds: number | null;
    description: string | null;
    image: string | null;
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
        
.select("id, title, owner_id, status, property_type, country, city, street_address, price, currency, area_sqm, beds, description, image")

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

  async function saveProperty() {
    if (!property || saving) return;

    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/giris");
        return;
      }

      if (!property.title.trim()) {
        setSaveError("Property title is required.");
        return;
      }

      if (
        property.price !== null &&
        (!Number.isFinite(property.price) || property.price < 0)
      ) {
        setSaveError("Please enter a valid price.");
        return;
      }

      if (
        property.area_sqm !== null &&
        (!Number.isFinite(property.area_sqm) || property.area_sqm < 0)
      ) {
        setSaveError("Please enter a valid area.");
        return;
      }

      if (
        property.beds !== null &&
        (!Number.isInteger(property.beds) || property.beds < 0)
      ) {
        setSaveError("Please enter a valid bedroom count.");
        return;
      }

      
const { error: requestError } = await supabase
  .from("property_edit_requests")
  .insert({
    property_id: propertyId,
    requested_by: user.id,
    status: "pending",
    proposed_changes: {
      title: property.title.trim(),
      property_type: property.property_type,
      country: property.country,
      city: property.city,
      street_address: property.street_address,
      price: property.price,
      currency: property.currency,
      area_sqm: property.area_sqm,
      beds: property.beds,
      description: property.description,
      image: property.image,
    },
  });

if (requestError) {
  if (requestError.code === "23505") {
    setSaveError(
      "This property already has a pending edit request."
    );
    return;
  }

  throw requestError;
}

setSaveSuccess(
  "Your changes have been submitted for admin approval."
);

    } catch (err) {
      console.error("Property update error:", err);
      setSaveError("Failed to save property changes.");
    } finally {
      setSaving(false);
    }
  }

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
      
<label
  htmlFor="property-title"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Property Title
</label>

<input
  id="property-title"
  type="text"
  value={property.title ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      title: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-price"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Property Price
</label>

<input
  id="property-price"
  type="number"
  min="0"
  step="any"
  value={property.price ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      price: e.target.value === "" ? null : Number(e.target.value),
    })
  }
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-currency"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Currency
</label>

<select
  id="property-currency"
  value={property.currency ?? "EUR"}
  onChange={(e) =>
    setProperty({
      ...property,
      currency: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
>
  <option value="EUR">EUR (€)</option>
  <option value="USD">USD ($)</option>
  <option value="TRY">TRY (₺)</option>
</select>

<label
  htmlFor="property-country"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Country
</label>

<input
  id="property-country"
  type="text"
  value={property.country ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      country: e.target.value,
    })
  }
  placeholder="e.g. Turkey"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-city"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  City
</label>

<input
  id="property-city"
  type="text"
  value={property.city ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      city: e.target.value,
    })
  }
  placeholder="e.g. Antalya"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-address"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Street Address
</label>

<input
  id="property-address"
  type="text"
  value={property.street_address ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      street_address: e.target.value,
    })
  }
  placeholder="Street, neighborhood, building number"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-type"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Property Type
</label>

<select
  id="property-type"
  value={property.property_type ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      property_type: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
>
  <option value="">Select Property Type</option>
  <option value="Apartment">Apartment</option>
  <option value="Villa">Villa</option>
  <option value="Land">Land</option>
  <option value="Commercial">Commercial</option>
</select>

<label
  htmlFor="property-area"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Area (m²)
</label>

<input
  id="property-area"
  type="number"
  min="0"
  step="any"
  value={property.area_sqm ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      area_sqm: e.target.value === "" ? null : Number(e.target.value),
    })
  }
  placeholder="e.g. 120"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-beds"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Bedrooms
</label>

<input
  id="property-beds"
  type="number"
  min="0"
  step="1"
  value={property.beds ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      beds: e.target.value === "" ? null : Number(e.target.value),
    })
  }
  placeholder="e.g. 3"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

<label
  htmlFor="property-description"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Property Description
</label>

<textarea
  id="property-description"
  rows={6}
  value={property.description ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      description: e.target.value,
    })
  }
  placeholder="Describe the property, its features and location..."
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
    resize: "vertical",
    fontFamily: "inherit",
  }}
/>

<label
  htmlFor="property-image"
  style={{ display: "block", marginTop: 20, fontWeight: 600 }}
>
  Main Property Image URL
</label>

<input
  id="property-image"
  type="url"
  value={property.image ?? ""}
  onChange={(e) =>
    setProperty({
      ...property,
      image: e.target.value,
    })
  }
  placeholder="https://example.com/property.jpg"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    border: "1px solid #ccc",
    borderRadius: 8,
  }}
/>

      <p>Property ID: {property.id}</p>
      <p>Status: {property.status}</p>
      
{saveError && (
  <p style={{ color: "red", marginTop: 16 }}>
    {saveError}
  </p>
)}

{saveSuccess && (
  <p style={{ color: "green", marginTop: 16 }}>
    {saveSuccess}
  </p>
)}

<button
  type="button"
  onClick={saveProperty}
  disabled={saving}
  style={{
    width: "100%",
    padding: 15,
    marginTop: 24,
    background: saving ? "#777" : "#b99a62",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: saving ? "not-allowed" : "pointer",
  }}
>
  {saving ? "Saving..." : "Save Property Changes"}
</button>

    </main>
  );
}
