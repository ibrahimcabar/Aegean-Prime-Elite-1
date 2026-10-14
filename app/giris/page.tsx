
"use client";

import { useState } from "react";

export default function GirisPage() {
  const [kayit, setKayit] = useState(false);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <div style={{
        background: "white",
        padding: 32,
        width: "100%",
        maxWidth: 430,
        border: "1px solid #e8e1d5"
      }}>
        <h1 style={{
          color: "#b89b68",
          textAlign: "center",
          letterSpacing: 3
        }}>
          AEGEAN PRIME ELITE
        </h1>

        <p style={{ textAlign: "center", color: "#777" }}>
          GLOBAL REAL ESTATE
        </p>

        <h2 style={{ marginTop: 35, color: "#222" }}>
          {kayit ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email address"
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {kayit ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => setKayit(!kayit)}
          style={{
            background: "none",
            border: "none",
            marginTop: 22,
            color: "#96794c",
            cursor: "pointer"
          }}
        >
          {kayit
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </button>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: 15,
  marginTop: 15,
  border: "1px solid #ddd",
  color: "#222",
  background: "#fff",
  boxSizing: "border-box" as const
};

const buttonStyle = {
  width: "100%",
  padding: 16,
  marginTop: 25,
  background: "#b89b68",
  color: "white",
  border: "none",
  cursor: "pointer"
};
