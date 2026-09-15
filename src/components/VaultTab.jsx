import React from "react";
import ResourceCard from "./ResourceCard.jsx";
import { SectionLabel, FooterNote } from "./UI.jsx";
import { CONTACT } from "../config.js";
import { FolderIcon, ArrowUpIcon, ExternalLinkIcon, PlusIcon } from "./Icons.jsx";

const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "notes", label: "NOTES" },
  { id: "pyqs", label: "PYQS" },
  { id: "lab", label: "LABS" },
  { id: "syllabus", label: "SYLLABUS" },
  { id: "practice", label: "PRACTICE" },
];

function ContactCard() {
  const hasWhatsApp = CONTACT.WHATSAPP_LINK && CONTACT.WHATSAPP_LINK !== "https://wa.me/91XXXXXXXXXX";
  const hasGroup = CONTACT.GROUP_LINK && CONTACT.GROUP_LINK !== "";

  return (
    <div style={{
      border: "1px dashed var(--border-mid)",
      borderRadius: "10px",
      padding: "16px",
      marginTop: "20px",
      background: "rgba(255, 255, 255, 0.01)",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "9px",
        color: "var(--accent)",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        marginBottom: "4px",
      }}>
        Missing Notes or Broken Link?
      </div>
      <div style={{
        fontSize: "13px",
        color: "var(--text-secondary)",
        lineHeight: 1.4,
        marginBottom: "12px",
      }}>
        Can’t find materials for your unit? Let us know or submit your handwritten notes to earn community upvotes.
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {hasWhatsApp && (
          <a
            href={CONTACT.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              padding: "8px 14px",
              border: "1.5px solid var(--accent)",
              color: "var(--accent)",
              background: "var(--accent-faint)",
              textDecoration: "none",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>DM {CONTACT.CONTACT_NAME || "Himanshu"}</span>
            <ExternalLinkIcon size={12} />
          </a>
        )}

        {hasGroup && (
          <a
            href={CONTACT.GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              padding: "8px 14px",
              border: "1.5px solid var(--border-mid)",
              color: "var(--text-secondary)",
              background: "transparent",
              textDecoration: "none",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Join Class WhatsApp Group</span>
            <ExternalLinkIcon size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function VaultTab({
  subjects = [],
  resources = [],
  selectedCategory = "all",
  onSelectCategory,
  sortBy = "upvotes",
  onSortChange,
  onUpvote,
  upvotedMap = {},
  onOpenContribute,
}) {
  return (
    <div style={{ padding: "0 16px 20px" }}>
      {/* Category Pills & Sorting Bar */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "14px 0 16px",
      }}>
        {/* Category horizontal scroll */}
        <div style={{
          display: "flex",
          gap: "6px",
          overflowX: "auto",
          paddingBottom: "2px",
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`cat-pill${selectedCategory === cat.id ? " active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort options */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border-faint)",
          paddingTop: "10px",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "9px",
            color: "var(--text-dim)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}>
            Showing {resources.length} resources
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-meta)",
            }}>
              SORT:
            </span>
            <button
              onClick={() => onSortChange("upvotes")}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                fontWeight: 600,
                background: "none",
                border: "none",
                color: sortBy === "upvotes" ? "var(--accent)" : "var(--text-dim)",
                cursor: "pointer",
                padding: "2px 4px",
                borderBottom: sortBy === "upvotes" ? "1.5px solid var(--accent)" : "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <ArrowUpIcon size={11} color="currentColor" />
              <span>Most Upvoted</span>
            </button>
            <span style={{ color: "var(--border-mid)", fontSize: "10px" }}>|</span>
            <button
              onClick={() => onSortChange("newest")}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                fontWeight: 600,
                background: "none",
                border: "none",
                color: sortBy === "newest" ? "var(--accent)" : "var(--text-dim)",
                cursor: "pointer",
                padding: "2px 4px",
                borderBottom: sortBy === "newest" ? "1.5px solid var(--accent)" : "none",
              }}
            >
              Newest
            </button>
          </div>
        </div>
      </div>

      {/* Subjects & Resources Listing */}
      {subjects.length === 0 ? (
        <div style={{
          padding: "40px 16px",
          textAlign: "center",
          border: "1px dashed var(--border-mid)",
          borderRadius: "8px",
          marginTop: "12px",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
            <FolderIcon size={36} color="var(--text-dim)" />
          </div>
          <div style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "20px",
            letterSpacing: "1px",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}>
            No Study Materials Found
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "16px" }}>
            Try adjusting your search query or branch filter.
          </div>
          <button
            onClick={onOpenContribute}
            className="btn-primary"
            style={{ fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <PlusIcon size={13} color="#0A0A0F" />
            <span>Drop The First Note</span>
          </button>
        </div>
      ) : (
        <div>
          {subjects.map((subject) => {
            const subjectResources = resources.filter((r) => r.subject_id === subject.id);
            if (subjectResources.length === 0) return null;

            return (
              <div
                key={subject.id}
                style={{
                  marginBottom: "20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-mid)",
                  borderRadius: "10px",
                  padding: "14px 14px 8px",
                  borderLeft: `4px solid ${subject.accent || "var(--accent)"}`,
                }}
              >
                {/* Subject Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                  borderBottom: "1px solid var(--border-faint)",
                  paddingBottom: "8px",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "22px",
                      letterSpacing: "1px",
                      color: "var(--text-primary)",
                      lineHeight: 1,
                    }}>
                      {subject.short_name}
                    </div>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "10px",
                      color: "var(--text-meta)",
                      marginTop: "2px",
                    }}>
                      {subject.code} · {subject.name}
                    </div>
                  </div>

                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    color: subject.accent || "var(--accent)",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${subject.accent || "var(--accent)"}44`,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}>
                    {subject.branch}
                  </span>
                </div>

                {/* Resource Rows for this subject */}
                <div>
                  {subjectResources.map((res) => (
                    <ResourceCard
                      key={res.id}
                      resource={res}
                      onUpvote={onUpvote}
                      isUpvoted={!!upvotedMap[res.id]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Missing notes card */}
      <ContactCard />

      <FooterNote>
        CROWDSOURCED ACADEMIC COMMONS · ALL FILES OPEN DIRECTLY IN GOOGLE DRIVE OR CLOUD STORAGE
      </FooterNote>
    </div>
  );
}
