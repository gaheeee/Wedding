/**
 * 내비게이션 앱 연동 유틸리티
 * - 카카오내비: Kakao JS SDK (Kakao.Navi.start) 및 Web/App fallback
 * - 티맵 (TMAP): Android Intent Scheme & iOS URL Scheme, 스토어 fallback
 * - 네이버지도: 네이버지도 앱 scheme & Web fallback
 */

export interface NaviParams {
  venue: string;
  address: string;
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    kakao?: any;
    Kakao?: any;
  }
}

/**
 * 카카오내비 실행
 */
export function openKakaoNavi({ venue, lat, lng }: NaviParams) {
  if (typeof window === "undefined") return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // 1. 모바일 환경에서 Kakao JS SDK가 초기화되어 있는 경우
  if (isMobile && window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized() && window.Kakao.Navi) {
    try {
      window.Kakao.Navi.start({
        name: venue,
        x: lng,
        y: lat,
        coordType: "wgs84",
      });
      return;
    } catch (e) {
      console.warn("Kakao Navi SDK 호출 실패, URL Scheme으로 대체합니다.", e);
    }
  }

  // 2. 모바일 웹 환경 fallback (앱 스킴 호출 및 웹 링크 대체)
  if (isMobile) {
    const kakaoNaviScheme = `kakaonavi://navigate?name=${encodeURIComponent(venue)}&x=${lng}&y=${lat}&coord_type=wgs84`;
    const kakaoWebUrl = `https://map.kakao.com/link/to/${encodeURIComponent(venue)},${lat},${lng}`;

    window.location.href = kakaoNaviScheme;
    setTimeout(() => {
      window.open(kakaoWebUrl, "_blank");
    }, 1500);
  } else {
    // 3. PC 브라우저 환경에서는 카카오맵 길찾기 웹 페이지로 이동
    window.open(`https://map.kakao.com/link/to/${encodeURIComponent(venue)},${lat},${lng}`, "_blank");
  }
}

/**
 * 티맵 (TMAP) 실행
 */
export function openTMap({ venue, lat, lng }: NaviParams, onPcFallback?: () => void) {
  if (typeof window === "undefined") return;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid) {
    // 안드로이드: Intent 스킴을 사용하여 앱 실행 및 미설치 시 플레이스토어로 자동 이동
    const playStoreUrl = encodeURIComponent("https://play.google.com/store/apps/details?id=com.skt.tmap.ku");
    const intentUrl = `intent://route?goalname=${encodeURIComponent(venue)}&rGoName=${encodeURIComponent(venue)}&goalx=${lng}&rGoX=${lng}&goaly=${lat}&rGoY=${lat}&referrer=com.skt.Tmap#Intent;scheme=tmap;package=com.skt.tmap.ku;end;S.browser_fallback_url=${playStoreUrl}`;
    window.location.href = intentUrl;
  } else if (isIOS) {
    // iOS: tmap URL scheme 호출 후 미실행 시 앱스토어로 이동
    const appStoreUrl = "https://apps.apple.com/app/id431589174";
    const tmapScheme = `tmap://route?rGoName=${encodeURIComponent(venue)}&rGoX=${lng}&rGoY=${lat}`;

    const startTime = Date.now();
    window.location.href = tmapScheme;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.location.href = appStoreUrl;
      }
    }, 1500);
  } else {
    // PC 브라우저인 경우
    if (onPcFallback) {
      onPcFallback();
    } else {
      window.open(`https://map.kakao.com/link/to/${encodeURIComponent(venue)},${lat},${lng}`, "_blank");
    }
  }
}

/**
 * 네이버지도 실행
 */
export function openNaverMap({ venue, address, lat, lng }: NaviParams) {
  if (typeof window === "undefined") return;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const searchAddress = address || venue;
  const webUrl = `https://map.naver.com/v5/search/${encodeURIComponent(searchAddress)}`;

  if (isAndroid) {
    const fallbackUrl = encodeURIComponent(webUrl);
    const intentUrl = `intent://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(venue)}&appname=wedding#Intent;scheme=nmap;package=com.nhn.android.nmap;end;S.browser_fallback_url=${fallbackUrl}`;
    window.location.href = intentUrl;
  } else if (isIOS) {
    const nmapScheme = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(venue)}&appname=wedding`;
    const startTime = Date.now();
    window.location.href = nmapScheme;

    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        window.open(webUrl, "_blank");
      }
    }, 1500);
  } else {
    window.open(webUrl, "_blank");
  }
}
