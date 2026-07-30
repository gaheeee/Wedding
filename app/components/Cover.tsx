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
    // 각 모바일 디바이스의 실제 뷰포트 높이를 감지하여 px로 고정.
    // visualViewport API는 주소바/툴바를 제외한 실제 보이는 영역을 반환하므로
    // 카카오톡 인앱, Safari, Chrome 등 모든 브라우저에서 정확하게 동작합니다.
    const setHeight = () => {
      if (!sectionRef.current) return;
      const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      sectionRef.current.style.height = `${vh}px`;
    };

    setHeight();

    // visualViewport resize 이벤트: 주소바 표시/숨김 시에도 높이 재계산
    // (최초 로드 후에는 변하지 않도록 한 번만 적용하고 싶다면 리스너 제거 가능)
    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener("resize", setHeight);
    }

    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener("resize", setHeight);
      }
    };
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
