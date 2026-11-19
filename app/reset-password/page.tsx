
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
        setMessage(
          "Şifre güncellenemedi. Yeni bağlantı isteyin."
        );
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
    <main className="velora-auth">
      <div className="velora-auth-card">
        <h1 className="velora-auth-brand">
          VELORA PRIME ELITE
        </h1>

        <h2 className="velora-auth-title">
          Yeni Şifre Belirle
        </h2>

        {checking ? (
          <p className="velora-auth-description">
            Bağlantı doğrulanıyor...
          </p>
        ) : !authorized ? (
          <div>
            <p className="velora-auth-message velora-auth-error">
              Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
            </p>

            <a
              href="/forgot-password"
              className="velora-auth-link"
            >
              Yeni bağlantı iste
            </a>
          </div>
        ) : success ? (
          <div>
            <p className="velora-auth-message velora-auth-success">
              {message}
            </p>

            <a
              href="/giris"
              className="velora-auth-button velora-auth-link"
            >
              Giriş Yap
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="velora-auth-form"
          >
            <p className="velora-auth-description">
              Hesabınız için güvenli bir yeni şifre oluşturun.
            </p>

            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Yeni şifre (en az 8 karakter)"
              aria-label="Yeni şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="velora-auth-input"
            />

            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Yeni şifreyi tekrar girin"
              aria-label="Yeni şifreyi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="velora-auth-input"
            />

            <button
              type="submit"
              disabled={loading}
              className="velora-auth-button"
            >
              {loading
                ? "Güncelleniyor..."
                : "Şifremi Güncelle"}
            </button>

            {message && (
              <p
                role="alert"
                className="velora-auth-message velora-auth-error"
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
