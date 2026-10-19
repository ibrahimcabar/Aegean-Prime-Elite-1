
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminPage() {
  
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user }, error } =
        await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/giris");
        return;
      }

      const { data, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !data) {
        router.replace("/");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading || !authorized) {
    return <main style={{ padding: 40 }}>
      Yetki kontrol ediliyor...
    </main>;
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f7f4",
      padding: "30px 20px",
      color: "#222"
    }}>
      <h1 style={{ color: "#b89b68" }}>
        AEGEAN PRIME ELITE
      </h1>
      <h2>Yönetici Paneli</h2>
      <p>Golden Life Başvuru Yönetimi</p>
      <p>Panel kurulumu devam ediyor.</p>
    </main>
  );
}
