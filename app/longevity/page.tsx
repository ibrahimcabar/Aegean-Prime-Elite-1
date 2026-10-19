
const services = [
  { title: "Kişisel Sağlık ve Medikal Takip", description: "Yaşam koçluğu, hekim kontrolü, check-up, biyolojik yaş analizi ve sağlık takibi.", icon: "✦" },
  { title: "Beslenme ve Metabolizma", description: "Diyetisyen desteği, kişiye özel beslenme ve kilo yönetimi programları.", icon: "◈" },
  { title: "Hareket ve Rehabilitasyon", description: "Pilates, yoga, yürüyüş, fizik tedavi ve postür çalışmaları.", icon: "✧" },
  { title: "Zihinsel Sağlık ve Uyku", description: "Stres yönetimi, meditasyon, uyku düzeni ve zihinsel egzersizler.", icon: "☼" },
  { title: "Spa ve Yenilenme", description: "Masaj, hamam, sauna, hidroterapi ve kişisel bakım deneyimleri.", icon: "❋" },
  { title: "Longevity Yaşam Projeleri", description: "Sağlıklı yaşam odaklı konutlar, sosyal etkinlikler ve yenilenme programları.", icon: "⌂" },
];

export default function LongevityPage() {
  return (
    <main style={{ background: "#f8f7f3", color: "#20372e", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <section style={{ background: "#18382c", color: "#fff", padding: "90px 24px", textAlign: "center" }}>
        <p style={{ letterSpacing: 4, fontSize: 12 }}>AEGEAN PRIME ELITE</p>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 68px)", marginBottom: 20 }}>Longevity & Wellness</h1>
        <p style={{ maxWidth: 650, margin: "auto", lineHeight: 1.8 }}>
          Sağlıklı yaşam, doğayla bütünleşen mimari ve premium yaşam deneyimlerini keşfedin.
        </p>
        <a href="#projects" style={{ display: "inline-block", marginTop: 30, padding: "15px 30px", background: "#c8ad75", color: "#18382c", textDecoration: "none", borderRadius: 6 }}>
          Projeleri Keşfet
        </a>
      </section>

      <section style={{ maxWidth: 1150, margin: "auto", padding: "70px 24px" }}>
        <p style={{ letterSpacing: 3, color: "#9c8050" }}>PREMIUM WELLNESS</p>
        <h2 style={{ fontSize: 36 }}>Sağlıklı Yaşam Hizmetleri</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 35 }}>
          {services.map((service) => (
            <article key={service.title} style={{ background: "#fff", padding: 30, borderRadius: 14, boxShadow: "0 5px 25px #0000000a" }}>
              <div style={{ fontSize: 32, color: "#b99a60" }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p style={{ lineHeight: 1.7, color: "#66736c" }}>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" style={{ background: "#e9e8df", padding: "70px 24px", textAlign: "center" }}>
        <p style={{ letterSpacing: 3, color: "#94784a" }}>FEATURED PROJECT</p>
        <h2 style={{ fontSize: 38 }}>Golden Life</h2>
        <p style={{ maxWidth: 600, margin: "20px auto", lineHeight: 1.8 }}>
          Antalya Kayadibi / Karaöz bölgesinde planlanan, konut yaşamını sağlık, rehabilitasyon ve sosyal deneyimlerle birleştiren özel proje.
        </p>
        <a href="/projects/golden-life" style={{ display: "inline-block", padding: "15px 30px", background: "#18382c", color: "white", borderRadius: 6, textDecoration: "none" }}>
          Golden Life Projesini İncele →
        </a>
      </section>

      <footer style={{ padding: 35, textAlign: "center", fontSize: 13 }}>
        © AEGEAN PRIME ELITE — LONGEVITY & WELLNESS
      </footer>
    </main>
  );
}
