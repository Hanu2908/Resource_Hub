// ─────────────────────────────────────────────────────────────────────────────
// VAULT DATA
// Each subject has a colour accent and a set of FOLDER LINKS.
//
// HOW TO ADD A DRIVE LINK:
//   1. Open the folder in Google Drive
//   2. Click Share → "Anyone with the link can view"
//   3. Copy the link and paste it as the value below
//   4. Leave as "" if you haven't uploaded anything yet
//
// HOW TO ADD A NEW FOLDER TYPE:
//   Add a new key inside `folders: {}` for every subject.
//   Then add the same key to FOLDER_TYPES below so it shows as a button.
// ─────────────────────────────────────────────────────────────────────────────

// ── FOLDER TYPES ──────────────────────────────────────────────────────────────
// Controls which buttons appear on each vault card (and in what order).
// label: what the button says
// key:   must match the key inside folders: {} below
// To hide a folder type: delete or comment out its entry here.

export const FOLDER_TYPES = [
  { key: "syllabus", label: "Syllabus" },
  { key: "notes", label: "Notes" },
  { key: "pyqs", label: "PYQs" },
  { key: "practice", label: "Practice Qs" },
  { key: "lab", label: "Lab Manual" },
];

// ── SUBJECTS ──────────────────────────────────────────────────────────────────

export const VAULT = [
  {
    id: "01",
    code: "MAUL201",
    name: "Maths-II",
    branch: "ALL",
    accent: "#f5c518",
    updatedOn: null, // ← add this line, today's date when you push

    folders: {
      syllabus:
        "https://drive.google.com/file/d/1qdyV_e2GjrcR-IHUpvf6JcNMxaetIVKA/view?usp=drive_link", // ← paste Drive link here
      notes:
        "https://drive.google.com/drive/folders/1NS_ZZXoHub-nZnuKMiAtoGNStFvwF-st?usp=drive_link",
      pyqs: "https://drive.google.com/drive/folders/1zppyhHOI1W-OtbDUjKLTfO0cEuK0-CC5?usp=drive_link",
      practice:
        "https://drive.google.com/drive/folders/1kMlhILpkHgZoMqO0OGusEC8R7V3uElZF?usp=drive_link",
      // leave "" if no lab for this subject
    },
  },
  {
    id: "02",
    code: "PHUL201",
    name: "Physics",
    branch: "AI/IT/IOT/EC/EE",
    accent: "#00d4ff",
    updatedOn: null,
    folders: {
      syllabus:
        "https://drive.google.com/file/d/11FSJy49zAQJ0Zor8vBCcKT-Uv_5lQ5ux/view?usp=drive_link",
      notes:
        "https://drive.google.com/drive/folders/1NbHemz7SOWMeT8U5673gPIl6sNjzIQ3D?usp=drive_link",
      pyqs: "https://drive.google.com/drive/folders/1OixliunIYGFW8Fbwn5wpoqV6Z_cB9cKz?usp=drive_link",
      practice:
        "https://drive.google.com/drive/folders/1bKDkvTtWbLedMyFk7SLTTatTHns_hfwH?usp=drive_link",
      lab: "https://drive.google.com/drive/folders/1OcJXLNRP4ykeO8xkVlMIUXBDQDlTwlG_?usp=drive_link",
    },
  },
  {
    id: "03",
    code: "HSUL201",
    name: "Communication Skills",
    branch: "AI/IT",
    accent: "#ff6b6b",
    updatedOn: null,
    folders: {
      syllabus:
        "https://drive.google.com/file/d/1TwqVZksEHEqVYADCQB-e3vdVUG-sd98L/view?usp=drive_link",
      notes:
        "https://drive.google.com/drive/folders/137Y6YGBD_AE0nOUzFum5zEsogAuISV-B?usp=drive_link",
      pyqs: "https://drive.google.com/drive/folders/1nWIYsMZ1hVo8cU5DK8B0PzpOurMiZBaQ?usp=drive_link",
      practice:
        "https://drive.google.com/drive/folders/1K906rbXYo3_s46N87tU_Shx3m4izVZQJ?usp=drive_link",
      lab: "https://drive.google.com/drive/folders/1elUBZyvR3jR2aH9YV3uxXWRewqBXsE12?usp=drive_link",
    },
  },
  {
    id: "04",
    code: "HSUL203",
    name: "I & E",
    branch: "ALL",
    accent: "#a8ff78",
    updatedOn: null,
    folders: {
      syllabus:
        "https://drive.google.com/file/d/1SQsWKdlaBKCOBlnsTfF12flCfHWC3Dd8/view?usp=drive_link",
      notes:
        "https://drive.google.com/drive/folders/17xV90CSELGKs-ccdDyWpNmK7moJbziw3?usp=drive_link",
      pyqs: "https://drive.google.com/drive/folders/1gPkHvCcnkzOY8IBkBGkeiDa8p6GjQET0?usp=drive_link",
      practice:
        "https://drive.google.com/drive/folders/1k0uXZt-E0D8lOMoO-RX-k_XX3mohF0Q4?usp=drive_link",
    },
  },
  {
    id: "05",
    code: "CSUL201",
    name: "OOP / C++",
    branch: "ALL",
    accent: "#ff9500",
    updatedOn: "2026-04-20",
    folders: {
      syllabus:
        "https://drive.google.com/file/d/1oMcZULribNrhMRbBj_Rzx_Qd-L_xxrOF/view?usp=drive_link",
      notes:
        "https://drive.google.com/drive/folders/1qWj6cloqtWFRHkkdOSwCGu3PLSj9Bst-?usp=drive_link",
      pyqs: "",
      practice:
        "https://drive.google.com/drive/folders/1GLTJ8vVav108dP9_sxqK6g98tObFeR0B?usp=drive_link",
      lab: "https://drive.google.com/drive/folders/17S4pPwx8q3mGdVr1pnuQ1eOvGxY466Sy?usp=drive_link",
    },
  },
  {
    id: "06",
    code: "EEUL201",
    name: "BEEE",
    branch: "AI/IT/IOT",
    accent: "#c0c0c0",
    updatedOn: "2026-04-23",
    folders: {
      syllabus: "",
      notes:
        "https://drive.google.com/drive/folders/1B_mKubgpalx-hyvPMQy5O9Fvgml9zhtd?usp=drive_link",
      pyqs: "https://drive.google.com/drive/folders/1Vstni2q9pyRf3lWr5X8NCpL_NccyUTSt?usp=drive_link",
      practice:
        "https://drive.google.com/drive/folders/1xJlsrT0Mjb-L5H9LHVGr4uqZKxrA40QK?usp=drive_link",
      lab: "https://drive.google.com/drive/folders/1uv5apDx0mxdc2pzinQAitkvBB96zaQDy?usp=drive_link",
    },
  },
  {
    id: "07",
    code: "NU99.3",
    name: "ITK",
    branch: "AI/IT/IOT/EC/EE",
    accent: "#70e000",
    updatedOn: null,
    folders: {
      syllabus:
        "https://drive.google.com/file/d/1NCGKS7haPx_9imhAfDNxIxYZD7WCDjK9/view?usp=drive_link",
      notes:
        "https://drive.google.com/file/d/1NCGKS7haPx_9imhAfDNxIxYZD7WCDjK9/view?usp=drive_link",
      pyqs: "",
      practice: "",
    },
  },
];
