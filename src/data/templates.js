// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENT TEMPLATES
// Edit the `text` field of any template to change its content.
// Add a new object to add a new template card.
//
// tag options:  "TEMPLATE" (yellow) | "PROTOCOL" (red) | "PRIVATE" (purple)
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATES = [
  {
    key: "shortcircuit",
    label: "Short-Circuit Reply",
    tag: "PROTOCOL",
    tagColor: "#ff4444",
    desc: "When a classmate DMs for info that's on the Hub",
    text: `It's on the Hub 🔗 [Your Hub Link]

Schedule → Vault → Notes / PYQs
Everything is organized there — no need to DM for this 👍`,
  },
  {
    key: "assignment",
    label: "Assignment Notice",
    tag: "TEMPLATE",
    tagColor: "#f5c518",
    desc: "Standard assignment notification for class WhatsApp",
    text: `📋 ASSIGNMENT — [Subject Name]

Due: [Date], [Time]
Mode: [Physical / Google Classroom / Drive Link]
Task: [Brief 1-line description]

No extensions. Reach out before [Deadline −12 hrs] if stuck.
— CR, CSE P2`,
  },
  {
    key: "examremind",
    label: "Exam Day Reminder",
    tag: "TEMPLATE",
    tagColor: "#f5c518",
    desc: "Morning-of reminder for exam days",
    text: `⏰ EXAM TODAY — [Subject] ([Code])

📅 [Day], [Date]
🕑 Report: 2:00 PM sharp
📝 Exam: 2:30 PM – 5:30 PM
📍 Hall: [Hall / Block]

Carry: Admit card + College ID + Stationery
— CR, CSE P2`,
  },
  {
    key: "friday",
    label: "Friday Reset Checklist",
    tag: "PRIVATE",
    tagColor: "#9b5de5",
    desc: "15-min weekly system maintenance (6:00 PM)",
    text: `FRIDAY RESET — [Date]
─────────────────────────
SWEEP  (5 min)
□ Move WhatsApp PDFs → Drive Vault
□ Rename: [Subject]_[Type]_[Source]

SYNC  (5 min)
□ Google Keep → Sheets Ops Log
□ Mark completed assignments

PLAN  (5 min)
□ Block Sun 10 AM: MindLog Dev
□ Review next week's deadlines
□ Check next exam countdown`,
  },
];
