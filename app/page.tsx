import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import CalendarSection from "./components/CalendarSection";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import AccountSection from "./components/AccountSection";
import Guestbook from "./components/Guestbook";
import ShareButton from "./components/ShareButton";
import SectionDivider from "./components/SectionDivider";
import PolaroidSection from "./components/PolaroidSection";

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
  greetingMessage: "만나보니 잘 맞고,\n같이 있어보니 재밌고,\n더 오래 같이 있고 싶어졌습니다.\n\n그래서 결혼합니다.\n저희의 새로운 시작을 함께 축복해주세요♥",

  // 양가 부모님
  groomParents: { father: "박OO", mother: "김OO" },
  brideParents: { father: "양희승", mother: "김연옥" },

  // 예식장 정보
  venue: {
    name: "아모르아트 웨딩홀",
    hall: "그랜드홀 3층",
    address: "충청북도 영동군 영동황간로 80",
    lat: 36.1652729559686,
    lng: 127.778475897096,
    tel: "043-743-2500",
    traffic: {
      car: "영동역에서 차로 5분",
      parking: "건물 주차장 이용 가능",
    },
  },

  // 계좌 정보
  groomAccounts: [
    { bank: "국민은행", number: "227502-04-315370", holder: "박건혁" },
    { bank: "농협은행", number: "121020-52-270883", holder: "오경미(혼주)" },
  ],
  brideAccounts: [
    { bank: "농협은행", number: "302-0842-1872-91", holder: "양현" },
    { bank: "농협은행", number: "352-0195-7086-73", holder: "양희승(혼주)" },
    { bank: "농협은행", number: "319-02-111325", holder: "김연옥(혼주)" },
  ],

  // 갤러리 이미지 (public/images 폴더에 넣을 것)
  galleryImages: [
    "/images/gallery-12.jpg",
    "/images/gallery-20.jpg",
    "/images/gallery-14.jpg",
    // "/images/gallery-4.jpg",
    // "/images/gallery-5.jpg",
    // "/images/gallery-6.jpg",
    // "/images/gallery-7.jpg",
    // "/images/gallery-8.jpg",
    "/images/gallery-13.jpg",
    "/images/gallery-21.jpg",
    "/images/gallery-19.jpg",
    "/images/gallery-16.jpg",

    "/images/gallery-15.jpg",
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

      <SectionDivider />

      {/* 캘린더 & D-Day */}
      {/* <CalendarSection weddingDate={WEDDING_CONFIG.weddingDate} />

      <SectionDivider /> */}

      {/* 폴라로이드 섹션 */}
      <PolaroidSection />

      <SectionDivider />

      {/* 갤러리 */}
      <Gallery images={WEDDING_CONFIG.galleryImages} />

      <SectionDivider />

      {/* 오시는 길 */}
      <Location
        venue={WEDDING_CONFIG.venue.name}
        hall={WEDDING_CONFIG.venue.hall}
        address={WEDDING_CONFIG.venue.address}
        lat={WEDDING_CONFIG.venue.lat}
        lng={WEDDING_CONFIG.venue.lng}
        tel={WEDDING_CONFIG.venue.tel}
        trafficInfo={WEDDING_CONFIG.venue.traffic}
      />

      <SectionDivider />

      {/* 마음 전하실 곳 */}
      <AccountSection
        groomAccounts={WEDDING_CONFIG.groomAccounts}
        brideAccounts={WEDDING_CONFIG.brideAccounts}
      />

      <SectionDivider />

      {/* 방명록 */}
      <Guestbook />

      <SectionDivider />

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
