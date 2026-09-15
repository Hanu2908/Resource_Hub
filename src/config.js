// ╔══════════════════════════════════════════════════════════════╗
// ║              RESOURCE HUB — CONFIG FILE                      ║
// ║   Central configuration for branding, branches & theme       ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── 1. HEADER TEXT ───────────────────────────────────────────────────────────
export const APP_TITLE = "Resource Hub";
export const APP_SUBTITLE = "SKIT Jaipur · Academic Vault · 2026";

// ─── 2. BRANCH FILTER OPTIONS ─────────────────────────────────────────────────
export const BRANCHES = [
  { label: "ALL", code: "ALL" },
  { label: "CSE", code: "CSE" },
  { label: "CSE (AI)", code: "CSE-AI" },
  { label: "CSE (DS)", code: "CSE-DS" },
  { label: "CSE (IoT)", code: "CSE-IOT" },
  { label: "IT", code: "IT" },
  { label: "ECE", code: "ECE" },
  { label: "EE", code: "EE" },
  { label: "ME", code: "ME" },
  { label: "CE", code: "CE" },
];

export const DEFAULT_BRANCH = "ALL";

// ─── 3. CONTACT INFO ──────────────────────────────────────────────────────────
export const CONTACT = {
  CONTACT_NAME: "Himanshu Saini",
  WHATSAPP_LINK: "https://wa.me/919610293931",
  GROUP_LINK: "",
};

// ─── 4. THEME ─────────────────────────────────────────────────────────────────
export const THEME = {
  bgPage: "#0A0A0F", // deep dark, blue-violet tinted
  bgCard: "#13131C", // card surfaces
  bgHover: "#1A1A28", // hover state

  // Borders
  borderFaint: "#1C1C2E",
  borderMid: "#2A2A40",
  borderStrong: "#6B6B9A",

  // Text
  textPrimary: "#F0F0FF",
  textSecondary: "#9090B8",
  textDim: "#4A4A6A",
  textMeta: "#6060A0",

  // Accent
  accent: "#8B5CF6", // electric violet
  accentFaint: "rgba(139, 92, 246, 0.08)",
  accentGlow: "rgba(139, 92, 246, 0.04)",

  // Status colours
  statusLive: "#4ADE80",
  statusUrgent: "#F43F5E",
  statusWarn: "#FB923C",
  statusAudit: "#A78BFA",
};
