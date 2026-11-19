
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export default function SetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient(url, key);

    async function checkSession() {
      const hash = new URLSearchParams(
        window.location.hash.substring(1)
      );

      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setMessage("Davet bağlantısı geçersiz veya süresi dolmuş.");
          setReady(true);
          return;
        }

        window.history.replaceState(
          {},
          "",
          window.location.pathname
        );
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      setAuthorized(!error && !!user && !!user.email_confirmed_at);
      setReady(true);
    }

    checkSession();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 12) {
      setMessage("Şifre en az 12 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient(url, key);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage("Şifreniz başarıyla oluşturuldu.");

      await supabase.auth.signOut();

      setTimeout(() => {
        window.location.href = "/giris";
      }, 1500);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Şifre oluşturulamadı."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#071321",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}>
      <div style={{
        width: "100%",
        maxWidth: 430,
        padding: 32,
        background: "#fff",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#b89b68" }}>
          VELORA PRIME ELITE
        </h1>

        <p style={{ color: "#777" }}>
          GLOBAL REAL ESTATE
        </p>

        <h2 style={{ color: "#222" }}>
          Şifre Oluştur
        </h2>

        {!ready ? (
          <p>Oturum kontrol ediliyor...</p>
        ) : !authorized ? (
          <p style={{ color: "#b42318" }}>
            {message || "Geçerli bir davet oturumu bulunamadı."}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Yeni şifre (en az 12 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={12}
              required
              style={{
                width: "100%",
                padding: 14,
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="Şifreyi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={12}
              required
              style={{
                width: "100%",
                padding: 14,
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 15,
                marginTop: 20,
                background: "#b89b68",
                color: "#fff",
                border: "none",
              }}
            >
              {loading ? "Kaydediliyor..." : "Şifreyi Kaydet"}
            </button>

            {message && (
              <p role="status" style={{ color: "#96794c" }}>
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
