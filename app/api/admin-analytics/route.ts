
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers
      .get("authorization")
      ?.replace(/^Bearer\s+/i, "");

    if (!token) {
      return NextResponse.json(
        { error: "Oturum gerekli." },
        { status: 401 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anonKey || !serviceKey) {
      return NextResponse.json(
        { error: "Sunucu yapılandırması eksik." },
        { status: 500 }
      );
    }

    const authClient = createClient(url, anonKey);
    const { data: authData, error: authError } =
      await authClient.auth.getUser(token);

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: "Geçersiz oturum." },
        { status: 401 }
      );
    }

    const adminClient = createClient(url, serviceKey);

    const { data: admin, error: adminError } =
      await adminClient
        .from("admin_users")
        .select("user_id")
        .eq("user_id", authData.user.id)
        .maybeSingle();

    if (adminError || !admin) {
      return NextResponse.json(
        { error: "Yönetici yetkisi gerekli." },
        { status: 403 }
      );
    }

    const { count, error: countError } =
      await adminClient
        .from("visitor_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "page_view");

    if (countError) {
      throw countError;
    }

    return NextResponse.json({
      totalPageViews: count ?? 0
    });
  } catch (error) {
    console.error("Analitik API hatası:", error);

    return NextResponse.json(
      { error: "Analitik verileri alınamadı." },
      { status: 500 }
    );
  }
}
