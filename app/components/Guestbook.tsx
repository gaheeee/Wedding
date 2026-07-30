"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabase";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing entries from Supabase
  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching entries:", error);
      } else {
        setEntries(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Scroll animation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !password.trim()) return;

    const newEntry = {
      name: name.trim(),
      password: password.trim(),
      message: message.trim(),
    };

    try {
      // Insert into Supabase
      const { error } = await supabase
        .from("guestbook")
        .insert([newEntry]);

      if (error) {
        console.error("Error inserting entry:", error);
        alert("방명록 작성에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // Refresh list after successful insert
      setName("");
      setPassword("");
      setMessage("");
      fetchEntries();
    } catch (err) {
      console.error("Unexpected error inserting entry:", err);
      alert("방명록 작성 중 오류가 발생했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="section" id="guestbook" ref={sectionRef}>
      <h2 className="section__title fade-in">Guestbook</h2>

      <form className="guestbook__form fade-in" onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            className="guestbook__input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={20}
          />
          <input
            className="guestbook__input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={20}
          />
        </div>
        <textarea
          className="guestbook__textarea"
          placeholder="축하 메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={500}
        />
        <button type="submit" className="guestbook__submit">
          작성하기
        </button>
      </form>

      <div className="guestbook__list fade-in">
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--color-gray)", fontSize: "0.875rem" }}>불러오는 중...</p>
        ) : entries.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-gray)", fontSize: "0.875rem" }}>아직 작성된 메시지가 없습니다. <br /> 첫 번째 축하 메시지를 남겨주세요!</p>
        ) : (
          entries.map((entry) => (
            <div className="guestbook__entry" key={entry.id}>
              <div className="guestbook__entry-name">{entry.name}</div>
              <div className="guestbook__entry-message">{entry.message}</div>
              <div className="guestbook__entry-date">{formatDate(entry.created_at)}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
