"use client";

export default function ShareButton() {
  const handleShare = () => {
    // TODO: Kakao JS SDK 연동 후 Kakao.Share.sendDefault() 호출로 교체
    // 현재는 Web Share API fallback
    if (navigator.share) {
      navigator.share({
        title: "건혁 ♥ 양현 결혼합니다",
        text: "두 사람의 새로운 시작을 함께 축하해 주세요.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      // Clipboard fallback
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("링크가 복사되었습니다!");
      });
    }
  };

  return (
    <div className="share" id="share">
      <button className="share__button" onClick={handleShare}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        공유하기
      </button>
    </div>
  );
}
