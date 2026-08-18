"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { openKakaoNavi, openTMap, openNaverMap } from "@/utils/navigation";

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

  // Kakao JS SDK 초기화
  useEffect(() => {
    if (!kakaoAppKey) return;

    const initKakaoSDK = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(kakaoAppKey);
        } catch (e) {
          console.error("Kakao SDK init error:", e);
        }
      }
    };

    if (window.Kakao) {
      initKakaoSDK();
    } else {
      const timer = setInterval(() => {
        if (window.Kakao) {
          initKakaoSDK();
          clearInterval(timer);
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [kakaoAppKey]);

  // Kakao Map 렌더링
  useEffect(() => {
    if (!kakaoAppKey) return;

    const checkAndInit = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          try {
            if (!mapElementRef.current) return;
            const container = mapElementRef.current;
            const center = new window.kakao.maps.LatLng(lat, lng);
            // 핀 + 오버레이가 시각적으로 가운데 오도록 지도 중심을 약간 남쪽으로
            const mapCenter = new window.kakao.maps.LatLng(lat + 0.0003, lng);
            const options = {
              center: mapCenter,
              level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            const marker = new window.kakao.maps.Marker({
              position: center,
            });
            marker.setMap(map);

            const overlayContent = `
              <div style="padding: 8px 12px; font-size: 12px; font-weight: 600; color: #222; text-align: center; background: #ffffff; border-radius: 6px; font-family: sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border: 1px solid #eee;">
                ${venue}
                <div style="font-size: 10px; font-weight: 400; color: #666; margin-top: 2px;">${hall}</div>
              </div>
            `;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: center,
              content: overlayContent,
              yAnchor: 1.8,
            });
            customOverlay.setMap(map);

            // 지도 로딩 완료 — 폴백 UI 제거
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
    }).catch(() => {
      showToast("주소 복사에 실패했습니다.");
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleKakaoNavi = () => {
    openKakaoNavi({ venue, address, lat, lng });
  };

  const handleTMap = () => {
    openTMap({ venue, address, lat, lng }, () => {
      showToast("티맵은 모바일 앱에서 실행됩니다.");
    });
  };

  const handleNaverMap = () => {
    openNaverMap({ venue, address, lat, lng });
  };

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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", flexWrap: "wrap", marginTop: "2px" }}>
            <p className="location__address" style={{ margin: 0 }}>{address}</p>
            <button
              type="button"
              onClick={copyAddressToClipboard}
              className="location__copy-btn"
              title="주소 복사"
              style={{
                background: "transparent",
                border: "1px solid var(--color-silver)",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "0.7rem",
                color: "var(--color-gray)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              복사
            </button>
          </div>
          {tel && (
            <p className="location__address" style={{ marginTop: "4px" }}>
              TEL. <a href={`tel:${tel}`} style={{ color: "inherit", textDecoration: "none" }}>{tel}</a>
            </p>
          )}
        </div>

        {/* 카카오 지도 영역 */}
        <div className="location__map-container" style={{ position: "relative" }}>
          <div
            ref={mapElementRef}
            className="location__map"
            style={{
              width: "100%",
              height: "180px",
            }}
          />

          {/* AppKey 미입력 또는 로딩 전 폴백 UI */}
          {!mapLoaded && (
            <div className="location__map-fallback" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <p style={{ fontWeight: 500, fontSize: "0.9375rem", marginBottom: "4px" }}>🗺️ {venue}</p>
              <p style={{ fontSize: "0.8125rem", color: "#666", marginBottom: "12px" }}>{address}</p>
              <button
                type="button"
                className="location__nav-btn location__nav-btn--kakao"
                onClick={handleKakaoNavi}
              >
                카카오내비로 오시는 길 ↗
              </button>
            </div>
          )}
        </div>

        {/* 길안내 앱 버튼 */}
        <div className="location__nav-buttons">
          <button
            type="button"
            className="location__nav-btn"
            onClick={handleNaverMap}
          >
            네이버지도
          </button>
          <button
            type="button"
            className="location__nav-btn"
            onClick={handleKakaoNavi}
          >
            카카오내비
          </button>
          <button
            type="button"
            className="location__nav-btn"
            onClick={handleTMap}
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

