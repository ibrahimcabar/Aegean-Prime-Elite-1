
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
  const [totalPageViews, setTotalPageViews] = useState<number | null>(null);
const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [todayPageViews, setTodayPageViews] = useState<number | null>(null);
  const [dailyViews, setDailyViews] = useState<
  { date: string; views: number }[]
>([]);
   const [propertyDetails, setPropertyDetails] = useState<
  {
    id: number;
    title: string;
    city: string;
    country: string;
    image: string | null;
  }[]
>([]); 
  const [propertyViewCounts, setPropertyViewCounts] =
  useState<Record<string, number>>({});
  const [analyticsError, setAnalyticsError] = useState("");
const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  function exportToExcel() {
  const headers = [
    "Ad Soyad",
    "Telefon",
    "E-posta",
    "Başvuru Tarihi",
    "Durum"
  ];

  const escapeCSV = (value: unknown) => {
    let text = String(value ?? "");

    // Excel'de formül olarak çalışmasını önle
    if (/^[\s]*[=+\-@\t\r\n]/.test(text)) {
      text = "'" + text;
    }

    return '"' + text.replace(/"/g, '""') + '"';
  };

  const rows = leads.map((lead) => [
    lead.full_name,
    lead.phone,
    lead.email,
    lead.created_at
      ? new Date(lead.created_at).toLocaleString("tr-TR")
      : "",
    lead.status || "yeni"
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCSV).join(";"))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "golden-life-basvurular.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
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
async function saveLeadNote(id: number, notes: string) {
  const { data, error } = await supabase
    .from("golden_life_leads")
    .update({ notes })
    .eq("id", id)
    .select("id");

  if (error) {
    alert("Not kaydedilemedi: " + error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("Not kaydedilemedi. Veritabanı yetkilerini kontrol et.");
    return;
  }

  setLeads((prev) =>
    prev.map((lead) =>
      lead.id === id ? { ...lead, notes } : lead
    )
  );

  alert("Müşteri notu kaydedildi! ✅");
}
  async function saveFollowUpDate(id: number, follow_up_date: string) {
  const { data, error } = await supabase
    .from("golden_life_leads")
    .update({ follow_up_date: follow_up_date || null })
    .eq("id", id)
    .select("id");

  if (error || !data || data.length === 0) {
    alert("Takip tarihi kaydedilemedi: " + (error?.message || "Yetki hatası"));
    return;
  }

  setLeads((prev) =>
    prev.map((lead) =>
      lead.id === id ? { ...lead, follow_up_date } : lead
    )
  );

  alert("Takip tarihi kaydedildi! ✅");
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
      
const { data: sessionData } =
  await supabase.auth.getSession();

const accessToken = sessionData.session?.access_token;

if (accessToken) {
  try {
    const response = await fetch("/api/admin-analytics", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Analitik hatası");
    }

    setTotalPageViews(result.totalPageViews ?? 0);
setUniqueVisitors(result.uniqueVisitors ?? 0);
setTodayPageViews(result.todayPageViews ?? 0);
setDailyViews(result.dailyViews ?? []);
  setPropertyViewCounts(result.propertyViewCounts ?? {});  
setPropertyDetails(result.propertyDetails ?? []);
    setAnalyticsError("");
  } catch (error) {
    console.error("Analitik verisi alınamadı:", error);
    setAnalyticsError("Ziyaretçi verileri yüklenemedi.");
  }
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
  padding: "clamp(16px, 4vw, 30px)",
  color: "#222",
  width: "100%",
  boxSizing: "border-box",
  overflowX: "hidden"
}}>
      <h1 style={{ color: "#b89b68" }}>
        AEGEAN PRIME ELITE
      </h1>
      <h2>Yönetici Paneli</h2>
      
<div
  style={{
    background: "#18382c",
    color: "#ffffff",
    padding: 24,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 24,
  }}
>
  <h2 style={{ color: "#d6bd88", marginTop: 0 }}>
    📊 Ziyaretçi Analitiği
  </h2>

  <p style={{ color: "#e8e5dc" }}>
    Aegean Prime Elite ziyaretçi ve ilan performans merkezi
  </p>

  <div
    style={{
      background: "rgba(255,255,255,0.08)",
      padding: 18,
      borderRadius: 12,
      marginTop: 18,
    }}
  >
    
<strong>📈 Toplam Sayfa Görüntülenmesi</strong>

<div
  style={{
    fontSize: 36,
    fontWeight: "bold",
    color: "#d6bd88",
    marginTop: 12,
  }}
>
  {analyticsError
    ? "Veri alınamadı"
    : totalPageViews === null
      ? "Yükleniyor..."
      : totalPageViews.toLocaleString("tr-TR")}
</div>
<div
  style={{
    background: "rgba(255,255,255,0.08)",
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  }}
>
  <strong>📅 Bugünkü Sayfa Görüntülemeleri</strong>

  <div
    style={{
      fontSize: 36,
      fontWeight: "bold",
      color: "#d6bd88",
      marginTop: 12,
    }}
  >
    {analyticsError
      ? "Veri alınamadı"
      : todayPageViews === null
        ? "Yükleniyor..."
        : todayPageViews.toLocaleString("tr-TR")}
  </div>
</div>
{analyticsError && (
  <p style={{ color: "#ffb4a8" }}>
    {analyticsError}
  </p>
)}

 <div
  style={{
    background: "rgba(255, 255, 255, 0.08)",
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  }}
>
  <strong>👥 Benzersiz Ziyaretçiler</strong>

  <div
    style={{
      fontSize: 36,
      fontWeight: "bold",
      color: "#d6bd88",
      marginTop: 12,
    }}
  >
    {analyticsError
      ? "Veri alınamadı"
            : uniqueVisitors.toLocaleString("tr-TR")}
  </div>
</div>
</div>
</div>
<div style={{
  background: "#ffffff",
  border: "1px solid #e5dccb",
  borderRadius: 16,
  padding: 20,
  marginBottom: 24
}}>
  <h3 style={{ color: "#18382c" }}>
    📊 Son 7 Günlük Ziyaretçi Grafiği
  </h3>

  <div style={{
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    height: 220,
    marginTop: 25
  }}>
    {dailyViews.map((day) => {
      const maxViews = Math.max(
        1,
        ...dailyViews.map((item) => item.views)
      );

      const height = (day.views / maxViews) * 160;

      return (
        <div
          key={day.date}
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: "center"
          }}
        >
          <div style={{
            fontSize: 13,
            marginBottom: 8,
            color: "#18382c"
          }}>
            {day.views}
          </div>

          <div style={{
            height: Math.max(height, 3),
            background: "#b89b68",
            borderRadius: "6px 6px 0 0"
          }} />

          <div style={{
            fontSize: 11,
            marginTop: 10,
            color: "#666"
          }}>
            {day.date.slice(5)}
          </div>
        </div>
      );
    })}
  </div>
</div>
     <div style={{
  marginTop: 35,
  marginBottom: 35,
  padding: 25,
  background: "#ffffff",
  border: "1px solid #e5dac5",
  borderRadius: 16
}}>
  <h3 style={{ color: "#18382c" }}>
    🏠 En Çok Görüntülenen İlanlar
  </h3>

  {Object.entries(propertyViewCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([propertyId, views]) => (
      <div
        key={propertyId}
        style={{
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 12,
  padding: "16px 0",
  borderBottom: "1px solid #eee"
}}
      >
        {(() => {
  const property = propertyDetails.find(
    (item) => String(item.id) === String(propertyId)
  );

  return property?.image ? (
    <img
      src={property.image}
      alt={property.title}
      style={{
        width: 90,
        height: 70,
        objectFit: "cover",
        borderRadius: 10,
        flexShrink: 0
      }}
    />
  ) : null;
})()}
        <div
  style={{
    flex: 1,
    minWidth: 0
  }}
>
        <a
          href={`/ilan/${propertyId}`}
          style={{
  color: "#18382c",
  fontWeight: 600,
  fontSize: 15,
  lineHeight: 1.5,
  textDecoration: "none",
  overflowWrap: "anywhere"
}}
        >
          {propertyDetails.find(
  (item) => String(item.id) === String(propertyId)
)?.title || `İlan #${propertyId}`}
        </a>
<div
  style={{
    fontSize: 12,
    color: "#777",
    marginTop: 5
  }}
>
  {(() => {
    const property = propertyDetails.find(
      (item) => String(item.id) === String(propertyId)
    );

    return property
      ? [property.city, property.country]
          .filter(Boolean)
          .join(", ")
      : "";
  })()}
  </div>
</div>
        <strong style={{ color: "#b89b68" }}>
          {views} görüntüleme
        </strong>
      </div>
    ))}
</div> 
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
      <div style={{
  background: "#fff",
  border: "1px solid #b89b68",
  borderRadius: 14,
  padding: 20,
  marginTop: 25,
  marginBottom: 25
}}>
  <h3>📞 Bugün Aranacak Müşteriler</h3>

  {(() => {
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    const dueLeads = leads.filter(
      (lead) =>
        lead.follow_up_date &&
        String(lead.follow_up_date).slice(0, 10) <= localToday
    );

    return dueLeads.length === 0 ? (
      <p>Bugün veya geçmişten bekleyen arama yok. ✅</p>
    ) : (
      dueLeads.map((lead) => (
        <div key={lead.id} style={{
          padding: 12,
          borderBottom: "1px solid #eee"
        }}>
          <strong>{lead.full_name}</strong>
          <p>📱 {lead.phone}</p>
          <p>
            {String(lead.follow_up_date).slice(0, 10) < localToday
              ? "🔴 Gecikmiş Arama"
              : "🟢 Bugün Aranacak"}
          </p>
          <p>📅 {String(lead.follow_up_date).slice(0, 10)}</p>
        </div>
      ))
    );
  })()}
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
{ label: "Yeni Başvurular", value: "yeni" },
{ label: "Aranan Müşteriler", value: "arandi" },
{ label: "Tamamlanan Satışlar", value: "satis_tamamlandi" }
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
     <button
  type="button"
  onClick={exportToExcel}
  style={{
    background: "#b89b68",
    color: "#fff",
    padding: "14px 24px",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: 20
  }}
>
  📥 Excel'e Aktar
</button> 
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
<div style={{ marginTop: 20 }}>
  <strong>📝 Müşteri Görüşme Notları</strong>

  <textarea
    key={lead.id}
    defaultValue={lead.notes || ""}
    placeholder="Müşteriyle yapılan görüşmenin detaylarını yazın..."
    id={`note-${lead.id}`}
    rows={4}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 10,
      border: "1px solid #b89b68",
      borderRadius: 10,
      fontSize: 16,
      boxSizing: "border-box"
    }}
  />

  <button
    type="button"
    onClick={() => {
      const textarea = document.getElementById(
        `note-${lead.id}`
      ) as HTMLTextAreaElement | null;

      if (textarea) {
        saveLeadNote(lead.id, textarea.value);
      }
    }}
    style={{
      marginTop: 10,
      padding: "12px 20px",
      background: "#b89b68",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    💾 Notu Kaydet
  </button>
</div>
     <div style={{ marginTop: 20 }}>
  <strong>📅 Tekrar Arama Tarihi</strong>

  <input
    type="date"
    id={`followup-${lead.id}`}
    defaultValue={lead.follow_up_date || ""}
    style={{
      display: "block",
      marginTop: 10,
      padding: 12,
      border: "1px solid #b89b68",
      borderRadius: 10,
      fontSize: 16,
      maxWidth: "100%"
    }}
  />
     <button
  type="button"
  onClick={() => {
    const input = document.getElementById(
      `followup-${lead.id}`
    ) as HTMLInputElement | null;

    if (input) {
      saveFollowUpDate(lead.id, input.value);
    }
  }}
  style={{
    marginTop: 10,
    padding: "12px 20px",
    background: "#b89b68",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  📅 Takip Tarihini Kaydet
</button>  
</div> 
    </div>
  ))}
</div>

    </main>
  );
}
