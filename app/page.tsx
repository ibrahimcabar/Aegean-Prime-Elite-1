'use client';
import {useEffect,useMemo,useState} from 'react';
import {Search,MapPin,ArrowUpRight,Menu,X,MessageCircle,Send,Building2,Globe2,BedDouble,Ruler,Check,ShieldCheck} from 'lucide-react';
import {properties,packages} from '../lib/data';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
export default function Home(){
const [query,setQuery]=useState('');const [search,setSearch]=useState('');const [kind,setKind]=useState('All types');const [chat,setChat]=useState(false);const [message,setMessage]=useState('');const [messages,setMessages]=useState<{who:'user'|'bot';text:string}[]>([{who:'bot',text:'Welcome to Aegean Prime Elite. Where would you like to find your next property?'}]);const [mobile,setMobile]=useState(false);
const [dbProperties,setDbProperties]=useState<any[]>([]);
  const [language, setLanguage] = useState("en");
  useEffect(() => {
  const savedLanguage = localStorage.getItem("aegean-language");
  if (savedLanguage && ["en", "tr", "de", "ru", "ar"].includes(savedLanguage)) {
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
const filtered=useMemo(()=>[...properties,...dbProperties.map(p=>({...p,type:p.property_type==='villa'?'Villa':p.property_type==='apartment'?'Apartment':p.property_type,area:Number(p.area_sqm)||0,beds:p.beds??0,isLive:true,image:p.image||'',price:Number(p.price)||0,currency:p.currency||'TRY',address:p.street_address||''}))].filter(p=>(!search||[p.city,p.country,p.address,p.title].join(' ').toLowerCase().includes(search.toLowerCase()))&&(kind==='All types'||p.type===kind)),[search,kind,dbProperties]);
function submit(){setSearch(query);document.getElementById('properties')?.scrollIntoView({behavior:'smooth'})}
function send(){if(!message.trim())return;const m=message.trim();setMessages(old=>[...old,{who:'user',text:m},{who:'bot',text:'Thanks! This is a preview assistant. Live AI recommendations will be available after connecting our property database and AI service.'}]);setMessage('')}
return <><header className="header"><a href="#top" className="brand"><span className="brand-symbol">A<span>✦</span></span><span>AEGEAN <strong>PRIME ELITE</strong><small>GLOBAL REAL ESTATE</small></span></a><nav className={mobile?'nav show':'nav'}><a href="#properties">{t[0]}</a><a href="#how">{t[1]}</a><a href="#packages">{t[2]}</a><a href="#about">{t[3]}</a></nav><div className="header-actions"><select
  aria-label="Select language"
  value={language}
  onChange={(e) => {
  const selectedLanguage = e.target.value;
  localStorage.setItem("aegean-language", selectedLanguage);
  setLanguage(selectedLanguage);
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
</select><a className="outline-btn" href="/ilan-ekle">List a Property <ArrowUpRight size={15}/></a><button className="menu" aria-label="Toggle menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></div></header>
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
</option></select><button onClick={submit}>
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
 "A WORLD OF OPPORTUNITY"}</span><span>01 / 04</span></div></div></section>
<section style={{
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
      AEGEAN PRIME ELITE • ÖZEL PROJE
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
      Doğanın kalbinde ayrıcalıklı bir yaşam.
      Modern mimari, konforlu konutlar ve
      gayrimenkul yatırım fırsatları.
    </p>

    <div style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 15,
      margin: "30px 0"
    }}>
      {["1+0 Stüdyo", "1+1 Daire", "2+1 Daire", "Villa"].map((item) => (
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
        Kooperatif Katılım Ücreti
      </p>

      <h3 style={{
        color: "#d9bd82",
        fontSize: "clamp(30px, 5vw, 44px)",
        margin: "10px 0"
      }}>
        650.000 TL
      </h3>

      <p style={{ color: "#e8e8e2", fontSize: 15 }}>
        Konut fiyatları 50.000 €'dan başlıyor
      </p>
    </div>

    <p style={{ color: "#d9bd82", fontSize: 16 }}>
      36 Aylık Ödeme Planı
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
      GOLDEN LIFE'I KEŞFET →
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
</span></div><div className="property-grid">{filtered.map(p=><article
  className="property"
  key={p.id}
  onClick={() => {
    if (p.isLive) window.location.href = `/ilan/${p.id}`;
  }}
  style={{ cursor: p.isLive ? "pointer" : "default" }}
><div className="property-photo" style={{backgroundImage:`url('${p.image}')`}}><span className="pill">{p.type}</span></div><div className="property-details"><div className="location"><MapPin size={13}/>{p.city}, {p.country}</div><h3>{p.title}</h3><div className="property-meta"><span><BedDouble size={16}/>{p.beds} beds</span><span><Ruler size={16}/>{p.area} m²</span></div><div className="property-footer"><strong>{new Intl.NumberFormat('tr-TR',{style:'currency',currency:('currency' in p && typeof p.currency==='string' ? p.currency : 'EUR'),maximumFractionDigits:0}).format(p.price)}</strong><span>Preview listing</span></div></div></article>)}</div>{filtered.length===0&&<div className="empty">No preview properties match this search. Live global listings will be available as partners join.</div>}</section>
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
</p></div></section></main><footer><div className="footer-brand">AEGEAN <strong>PRIME ELITE</strong><small>GLOBAL REAL ESTATE</small></div><span>
  © {new Date().getFullYear()} Aegean Prime Elite.{" "}
  {language === "tr" ? "Ön izleme sitesi." :
   language === "de" ? "Vorschau-Website." :
   language === "ru" ? "Предварительная версия сайта." :
   language === "ar" ? "نسخة تجريبية من الموقع." :
   "Preview website."}
</span><span>
  {language === "tr" ? "Küresel gayrimenkule yeni bir bakış." :
   language === "de" ? "Globale Immobilien neu gedacht." :
   language === "ru" ? "Новый взгляд на мировую недвижимость." :
   language === "ar" ? "رؤية جديدة للعقارات العالمية." :
   "Global real estate, reimagined."}
</span></footer>
<button className="chat-launch" aria-label="Open AI assistant" onClick={()=>setChat(!chat)}>{chat?<X size={24}/>:<MessageCircle size={24}/>}</button>{chat&&<div className="chat"><div className="chat-head"><div className="chat-avatar">✦</div><div><strong>Aegean AI</strong><small>Preview assistant · not connected to live listings</small></div><button aria-label="Close chat" onClick={()=>setChat(false)}><X size={18}/></button></div><div className="chat-messages">{messages.map((m,i)=><div className={'bubble '+m.who} key={i}>{m.text}</div>)}</div><div className="chat-form"><input aria-label="Chat message" placeholder="Ask about properties..." value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/><button aria-label="Send message" onClick={send}><Send size={18}/></button></div></div>}</>}
