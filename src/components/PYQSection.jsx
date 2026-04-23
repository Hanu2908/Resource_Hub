// PYQSection.jsx
// Drop this component into your homepage JSX where you want the PYQ section to appear.
// Usage: import PYQSection from './PYQSection'; then add <PYQSection /> in your JSX.

const papers = [
  {
    year: "2025",
    label: "End-Term 2025",
    tag: "Latest",
        url: "https://drive.google.com/file/d/1c7ftZiYwfONKj6A1-fzmOpGvp_H5IT45/view",
  },
  {
    year: "2024",
    label: "End-Term 2024",
    tag: null,
        url: "https://drive.google.com/file/d/166eiJJ6V9yHRblj63jCP0OtL8PwScaFB/view",
  },
  {
    year: "2023",
    label: "End-Term 2023",
    tag: null,
        url: "https://drive.google.com/file/d/1yqfWLdrd338SLxqf-l-0P7LAigSokPf3/view",
  },
];

export default function PYQSection() {
  return (
    <section style={styles.section}>
      <div style={styles.heading}>
        <h2 style={styles.title}>Previous Year Papers</h2>
        <p style={styles.subtitle}>2-End-term question papers — all subjects combined</p>
      </div>

      <div style={styles.grid}>
        {papers.map((paper) => (
          <a
            key={paper.year}
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* PDF icon */}
            <div style={styles.iconWrap}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
                <line x1="9" y1="17" x2="15" y2="17"/>
                <polyline points="9 9 10 9"/>
              </svg>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.cardTop}>
                <span style={styles.year}>{paper.label}</span>
                {paper.tag && <span style={styles.badge}>{paper.tag}</span>}
              </div>
              <span style={styles.openLabel}>
                Open PDF
                <svg style={{ marginLeft: 4 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "2rem 0",
    maxWidth: "720px",
    margin: "0 auto",
    fontFamily: "inherit",
  },
  heading: {
    marginBottom: "1.25rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "inherit",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.85rem",
    color: "gray",
    marginTop: "0.25rem",
    marginBottom: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color 0.15s ease, transform 0.15s ease",
    cursor: "pointer",
  },
  iconWrap: {
    flexShrink: 0,
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#555",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    minWidth: 0,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  year: {
    fontSize: "0.9rem",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  badge: {
    fontSize: "0.7rem",
    fontWeight: "600",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "1px 7px",
    borderRadius: "20px",
    letterSpacing: "0.02em",
  },
  openLabel: {
    fontSize: "0.75rem",
    color: "gray",
    display: "flex",
    alignItems: "center",
  },
};
