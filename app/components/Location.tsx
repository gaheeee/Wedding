"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface LocationProps {
  venue: string;
  hall: string;
  address: string;
  lat?: number;
  lng?: number;
  tel?: string;
  trafficInfo?: {
    car?: string;
    bus?: string;
    parking?: string;
  };
}

declare global {
  interface Window {
    kakao?: any;
  }
}

export default function Location({
  venue,
  hall,
  address,
  lat = 36.1730596,
  lng = 127.7766861,
  tel,
  trafficInfo,
}: LocationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

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

  useEffect(() => {
    if (!kakaoAppKey) return;

    const checkAndInit = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          try {
            if (!mapElementRef.current) return;
            const container = mapElementRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);

            const overlayContent = `
              <div style="padding: 8px 12px; font-size: 12px; font-weight: 600; color: #222; text-align: center; background: #ffffff; border-radius: 6px; font-family: sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border: 1px solid #eee;">
                ${venue}
                <div style="font-size: 10px; font-weight: 400; color: #666; margin-top: 2px;">${hall}</div>
              </div>
            `;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: markerPosition,
              content: overlayContent,
              yAnchor: 2.1,
            });
            customOverlay.setMap(map);

            setMapLoaded(true);
          } catch (e) {
            console.error("Kakao Map init error:", e);
          }
        });
      }
    };

    if (window.kakao && window.kakao.maps) {
      checkAndInit();
    } else {
      const timer = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          checkAndInit();
          clearInterval(timer);
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [kakaoAppKey, lat, lng, venue, hall]);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      showToast("주소가 복사되었습니다.");
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const naverMapWebUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
  const kakaoNaviUrl = `https://map.kakao.com/link/to/${encodeURIComponent(venue)},${lat},${lng}`;
  const tMapUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodeURIComponent(venue)}`;

  return (
    <section className="section location" id="location" ref={sectionRef}>
      {/* 카카오 지도 API SDK 로드 */}
      {kakaoAppKey && (
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`}
          strategy="afterInteractive"
        />
      )}

      <div className="location__content fade-in">
        <div className="location__info">
          <h3 className="section__title fade-in">Venue</h3>
          <p className="location__venue">{venue}</p>
          <p className="location__address" style={{ fontWeight: 500 }}>{hall}</p>
          <p className="location__address">{address}</p>
          {tel && (
            <p className="location__address" style={{ marginTop: "4px" }}>
              TEL. {tel}
            </p>
          )}
        </div>

        {/* 카카오 지도 영역 */}
        <div className="location__map-container">
          <div
            ref={mapElementRef}
            className="location__map"
            style={{
              width: "100%",
              height: "190px",
              display: mapLoaded ? "block" : "none",
            }}
          />

          {/* AppKey 미입력 또는 로딩 전 폴백 UI */}
          {!mapLoaded && (
            <div className="location__map-fallback">
              <p style={{ fontWeight: 500, fontSize: "0.9375rem", marginBottom: "4px" }}>🗺️ {venue}</p>
              <p style={{ fontSize: "0.8125rem", color: "#666", marginBottom: "12px" }}>{address}</p>
              <button
                className="location__nav-btn location__nav-btn--kakao"
                onClick={() => window.open(kakaoNaviUrl, "_blank")}
              >
                카카오맵으로 오시는 길 ↗
              </button>
            </div>
          )}
        </div>

        {/* 길안내 앱 및 주소 복사 버튼 */}
        <div className="location__nav-buttons">
          <button
            className="location__nav-btn"
            onClick={() => window.open(naverMapWebUrl, "_blank")}
          >
            네이버지도
          </button>
          <button
            className="location__nav-btn"
            onClick={() => window.open(kakaoNaviUrl, "_blank")}
          >
            카카오내비
          </button>
          <button
            className="location__nav-btn"
            onClick={() => window.open(tMapUrl, "_blank")}
          >
            T map
          </button>
        </div>

        {trafficInfo && (
          <div style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--color-gray)", lineHeight: 1.8 }}>
            {trafficInfo.car && (
              <p>🚇 {trafficInfo.car}</p>
            )}
            {trafficInfo.bus && (
              <p style={{ marginTop: "4px" }}>🚌 {trafficInfo.bus}</p>
            )}
            {trafficInfo.parking && (
              <p style={{ marginTop: "4px" }}>🅿️ {trafficInfo.parking}</p>
            )}
          </div>
        )}
      </div>

      {/* 토스트 알림 */}
      <div className={`toast ${toastMessage ? "toast--visible" : ""}`}>
        {toastMessage}
      </div>
    </section>
  );
}
