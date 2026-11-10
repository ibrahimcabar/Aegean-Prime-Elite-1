
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Immobilien in Antalya kaufen | Velora Prime Elite",
  description:
    "Entdecken Sie Villen, Wohnungen und Immobilienmöglichkeiten in Antalya. Informationen zu beliebten Regionen und zum Immobilienkauf in der Türkei.",
  alternates: {
    canonical: "https://veloraprimeelite.com/de/antalya",
  },
  openGraph: {
    title: "Immobilien in Antalya kaufen | Velora Prime Elite",
    description:
      "Immobilien in Antalya entdecken: Villen, Wohnungen und Informationen für internationale Käufer.",
    url: "https://veloraprimeelite.com/de/antalya",
    type: "website",
  },
};

export default async function AntalyaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "de") {
    notFound();
  }

  return (
    <main
      style={{
        background: "#f8f7f4",
        color: "#18382c",
        minHeight: "100vh",
        padding: "45px 22px 80px",
      }}
    >
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <a
          href="/de"
          style={{
            color: "#a48752",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          VELORA PRIME ELITE
        </a>

        <p style={{ marginTop: 55, color: "#a48752", fontWeight: 700 }}>
          LUXUSIMMOBILIEN IN ANTALYA
        </p>

        <h1
          style={{
            fontSize: "clamp(34px, 6vw, 58px)",
            lineHeight: 1.2,
            marginBottom: 25,
          }}
        >
          Immobilien in Antalya kaufen
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.9 }}>
          Antalya gehört zu den bekanntesten Küstenregionen
          der Türkei. Die Stadt und ihre Umgebung bieten
          unterschiedliche Möglichkeiten für Menschen,
          die eine Wohnung, eine Villa oder eine
          Ferienimmobilie suchen.
        </p>

        <section style={{ marginTop: 55 }}>
          <h2>Villen und Wohnungen in Antalya</h2>

          <p style={{ lineHeight: 1.9, fontSize: 17 }}>
            Wer Immobilien in Antalya kaufen möchte,
            sollte zunächst den gewünschten Standort,
            die Immobilienart und das verfügbare Budget
            festlegen. Je nach Region unterscheiden
            sich Infrastruktur, Wohnumfeld und die
            Entfernung zur Küste.
          </p>
        </section>

        <section style={{ marginTop: 45 }}>
          <h2>Beliebte Immobilienregionen in Antalya</h2>

          <div style={{ lineHeight: 1.9, fontSize: 17 }}>
            <h3>Konyaaltı</h3>
            <p>
              Konyaaltı ist für seine Strandlage und
              die Nähe zum Stadtzentrum bekannt.
              Die Region bietet unterschiedliche
              Wohngebiete und Immobilienarten.
            </p>

            <h3>Lara</h3>
            <p>
              Lara verbindet städtisches Wohnen mit
              Küstennähe. Die Ausstattung und Lage
              einzelner Immobilien sollten
              sorgfältig verglichen werden.
            </p>

            <h3>Kumluca und Karaöz</h3>
            <p>
              Im Raum Kumluca und Karaöz finden
              Interessenten ruhigere Küstenlagen
              und naturnahe Wohnumgebungen.
              Hier befindet sich auch das
              Golden Life Projekt.
            </p>
          </div>
        </section>

        <section style={{ marginTop: 45 }}>
          <h2>Was sollten internationale Käufer beachten?</h2>

          <p style={{ lineHeight: 1.9, fontSize: 17 }}>
            Vor einem Immobilienkauf in der Türkei
            sollten der Grundbucheintrag (Tapu),
            baurechtliche Unterlagen, mögliche
            Belastungen und die Kaufnebenkosten
            geprüft werden. Unabhängige rechtliche
            Beratung kann helfen, Risiken
            frühzeitig zu erkennen.
          </p>
        </section>

        <section style={{ marginTop: 45 }}>
          <h2>Golden Life in der Region Antalya</h2>

          <p style={{ lineHeight: 1.9, fontSize: 17 }}>
            Entdecken Sie das Golden Life Projekt
            in der Region Kumluca. Informieren Sie
            sich über die Wohnkonzepte, die Lage
            sowie die jeweiligen Teilnahme- und
            Vertragsbedingungen.
          </p>

          <a
            href="/projects/golden-life"
            style={{
              display: "inline-block",
              marginTop: 15,
              padding: "16px 28px",
              background: "#18382c",
              color: "#d6bd88",
              borderRadius: 9,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Golden Life entdecken
          </a>
        </section>

        <section style={{ marginTop: 45 }}>
          <h2>Immobilienangebote entdecken</h2>

          <p style={{ lineHeight: 1.9, fontSize: 17 }}>
            Entdecken Sie unsere Immobilienübersicht
            und nutzen Sie die Suchfilter, um
            passende Angebote zu finden.
            Verfügbarkeit und Objektdetails
            sind individuell zu prüfen.
          </p>

          <a
            href="/de#properties"
            style={{
              display: "inline-block",
              padding: "16px 28px",
              background: "#b99a60",
              color: "#18382c",
              borderRadius: 9,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Immobilien ansehen
          </a>
        </section>
      </div>
    </main>
  );
}
