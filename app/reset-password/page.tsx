
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function verifyRecovery() {
      try {
        const params = new URLSearchParams(window.location.search);
        const tokenHash = params.get("token_hash");
        const type = params.get("type");
        const code = params.get("code");

        if (tokenHash && type === "recovery") {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });

          if (!active) return;
          setAuthorized(!error);
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (!active) return;
          setAuthorized(!error);
        } else {
          const hash = new URLSearchParams(
            window.location.hash.substring(1)
          );

          const accessToken = hash.get("access_token");
          const refreshToken = hash.get("refresh_token");
          const recoveryType = hash.get("type");

          if (
            recoveryType === "recovery" &&
            accessToken &&
            refreshToken
          ) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (!active) return;
            setAuthorized(!error);
          } else {
            setAuthorized(false);
          }
        }
      } catch {
        if (active) setAuthorized(false);
      } finally {
        if (active) setChecking(false);
      }
    }

    verifyRecovery();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading || !authorized) return;

    if (password.length < 8) {
      setMessage("Şifreniz en az 8 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setMessage("Şifre güncellenemedi. Yeni bağlantı isteyin.");
      } else {
        setSuccess(true);
        setMessage("Şifreniz başarıyla güncellendi.");
        await supabase.auth.signOut();
      }
    } catch {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
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
          Yeni Şifre Belirle
        </h2>

        {checking ? (
          <p className="mt-6 text-center text-slate-300">
            Bağlantı doğrulanıyor...
          </p>
        ) : !authorized ? (
          <div className="mt-6 text-center">
            <p className="text-red-300">
              Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
            </p>
            <a
              href="/forgot-password"
              className="mt-5 block text-amber-400"
            >
              Yeni bağlantı iste
            </a>
          </div>
        ) : success ? (
          <div className="mt-6 text-center">
            <p className="text-green-400">{message}</p>
            <a
              href="/giris"
              className="mt-5 block rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950"
            >
              Giriş Yap
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Yeni şifre (en az 8 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Yeni şifreyi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-50"
            >
              {loading ? "Güncelleniyor..." : "Şifremi Güncelle"}
            </button>

            {message && (
              <p role="status" className="text-center text-sm text-red-300">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
