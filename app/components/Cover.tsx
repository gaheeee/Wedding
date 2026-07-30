"use client";

import { useEffect, useRef } from "react";

interface CoverProps {
  groomName: string;
  brideName: string;
  groomNameKr: string;
  brideNameKr: string;
  dateString: string;
  coverImageSrc: string;
}

export default function Cover({
  groomName,
  brideName,
  groomNameKr,
  brideNameKr,
  dateString,
  coverImageSrc,
}: CoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <section className="cover" id="cover">
      <div className="cover__image-wrapper">
        <img src={coverImageSrc} alt="웨딩 메인 사진" />
      </div>
      <div className="cover__overlay" />
      <div
        className="cover__content"
        ref={contentRef}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          transitionDelay: "0.5s",
        }}
      >
        <p className="cover__names">
          {groomName} &amp; {brideName}
        </p>
        <p className="cover__names-kr">
          {groomNameKr} · {brideNameKr}
        </p>
        <p className="cover__date">{dateString}</p>
        <div className="cover__scroll-indicator">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 7l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
