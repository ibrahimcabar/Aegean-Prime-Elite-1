'use client';
import {useEffect,useMemo,useState} from 'react';
import {Search,MapPin,ArrowUpRight,Menu,X,MessageCircle,Send,Building2,Globe2,BedDouble,Ruler,Check,ShieldCheck} from 'lucide-react';
import {properties,packages} from '../lib/data';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function Home({
  initialProperties = [],
  initialLanguage = "en",
}: {
  initialProperties?: any[];
  initialLanguage?: string;
}) {

  
const [goldenLifeShares, setGoldenLifeShares] = useState<number | null>(null);

useEffect(() => {
  const loadGoldenLifeShares = async () => {
    const { data, error } = await supabase
      .from("golden_life_shares")
      .select("remaining_shares")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Golden Life hisse hatası:", error.message);
      return;
    }

    setGoldenLifeShares(data.remaining_shares);
  };

  loadGoldenLifeShares();

  const interval = setInterval(loadGoldenLifeShares, 30000);

  return () => clearInterval(interval);
}, []);

  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  useEffect(() => {
  const savedConsent = localStorage.getItem("analytics_consent");
console.log("Kaydedilen çerez izni:", savedConsent);
  if (savedConsent === "accepted" || savedConsent === "rejected") {
    setCookieConsent(savedConsent);
  }
}, []);
  useEffect(() => {
  // Ziyaretçi takibi için izin verilmişse çalışır.
  if (localStorage.getItem("analytics_consent") !== "accepted") {
    return;
  }
let visitorId = localStorage.getItem("aegean-visitor-id");

if (!visitorId) {
  visitorId = crypto.randomUUID();
  localStorage.setItem("aegean-visitor-id", visitorId);
}
  fetch("/api/visitor-track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "page_view",
      page_path: window.location.pathname,
      language: localStorage.getItem("aegean-language") || "en",
    visitor_id: visitorId,
    }),
  })
  .then(async (response) => {
    const result = await response.json();

    console.log("Ziyaretçi takip sonucu:", {
      status: response.status,
      result,
    });
  })
  .catch((error) => {
    console.error("Ziyaretçi takip hatası:", error);
  });
}, [cookieConsent]);
const [query,setQuery]=useState('');const [search,setSearch]=useState('');const [kind,setKind]=useState('All types');const [chat,setChat]=useState(false);const [message,setMessage]=useState('');const [messages,setMessages]=useState<{who:'user'|'bot';text:string}[]>([{who:'bot',text:'Welcome to Velora Prime Elite. Where would you like to find your next property?'}]);const [mobile,setMobile]=useState(false);
  
const [minPrice, setMinPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
const [minArea, setMinArea] = useState('');
const [maxArea, setMaxArea] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState('');

const [selectedCurrency, setSelectedCurrency] = useState('EUR');

const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);

useEffect(() => {
  const loadExchangeRates = async () => {
    try {
      const response = await fetch('/api/exchange-rates');

      if (!response.ok) {
        throw new Error('Exchange rates unavailable');
      }

      const data = await response.json();

      if (
        data.base !== 'EUR' ||
        !['EUR', 'USD', 'TRY'].every(
          currency =>
            typeof data.rates?.[currency] === 'number' &&
            Number.isFinite(data.rates[currency]) &&
            data.rates[currency] > 0
        )
      ) {
        throw new Error('Invalid exchange rates');
      }

      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Exchange rate error:', error);
      setExchangeRates(null);
    }
  };

  loadExchangeRates();
}, []);

const [appliedMinPrice, setAppliedMinPrice] = useState('');
const [appliedMaxPrice, setAppliedMaxPrice] = useState('');
const [appliedCurrency, setAppliedCurrency] = useState('EUR');

const [dbProperties,setDbProperties]=useState<any[]>(initialProperties);
  
const [language, setLanguage] = useState(initialLanguage);

  
useEffect(() => {
  const supportedLanguages = ["en", "tr", "de", "ru", "ar"];

  const pathLanguage = window.location.pathname.split("/")[1];

  if (supportedLanguages.includes(pathLanguage)) {
    setLanguage(pathLanguage);
    return;
  }

  const savedLanguage = localStorage.getItem("aegean-language");

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    setLanguage(savedLanguage);
  }
}, []);



 const translations = {
  en: ["Properties", "For Partners", "Pricing", "About"],
  tr: ["Gayrimenkuller", "İş Ortaklarımız", "Fiyatlandırma", "Hakkımızda"],
  de: ["Immobilien", "Für Partner", "Preise", "Über uns"],
  ru: ["Недвижимость", "Партнёрам", "Цены", "О нас"],
  ar: ["العقارات", "للشركاء", "الأسعار", "من نحن"]
};

const t = translations[language as keyof typeof translations]; 
useEffect(()=>{supabase.from('properties').select('*').then(({data,error})=>{if(error){console.error('Supabase:',error);return;}setDbProperties(data||[]);});},[]);

const convertPrice = (
  price: number,
  fromCurrency: string,
  toCurrency: string
): number | null => {
  if (!Number.isFinite(price) || price < 0) return null;

  if (fromCurrency === toCurrency) return price;

  if (!exchangeRates) return null;

  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  if (!fromRate || !toRate) return null;

  return (price / fromRate) * toRate;
};

const filtered = useMemo(() => {
  const allProperties = [
    ...properties,
    ...dbProperties.map(p => ({
      ...p,
      type: p.property_type === 'villa'
        ? 'Villa'
        : p.property_type === 'apartment'
        ? 'Apartment'
        : p.property_type,
      area: Number(p.area_sqm) || 0,
      beds: p.beds ?? 0,
      isLive: true,
      image: p.image || '',
      price: Number(p.price) || 0,
      currency: p.currency || 'TRY',
      address: p.street_address || ''
    }))
  ];

  const filteredProperties = allProperties.filter(p => {
    const locationMatch =
      !search ||
      [p.city, p.country, p.address, p.title]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

    const typeMatch =
      kind === 'All types' || p.type === kind;
const bedroomsMatch =
  minBedrooms === '' ||
  (p.beds != null &&
    p.beds !== '' &&
    Number.isFinite(Number(p.beds)) &&
    Number(p.beds) >= Number(minBedrooms));
    const area =
  p.area == null || p.area === "" || Number(p.area) <= 0
    ? NaN
    : Number(p.area);

const areaMatch =
  (minArea === '' ||
    (Number.isFinite(area) && area >= Number(minArea))) &&
  (maxArea === '' ||
    (Number.isFinite(area) && area <= Number(maxArea)));
    const price = Number(p.price);
    const hasPriceFilter =
      appliedMinPrice !== '' || appliedMaxPrice !== '';

    
const convertedPrice = convertPrice(
  price,
  p.currency || 'TRY',
  appliedCurrency
);

const currencyMatch =
  !hasPriceFilter || convertedPrice !== null;


    
const minMatch =
  appliedMinPrice === '' ||
  (convertedPrice !== null &&
    convertedPrice >= Number(appliedMinPrice));

const maxMatch =
  appliedMaxPrice === '' ||
  (convertedPrice !== null &&
    convertedPrice <= Number(appliedMaxPrice));


    return (
  locationMatch &&
  typeMatch &&
  bedroomsMatch &&
  areaMatch &&
  currencyMatch &&
  minMatch &&
  maxMatch
);
  });
  if (sortBy === "price_asc" || sortBy === "price_desc") {
  filteredProperties.sort((a, b) => {
    const priceA = convertPrice(
      Number(a.price),
      a.currency || "TRY",
      appliedCurrency
    );

    const priceB = convertPrice(
      Number(b.price),
      b.currency || "TRY",
      appliedCurrency
    );

    if (priceA === null && priceB === null) return 0;
    if (priceA === null) return 1;
    if (priceB === null) return -1;

    return sortBy === "price_asc"
      ? priceA - priceB
      : priceB - priceA;
  });
}
  if (sortBy === "area_asc" || sortBy === "area_desc") {
  filteredProperties.sort((a, b) => {
    const areaA = Number(a.area);
    const areaB = Number(b.area);

    const validA = Number.isFinite(areaA) && areaA > 0;
    const validB = Number.isFinite(areaB) && areaB > 0;

    if (!validA && !validB) return 0;
    if (!validA) return 1;
    if (!validB) return -1;

    return sortBy === "area_asc"
      ? areaA - areaB
      : areaB - areaA;
  });
}
  return filteredProperties;
}, [
  search,
  kind,
  minBedrooms,
  minArea,
  maxArea,
  sortBy,
  dbProperties,
  appliedMinPrice,
  appliedMaxPrice,
  appliedCurrency,
  exchangeRates
]);


function submit() {
  setSearch(query);
  setAppliedMinPrice(minPrice);
  setAppliedMaxPrice(maxPrice);
  setAppliedCurrency(selectedCurrency);

  document.getElementById('properties')?.scrollIntoView({
    behavior: 'smooth'
  });
}


async function send() {
  if (!message.trim()) return;

  const m = message.trim();
  const history = [...messages, { who: "user" as const, text: m }];

  setMessages(history);
  setMessage("");

  try {
    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: history.map((item) => ({
          role: item.who === "user" ? "user" : "assistant",
          content: item.text
        }))
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI bağlantı hatası");
    }

    setMessages((old) => [
      ...old,
      {
        who: "bot",
        text: data.reply || "Şu anda cevap oluşturulamıyor."
      }
    ]);
  } catch (error) {
    console.error("Velora AI:", error);

    setMessages((old) => [
      ...old,
      {
        who: "bot",
        text: "Şu anda bağlantı sorunu yaşıyoruz. Lütfen tekrar deneyin."
      }
    ]);
  }
}

return <><header className="header"><a href="#top" className="brand">
  <img
    src="/velora-logo.png"
    alt="Velora Prime Elite"
    style={{
      height: "58px",
      width: "auto",
      maxWidth: "220px",
      objectFit: "contain"
    }}
  />
</a><nav className={mobile?'nav show':'nav'}><a href="#properties">{t[0]}</a><a href="#how">{t[1]}</a><a href="#packages">{t[2]}</a><a href="#about">{t[3]}</a></nav><div className="header-actions"><select
  aria-label="Select language"
  value={language}
  
onChange={(e) => {
  const selectedLanguage = e.target.value;

  localStorage.setItem("aegean-language", selectedLanguage);

  window.location.assign(`/${selectedLanguage}`);
}}

  style={{
    padding: "9px",
    borderRadius: "8px",
    border: "1px solid #b99a60",
    background: "#18382c",
    color: "white",
    cursor: "pointer"
  }}
>
  <option value="en">🇬🇧 English</option>
  <option value="tr">🇹🇷 Türkçe</option>
  <option value="de">🇩🇪 Deutsch</option>
  <option value="ru">🇷🇺 Русский</option>
  <option value="ar">🇸🇦 العربية</option>
</select><a className="outline-btn" href="/ilan-ekle">
  {language === "tr" ? "İlan Ver" :
   language === "de" ? "Immobilie inserieren" :
   language === "ru" ? "Разместить объявление" :
   language === "ar" ? "أضف عقارك" :
   "List a Property"}
  <ArrowUpRight size={15}/>
</a><button className="menu" aria-label="Toggle menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></div></header>
<main id="top"><section className="hero"><div className="hero-image"/><div className="hero-overlay"/><div className="hero-content"><div className="eyebrow">
  {language === "tr" ? "DÜNYA SİZİN ADRESİNİZ" :
   language === "de" ? "DIE WELT IST IHRE ADRESSE" :
   language === "ru" ? "ВЕСЬ МИР — ВАШ АДРЕС" :
   language === "ar" ? "العالم هو عنوانك" :
   "THE WORLD IS YOUR ADDRESS"}
  <span/>
</div><h1>
  {language === "tr" ? <>Olağanüstü gayrimenkuller.<br/><em>Sınırların ötesinde.</em></> :
   language === "de" ? <>Außergewöhnliche Immobilien.<br/><em>Grenzenlos.</em></> :
   language === "ru" ? <>Исключительная недвижимость.<br/><em>Без границ.</em></> :
   language === "ar" ? <>عقارات استثنائية.<br/><em>بلا حدود.</em></> :
   <>Extraordinary properties.<br/><em>Without borders.</em></>}
</h1><p>
  {language === "tr"
    ? "Dünyanın dört bir yanındaki seçkin konutları ve yatırım fırsatlarını tek bir platformda keşfedin."
    : language === "de"
    ? "Entdecken Sie exklusive Immobilien und Investitionsmöglichkeiten aus aller Welt auf einer einzigen Plattform."
    : language === "ru"
    ? "Откройте для себя эксклюзивную недвижимость и инвестиционные возможности по всему миру на одной платформе."
    : language === "ar"
    ? "اكتشف العقارات الفاخرة والفرص الاستثمارية حول العالم في منصة واحدة."
    : "Discover exceptional homes and investment opportunities across the globe, curated in one seamless destination."}
</p><div className="search-panel"><div className="search-input"><MapPin size={20}/><input aria-label="Search location" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder={
  language === "tr" ? "Şehir, ülke veya sokak ara (örn. Berlin Hauptstraße)" :
  language === "de" ? "Stadt, Land oder Straße suchen (z. B. Berlin Hauptstraße)" :
  language === "ru" ? "Поиск по городу, стране или улице" :
  language === "ar" ? "ابحث عن مدينة أو دولة أو شارع" :
  "Search city, country or street (e.g. Berlin Hauptstraße)"
}/></div><select aria-label="Property type" value={kind} onChange={e=>setKind(e.target.value)}><option value="All types">
  {language === "tr" ? "Tüm Türler" :
   language === "de" ? "Alle Typen" :
   language === "ru" ? "Все типы" :
   language === "ar" ? "جميع الأنواع" :
   "All types"}
</option>
<option value="Apartment">
  {language === "tr" ? "Daire" :
   language === "de" ? "Wohnung" :
   language === "ru" ? "Квартира" :
   language === "ar" ? "شقة" :
   "Apartment"}
</option>
<option value="Villa">
  {language === "tr" ? "Villa" :
   language === "de" ? "Villa" :
   language === "ru" ? "Вилла" :
   language === "ar" ? "فيلا" :
   "Villa"}

</option></select>
 <select
  aria-label="Minimum bedrooms"
  value={minBedrooms}
  onChange={(e) => setMinBedrooms(e.target.value)}
>
  <option value="">
    {language === "tr" ? "Oda Sayısı" :
     language === "de" ? "Schlafzimmer" :
     language === "ru" ? "Количество спален" :
     language === "ar" ? "عدد غرف النوم" :
     "Bedrooms"}
  </option>
  <option value="1">1+</option>
  <option value="2">2+</option>
  <option value="3">3+</option>
  <option value="4">4+</option>
  <option value="5">5+</option>
</select> 
  <input
  type="number"
  min="0"
  placeholder={
    language === "tr" ? "Min. m²" :
    language === "de" ? "Min. m²" :
    language === "ru" ? "Мин. м²" :
    language === "ar" ? "الحد الأدنى م²" :
    "Min. m²"
  }
  value={minArea}
  onChange={(e) => setMinArea(e.target.value)}
  aria-label="Minimum area"
/>

<input
  type="number"
  min="0"
  placeholder={
    language === "tr" ? "Maks. m²" :
    language === "de" ? "Max. m²" :
    language === "ru" ? "Макс. м²" :
    language === "ar" ? "الحد الأقصى م²" :
    "Max. m²"
  }
  value={maxArea}
  onChange={(e) => setMaxArea(e.target.value)}
  aria-label="Maximum area"
/>
 <select
  aria-label="Sort properties"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="default">
    {language === "tr" ? "Sıralama" :
     language === "de" ? "Sortieren" :
     language === "ru" ? "Сортировка" :
     language === "ar" ? "الترتيب" :
     "Sort by"}
  </option>

  <option value="price_asc">
    {language === "tr" ? "Fiyat: Artan" :
     language === "de" ? "Preis: Aufsteigend" :
     language === "ru" ? "Цена: По возрастанию" :
     language === "ar" ? "السعر: من الأقل للأعلى" :
     "Price: Low to High"}
  </option>

  <option value="price_desc">
    {language === "tr" ? "Fiyat: Azalan" :
     language === "de" ? "Preis: Absteigend" :
     language === "ru" ? "Цена: По убыванию" :
     language === "ar" ? "السعر: من الأعلى للأقل" :
     "Price: High to Low"}
  </option>

  <option value="area_asc">
    {language === "tr" ? "m²: Küçükten Büyüğe" :
     language === "de" ? "Fläche: Aufsteigend" :
     language === "ru" ? "Площадь: По возрастанию" :
     language === "ar" ? "المساحة: من الأصغر للأكبر" :
     "Area: Small to Large"}
  </option>

  <option value="area_desc">
    {language === "tr" ? "m²: Büyükten Küçüğe" :
     language === "de" ? "Fläche: Absteigend" :
     language === "ru" ? "Площадь: По убыванию" :
     language === "ar" ? "المساحة: من الأكبر للأصغر" :
     "Area: Large to Small"}
  </option>
</select> 
<input
  type="number"
  min="0"
  placeholder={language === "tr" ? "Min. fiyat" : language === "de" ? "Min. Preis" : language === "ru" ? "Мин. цена" : language === "ar" ? "أقل سعر" : "Min. price"}
  value={minPrice}
  onChange={e => setMinPrice(e.target.value)}
  aria-label="Minimum price"
/>
<input
  type="number"
  min="0"
  placeholder={language === "tr" ? "Maks. fiyat" : language === "de" ? "Max. Preis" : language === "ru" ? "Макс. цена" : language === "ar" ? "أعلى سعر" : "Max. price"}
  value={maxPrice}
  onChange={e => setMaxPrice(e.target.value)}
  aria-label="Maximum price"
/>
  
<select
  aria-label="Currency"
  value={selectedCurrency}
  onChange={e => setSelectedCurrency(e.target.value)}
>
  <option value="TRY">₺ TRY</option>
  <option value="EUR">€ EUR</option>
  <option value="USD">$ USD</option>
</select>

<button onClick={submit}>

  <Search size={18}/>
  {language === "tr" ? "Keşfet" :
   language === "de" ? "Entdecken" :
   language === "ru" ? "Исследовать" :
   language === "ar" ? "استكشف" :
   "Explore"}
</button></div><div className="hero-bottom"><span><Globe2 size={17}/>
{language === "tr" ? "FIRSATLARLA DOLU BİR DÜNYA" :
 language === "de" ? "EINE WELT VOLLER MÖGLICHKEITEN" :
 language === "ru" ? "МИР ВОЗМОЖНОСТЕЙ" :
 language === "ar" ? "عالم من الفرص" :
 "A WORLD OF OPPORTUNITY"}</span></div></div></section>

<section className="golden-life-showcase" style={{
  padding: "65px 20px",
  background: "#f8f7f4",
  textAlign: "center"
}}>

  <div style={{
    maxWidth: 1100,
    margin: "auto",
    padding: "55px 25px",
    background: "linear-gradient(135deg, #18382c, #294c3e)",
    border: "1px solid #b99a60",
    borderRadius: 22,
    boxShadow: "0 20px 55px rgba(24,56,44,0.18)"
  }}>
    <p style={{
      color: "#d9bd82",
      fontWeight: 700,
      letterSpacing: 4,
      fontSize: 13
    }}>
      {language === "tr" ? "VELORA PRIME ELITE • ÖZEL PROJE" :
 language === "de" ? "VELORA PRIME ELITE • EXKLUSIVES PROJEKT" :
 language === "ru" ? "VELORA PRIME ELITE • ОСОБЫЙ ПРОЕКТ" :
 language === "ar" ? "VELORA PRIME ELITE • مشروع خاص" :
 "VELORA PRIME ELITE • SPECIAL PROJECT"}
    </p>

    <h2 style={{
      fontSize: "clamp(38px, 6vw, 68px)",
      color: "#ffffff",
      margin: "25px 0 12px",
      letterSpacing: 2
    }}>
      GOLDEN LIFE
    </h2>
<img
  src="/golden-life/50991BE5-186E-470A-9857-4E8F5C432CAF.png"
  alt="Golden Life Lüks Konut Projesi"
  style={{
    width: "100%",
    maxWidth: 950,
    height: "auto",
    borderRadius: 16,
    margin: "25px auto",
    display: "block",
    border: "1px solid #b99a60"
  }}
/>
    <p style={{
      color: "#d9bd82",
      fontSize: 17,
      letterSpacing: 2
    }}>
      ANTALYA • KAYADİBİ / KARAÖZ
    </p>

    <p style={{
      color: "#e8e8e2",
      fontSize: 19,
      margin: "25px auto",
      maxWidth: 650,
      lineHeight: 1.8
    }}>
     {language === "tr"
  ? "Doğanın kalbinde ayrıcalıklı bir yaşam. Modern mimari, konforlu konutlar ve gayrimenkul yatırım fırsatları."
  : language === "de"
  ? "Exklusives Wohnen im Herzen der Natur. Moderne Architektur, komfortable Immobilien und attraktive Investitionsmöglichkeiten."
  : language === "ru"
  ? "Привилегированная жизнь в окружении природы. Современная архитектура, комфортное жильё и возможности инвестиций в недвижимость."
  : language === "ar"
  ? "حياة مميزة في قلب الطبيعة. هندسة معمارية حديثة ومنازل مريحة وفرص استثمار عقاري."
  : "Exclusive living in the heart of nature. Modern architecture, comfortable homes and real estate investment opportunities."} 
    </p>

    <div style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 15,
      margin: "30px 0"
    }}>
      {(language === "tr"
  ? ["1+0 Stüdyo", "1+1 Daire", "2+1 Daire", "Villa"]
  : language === "de"
  ? ["1+0 Studio", "1+1 Wohnung", "2+1 Wohnung", "Villa"]
  : language === "ru"
  ? ["1+0 Студия", "1+1 Квартира", "2+1 Квартира", "Вилла"]
  : language === "ar"
  ? ["استوديو 1+0", "شقة 1+1", "شقة 2+1", "فيلا"]
  : ["1+0 Studio", "1+1 Apartment", "2+1 Apartment", "Villa"]
).map((item) => (
        <span key={item} style={{
          padding: "10px 17px",
          border: "1px solid #b99a60",
          borderRadius: 8,
          color: "#ffffff",
          fontSize: 14
        }}>
          {item}
        </span>
      ))}
    </div>

    <div style={{
      background: "rgba(255,255,255,0.08)",
      border: "1px solid #b99a60",
      borderRadius: 14,
      padding: "25px 15px",
      maxWidth: 550,
      margin: "30px auto"
    }}>
      <p style={{ color: "#e8e8e2", fontSize: 16 }}>
       {language === "tr" ? "Kooperatif Katılım Ücreti" :
 language === "de" ? "Genossenschaftsbeitrittsgebühr" :
 language === "ru" ? "Вступительный взнос в кооператив" :
 language === "ar" ? "رسوم الانضمام إلى التعاونية" :
 "Cooperative Membership Fee"} 
      </p>

      <h3 style={{
        color: "#d9bd82",
        fontSize: "clamp(30px, 5vw, 44px)",
        margin: "10px 0"
      }}>
        600.000 TL
      </h3>

      <p style={{ color: "#e8e8e2", fontSize: 15 }}>
       {language === "tr" ? "Konut fiyatları 50.000 €'dan başlıyor" :
 language === "de" ? "Immobilienpreise ab 50.000 €" :
 language === "ru" ? "Цены на жильё от 50 000 €" :
 language === "ar" ? "تبدأ أسعار العقارات من 50,000 يورو" :
 "Property prices start from €50,000"} 
      </p>
     
{goldenLifeShares !== null && (
  <div style={{
    margin: "28px auto 0",
    padding: "24px 20px",
    maxWidth: 450,
    border: "1px solid #b99a60",
    borderRadius: 16,
    background: "rgba(24,56,44,0.65)",
    textAlign: "center"
  }}>
    <div style={{
      color: "#d6bd88",
      fontSize: "clamp(42px, 7vw, 64px)",
      fontWeight: 700
    }}>
      {goldenLifeShares.toLocaleString("tr-TR")}
    </div>

    <div style={{
      color: "#ffffff",
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 2
    }}>
      {({
        tr: "KALAN HİSSE",
        en: "REMAINING SHARES",
        de: "VERFÜGBARE ANTEILE",
        ru: "ОСТАЛОСЬ ДОЛЕЙ",
        ar: "الحصص المتبقية"
      } as Record<string, string>)[language] ?? "REMAINING SHARES"}
    </div>

    <p style={{
      color: "#e8e5dc",
      fontSize: 13,
      marginTop: 12
    }}>
      {({
        tr: "Toplam 1.400 hisse",
        en: "1,400 shares in total",
        de: "Insgesamt 1.400 Anteile",
        ru: "Всего 1 400 долей",
        ar: "إجمالي ١٤٠٠ حصة"
      } as Record<string, string>)[language] ?? "1,400 shares in total"}
    </p>

    <div style={{
      height: 9,
      background: "rgba(255,255,255,0.2)",
      borderRadius: 20,
      overflow: "hidden",
      marginTop: 16
    }}>
      <div style={{
        width: `${Math.max(0, Math.min(100, ((1400 - goldenLifeShares) / 1400) * 100))}%`,
        height: "100%",
        background: "#d6bd88",
        borderRadius: 20
      }} />
    </div>
  </div>
)}
 
    </div>

    <p style={{ color: "#d9bd82", fontSize: 16 }}>
     {language === "tr" ? "36 Aylık Ödeme Planı" :
 language === "de" ? "36-Monats-Zahlungsplan" :
 language === "ru" ? "План оплаты на 36 месяцев" :
 language === "ar" ? "خطة سداد لمدة 36 شهرًا" :
 "36-Month Payment Plan"} 
    </p>

    <a
      href="/projects/golden-life"
      style={{
        display: "inline-block",
        marginTop: 20,
        padding: "17px 38px",
        background: "#b99a60",
        color: "#18382c",
        borderRadius: 10,
        textDecoration: "none",
        fontWeight: 800,
        fontSize: 17
      }}
    >
     {language === "tr" ? "GOLDEN LIFE'I KEŞFET →" :
 language === "de" ? "GOLDEN LIFE ENTDECKEN →" :
 language === "ru" ? "ОТКРОЙТЕ GOLDEN LIFE →" :
 language === "ar" ? "اكتشف جولدن لايف ←" :
 "EXPLORE GOLDEN LIFE →"} 
    </a>
  </div>
</section>
<section className="section listings" id="properties"><div className="section-heading"><div><div className="kicker">
  {language === "tr" ? "GAYRİMENKUL KOLEKSİYONU" :
   language === "de" ? "IMMOBILIENKOLLEKTION" :
   language === "ru" ? "КОЛЛЕКЦИЯ НЕДВИЖИМОСТИ" :
   language === "ar" ? "مجموعة العقارات" :
   "THE COLLECTION"}
</div><h2>
  {language === "tr" ? <>Olağanüstü <em>gayrimenkulleri keşfedin.</em></> :
   language === "de" ? <>Entdecken Sie außergewöhnliche <em>Immobilien.</em></> :
   language === "ru" ? <>Откройте для себя уникальную <em>недвижимость.</em></> :
   language === "ar" ? <>اكتشف <em>عقارات استثنائية.</em></> :
   <>Explore remarkable <em>places.</em></>}
</h2><p>
  {language === "tr"
    ? "Örnek gayrimenkul ilanlarımızı keşfedin. Doğrulanmış gerçek ilanlar yayına alındıkça burada görüntülenecektir."
    : language === "de"
    ? "Entdecken Sie unsere Beispielimmobilien. Verifizierte Immobilienangebote werden nach der Veröffentlichung hier angezeigt."
    : language === "ru"
    ? "Ознакомьтесь с нашими примерами объектов недвижимости. Проверенные объявления появятся здесь после публикации."
    : language === "ar"
    ? "استكشف قوائمنا العقارية التجريبية. ستظهر العقارات الحقيقية الموثقة هنا بعد إطلاقها."
    : "Explore our illustrative preview listings. Verified live properties will appear here after launch."}
</p></div><span className="count">
  {filtered.length}{" "}
  {language === "tr" ? "örnek gayrimenkul" :
   language === "de" ? "Beispielimmobilien" :
   language === "ru" ? "примеров недвижимости" :
   language === "ar" ? "عقارات تجريبية" :
   "preview properties"}
</span></div>
<div className="property-grid">{filtered.map(p=><article
  className="property"
  key={`${p.isLive ? "live" : "preview"}-${p.id}`}
  style={{ cursor: "default" }}
>
<div className="property-photo" style={{backgroundImage:`url('${p.image}')`}}><span className="pill">{p.type}</span></div><div className="property-details"><div className="location"><MapPin size={13}/>{p.city}, {p.country}</div>
<h3>
  {p.isLive ? (
    <a
      href={`/ilan/${p.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      {p.title}
    </a>
  ) : (
    p.title
  )}
</h3>
<div className="property-meta"><span><BedDouble size={16}/>{p.beds} beds</span><span><Ruler size={16}/>{p.area} m²</span></div><div className="property-footer"><strong>{new Intl.NumberFormat('tr-TR',{style:'currency',currency:('currency' in p && typeof p.currency==='string' ? p.currency : 'EUR'),maximumFractionDigits:0}).format(p.price)}</strong><span>Preview listing</span></div></div></article>)}</div>{filtered.length===0&&<div className="empty">No preview properties match this search. Live global listings will be available as partners join.</div>}</section>
<section className="partner" id="how"><div><div className="kicker light">
  {language === "tr" ? "BİZİMLE BÜYÜYÜN" :
   language === "de" ? "WACHSEN SIE MIT UNS" :
   language === "ru" ? "РАСТИТЕ ВМЕСТЕ С НАМИ" :
   language === "ar" ? "انمُ معنا" :
   "GROW WITH US"}
</div><h2>
  {language === "tr" ? <>Portföyünüz.<br/><em>Küresel bir müşteri kitlesi.</em></> :
   language === "de" ? <>Ihr Portfolio.<br/><em>Ein globales Publikum.</em></> :
   language === "ru" ? <>Ваше портфолио.<br/><em>Клиенты со всего мира.</em></> :
   language === "ar" ? <>محفظتك العقارية.<br/><em>عملاء من جميع أنحاء العالم.</em></> :
   <>Your portfolio.<br/><em>A global audience.</em></>}
</h2><p>
  {language === "tr"
    ? "Emlak danışmanları, inşaat firmaları ve gayrimenkul ofisleri için: Profesyonel profilinizi oluşturun, ilan paketinizi seçin ve uluslararası alıcılara ulaşın."
    : language === "de"
    ? "Für Immobilienmakler, Bauträger und Agenturen: Erstellen Sie Ihr professionelles Profil, wählen Sie ein Anzeigenpaket und erreichen Sie internationale Käufer."
    : language === "ru"
    ? "Для риелторов, застройщиков и агентств: создайте профессиональный профиль, выберите пакет объявлений и привлекайте международных покупателей."
    : language === "ar"
    ? "للوكلاء العقاريين والمطورين والشركات: أنشئ ملفك المهني، واختر باقة الإعلانات المناسبة، وتواصل مع المشترين الدوليين."
    : "For real estate agents, developers and agencies: create your professional profile, choose a listing plan, and reach international buyers."}
</p><a className="gold-btn" href="#packages">{language === "tr" ? "İş Ortaklığı Paketlerini İncele" :
 language === "de" ? "Partnerpakete entdecken" :
 language === "ru" ? "Посмотреть партнёрские пакеты" :
 language === "ar" ? "استكشف باقات الشراكة" :
 "Explore partner plans"}
<ArrowUpRight size={17}/></a></div><div className="partner-steps">{[
  ['01', language === 'tr' ? 'Hesabınızı oluşturun' : language === 'de' ? 'Erstellen Sie Ihr Konto' : language === 'ru' ? 'Создайте аккаунт' : language === 'ar' ? 'أنشئ حسابك' : 'Create your account'],
  ['02', language === 'tr' ? 'İlan paketinizi seçin' : language === 'de' ? 'Wählen Sie ein Anzeigenpaket' : language === 'ru' ? 'Выберите пакет объявлений' : language === 'ar' ? 'اختر باقة الإعلانات' : 'Choose a listing package'],
  ['03', language === 'tr' ? 'Gayrimenkullerinizi ekleyin' : language === 'de' ? 'Fügen Sie Ihre Immobilien hinzu' : language === 'ru' ? 'Добавьте свои объекты' : language === 'ar' ? 'أضف عقاراتك' : 'Submit your properties'],
  ['04', language === 'tr' ? 'Uluslararası alıcılara ulaşın' : language === 'de' ? 'Erreichen Sie internationale Käufer' : language === 'ru' ? 'Привлекайте международных покупателей' : language === 'ar' ? 'تواصل مع المشترين الدوليين' : 'Connect with global buyers']
].map(([n,t])=><div key={n}><span>{n}</span><strong>{t}</strong><Check size={18}/></div>)}</div></section>
<section className="section pricing" id="packages"><div className="center"><div className="kicker">
  {language === "tr" ? "GAYRİMENKUL PROFESYONELLERİ İÇİN" :
   language === "de" ? "FÜR IMMOBILIENPROFIS" :
   language === "ru" ? "ДЛЯ ПРОФЕССИОНАЛОВ НЕДВИЖИМОСТИ" :
   language === "ar" ? "لمحترفي العقارات" :
   "FOR REAL ESTATE PROFESSIONALS"}
</div><h2>
  {language === "tr" ? <>Basit paketler. <em>Küresel erişim.</em></> :
   language === "de" ? <>Einfache Pakete. <em>Globale Reichweite.</em></> :
   language === "ru" ? <>Простые тарифы. <em>Глобальный охват.</em></> :
   language === "ar" ? <>باقات بسيطة. <em>انتشار عالمي.</em></> :
   <>Simple plans. <em>Global reach.</em></>}
</h2><p>
  {language === "tr"
    ? "Gösterilen aylık fiyatlar örnek amaçlıdır. Ödeme ve abonelik sistemi henüz aktif değildir."
    : language === "de"
    ? "Die angezeigten monatlichen Preise dienen nur zur Veranschaulichung. Zahlungen und Abonnements sind noch nicht aktiv."
    : language === "ru"
    ? "Указанные ежемесячные цены приведены для примера. Оплата и подписки пока недоступны."
    : language === "ar"
    ? "الأسعار الشهرية المعروضة توضيحية فقط. نظام الدفع والاشتراكات غير مفعل حالياً."
    : "Illustrative monthly pricing. Payment and subscriptions are not yet active."}
</p></div><div className="pricing-grid">{packages.map((p,i)=><div className={'plan '+(i===1?'featured':'')} key={p.name}><div className="plan-top"><span>{p.name}</span>{i===1&&<span className="popular">
  {language === "tr" ? "POPÜLER" :
   language === "de" ? "BELIEBT" :
   language === "ru" ? "ПОПУЛЯРНЫЙ" :
   language === "ar" ? "الأكثر شعبية" :
   "POPULAR"}
</span>}</div><div className="price">€{p.price}<small>
  {language === "tr" ? " / ay" :
   language === "de" ? " / Monat" :
   language === "ru" ? " / месяц" :
   language === "ar" ? " / شهر" :
   " / month"}
</small></div><p>
  {language === "tr" ? `En fazla ${p.count} aktif gayrimenkul ilanı` :
   language === "de" ? `Bis zu ${p.count} aktive Immobilienanzeigen` :
   language === "ru" ? `До ${p.count} активных объявлений о недвижимости` :
   language === "ar" ? `حتى ${p.count} إعلان عقاري نشط` :
   `Up to ${p.count} active property listings`}
</p><div className="plan-rule"/>{(language === "tr" ? [
  "Profesyonel emlak ofisi profili",
  "Gayrimenkul ilan yönetimi",
  "Uluslararası görünürlük",
  "Alıcı taleplerine erişim"
] : language === "de" ? [
  "Professionelles Maklerprofil",
  "Verwaltung von Immobilienanzeigen",
  "Internationale Sichtbarkeit",
  "Zugang zu Käuferanfragen"
] : language === "ru" ? [
  "Профессиональный профиль агентства",
  "Управление объявлениями",
  "Международная видимость",
  "Доступ к запросам покупателей"
] : language === "ar" ? [
  "ملف احترافي للوكالة العقارية",
  "إدارة الإعلانات العقارية",
  "ظهور دولي",
  "الوصول إلى استفسارات المشترين"
] : [
  "Professional agency profile",
  "Property listing management",
  "International visibility",
  "Buyer enquiry access"
]).map(x=><div className="plan-benefit" key={x}><Check size={16}/>{x}</div>)}<button onClick={()=>alert('Partner registration is planned for the next development phase. No payment is being collected.')}>{language === "tr" ? "Yakında" :
 language === "de" ? "Demnächst verfügbar" :
 language === "ru" ? "Скоро" :
 language === "ar" ? "قريباً" :
 "Coming soon"}
<ArrowUpRight size={16}/></button></div>)}</div></section>
<section className="trust" id="about"><ShieldCheck size={28}/><div><h2>
  {language === "tr" ? "Güven üzerine kuruldu. Dünya için tasarlandı." :
   language === "de" ? "Auf Vertrauen aufgebaut. Für die Welt entwickelt." :
   language === "ru" ? "Основано на доверии. Создано для всего мира." :
   language === "ar" ? "مبني على الثقة. مصمم للعالم." :
   "Built on trust. Designed for the world."}
</h2><p>
  {language === "tr"
    ? "İş ortağı doğrulaması, şeffaf gayrimenkul ilanları ve akıllı gayrimenkul arama özellikleriyle çok dilli, uluslararası bir emlak platformu oluşturuyoruz."
    : language === "de"
    ? "Wir entwickeln eine mehrsprachige Immobilienplattform mit verifizierten Partnern, transparenten Angeboten und intelligenter Immobiliensuche."
    : language === "ru"
    ? "Мы создаём многоязычную платформу недвижимости с проверкой партнёров, прозрачными объявлениями и интеллектуальным поиском объектов."
    : language === "ar"
    ? "نحن نطور منصة عقارية متعددة اللغات مع التحقق من الشركاء وإعلانات شفافة وبحث ذكي عن العقارات."
    : "We are building a multilingual marketplace with partner verification, transparent listings and intelligent property discovery."}

</p></div></section>

{language === "de" && (
  <section
    aria-labelledby="german-seo-title"
    style={{
      background: "#f8f7f4",
      padding: "65px 22px",
      color: "#18382c"
    }}
  >
    <div style={{ maxWidth: 1050, margin: "0 auto" }}>
      <p style={{
        color: "#9b7942",
        fontWeight: 700,
        letterSpacing: 2
      }}>
        IMMOBILIEN IN DER TÜRKEI
      </p>

      <h2 id="german-seo-title" style={{
        fontSize: "clamp(28px, 4vw, 42px)",
        lineHeight: 1.3
      }}>
        Immobilien in der Türkei kaufen
      </h2>

      <p style={{ lineHeight: 1.9, fontSize: 17 }}>
        Ob luxuriöse Villa an der Mittelmeerküste,
        moderne Wohnung oder Immobilie als
        Kapitalanlage: Die Türkei bietet
        unterschiedliche Wohnlagen und
        Immobilienarten. Velora Prime Elite
        unterstützt die internationale
        Immobiliensuche mit einer mehrsprachigen
        Plattform.
      </p>

      <h3>Beliebte Regionen für Immobilienkäufer</h3>

      <p style={{ lineHeight: 1.9 }}>
        Antalya ist besonders für seine Küstenlage
        bekannt. Istanbul bietet das Leben in einer
        internationalen Metropole. Izmir verbindet
        städtische Infrastruktur mit der Nähe zur
        Ägäis. Welche Region passt, hängt von Ihren
        persönlichen Zielen und Ihrem Budget ab.
      </p>

      <h3>Worauf sollten Käufer achten?</h3>

      <p style={{ lineHeight: 1.9 }}>
        Vor dem Immobilienkauf sollten Eigentumsnachweise
        (Tapu), baurechtliche Unterlagen,
        mögliche Belastungen sowie Kaufnebenkosten
        sorgfältig geprüft werden. Eine unabhängige
        rechtliche Beratung ist insbesondere bei
        internationalen Immobiliengeschäften sinnvoll.
      </p>

      <a
        href="#properties"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "15px 25px",
          background: "#18382c",
          color: "#d6bd88",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 700
        }}
      >
        Immobilienangebote entdecken
      </a>
    </div>
  </section>
)}

</main><footer>
<div className="footer-brand">VELORA <strong>PRIME ELITE</strong><small>GLOBAL REAL ESTATE</small></div><span>
  © {new Date().getFullYear()} Velora Prime Elite.
</span><span>
  {language === "tr" ? "Küresel gayrimenkule yeni bir bakış." :
   language === "de" ? "Globale Immobilien neu gedacht." :
   language === "ru" ? "Новый взгляд на мировую недвижимость." :
   language === "ar" ? "رؤية جديدة للعقارات العالمية." :
   "Global real estate, reimagined."}
</span></footer>
<button className="chat-launch" aria-label="Open AI assistant" onClick={()=>setChat(!chat)}>{chat?<X size={24}/>:<MessageCircle size={24}/>}</button>{chat&&<div className="chat"><div className="chat-head"><div className="chat-avatar">✦</div><div><strong>Velora AI</strong>
<small>Your Global Real Estate Assistant</small>
</div><button aria-label="Close chat" onClick={()=>setChat(false)}><X size={18}/></button></div><div className="chat-messages">{messages.map((m,i)=><div className={'bubble '+m.who} key={i}>{m.text}</div>)}</div><div className="chat-form"><input aria-label="Chat message" 
placeholder={
  language === "tr" ? "Gayrimenkuller hakkında sorun..." :
  language === "de" ? "Fragen Sie nach Immobilien..." :
  language === "ru" ? "Спросите о недвижимости..." :
  language === "ar" ? "اسأل عن العقارات..." :
  "Ask about properties..."
}
 value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/><button aria-label="Send message" onClick={send}><Send size={18}/></button></div></div>}{cookieConsent === null && (
  <div
    role="dialog"
    aria-label="Cookie preferences"
    style={{
      position: "fixed",
      bottom: 20,
      left: 20,
      right: 20,
      maxWidth: 520,
      margin: "0 auto",
      padding: 24,
      background: "#18382c",
      color: "#ffffff",
      border: "1px solid #b99a60",
      borderRadius: 16,
      boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
      zIndex: 9999,
      direction: language === "ar" ? "rtl" : "ltr"
    }}
  >
    <h3 style={{ marginTop: 0, color: "#d6bd88" }}>
      {language === "tr" ? "Çerez Tercihleri" :
       language === "de" ? "Cookie-Einstellungen" :
       language === "ru" ? "Настройки файлов cookie" :
       language === "ar" ? "إعدادات ملفات تعريف الارتباط" :
       "Cookie Preferences"}
    </h3>

    <p style={{ lineHeight: 1.7, fontSize: 14 }}>
      {language === "tr"
        ? "Deneyiminizi geliştirmek ve anonim ziyaret istatistiklerini ölçmek için izninizle analiz teknolojileri kullanıyoruz."
        : language === "de"
        ? "Mit Ihrer Einwilligung verwenden wir Analysetechnologien, um unsere Website zu verbessern."
        : language === "ru"
        ? "С вашего согласия мы используем аналитику для улучшения сайта."
        : language === "ar"
        ? "نستخدم تقنيات التحليل بموافقتك لتحسين تجربة الموقع."
        : "With your consent, we use analytics technologies to improve your website experience."}
    </p>

    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {[
        { value: "rejected", tr: "Reddet", de: "Ablehnen", ru: "Отклонить", ar: "رفض", en: "Reject" },
        { value: "accepted", tr: "Kabul Et", de: "Akzeptieren", ru: "Принять", ar: "قبول", en: "Accept" }
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => {
            localStorage.setItem("analytics_consent", option.value);
            setCookieConsent(option.value);
          }}
          style={{
            flex: 1,
            minWidth: 120,
            padding: "12px 18px",
            borderRadius: 8,
            border: "1px solid #d6bd88",
            background: option.value === "accepted" ? "#d6bd88" : "transparent",
            color: option.value === "accepted" ? "#18382c" : "#ffffff",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {option[language as "tr" | "de" | "ru" | "ar" | "en"]}
        </button>
      ))}
    </div>
  </div>
)}</>}
