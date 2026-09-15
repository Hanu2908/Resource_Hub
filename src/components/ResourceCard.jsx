import React, { useState } from "react";
import { ExternalLinkIcon, ArrowUpIcon } from "./Icons.jsx";

const CATEGORY_META = {
  notes: { label: "NOTES", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.12)" },
  pyqs: { label: "PYQS", color: "#FB923C", bg: "rgba(251, 146, 60, 0.12)" },
  lab: { label: "LAB", color: "#00d4ff", bg: "rgba(0, 212, 255, 0.12)" },
  syllabus: { label: "SYLLABUS", color: "#4ADE80", bg: "rgba(74, 222, 128, 0.12)" },
  practice: { label: "PRACTICE", color: "#f5c518", bg: "rgba(245, 197, 24, 0.12)" },
};

export default function ResourceCard({ resource, onUpvote, isUpvoted = false }) {
  const [upvoting, setUpvoting] = useState(false);
  const meta = CATEGORY_META[resource.category] || {
    label: resource.category?.toUpperCase() || "RESOURCE",
    color: "#a78bfa",
    bg: "rgba(167, 139, 250, 0.12)",
  };

  const handleUpvoteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpvoted || upvoting) return;

    setUpvoting(true);
    try {
      await onUpvote(resource.id);
    } finally {
      setUpvoting(false);
    }
  };

  return (
    <div className="resource-row">
      {/* Left side: Category pill, Title, Contributor */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textDecoration: "none",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "8.5px",
              fontWeight: 700,
              letterSpacing: "1px",
              color: meta.color,
              background: meta.bg,
              border: `1px solid ${meta.color}44`,
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {meta.label}
          </span>

          {resource.unit_number && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "8.5px",
                color: "var(--text-secondary)",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid var(--border-faint)",
              }}
            >
              UNIT {resource.unit_number}
            </span>
          )}

          {resource.year && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "8.5px",
                color: "#4ade80",
                background: "rgba(74, 222, 128, 0.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(74, 222, 128, 0.3)",
              }}
            >
              {resource.year}
            </span>
          )}
        </div>

        <div style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-primary)",
          lineHeight: 1.35,
          marginTop: "2px",
          wordBreak: "break-word",
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
        }}>
          <span>{resource.title}</span>
          <span style={{ display: "inline-flex", alignItems: "center", color: "var(--text-dim)", flexShrink: 0 }}>
            <ExternalLinkIcon size={12} color="var(--text-dim)" />
          </span>
        </div>

        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "9px",
          color: "var(--text-meta)",
          letterSpacing: "0.5px",
        }}>
          contributed by <span style={{ color: "var(--text-secondary)" }}>{resource.contributed_by || "Student"}</span>
        </div>
      </a>

      {/* Right side: Community Upvote Counter */}
      <button
        onClick={handleUpvoteClick}
        disabled={isUpvoted || upvoting}
        className={`upvote-btn${isUpvoted ? " upvoted" : ""}`}
        title={isUpvoted ? "You upvoted this resource" : "Upvote this resource to help classmates"}
        aria-label="Upvote resource"
      >
        <ArrowUpIcon size={13} color="currentColor" />
        <span>{resource.upvotes ?? 0}</span>
      </button>
    </div>
  );
}
