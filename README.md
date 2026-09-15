# Resource Hub

A mobile-first, crowdsourced academic portal built with React, Vite, and Supabase. Dedicated exclusively to unifying study materials, lecture notes, syllabus copies, lab manuals, and previous year question papers (PYQs) into a single, student-curated vault.

Live Deployment: [https://resource-hub-drab.vercel.app/](https://resource-hub-drab.vercel.app/)

---

## Features

- **100% Crowdsourced Study Vault:** Anyone can contribute lecture notes, syllabus copies, lab manuals, or PYQ drive links directly through the "+ Contribute" portal.
- **Community-Curated Quality (Upvotes):** No arbitrary verification badges. Quality is determined purely by student upvotes—the best and most helpful materials naturally rise to the top.
- **Instant Search & Deep Discovery:** Real-time search across subject names, codes, unit topics, years, and contributor credits.
- **Branch & Category Filtering:** Seamless filtering by engineering branches (`AI/IT`, `CSE`, `ME`, `EC/EE`, `ALL`) and material types (`Notes`, `PYQs`, `Labs`, `Syllabus`, `Practice`).
- **Direct Cloud & Drive Access:** One-tap direct access to Google Drive folders and PDF files.
- **Powered by Supabase:** Real-time PostgreSQL database with atomic upvoting, Row-Level Security, and instant contribution storage.
- **Mobile-First Cyber Aesthetic:** Deep dark violet palette, Google Fonts (Bebas Neue, IBM Plex Mono), and smooth micro-animations.

---

## Tech Stack

- **Frontend:** React 18, Vite 6
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security)
- **Styling:** Vanilla CSS with CSS Custom Properties and responsive mobile design
- **Typography:** Google Fonts (Bebas Neue, IBM Plex Mono, IBM Plex Sans)
- **Analytics:** `@vercel/analytics`
- **Deployment:** Vercel

---

## Project Structure

```text
Resource_Hub/
├── index.html              # HTML entry point and mobile meta tags
├── package.json            # Dependencies and build scripts
├── vite.config.js          # Vite configuration
├── .env                    # Supabase API URL and anon keys
├── public/                 # Static icons and assets
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Main application layout, live search, and filters
    ├── config.js           # Central configuration (branding, branches, theme)
    ├── lib/
    │   └── supabase.js     # Supabase client and query/upvoting functions
    ├── components/
    │   ├── CommunityHero.jsx   # Crowdsourcing highlight banner & stats counter
    │   ├── ContributeModal.jsx # Student material contribution modal
    │   ├── ResourceCard.jsx    # Resource row with interactive upvote button
    │   ├── VaultTab.jsx        # Subject groupings, categories & sort controls
    │   └── UI.jsx              # Shared micro-primitives
    └── styles/
        └── global.css      # Core styles, animations, upvote glow, and mobile resets
```

---

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hanu2908/Resource_Hub.git
   cd Resource_Hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Customization Guide

This project is organized so that any institution, department, or class representative can adapt it by modifying static configuration files without changing application logic.

### 1. General Branding and Theme (`src/config.js`)

Edit `src/config.js` to adjust general metadata, available tabs, branch filters, contact details, and color schemes:

```javascript
// Header text
export const APP_TITLE = "Resource Hub";
export const APP_SUBTITLE = "SKIT Jaipur · @2026 · ";

// Active tabs (set enabled: false to hide any tab)
export const TABS = [
  { id: "schedule", label: "SCHEDULE", enabled: true },
  { id: "vault", label: "VAULT", enabled: true },
  { id: "notices", label: "NOTICES", enabled: false },
  { id: "templates", label: "TEMPLATES", enabled: false },
];

// Branch filters
export const BRANCHES = [
  { label: "AI/IT", code: "IT" },
  { label: "CSE", code: "CSE" },
  { label: "ME", code: "ME" },
  { label: "EC/EE", code: "EC" },
  { label: "ALL", code: "ALL" },
];

export const DEFAULT_BRANCH = "IT";

// Contact info displayed on missing resource alerts
export const CONTACT = {
  CR_NAME: "Himanshu Saini(CR)",
  WHATSAPP_LINK: "https://wa.me/919610293931",
  GROUP_LINK: "",
};
```

Theme colors can also be customized directly within `THEME` in `src/config.js` to match institutional color schemes.

### 2. Managing Exam Schedules (`src/data/exams.js`)

Define upcoming exams inside the `EXAMS` array. Timestamps must follow ISO 8601 string format (`YYYY-MM-DDTHH:MM:SS`):

```javascript
export const EXAMS = [
  {
    id: 1,
    code: "MAUL201",
    shortName: "Maths-II",
    name: "Engineering Mathematics-II",
    date: "2026-04-27T14:30:00",
    day: "MON",
    ddmm: "27 APR",
    branch: "ALL",
    hall: "Block B - Room 204",
    audit: false,
  },
  // Add additional exam entries here
];
```

- `branch`: Set to `"ALL"` to show for every student, or specify branch codes (e.g., `"AI/IT/IOT/EC/EE"`).
- `audit`: Set to `true` to display an audit course badge.

### 3. Managing Course Resources (`src/data/vault.js`)

#### A. Configure Button Types
The `FOLDER_TYPES` array dictates which resource categories appear on subject cards:

```javascript
export const FOLDER_TYPES = [
  { key: "syllabus", label: "Syllabus" },
  { key: "notes", label: "Notes" },
  { key: "pyqs", label: "PYQs" },
  { key: "practice", label: "Practice Qs" },
  { key: "lab", label: "Lab Manual" },
];
```

#### B. Populate Subjects and Google Drive Links
Add subjects to the `VAULT` array with public view-access Google Drive folder links:

```javascript
export const VAULT = [
  {
    id: "01",
    code: "MAUL201",
    name: "Maths-II",
    branch: "ALL",
    accent: "#f5c518",
    updatedOn: "2026-04-15",
    folders: {
      syllabus: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      notes: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
      pyqs: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
      practice: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
      lab: "", // Leave empty if not applicable
    },
  },
];
```

### 4. Updating Autonomous PYQ Papers (`src/components/PYQSection.jsx`)

To update semester-level combined question paper packages, update the `papers` array inside `src/components/PYQSection.jsx`:

```javascript
const papers = [
  {
    sem: "Semester II",
    years: [
      {
        year: "2025",
        url: "https://drive.google.com/file/d/YOUR_PDF_LINK/view",
        latest: true,
      },
    ],
  },
];
```

---

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and import the repository.
3. Keep the default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
