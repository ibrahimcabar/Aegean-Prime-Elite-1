
"use client";

import { useEffect, useRef, useState } from "react";
import GlobalGlobe from "./GlobalGlobe";
import {
  Globe2,
  Users,
  Handshake,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const translations = {
  tr: {
    title: "Sınırların Ötesinde.",
    subtitle: "Yerel Portföy. Global Fırsatlar.",
    description:
      "Gayrimenkul portföyünüzü uluslararası pazarlara taşıyın ve yeni fırsatlarla buluşun.",
    metrics: [
      "Uluslararası erişim",
      "Potansiyel müşteri talepleri",
      "Yeni yabancı alıcı bağlantıları",
      "Yeni pazarlarda görünürlük",
    ],
    growth: "Örnek büyüme senaryosu",
    footer: "Gayrimenkulün geleceğinde yerinizi alın.",
    button: "Üyelik Paketlerini Keşfedin",
    disclaimer:
      "Yüzdeler yalnızca örnek senaryolardır. Velora kullanıcı verileriyle doğrulanmamıştır ve sonuç garantisi değildir.",
  },
  en: {
    title: "Beyond Borders.",
    subtitle: "Local Portfolio. Global Opportunities.",
    description:
      "Take your real estate portfolio to international markets and discover new opportunities.",
    metrics: [
      "International reach",
      "Potential customer inquiries",
      "New international buyer connections",
      "Visibility in new markets",
    ],
    growth: "Illustrative growth scenario",
    footer: "Be part of the future of real estate.",
    button: "Explore Membership Plans",
    disclaimer:
      "Percentages are illustrative scenarios only. They are not validated by Velora user data and do not guarantee results.",
  },
  de: {
    title: "Über Grenzen hinaus.",
    subtitle: "Lokales Portfolio. Globale Chancen.",
    description:
      "Bringen Sie Ihr Immobilienportfolio auf internationale Märkte und entdecken Sie neue Möglichkeiten.",
    metrics: [
      "Internationale Reichweite",
      "Potenzielle Kundenanfragen",
      "Neue internationale Käuferkontakte",
      "Sichtbarkeit in neuen Märkten",
    ],
    growth: "Beispielhaftes Wachstumsszenario",
    footer: "Gestalten Sie die Zukunft der Immobilienwelt mit.",
    button: "Mitgliedschaftspakete entdecken",
    disclaimer:
      "Die Prozentwerte sind lediglich Beispielszenarien. Sie wurden nicht durch Velora-Nutzerdaten bestätigt und garantieren keine Ergebnisse.",
  },
  ru: {
    title: "За пределами границ.",
    subtitle: "Локальный портфель. Глобальные возможности.",
    description:
      "Представьте свою недвижимость на международных рынках и откройте новые возможности.",
    metrics: [
      "Международный охват",
      "Потенциальные запросы клиентов",
      "Новые международные покупатели",
      "Видимость на новых рынках",
    ],
    growth: "Пример сценария роста",
    footer: "Станьте частью будущего недвижимости.",
    button: "Посмотреть тарифы",
    disclaimer:
      "Проценты приведены только в качестве примера, не подтверждены данными Velora и не гарантируют результаты.",
  },
  ar: {
    title: "ما وراء الحدود.",
    subtitle: "محفظة محلية. فرص عالمية.",
    description:
      "انقل محفظتك العقارية إلى الأسواق الدولية واكتشف فرصاً جديدة.",
    metrics: [
      "الوصول الدولي",
      "استفسارات العملاء المحتملين",
      "التواصل مع مشترين دوليين جدد",
      "الظهور في أسواق جديدة",
    ],
    growth: "سيناريو نمو توضيحي",
    footer: "كن جزءاً من مستقبل العقارات.",
    button: "اكتشف باقات العضوية",
    disclaimer:
      "النسب المعروضة أمثلة توضيحية فقط، ولم يتم التحقق منها ببيانات مستخدمي Velora ولا تضمن النتائج.",
  },
};

const metrics = [
  { min: 20, max: 40, Icon: Globe2 },
  { min: 10, max: 25, Icon: Users },
  { min: 15, max: 30, Icon: Handshake },
  { min: 30, max: 50, Icon: TrendingUp },
];

export default function GrowthPotential({
  language = "en",
}: {
  language?: string;
}) {
  const t =
    translations[language as keyof typeof translations] ||
    translations.en;

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      setProgress(1);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const animate = (time: number) => {
      if (start === null) start = time;

      const p = Math.min((time - start) / 1800, 1);
      setProgress(1 - Math.pow(1 - p, 3));

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [visible]);

  const formatPercent = (value: number) =>
    language === "tr" ? `%${value}` : `${value}%`;

  return (
    <section
      ref={sectionRef}
      className="vgp-section"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="vgp-inner">
        <div className="vgp-brand">
          VELORA PRIME ELITE
        </div>

        <div className="vgp-heading">
          <h2>{t.title}</h2>
          <h3>{t.subtitle}</h3>
          <p>{t.description}</p>
        </div>

        <GlobalGlobe />

        <div className="vgp-scenario">{t.growth}</div>

        <div className="vgp-cards">
          {metrics.map(({ min, max, Icon }, index) => (
            <div className="vgp-card" key={index}>
              <Icon size={29} strokeWidth={1.3} />

              <div className="vgp-number" dir="ltr">
                {formatPercent(Math.round(min * progress))}
                {" – "}
                {formatPercent(Math.round(max * progress))}
              </div>

              <div className="vgp-label">
                {t.metrics[index]}
              </div>

              <div className="vgp-track">
                <div
                  className="vgp-fill"
                  style={{
                    width: `${max * progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="vgp-disclaimer">
          {t.disclaimer}
        </p>

        <div className="vgp-footer">
          <h3>{t.footer}</h3>

          <a href="#packages" className="vgp-button">
            {t.button}
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .vgp-section {
          position: relative;
          overflow: hidden;
          padding: 90px 6%;
          color: #f7f2e8;
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(185, 154, 98, 0.12),
              transparent 55%
            ),
            #101210;
        }

        .vgp-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        .vgp-brand {
          text-align: center;
          color: #c9aa72;
          font-size: 11px;
          letter-spacing: 5px;
          font-weight: 600;
        }

        .vgp-heading {
          text-align: center;
          margin-top: 25px;
        }

        .vgp-heading h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(38px, 6vw, 76px);
          font-weight: 500;
          line-height: 1.12;
          margin: 0 0 18px;
        }

        .vgp-heading h3 {
          color: #c9aa72;
          font-size: clamp(17px, 2.5vw, 25px);
          font-weight: 400;
          margin: 0 0 18px;
        }

        .vgp-heading p {
          max-width: 650px;
          margin: auto;
          color: #bdbbb4;
          font-size: 15px;
          line-height: 1.8;
        }

        .vgp-globe-area {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 290px;
        }

        .vgp-globe {
          position: relative;
          width: 230px;
          height: 230px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9aa72;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(185, 154, 98, 0.15),
            transparent 70%
          );
        }

        .vgp-globe-icon {
          filter: drop-shadow(
            0 0 15px rgba(201, 170, 114, 0.4)
          );
          animation: vgp-float 5s ease-in-out infinite;
        }

        .vgp-orbit {
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(201, 170, 114, 0.4);
          border-radius: 50%;
        }

        .vgp-orbit-one {
          transform: rotate(-35deg) scaleY(0.45);
        }

        .vgp-orbit-two {
          transform: rotate(35deg) scaleY(0.45);
        }

        .vgp-orbit-three {
          border-style: dashed;
          animation: vgp-spin 30s linear infinite;
        }

        .vgp-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          background: #e8cc92;
          border-radius: 50%;
          box-shadow: 0 0 18px #d9b777;
          animation: vgp-pulse 2.5s infinite;
        }

        .vgp-dot-one {
          top: 30px;
          left: 55px;
        }

        .vgp-dot-two {
          right: 20px;
          top: 110px;
          animation-delay: 0.8s;
        }

        .vgp-dot-three {
          bottom: 25px;
          left: 75px;
          animation-delay: 1.6s;
        }

        .vgp-scenario {
          color: #c9aa72;
          text-align: center;
          font-size: 12px;
          letter-spacing: 2px;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .vgp-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .vgp-card {
          min-width: 0;
          padding: 30px 18px;
          border: 1px solid rgba(185, 154, 98, 0.25);
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(185, 154, 98, 0.09),
            rgba(255, 255, 255, 0.015)
          );
          text-align: center;
          color: #c9aa72;
          transition:
            transform 0.3s,
            border-color 0.3s;
        }

        .vgp-card:hover {
          transform: translateY(-6px);
          border-color: #b99a62;
        }

        .vgp-number {
          font-size: clamp(23px, 2.6vw, 35px);
          font-weight: 500;
          margin: 18px 0 10px;
          color: #e4c68e;
          font-variant-numeric: tabular-nums;
        }

        .vgp-label {
          color: #e6e1d8;
          font-size: 13px;
          line-height: 1.6;
          min-height: 45px;
        }

        .vgp-track {
          height: 5px;
          margin-top: 22px;
          background: rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          overflow: hidden;
        }

        .vgp-fill {
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            #806030,
            #e4c68e
          );
          box-shadow: 0 0 12px rgba(185, 154, 98, 0.5);
        }

        .vgp-disclaimer {
          text-align: center;
          font-size: 12px;
          color: #aaa79f;
          max-width: 780px;
          margin: 24px auto 0;
          line-height: 1.7;
        }

        .vgp-footer {
          text-align: center;
          margin-top: 45px;
          padding-top: 35px;
          border-top: 1px solid rgba(185, 154, 98, 0.2);
        }

        .vgp-footer h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 400;
          font-size: clamp(23px, 3vw, 35px);
          margin: 0 0 25px;
        }

        .vgp-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 28px;
          border-radius: 6px;
          background: linear-gradient(
            135deg,
            #e0c38c,
            #b99a62
          );
          color: #151510;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.3s;
        }

        .vgp-button:hover {
          transform: translateY(-3px);
        }

        @keyframes vgp-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes vgp-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes vgp-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          .vgp-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .vgp-section {
            padding: 55px 5%;
          }

          .vgp-cards {
            gap: 10px;
          }

          .vgp-card {
            padding: 22px 10px;
          }

          .vgp-number {
            font-size: 21px;
          }

          .vgp-label {
            font-size: 12px;
            min-height: 55px;
          }

          .vgp-brand {
            letter-spacing: 3px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vgp-globe-icon,
          .vgp-orbit-three,
          .vgp-dot {
            animation: none;
          }

          .vgp-card,
          .vgp-button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
