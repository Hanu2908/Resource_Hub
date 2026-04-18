// ╔══════════════════════════════════════════════════════════════╗
// ║              CR COMMAND CENTER — CONFIG FILE                 ║
// ║   Edit THIS file to customise the app. No other file needs  ║
// ║   to be touched for branding, tabs, or colour changes.      ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── 1. HEADER TEXT ───────────────────────────────────────────────────────────
// Change these two strings to update what appears at the top of the app.

export const APP_TITLE = "Resource Hub";
export const APP_SUBTITLE = "SKIT Jaipur · @2026 · ";

// ─── 2. TABS — set enabled: false to hide a tab completely ────────────────────

export const TABS = [
  { id: "schedule", label: "SCHEDULE", enabled: true },
  { id: "vault", label: "VAULT", enabled: true },
  { id: "notices", label: "NOTICES", enabled: false }, // ← set false to hide
  { id: "templates", label: "TEMPLATES", enabled: false }, // ← set false to hide
];

// ─── 3. BRANCH FILTER OPTIONS ─────────────────────────────────────────────────

export const BRANCHES = [
  { label: "AI/IT", code: "IT" },
  { label: "CSE", code: "CSE" },
  { label: "ME", code: "ME" },
  { label: "EC/EE", code: "EC" },
  { label: "ALL", code: "ALL" },
];

export const DEFAULT_BRANCH = "IT"; // Which branch is selected on load

// ─── 3.1. CONTACT INFO ──────────────────────────────────────────────────────────
// Shown on the "File Missing?" card in the Vault tab.
//
// WHATSAPP_LINK format: "https://wa.me/91XXXXXXXXXX"
//   Replace XXXXXXXXXX with your 10-digit number. No spaces, no +.
//   Example: "https://wa.me/919876543210"
//
// GROUP_LINK: Paste your class WhatsApp group invite link here (optional).
//   Leave as "" to hide the group button.

export const CONTACT = {
  CR_NAME: "Himanshu Saini(CR)",
  WHATSAPP_LINK: "https://wa.me/919610293931", // ← replace with your number
  GROUP_LINK: "", // ← optional group link
};

// ─── 4. THEME — change colours here, nowhere else ─────────────────────────────
// These values are injected as CSS variables across the entire app.

export const THEME = {
  // Backgrounds
  bgPage: "#111111", // main page background
  bgCard: "#171717", // card / input background
  bgHover: "#0f0f0f", // subtle hover state

  // Borders
  borderFaint: "#141414", // very faint borders
  borderMid: "#1c1c1c", // standard borders
  borderStrong: "#A0A0A0", // visible borders on hover

  // Text
  textPrimary: "#ffffff", // main readable text
  textSecondary: "#B3B3B3", // muted labels, descriptions
  textDim: "#A0A0A0", // very faint labels (improved for 4.64:1 contrast)
  textMeta: "#817d7d", // header meta text (improved for 4.57:1 contrast)

  // Accent — the dominant brand colour
  accent: "#e1b000", // ← change this to repaint the whole app
  accentFaint: "rgba(245, 197, 24, 0.06)",
  accentGlow: "rgba(245, 197, 24, 0.03)",

  // Status colours
  statusLive: "#00ff88",
  statusUrgent: "#ff4444",
  statusWarn: "#ff9500",
  statusAudit: "#965aff", // improved for 4.60:1 contrast
};

// ─── 5. COUNTDOWN COLOUR THRESHOLDS ───────────────────────────────────────────
// Days remaining → colour shown on the schedule screen.

export const CD_THRESHOLDS = [
  { maxDays: 0, color: "#ff4444" }, // today    → red
  { maxDays: 3, color: "#ff9500" }, // ≤ 3 days → orange
  { maxDays: 7, color: "#f5c518" }, // ≤ 7 days → yellow (accent)
  { maxDays: Infinity, color: "#989898" }, // further  → grey
];
