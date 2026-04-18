// ─────────────────────────────────────────────────────────────────────────────
// Templates Tab — copy-ready CR announcement templates
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { SectionLabel, Tag } from "./UI.jsx";
import { TEMPLATES } from "../data/templates.js";

function TemplateCard({ t }) {
  const [open,   setOpen]   = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(t.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      border: `1.5px solid ${open ? "var(--border-strong)" : "var(--border-mid)"}`,
      marginBottom: "8px",
      transition: "border-color 0.2s",
    }}>
      {/* Header row — click to expand */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "11px 12px", cursor: "pointer",
          background: open ? "var(--bg-hover)" : "transparent",
        }}
      >
        <Tag label={t.tag} color={t.tagColor} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px", fontWeight: 600, color: "var(--text-primary)",
          }}>
            {t.label}
          </div>
          <div style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "1px" }}>
            {t.desc}
          </div>
        </div>

        <span style={{
          color: "var(--text-secondary)", fontSize: "11px",
          fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0,
        }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Expanded: template text + copy button */}
      {open && (
        <div style={{ padding: "12px", background: "#070707", borderTop: "1px solid var(--border-faint)" }}>
          <pre style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px", color: "var(--text-secondary)",
            whiteSpace: "pre-wrap", lineHeight: "1.75", margin: 0,
          }}>
            {t.text}
          </pre>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              onClick={copy}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px", fontWeight: 600, letterSpacing: "1px",
                padding: "5px 12px",
                border:      copied ? "1.5px solid var(--status-live)" : "1.5px solid var(--accent)",
                background:  copied ? "rgba(0,255,136,0.07)"           : "transparent",
                color:       copied ? "var(--status-live)"              : "var(--accent)",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {copied ? "✓ COPIED" : "COPY ↗"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TemplatesTab() {
  return (
    <div>
      <SectionLabel>CR Announcement Templates</SectionLabel>

      {TEMPLATES.map(t => <TemplateCard key={t.key} t={t} />)}

      {/* Short-circuit protocol */}
      <div style={{
        border: "1.5px solid rgba(255,68,68,0.15)",
        padding: "14px", marginTop: "14px",
        background: "rgba(255,68,68,0.02)",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8px", letterSpacing: "2px",
          color: "var(--status-urgent)", marginBottom: "10px",
        }}>
          ◆ SHORT-CIRCUIT PROTOCOL
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
          When a classmate DMs for info —<br/>
          <span style={{ color: "#ff6b6b", fontWeight: 600 }}>Never</span> give the direct answer.<br/>
          <span style={{ color: "#a8ff78", fontWeight: 600 }}>Always</span> redirect to the Hub.<br/>
          <em style={{ color: "var(--text-primary)" }}>You are training them, not serving them.</em>
        </div>
      </div>

      {/* Dark Hour */}
      <div style={{
        border: "1.5px solid rgba(155,93,228,0.15)",
        padding: "12px 14px", marginTop: "8px",
        background: "rgba(155,93,228,0.02)",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8px", letterSpacing: "2px",
          color: "var(--status-audit)", marginBottom: "6px",
        }}>
          🌑 DARK HOUR PROTOCOL
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>7:00 PM – 9:00 PM</span> — phone down.<br/>
          Protected for: Maths-II, OOP/C++, deep study.<br/>
          No CR duties. No WhatsApp. No exceptions.
        </div>
      </div>
    </div>
  );
}
