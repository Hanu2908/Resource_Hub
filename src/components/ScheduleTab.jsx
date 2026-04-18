// ─────────────────────────────────────────────────────────────────────────────
// Schedule Tab — full exam list with live countdown per row
// ─────────────────────────────────────────────────────────────────────────────
import { SectionLabel, FooterNote } from "./UI.jsx";
import { CD_THRESHOLDS } from "../config.js";

function cdAccent(days) {
  const match = CD_THRESHOLDS.find(t => days <= t.maxDays);
  return match ? match.color : "#555";
}

export default function ScheduleTab({ exams }) {
  return (
    <div>
      <SectionLabel>End-Sem Schedule — Apr–May 2026 · All at 2:30 PM</SectionLabel>

      {exams.map(({ exam, cd }) => (
        <div key={exam.id} className={`exam-row${cd.done ? " done" : ""}`}>

          {/* Date column */}
          <div style={{ width: "58px", flexShrink: 0, textAlign: "center" }}>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "15px", letterSpacing: "1px",
              color: cd.done ? "#333" : "var(--accent)",
              lineHeight: 1,
            }}>
              {exam.day}
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px", color: "var(--text-secondary)", marginTop: "1px",
            }}>
              {exam.ddmm}
            </div>
          </div>

          {/* Subject info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "13px", fontWeight: 600, color: "var(--text-primary)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {exam.shortName}
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px", color: "var(--border-strong)", marginTop: "1px",
            }}>
              {exam.code}
            </div>
          </div>

          {/* Right: days left + badges */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
            {cd.done ? (
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "var(--border-mid)" }}>
                DONE
              </div>
            ) : (
              <>
                <div style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "20px", lineHeight: 1,
                  color: cdAccent(cd.days),
                }}>
                  {cd.days}
                </div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "7px", color: "var(--border-strong)", letterSpacing: "1px",
                }}>
                  DAYS
                </div>
              </>
            )}

            {exam.branch !== "ALL" && (
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "7px", color: "var(--border-strong)",
                background: "var(--bg-hover)",
                border: "1px solid var(--border-mid)",
                padding: "2px 5px", whiteSpace: "nowrap",
              }}>
                {exam.branch.split("/")[0]}
              </div>
            )}

            {exam.audit && (
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "7px", color: "var(--status-audit)",
                border: "1px solid rgba(123,63,228,0.2)", padding: "1px 4px",
              }}>
                AUDIT
              </div>
            )}
          </div>
        </div>
      ))}

      <FooterNote>REPORT TIME 2:00 PM · EXAM 2:30–5:30 PM · CARRY ADMIT CARD + ID</FooterNote>
    </div>
  );
}
