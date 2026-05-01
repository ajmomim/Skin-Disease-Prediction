import React from "react";

export default function LifeSaverSection() {
  return (
    <section className="life-saver-section">
      <style>{`
        .life-saver-section { 
        padding: 32px 16px 48px; 
        }
        .life-tip { 
        max-width: 1100px; 
        margin: 0 auto 16px; 
        background:#fdebd3; 
        color:#5b4228; 
        border-radius:12px; 
        padding:12px 16px; 
        display:flex; 
        align-items:center; 
        gap:10px; 
        box-shadow: 0 4px 20px rgba(2,6,23,0.08);
        } 
        .life-tip b { 
        color:#5b4228; 
        }
        .life-wrap { 
        max-width: 1100px; 
        margin: 0 auto; 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 28px; 
        align-items: center; 
        }
        .life-figure { 
        display:flex; 
        justify-content:center; 
        }
        .life-figure img { 
        max-width: 420px; 
        width:100%; 
        filter: drop-shadow(0 12px 30px rgba(2,6,23,0.12)); 
        border-radius: 8px; 
        }
        .life-copy h2 { 
        margin: 0 0 10px; 
        font-weight: 800; 
        font-size: clamp(26px, 4vw, 40px); 
        color: #0b2d63; 
        line-height:1.15; 
        }
        .life-copy p.lead { 
        margin: 0 0 16px; 
        color: #4b5563; 
        }
        .life-copy h4 { 
        margin: 16px 0 12px; 
        color:#0b2d63; 
        font-weight:700; 
        }
        .life-list { 
        list-style:none; 
        padding:0; 
        margin:0; 
        }
        .life-list li { 
        display:flex; 
        align-items:flex-start; 
        gap:10px; 
        margin: 10px 0; 
        color:#374151; 
        }
        .life-bullet { 
        color:#22c55e; 
        font-weight:900; 
        } 
        @media 
        (max-width: 900px) 
        { .life-wrap 
        { grid-template-columns: 1fr; 
         text-align:center; 
        } .life-copy { order:2 } 
        }
      `}</style>

      <div className="life-tip">
        <span role="img" aria-label="info">ℹ️</span>
        <span><b>Tip:</b> For more accurate results, upload 3 high-quality photos so the AI can thoroughly analyze the affected skin area.</span>
      </div>

      <div className="life-wrap">
        <div className="life-figure">
          <img
            alt="Human annotated scan"
            src="/images/man.webp"
          />
        </div>
        <div className="life-copy">
          <h2>AI Dermatologist can save your life</h2>
          <p className="lead">One of the most dangerous diseases that AI Dermatologist can help identify is skin cancer.</p>
          <h4>Skin cancer is the most common cancer in the United States and worldwide.</h4>
          <ul className="life-list">
            <li><span className="life-bullet">➜</span> More than 2 people die of skin cancer every hour all over the world.</li>
            <li><span className="life-bullet">➜</span> Melanoma can spread earlier and more quickly than other skin cancers.</li>
            <li><span className="life-bullet">➜</span> Melanoma is the second most common of all cancers in men and women ages 15–29.</li>
            <li><span className="life-bullet">➜</span> 1 in 50 people will develop skin cancer in their lifetime.</li>
            <li><span className="life-bullet">➜</span> When detected early, the 5‑year survival rate for melanoma is 99 percent.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

