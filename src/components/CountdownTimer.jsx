import { useEffect, useState } from "react";
import "./CountdownTimer.css";

const EVENT_DATE = new Date("2026-03-17T00:00:00");

export default function CountdownTimer({ docked } ) {

  const [timeLeft, setTimeLeft] = useState({});
  const [floating, setFloating] = useState(false);

  /* ===============================
     COUNTDOWN LOGIC
  =============================== */

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = EVENT_DATE - new Date();
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ===============================
     FLOATING LOGIC (FROM SMART TIMER)
  =============================== */

  

  /* ===============================
     CELLS
  =============================== */

  const cells = [
    { value: timeLeft.days ?? "00", label: "DAYS" },
    { value: timeLeft.hours ?? "00", label: "HOURS" },
    { value: timeLeft.minutes ?? "00", label: "MINUTES" },
    { value: timeLeft.seconds ?? "00", label: "SECONDS" },
  ];

  return (
    <div
      className={`countdown-wrapper ${docked ? "floating" : ""}`}
    >
      <h2 className="countdown-title">
        THE COUNTDOWN BEGINS
      </h2>

      <div className="countdown-container">
        {cells.map((item, index) => (
          <div key={index} className="countdown-item">
            <div className="countdown-box">
              <span className="countdown-value">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <div className="countdown-label">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}