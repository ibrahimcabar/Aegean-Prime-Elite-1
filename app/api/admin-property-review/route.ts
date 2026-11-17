
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(request: NextRequest) {
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Geçersiz oturum." },
        { status: 401 }
      );
    }

    const { data: admin, error: adminError } =
      await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError || !admin) {
      return NextResponse.json(
        { error: "Yönetici yetkisi gerekli." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => null);
    const id = body?.id;
    const status = body?.status;

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      !["active", "rejected"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Geçersiz ilan veya durum." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("properties")
      .update({ status })
      .eq("id", id)
      .eq("status", "pending")
      .select("id, status")
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "İlan güncellenemedi." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Bekleyen ilan bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      property: data,
    });
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
