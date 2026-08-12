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

  return (
    <section className="section greeting" id="greeting" ref={sectionRef}>
      <div className="greeting__content">
        <div className="section__ornament">✦ ✦ ✦</div>
        {/* <h2 className="section__title fade-in">Invitation</h2> */}

        <p className="greeting__message fade-in">
          {message.split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>

        <div className="greeting__parents fade-in">
          <div className="greeting__parents-side">
            {/* <div className="greeting__parents-label">신랑측</div> */}
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
            {/* <div className="greeting__parents-label">신부측</div> */}
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
        </div>
      </div>
    </section>
  );
}
