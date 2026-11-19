
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        setMessage("İşlem gerçekleştirilemedi. Lütfen tekrar deneyin.");
      } else {
        setMessage(
          "E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderilecektir. Gelen kutunuzu kontrol edin."
        );
      }
    } catch {
      setMessage("Bir bağlantı hatası oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-amber-400 text-center">
          VELORA PRIME ELITE
        </h1>

        <h2 className="mt-6 text-xl font-semibold text-center">
          Şifremi Unuttum
        </h2>

        <p className="mt-3 text-sm text-slate-300 text-center">
          E-posta adresinizi girin. Size şifre sıfırlama bağlantısı gönderelim.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-50"
          >
            {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-5 text-sm text-center text-amber-300">
            {message}
          </p>
        )}

        <a
          href="/giris"
          className="mt-6 block text-center text-sm text-slate-300 hover:text-amber-400"
        >
          Giriş sayfasına dön
        </a>
      </div>
    </main>
  );
}
