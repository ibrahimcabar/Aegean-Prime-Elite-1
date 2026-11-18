
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Oturum gerekli." },
        { status: 401 }
      );
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return NextResponse.json(
        { error: "Geçersiz oturum." },
        { status: 401 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publicKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!url || !publicKey || !secretKey) {
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası." },
        { status: 500 }
      );
    }

    const authClient = createClient(url, publicKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Geçersiz oturum." },
        { status: 401 }
      );
    }

    const adminClient = createClient(url, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: admin, error: adminError } =
      await adminClient
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError) {
      return NextResponse.json(
        { error: "Yetki kontrolü yapılamadı." },
        { status: 500 }
      );
    }

    if (!admin) {
      return NextResponse.json(
        { error: "Yönetici yetkisi gerekli." },
        { status: 403 }
      );
    }

    const { data, error } = await adminClient
      .from("property_edit_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Property edit requests error:", error);

      return NextResponse.json(
        { error: "Değişiklik talepleri alınamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { requests: data ?? [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Admin property edits GET error:", error);

    return NextResponse.json(
      { error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
