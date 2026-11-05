"use client";

import { useState } from "react";

export default function DreamToRealityPage() {
  const [dream, setDream] = useState("");

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
          AEGEAN PRIME ELITE
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

        <button
          type="button"
          disabled={!dream.trim()}
          style={{
            marginTop: "20px",
            padding: "16px 35px",
            borderRadius: "10px",
            border: "none",
            background: "#18382c",
            color: "#ffffff",
            fontSize: "16px",
            cursor: dream.trim() ? "pointer" : "not-allowed",
            opacity: dream.trim() ? 1 : 0.5,
          }}
        >
          Hayalime Uygun Evleri Bul
        </button>
      </div>
    </main>
  );
}
