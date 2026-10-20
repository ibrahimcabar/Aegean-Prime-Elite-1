
"use client";

import { useEffect, useState } from "react";

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
  {
    name: "1+0 Stüdyo Daire",
    image: "/golden-life/IMG_3833.png",
    area: 45,
    price: 50000,
    monthly: 1388.89,
    description: "Açık yaşam düzeni ve fonksiyonel konut planı.",
  },
  {
    name: "1+1 Daire",
    image: "/golden-life/IMG_3834.png",
    area: 55,
    price: 60000,
    monthly: 1666.67,
    description: "Ayrı yatak odası, salon, açık mutfak ve balkon.",
  },
  {
    name: "2+1 Daire",
    image: "/golden-life/IMG_3835.png",
    area: 70,
    price: 90000,
    monthly: 2500,
    description: "İki yatak odalı, konforlu yaşam düzeni.",
  },
  {
    name: "2+1 Tek Kat Villa",
    image: "/golden-life/IMG_3836.png",
    area: 125,
    price: 220000,
    monthly: 6111.11,
    description: "Özel bahçe, teras ve havuz alanı.",
  },
];


export default function GoldenLifePage() {
  
  const images = [
  "/golden-life/IMG_3794.webp",
  "/golden-life/IMG_3795.webp",
  "/golden-life/IMG_3796.webp",
  "/golden-life/IMG_3797.webp",
  "/golden-life/IMG_3798.webp",
  "/golden-life/IMG_3807.png",
  "/golden-life/IMG_3808.webp",
  "/golden-life/IMG_3809.webp",
  "/golden-life/IMG_3810.webp",
  "/golden-life/IMG_3811.webp",
  "/golden-life/IMG_3812.webp",
  "/golden-life/IMG_3813.webp",
  "/golden-life/IMG_3814.webp",
  "/golden-life/IMG_3815.webp",
  "/golden-life/IMG_3816.webp",
];

  const [slide, setSlide] = useState(0);
const [contactOpen, setContactOpen] = useState(false);  
const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const lead = {
  full_name: String(formData.get("full_name") || ""),
  phone: String(formData.get("phone") || ""),
  email: String(formData.get("email") || ""),
  property_type: String(formData.get("property_type") || ""),
  message: String(formData.get("message") || ""),
};
  const response = await fetch("/api/golden-life-leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(lead),
});
if (!response.ok) {
  alert("Başvuru gönderilemedi. Lütfen tekrar deneyin.");
  return;
}  
alert("Başvurunuz başarıyla alındı! Satış danışmanımız sizinle iletişime geçecektir.");
setContactOpen(false);  
};
  return (
    <main style={{ background: "#f8f7f3", color: "#20372e", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      
<section style={{ position: "relative", height: "min(85vh, 900px)", minHeight: "420px", overflow: "hidden" }}>
  {images.map((image, index) => (
  <img
    key={image}
    src={image}
    alt={`Golden Life ${index + 1}`}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: slide === index ? 1 : 0,
      transition: "opacity 1.5s ease-in-out",
    }}
  />
))}
  <div
  style={{
    position: "absolute",
    bottom: 75,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 5,
    textAlign: "center",
    color: "#ffffff",
    width: "85%",
    textShadow: "0 3px 15px rgba(0,0,0,0.8)",
    pointerEvents: "none",
  }}
>
  <p style={{ letterSpacing: 5, color: "#e8c985" }}>
    AEGEAN PRIME ELITE
  </p>
 <h1 style={{
  fontSize: "clamp(42px, 7vw, 110px)",
  fontWeight: 800,
  letterSpacing: "3px",
  lineHeight: 1.1,
  margin: "20px 0",
  textShadow: "0 5px 25px rgba(0,0,0,0.7)"
}}>
    GOLDEN LIFE
  </h1>
  <p style={{ fontSize: "clamp(14px, 2vw, 20px)" }}>
    Doğanın Kalbinde Ayrıcalıklı Bir Yaşam
  </p>
</div>
  <button
    onClick={() => setSlide((slide - 1 + images.length) % images.length)}
    style={{ position: "absolute", left: 15, top: "50%" }}
  >
    ❮
  </button>
  <button
    onClick={() => setSlide((slide + 1) % images.length)}
    style={{ position: "absolute", right: 15, top: "50%" }}
  >
    ❯
  </button>
</section>

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
style={{
  background: "white",
  borderRadius: 18,
  padding: 30,
  border: "1px solid #d9c49a",
  boxShadow: "0 12px 35px rgba(24,56,44,0.12)",
  transition: "all 0.3s ease",
  overflow: "hidden",
}}  
  >
    <h3
  style={{
    fontSize: 26,
    color: "#18382c",
    fontWeight: 700,
    borderLeft: "4px solid #b99a60",
    paddingLeft: 14,
    marginBottom: 20,
    letterSpacing: 0.5,
  }}
>
  {home.name}
</h3>
    <button
  type="button"
  onClick={() => setSelectedPlan(home.image)}
  style={{
    background: "#18382c",
    color: "#e8c985",
    border: "1px solid #b99a60",
    borderRadius: 8,
    padding: "12px 18px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
  }}
>
  ⛶ Mimari Planı İncele
</button>
    <img
    onClick={() => setSelectedPlan(home.image)}  
  src={home.image}
  alt={`${home.name} Mimari Kat Planı`}
  style={{
    width: "100%",
    height: 320,
    objectFit: "contain",
    borderRadius: 12,
    background: "#f8f7f3",
    marginTop: 15,
  }}
/>

    <p style={{ color: "#65736b" }}>
      Brüt Alan: {home.area} m²
    </p>

    <p style={{ lineHeight: 1.8, color: "#65736b" }}>
      {home.description}
    </p>

    <div
      style={{
        borderTop: "1px solid #e9e8df",
        marginTop: 24,
        paddingTop: 20,
      }}
    >
      <p style={{ color: "#65736b" }}>
        Toplam Konut Bedeli
      </p>

      <h3 style={{
  fontSize: "clamp(30px, 3vw, 42px)",
  color: "#18382c",
  fontWeight: 800,
  letterSpacing: "-1px",
  margin: "12px 0",
}}>
        {home.price.toLocaleString("de-DE")} €
      </h3>

      <p style={{ color: "#65736b" }}>
        36 Ay Ödeme Planı
      </p>

      <h4 style={{
  fontSize: "clamp(22px, 2.5vw, 30px)",
  color: "#b99a60",
  fontWeight: 800,
  margin: "10px 0",
  letterSpacing: "-0.5px",
}}>
        {home.monthly.toLocaleString("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} € / Ay
      </h4>
    </div>
  </article>
))}

          </div>
        </div>
      </section>

<section
  id="about-golden-life"
  style={{
    padding: "85px 24px",
    background: "#18382c",
    color: "#ffffff",
    textAlign: "center",
  }}
>
  <div style={{ maxWidth: 950, margin: "0 auto" }}>
    <p style={{ color: "#d9c18b", letterSpacing: 5 }}>
      AEGEAN PRIME ELITE PRESENTS
    </p>
    <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", marginBottom: 24 }}>
      GOLDEN LIFE
    </h2>
    <h3 style={{ color: "#e8c985", fontSize: 24 }}>
      Doğanın Kalbinde Ayrıcalıklı Bir Yaşam
    </h3>
    <p style={{ fontSize: 18, lineHeight: 2, marginTop: 30 }}>
      Antalya Kayadibi / Karaöz'de konumlanan Golden Life,
      doğayla bütünleşen bir yaşam konsepti sunmayı hedefliyor.
      Modern mimari anlayışı ve farklı ihtiyaçlara hitap eden
      daire ve villa seçenekleriyle yeni bir yaşam deneyimi
      için tasarlanıyor.
    </p>
    <p style={{ color: "#d9c18b", marginTop: 35, letterSpacing: 2 }}>
      ANTALYA • KAYADİBİ / KARAÖZ
    </p>
  </div>
</section>

<section style={{ padding: "75px 24px", background: "#f8f7f3" }}>
  <div style={{ maxWidth: 1100, margin: "0 auto" }}>
    <p style={{ textAlign: "center", color: "#a58a59", letterSpacing: 4 }}>
      GOLDEN LIFE
    </p>
    <h2 style={{ textAlign: "center", color: "#18382c", fontSize: 34, marginBottom: 40 }}>
      Projenin Öne Çıkan Özellikleri
    </h2>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
      gap: 22
    }}>
      {[
        ["01", "Antalya'da Doğayla İç İçe", "Kayadibi / Karaöz konumunda doğayla bütünleşen bir yaşam konsepti."],
        ["02", "Modern Mimari", "Estetik ve işlevselliği bir araya getirmeyi hedefleyen mimari yaklaşım."],
        ["03", "Farklı Konut Seçenekleri", "Stüdyo dairelerden tek katlı villalara uzanan konut alternatifleri."]
      ].map(([number, title, description]) => (
        <article key={number} style={{
          background: "#ffffff",
          padding: 30,
          borderRadius: 16,
          border: "1px solid #e8e1d4",
          boxShadow: "0 8px 28px rgba(24,56,44,0.06)"
        }}>
          <span style={{ color: "#b99a60", fontSize: 28 }}>{number}</span>
          <h3 style={{ color: "#18382c", fontSize: 22, marginTop: 18 }}>{title}</h3>
          <p style={{ color: "#65736b", lineHeight: 1.8 }}>{description}</p>
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
<section style={{ textAlign: "center", padding: "60px 24px" }}>
  <h2>Golden Life Hakkında Bilgi Alın</h2>
  <button
    type="button"
    onClick={() => setContactOpen(true)}
    style={{
      background: "#18382c",
      color: "#e8c985",
      padding: "16px 32px",
      border: "1px solid #b99a60",
      borderRadius: 10,
      fontSize: 18,
      cursor: "pointer",
    }}
  >
    Bilgi Al / Satış Danışmanına Ulaş
  </button>
</section>
      <footer style={{ background: "#18382c", color: "white", padding: 30, textAlign: "center", fontSize: 13 }}>
        © AEGEAN PRIME ELITE — GOLDEN LIFE
      </footer>
      {selectedPlan && (
  <div
    onClick={() => setSelectedPlan(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.92)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 15,
    }}
  >
    <button
      onClick={() => setSelectedPlan(null)}
      style={{
        position: "absolute",
        top: 25,
        right: 25,
        background: "#ffffff",
        color: "#18382c",
        border: "none",
        borderRadius: "50%",
        width: 44,
        height: 44,
        fontSize: 26,
        cursor: "pointer",
      }}
    >
      ×
    </button>
    <img
      src={selectedPlan}
      alt="Büyütülmüş Mimari Kat Planı"
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "100%",
        maxHeight: "90vh",
        objectFit: "contain",
        borderRadius: 12,
      }}
    />
  </div>
)}
      {contactOpen && (
  <div
    onClick={() => setContactOpen(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 28,
        width: "100%",
        maxWidth: 480,
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      <button
        type="button"
        onClick={() => setContactOpen(false)}
        style={{ float: "right", cursor: "pointer" }}
      >
        ✕
      </button>

      <h2 style={{ color: "#18382c" }}>Golden Life – Bilgi Al</h2>
      <p>Satış danışmanımızın sizinle iletişime geçmesi için formu doldurun.</p>

      <form onSubmit={handleLeadSubmit}>
        <input required name="full_name" placeholder=" Adınız Soyadınızı" style={{ width: "100%", padding: 14, marginBottom: 12 }} />
        <input required type="tel" name="phone" placeholder="Telefon Numaranız" style={{ width: "100%", padding: 14, marginBottom: 12 }} />
        <input type="email" name="email" placeholder="E-posta Adresiniz" style={{ width: "100%", padding: 14, marginBottom: 12 }} />

        <select required name="property_type" defaultValue="" style={{ width: "100%", padding: 14, marginBottom: 12 }}>
          <option value="" disabled>İlgilendiğiniz Konut Tipi</option>
          <option>1+0 Stüdyo Daire</option>
          <option>1+1 Daire</option>
          <option>2+1 Daire</option>
          <option>2+1 Tek Kat Villa</option>
        </select>

        <textarea name="message" placeholder="Mesajınız" rows={3} style={{ width: "100%", padding: 14, marginBottom: 12 }} />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#18382c",
            color: "#e8c985",
            padding: 16,
            border: "none",
            borderRadius: 10,
            fontSize: 17,
          }}
        >
          Başvuru Gönder
        </button>
      </form>
    </div>
  </div>
)}
    </main>
  );
}
