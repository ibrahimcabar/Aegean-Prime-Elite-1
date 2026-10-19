
const features = [
  {
    title: "Sağlık ve Rehabilitasyon",
    description: "Hekim muayene alanları, hemşirelik birimleri, fizik tedavi, rehabilitasyon ve hidroterapi için planlanan tesisler.",
  },
  {
    title: "Longevity & Wellness",
    description: "Kişisel sağlıklı yaşam programları, beslenme danışmanlığı, egzersiz, yoga, meditasyon ve spa deneyimleri.",
  },
  {
    title: "Sosyal Yaşam",
    description: "Restoranlar, kafeler, sanat atölyeleri, hobi bahçeleri, spor alanları ve sosyal etkinlik mekanları.",
  },
  {
    title: "Doğayla Bütünleşen Mimari",
    description: "Yeşil alanlar, yürüyüş yolları, peyzaj düzenlemeleri ve doğayla uyumlu yaşam alanları.",
  },
];

const homes = [
  { name: "1+0 Stüdyo Daire", description: "Açık yaşam düzeni ve fonksiyonel konut planı." },
  { name: "1+1 Daire", description: "Ayrı yatak odası, salon, açık mutfak ve balkon." },
  { name: "2+1 Daire", description: "İki yatak odalı, konforlu yaşam düzeni." },
  { name: "2+1 Tek Kat Villa", description: "Özel bahçe, teras ve havuz alanı." },
];

export default function GoldenLifePage() {
  return (
    <main style={{ background: "#f8f7f3", color: "#20372e", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <section style={{ background: "#18382c", color: "white", textAlign: "center", padding: "90px 24px" }}>
        <p style={{ letterSpacing: 4, fontSize: 12 }}>AEGEAN PRIME ELITE PRESENTS</p>
        <h1 style={{ fontSize: "clamp(44px, 8vw, 78px)", margin: "25px 0" }}>GOLDEN LIFE</h1>
        <p style={{ color: "#d6bd88", letterSpacing: 3 }}>KAYADİBİ / KARAÖZ · ANTALYA</p>
        <p style={{ maxWidth: 650, margin: "30px auto", lineHeight: 1.9, fontSize: 18 }}>
          Doğanın kalbinde sağlıklı yaşam, konfor ve sosyal deneyimleri bir araya getiren özel bir yaşam projesi.
        </p>
        <a href="#homes" style={{ display: "inline-block", background: "#c8ad75", color: "#18382c", padding: "16px 30px", borderRadius: 6, textDecoration: "none" }}>
          Konutları Keşfet
        </a>
      </section>

      <section style={{ maxWidth: 1100, margin: "auto", padding: "75px 24px" }}>
        <p style={{ color: "#a58a59", letterSpacing: 3 }}>THE GOLDEN LIFE EXPERIENCE</p>
        <h2 style={{ fontSize: 36 }}>Yeni Bir Yaşam Anlayışı</h2>
        <p style={{ lineHeight: 1.9, color: "#65736b" }}>
          Golden Life, Antalya Kayadibi / Karaöz bölgesinde planlanan;
          konut yaşamını sağlık, rehabilitasyon, doğa ve sosyal yaşam
          olanaklarıyla birleştirmeyi hedefleyen bir projedir.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginTop: 35 }}>
          {features.map((item) => (
            <article key={item.title} style={{ background: "white", borderRadius: 14, padding: 28 }}>
              <h3>{item.title}</h3>
              <p style={{ lineHeight: 1.8, color: "#65736b" }}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="homes" style={{ background: "#e9e8df", padding: "75px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "auto" }}>
          <p style={{ color: "#94784a", letterSpacing: 3 }}>RESIDENCES</p>
          <h2 style={{ fontSize: 36 }}>Konut Seçenekleri</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginTop: 35 }}>
            {homes.map((home) => (
              <article key={home.name} style={{ background: "white", borderRadius: 14, padding: 30 }}>
                <h3>{home.name}</h3>
                <p style={{ lineHeight: 1.8, color: "#65736b" }}>{home.description}</p>
                <p style={{ color: "#a58a59", fontWeight: "bold", marginTop: 24 }}>
                  Detaylı bilgi için iletişime geçiniz
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "75px 24px" }}>
        <h2 style={{ fontSize: 36 }}>Golden Life'ı Keşfedin</h2>
        <p style={{ maxWidth: 600, margin: "20px auto", lineHeight: 1.8 }}>
          Proje hakkında detaylı bilgi ve konut seçenekleri için bizimle iletişime geçebilirsiniz.
        </p>
        <a href="/longevity" style={{ display: "inline-block", background: "#18382c", color: "white", padding: "16px 30px", borderRadius: 6, textDecoration: "none" }}>
          Longevity & Wellness
        </a>
      </section>

      <footer style={{ background: "#18382c", color: "white", padding: 30, textAlign: "center", fontSize: 13 }}>
        © AEGEAN PRIME ELITE — GOLDEN LIFE
      </footer>
    </main>
  );
}
