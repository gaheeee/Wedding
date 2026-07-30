import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import CalendarSection from "./components/CalendarSection";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import AccountSection from "./components/AccountSection";
import Guestbook from "./components/Guestbook";
import ShareButton from "./components/ShareButton";

// ============================================
// 📝 이곳에서 실제 정보를 수정하세요
// ============================================

const WEDDING_CONFIG = {
  // 신랑·신부 이름
  groom: { nameEn: "Gunhyuk", nameKr: "건혁" },
  bride: { nameEn: "Hyun", nameKr: "현" },

  // 예식 일시 (년, 월(0-indexed), 일, 시, 분)
  weddingDate: new Date(2026, 10, 7, 13, 0), // 2026년 11월 7일 오후 1시

  // 인사말
  greetingMessage:
    "서로 다른 길을 걸어온 저희 두 사람이\n이제 같은 길을 함께 걸어가려 합니다.\n\n바쁘시더라도 귀한 걸음 하시어\n저희의 새로운 시작을\n축복해 주시면 감사하겠습니다.",

  // 양가 부모님
  groomParents: { father: "박OO", mother: "김OO" },
  brideParents: { father: "양희승", mother: "김연옥" },

  // 예식장 정보
  venue: {
    name: "아모르아트 웨딩홀",
    hall: "그랜드홀 3층",
    address: "충청북도 영동군 영동황간로 80",
    tel: "043-743-2500",
    traffic: {
      car: "영동역에서 차로 5분",
      parking: "건물 내 지하주차장 이용 가능 (2시간 무료)",
    },
  },

  // 계좌 정보
  groomAccounts: [
    { bank: "국민은행", number: "123-456-789012", holder: "박건혁" },
    { bank: "신한은행", number: "123-456-789012", holder: "박OO (부)" },
  ],
  brideAccounts: [
    { bank: "우리은행", number: "123-456-789012", holder: "양현" },
    { bank: "하나은행", number: "123-456-789012", holder: "양OO (부)" },
  ],

  // 갤러리 이미지 (public/images 폴더에 넣을 것)
  galleryImages: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
  ],

  // 메인 커버 이미지
  coverImage: "/images/cover.jpg",
};

export default function Home() {
  return (
    <div className="invitation-wrapper">
      {/* 메인 커버 */}
      <Cover
        groomName={WEDDING_CONFIG.groom.nameEn}
        brideName={WEDDING_CONFIG.bride.nameEn}
        groomNameKr={WEDDING_CONFIG.groom.nameKr}
        brideNameKr={WEDDING_CONFIG.bride.nameKr}
        dateString="2026. 11. 07 SAT PM 1:00"
        coverImageSrc={WEDDING_CONFIG.coverImage}
      />

      {/* 초대의 글 */}
      <Greeting
        message={WEDDING_CONFIG.greetingMessage}
        groomParents={WEDDING_CONFIG.groomParents}
        brideParents={WEDDING_CONFIG.brideParents}
        groomName={WEDDING_CONFIG.groom.nameKr}
        brideName={WEDDING_CONFIG.bride.nameKr}
      />

      {/* 구분선 */}
      <div className="section__divider" />

      {/* 캘린더 & D-Day */}
      <CalendarSection weddingDate={WEDDING_CONFIG.weddingDate} />

      {/* 갤러리 */}
      <Gallery images={WEDDING_CONFIG.galleryImages} />

      {/* 오시는 길 */}
      <Location
        venue={WEDDING_CONFIG.venue.name}
        hall={WEDDING_CONFIG.venue.hall}
        address={WEDDING_CONFIG.venue.address}
        tel={WEDDING_CONFIG.venue.tel}
        trafficInfo={WEDDING_CONFIG.venue.traffic}
      />

      {/* 마음 전하실 곳 */}
      <AccountSection
        groomAccounts={WEDDING_CONFIG.groomAccounts}
        brideAccounts={WEDDING_CONFIG.brideAccounts}
      />

      {/* 방명록 */}
      <Guestbook />

      {/* 공유하기 */}
      <ShareButton />

      {/* 푸터 */}
      <footer className="footer">
        <p className="footer__text">
          {WEDDING_CONFIG.groom.nameEn} &amp; {WEDDING_CONFIG.bride.nameEn}
        </p>
      </footer>
    </div>
  );
}
