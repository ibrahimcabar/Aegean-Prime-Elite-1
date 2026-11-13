
"use client";

import { useEffect, useState, type FormEvent, type CSSProperties } from "react";

const plans = {
  Starter: { price: 29, count: 5 },
  Professional: { price: 59, count: 10 },
  Business: { price: 99, count: 20 },
  Enterprise: { price: 199, count: 50 }
} as const;

type Plan = keyof typeof plans;
type Language = "tr" | "en" | "de" | "ru" | "ar";

const translations = {
  tr: {
    title: "İş Ortağı Başvurusu",
    subtitle: "Velora Prime Elite uluslararası gayrimenkul ağına katılın.",
    selected: "Seçtiğiniz Üyelik Paketi",
    month: "ay",
    listings: "aktif ilan",
    name: "Ad Soyad",
    agency: "Emlak Ofisi / Şirket Adı",
    email: "E-posta Adresi",
    phone: "Telefon Numarası",
    country: "Ülke",
    city: "Şehir",
    message: "Eklemek İstedikleriniz",
    consent: "Başvurumun değerlendirilmesi ve benimle iletişime geçilmesi amacıyla bilgilerimin işlenmesine onay veriyorum.",
    submit: "Başvurumu Gönder",
    sending: "Gönderiliyor...",
    success: "Başvurunuz başarıyla alındı! Ekibimiz sizinle iletişime geçecek.",
    error: "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
    notice: "Şu anda ödeme alınmamaktadır. Başvurunuz incelendikten sonra sizinle iletişime geçilecektir.",
    back: "Ana Sayfaya Dön"
  },
  en: {
    title: "Partner Application",
    subtitle: "Join the Velora Prime Elite global real estate network.",
    selected: "Selected Membership Plan",
    month: "month",
    listings: "active listings",
    name: "Full Name",
    agency: "Agency / Company Name",
    email: "Email Address",
    phone: "Phone Number",
    country: "Country",
    city: "City",
    message: "Additional Information",
    consent: "I consent to the processing of my information to review my application and contact me.",
    submit: "Submit Application",
    sending: "Submitting...",
    success: "Your application has been received! Our team will contact you.",
    error: "Application could not be submitted. Please try again.",
    notice: "No payment is currently collected. Our team will contact you after reviewing your application.",
    back: "Back to Homepage"
  },
  de: {
    title: "Partnerbewerbung",
    subtitle: "Werden Sie Teil des internationalen Immobiliennetzwerks von Velora Prime Elite.",
    selected: "Gewähltes Mitgliedschaftspaket",
    month: "Monat",
    listings: "aktive Anzeigen",
    name: "Vollständiger Name",
    agency: "Immobilienbüro / Firmenname",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    country: "Land",
    city: "Stadt",
    message: "Weitere Informationen",
    consent: "Ich stimme der Verarbeitung meiner Daten zur Prüfung meiner Bewerbung und zur Kontaktaufnahme zu.",
    submit: "Bewerbung absenden",
    sending: "Wird gesendet...",
    success: "Ihre Bewerbung wurde erfolgreich übermittelt! Unser Team wird Sie kontaktieren.",
    error: "Die Bewerbung konnte nicht gesendet werden.",
    notice: "Derzeit werden keine Zahlungen erhoben. Wir kontaktieren Sie nach Prüfung Ihrer Bewerbung.",
    back: "Zur Startseite"
  },
  ru: {
    title: "Заявка партнёра",
    subtitle: "Присоединяйтесь к международной сети Velora Prime Elite.",
    selected: "Выбранный тариф",
    month: "месяц",
    listings: "активных объявлений",
    name: "Полное имя",
    agency: "Агентство / Компания",
    email: "Электронная почта",
    phone: "Номер телефона",
    country: "Страна",
    city: "Город",
    message: "Дополнительная информация",
    consent: "Я согласен на обработку моих данных для рассмотрения заявки и связи со мной.",
    submit: "Отправить заявку",
    sending: "Отправка...",
    success: "Ваша заявка успешно получена! Наша команда свяжется с вами.",
    error: "Не удалось отправить заявку. Попробуйте снова.",
    notice: "Оплата пока не требуется. Мы свяжемся с вами после рассмотрения заявки.",
    back: "На главную"
  },
  ar: {
    title: "طلب شراكة",
    subtitle: "انضم إلى شبكة Velora Prime Elite العقارية العالمية.",
    selected: "باقة العضوية المختارة",
    month: "شهر",
    listings: "إعلان نشط",
    name: "الاسم الكامل",
    agency: "اسم الشركة العقارية",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    country: "الدولة",
    city: "المدينة",
    message: "معلومات إضافية",
    consent: "أوافق على معالجة بياناتي لمراجعة طلبي والتواصل معي.",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    success: "تم استلام طلبك بنجاح! سيتواصل معك فريقنا.",
    error: "تعذر إرسال الطلب. يرجى المحاولة مجدداً.",
    notice: "لا يتم تحصيل أي رسوم حالياً. سنتواصل معك بعد مراجعة الطلب.",
    back: "العودة للرئيسية"
  }
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "15px",
  border: "1px solid #dcd5c7",
  borderRadius: 9,
  fontSize: 16,
  background: "#ffffff",
  color: "#20201d",
  boxSizing: "border-box",
  outlineColor: "#b99a60"
};

export default function PartnerApplyPage() {
  const [language, setLanguage] = useState<Language>("en");

  const [form, setForm] = useState({
    package_name: "Starter" as Plan,
    full_name: "",
    agency_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    message: "",
    privacy_consent: false
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedPlan = params.get("plan");
    const selectedLanguage = params.get("lang");

    if (
      selectedPlan &&
      Object.prototype.hasOwnProperty.call(plans, selectedPlan)
    ) {
      setForm(prev => ({
        ...prev,
        package_name: selectedPlan as Plan
      }));
    }

    if (
      selectedLanguage &&
      Object.prototype.hasOwnProperty.call(translations, selectedLanguage)
    ) {
      setLanguage(selectedLanguage as Language);
    }
  }, []);

  const t = translations[language];
  const selected = plans[form.package_name];

  const updateField = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function submitApplication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading || result === "success") return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/partner-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Application failed");
      }

      setResult("success");
    } catch (error) {
      console.error("Partner application:", error);
      setResult("error");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "full_name", label: t.name, required: true, type: "text" },
    { name: "agency_name", label: t.agency, required: true, type: "text" },
    { name: "email", label: t.email, required: true, type: "email" },
    { name: "phone", label: t.phone, required: true, type: "tel" },
    { name: "country", label: t.country, required: false, type: "text" },
    { name: "city", label: t.city, required: false, type: "text" }
  ] as const;

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#f7f5f0",
        padding: "35px 16px 80px",
        color: "#20201d"
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto"
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "38px 20px",
            background: "#18382c",
            borderRadius: "16px 16px 0 0"
          }}
        >
          <img
            src="/velora-logo.png"
            alt="Velora Prime Elite"
            style={{
              maxWidth: 230,
              width: "85%",
              height: "auto",
              marginBottom: 22
            }}
          />

          <h1
            style={{
              color: "#d6bd88",
              fontSize: "clamp(28px, 5vw, 42px)",
              margin: "10px 0"
            }}
          >
            {t.title}
          </h1>

          <p style={{ color: "#eeeeea", lineHeight: 1.7 }}>
            {t.subtitle}
          </p>

          <select
            aria-label="Language"
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            style={{
              ...inputStyle,
              maxWidth: 190,
              marginTop: 15
            }}
          >
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e4dfd4",
            borderTop: 0,
            borderRadius: "0 0 16px 16px",
            padding: "clamp(20px, 5vw, 45px)"
          }}
        >
          <div
            style={{
              background: "#f8f6f0",
              border: "1px solid #b99a60",
              borderRadius: 12,
              padding: 24,
              marginBottom: 30
            }}
          >
            <div
              style={{
                color: "#7d663e",
                fontWeight: 700,
                marginBottom: 12
              }}
            >
              {t.selected}
            </div>

            <select
              aria-label={t.selected}
              value={form.package_name}
              disabled={result === "success"}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  package_name: e.target.value as Plan
                }))
              }
              style={inputStyle}
            >
              {Object.keys(plans).map(plan => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>

            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                marginTop: 20,
                color: "#18382c"
              }}
            >
              €{selected.price}
              <span
                style={{
                  fontSize: 16,
                  color: "#777",
                  fontWeight: 400
                }}
              >
                {" / "}{t.month}
              </span>
            </div>

            <p style={{ color: "#777", marginBottom: 0 }}>
              {selected.count} {t.listings}
            </p>
          </div>

          {result === "success" ? (
            <div
              role="status"
              style={{
                padding: 25,
                border: "1px solid #a0c0a5",
                borderRadius: 12,
                background: "#edf5ed",
                color: "#18382c",
                fontWeight: 700,
                lineHeight: 1.8
              }}
            >
              ✓ {t.success}
            </div>
          ) : (
            <form onSubmit={submitApplication}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: 20
                }}
              >
                {fields.map(field => (
                  <label
                    key={field.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      fontWeight: 600,
                      fontSize: 15
                    }}
                  >
                    {field.label}
                    {field.required ? " *" : ""}

                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.name]}
                      onChange={e =>
                        updateField(field.name, e.target.value)
                      }
                      maxLength={
                        field.name === "email" ? 254 :
                        field.name === "agency_name" ? 150 :
                        field.name === "phone" ? 25 :
                        field.name === "full_name" ? 120 : 100
                      }
                      style={inputStyle}
                    />
                  </label>
                ))}
              </div>

              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontWeight: 600,
                  marginTop: 25
                }}
              >
                {t.message}

                <textarea
                  value={form.message}
                  onChange={e =>
                    updateField("message", e.target.value)
                  }
                  maxLength={2000}
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical"
                  }}
                />
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginTop: 25,
                  lineHeight: 1.7,
                  fontSize: 14,
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  required
                  checked={form.privacy_consent}
                  onChange={e =>
                    setForm(prev => ({
                      ...prev,
                      privacy_consent: e.target.checked
                    }))
                  }
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 3,
                    accentColor: "#18382c",
                    flexShrink: 0
                  }}
                />

                <span>{t.consent}</span>
              </label>

              <p
                style={{
                  fontSize: 14,
                  color: "#777",
                  lineHeight: 1.7,
                  marginTop: 20
                }}
              >
                {t.notice}
              </p>

              {result === "error" && (
                <p
                  role="alert"
                  style={{
                    color: "#ad3333",
                    fontWeight: 700,
                    marginTop: 20
                  }}
                >
                  {t.error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "19px 25px",
                  marginTop: 25,
                  background: "#b99a60",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? t.sending : t.submit}
              </button>
            </form>
          )}

          <a
            href={`/${language}`}
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 30,
              color: "#18382c",
              textDecoration: "underline",
              fontSize: 15
            }}
          >
            ← {t.back}
          </a>
        </div>
      </div>
    </main>
  );
}
