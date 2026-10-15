
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
export default function IlanEklePage() {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loggedIn, setLoggedIn] = useState(false);
async function handleLogin() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  setLoggedIn(true);
  setMessage("Login successful!");
}
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const photos = form.getAll("photos").filter(
  (file): file is File =>
    file instanceof File && file.size > 0
);
    const { data: { user }, error: authError } =
  await supabase.auth.getUser();

if (authError || !user) {
  setMessage("Please sign in to upload property photos.");
  return;
}
    const title = String(form.get("title") || "").trim();

    if (!title) {
      setMessage("Please enter a property title.");
      return;
    }
try {
  const { data: savedProperty, error } = await supabase
    .from("properties")
    .insert({
      title,
      property_type: String(form.get("type") || ""),
      country: String(form.get("country") || ""),
      city: String(form.get("city") || ""),
      street_address: String(form.get("address") || ""),
      price: Number(form.get("price") || 0),
      currency: String(form.get("currency") || "EUR"),
      description: String(form.get("description") || ""),
    });

  if (error) throw error;
for (const photo of photos) {
  const filePath = `${user.id}/${crypto.randomUUID()}-${photo.name}`;

  const { error: uploadError } = await supabase.storage
    .from("property-images")
    .upload(filePath, photo, {
      contentType: photo.type,
    });

  if (uploadError) {
    throw uploadError;
  }
}
  setMessage("Property saved successfully!");
} catch (error) {
  setMessage(
    error instanceof Error ? error.message : "Failed to save property."
  );
}
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
{!loggedIn && (
  <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
    <h3>Sign In</h3>

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={inputStyle}
    />

    <button type="button" onClick={handleLogin}>
      Sign In
    </button>
  </div>
)}
        {loggedIn && (
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
)}
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
