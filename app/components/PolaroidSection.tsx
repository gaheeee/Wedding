"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import polaroidBg from "@/public/images/polaroid.png";

interface PolaroidSectionProps {
  images?: string[];
}

const DEFAULT_POLAROID_IMAGES = [
  "/images/gallery-10.jpg",
  "/images/gallery-24.jpg",
  "/images/gallery-11.jpg",
  "/images/gallery-25.jpg",
];

export default function PolaroidSection({
  images = DEFAULT_POLAROID_IMAGES,
}: PolaroidSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section className="section polaroid-section" ref={sectionRef}>
      <div className="polaroid-container fade-in">
        {images.slice(0, 4).map((src, i) => (
          <div className="polaroid-item" key={i}>
            <div className="polaroid-card">
              <Image
                src={polaroidBg}
                alt="폴라로이드 프레임"
                className="polaroid-card__bg"
                priority
              />
              <div className="polaroid-card__photo-container">
                <img
                  src={src}
                  alt={`폴라로이드 샘플 사진 ${i + 1}`}
                  className="polaroid-card__photo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
