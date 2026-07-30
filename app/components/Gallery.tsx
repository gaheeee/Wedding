"use client";

import { useState, useEffect, useRef } from "react";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = sectionRef.current?.querySelectorAll(".fade-in");
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  return (
    <>
      <section className="section gallery" id="gallery" ref={sectionRef}>
        <h2 className="section__title fade-in" style={{ padding: "0 1.5rem" }}>
          Gallery
        </h2>
        <div className="gallery__grid fade-in">
          {images.map((src, i) => (
            <div className="gallery__item" key={i} onClick={() => openLightbox(i)}>
              <img src={src} alt={`웨딩 사진 ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox ${lightboxOpen ? "lightbox--open" : ""}`}
        onClick={closeLightbox}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="lightbox__close" onClick={closeLightbox} aria-label="닫기">
          ✕
        </button>
        {lightboxOpen && (
          <img
            className="lightbox__image"
            src={images[lightboxIndex]}
            alt={`웨딩 사진 ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </>
  );
}
