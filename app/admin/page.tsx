
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminPage() {
  
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

async function updateLeadStatus(id: number, status: string) {
  const { error } = await supabase
    .from("golden_life_leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    alert("Durum güncellenemedi: " + error.message);
    return;
  }

  setLeads((prev) =>
    prev.map((lead) =>
      lead.id === id ? { ...lead, status } : lead
    )
  );
}

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user }, error } =
        await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/giris");
        return;
      }

      const { data, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !data) {
        router.replace("/");
        return;
      }
const { data: leadData, error: leadError } = await supabase
  .from("golden_life_leads")
  .select("*")
  .order("created_at", { ascending: false });

if (leadError) {
  console.error("Başvurular alınamadı:", leadError);
} else {
  setLeads(leadData || []);
}
      setAuthorized(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading || !authorized) {
    return <main style={{ padding: 40 }}>
      Yetki kontrol ediliyor...
    </main>;
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      padding: "30px 20px",
      color: "#222"
    }}>
      <h1 style={{ color: "#b89b68" }}>
        AEGEAN PRIME ELITE
      </h1>
      <h2>Yönetici Paneli</h2>
      <p>Golden Life Başvuru Yönetimi</p>
      <h3>Toplam Başvuru: {leads.length}</h3>


<div style={{ display: "grid", gap: 16, marginTop: 24 }}>
  {leads.map((lead) => (
    <div
      key={lead.id}
      style={{
        background: "#fff",
        border: "1px solid #e5dccb",
        borderRadius: 14,
        padding: 20,
        boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
        overflowWrap: "anywhere",
      }}
    >
      <h3 style={{ color: "#b89b68", marginTop: 0 }}>
        {lead.full_name}
      </h3>

      <p><strong>Telefon:</strong> {lead.phone}</p>
      <p><strong>E-posta:</strong> {lead.email}</p>
      <p>
        <strong>Başvuru Tarihi:</strong>{" "}
        {new Date(lead.created_at).toLocaleString("tr-TR")}
      </p>

      {lead.phone && (
        <a
          href={`https://wa.me/${String(lead.phone).replace(/\D/g, "").replace(/^0/, "90")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#25D366",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          WhatsApp ile İletişime Geç
        </a>
      )}
      
<div style={{ marginTop: 20 }}>
  <strong>Başvuru Durumu: </strong>
  <select
    value={lead.status || "yeni"}
    onChange={(e) =>
      updateLeadStatus(lead.id, e.target.value)
    }
    style={{
      padding: 12,
      borderRadius: 8,
      border: "1px solid #b89b68",
      background: "#fff",
      fontSize: 16,
      marginTop: 8,
      maxWidth: "100%"
    }}
  >
    <option value="yeni">🟢 Yeni</option>
    <option value="arandi">🟡 Arandı</option>
    <option value="gorusuluyor">🔵 Görüşülüyor</option>
    <option value="satis_tamamlandi">🟣 Satış Tamamlandı</option>
    <option value="iptal">🔴 İptal</option>
  </select>
</div>

    </div>
  ))}
</div>

    </main>
  );
}
