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
  const lockedWidth = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lockHeight = () => {
      // 주소바가 보이는 상태(가장 작은 뷰포트)를 기준으로 px 고정
      const vh = window.visualViewport?.height ?? window.innerHeight;

      // 섹션 = 처음 보이는 영역에 정확히 맞춤 (문구가 잘리지 않음)
      section.style.height = `${vh}px`;

      // 이미지/오버레이는 여유분을 더해 크기를 고정.
      // 주소바가 사라져 화면이 커져도 이미지 크기는 그대로이고,
      // 아래쪽에 흰 여백이 드러나지 않습니다.
      section.style.setProperty("--cover-media-h", `${vh + 160}px`);

      lockedWidth.current = window.innerWidth;
    };

    lockHeight();

    // 주소바 노출/숨김(높이만 변함)은 무시하고,
    // 화면 회전처럼 "너비"가 바뀔 때만 다시 계산합니다.
    const handleResize = () => {
      if (window.innerWidth !== lockedWidth.current) lockHeight();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
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
