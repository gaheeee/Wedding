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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 카카오톡 인앱 브라우저에서 스크롤 시 vh가 변하는 문제 방지:
    // 최초 로드 시 높이를 px로 고정
    if (sectionRef.current) {
      sectionRef.current.style.height = `${window.innerHeight}px`;
    }

    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <section className="cover" id="cover" ref={sectionRef}>
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
