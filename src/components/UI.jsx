// ─────────────────────────────────────────────────────────────────────────────
// Shared tiny UI primitives used across multiple tabs
// ─────────────────────────────────────────────────────────────────────────────

export function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "8px",
      letterSpacing: "3px",
      color: "var(--text-dim)",
      textTransform: "uppercase",
      marginBottom: "10px",
      paddingBottom: "6px",
      borderBottom: "1px solid var(--border-faint)",
    }}>
      {children}
    </div>
  );
}

export function FooterNote({ children }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "8px",
      color: "var(--border-mid)",
      textAlign: "center",
      letterSpacing: "1px",
      marginTop: "18px",
    }}>
      {children}
    </div>
  );
}

export function Tag({ label, color }) {
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "8px",
      fontWeight: 600,
      letterSpacing: "1.5px",
      color: color,
      border: `1px solid ${color}33`,
      padding: "2px 5px",
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}
