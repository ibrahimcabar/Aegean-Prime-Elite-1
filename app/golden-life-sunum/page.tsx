"use client";

import { useState } from "react";

export default function GoldenLifeSunum() {
  const [page, setPage] = useState(0);

  const sections = [
    "PROJE TANITIMI",
    "KONUT SEÇENEKLERİ",
    "FİYATLAR VE ÖDEME PLANLARI",
    "KOOPERATİF KATILIM ÜCRETİ",
    "AEGEAN PRIME ELITE SİSTEMİ",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#102820",
        color: "#e8c985",
        padding: "40px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ letterSpacing: 5 }}>
        AEGEAN PRIME ELITE
      </p>

      <h1 style={{ fontSize: "clamp(36px, 6vw, 90px)" }}>
        GOLDEN LIFE
      </h1>

      <h2>{sections[page]}</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        <button
          onClick={() =>
            setPage((page - 1 + sections.length) % sections.length)
          }
        >
          ❮ Önceki
        </button>

        <button
          onClick={() =>
            setPage((page + 1) % sections.length)
          }
        >
          Sonraki ❯
        </button>
      </div>

      <p style={{ marginTop: 30 }}>
        {page + 1} / {sections.length}
      </p>
    </main>
  );
}
