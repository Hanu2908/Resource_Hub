import { useState, useEffect, useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { APP_TITLE, APP_SUBTITLE, BRANCHES, DEFAULT_BRANCH, THEME } from "./config.js";
import { getSubjects, getResources, upvoteResource } from "./lib/supabase.js";
import CommunityHero from "./components/CommunityHero.jsx";
import VaultTab from "./components/VaultTab.jsx";
import ContributeModal from "./components/ContributeModal.jsx";
import AddSubjectModal from "./components/AddSubjectModal.jsx";
import { ShareIcon } from "./components/Icons.jsx";

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg-page", theme.bgPage);
  root.style.setProperty("--bg-card", theme.bgCard);
  root.style.setProperty("--bg-hover", theme.bgHover);
  root.style.setProperty("--border-faint", theme.borderFaint);
  root.style.setProperty("--border-mid", theme.borderMid);
  root.style.setProperty("--border-strong", theme.borderStrong);
  root.style.setProperty("--text-primary", theme.textPrimary);
  root.style.setProperty("--text-secondary", theme.textSecondary);
  root.style.setProperty("--text-dim", theme.textDim);
  root.style.setProperty("--text-meta", theme.textMeta);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-faint", theme.accentFaint);
  root.style.setProperty("--accent-glow", theme.accentGlow);
  root.style.setProperty("--status-live", theme.statusLive);
  root.style.setProperty("--status-urgent", theme.statusUrgent);
  root.style.setProperty("--status-warn", theme.statusWarn);
  root.style.setProperty("--status-audit", theme.statusAudit);
}

function ShareButton() {
  if (typeof navigator === "undefined" || !navigator.share) return null;
  return (
    <button
      onClick={() =>
        navigator.share({
          title: "Resource Hub — SKIT Academic Vault",
          text: "Crowdsourced notes, PYQs and study materials for SKIT",
          url: window.location.href,
        }).catch(() => {})
      }
      style={{
        background: "none",
        border: "1px solid var(--border-mid)",
        cursor: "pointer",
        color: "var(--text-primary)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "10px",
        fontWeight: "500",
        letterSpacing: "1px",
        padding: "4px 9px",
        minHeight: "28px",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <ShareIcon size={12} color="var(--text-primary)" />
      <span>SHARE</span>
    </button>
  );
}

export default function App() {
  const [branch, setBranch] = useState(DEFAULT_BRANCH);
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("upvotes");
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [upvotedMap, setUpvotedMap] = useState({});

  // Initialize theme & load persistent upvotes from localStorage
  useEffect(() => {
    applyTheme(THEME);
    try {
      const stored = localStorage.getItem("rh_upvotes");
      if (stored) {
        setUpvotedMap(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch live subjects and resources from Supabase
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [subs, res] = await Promise.all([getSubjects(), getResources()]);
        setSubjects(subs);
        setResources(res);
      } catch (err) {
        console.error("Failed to load study materials:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Handle upvote
  const handleUpvote = async (resourceId) => {
    if (upvotedMap[resourceId]) return;

    // Optimistic UI update
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r))
    );

    const nextUpvoted = { ...upvotedMap, [resourceId]: true };
    setUpvotedMap(nextUpvoted);
    try {
      localStorage.setItem("rh_upvotes", JSON.stringify(nextUpvoted));
      await upvoteResource(resourceId);
    } catch (e) {
      console.error("Failed to persist upvote:", e);
    }
  };

  // Handle new resource contributed
  const handleResourceAdded = (newResource) => {
    setResources((prev) => [newResource, ...prev]);
    const nextUpvoted = { ...upvotedMap, [newResource.id]: true };
    setUpvotedMap(nextUpvoted);
    try {
      localStorage.setItem("rh_upvotes", JSON.stringify(nextUpvoted));
    } catch (e) {
      console.error(e);
    }
  };

  // Handle new subject created
  const handleSubjectAdded = (newSubject) => {
    setSubjects((prev) => [...prev, newSubject]);
  };

  // Calculate live community stats
  const totalUpvotes = useMemo(() => {
    return resources.reduce((acc, r) => acc + (r.upvotes || 0), 0);
  }, [resources]);

  // Branch matching helper for SKIT branches
  const branchMatch = (subject, code) => {
    if (!code || code === "ALL" || !subject.branch || subject.branch === "ALL") return true;
    const sub = subject.branch.toUpperCase();
    const target = code.toUpperCase();

    if (sub.includes(target)) return true;

    if (target === "CSE-AI" && (sub.includes("AI") || sub.includes("CSE"))) return true;
    if (target === "CSE-DS" && (sub.includes("DS") || sub.includes("CSE"))) return true;
    if (target === "CSE-IOT" && (sub.includes("IOT") || sub.includes("CSE"))) return true;
    if (target === "ECE" && (sub.includes("EC") || sub.includes("ECE"))) return true;
    if (target === "EE" && (sub.includes("EE") || sub.includes("ELECTRICAL"))) return true;
    if (target === "ME" && (sub.includes("ME") || sub.includes("MECH"))) return true;
    if (target === "CE" && (sub.includes("CE") || sub.includes("CIVIL"))) return true;
    if (target === "IT" && sub.includes("IT")) return true;
    if (target === "CSE" && sub.includes("CSE")) return true;

    return false;
  };

  // Filter and sort resources
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Filter subjects by branch
    const branchSubjects = subjects.filter((s) => branchMatch(s, branch));
    const allowedSubjectIds = new Set(branchSubjects.map((s) => s.id));

    // 2. Filter resources
    let resList = resources.filter((r) => {
      // Must belong to matching subject
      if (!allowedSubjectIds.has(r.subject_id)) return false;

      // Category filter
      if (selectedCategory !== "all" && r.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (q) {
        const subject = subjects.find((s) => s.id === r.subject_id);
        const matchTitle = r.title?.toLowerCase().includes(q);
        const matchSubject =
          subject?.name?.toLowerCase().includes(q) ||
          subject?.short_name?.toLowerCase().includes(q) ||
          subject?.code?.toLowerCase().includes(q);
        const matchContributor = r.contributed_by?.toLowerCase().includes(q);
        const matchYear = r.year?.toLowerCase().includes(q);
        return matchTitle || matchSubject || matchContributor || matchYear;
      }

      return true;
    });

    // 3. Sort resources
    if (sortBy === "upvotes") {
      resList.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (sortBy === "newest") {
      resList.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    // Keep only subjects that have matching resources
    const activeSubjectIds = new Set(resList.map((r) => r.subject_id));
    const activeSubjects = branchSubjects.filter((s) => activeSubjectIds.has(s.id));

    return {
      subjects: activeSubjects,
      resources: resList,
    };
  }, [subjects, resources, branch, selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Analytics />

      <div style={{
        maxWidth: "480px",
        margin: "0 auto",
        background: "var(--bg-page)",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}>
        {/* ── HEADER ── */}
        <header style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10, 10, 15, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid var(--accent)",
          padding: "12px 16px 10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "28px",
                letterSpacing: "2.5px",
                color: "var(--accent)",
                lineHeight: 1,
              }}>
                {APP_TITLE}
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "9px",
                color: "var(--text-meta)",
                letterSpacing: "1px",
                marginTop: "3px",
                textTransform: "uppercase",
              }}>
                {APP_SUBTITLE}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShareButton />
            </div>
          </div>
        </header>

        {/* ── BRANCH SELECTOR ── */}
        <div style={{
          display: "flex",
          gap: "6px",
          padding: "8px 16px",
          borderBottom: "1px solid var(--border-faint)",
          overflowX: "auto",
          background: "var(--bg-page)",
        }}>
          {BRANCHES.map((b) => (
            <button
              key={b.code}
              className={`branch-btn${branch === b.code ? " active" : ""}`}
              onClick={() => setBranch(b.code)}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* ── COMMUNITY HERO & SEARCH ── */}
        <CommunityHero
          totalResources={resources.length}
          totalUpvotes={totalUpvotes}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenContribute={() => setIsContributeOpen(true)}
          onOpenAddSubject={() => setIsAddSubjectOpen(true)}
        />

        {/* ── MAIN STUDY VAULT ── */}
        {loading ? (
          <div style={{
            padding: "40px 16px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px",
            color: "var(--text-meta)",
            letterSpacing: "1.5px",
          }}>
            SYNCING VAULT FROM SUPABASE...
          </div>
        ) : (
          <VaultTab
            subjects={filteredData.subjects}
            resources={filteredData.resources}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onUpvote={handleUpvote}
            upvotedMap={upvotedMap}
            onOpenContribute={() => setIsContributeOpen(true)}
          />
        )}

        {/* ── CONTRIBUTE MODAL ── */}
        <ContributeModal
          isOpen={isContributeOpen}
          onClose={() => setIsContributeOpen(false)}
          subjects={subjects}
          onResourceAdded={handleResourceAdded}
          onOpenAddSubject={() => setIsAddSubjectOpen(true)}
        />

        {/* ── ADD SUBJECT MODAL ── */}
        <AddSubjectModal
          isOpen={isAddSubjectOpen}
          onClose={() => setIsAddSubjectOpen(false)}
          onSubjectAdded={handleSubjectAdded}
        />
      </div>
    </>
  );
}