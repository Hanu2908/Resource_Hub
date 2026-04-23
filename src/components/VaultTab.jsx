import { SectionLabel, FooterNote } from "./UI.jsx";
import { FOLDER_TYPES } from "../data/vault.js";
import { CONTACT } from "../config.js";

function isRecentlyUpdated(dateStr) {
  if (!dateStr) return false;
  const diff = new Date() - new Date(dateStr);
  return diff < 5 * 24 * 60 * 60 * 1000;
}

function FolderButton({ label, url, accent }) {
  const hasLink = !!url;

  if (hasLink) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          color: "var(--text-secondary)",
          background: "var(--bg-card)",
          border: "1px solid var(--border-faint)",
          padding: "10px 12px",
          textDecoration: "none",
          transition: "all 0.12s",
          cursor: "pointer",
          minHeight: "44px",
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

  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "12px",
      color: "var(--border-strong)",
      background: "transparent",
      border: "1px dashed var(--border-faint)",
      padding: "10px 12px",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      cursor: "default",
    }}>
      {label} — Adding Soon
    </div>
  );
}

function VaultCard({ subject }) {
  return (
    <div style={{
      border: `1.5px solid ${subject.accent}22`,
      padding: "14px 12px",
    }}>

      {/* Header row */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            color: `${subject.accent}55`,
            marginBottom: "3px",
          }}>
            {subject.id}_
          </div>
          <div style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "22px",
            letterSpacing: "1px",
            color: subject.accent,
            lineHeight: 1.05,
          }}>
            {subject.name}
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            color: "var(--border-mid)",
            marginTop: "3px",
          }}>
            {subject.code}
          </div>
        </div>

        {/* UPDATED pill — top right of card */}
        {isRecentlyUpdated(subject.updatedOn) && (
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "1.5px",
            color: "var(--status-live)",
            border: "1px solid rgba(74,222,128,0.3)",
            padding: "3px 7px",
            whiteSpace: "nowrap",
            alignSelf: "flex-start",
          }}>
            ✦ UPDATED
          </div>
        )}
      </div>

      {/* Folder buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "10px" }}>
        {FOLDER_TYPES.map(ft => {
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

function ContactCard() {
  const hasWhatsApp = CONTACT.WHATSAPP_LINK &&
    !CONTACT.WHATSAPP_LINK.includes("XXXXXXXXXX");
  const hasGroup = !!CONTACT.GROUP_LINK;

  return (
    <div style={{
      border: "1.5px dashed var(--border-mid)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      gap: "12px",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "12px",
        color: "var(--text-secondary)",
        letterSpacing: "2px",
        textAlign: "center",
        lineHeight: 1.8,
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "12px 10px",
            minHeight: "44px",
            border: "1.5px solid #25d366",
            background: "rgba(37,211,102,0.05)",
            color: "#25d366",
            textDecoration: "none",
            transition: "all 0.12s",
          }}
          onMouseEnter={e =>
            e.currentTarget.style.background = "rgba(37,211,102,0.12)"
          }
          onMouseLeave={e =>
            e.currentTarget.style.background = "rgba(37,211,102,0.05)"
          }
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "12px 10px",
            minHeight: "44px",
            border: "1.5px solid var(--border-mid)",
            background: "transparent",
            color: "var(--text-secondary)",
            textDecoration: "none",
            transition: "all 0.12s",
          }}
        >
          Join Class Group ↗
        </a>
      )}

      {!hasWhatsApp && !hasGroup && (
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          color: "var(--border-mid)",
          textAlign: "center",
        }}>
          Post in class group
        </div>
      )}
    </div>
  );
}

export default function VaultTab({ subjects }) {
  return (
    <div>
      <SectionLabel>
        Resource Vault — {subjects.length} Subjects · View Only
      </SectionLabel>

      <div className="vault-grid">
        {subjects.map(s => <VaultCard key={s.id} subject={s} />)}
        <ContactCard />
      </div>

      <FooterNote>
        LINKS OPEN IN GOOGLE DRIVE · MAINTAINED BY Himanshu Saini
      </FooterNote>
    </div>
  );
}
