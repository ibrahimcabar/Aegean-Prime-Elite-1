
"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        setIsError(true);
        setMessage(
          "İşlem gerçekleştirilemedi. Lütfen tekrar deneyin."
        );
      } else {
        setMessage(
          "E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderilecektir. Gelen kutunuzu kontrol edin."
        );
      }
    } catch {
      setIsError(true);
      setMessage(
        "Bir bağlantı hatası oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="velora-auth">
      <div className="velora-auth-card">
        <h1 className="velora-auth-brand">
          VELORA PRIME ELITE
        </h1>

        <h2 className="velora-auth-title">
          Şifremi Unuttum
        </h2>

        <p className="velora-auth-description">
          E-posta adresinizi girin. Size güvenli bir
          şifre sıfırlama bağlantısı gönderelim.
        </p>

        <form
          onSubmit={handleSubmit}
          className="velora-auth-form"
        >
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            aria-label="E-posta adresiniz"
            className="velora-auth-input"
          />

          <button
            type="submit"
            disabled={loading}
            className="velora-auth-button"
          >
            {loading
              ? "Gönderiliyor..."
              : "Şifre Sıfırlama Bağlantısı Gönder"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className={
              isError
                ? "velora-auth-message velora-auth-error"
                : "velora-auth-message"
            }
          >
            {message}
          </p>
        )}

        <a href="/giris" className="velora-auth-link">
          Giriş sayfasına dön
        </a>
      </div>
    </main>
  );
}
