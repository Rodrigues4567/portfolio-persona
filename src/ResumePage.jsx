import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  {
    id: "back",
    badge: "◄",
    title: "BACK",
    subtitle: "Return to Home",
    isBack: true,
  },
  {
    id: "i",
    badge: "I",
    title: "EDUCATION",
    subtitle: "University / Coursework",
    rank: 3,
  },
  {
    id: "ii",
    badge: "II",
    title: "SKILLS",
    subtitle: "Frontend / Backend",
    rank: 4,
  },
  {
    id: "iv",
    badge: "III",
    title: "EXPERIENCE",
    subtitle: "Internships / Roles",
    rank: 5,
  },
];

const EDUCATION_ROWS = [
  { index: "01", title: "Systems Analysis and Development", status: "MAR 2023 - DEC 2025", type: "COMPLETE" },
  { index: "02", title: "Software Engineering", status: "MAR 2026 - JUL 2028", type: "IN PROGRESS" },
];

const SKILLS_ROWS = [
  {
    index: "01", title: "Frontend",
    details: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    index: "02", title: "Backend",
    details: ["Node.js", "Nest.js", "REST APIs", "Prisma ORM"],
  },
  {
    index: "03", title: "Tools",
    details: ["Docker", "Git & GitHub", "Jest", "Vercel"],
  },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Frontend Developer at Frontend Fusion", date: "NOV 2025 - MAY 2026", type: "VOLUNTEER" },
  { index: "02", title: "Frontend Developer at MyByte", date: "FEB 2026 - PRESENT"},
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => i === null ? null : Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => i === null ? 0 : Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter" && active === 0) navigate("/");
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline preload="auto" />
      <div className="resume-entry-mask" aria-hidden="true">
        <video
          className="resume-entry-video"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel--scroll {
          max-height: 84vh;
          display: flex;
          flex-direction: column;
        }
        .resume-detail-scroll-inner {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: all;
        }
        .resume-detail-scroll-inner::-webkit-scrollbar {
          width: 4px;
        }
        .resume-detail-scroll-inner::-webkit-scrollbar-track {
          background: transparent;
        }
        .resume-detail-scroll-inner::-webkit-scrollbar-thumb {
          background: rgba(133, 244, 255, 0.3);
          border-radius: 2px;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-status-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          flex-shrink: 0;
        }
        .resume-detail-status-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 1.5px;
          color: #85f4ff;
        }
        .resume-detail-row:first-child {
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .resume-detail-row-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        @media (max-width: 690px) {
          #menu-screen { overflow-y: auto; }

          .resume-overlay {
            position: absolute;
            inset: 0;
            overflow-y: auto;
            overflow-x: hidden;
            pointer-events: all;
            display: flex;
            flex-direction: column;
            padding-bottom: 60px;
          }

          .resume-stack {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            transform: none;
            padding: 14px 12px 0;
            gap: 8px;
          }

          .resume-list-tag {
            font-size: 52px;
            margin: 0 0 6px 6px;
          }

          .resume-card-wrap {
            width: 100%;
          }

          .resume-card {
            height: 70px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          }
          .resume-card-wrap.active .resume-card {
            box-shadow: 8px 8px 0 #d63232;
          }

          .resume-badge {
            top: 8px;
            left: -6px;
            width: 38px;
            height: 46px;
          }
          .resume-badge-text { font-size: 21px; }

          .resume-card-inner {
            padding: 8px 12px 8px 44px;
          }

          .resume-title { font-size: 28px; }

          .resume-rank-label { font-size: 14px; }
          .resume-rank-number { font-size: 36px; }

          .resume-subtitle-bar {
            left: 44px;
            right: 8px;
            bottom: 6px;
            height: 20px;
          }
          .resume-subtitle { font-size: 14px; }

          .resume-detail-panel {
            position: relative;
            top: auto;
            right: auto;
            width: calc(100% - 24px);
            min-height: auto;
            max-height: 58vh;
            overflow-y: auto;
            overflow-x: hidden;
            margin: 12px 12px 0;
            clip-path: none;
            border-radius: 2px;
            padding-bottom: 24px;
          }

          .resume-detail-panel--scroll {
            max-height: 58vh;
            overflow-y: auto;
            display: block;
          }

          .resume-detail-scroll-inner {
            max-height: none;
            overflow-y: visible;
          }

          .resume-detail-panel::-webkit-scrollbar,
          .resume-detail-panel--scroll::-webkit-scrollbar {
            width: 4px;
          }
          .resume-detail-panel::-webkit-scrollbar-track,
          .resume-detail-panel--scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .resume-detail-panel::-webkit-scrollbar-thumb,
          .resume-detail-panel--scroll::-webkit-scrollbar-thumb {
            background: rgba(133, 244, 255, 0.35);
            border-radius: 2px;
          }

          .resume-detail-top {
            min-height: 58px;
            padding: 0 12px;
            grid-template-columns: 48px 1fr auto;
            gap: 8px;
          }
          .resume-detail-top-index { font-size: 28px; }
          .resume-detail-top-title { font-size: 24px; }
          .resume-detail-top-progress { font-size: 24px; }

          .resume-detail-list { margin-top: 10px; gap: 6px; }

          .resume-detail-row {
            grid-template-columns: 32px 1fr auto;
            gap: 6px;
            min-height: 40px;
            padding: 0 10px;
          }
          .resume-detail-row-index { font-size: 15px; }
          .resume-detail-row-title { font-size: 17px; }

          .resume-detail-status {
            font-size: 12px;
            padding: 4px 7px;
          }
          .resume-detail-status-sub { font-size: 13px; }

          .resume-detail-bottom { padding: 12px; margin-top: 12px; }
          .resume-detail-bottom-title { font-size: 20px; margin-bottom: 8px; }
          .resume-detail-bullet { font-size: 15px; }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>
            LIST
          </div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onTouchStart={() => setActive(index)}
              onClick={() => (item.isBack ? navigate("/") : setActive(index))}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  {!item.isBack && (
                    <div className="resume-rank">
                      <div className="resume-rank-label">RANK</div>
                      <div className="resume-rank-number">{item.rank}</div>
                    </div>
                  )}
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">EDUCATION LOG</div>
              <div className="resume-detail-top-progress">2/2</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index} style={row.index === "02" ? { paddingTop: "10px", paddingBottom: "10px" } : {}}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status-wrap">
                    <div className="resume-detail-status">{row.status}</div>
                    <div className="resume-detail-status-sub">{row.type}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">
                  - Building a strong foundation in software engineering.
                </div>
                <div className="resume-detail-bullet">
                  - Applying what I learn through personal projects and
                  real-world practice.
                </div>
                <div className="resume-detail-bullet">
                  - Continuously improving my skills and preparing for
                  professional challenges.
                </div>
              </div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="resume-detail-panel resume-detail-panel--scroll">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">02</div>
              <div className="resume-detail-top-title">SKILLS</div>
              <div className="resume-detail-top-progress">3/3</div>
            </div>

            <div className="resume-detail-scroll-inner">
              <div className="resume-detail-list">
                {SKILLS_ROWS.map((row) => (
                  <React.Fragment key={row.index}>
                    <div className="resume-detail-row">
                      <div className="resume-detail-row-index">{row.index}</div>
                      <div className="resume-detail-row-body">
                        <div className="resume-detail-row-title">{row.title}</div>
                      </div>
                    </div>
                    <div className="resume-detail-bottom" style={{ marginTop: "4px" }}>
                      <div className="resume-detail-bullets">
                        {row.details.map((d) => (
                          <div className="resume-detail-bullet" key={d}>- {d}</div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">03</div>
              <div className="resume-detail-top-title">EXPERIENCE</div>
              <div className="resume-detail-top-progress">2/2</div>
            </div>

            <div className="resume-detail-list">
              {EXPERIENCE_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index} style={row.index === "02" ? { paddingTop: "10px", paddingBottom: "10px" } : {}}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status-wrap">
                    <div className="resume-detail-status">{row.date}</div>
                    <div className="resume-detail-status-sub">{row.type}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Developed responsive, modern user interfaces using React and Next.js.</div>
                <div className="resume-detail-bullet">- Collaborated with teams using agile workflows and Git for version control.</div>
                <div className="resume-detail-bullet">- Applied best practices in component-based architecture and clean code.</div>
                <div className="resume-detail-bullet">- REST APIs integrating frontend and backend consistently.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
