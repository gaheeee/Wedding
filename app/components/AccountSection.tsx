"use client";

import { useState, useEffect, useRef } from "react";

interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

interface AccountSectionProps {
  groomAccounts: AccountInfo[];
  brideAccounts: AccountInfo[];
}

export default function AccountSection({ groomAccounts, brideAccounts }: AccountSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("계좌번호가 복사되었습니다");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastMessage("계좌번호가 복사되었습니다");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }
  };

  const renderAccountGroup = (
    label: string,
    accounts: AccountInfo[],
    isOpen: boolean,
    toggle: () => void
  ) => (
    <div className="account__group">
      <button className="account__toggle" onClick={toggle}>
        <span>{label}</span>
        <span className={`account__toggle-icon ${isOpen ? "account__toggle-icon--open" : ""}`}>
          ▼
        </span>
      </button>
      <div className={`account__details ${isOpen ? "account__details--open" : ""}`}>
        {accounts.map((acc, i) => (
          <div className="account__item" key={i}>
            <div className="account__info">
              <span className="account__bank">{acc.bank}</span>
              <br />
              <span className="account__number">{acc.number}</span>
              <br />
              <span className="account__holder">{acc.holder}</span>
            </div>
            <button
              className="account__copy-btn"
              onClick={() => copyToClipboard(acc.number)}
            >
              복사
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section className="section section--cream" id="account" ref={sectionRef}>
        <h2 className="section__title fade-in">마음 전하실 곳</h2>
        <p
          className="fade-in"
          style={{
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "var(--color-gray)",
            marginBottom: "2rem",
            lineHeight: 1.8,
          }}
        >
          축하의 마음을 전해주시는 모든 분들께
          <br />
          진심으로 감사드립니다.
        </p>

        <div className="fade-in">
          {renderAccountGroup("신랑측 계좌번호", groomAccounts, groomOpen, () =>
            setGroomOpen(!groomOpen)
          )}
          {renderAccountGroup("신부측 계좌번호", brideAccounts, brideOpen, () =>
            setBrideOpen(!brideOpen)
          )}
        </div>
      </section>

      {/* Toast notification */}
      <div className={`toast ${toastVisible ? "toast--visible" : ""}`}>{toastMessage}</div>
    </>
  );
}
