"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
export default function DreamToRealityPage() {
  const [dream, setDream] = useState("");
const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
const [maxBudget, setMaxBudget] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("EUR");
 const [propertyType, setPropertyType] = useState("");
 const [purchasePurpose, setPurchasePurpose] = useState("");
 const [matchedProperties, setMatchedProperties] = useState<any[]>([]);
const [searchLoading, setSearchLoading] = useState(false);
const [searchError, setSearchError] = useState(""); 
  const searchProperties = async () => {
  setSearchLoading(true);
  setSearchError("");
  setMatchedProperties([]);

  try {
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id,title,city,country,street_address,property_type,price,currency,area_sqm,description,image,status"
      )
      .eq("status", "active")
      .limit(100);

    if (error) throw error;

    setMatchedProperties(data ?? []);
  } catch (error) {
    console.error("Property search error:", error);
    setSearchError("İlanlar yüklenirken bir hata oluştu.");
  } finally {
    setSearchLoading(false);
  }
};
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f5ef",
        padding: "60px 20px",
        color: "#18382c",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p style={{ letterSpacing: "4px", fontSize: "13px" }}>
         VELORA PRIME ELITE 
        </p>

        <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)" }}>
          DREAM TO REALITY
        </h1>

        <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
          Hayalinizdeki yaşamı anlatın.
          Size en uygun gayrimenkulü birlikte bulalım.
        </p>

        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="Hayalinizdeki evi bize anlatın..."
          aria-label="Hayalinizdeki ev"
          rows={5}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #b99a60",
            fontSize: "16px",
            marginTop: "30px",
          }}
        />
<input
  type="text"
  value={location}
onChange={(e) => setLocation(e.target.value)}
  placeholder="Tercih ettiğiniz şehir veya bölge"
  aria-label="Tercih edilen konum"
  style={{
    width: "100%",
    boxSizing: "border-box",
    padding: "16px",
    marginTop: "20px",
    borderRadius: "12px",
    border: "1px solid #b99a60",
    fontSize: "16px",
  }}
/>
       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "20px",
  }}
>
  <input
    type="number"
    min="0"
    placeholder="Min. Bütçe"
    aria-label="Minimum bütçe"
    value={minBudget}
    onChange={(e) => setMinBudget(e.target.value)}
    style={{
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #b99a60",
      fontSize: "16px",
    }}
  />

  <input
    type="number"
    min="0"
    placeholder="Maks. Bütçe"
    aria-label="Maksimum bütçe"
    value={maxBudget}
    onChange={(e) => setMaxBudget(e.target.value)}
    style={{
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #b99a60",
      fontSize: "16px",
    }}
  />
</div> 
        <select
  aria-label="Bütçe para birimi"
  value={budgetCurrency}
  onChange={(e) => setBudgetCurrency(e.target.value)}
  style={{
    width: "100%",
    padding: "16px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "1px solid #b99a60",
    background: "#ffffff",
    color: "#18382c",
    fontSize: "16px",
  }}
>
  <option value="EUR">Euro (€)</option>
  <option value="USD">Dolar ($)</option>
  <option value="TRY">Türk Lirası (₺)</option>
</select>
        <select
  aria-label="Gayrimenkul türü"
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
  style={{
    width: "100%",
    padding: "16px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "1px solid #b99a60",
    background: "#ffffff",
    color: "#18382c",
    fontSize: "16px",
  }}
>
  <option value="">Gayrimenkul Türü Seçiniz</option>
  <option value="Apartment">Daire</option>
  <option value="Villa">Villa</option>
  <option value="Land">Arsa</option>
  <option value="Commercial">Ticari Gayrimenkul</option>
</select>
        <select
  aria-label="Satın alma amacı"
  value={purchasePurpose}
  onChange={(e) => setPurchasePurpose(e.target.value)}
  style={{
    width: "100%",
    padding: "16px",
    marginTop: "12px",
    borderRadius: "12px",
    border: "1px solid #b99a60",
    background: "#ffffff",
    color: "#18382c",
    fontSize: "16px",
  }}
>
  <option value="">Satın Alma Amacınız</option>
  <option value="living">Yaşamak</option>
  <option value="investment">Yatırım Yapmak</option>
  <option value="both">Hem Yaşamak Hem Yatırım</option>
</select>
        {minBudget !== "" &&
  maxBudget !== "" &&
  Number(minBudget) > Number(maxBudget) && (
    <p
      role="alert"
      style={{
        color: "#b42318",
        fontSize: "14px",
        marginTop: "12px",
      }}
    >
      Minimum bütçe, maksimum bütçeden yüksek olamaz.
    </p>
  )}
        <button
          type="button"
         onClick={searchProperties}
          disabled={
  !dream.trim() ||
  (minBudget !== "" && maxBudget !== "" &&
    Number(minBudget) > Number(maxBudget)) ||
  (minBudget !== "" && Number(minBudget) < 0) ||
  (maxBudget !== "" && Number(maxBudget) < 0)
}
          style={{
            marginTop: "20px",
            padding: "16px 35px",
            borderRadius: "10px",
            border: "none",
            background: "#18382c",
            color: "#ffffff",
            fontSize: "16px",
            cursor:
  !dream.trim() ||
  (minBudget !== "" &&
    maxBudget !== "" &&
    Number(minBudget) > Number(maxBudget)) ||
  (minBudget !== "" && Number(minBudget) < 0) ||
  (maxBudget !== "" && Number(maxBudget) < 0)
    ? "not-allowed"
    : "pointer",

opacity: !dream.trim() ||
  (minBudget !== "" && maxBudget !== "" &&
    Number(minBudget) > Number(maxBudget)) ||
(minBudget !== "" && Number(minBudget) < 0) ||
(maxBudget !== "" && Number(maxBudget) < 0)
  ? 0.5 : 1,
          }}
        >
          Hayalime Uygun Evleri Bul
        </button>
        {searchLoading && (
  <p style={{ marginTop: "20px", color: "#18382c" }}>
    Gayrimenkuller aranıyor...
  </p>
)}

{searchError && (
  <p style={{ marginTop: "20px", color: "#b91c1c" }}>
    {searchError}
  </p>
)}

{matchedProperties.length > 0 && (
  <p style={{ marginTop: "20px", color: "#18382c" }}>
    {matchedProperties.length} gayrimenkul bulundu.
  </p>
)}
      </div>
    </main>
  );
}
