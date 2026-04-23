import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { APP_TITLE, APP_SUBTITLE, TABS, BRANCHES, DEFAULT_BRANCH, THEME } from "./config.js";
import { EXAMS } from "./data/exams.js";
import { VAULT } from "./data/vault.js";
import HeroCountdown from "./components/HeroCountdown.jsx";
import ScheduleTab from "./components/ScheduleTab.jsx";
import VaultTab from "./components/VaultTab.jsx";
import NoticesTab from "./components/NoticesTab.jsx";
import TemplatesTab from "./components/TemplatesTab.jsx";
import PYQSection from './components/PYQSection.jsx';

function getCountdown(dateStr) {
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return { done: true, days: 0, hours: 0, mins: 0 };
  return {
    done:  false,
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000)  / 60000),
  };
}

function branchMatch(exam, code) {
  if (code === "ALL" || exam.branch === "ALL") return true;
  return exam.branch.includes(code);
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg-page", theme.bgPage);
  root.style.setProperty("--bg-card", theme.bgCard);
  root.style.setProperty("--bg-hover", theme.bgHover);
  root.style.setProperty("--border-faint", theme.borderFaint);
  root.style.setProperty("--border-mid", theme.borderMid);
  root.style.setProperty("--border-strong", theme.borderStrong);
  root.style.setProperty("--text-primary", theme.textPrimary);
  root.style.setProperty("--text-secondary", theme.textSecondary);
  root.style.setProperty("--text-dim", theme.textDim);
  root.style.setProperty("--text-meta", theme.textMeta);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-faint", theme.accentFaint);
  root.style.setProperty("--accent-glow", theme.accentGlow);
  root.style.setProperty("--status-live", theme.statusLive);
  root.style.setProperty("--status-urgent", theme.statusUrgent);
  root.style.setProperty("--status-warn", theme.statusWarn);
  root.style.setProperty("--status-audit", theme.statusAudit);
}

function ShareButton() {
  if (!navigator.share) return null;
  return (
    <button
      onClick={() =>
        navigator.share({
          title: "Resource Hub — SKIT P2",
          text: "End-sem notes, PYQs and exam schedule",
          url: window.location.href,
        }).catch(() => { })
      }
      style={{
        background: "none",
        border: "1px solid var(--border-mid)",
        cursor: "pointer",
        color: "var(--text-primary)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        fontWeight: "400",
        letterSpacing: "1px",
        padding: "3px 8px",
        minHeight: "28px",
      }}
    >
      SHARE ↑
    </button>
  );
}

const ENABLED_TABS = TABS.filter(t => t.enabled);

export default function App() {
  const [tab,    setTab]    = useState(ENABLED_TABS[0]?.id ?? "schedule");
  const [branch, setBranch] = useState(DEFAULT_BRANCH);
  const [,       setTick]   = useState(0);

  useEffect(() => {
    applyTheme(THEME);
    const timer = setInterval(() => setTick(n => n + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  const filteredExams = EXAMS
    .filter(e => branchMatch(e, branch))
    .map(exam => ({ exam, cd: getCountdown(exam.date) }));

  const nextEntry = filteredExams.find(({ cd }) => !cd.done);

  return (
    <>
      <Analytics />

      <div style={{
        maxWidth: "480px", margin: "0 auto",
        background: "var(--bg-page)", minHeight: "100vh", paddingBottom: "80px",
      }}>

        {/* ── HEADER ── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "var(--bg-page)", borderBottom: "2px solid var(--accent)",
          padding: "14px 16px 10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

            {/* Left */}
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "30px", letterSpacing: "3px",
                color: "var(--accent)", lineHeight: 1,
              }}>
                {APP_TITLE}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px", color: "var(--text-meta)",
                letterSpacing: "1px", marginTop: "3px", textTransform: "uppercase",
              }}>
                {APP_SUBTITLE}
              </div>
            </div>

            {/* Right — SHARE + LIVE on row 1, date on row 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>

              {/* Row 1 */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShareButton />
                <div style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "9px", letterSpacing: "2px", color: "var(--status-live)",
                }}>
                  <span
                    className="live-dot"
                    style={{
                      width: "6px", height: "6px",
                      background: "var(--status-live)",
                      borderRadius: "50%", display: "inline-block",
                    }}
                  />
                  LIVE
                </div>
              </div>

              {/* Row 2 — date sits here, NOT inside the row above */}
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px", color: "var(--border-strong)",
              }}>
                {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>

            </div>

          </div>
        </div>

        {/* ── BRANCH FILTER ── */}
        <div style={{
          display: "flex", gap: "5px",
          padding: "9px 16px",
          borderBottom: "1px solid var(--border-faint)",
          overflowX: "auto",
        }}>
          {BRANCHES.map(b => (
            <button
              key={b.code}
              className={`branch-btn${branch === b.code ? " active" : ""}`}
              onClick={() => setBranch(b.code)}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* ── HERO COUNTDOWN ── */}
        <HeroCountdown
          exam={nextEntry?.exam}
          cd={nextEntry?.cd}
          onOpenVault={() => {
            setTab("vault");
            window.scrollTo(0, 0);
          }}
        />

        <PYQSection />

        {tab === "schedule" && <ScheduleTab exams={filteredExams} />}
        {tab === "vault" && <VaultTab subjects={VAULT} />}
        {tab === "notices" && <NoticesTab />}
        {tab === "templates" && <TemplatesTab />}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--bg-page)", borderTop: "2px solid var(--accent)",
        display: "flex", justifyContent: "space-around", padding: "12px 16px 24px",
        zIndex: 100, maxWidth: "480px", margin: "0 auto",
      }}>
        {ENABLED_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px",
              color: tab === t.id ? "var(--accent)" : "var(--text-dim)",
              letterSpacing: "1px", textTransform: "uppercase",
              borderBottom: tab === t.id ? "2px solid var(--accent)" : "none",
              paddingBottom: "4px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}