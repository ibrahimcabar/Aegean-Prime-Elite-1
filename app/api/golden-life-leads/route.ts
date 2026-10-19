
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const full_name = String(data.full_name ?? "").trim();
    const phone = String(data.phone ?? "").trim();
    const email = String(data.email ?? "").trim();
    const property_type = String(data.property_type ?? "").trim();
    const message = String(data.message ?? "").trim();

    if (
      !full_name || !phone || !property_type ||
      full_name.length > 150 ||
      phone.length > 40 ||
      email.length > 254 ||
      property_type.length > 100 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        { error: "Geçersiz başvuru bilgileri." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Sunucu yapılandırması eksik." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, key);

    const { error } = await supabase
      .from("golden_life_leads")
      .insert({
        full_name,
        phone,
        email,
        property_type,
        message,
      });

    if (error) {
      console.error("Golden Life kayıt hatası:", error.message);
      return NextResponse.json(
        { error: "Başvuru kaydedilemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "İstek işlenemedi." },
      { status: 400 }
    );
  }
}
