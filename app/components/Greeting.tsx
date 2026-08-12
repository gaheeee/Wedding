"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import deceasedFlower from "@/public/images/deceased-flower.png";

interface GreetingProps {
  message: string;
  groomParents: { father: string; mother: string };
  brideParents: { father: string; mother: string };
  groomName: string;
  brideName: string;
}

export default function Greeting({
  message,
  groomParents,
  brideParents,
  groomName,
  brideName,
}: GreetingProps) {
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

  const formattedBrideName = brideName === "현" ? "현" : brideName;

  return (
    <section className="section greeting" id="greeting" ref={sectionRef}>
      <div className="greeting__content fade-in">
        {/* 상단 기호 장식 */}
        <div className="greeting__symbol">+ ° ⊹ *</div>

        {/* 신랑 · 신부 이름 */}
        <h2 className="greeting__header-names">
          {groomName} · {formattedBrideName}
        </h2>

        {/* 상단 하늘색 점선 */}
        <div className="greeting__dotted-line" />

        {/* 초대의 글 본문 */}
        <div className="greeting__message">
          {message.split("\n\n").map((paragraph, pIdx) => (
            <p key={pIdx} className="greeting__paragraph">
              {paragraph.split("\n").map((line, lIdx) => (
                <span key={lIdx}>
                  {lIdx > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* 하단 하늘색 점선 */}
        <div className="greeting__dotted-line" />

        {/* 일시 및 장소 */}
        <div className="greeting__date-venue">
          <p>2026.11.07 오후 1시</p>
          <p>아모르아트웨딩홀</p>
        </div>

        {/* 양가 부모님 정보 */}
        {/* <div className="greeting__parents">
          <div className="greeting__parents-side">
            <div>
              <Image
                src={deceasedFlower}
                alt="국화"
                width={15}
                height={15}
                style={{
                  display: "inline-block",
                  verticalAlign: "-2px",
                  marginRight: "2px",
                }}
              />
              {groomParents.father} · {groomParents.mother}
              <span style={{ fontSize: "0.8125rem", color: "var(--color-gray)" }}>
                {" "}의 아들{" "}<br/>
              </span>
              <span style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>
                {groomName}
              </span>
            </div>
          </div>
          <div className="greeting__parents-side">
            <div>
              {brideParents.father} · {brideParents.mother}
              <span style={{ fontSize: "0.8125rem", color: "var(--color-gray)" }}>
                {" "}의 딸{" "}<br/>
              </span>
              <span style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>
                {brideName}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
