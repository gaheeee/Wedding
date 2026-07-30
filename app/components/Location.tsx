"use client";

import { useEffect, useRef } from "react";

interface LocationProps {
  venue: string;
  hall: string;
  address: string;
  tel?: string;
  trafficInfo?: {
    subway?: string;
    bus?: string;
    parking?: string;
  };
}

export default function Location({ venue, hall, address, tel, trafficInfo }: LocationProps) {
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
      { threshold: 0.2 }
    );

    const fadeElements = sectionRef.current?.querySelectorAll(".fade-in");
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="location" ref={sectionRef}>
      <h2 className="section__title fade-in">Location</h2>

      <div className="location__info fade-in">
        <p className="location__venue">{venue}</p>
        <p className="location__address" style={{ fontWeight: 500 }}>{hall}</p>
        <p className="location__address">{address}</p>
        {tel && (
          <p className="location__address" style={{ marginTop: "4px" }}>
            TEL. {tel}
          </p>
        )}
      </div>

      {/* Map placeholder — will be replaced with Kakao Map API */}
      <div className="location__map-placeholder fade-in">
        <span>🗺️ 카카오 지도 연동 예정</span>
      </div>

      <div className="location__nav-buttons fade-in">
        <button className="location__nav-btn" onClick={() => window.open(`https://map.kakao.com/link/to/${venue},0,0`, "_blank")}>
          카카오내비
        </button>
        <button className="location__nav-btn" onClick={() => window.open(`https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${venue}`, "_blank")}>
          T map
        </button>
        <button className="location__nav-btn" onClick={() => window.open(`https://map.naver.com/search/${encodeURIComponent(address)}`, "_blank")}>
          네이버지도
        </button>
      </div>

      {trafficInfo && (
        <div className="fade-in" style={{ marginTop: "2rem", fontSize: "0.8125rem", color: "var(--color-gray)", lineHeight: 1.8 }}>
          {trafficInfo.subway && (
            <p>🚇 {trafficInfo.subway}</p>
          )}
          {trafficInfo.bus && (
            <p style={{ marginTop: "4px" }}>🚌 {trafficInfo.bus}</p>
          )}
          {trafficInfo.parking && (
            <p style={{ marginTop: "4px" }}>🅿️ {trafficInfo.parking}</p>
          )}
        </div>
      )}
    </section>
  );
}
