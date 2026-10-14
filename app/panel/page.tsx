
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace("/giris");
      } else {
        setEmail(data.user.email || "");
        setLoading(false);
      }
    });
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
          AEGEAN PRIME ELITE
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
          <h3>My Properties</h3>
          <p>0 active listings</p>
        </div>

        <div style={card}>
          <h3>My Package</h3>
          <p>No active package</p>
        </div>

        <div style={card}>
          <h3>Customer Inquiries</h3>
          <p>0 inquiries</p>
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
        <p style={{ color: "#777" }}>
          Property uploads and package purchases
          will be available soon.
        </p>
      </section>
    </main>
  );
}
