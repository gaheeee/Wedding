import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, Cormorant_Garamond, Gowun_Batang } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body-kr",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const gowun = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body-kr-alt",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "건혁 ♥ 현 결혼합니다.",
  description: "두 사람의 새로운 시작을 함께 축하해 주세요.",
  openGraph: {
    title: "건혁 ♥ 현 결혼합니다.",
    description: "두 사람의 새로운 시작을 함께 축하해 주세요.",
    type: "website",
    images: [
      {
        url: "/images/cover_org.jpg",
        alt: "건혁 ♥ 현 결혼합니다.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSerifKr.variable} ${cormorant.variable} ${gowun.variable}`}>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

