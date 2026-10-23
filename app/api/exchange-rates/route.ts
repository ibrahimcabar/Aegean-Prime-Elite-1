
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/EUR",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Exchange rate service unavailable");
    }

    const data = await response.json();

    if (
      data.result !== "success" ||
      !data.rates?.EUR ||
      !data.rates?.USD ||
      !data.rates?.TRY
    ) {
      throw new Error("Invalid exchange rates");
    }

    return NextResponse.json({
      base: "EUR",
      rates: {
        EUR: data.rates.EUR,
        USD: data.rates.USD,
        TRY: data.rates.TRY,
      },
      updatedAt: data.time_last_update_utc,
    });
  } catch (error) {
    console.error("Exchange rate error:", error);

    return NextResponse.json(
      { error: "Exchange rates unavailable" },
      { status: 503 }
    );
  }
}
