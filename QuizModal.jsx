import React, { useState } from "react";

export default function QuizModal({ open, onClose }) {
  const steps = [
    {
      q: "Are there any spots on your skin that stand out or look different from others?",
      options: ["Yes, several", "I'm not sure", "No, none that I've noticed"],
      tip: "Sometimes, the 'ugly duckling' mole is the one to watch out for.",
    },
    {
      q: "Are you aware of any moles located in hard-to-see areas?",
      options: ["Yes", "Not sure", "No"],
      tip: "Moles in these areas are at higher risk of damage and should be monitored closely.",
    },
    {
      q: "Have you ever accidentally caused mechanical damage to any of your moles?",
      options: ["Yes, multiple times", "Yes, but only once", "No, never"],
      tip: "Injuries raise the risk of complications, so regular check-ups are crucial.",
    },
    {
      q: "Have you noticed recent changes in size, color, or shape of any spots?",
      options: ["Yes", "Not sure", "No"],
      tip: "ABCDE (Asymmetry, Border, Color, Diameter, Evolving) helps assess moles.",
    },
    {
      q: "Do you have a family history of skin cancer?",
      options: ["Yes", "Not sure", "No"],
      tip: "Family history increases risk and warrants closer observation.",
    },
    {
      q: "How often do you use sun protection (SPF 30+)?",
      options: ["Daily", "Sometimes", "Rarely/Never"],
      tip: "Consistent sunscreen use significantly reduces skin cancer risk.",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (!open) return null;

  const step = steps[idx];

  const choose = (opt) => {
    const next = [...answers];
    next[idx] = opt;
    setAnswers(next);
    if (idx < steps.length - 1) setIdx(idx + 1);
    else onClose?.(next);
  };

  return (
    <div className="quiz-overlay" role="dialog" aria-modal>
      <style>{`
        .quiz-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.6); display:flex; align-items:center; justify-content:center; z-index: 9999; }
        .quiz-card { width: min(560px, 94%); background:#f8fbff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow:hidden; }
        .quiz-body { padding: 18px; }
        .quiz-q { color:#0b2d63; font-weight:800; font-size: 20px; line-height:1.3; margin: 6px 0 10px; }
        .quiz-option { display:flex; align-items:center; justify-content:space-between; background:#fff; border:1px solid #e2e8f0; padding: 12px 14px; border-radius: 12px; margin: 10px 0; cursor:pointer; }
        .quiz-option:hover { border-color:#93c5fd; box-shadow: 0 6px 20px rgba(147,197,253,0.25); }
        .quiz-tip { margin: 12px; background:#e3eafc; color:#334155; border-radius:12px; padding: 12px 14px; }
        .quiz-top { display:flex; justify-content:space-between; align-items:center; padding: 10px 14px; }
        .quiz-close { background:transparent; border:none; font-size:20px; cursor:pointer; }
        .quiz-steps { height:4px; background:#e2e8f0; border-radius:999px; overflow:hidden; }
        .quiz-steps > div { height:100%; width:${((idx + 1) / steps.length) * 100}%; background:#2563eb; }
      `}</style>

      <div className="quiz-card">
        <div className="quiz-top">
          <div className="quiz-steps"><div /></div>
          <button className="quiz-close" aria-label="Close" onClick={() => onClose?.(answers)}>×</button>
        </div>
        <div className="quiz-body">
          <div className="quiz-q">{step.q}</div>
          {step.options.map((o, i) => (
            <div key={i} className="quiz-option" onClick={() => choose(o)}>
              <span>{String.fromCharCode(65 + i)}</span>
              <span>{o}</span>
              <span>›</span>
            </div>
          ))}
          <div className="quiz-tip">{step.tip}</div>
        </div>
      </div>
    </div>
  );
}