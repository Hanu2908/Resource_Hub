// PYQSection.jsx

const MASTER_FOLDER_URL =
  "https://drive.google.com/drive/folders/1nIZSIEz39BtJq67SJtq4wVR7-qdCCdPv";

const papers = [
  {
    sem: "Semester II", latest: true,
    years: [
      { year: "2025", url: "https://drive.google.com/file/d/1c7ftZiYwfONKj6A1-fzmOpGvp_H5IT45/view", latest: true },
      { year: "2024", url: "https://drive.google.com/file/d/166eiJJ6V9yHRblj63jCP0OtL8PwScaFB/view" },
      { year: "2023", url: "https://drive.google.com/file/d/1yqfWLdrd338SLxqf-l-0P7LAigSokPf3/view" },
    ],
  },
  {
    sem: "Semester I",
    years: [
      { year: "2025", url: "https://drive.google.com/file/d/1iVXGW20dPxZLkqbWYWui8U7D9wcVZ46g/view" },
      { year: "2024", url: "https://drive.google.com/file/d/1XbWoO7-Fk0Evgo0Pyo6gssyrlPPlGvpS/view" },
      { year: "2023", url: "https://drive.google.com/file/d/1TNMqMQcQPsGm4WD13mVuuMAfGkCT5ber/view" },
    ],
  },
];

const styles = {
  section: {
    padding: "1.5rem 0",
  },
  heading: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "1.25rem",
  },
  masterBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    marginBottom: "1.5rem",
    borderRadius: "10px",
    border: "1px solid rgba(124, 58, 237, 0.5)",
    background: "rgba(124, 58, 237, 0.08)",
    textDecoration: "none",
    cursor: "pointer",
  },
  masterBtnText: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#a78bfa",
    letterSpacing: "0.03em",
  },
  masterBtnHint: {
    fontSize: "12px",
    color: "rgba(167, 139, 250, 0.5)",
  },
  semLabel: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "8px",
  },
  group: {
    marginBottom: "1.25rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    textDecoration: "none",
    transition: "border-color 0.15s, background 0.15s",
  },
  cardLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconBox: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#a78bfa",
  },
  cardSub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    marginTop: "2px",
  },
  latestBadge: {
    fontSize: "11px",
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: "20px",
    background: "rgba(34, 197, 94, 0.15)",
    color: "#4ade80",
    marginLeft: "8px",
  },
  openLink: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    flexShrink: 0,
  },
};

export default function PYQSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Previous Year Papers</h2>
      <p style={styles.subtitle}>End-term question papers — all subjects combined</p>

      {/* Master folder link */}
      
        href={MASTER_FOLDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.masterBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(124, 58, 237, 0.14)";
          e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(124, 58, 237, 0.08)";
          e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.5)";
        }}
      >
        <span style={styles.masterBtnText}>Open All Papers in Drive</span>
        <span style={styles.masterBtnHint}>View folder ↗</span>
      </a>

      {/* Per-semester groups */}
      {papers.map((group) => (
        <div key={group.sem} style={styles.group}>
          <p style={styles.semLabel}>{group.sem}</p>

          {group.years.map((paper) => (
            
              key={paper.year}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div style={styles.cardLeft}>
                <div style={styles.iconBox}>
                  {/* File icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={styles.cardTitle}>End-Term {paper.year}</span>
                    {paper.latest && (
                      <span style={styles.latestBadge}>Latest</span>
                    )}
                  </div>
                  <div style={styles.cardSub}>Open PDF</div>
                </div>
              </div>
              <span style={styles.openLink}>↗</span>
            </a>
          ))}
        </div>
      ))}
    </section>
  );
}
