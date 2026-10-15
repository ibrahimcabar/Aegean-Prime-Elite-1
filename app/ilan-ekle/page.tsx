
"use client";

import { useState } from "react";

export default function IlanEklePage() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();

    if (!title) {
      setMessage("Please enter a property title.");
      return;
    }

    setMessage(
      "Form completed successfully. Database saving will be added next."
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 16,
    boxSizing: "border-box",
    background: "#fff",
    color: "#222",
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      padding: "30px 16px",
      color: "#222",
    }}>
      <div style={{
        maxWidth: 650,
        margin: "auto",
        background: "white",
        padding: 24,
        borderRadius: 12,
      }}>
        <h1 style={{ color: "#b89b68" }}>
          AEGEAN PRIME ELITE
        </h1>

        <h2>Add New Property</h2>
        <p>List your property worldwide.</p>

        <form onSubmit={handleSubmit}
          style={{ display: "grid", gap: 16 }}>

          <input name="title" required
            placeholder="Property Title"
            style={inputStyle} />

          <select name="type" style={inputStyle}>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>

          <input name="country" required
            placeholder="Country"
            style={inputStyle} />

          <input name="city" required
            placeholder="City"
            style={inputStyle} />

          <input name="address"
            placeholder="Street / Address"
            style={inputStyle} />

          <input name="price" type="number"
            min="0" required
            placeholder="Price"
            style={inputStyle} />

          <select name="currency" style={inputStyle}>
            <option>EUR</option>
            <option>USD</option>
            <option>TRY</option>
            <option>GBP</option>
          </select>
          
<label style={{ fontWeight: 600 }}>
  Property Photos
</label>

<input
  name="photos"
  type="file"
  accept="image/*"
  multiple
  style={inputStyle}
/>
          <textarea name="description"
            placeholder="Property Description"
            rows={5}
            style={inputStyle} />

          <button type="submit" style={{
            padding: 16,
            background: "#b89b68",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 17,
            cursor: "pointer",
          }}>
            Continue
          </button>
        </form>

        {message && (
          <p role="status" style={{
            color: "#947748",
            marginTop: 20,
          }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
