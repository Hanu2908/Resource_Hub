import { CD_THRESHOLDS } from "../config.js";

function cdAccent(days) {
  const match = CD_THRESHOLDS.find(t => days <= t.maxDays);
  return match ? match.color : "#555";
}

export default function ScheduleTab({ exams }) {
  return (
    <div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "9px", letterSpacing: "3px",
        color: "var(--text-dim)", textTransform: "uppercase",
        marginBottom: "10px", paddingBottom: "6px",
        borderBottom: "1px solid var(--border-faint)",
      }}>
        End-Sem Schedule — Apr–May 2026 · All at 2:30 PM
      </div>

      {exams.map(({ exam, cd }) => {
        const isToday = !cd.done && cd.isToday;
        return (
          <div
            key={exam.id}
            className={`exam-row${cd.done ? " done" : ""}`}
            style={isToday ? { borderLeft: "3px solid var(--status-urgent)", paddingLeft: "10px" } : {}}
          >
            {/* Date column */}
            <div style={{ width: "64px", flexShrink: 0, textAlign: "center" }}>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "18px", letterSpacing: "1px",
                color: cd.done ? "var(--border-strong)" : isToday ? "var(--status-urgent)" : "var(--accent)",
                lineHeight: 1,
              }}>
                {exam.day}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px", color: "var(--text-secondary)", marginTop: "3px",
              }}>
                {exam.ddmm}
              </div>
            </div>

            {/* Subject info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className={cd.done ? "exam-subject-name" : ""}
                style={{
                  fontSize: "15px", fontWeight: 600,
                  color: cd.done ? "var(--border-strong)" : "var(--text-primary)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  lineHeight: 1.3,
                }}
              >
                {exam.shortName}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px", color: "var(--border-strong)", marginTop: "3px",
              }}>
                {exam.code}
              </div>
              {/* Hall — shows only when filled */}
              {exam.hall && (
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px", color: "var(--accent)",
                  marginTop: "3px", letterSpacing: "0.5px",
                }}>
                  📍 {exam.hall}
                </div>
              )}
            </div>

            {/* Right: status */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
              {cd.done ? (
                <>
                  <div style={{ fontSize: "18px", color: "var(--status-live)" }}>✓</div>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px", color: "var(--border-mid)", letterSpacing: "1px",
                  }}>DONE</div>
                </>
              ) : isToday ? (
                <>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px", fontWeight: 600,
                    color: "var(--status-urgent)", letterSpacing: "1px",
                    border: "1px solid var(--status-urgent)",
                    padding: "3px 6px",
                  }}>
                      TODAY
                    </div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "9px", color: "var(--text-secondary)",
                    }}>2:30 PM</div>
                  </>
                ) : (
                  <>
                    <div style={{
                      fontFamily: "'Bebas Neue', cursive",
                        fontSize: "24px", lineHeight: 1,
                        color: cdAccent(cd.calendarDays),
                      }}>
                        {cd.calendarDays}
                      </div>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px", color: "var(--border-strong)", letterSpacing: "1px",
                  }}>
                        {cd.calendarDays === 1 ? "DAY" : "DAYS"}
                  </div>
                </>
              )}

              {exam.branch !== "ALL" && !cd.done && (
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px", color: "var(--border-strong)",
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border-mid)",
                  padding: "3px 6px", whiteSpace: "nowrap",
                }}>
                  {exam.branch.split("/")[0]}
                </div>
              )}

              {exam.audit && !cd.done && (
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px", color: "var(--status-audit)",
                  border: "1px solid rgba(123,63,228,0.2)", padding: "2px 5px",
                }}>
                  AUDIT
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="footer-note">
        REPORT TIME 2:00 PM<br />
        EXAM 2:30–5:30 PM · CARRY ADMIT CARD + ID
      </div>
    </div>
  );
}