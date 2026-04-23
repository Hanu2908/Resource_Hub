// ─────────────────────────────────────────────────────────────────────────────
// Hero countdown banner — shows next upcoming exam and live timer
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroCountdown({ exam, cd }) {
  if (!exam || !cd || cd.done) return null;

  return (
    <div style={{
      margin: "12px 16px 0",
      border: "2px solid var(--accent)",
      padding: "14px",
      background: "var(--accent-glow)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow corner — uses CSS variable so it respects theme changes */}
      <div style={{
        position: "absolute", bottom: 0, right: 0,
        width: "80px", height: "80px",
        background: "radial-gradient(circle at bottom right, var(--accent-faint) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "8px", letterSpacing: "3px",
        color: "var(--accent)", textTransform: "uppercase", marginBottom: "5px",
      }}>
        ⚡ Next Mission
      </div>

      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "26px", letterSpacing: "1.5px", color: "var(--text-primary)", lineHeight: 1,
      }}>
        {exam.shortName}
      </div>

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "10px", color: "var(--text-secondary)", marginTop: "4px",
      }}>
        {exam.code} · {exam.day} {exam.ddmm} · 2:30 PM
      </div>

      {/* Countdown numbers */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginTop: "12px" }}>
        {[
          { val: cd.days, unit: "DAYS" },
          { val: cd.hours, unit: "HRS" },
          { val: cd.mins, unit: "MIN" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "52px" }}>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "46px", lineHeight: 1,
                color: "var(--accent)", letterSpacing: "1px",
              }}>
                {String(item.val).padStart(2, "0")}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "8px", letterSpacing: "2px",
                color: "var(--text-secondary)", marginTop: "1px",
              }}>
                {item.unit}
              </div>
            </div>
            {i < 2 && (
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "40px",
                color: "var(--accent-faint)",
                lineHeight: 1, padding: "0 2px", marginBottom: "2px",
              }}>
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// HeroCountdown.jsx — add at the bottom of the component
// Pass subjectId from App.jsx based on exam.code matching vault id
<div
  onClick={() => onOpenVault(exam.code)}  // callback prop to App
  style={{
    cursor: "pointer", fontSize: "12px", color: "var(--accent)",
    fontFamily: "'IBM Plex Mono', monospace", marginTop: "10px",
    letterSpacing: "1px"
  }}
>
  VIEW RESOURCES ↗
</div>
