import React, { useState } from "react";
import { createSubject } from "../lib/supabase.js";
import { BRANCHES } from "../config.js";
import { CloseIcon } from "./Icons.jsx";

const PRESET_COLORS = [
  "#8B5CF6", // Electric Violet
  "#00d4ff", // Cyan
  "#f5c518", // Amber
  "#4ade80", // Lime
  "#ff6b6b", // Coral Red
  "#ff9500", // Orange
  "#ec4899", // Pink
];

export default function AddSubjectModal({ isOpen, onClose, onSubjectAdded }) {
  const [code, setCode] = useState("");
  const [shortName, setShortName] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("ALL");
  const [accent, setAccent] = useState(PRESET_COLORS[0]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!code.trim() || !shortName.trim() || !name.trim()) {
      setErrorMsg("Please fill in the subject code, short name, and full name.");
      return;
    }

    setLoading(true);
    try {
      const created = await createSubject({
        code: code.trim(),
        short_name: shortName.trim(),
        name: name.trim(),
        branch,
        accent,
      });

      if (onSubjectAdded && created) {
        onSubjectAdded(created);
      }
      onClose();
      // Reset form
      setCode("");
      setShortName("");
      setName("");
      setBranch("ALL");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to create subject. Please check connection.");
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "26px",
              letterSpacing: "2px",
              color: "var(--accent)",
              lineHeight: 1,
            }}>
              ADD NEW SUBJECT
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-meta)",
              marginTop: "4px",
              letterSpacing: "1px",
            }}>
              EXPAND THE ACADEMIC VAULT FOR YOUR BATCH
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
          {/* Subject Code & Branch Row */}
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
                Subject Code *
              </label>
              <input
                type="text"
                placeholder="e.g. CSUL301"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="cc-input"
                required
              />
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
                Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="cc-input"
                style={{ cursor: "pointer" }}
              >
                {BRANCHES.map((b) => (
                  <option key={b.code} value={b.code} style={{ background: "#13131C", color: "#F0F0FF" }}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Name (Display Title) */}
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
              Display Short Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Data Structures"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="cc-input"
              required
            />
          </div>

          {/* Full Subject Name */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
              Full Subject Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Data Structures & Algorithms"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="cc-input"
              required
            />
          </div>

          {/* Accent Color Picker */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "9px",
              color: "var(--text-secondary)",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}>
              Card Accent Color
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setAccent(c)}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: c,
                    border: accent === c ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    boxShadow: accent === c ? `0 0 8px ${c}` : "none",
                    transform: accent === c ? "scale(1.15)" : "scale(1)",
                    transition: "all 0.15s ease",
                  }}
                />
              ))}
            </div>
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
              {loading ? "CREATING..." : "ADD SUBJECT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
