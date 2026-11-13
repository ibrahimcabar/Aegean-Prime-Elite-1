
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { createHmac } from "node:crypto";

export const runtime = "nodejs";

const plans: Record<string, { price: number; count: number }> = {
  Starter: { price: 29, count: 5 },
  Professional: { price: 59, count: 10 },
  Business: { price: 99, count: 20 },
  Enterprise: { price: 199, count: 50 }
};

export async function POST(request: Request) {
  const contentLength = Number(
    request.headers.get("content-length") || 0
  );

  if (contentLength > 12000) {
    return NextResponse.json(
      { error: "Request too large" },
      { status: 413 }
    );
  }

  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const read = (key: string) =>
    typeof data[key] === "string" ? data[key].trim() : "";

  const fullName = read("full_name");
  const agencyName = read("agency_name");
  const email = read("email");
  const phone = read("phone");
  const country = read("country");
  const city = read("city");
  const message = read("message");
  const packageName = read("package_name");
  const plan = plans[packageName];

  if (
    !plan ||
    fullName.length < 2 || fullName.length > 120 ||
    agencyName.length < 2 || agencyName.length > 150 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+0-9()\s.-]{7,25}$/.test(phone) ||
    country.length > 100 ||
    city.length > 100 ||
    message.length > 2000 ||
    data.privacy_consent !== true
  ) {
    return NextResponse.json(
      { error: "Invalid application details" },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }

  const supabase = createClient(url, secret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  // Vercel üzerinden ziyaretçinin IP adresini al.
  const ip = (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    ""
  ).split(",")[0].trim();

  if (!ip) {
    return NextResponse.json(
      { error: "Request verification unavailable" },
      { status: 503 }
    );
  }

  // IP adresini açık şekilde kaydetme.
  const ipHash = createHmac("sha256", secret)
    .update(ip)
    .digest("hex");

  // Supabase üzerinden başvuru sınırını kontrol et.
  const { data: allowed, error: limitError } =
    await supabase.rpc(
      "check_partner_application_limit",
      { p_ip_hash: ipHash }
    );

  if (limitError) {
    console.error(
      "Partner rate limit error:",
      limitError.message
    );

    return NextResponse.json(
      { error: "Application service temporarily unavailable" },
      { status: 503 }
    );
  }

  if (allowed !== true) {
    return NextResponse.json(
      {
        error: "Too many attempts. Please try again later."
      },
      {
        status: 429,
        headers: { "Retry-After": "3600" }
      }
    );
  }

  const { error } = await supabase
    .from("partner_applications")
    .insert({
      full_name: fullName,
      agency_name: agencyName,
      email: email.toLowerCase(),
      phone,
      country,
      city,
      message,
      package_name: packageName,
      monthly_price_eur: plan.price,
      listing_limit: plan.count,
      privacy_consent: true,
      status: "new"
    });

  if (error) {
    console.error("Partner application error:", error.message);

    return NextResponse.json(
      { error: "Application could not be saved" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { status: 201 }
  );
}
