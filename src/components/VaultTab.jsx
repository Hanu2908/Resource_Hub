// ─────────────────────────────────────────────────────────────────────────────
// VaultTab — read-only resource cards for classmates.
//
// HOW TO ADD/UPDATE A DRIVE LINK:
//   Open src/data/vault.js, find the subject, paste the link, git push.
//   Vercel redeploys in ~90 seconds. No in-app editing — by design.
// ─────────────────────────────────────────────────────────────────────────────

import { SectionLabel, FooterNote } from "./UI.jsx";
import { FOLDER_TYPES } from "../data/vault.js";
import { CONTACT } from "../config.js";

// ── Single folder button ──────────────────────────────────────────────────────

function FolderButton({ label, url, accent }) {
  const hasLink = !!url;

  if (hasLink) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8px",
          color: "var(--text-secondary)",
          background: "var(--bg-card)",
          border: "1px solid var(--border-faint)",
          padding: "5px 8px",
          textDecoration: "none",
          transition: "all 0.12s",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accent;
          e.currentTarget.style.color = accent;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border-faint)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        ↗ {label}
      </a>
    );
  }

  // No link yet — show a disabled "Coming Soon" state
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "8px",
      color: "var(--border-strong)",
      background: "transparent",
      border: "1px dashed var(--border-faint)",
      padding: "5px 8px",
      cursor: "default",
      letterSpacing: "0.5px",
    }}>
      {label} - Adding Soon
    </div>
  );
}

// ── Single subject card ───────────────────────────────────────────────────────

function VaultCard({ subject }) {
  return (
    <div style={{
      border: `1.5px solid ${subject.accent}22`,
      padding: "11px 10px 10px",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "8px",
        color: `${subject.accent}55`,
        marginBottom: "5px",
      }}>
        {subject.id}_
      </div>

      <div style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "19px",
        letterSpacing: "1px",
        color: subject.accent,
        lineHeight: "1.05",
      }}>
        {subject.name}
      </div>

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "8px",
        color: "var(--border-mid)",
        marginTop: "4px",
        marginBottom: "10px",
      }}>
        {subject.code}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {FOLDER_TYPES.map(ft => {
          // Key doesn't exist on this subject → hide entirely
          if (!(ft.key in subject.folders)) return null;

          return (
            <FolderButton
              key={ft.key}
              label={ft.label}
              url={subject.folders[ft.key]}
              accent={subject.accent}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── "File Missing?" contact card ──────────────────────────────────────────────

function ContactCard() {
  const hasWhatsApp = CONTACT.WHATSAPP_LINK && !CONTACT.WHATSAPP_LINK.includes("XXXXXXXXXX");
  const hasGroup = !!CONTACT.GROUP_LINK;

  return (
    <div style={{
      border: "1.5px dashed var(--border-mid)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 10px",
      gap: "10px",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "8px",
        color: "var(--border-strong)",
        letterSpacing: "2px",
        textAlign: "center",
        lineHeight: 1.6,
        textTransform: "uppercase",
      }}>
        File Missing<br />or Broken Link?
      </div>

      {hasWhatsApp && (
        <a
          href={CONTACT.WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "7px 10px",
            border: "1.5px solid #25d366",
            background: "rgba(37,211,102,0.05)",
            color: "#25d366",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.12s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,0.05)"}
        >
          DM {CONTACT.CR_NAME} ↗
        </a>
      )}

      {hasGroup && (
        <a
          href={CONTACT.GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "7px 10px",
            border: "1.5px solid var(--border-mid)",
            background: "transparent",
            color: "var(--text-secondary)",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.12s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--border-strong)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border-mid)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Join Class Group ↗
        </a>
      )}

      {!hasWhatsApp && !hasGroup && (
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "9px",
          color: "var(--border-mid)",
          textAlign: "center",
        }}>
          Post in class group
        </div>
      )}
    </div>
  );
}

// ── Tab export ────────────────────────────────────────────────────────────────

export default function VaultTab({ subjects }) {
  return (
    <div>
      <SectionLabel>Resource Vault — {subjects.length} Subjects · View Only</SectionLabel>

      <div className="vault-grid">
        {subjects.map(s => <VaultCard key={s.id} subject={s} />)}
        <ContactCard />
      </div>

      <FooterNote>
        LINKS OPEN IN GOOGLE DRIVE · VIEW ONLY · MAINTAINED BY CR
      </FooterNote>
    </div>
  );
}
