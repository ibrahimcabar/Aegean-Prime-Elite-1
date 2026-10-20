import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Mesaj gerekli." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI servisi henüz yapılandırılmadı." },
        { status: 503 }
      );
    }

    const conversation = messages.slice(-12)
      .filter((m: any) =>
        ["user", "assistant"].includes(m.role) &&
        typeof m.content === "string"
      )
      .map((m: any) => ({
        role: m.role,
        content: m.content.slice(0, 2000)
      }));

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are the professional real estate assistant for Aegean Prime Elite. Respond in the customer's language, supporting Turkish, German, English and Arabic. Be polite, concise and helpful.

Golden Life is a real estate project in Antalya, Kayadibi / Karaöz, Turkey. Property types and listed prices: 1+0 studio 45 m² €50,000; 1+1 apartment 55 m² €60,000; 2+1 apartment 70 m² €90,000; single-storey 2+1 villa 125 m² €220,000. The cooperative participation fee is 650,000 TRY. The project advertises a 36-month payment plan. Do not invent deposit amounts, financing conditions, availability, guarantees or additional fees. Explain that exact payment conditions require confirmation by the sales team.

For other properties, do not invent listings or prices. Invite the customer to provide their preferred location, budget and property type. Never claim a reservation or sale is confirmed. Do not request passwords, card numbers or identity documents.`
            },
            ...conversation
          ],
          max_tokens: 450
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Yapay zekâ servisine ulaşılamadı." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: reply || "Şu anda yanıt oluşturulamıyor."
    });
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
