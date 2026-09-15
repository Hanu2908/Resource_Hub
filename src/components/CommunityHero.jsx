import React from "react";
import { SearchIcon, CloseIcon, ArrowUpIcon, PlusIcon } from "./Icons.jsx";

export default function CommunityHero({
  totalResources = 0,
  totalUpvotes = 0,
  searchQuery,
  onSearchChange,
  onOpenContribute,
  onOpenAddSubject,
}) {
  return (
    <div style={{
      padding: "20px 16px 14px",
      borderBottom: "1px solid var(--border-faint)",
      background: "linear-gradient(180deg, rgba(139, 92, 246, 0.07) 0%, rgba(10, 10, 15, 0) 100%)",
    }}>
      {/* Crowd Power Banner Tag */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(139, 92, 246, 0.12)",
        border: "1px solid rgba(139, 92, 246, 0.3)",
        borderRadius: "20px",
        padding: "3px 10px",
        marginBottom: "12px",
      }}>
        <span style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--status-live)",
          display: "inline-block",
        }} className="live-dot" />
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "1.5px",
          color: "var(--accent)",
          textTransform: "uppercase",
        }}>
          100% Crowdsourced Study Vault
        </span>
      </div>

      {/* Main Hero Header */}
      <h1 style={{
        fontFamily: "'Bebas Neue', cursive",
        fontSize: "36px",
        letterSpacing: "2.5px",
        lineHeight: 1.05,
        color: "var(--text-primary)",
        marginBottom: "6px",
      }}>
        ACADEMIC RESOURCE COMMONS
      </h1>

      <p style={{
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: 1.5,
        marginBottom: "16px",
      }}>
        End-sem notes, unit modules, autonomous PYQs & lab manuals — contributed by students, ranked strictly by community upvotes.
      </p>

      {/* Community Impact Counters */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
        marginBottom: "16px",
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--border-mid)",
          borderRadius: "8px",
          padding: "10px 12px",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            color: "var(--text-meta)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            Shared Materials
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginTop: "2px",
          }}>
            {totalResources} <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--text-dim)" }}>files</span>
          </div>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--border-mid)",
          borderRadius: "8px",
          padding: "10px 12px",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            color: "var(--text-meta)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            Community Votes
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "20px",
            fontWeight: 700,
            color: "#a78bfa",
            marginTop: "2px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            <ArrowUpIcon size={16} color="#a78bfa" />
            <span>{totalUpvotes}</span>
          </div>
        </div>
      </div>

      {/* Actions: CONTRIBUTE MATERIAL & ADD SUBJECT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", marginBottom: "14px" }}>
        <button
          onClick={onOpenContribute}
          className="btn-primary"
          style={{
            padding: "12px",
            fontSize: "11px",
            letterSpacing: "1.5px",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <PlusIcon size={14} color="#0A0A0F" />
          CONTRIBUTE MATERIAL
        </button>

        <button
          onClick={onOpenAddSubject}
          className="btn-secondary"
          style={{
            fontSize: "10.5px",
            letterSpacing: "1px",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
          title="Add a new subject if yours isn't listed"
        >
          <PlusIcon size={13} color="var(--text-secondary)" />
          ADD SUBJECT
        </button>
      </div>

      {/* Instant Search Bar */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search subjects, topics, PYQs, units..."
          style={{
            width: "100%",
            background: "var(--bg-card)",
            border: "1.5px solid var(--border-mid)",
            color: "var(--text-primary)",
            padding: "10px 36px 10px 14px",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "13px",
            borderRadius: "8px",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          className="cc-input"
        />
        {searchQuery ? (
          <button
            onClick={() => onSearchChange("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-65%)",
              background: "none",
              border: "none",
              color: "var(--text-dim)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseIcon size={14} color="var(--text-dim)" />
          </button>
        ) : (
          <span style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-65%)",
            color: "var(--text-dim)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}>
            <SearchIcon size={15} color="var(--text-dim)" />
          </span>
        )}
      </div>
    </div>
  );
}
