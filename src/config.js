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
  bgPage: "#0A0A0F", // deep dark, blue-violet tinted — not flat black
  bgCard: "#13131C", // card surfaces
  bgHover: "#1A1A28", // hover state

  // Borders
  borderFaint: "#1C1C2E", // barely visible, purple-tinted
  borderMid: "#2A2A40", // standard borders
  borderStrong: "#6B6B9A", // visible text on hover

  // Text
  textPrimary: "#F0F0FF", // near-white with cool tint
  textSecondary: "#9090B8", // muted purple-grey
  textDim: "#4A4A6A", // very faint labels
  textMeta: "#6060A0", // header subtitl

  // Accent — the dominant brand colour
  accent: "#8B5CF6", // electric violet ← the whole vibe
  accentFaint: "rgba(139, 92, 246, 0.08)",
  accentGlow: "rgba(139, 92, 246, 0.04)",

  // Status colours

  statusLive: "#4ADE80", // bright lime green
  statusUrgent: "#F43F5E", // rose red — softer than pure red
  statusWarn: "#FB923C", // orange
  statusAudit: "#A78BFA", // light violet for audit badge
};

// ─── 5. COUNTDOWN COLOUR THRESHOLDS ───────────────────────────────────────────
// Days remaining → colour shown on the schedule screen.

export const CD_THRESHOLDS = [
  { maxDays: 0, color: "#F43F5E" }, // today    → rose
  { maxDays: 3, color: "#FB923C" }, // ≤ 3 days → orange
  { maxDays: 7, color: "#FBBF24" }, // ≤ 7 days → amber
  { maxDays: Infinity, color: "#4A4A6A" }, // further  → dim
];
