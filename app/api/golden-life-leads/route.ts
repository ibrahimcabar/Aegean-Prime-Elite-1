
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
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
const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
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
if (resend) {
  try {
    const { error: emailError } = await resend.emails.send({
      from: "Golden Life <onboarding@resend.dev>",
      to: "ibrahimcabar8@gmail.com",
      subject: "Golden Life - Yeni Müşteri Başvurusu",
      text: `Ad Soyad: ${full_name}
Telefon: ${phone}
E-posta: ${email}
Konut Tipi: ${property_type}
Mesaj: ${message}`,
    });

    if (emailError) {
      console.error("E-posta hatası:", emailError.message);
    }
  } catch (emailError) {
    console.error("E-posta gönderilemedi:", emailError);
  }
}
    
const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const whatsappRecipient = process.env.WHATSAPP_RECIPIENT_PHONE;

if (whatsappToken && whatsappPhoneId && whatsappRecipient) {
  try {
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v23.0/${whatsappPhoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: whatsappRecipient,
          type: "template",
          template: {
  name: "golden_life_yeni_basvuru",
  language: { code: "tr" },
  components: [
    {
      type: "body",
      parameters: [
        { type: "text", text: full_name },
        { type: "text", text: phone },
        { type: "text", text: email || "Belirtilmedi" },
        { type: "text", text: property_type },
      ],
    },
  ],
  },
}),
);

    if (!whatsappResponse.ok) {
      console.error(
        "WhatsApp gönderim hatası:",
        whatsappResponse.status,
        await whatsappResponse.text()
      );
    }
  } catch (whatsappError) {
    console.error("WhatsApp bağlantı hatası:", whatsappError);
  }
}

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "İstek işlenemedi." },
      { status: 400 }
    );
  }
}
