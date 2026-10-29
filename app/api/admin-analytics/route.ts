
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
// Benzersiz ziyaretçi kimliklerini getir
const { data: visitorRows, error: visitorsError } =
  await adminClient
    .from("visitor_events")
    .select("visitor_id")
    .eq("event_type", "page_view")
    .not("visitor_id", "is", null)
    .limit(10000);

if (visitorsError) {
  throw visitorsError;
}

// Tekrarlanan ziyaretçileri bir kez say
const uniqueVisitors = new Set(
  (visitorRows ?? []).map((row) => row.visitor_id)
).size;
    // Türkiye saatine göre bugünün başlangıcı
const now = new Date();

const turkeyDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(now);

const getPart = (type: string) =>
  turkeyDate.find((part) => part.type === type)?.value;

const todayTR = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;

const todayStart = new Date(
  `${todayTR}T00:00:00+03:00`
).toISOString();

// Bugünkü sayfa görüntülemeleri
const { count: todayCount, error: todayError } =
  await adminClient
    .from("visitor_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "page_view")
    .gte("created_at", todayStart);

if (todayError) {
  throw todayError;
}
// Türkiye saatine göre son 7 günün başlangıcı
const turkeyToday = new Date(
  `${todayTR}T00:00:00+03:00`
);

const sevenDaysStart = new Date(turkeyToday);
sevenDaysStart.setUTCDate(
  sevenDaysStart.getUTCDate() - 6
);

// Son 7 günlük sayfa görüntüleme kayıtları
const { data: weeklyEvents, error: weeklyError } =
  await adminClient
    .from("visitor_events")
    .select("created_at")
    .eq("event_type", "page_view")
    .gte("created_at", sevenDaysStart.toISOString())
    .order("created_at", { ascending: true })
    .limit(10000);

if (weeklyError) {
  throw weeklyError;
}

const dailyViews = Array.from({ length: 7 }, (_, i) => {
  const day = new Date(sevenDaysStart);
  day.setUTCDate(day.getUTCDate() + i);

  const date = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(day);

  const views = (weeklyEvents ?? []).filter((event) => {
    const eventDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(event.created_at));

    return eventDate === date;
  }).length;

  return { date, views };
});
    // İlan bazlı görüntüleme kayıtlarını getir
const { data: propertyEvents, error: propertyError } =
  await adminClient
    .from("visitor_events")
    .select("property_id")
    .eq("event_type", "property_view")
    .not("property_id", "is", null)
    .limit(10000);

if (propertyError) {
  throw propertyError;
}

const propertyViewCounts = (propertyEvents ?? []).reduce(
  (acc: Record<string, number>, event) => {
    const id = String(event.property_id);
    acc[id] = (acc[id] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
return NextResponse.json({
  totalPageViews: count ?? 0,
  todayPageViews: todayCount ?? 0,
  uniqueVisitors,
  dailyViews,
  propertyViewCounts,
}); 
  } catch (error) {
    console.error("Analitik API hatası:", error);

    return NextResponse.json(
      { error: "Analitik verileri alınamadı." },
      { status: 500 }
    );
  }
}
