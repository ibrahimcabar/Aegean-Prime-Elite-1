
"use client";

import { useState } from "react";

export default function IlanEklePage() {
  const [mesaj, setMesaj] = useState("");

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      padding: 24,
      color: "#222"
    }}>
      <div style={{ maxWidth: 650, margin: "auto" }}>
        <h1 style={{ color: "#b89b68" }}>
          AEGEAN PRIME ELITE
        </h1>
        <h2>Add New Property</h2>
        <p>List your property worldwide.</p>

        <form onSubmit={(e) => {
          e.preventDefault();
          setMesaj("Property form completed. Database connection coming next.");
        }}>
          {[
            "Property Title",
            "Country",
            "City",
            "Street Address",
            "Price",
            "Property Size (m²)"
          ].map((alan) => (
            <input
              key={alan}
              placeholder={alan}
              required
              style={{
                display: "block",
                width: "100%",
                padding: 15,
                marginBottom: 15,
                border: "1px solid #ddd",
                borderRadius: 8,
                boxSizing: "border-box"
              }}
            />
          ))}

          <button type="submit" style={{
            background: "#b89b68",
            color: "white",
            padding: 16,
            border: "none",
            width: "100%",
            borderRadius: 8
          }}>
            Continue
          </button>
        </form>

        <p role="status">{mesaj}</p>
      </div>
    </main>
  );
}
  
