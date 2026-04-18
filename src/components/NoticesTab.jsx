// ─────────────────────────────────────────────────────────────────────────────
// Notices Tab — post and manage class announcements
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { SectionLabel } from "./UI.jsx";

const INITIAL_NOTICES = [
  {
    id: 1,
    title: "End-Sem Schedule Released",
    body: "All exams at 2:30–5:30 PM. Report by 2:00 PM sharp. Check the Schedule tab for your live countdown.",
    time: "18 Apr 2026",
    pinned: true,
  },
];

export default function NoticesTab() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [form, setForm]       = useState({ title: "", body: "" });

  const addNotice = () => {
    if (!form.title.trim()) return;
    setNotices([
      {
        id: Date.now(),
        ...form,
        time: new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }),
        pinned: false,
      },
      ...notices,
    ]);
    setForm({ title: "", body: "" });
  };

  const deleteNotice = (id) => setNotices(notices.filter(n => n.id !== id));

  return (
    <div>
      {/* Post form */}
      <div style={{ border: "1.5px solid var(--border-mid)", padding: "12px", marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8px", letterSpacing: "2px",
          color: "var(--border-strong)", marginBottom: "8px", textTransform: "uppercase",
        }}>
          Post New Notice
        </div>
        <input
          className="cc-input"
          placeholder="Notice title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="cc-input cc-textarea"
          placeholder="Details (optional)"
          value={form.body}
          onChange={e => setForm({ ...form, body: e.target.value })}
        />
        <button className="btn-primary" onClick={addNotice}>
          POST NOTICE
        </button>
      </div>

      <SectionLabel>Active Notices — {notices.length} posted</SectionLabel>

      {notices.length === 0 && (
        <div style={{
          textAlign: "center", color: "var(--border-mid)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px", padding: "30px 0",
        }}>
          NO ACTIVE NOTICES
        </div>
      )}

      {notices.map(n => (
        <div key={n.id} className={`notice-card${n.pinned ? " pinned" : ""}`}>
          {n.pinned && (
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "7px", color: "var(--accent)",
              letterSpacing: "2px", marginBottom: "4px",
            }}>
              📌 PINNED
            </div>
          )}

          <div style={{
            fontSize: "13px", fontWeight: 600,
            color: "var(--text-primary)", paddingRight: "20px", lineHeight: 1.4,
          }}>
            {n.title}
          </div>

          {n.body && (
            <div style={{
              fontSize: "11px", color: "var(--text-secondary)",
              marginTop: "4px", lineHeight: 1.6, whiteSpace: "pre-line",
            }}>
              {n.body}
            </div>
          )}

          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "8px", color: "var(--border-strong)", marginTop: "6px",
          }}>
            {n.time}
          </div>

          {!n.pinned && (
            <button
              className="notice-del"
              onClick={() => deleteNotice(n.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
