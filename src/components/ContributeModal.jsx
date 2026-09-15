import React, { useState } from "react";
import { submitResource } from "../lib/supabase.js";
import { CloseIcon, PlusIcon } from "./Icons.jsx";

export default function ContributeModal({
  isOpen,
  onClose,
  subjects = [],
  onResourceAdded,
  onOpenAddSubject,
}) {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || "maths-2");
  const [category, setCategory] = useState("notes");
  const [title, setTitle] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");
  const [contributedBy, setContributedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter a title or topic name.");
      return;
    }
    if (!url.trim()) {
      setErrorMsg("Please provide a valid Google Drive or web link.");
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setErrorMsg("URL must start with http:// or https://");
      return;
    }

    setLoading(true);
    try {
      const newResource = await submitResource({
        subject_id: subjectId,
        category,
        title: title.trim(),
        unit_number: unitNumber ? parseInt(unitNumber, 10) : null,
        year: year ? year.trim() : null,
        url: url.trim(),
        file_type: url.includes("drive.google.com") ? "drive" : "link",
        contributed_by: contributedBy.trim() || "Student Contributor",
      });

      if (onResourceAdded && newResource) {
        onResourceAdded(newResource);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to submit resource. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-anim"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "20px 18px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "26px",
              letterSpacing: "2px",
              color: "var(--accent)",
              lineHeight: 1,
            }}>
              CONTRIBUTE MATERIAL
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-meta)",
              marginTop: "4px",
              letterSpacing: "1px",
            }}>
              DROP NOTES, PYQS & RESOURCES FOR YOUR BATCH
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-dim)",
              cursor: "pointer",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseIcon size={16} color="var(--text-dim)" />
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: "rgba(244, 63, 94, 0.12)",
            border: "1px solid var(--status-urgent)",
            color: "var(--status-urgent)",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            marginBottom: "12px",
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Subject Dropdown */}
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <label style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "var(--text-secondary)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}>
                Subject
              </label>
              {onOpenAddSubject && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAddSubject();
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <PlusIcon size={10} color="var(--accent)" />
                  <span>Add New Subject</span>
                </button>
              )}
            </div>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="cc-input"
              style={{ cursor: "pointer" }}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id} style={{ background: "#13131C", color: "#F0F0FF" }}>
                  {s.short_name} ({s.code}) — {s.branch}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}>
              Resource Type
            </label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[
                { id: "notes", label: "Notes" },
                { id: "pyqs", label: "PYQ" },
                { id: "lab", label: "Lab Manual" },
                { id: "syllabus", label: "Syllabus" },
                { id: "practice", label: "Practice Qs" },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`cat-pill${category === c.id ? " active" : ""}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title input */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
              Title / Topic Description *
            </label>
            <input
              type="text"
              placeholder="e.g. Unit 3 Fourier Series Handwritten Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cc-input"
              required
            />
          </div>

          {/* Unit and Year row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
            <div>
              <label style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "var(--text-secondary)",
                letterSpacing: "1px",
                display: "block",
                marginBottom: "4px",
                textTransform: "uppercase",
              }}>
                Unit (Optional)
              </label>
              <select
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                className="cc-input"
                style={{ cursor: "pointer" }}
              >
                <option value="" style={{ background: "#13131C", color: "#F0F0FF" }}>Whole Subject</option>
                <option value="1" style={{ background: "#13131C", color: "#F0F0FF" }}>Unit 1</option>
                <option value="2" style={{ background: "#13131C", color: "#F0F0FF" }}>Unit 2</option>
                <option value="3" style={{ background: "#13131C", color: "#F0F0FF" }}>Unit 3</option>
                <option value="4" style={{ background: "#13131C", color: "#F0F0FF" }}>Unit 4</option>
                <option value="5" style={{ background: "#13131C", color: "#F0F0FF" }}>Unit 5</option>
              </select>
            </div>

            <div>
              <label style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "var(--text-secondary)",
                letterSpacing: "1px",
                display: "block",
                marginBottom: "4px",
                textTransform: "uppercase",
              }}>
                Year (If PYQ)
              </label>
              <input
                type="text"
                placeholder="e.g. 2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="cc-input"
              />
            </div>
          </div>

          {/* URL Input */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
              Link (Drive / Cloud / PDF URL) *
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="cc-input"
              required
            />
          </div>

          {/* Contributor Name */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
              Your Name / Credit (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Himanshu (IT) or leave blank for Anonymous"
              value={contributedBy}
              onChange={(e) => setContributedBy(e.target.value)}
              className="cc-input"
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "SUBMITTING..." : "PUBLISH RESOURCE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
