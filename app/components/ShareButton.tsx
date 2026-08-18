"use client";

import { useState } from "react";

export default function ShareButton() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const shareTitle = "건혁 ♥ 현 결혼합니다.";
    const shareDesc = "두 사람의 새로운 시작을 함께 축하해 주세요.";
    const imageUrl = `${window.location.origin}/images/cover_org.jpg`;

    // 1. Kakao Talk Link Share
    if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized() && window.Kakao.Share) {
      try {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: shareTitle,
            description: shareDesc,
            imageUrl: imageUrl,
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
          buttons: [
            {
              title: "모바일 청첩장 보기",
              link: {
                mobileWebUrl: currentUrl,
                webUrl: currentUrl,
              },
            },
          ],
        });
        return;
      } catch (e) {
        console.warn("Kakao Share error:", e);
      }
    }

    // 2. Web Share API fallback (모바일 브라우저 공유창)
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareDesc,
        url: currentUrl,
      }).catch(() => {});
      return;
    }

    // 3. Clipboard fallback (링크 복사)
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast("청첩장 링크가 복사되었습니다.");
    }).catch(() => {
      showToast("링크 복사에 실패했습니다.");
    });
  };

  return (
    <div className="share" id="share">
      <button className="share__button" onClick={handleShare}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        카카오톡으로 공유하기
      </button>

      {/* 토스트 알림 */}
      <div className={`toast ${toastMessage ? "toast--visible" : ""}`}>
        {toastMessage}
      </div>
    </div>
  );
}

