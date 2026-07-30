"use client";

import { useEffect, useRef, useState } from "react";

interface CalendarSectionProps {
  weddingDate: Date;
}

export default function CalendarSection({ weddingDate }: CalendarSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

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

  // Build calendar grid
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayHeaders = ["일", "월", "화", "수", "목", "금", "토"];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const dayOfWeekKr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weddingDayOfWeek = dayOfWeekKr[weddingDate.getDay()];

  const hours = weddingDate.getHours();
  const minutes = weddingDate.getMinutes();
  const ampm = hours < 12 ? "오전" : "오후";
  const displayHour = hours > 12 ? hours - 12 : hours;

  return (
    <section className="section calendar" id="calendar" ref={sectionRef}>
      <h2 className="section__title fade-in">Wedding Day</h2>

      <div className="fade-in">
        <p className="calendar__date-display">
          {monthNames[month]} {weddingDay}
        </p>
        <p className="calendar__day-info">
          {year}. {String(month + 1).padStart(2, "0")}. {String(weddingDay).padStart(2, "0")} {weddingDayOfWeek} {ampm} {displayHour}시{minutes > 0 ? ` ${minutes}분` : ""}
        </p>
      </div>

      <div className="calendar__grid fade-in">
        {dayHeaders.map((d, i) => (
          <div
            key={`header-${i}`}
            className={`calendar__grid-header ${
              i === 0 ? "calendar__grid-header--sun" : i === 6 ? "calendar__grid-header--sat" : ""
            }`}
          >
            {d}
          </div>
        ))}
        {calendarDays.map((day, i) => {
          const dayOfWeek = i % 7;
          return (
            <div
              key={`day-${i}`}
              className={`calendar__grid-day ${
                day === null ? "calendar__grid-day--empty" : ""
              } ${day === weddingDay ? "calendar__grid-day--today" : ""} ${
                dayOfWeek === 0 && day !== null ? "calendar__grid-day--sun" : ""
              } ${dayOfWeek === 6 && day !== null ? "calendar__grid-day--sat" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="countdown fade-in">
        <div className="countdown__item">
          <span className="countdown__number">{countdown.days}</span>
          <span className="countdown__label">Days</span>
        </div>
        <div className="countdown__item">
          <span className="countdown__number">{countdown.hours}</span>
          <span className="countdown__label">Hours</span>
        </div>
        <div className="countdown__item">
          <span className="countdown__number">{countdown.minutes}</span>
          <span className="countdown__label">Min</span>
        </div>
        <div className="countdown__item">
          <span className="countdown__number">{countdown.seconds}</span>
          <span className="countdown__label">Sec</span>
        </div>
      </div>
    </section>
  );
}
