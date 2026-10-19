
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
const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 20, marginBottom: 24 }}>
  {[
    { title: "Toplam Başvuru", count: leads.length, color: "#b89b68" },
    { title: "Yeni Başvurular", count: leads.filter(l => (l.status || "yeni") === "yeni").length, color: "#22a447" },
    { title: "Aranan Müşteriler", count: leads.filter(l => l.status === "arandi").length, color: "#d5a000" },
    { title: "Tamamlanan Satışlar", count: leads.filter(l => l.status === "satis_tamamlandi").length, color: "#8b5cf6" }
  ].map(item => (
    <div key={item.title} style={{ background: "#fff", border: "1px solid #e5dccb", borderRadius: 12, padding: 18 }}>
      <div style={{ color: "#555", fontSize: 14 }}>{item.title}</div>
      <div style={{ color: item.color, fontSize: 30, fontWeight: "bold", marginTop: 8 }}>{item.count}</div>
    </div>
  ))}
</div>
<input
  type="text"
  placeholder="🔍 İsim, telefon veya e-posta ile ara..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box"
  }}
/>
<div style={{
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 20,
  marginBottom: 20
}}>
  {[
    { label: "Tüm Başvurular", value: "all" },
    { label: "Yeni Başvurular", value: "new" },
    { label: "Aranan Müşteriler", value: "called" },
    { label: "Tamamlanan Satışlar", value: "completed" }
  ].map((item) => (
    <button
      key={item.value}
      onClick={() => setStatusFilter(item.value)}
      style={{
        padding: "12px 16px",
        borderRadius: 10,
        border: "1px solid #b89b68",
        background: statusFilter === item.value ? "#b89b68" : "#fff",
        color: statusFilter === item.value ? "#fff" : "#222",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      {item.label}
    </button>
  ))}
</div>
<div style={{ display: "grid", gap: 16, marginTop: 24 }}>
 {leads.filter((lead) => {
  const matchesSearch = [
    lead.full_name,
    lead.phone,
    lead.email
  ].some((value) =>
    String(value ?? "")
      .toLocaleLowerCase("tr-TR")
      .includes(searchTerm.toLocaleLowerCase("tr-TR").trim())
  );

  const matchesStatus =
    statusFilter === "all" ||
    (lead.status || "new") === statusFilter;

  return matchesSearch && matchesStatus;
}).map((lead) => (
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
