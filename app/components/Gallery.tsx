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

  const maxDisplay = 6;
  const visibleImages = images.slice(0, maxDisplay);
  const remainingCount = images.length - (maxDisplay - 1);

  return (
    <>
      <section className="section gallery" id="gallery" ref={sectionRef} style={{ padding: "2rem" }}>
        {/* <h2 className="section__title fade-in" style={{ padding: "0 1.5rem" }}>
          Gallery
        </h2> */}
        <div className="gallery__grid fade-in">
          {visibleImages.map((src, i) => {
            const isLast = i === maxDisplay - 1 && images.length >= maxDisplay;
            return (
              <div className="gallery__item" key={i} onClick={() => openLightbox(i)}>
                <img src={src} alt={`웨딩 사진 ${i + 1}`} loading="lazy" />
                {isLast && (
                  <div className="gallery__more-overlay">
                    + More
                  </div>
                )}
              </div>
            );
          })}
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
          <>
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              aria-label="이전 사진"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <img
              className="lightbox__image"
              src={images[lightboxIndex]}
              alt={`웨딩 사진 ${lightboxIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="lightbox__counter" onClick={(e) => e.stopPropagation()}>
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="다음 사진"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </>
  );
}
