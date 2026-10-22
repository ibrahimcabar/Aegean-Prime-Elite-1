
"use client";

import { useEffect, useState } from "react";

const features = [
  {
   
title: {
  tr: "Sağlık ve Rehabilitasyon",
  en: "Health & Rehabilitation",
  de: "Gesundheit & Rehabilitation",
  ru: "Здоровье и реабилитация",
  ar: "الصحة وإعادة التأهيل"
},
 
    
description: {
  tr: "Hekim muayene alanları, hemşirelik birimleri, fizik tedavi, rehabilitasyon ve hidroterapi için planlanan tesisler.",
  en: "Facilities planned for medical examination areas, nursing units, physiotherapy, rehabilitation, and hydrotherapy.",
  de: "Geplante Einrichtungen für ärztliche Untersuchungen, Pflegebereiche, Physiotherapie, Rehabilitation und Hydrotherapie.",
  ru: "Планируемые помещения для врачебных осмотров, сестринского ухода, физиотерапии, реабилитации и гидротерапии.",
  ar: "مرافق مخطط لها تشمل عيادات الفحص الطبي ووحدات التمريض والعلاج الطبيعي وإعادة التأهيل والعلاج المائي."
},

  },
  {
    
title: {
  tr: "Uzun Ömür ve Sağlıklı Yaşam",
  en: "Longevity & Wellness",
  de: "Langlebigkeit & Wohlbefinden",
  ru: "Долголетие и благополучие",
  ar: "طول العمر والعافية"
},

   
description: {
  tr: "Kişisel sağlıklı yaşam programları, beslenme danışmanlığı, egzersiz, yoga, meditasyon ve spa deneyimleri.",
  en: "Personalized wellness programs, nutritional counseling, exercise, yoga, meditation, and spa experiences.",
  de: "Individuelle Gesundheitsprogramme, Ernährungsberatung, Bewegung, Yoga, Meditation und Spa-Erlebnisse.",
  ru: "Индивидуальные оздоровительные программы, консультации по питанию, физические упражнения, йога, медитация и спа-процедуры.",
  ar: "برامج العافية الشخصية، والاستشارات الغذائية، والتمارين الرياضية، واليوغا، والتأمل، وتجارب السبا."
},
 
  },
  {
    
title: {
  tr: "Sosyal Yaşam",
  en: "Social Life",
  de: "Soziales Leben",
  ru: "Социальная жизнь",
  ar: "الحياة الاجتماعية"
},

    
description: {
  tr: "Restoranlar, kafeler, sanat atölyeleri, hobi bahçeleri, spor alanları ve sosyal etkinlik mekanları.",
  en: "Restaurants, cafés, art workshops, hobby gardens, sports facilities, and social event venues.",
  de: "Restaurants, Cafés, Kunstwerkstätten, Hobbygärten, Sportanlagen und Veranstaltungsräume für soziale Aktivitäten.",
  ru: "Рестораны, кафе, художественные мастерские, любительские сады, спортивные площадки и пространства для общественных мероприятий.",
  ar: "مطاعم ومقاهٍ وورش فنية وحدائق للهوايات ومرافق رياضية ومساحات للفعاليات الاجتماعية."
},

  },
  {
   
title: {
  tr: "Doğayla Bütünleşen Mimari",
  en: "Architecture in Harmony with Nature",
  de: "Architektur im Einklang mit der Natur",
  ru: "Архитектура в гармонии с природой",
  ar: "هندسة معمارية متناغمة مع الطبيعة"
},
 
    
description: {
  tr: "Yeşil alanlar, yürüyüş yolları, peyzaj düzenlemeleri ve doğayla uyumlu yaşam alanları.",
  en: "Green spaces, walking paths, landscaped gardens, and living areas designed in harmony with nature.",
  de: "Grünflächen, Spazierwege, Landschaftsgärten und naturnah gestaltete Wohnbereiche.",
  ru: "Зелёные зоны, прогулочные дорожки, ландшафтные сады и жилые пространства в гармонии с природой.",
  ar: "مساحات خضراء وممرات للمشي وحدائق منسقة ومساحات معيشية مصممة بانسجام مع الطبيعة."
},

  },
];


const homes = [
  {
    
name: {
  tr: "1+0 Stüdyo Daire",
  en: "Studio Apartment",
  de: "Studio-Apartment",
  ru: "Квартира-студия",
  ar: "شقة استوديو"
},

    image: "/golden-life/IMG_3833.png",
    area: 45,
    price: 50000,
    monthly: 1388.89,
    
description: {
  tr: "Açık yaşam düzeni ve fonksiyonel konut planı.",
  en: "Open-plan living space with a functional residential layout.",
  de: "Offener Wohnbereich mit einem funktionalen Grundriss.",
  ru: "Открытая планировка жилого пространства с функциональным дизайном.",
  ar: "مساحة معيشة مفتوحة مع تصميم سكني عملي."
},

  },
  {
    
name: {
  tr: "1+1 Daire",
  en: "1+1 Apartment",
  de: "1+1 Wohnung",
  ru: "Квартира 1+1",
  ar: "شقة 1+1"
},

    image: "/golden-life/IMG_3834.png",
    area: 55,
    price: 60000,
    monthly: 1666.67,
    
description: {
  tr: "Ayrı yatak odası, salon, açık mutfak ve balkon.",
  en: "Separate bedroom, living room, open-plan kitchen, and balcony.",
  de: "Separates Schlafzimmer, Wohnzimmer, offene Küche und Balkon.",
  ru: "Отдельная спальня, гостиная, кухня открытой планировки и балкон.",
  ar: "غرفة نوم منفصلة وغرفة معيشة ومطبخ مفتوح وشرفة."
},

  },
  {
    
name: {
  tr: "2+1 Daire",
  en: "2+1 Apartment",
  de: "2+1 Wohnung",
  ru: "Квартира 2+1",
  ar: "شقة 2+1"
},

    image: "/golden-life/IMG_3835.png",
    area: 70,
    price: 90000,
    monthly: 2500,
    
description: {
  tr: "İki yatak odalı, konforlu yaşam düzeni.",
  en: "Comfortable living layout with two bedrooms.",
  de: "Komfortabler Wohnbereich mit zwei Schlafzimmern.",
  ru: "Комфортная планировка с двумя спальнями.",
  ar: "تصميم سكني مريح يضم غرفتي نوم."
},

  },
  {
    
name: {
  tr: "2+1 Tek Kat Villa",
  en: "2+1 Single-Storey Villa",
  de: "2+1 Einstöckige Villa",
  ru: "Одноэтажная вилла 2+1",
  ar: "فيلا من طابق واحد 2+1"
},

    image: "/golden-life/IMG_3836.png",
    area: 125,
    price: 220000,
    monthly: 6111.11,
    
description: {
  tr: "Özel bahçe, teras ve havuz alanı.",
  en: "Private garden, terrace, and swimming pool area.",
  de: "Privater Garten, Terrasse und Poolbereich.",
  ru: "Частный сад, терраса и зона бассейна.",
  ar: "حديقة خاصة وتراس ومنطقة مسبح."
},

  },
];


export default function GoldenLifePage() {
  const [language, setLanguage] = useState("en");

useEffect(() => {
  const savedLanguage = localStorage.getItem("aegean-language");

  if (
    savedLanguage &&
    ["en", "tr", "de", "ru", "ar"].includes(savedLanguage)
  ) {
    setLanguage(savedLanguage);
  }
}, []);
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
  const [selectedHome, setSelectedHome] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
 const [zoomImage, setZoomImage] = useState<string | null>(null); 
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 5000);

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
     <div style={{
  display: "flex",
  justifyContent: "flex-end",
  padding: "15px 25px",
  background: "#18382c"
}}>
  <select
    aria-label="Select language"
    value={language}
    onChange={(e) => {
      const selected = e.target.value;
      localStorage.setItem("aegean-language", selected);
      setLanguage(selected);
    }}
    style={{
      padding: "10px",
      borderRadius: "8px",
      background: "#18382c",
      color: "#ffffff",
      border: "1px solid #b99a60"
    }}
  >
    <option value="en">🇬🇧 English</option>
    <option value="tr">🇹🇷 Türkçe</option>
    <option value="de">🇩🇪 Deutsch</option>
    <option value="ru">🇷🇺 Русский</option>
    <option value="ar">🇸🇦 العربية</option>
  </select>
</div> 
      
<section style={{ position: "relative", height: "min(85vh, 900px)", minHeight: "420px", overflow: "hidden" }}>
  {images.map((image, index) => (
  <img
    key={image}
    src={image}
    onClick={() => setZoomImage(image)}
    alt={`Golden Life ${index + 1}`}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: slide === index ? 1 : 0,
     pointerEvents: slide === index ? "auto" : "none", 
      transition: "opacity 1.5s ease-in-out",
    }}
  />
))}
  <div
  style={{
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 75%)",
    pointerEvents: "none",
    zIndex: 1,
  }}
/>
  <div
  style={{
    position: "absolute",
    bottom: 75,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 5,
    textAlign: "center",
    color: "#ffffff",
    width: "calc(100% - 40px)",
    textShadow: "0 3px 15px rgba(0,0,0,0.8)",
    pointerEvents: "none",
  }}
>
  <p style={{ letterSpacing: 5, color: "#e8c985" }}>
    AEGEAN PRIME ELITE
  </p>
 <h1 style={{
fontSize: "clamp(32px, 6vw, 110px)",  
  fontWeight: 800,
  letterSpacing: "3px",
  lineHeight: 1.1,
  margin: "20px 0",
  textShadow: "0 5px 25px rgba(0,0,0,0.7)"
}}>
    GOLDEN LIFE
  </h1>
<p style={{
  fontSize: "clamp(14px, 2vw, 20px)",
  maxWidth: "100%",
  lineHeight: 1.5,
  whiteSpace: "normal",
  overflowWrap: "break-word",
  margin: "15px auto"
}}>  
   
{language === "tr"
  ? "Doğanın Kalbinde Ayrıcalıklı Bir Yaşam"
  : language === "de"
  ? "Exklusives Leben im Herzen der Natur"
  : language === "ru"
  ? "Привилегированная жизнь в сердце природы"
  : language === "ar"
  ? "حياة استثنائية في قلب الطبيعة"
  : "Exclusive Living in the Heart of Nature"}
 
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
          
{language === "tr"
  ? "Doğanın kalbinde sağlıklı yaşam, konfor ve sosyal deneyimleri bir araya getiren özel bir yaşam projesi."
  : language === "de"
  ? "Ein exklusives Wohnprojekt im Herzen der Natur, das gesundes Leben, Komfort und soziale Erlebnisse vereint."
  : language === "ru"
  ? "Уникальный жилой проект в окружении природы, объединяющий здоровый образ жизни, комфорт и возможности для общения."
  : language === "ar"
  ? "مشروع سكني مميز في قلب الطبيعة يجمع بين الحياة الصحية والراحة والتجارب الاجتماعية."
  : "An exclusive residential project in the heart of nature, combining healthy living, comfort, and social experiences."}

        </p>
        <a href="#homes" style={{ display: "inline-block", background: "#c8ad75", color: "#18382c", padding: "16px 30px", borderRadius: 6, textDecoration: "none" }}>
         
{language === "tr"
  ? "Konutları Keşfet"
  : language === "de"
  ? "Wohnungen entdecken"
  : language === "ru"
  ? "Посмотреть недвижимость"
  : language === "ar"
  ? "اكتشف الوحدات السكنية"
  : "Explore Residences"}
 
        </a>
      </section>

      <section style={{ maxWidth: 1100, margin: "auto", padding: "75px 24px" }}>
        <p style={{ color: "#a58a59", letterSpacing: 3 }}>THE GOLDEN LIFE EXPERIENCE</p>
        <h2 style={{ fontSize: 36 }}>
  {language === "tr" ? "Yeni Bir Yaşam Anlayışı" :
   language === "de" ? "Ein neues Lebenskonzept" :
   language === "ru" ? "Новая концепция жизни" :
   language === "ar" ? "مفهوم جديد للحياة" :
   "A New Way of Living"}
</h2>
        <p style={{ lineHeight: 1.9, color: "#65736b" }}>
  {language === "tr"
    ? "Golden Life, Antalya Kayadibi / Karaöz bölgesinde planlanan; konut yaşamını sağlık, rehabilitasyon, doğa ve sosyal yaşam olanaklarıyla birleştirmeyi hedefleyen bir projedir."
    : language === "de"
    ? "Golden Life ist ein in der Region Kayadibi / Karaöz in Antalya geplantes Projekt, das Wohnen mit Gesundheits-, Rehabilitations-, Natur- und sozialen Angeboten verbinden soll."
    : language === "ru"
    ? "Golden Life — это проект, планируемый в районе Каядиби / Караёз в Анталье, который призван объединить комфортное проживание с возможностями для здоровья, реабилитации, отдыха на природе и социальной жизни."
    : language === "ar"
    ? "غولدن لايف هو مشروع مخطط له في منطقة كاياديبي / كاراأوز في أنطاليا، ويهدف إلى الجمع بين الحياة السكنية وخدمات الصحة وإعادة التأهيل والطبيعة والأنشطة الاجتماعية."
    : "Golden Life is a planned residential project in the Kayadibi / Karaöz area of Antalya, designed to combine residential living with health, rehabilitation, nature, and social amenities."}
</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginTop: 35 }}>
          {features.map((item) => (
            <article key={item.title.tr} style={{ background: "white", borderRadius: 14, padding: 28 }}>
              
<h3>
  {typeof item.title === "string"
    ? item.title
    : item.title[language as keyof typeof item.title] ?? item.title.tr}
</h3>

              <p style={{ lineHeight: 1.8, color: "#65736b" }}>
{typeof item.description === "string"
  ? item.description
  : item.description[language as keyof typeof item.description] ?? item.description.tr}
</p>
            </article>
          ))}
        </div>
      </section>

      <section id="homes" style={{ background: "#e9e8df", padding: "75px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "auto" }}>
          <p style={{ color: "#94784a", letterSpacing: 3 }}>RESIDENCES</p>
          <h2 style={{ fontSize: 36 }}>
  {language === "tr" ? "Konut Seçenekleri" :
   language === "de" ? "Wohnmöglichkeiten" :
   language === "ru" ? "Варианты жилья" :
   language === "ar" ? "الخيارات السكنية" :
   "Residential Options"}
</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginTop: 35 }}>
            
{homes.map((home) => (
 <article 
key={typeof home.name === "string" ? home.name : home.name.tr}

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

{typeof home.name === "string"
  ? home.name
  : home.name[language as keyof typeof home.name] ?? home.name.tr}
  
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
  
{language === "tr" ? "Mimari Planı İncele" :
 language === "de" ? "Grundriss ansehen" :
 language === "ru" ? "Посмотреть планировку" :
 language === "ar" ? "عرض المخطط المعماري" :
 "View Floor Plan"}

</button>
    <img
    onClick={() => setSelectedPlan(home.image)}  
  src={home.image}
  
alt={`${typeof home.name === "string"
  ? home.name
  : home.name[language as keyof typeof home.name] ?? home.name.tr} ${
  language === "tr" ? "Mimari Kat Planı" :
  language === "de" ? "Architektonischer Grundriss" :
  language === "ru" ? "Архитектурный план" :
  language === "ar" ? "المخطط المعماري" :
  "Architectural Floor Plan"
}`}

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
      
{language === "tr" ? "Brüt Alan" :
 language === "de" ? "Bruttofläche" :
 language === "ru" ? "Общая площадь" :
 language === "ar" ? "المساحة الإجمالية" :
 "Gross Area"}: {home.area} m²

    </p>

    <p style={{ lineHeight: 1.8, color: "#65736b" }}>
      
{typeof home.description === "string"
  ? home.description
  : home.description[language as keyof typeof home.description] ?? home.description.tr}

    </p>

    <div
      style={{
        borderTop: "1px solid #e9e8df",
        marginTop: 24,
        paddingTop: 20,
      }}
    >
      <p style={{ color: "#65736b" }}>
        
{language === "tr" ? "Toplam Konut Bedeli" :
 language === "de" ? "Gesamtkaufpreis" :
 language === "ru" ? "Полная стоимость жилья" :
 language === "ar" ? "السعر الإجمالي للعقار" :
 "Total Property Price"}

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
        
{language === "tr" ? "36 Ay Ödeme Planı" :
 language === "de" ? "36-Monats-Zahlungsplan" :
 language === "ru" ? "План оплаты на 36 месяцев" :
 language === "ar" ? "خطة الدفع على 36 شهراً" :
 "36-Month Payment Plan"}

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
        })} 
€ / {language === "tr" ? "Ay" :
     language === "de" ? "Monat" :
     language === "ru" ? "мес." :
     language === "ar" ? "شهر" :
     "Month"}

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
      
{language === "tr" ? "Doğanın Kalbinde Ayrıcalıklı Bir Yaşam" :
 language === "de" ? "Exklusives Leben im Herzen der Natur" :
 language === "ru" ? "Привилегированная жизнь в сердце природы" :
 language === "ar" ? "حياة استثنائية في قلب الطبيعة" :
 "Exclusive Living in the Heart of Nature"}

    </h3>
    <p style={{ fontSize: 18, lineHeight: 2, marginTop: 30 }}>
      
{language === "tr"
  ? "Antalya Kayadibi / Karaöz'de konumlanan Golden Life, doğayla bütünleşen bir yaşam konsepti sunuyor. Modern mimari anlayışı ve farklı ihtiyaçlara uygun daire ve villa seçenekleriyle yeni bir yaşam için tasarlanıyor."
  : language === "de"
  ? "Golden Life in Antalya Kayadibi / Karaöz bietet ein naturnahes Wohnkonzept. Mit moderner Architektur sowie Apartments und Villen für unterschiedliche Bedürfnisse entsteht hier ein neues Lebensgefühl."
  : language === "ru"
  ? "Golden Life, расположенный в Анталье, Каядиби / Караоз, предлагает концепцию жизни в гармонии с природой. Современная архитектура, квартиры и виллы созданы для разных потребностей."
  : language === "ar"
  ? "يقدم مشروع غولدن لايف في أنطاليا، كاياديبي / كاراأوز، مفهومًا سكنيًا متناغمًا مع الطبيعة، مع تصميم معماري عصري وخيارات متنوعة من الشقق والفلل."
  : "Golden Life, located in Antalya Kayadibi / Karaöz, offers a lifestyle in harmony with nature. Featuring modern architecture and a range of apartments and villas, the project is designed for different living needs."}

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
      
{language === "tr" ? "Projenin Öne Çıkan Özellikleri" :
 language === "de" ? "Die Highlights des Projekts" :
 language === "ru" ? "Ключевые особенности проекта" :
 language === "ar" ? "أبرز مميزات المشروع" :
 "Project Highlights"}

    </h2>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
      gap: 22
    }}>
      {[
       
[
  "01",
  language === "tr" ? "Antalya'da Doğayla İç İçe" :
  language === "de" ? "Naturverbundenes Leben in Antalya" :
  language === "ru" ? "Жизнь в гармонии с природой Антальи" :
  language === "ar" ? "حياة وسط الطبيعة في أنطاليا" :
  "Living Close to Nature in Antalya",
  language === "tr" ? "Kayadibi / Karaöz bölgesinde doğayla bütünleşen yaşam alanları." :
  language === "de" ? "Naturnahe Wohnräume in der Region Kayadibi / Karaöz." :
  language === "ru" ? "Жилые пространства в гармонии с природой в районе Каядиби / Караоз." :
  language === "ar" ? "مساحات سكنية متناغمة مع الطبيعة في منطقة كاياديبي / كاراأوز." :
  "Nature-inspired living spaces in the Kayadibi / Karaöz area."
],

        
[
  "02",
  language === "tr" ? "Modern Mimari" :
  language === "de" ? "Moderne Architektur" :
  language === "ru" ? "Современная архитектура" :
  language === "ar" ? "الهندسة المعمارية الحديثة" :
  "Modern Architecture",
  language === "tr" ? "Estetik ve işlevselliği bir araya getiren modern mimari anlayışı." :
  language === "de" ? "Moderne Architektur, die Ästhetik und Funktionalität vereint." :
  language === "ru" ? "Современная архитектура, сочетающая эстетику и функциональность." :
  language === "ar" ? "تصميم معماري حديث يجمع بين الجمال والوظائف العملية." :
  "Modern architectural design combining aesthetics and functionality."
],

       
[
  "03",
  language === "tr" ? "Farklı Konut Seçenekleri" :
  language === "de" ? "Vielfältige Wohnmöglichkeiten" :
  language === "ru" ? "Разнообразные варианты жилья" :
  language === "ar" ? "خيارات سكنية متنوعة" :
  "Diverse Housing Options",

  language === "tr" ? "Stüdyo dairelerden villalara kadar farklı yaşam seçenekleri." :
  language === "de" ? "Verschiedene Wohnmöglichkeiten von Studio-Apartments bis hin zu Villen." :
  language === "ru" ? "Различные варианты жилья от квартир-студий до вилл." :
  language === "ar" ? "خيارات سكنية متنوعة من شقق الاستوديو إلى الفلل." :
  "A variety of living options, from studio apartments to villas."
],
 
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
        <h2 style={{ fontSize: 36 }}>
  {language === "tr" ? "Golden Life'ı Keşfedin" :
   language === "de" ? "Golden Life entdecken" :
   language === "ru" ? "Откройте для себя Golden Life" :
   language === "ar" ? "اكتشف غولدن لايف" :
   "Discover Golden Life"}
</h2>
        <p style={{ maxWidth: 600, margin: "20px auto", lineHeight: 1.8 }}>
         {language === "tr"
  ? "Proje hakkında detaylı bilgi ve konut seçenekleri için bizimle iletişime geçebilirsiniz."
  : language === "de"
  ? "Kontaktieren Sie uns für weitere Informationen über das Projekt und die verfügbaren Wohnmöglichkeiten."
  : language === "ru"
  ? "Свяжитесь с нами для получения подробной информации о проекте и доступных вариантах жилья."
  : language === "ar"
  ? "يمكنكم التواصل معنا للحصول على معلومات مفصلة حول المشروع والخيارات السكنية المتاحة."
  : "Contact us for detailed information about the project and available residential options."}
        </p>
        <a href="/longevity" style={{ display: "inline-block", background: "#18382c", color: "white", padding: "16px 30px", borderRadius: 6, textDecoration: "none" }}>
          Longevity & Wellness
        </a>
      </section>
<section style={{ textAlign: "center", padding: "60px 24px" }}>
 <h2>
  {language === "tr" ? "Golden Life Hakkında Bilgi Alın" :
   language === "de" ? "Mehr über Golden Life erfahren" :
   language === "ru" ? "Узнайте больше о Golden Life" :
   language === "ar" ? "تعرف على المزيد عن غولدن لايف" :
   "Learn More About Golden Life"}
</h2> 
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
  {language === "tr" ? "Bilgi Al / Satış Danışmanına Ulaş" :
 language === "de" ? "Informationen anfordern / Verkaufsberater kontaktieren" :
 language === "ru" ? "Получить информацию / Связаться с консультантом" :
 language === "ar" ? "طلب معلومات / التواصل مع مستشار المبيعات" :
 "Get Information / Contact a Sales Advisor"}
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

     <h2 style={{ color: "#18382c" }}>
  {language === "tr" ? "Golden Life Hakkında Bilgi Al" :
   language === "de" ? "Informationen über Golden Life anfordern" :
   language === "ru" ? "Получить информацию о Golden Life" :
   language === "ar" ? "احصل على معلومات حول جولدن لايف" :
   "Get Information About Golden Life"}
</h2> 
     <p>
  {language === "tr"
    ? "Satış danışmanımızın sizinle iletişime geçmesi için formu doldurun."
    : language === "de"
    ? "Füllen Sie das Formular aus, damit unser Verkaufsberater Sie kontaktieren kann."
    : language === "ru"
    ? "Заполните форму, чтобы наш консультант по продажам связался с вами."
    : language === "ar"
    ? "يرجى ملء النموذج ليتواصل معك مستشار المبيعات لدينا."
    : "Fill out the form so our sales consultant can contact you."}
</p> 

      <form onSubmit={handleLeadSubmit}>
        
<input
  required
  name="full_name"
  placeholder={
    language === "tr" ? "Ad Soyad" :
    language === "de" ? "Vor- und Nachname" :
    language === "ru" ? "Имя и фамилия" :
    language === "ar" ? "الاسم الكامل" :
    "Full Name"
  }
  style={{ width: "100%", padding: 14, marginBottom: 12 }}
/>

        
<input
  required
  type="tel"
  name="phone"
  placeholder={
    language === "tr" ? "Telefon Numarası" :
    language === "de" ? "Telefonnummer" :
    language === "ru" ? "Номер телефона" :
    language === "ar" ? "رقم الهاتف" :
    "Phone Number"
  }
  style={{ width: "100%", padding: 14, marginBottom: 12 }}
/>

        
<input
  type="email"
  name="email"
  placeholder={
    language === "tr" ? "E-posta Adresi" :
    language === "de" ? "E-Mail-Adresse" :
    language === "ru" ? "Адрес электронной почты" :
    language === "ar" ? "البريد الإلكتروني" :
    "Email Address"
  }
  style={{ width: "100%", padding: 14, marginBottom: 12 }}
/>


       <select
  required
  name="property_type"
  defaultValue=""
  style={{ width: "100%", padding: 14, marginBottom: 12 }}
>
  <option value="" disabled>
    {language === "tr" ? "İlgilendiğiniz Konut Tipi" :
     language === "de" ? "Gewünschter Immobilientyp" :
     language === "ru" ? "Интересующий тип недвижимости" :
     language === "ar" ? "نوع العقار الذي تهتم به" :
     "Property Type You're Interested In"}
  </option>

  <option value="1+0 Stüdyo Daire">
    {language === "tr" ? "1+0 Stüdyo Daire" :
     language === "de" ? "1+0 Studio-Apartment" :
     language === "ru" ? "1+0 Квартира-студия" :
     language === "ar" ? "استوديو 1+0" :
     "1+0 Studio Apartment"}
  </option>

  <option value="1+1 Daire">
    {language === "tr" ? "1+1 Daire" :
     language === "de" ? "1+1 Wohnung" :
     language === "ru" ? "1+1 Квартира" :
     language === "ar" ? "شقة 1+1" :
     "1+1 Apartment"}
  </option>

  <option value="2+1 Daire">
    {language === "tr" ? "2+1 Daire" :
     language === "de" ? "2+1 Wohnung" :
     language === "ru" ? "2+1 Квартира" :
     language === "ar" ? "شقة 2+1" :
     "2+1 Apartment"}
  </option>

  <option value="2+1 Tek Kat Villa">
    {language === "tr" ? "2+1 Tek Kat Villa" :
     language === "de" ? "2+1 Einstöckige Villa" :
     language === "ru" ? "2+1 Одноэтажная вилла" :
     language === "ar" ? "فيلا من طابق واحد 2+1" :
     "2+1 Single-Storey Villa"}
  </option>
</select> 

        
<textarea
  name="message"
  placeholder={
    language === "tr" ? "Mesajınız (İsteğe Bağlı)" :
    language === "de" ? "Ihre Nachricht (Optional)" :
    language === "ru" ? "Ваше сообщение (необязательно)" :
    language === "ar" ? "رسالتك (اختياري)" :
    "Your Message (Optional)"
  }
  rows={3}
  style={{ width: "100%", padding: 14, marginBottom: 12 }}
/>


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
          {language === "tr" ? "Başvuru Gönder" :
 language === "de" ? "Anfrage senden" :
 language === "ru" ? "Отправить заявку" :
 language === "ar" ? "إرسال الطلب" :
 "Submit Application"}
        </button>
      </form>
    </div>
  </div>
)}
{zoomImage && (
  <div
    onClick={() => setZoomImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.95)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      cursor: "zoom-out"
    }}
  >
    <button
      onClick={() => setZoomImage(null)}
      style={{
        position: "absolute",
        top: 25,
        right: 25,
        color: "white",
        background: "transparent",
        border: "none",
        fontSize: 36,
        cursor: "pointer"
      }}
    >
      ×
    </button>
    <img
      src={zoomImage}
      alt="Golden Life Büyük Görsel"
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "100%",
        maxHeight: "90vh",
        objectFit: "contain",
        borderRadius: 12,
        cursor: "default"
      }}
    />
    {[-1, 1].map((direction) => (
  <button
    key={direction}
    onClick={(e) => {
      e.stopPropagation();
      const index = images.indexOf(zoomImage);
      const next = (index + direction + images.length) % images.length;
      setZoomImage(images[next]);
      setSlide(next);
    }}
    style={{
      position: "absolute",
      top: "50%",
      [direction === -1 ? "left" : "right"]: 20,
      transform: "translateY(-50%)",
      zIndex: 10000,
      background: "rgba(0,0,0,0.55)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.4)",
      borderRadius: "50%",
      width: 48,
      height: 48,
      fontSize: 30,
      cursor: "pointer",
    }}
  >
    {direction === -1 ? "‹" : "›"}
  </button>
))}
  </div>
)}    
 
<section
  id="proje-konumu"
  style={{
    padding: "80px 24px",
    background: "#101820",
    color: "#fff",
  }}
>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <p style={{ color: "#d4af37", letterSpacing: 4 }}>
      GOLDEN LIFE | ANTALYA
    </p>

    <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)" }}>
      {language === "tr" ? "Proje Konumu ve Tapu Bilgileri" :
 language === "de" ? "Projektstandort und Grundbuchinformationen" :
 language === "ru" ? "Расположение проекта и кадастровые данные" :
 language === "ar" ? "موقع المشروع ومعلومات سند الملكية" :
 "Project Location and Land Registry Information"}
    </h2>

<p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
  {language === "tr"
    ? "Golden Life projesinin konum ve parsel bilgilerini inceleyin."
    : language === "de"
    ? "Entdecken Sie den Standort und die Grundstücksdaten des Golden Life Projekts."
    : language === "ru"
    ? "Ознакомьтесь с расположением и кадастровыми данными проекта Golden Life."
    : language === "ar"
    ? "اطلع على موقع مشروع غولدن لايف ومعلومات قطعة الأرض."
    : "Explore the location and land parcel details of the Golden Life project."}
</p>    

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
    gap: 32,
    alignItems: "start",
  }}
>

<div style={{ marginTop: 32, marginBottom: 32 }}>
  <img
    src="/golden-life/06F8BE84-97ED-4220-8DFB-15A567A84222.png"
    alt="Golden Life Antalya Aksu Kayadibi 102 ada 1 parsel temsili arazi görselleştirmesi"
    style={{
      display: "block",
      width: "100%",
      height: "auto",
      borderRadius: 18,
      border: "1px solid #d4af37",
    }}
  />
  <p
    style={{
      color: "#cbd5e1",
      fontSize: 13,
      marginTop: 12,
      lineHeight: 1.7,
    }}
  >
    {language === "tr"
  ? "Temsili arazi görselleştirmesidir. Kesin parsel sınırları ve resmî bilgiler için TKGM Parsel Sorgu sistemi esas alınmalıdır."
  : language === "de"
  ? "Dies ist eine illustrative Grundstücksdarstellung. Für genaue Grundstücksgrenzen und amtliche Angaben sind die Daten des türkischen Katasteramts (TKGM) maßgeblich."
  : language === "ru"
  ? "Это иллюстративное изображение участка. Точные границы и официальные сведения необходимо проверять через кадастровую систему TKGM."
  : language === "ar"
  ? "هذا تصوير توضيحي للأرض. يجب الرجوع إلى نظام الاستعلام عن قطع الأراضي الرسمي TKGM للتحقق من الحدود والمعلومات الرسمية."
  : "This is an illustrative visualization of the land. Exact parcel boundaries and official information must be verified through the TKGM Land Parcel Inquiry system."}
  </p>
</div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,
        marginTop: 32,
      }}
    >
      {[
  [
    language === "tr" ? "İL" :
    language === "de" ? "PROVINZ" :
    language === "ru" ? "ПРОВИНЦИЯ" :
    language === "ar" ? "المحافظة" : "PROVINCE",
    "Antalya"
  ],
  [
    language === "tr" ? "İLÇE" :
    language === "de" ? "BEZIRK" :
    language === "ru" ? "РАЙОН" :
    language === "ar" ? "المنطقة" : "DISTRICT",
    "Aksu"
  ],
  [
    language === "tr" ? "MAHALLE / MEVKİ" :
    language === "de" ? "ORTSTEIL / LAGE" :
    language === "ru" ? "РАЙОН / МЕСТНОСТЬ" :
    language === "ar" ? "الحي / الموقع" : "NEIGHBORHOOD / LOCATION",
    "Kayadibi"
  ],
  [
    language === "tr" ? "ADA NUMARASI" :
    language === "de" ? "BLOCKNUMMER" :
    language === "ru" ? "НОМЕР КВАРТАЛА" :
    language === "ar" ? "رقم المربع" : "BLOCK NUMBER",
    "102"
  ],
  [
    language === "tr" ? "PARSEL NUMARASI" :
    language === "de" ? "FLURSTÜCKNUMMER" :
    language === "ru" ? "НОМЕР УЧАСТКА" :
    language === "ar" ? "رقم القطعة" : "PARCEL NUMBER",
    "1"
  ],
  [
    language === "tr" ? "TAPU ALANI" :
    language === "de" ? "GRUNDBUCHFLÄCHE" :
    language === "ru" ? "ПЛОЩАДЬ УЧАСТКА" :
    language === "ar" ? "مساحة الأرض المسجلة" : "REGISTERED LAND AREA",
    language === "tr" ? "124.246 m² (124,25 dönüm)" :
language === "de" ? "124.246 m² (12,42 Hektar)" :
language === "ru" ? "124 246 м² (12,42 га)" :
language === "ar" ? "124,246 م² (12.42 هكتار)" :
"124,246 m² (12.42 hectares)"
  ],
].map(([label, value]) => (
        <div
          key={label}
          style={{
            padding: 24,
            border: "1px solid #806c3b",
            borderRadius: 14,
            background: "#1b2630",
          }}
        >
          <div style={{ color: "#d4af37", fontSize: 12 }}>
            {label}
          </div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 700,
              marginTop: 12,
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  </div>

    <div
      style={{
        marginTop: 36,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #806c3b",
      }}
    >
      <iframe
        title="Golden Life bölge haritası"
        src="https://www.google.com/maps?q=Kayadibi%2C%20Aksu%2C%20Antalya&output=embed"
        width="100%"
        height="420"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    <p style={{ color: "#aeb8c2", fontSize: 13 }}>
      {language === "tr"
  ? "Harita bölgeyi göstermektedir. Kesin parsel sınırları için resmî kayıtlar esas alınmalıdır."
  : language === "de"
  ? "Die Karte zeigt die Region. Für die genauen Grundstücksgrenzen sind die amtlichen Katasterunterlagen maßgeblich."
  : language === "ru"
  ? "Карта показывает район расположения. Точные границы участка определяются официальными кадастровыми документами."
  : language === "ar"
  ? "تُظهر الخريطة المنطقة المحيطة. ويجب الرجوع إلى السجلات الرسمية لتحديد الحدود الدقيقة لقطعة الأرض."
  : "The map shows the surrounding area. Official cadastral records must be consulted for exact parcel boundaries."}
    </p>

    <a
      href="https://parselsorgu.tkgm.gov.tr/#ara/idari/134565/102/1/1792565213891"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        marginTop: 20,
        padding: "16px 28px",
        background: "#d4af37",
        color: "#101820",
        borderRadius: 10,
        fontWeight: 700,
        textDecoration: "none",
      }}
    >
      {language === "tr" ? "Resmî Ada / Parsel Sorgulama ↗" :
 language === "de" ? "Offizielle Grundstücksabfrage ↗" :
 language === "ru" ? "Официальная проверка участка ↗" :
 language === "ar" ? "الاستعلام الرسمي عن قطعة الأرض ↗" :
 "Official Land Parcel Inquiry ↗"}
    </a>
  </div>
</section>
     
    </main>
  );
}
