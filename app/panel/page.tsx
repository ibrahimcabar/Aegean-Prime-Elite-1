
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function PanelPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
const [packageName, setPackageName] = useState("");
const [listingLimit, setListingLimit] = useState(0);
const [activeListings, setActiveListings] = useState(0);
  const [unlimitedListings, setUnlimitedListings] = useState(false);

const [myProperties, setMyProperties] = useState<{
  id: number;
  title: string;
  city: string | null;
  country: string | null;
  price: number | null;
  currency: string | null;
  status: string | null;
  image: string | null;
  created_at: string;
}[]>([]);

const [propertiesLoading, setPropertiesLoading] = useState(true);
const [propertiesError, setPropertiesError] = useState("");
const pendingListings = myProperties.filter(
  (property) => property.status === "pending"
).length;

const rejectedListings = myProperties.filter(
  (property) => property.status === "rejected"
).length;
  useEffect(() => {
  let cancelled = false;

  async function loadPanel() {
    const { data, error } = await supabase.auth.getUser();

    if (cancelled) return;

    if (error || !data.user) {
      router.replace("/giris");
      return;
    }

    setEmail(data.user.email || "");

    setPropertiesLoading(true);
    setPropertiesError("");

    const { data: properties, error: propertiesError } =
      await supabase
        .from("properties")
        .select(
          "id, title, city, country, price, currency, status, image, created_at"
        )
        .eq("owner_id", data.user.id)
        .order("created_at", { ascending: false });

    if (cancelled) return;

    if (propertiesError) {
      console.error("My properties error:", propertiesError);
      setPropertiesError("İlanlar yüklenemedi.");
    } else {
      setMyProperties(properties ?? []);
    }

    setPropertiesLoading(false);

    const { data: partner, error: partnerError } = await supabase
      .from("partner_profiles")
      .select("package_name, listing_limit, unlimited_listings")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (cancelled) return;

    if (partnerError) {
      console.error("Partner profile error:", partnerError);
    }

    if (partner) {
  setPackageName(partner.package_name || "");
  setListingLimit(partner.listing_limit || 0);
  setUnlimitedListings(partner.unlimited_listings === true);
}

const { count, error: countError } = await supabase
  .from("properties")
  .select("id", { count: "exact", head: true })
  .eq("owner_id", data.user.id)
  .eq("status", "active");

if (cancelled) return;

if (countError) {
  console.error("Listing count error:", countError);
} else {
  setActiveListings(count ?? 0);
}

    setLoading(false);
  }

  loadPanel();

  return () => {
    cancelled = true;
  };
}, [router]);


  async function logout() {
    await supabase.auth.signOut();
    router.replace("/giris");
  }

  if (loading) {
    return <main style={{ padding: 40 }}>Loading...</main>;
  }

  const card = {
    background: "#fff",
    border: "1px solid #e8e1d5",
    borderRadius: 12,
    padding: 24,
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      color: "#222",
      padding: "24px 5%",
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        borderBottom: "1px solid #ddd",
        paddingBottom: 20,
      }}>
        <h1 style={{ color: "#b89b68", fontSize: 24 }}>
          VELORA PRIME ELITE
        </h1>
        <button onClick={logout} style={{
          background: "#222",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          cursor: "pointer",
        }}>
          Sign Out
        </button>
      </header>

      <section style={{ marginTop: 40 }}>
        <h2>Welcome to your dashboard</h2>
        <p style={{ color: "#777", overflowWrap: "anywhere" }}>
          {email}
        </p>
      </section>

      <section style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        gap: 20,
        marginTop: 35,
      }}>
        <div style={card}>
  <h3>🏠 My Properties</h3>

  <p>
    🟢 Active Listings:{" "}
    <strong>{activeListings}</strong>
  </p>

  <p>
    🟠 Pending Approval:{" "}
    <strong>{pendingListings}</strong>
  </p>

  <p>
    🔴 Rejected Listings:{" "}
    <strong>{rejectedListings}</strong>
  </p>

  <p>
    📋 Total Listings:{" "}
    <strong>{myProperties.length}</strong>
  </p>
</div>

        
<div style={card}>
  <h3>My Package</h3>

  {packageName ? (
    <>
      <p>
  <strong>Package:</strong>{" "}
  {unlimitedListings ? "Special Partner" : packageName}
</p>

<p>
  <strong>Listing Limit:</strong>{" "}
  {unlimitedListings ? "Unlimited ♾️" : listingLimit}
</p>

<p>
  <strong>Active Listings:</strong> {activeListings}
</p>

<p>
  <strong>Remaining Slots:</strong>{" "}
  {unlimitedListings
    ? "Unlimited ♾️"
    : Math.max(0, listingLimit - activeListings)}
</p>
    </>
  ) : (
    <p>No active package</p>
  )}
</div>


        <div style={card}>
          <h3>Customer Inquiries</h3>
          <p>0 inquiries</p>
        </div>
      </section>

<section style={{ ...card, marginTop: 30 }}>
  <h2 style={{ color: "#b89b68" }}>
    My Property Listings
  </h2>

  {propertiesLoading && <p>Loading properties...</p>}

  {propertiesError && (
    <p style={{ color: "#b91c1c" }}>
      {propertiesError}
    </p>
  )}

  {!propertiesLoading &&
    !propertiesError &&
    myProperties.length === 0 && (
      <p>You have not added any properties yet.</p>
    )}

  <div style={{ display: "grid", gap: 16 }}>
    {myProperties.map((property) => (
      <div
        key={property.id}
        style={{
          border: "1px solid #e8e1d5",
          borderRadius: 12,
          padding: 16,
          overflowWrap: "anywhere",
        }}
      >
        {property.image && (
          <img
            src={property.image}
            alt={property.title}
            style={{
              width: "100%",
              maxWidth: 300,
              borderRadius: 10,
            }}
          />
        )}

        <h3>{property.title}</h3>

        <p>
          {property.city}, {property.country}
        </p>

        <p>
          {property.price?.toLocaleString("tr-TR")}{" "}
          {property.currency}
        </p>

        <p>
          <strong>Status: </strong>
          <span style={{
            color:
              property.status === "active"
                ? "#15803d"
                : property.status === "pending"
                ? "#b45309"
                : "#b91c1c",
          }}>
            {property.status === "active"
              ? "Active"
              : property.status === "pending"
              ? "Pending Approval"
              : property.status === "rejected"
              ? "Rejected"
              : "Unknown"}
          </span>
        </p>

        {property.status === "active" && (
          <a
            href={`/ilan/${property.id}`}
            style={{ color: "#b89b68", fontWeight: 600 }}
          >
            View Property
          </a>
        )}
      </div>
    ))}
  </div>
</section>

      <section style={{ ...card, marginTop: 30 }}>
        <h2 style={{ color: "#b89b68" }}>
          Property Management
        </h2>
        <p>
          Manage your international real estate
          listings from one place.
        </p>
        <a
  href="/ilan-ekle"
  style={{
    display: "inline-block",
    marginTop: 16,
    padding: "14px 24px",
    background: "#b89b68",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
  }}
>
  + Add New Property
</a>
      </section>
    </main>
  );
}
