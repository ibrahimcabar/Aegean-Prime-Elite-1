"use client";

import { useState, useEffect } from "react";

export default function GoldenLifeSunum() {
  const [page, setPage] = useState(0);
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
  useEffect(() => {
  if (page !== 0) return;

  const timer = setInterval(() => {
    setSlide((prev) => (prev + 1) % images.length);
  }, 5000);

  return () => clearInterval(timer);
}, [page]);
  const sections = [
    "PROJE TANITIMI",
    "KONUT SEÇENEKLERİ",
    "FİYATLAR VE ÖDEME PLANLARI",
    "KOOPERATİF KATILIM ÜCRETİ",
    "AEGEAN PRIME ELITE SİSTEMİ",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#102820",
        color: "#e8c985",
        padding: "40px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ letterSpacing: 5 }}>
        AEGEAN PRIME ELITE
      </p>

      <h1 style={{ fontSize: "clamp(36px, 6vw, 90px)" }}>
        GOLDEN LIFE
      </h1>

      <h2>{sections[page]}</h2>
{page === 0 && (
  <div style={{
    position: "relative",
    width: "100%",
    maxWidth: 1200,
    marginTop: 30,
  }}>
    <img
      src={images[slide]}
      alt="Golden Life Projesi"
      style={{
        width: "100%",
        height: "clamp(250px, 55vh, 650px)",
        objectFit: "contain",
        borderRadius: 16,
      }}
    />

    <button
      onClick={() =>
        setSlide((slide - 1 + images.length) % images.length)
      }
      style={{
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        padding: 15,
        cursor: "pointer",
      }}
    >
      ❮
    </button>

    <button
      onClick={() =>
        setSlide((slide + 1) % images.length)
      }
      style={{
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        padding: 15,
        cursor: "pointer",
      }}
    >
      ❯
    </button>
  </div>
)}
      <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
        <button
          onClick={() =>
            setPage((page - 1 + sections.length) % sections.length)
          }
        >
          ❮ Önceki
        </button>

        <button
          onClick={() =>
            setPage((page + 1) % sections.length)
          }
        >
          Sonraki ❯
        </button>
      </div>

      <p style={{ marginTop: 30 }}>
        {page + 1} / {sections.length}
      </p>
    </main>
  );
}
