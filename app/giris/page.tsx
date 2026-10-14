
"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default function GirisPage() {
  const [kayit, setKayit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!url || !key) {
      setMessage("Supabase connection is not configured.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient(url, key);

      if (kayit) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/giris",
          },
        });

        if (error) throw error;

        setMessage(
          data.session
            ? "Account created successfully!"
            : "Please check your email to confirm your account."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Signed in successfully!");
      }
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: 15,
    marginTop: 15,
    border: "1px solid #ddd",
    color: "#222",
    background: "#fff",
    boxSizing: "border-box" as const,
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      <div style={{
        background: "white",
        padding: 32,
        width: "100%",
        maxWidth: 430,
        border: "1px solid #e8e1d5",
      }}>
        <h1 style={{
          color: "#b89b68",
          textAlign: "center",
          letterSpacing: 3,
        }}>
          AEGEAN PRIME ELITE
        </h1>

        <p style={{ textAlign: "center", color: "#777" }}>
          GLOBAL REAL ESTATE
        </p>

        <h2 style={{ marginTop: 35, color: "#222" }}>
          {kayit ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={12}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 16,
              marginTop: 25,
              background: "#b89b68",
              color: "white",
              border: "none",
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : kayit ? "Create Account" : "Sign In"}
          </button>
        </form>

        {message && (
          <p role="status" style={{
            color: "#96794c",
            marginTop: 18,
            overflowWrap: "anywhere",
          }}>
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setKayit(!kayit);
            setMessage("");
          }}
          style={{
            background: "none",
            border: "none",
            marginTop: 22,
            color: "#96794c",
            cursor: "pointer",
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
