
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const allowedEvents = [
  "page_view",
  "property_view",
  "contact_click",
];

export async function POST(request: NextRequest) {
  try {
    
if (process.env.VISITOR_TRACKING_ENABLED !== "true") {
  return NextResponse.json(
    { error: "Ziyaretçi takibi henüz aktif değil." },
    { status: 503 }
  );
}

const contentType = request.headers.get("content-type");

if (
  !contentType ||
  !/^application\/json(?:\s*;|$)/i.test(contentType)
) {
  return NextResponse.json(
    { error: "Yalnızca JSON istekleri kabul edilir." },
    { status: 415 }
  );
}

const origin = request.headers.get("origin");

const allowedOrigins = [
  "https://aegean-prime-elite-11.vercel.app",
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

if (!origin || !allowedOrigins.includes(origin)) {
  return NextResponse.json(
    { error: "İzin verilmeyen istek kaynağı." },
    { status: 403 }
  );
}

    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > 2048) {
      return NextResponse.json(
        { error: "İstek çok büyük." },
        { status: 413 }
      );
    }

    
const rawBody = await request.text();

if (new TextEncoder().encode(rawBody).length > 2048) {
  return NextResponse.json(
    { error: "İstek boyutu sınırı aşıldı." },
    { status: 413 }
  );
}

const body = JSON.parse(rawBody);

if (
  !body ||
  typeof body !== "object" ||
  Array.isArray(body)
) {
  return NextResponse.json(
    { error: "Geçersiz veri formatı." },
    { status: 400 }
  );
}


    const {
  event_type,
  page_path,
  property_id,
  language,
  visitor_id,
} = body;

const allowedFields = [
  "event_type",
  "page_path",
  "property_id",
  "language",
  "visitor_id",
];

const hasUnexpectedFields = Object.keys(body).some(
  (key) => !allowedFields.includes(key)
);

if (hasUnexpectedFields) {
  return NextResponse.json(
    { error: "İzin verilmeyen veri alanı." },
    { status: 400 }
  );
}
if (
  visitor_id != null &&
  (typeof visitor_id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitor_id))
) {
  return NextResponse.json(
    { error: "Geçersiz ziyaretçi kimliği." },
    { status: 400 }
  );
}
if (
  (event_type === "property_view" &&
    (!property_id || typeof property_id !== "string")) ||
  (event_type !== "property_view" &&
    property_id != null)
) {
  return NextResponse.json(
    { error: "Geçersiz ilan bilgisi." },
    { status: 400 }
  );
}

    if (
      !allowedEvents.includes(event_type) ||
      typeof page_path !== "string" ||
      !/^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(page_path) ||
      page_path.length > 200 ||
      (property_id != null &&
        (typeof property_id !== "string" ||
          property_id.length > 100)) ||
      (language != null &&
        !["tr", "en", "de", "ru", "ar"].includes(language))
    ) {
      return NextResponse.json(
        { error: "Geçersiz analitik verisi." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Analitik servisi yapılandırılmadı." },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase
      .from("visitor_events")
      .insert({
  event_type,
  page_path,
  property_id: property_id || null,
  language: language || null,
  visitor_id: visitor_id || null,
});

    if (error) {
      console.error("Analitik kayıt hatası:", error.message);

      return NextResponse.json(
        { error: "Kayıt oluşturulamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Geçersiz istek." },
      { status: 400 }
    );
  }
}
