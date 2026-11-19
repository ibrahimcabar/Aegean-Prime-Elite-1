
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
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

    const body = await request.json().catch(() => null);
    const id = body?.id;

    if (!Number.isSafeInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "Geçersiz başvuru numarası." },
        { status: 400 }
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

    const { error: approvalError } = await adminClient.rpc(
      "admin_approve_partner_application",
      {
        p_application_id: id,
        p_admin_user_id: user.id,
      }
    );

    if (approvalError) {
      console.error("Partner approval error:", approvalError);

      return NextResponse.json(
        { error: "Başvuru onaylanamadı." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Başvuru onaylandı.",
    });
  } catch (error) {
    console.error("Admin approval error:", error);

    return NextResponse.json(
      { error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
