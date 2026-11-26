
"use client";

import {
  Handshake,
  House,
  Building2,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Network,
} from "lucide-react";

const translations = {
  tr: {
    title: "Gayrimenkulde sınırları kaldırın.",
    headline: "Dünyaya açılın.",
    description:
      "Uluslararası gayrimenkul platformunuz: mülkleri tanıtın, alıcılarla buluşun, yeni yatırım fırsatları keşfedin.",
    cards: [
      ["Emlakçılar", "İlanlarınızı global alıcılara ulaştırın."],
      ["Mülk Sahipleri", "Gayrimenkulünüzü dünyaya tanıtın."],
      ["Müteahhitler & Geliştiriciler", "Projelerinizi uluslararası pazara taşıyın."],
      ["Yatırımcılar", "Global fırsatları keşfedin, bağlantılar kurun."],
    ],
    benefits: [
      "Dünya çapında görünürlük",
      "Profesyonel tanıtım",
      "Uluslararası bağlantılar",
    ],
  },
  en: {
    title: "Break boundaries in real estate.",
    headline: "Open up to the world.",
    description:
      "Your international real estate platform: showcase properties, connect with buyers and discover new investment opportunities.",
    cards: [
      ["Real Estate Agents", "Reach global buyers with your listings."],
      ["Property Owners", "Showcase your property to the world."],
      ["Developers & Builders", "Bring your projects to international markets."],
      ["Investors", "Discover global opportunities and build connections."],
    ],
    benefits: [
      "Worldwide visibility",
      "Professional promotion",
      "International connections",
    ],
  },
  de: {
    title: "Überwinden Sie Grenzen im Immobilienmarkt.",
    headline: "Öffnen Sie sich der Welt.",
    description:
      "Ihre internationale Immobilienplattform: Präsentieren Sie Immobilien, erreichen Sie Käufer und entdecken Sie neue Investitionsmöglichkeiten.",
    cards: [
      ["Immobilienmakler", "Erreichen Sie Käufer weltweit."],
      ["Immobilieneigentümer", "Präsentieren Sie Ihre Immobilie der Welt."],
      ["Bauträger & Projektentwickler", "Bringen Sie Ihre Projekte auf internationale Märkte."],
      ["Investoren", "Entdecken Sie globale Chancen und knüpfen Sie Kontakte."],
    ],
    benefits: [
      "Weltweite Sichtbarkeit",
      "Professionelle Vermarktung",
      "Internationale Kontakte",
    ],
  },
  ru: {
    title: "Недвижимость без границ.",
    headline: "Откройте для себя мир.",
    description:
      "Ваша международная платформа недвижимости: представляйте объекты, находите покупателей и открывайте новые инвестиционные возможности.",
    cards: [
      ["Агенты недвижимости", "Предлагайте объекты покупателям по всему миру."],
      ["Владельцы недвижимости", "Представьте свою недвижимость миру."],
      ["Застройщики", "Выведите свои проекты на международный рынок."],
      ["Инвесторы", "Откройте глобальные возможности и новые связи."],
    ],
    benefits: [
      "Глобальная видимость",
      "Профессиональное продвижение",
      "Международные связи",
    ],
  },
  ar: {
    title: "تجاوز الحدود في عالم العقارات.",
    headline: "انفتح على العالم.",
    description:
      "منصتك العقارية الدولية: اعرض عقاراتك وتواصل مع المشترين واكتشف فرصاً استثمارية جديدة.",
    cards: [
      ["وكلاء العقارات", "اعرض عقاراتك للمشترين حول العالم."],
      ["مالكو العقارات", "قدم عقارك للعالم."],
      ["المطورون والمقاولون", "انقل مشاريعك إلى الأسواق الدولية."],
      ["المستثمرون", "اكتشف الفرص العالمية وابن علاقات جديدة."],
    ],
    benefits: [
      "ظهور عالمي",
      "تسويق احترافي",
      "علاقات دولية",
    ],
  },
};

const cardIcons = [
  Handshake,
  House,
  Building2,
  TrendingUp,
];

const benefitIcons = [
  Globe2,
  ShieldCheck,
  Network,
];

export default function PlatformIntro({
  language = "en",
}: {
  language?: string;
}) {
  const t =
    translations[language as keyof typeof translations] ||
    translations.en;

  return (
    <section
      className="vpe-intro"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="vpe-intro-glow" />

      <div className="vpe-intro-inner">
        <div className="vpe-intro-brand">
          VELORA PRIME ELITE
        </div>

        <div className="vpe-intro-motto">
          The World Is Your Address
        </div>

        <h2>
          {t.title}
          <span>{t.headline}</span>
        </h2>

        <p className="vpe-intro-description">
          {t.description}
        </p>

        <div className="vpe-intro-grid">
          {t.cards.map(([title, description], index) => {
            const Icon = cardIcons[index];

            return (
              <article
                className="vpe-intro-card"
                key={index}
              >
                <Icon size={38} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>

        <div className="vpe-intro-benefits">
          {t.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];

            return (
              <div key={index}>
                <Icon size={21} strokeWidth={1.5} />
                <span>{benefit}</span>
              </div>
            );
          })}
        </div>

        <div className="vpe-intro-domain">
          VELORAPRIMEELITE.COM
        </div>
      </div>

      <style jsx>{`
        .vpe-intro {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          padding: 65px 5%;
          color: #ffffff;
          background:
            radial-gradient(
              ellipse at top,
              #183b63 0%,
              transparent 65%
            ),
            linear-gradient(
              135deg,
              #071324,
              #102b49,
              #061221
            );
        }

        .vpe-intro-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          top: -350px;
          left: calc(50% - 250px);
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.2);
          filter: blur(80px);
          pointer-events: none;
          animation: vpeGlow 7s ease-in-out infinite;
          z-index: -1;
        }

        .vpe-intro-inner {
          position: relative;
          max-width: 1250px;
          margin: 0 auto;
          text-align: center;
        }

        .vpe-intro-brand {
          color: #d5b67c;
          font-size: 17px;
          letter-spacing: 5px;
          font-weight: 600;
        }

        .vpe-intro-motto {
          margin-top: 10px;
          font-size: 14px;
          font-style: italic;
          color: #c6cfdd;
        }

        h2 {
          margin: 26px 0 18px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(26px, 4vw, 46px);
          font-weight: 500;
          line-height: 1.2;
        }

        h2 span {
          display: block;
          color: #d5b67c;
          font-size: 1.2em;
          margin-top: 8px;
        }

        .vpe-intro-description {
          max-width: 760px;
          margin: 0 auto 36px;
          color: #d5dce6;
          font-size: 16px;
          line-height: 1.8;
        }

        .vpe-intro-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .vpe-intro-card {
          padding: 30px 18px;
          border: 1px solid rgba(213, 182, 124, 0.8);
          border-radius: 15px;
          background: linear-gradient(
  145deg,
  rgba(255, 255, 255, 0.09),
  rgba(7, 19, 36, 0.65)
);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
box-shadow:
  inset 0 1px 0 rgba(213, 182, 124, 0.15),
  0 8px 30px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s, background 0.3s,
            box-shadow 0.3s;
          color: #d5b67c;
        }

        .vpe-intro-card:hover {
          transform: translateY(-6px);
          background: rgba(213, 182, 124, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .vpe-intro-card h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 18px 0 10px;
          color: #d5b67c;
        }

        .vpe-intro-card p {
          color: #d5dce6;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        .vpe-intro-benefits {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 28px;
          margin-top: 32px;
          padding-top: 25px;
          border-top: 1px solid rgba(213, 182, 124, 0.3);
        }

        .vpe-intro-benefits div {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: #d5b67c;
        }

        .vpe-intro-domain {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 30px;
          border: 1px solid #d5b67c;
          border-radius: 50px;
          color: #d5b67c;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
        }

        @keyframes vpeGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          .vpe-intro-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .vpe-intro {
            padding: 40px 16px;
          }

          .vpe-intro-grid {
            gap: 10px;
          }

          .vpe-intro-card {
            padding: 22px 12px;
          }

          .vpe-intro-card h3 {
            font-size: 15px;
          }

          .vpe-intro-card p {
            font-size: 12px;
          }

          .vpe-intro-brand {
            font-size: 13px;
            letter-spacing: 3px;
          }

          .vpe-intro-benefits {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .vpe-intro-domain {
            font-size: 11px;
            padding: 12px 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vpe-intro-glow {
            animation: none;
          }

          .vpe-intro-card {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
