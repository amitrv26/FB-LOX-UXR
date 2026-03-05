"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "../../../components/Icon";
import AILoadingChip from "../../../components/mobile/AILoadingChip";
import { topicsData } from "../_data/topicsData";

// ─── Sub-components ───────────────────────────────────────────────────────────

const BookmarkIcon = () => (
  <Icon name="bookmark-outline" size={24} color="primary" style={{ display: "block" }} />
);

const FilterIcon = () => (
  <Icon name="filter-sliders-outline" size={24} color="primary" style={{ display: "block" }} />
);

const LikeIcon = () => (
  <Icon name="like-outline" size={16} color="onMedia" style={{ display: "block" }} />
);

// Verified badge – blue circle with checkmark
const VerifiedBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="12" fill="#0866ff" />
    <path d="M6 12.5l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Entity spotlight card (HCM) 
const EntityCard = ({ entity }) => (
  <div className="serp-entity-card">
    <div className="serp-entity-card__header">
      <img
        src={entity.profileImage}
        alt={entity.name}
        className="serp-entity-card__avatar"
      />
      <div className="serp-entity-card__info">
        <div className="serp-entity-card__name-row">
          <span className="serp-entity-card__name">{entity.name}</span>
          <VerifiedBadge />
          <span className="serp-entity-card__dot">·</span>
          <span className="serp-entity-card__follow">Follow</span>
        </div>
        <span className="serp-entity-card__meta">{entity.category} · {entity.followers}</span>
      </div>
    </div>
    <div className="serp-entity-card__photos">
      {entity.photos.map((url, i) => (
        <div key={i} className="serp-entity-card__photo-wrap">
          <img src={url} alt="" className="serp-entity-card__photo" />
        </div>
      ))}
    </div>
  </div>
);

// Single image card in the content grid
const GridCard = ({ card }) => (
  <div className="serp-grid-card">
    <img src={card.imageUrl} alt="" className="serp-grid-card__img" />
    {/* Top gradient + author */}
    <div className="serp-grid-card__top-gradient" />
    <div className="serp-grid-card__author">
      <span className="serp-grid-card__author-name">{card.author}</span>
      <span className="serp-grid-card__time">{card.timeAgo}</span>
    </div>
    {/* Bottom gradient + reactions */}
    <div className="serp-grid-card__bottom-gradient" />
    <div className="serp-grid-card__reactions">
      <LikeIcon />
      <span className="serp-grid-card__reaction-count">{card.reactions}</span>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SerpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const topicKey = searchParams.get("topic") || "strangerthings";
  const topic = topicsData[topicKey] || topicsData.strangerthings;

  const aiSummary = topic.aiOverview?.summary || "";
  const serpData = topic.serp || null;

  // Loading state mirrors GridViewExperience handleSuggestionTap
  const [isLoading, setIsLoading] = useState(true);
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false]);

  // Search input state for the bottom bar
  const [searchQuery, setSearchQuery] = useState(query);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Stagger sections in – same timing as GridViewExperience.handleLoadingComplete
    const delays = [0, 200, 400];
    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setSectionsVisible((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, delay);
    });
  };

  // Auto-focus the search input after the slide-up animation completes
  // so the keyboard opens naturally (mirroring the Figma prototype)
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 420); // slightly after the 380ms animation
    return () => clearTimeout(timer);
  }, []);

  // Track keyboard height via Visual Viewport API
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const handleResize = () => {
      const kbH = window.innerHeight - window.visualViewport.height;
      setKeyboardHeight(kbH > 0 ? kbH : 0);
    };
    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    return () => {
      window.visualViewport.removeEventListener("resize", handleResize);
      window.visualViewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  // Submit a new query (refresh SERP in place with loading animation)
  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    // Restart loading animation with the new query
    setSectionsVisible([false, false, false]);
    setIsLoading(true);
    router.replace(
      `/m/serp?q=${encodeURIComponent(searchQuery.trim())}&topic=${topicKey}`,
      { scroll: false }
    );
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="serp-page">
        {/* ── Navigation Bar ─────────────────────────────────────── */}
        <div className="serp-nav">
          <div className="serp-nav__query-row">
            <div className="serp-nav__loading-slot">
              {isLoading ? (
                <AILoadingChip
                  appearDelay={100}
                  finalCount={topic.serp?.entityCard?.followers || "32.1K"}
                  onLoadingComplete={handleLoadingComplete}
                />
              ) : (
                <h1 className="serp-nav__query">{query}</h1>
              )}
            </div>
            <div className="serp-nav__actions">
              <button className="serp-nav__icon-btn" aria-label="Save">
                <BookmarkIcon />
              </button>
              <button className="serp-nav__icon-btn" aria-label="Filter">
                <FilterIcon />
              </button>
            </div>
          </div>
        </div>

        {/* ── Page content ───────────────────────────────────────── */}
        <div className="serp-content">
          {/* Section 0 – AI Summary */}
          <div
            className={`serp-section serp-section--ai ${sectionsVisible[0] ? "serp-section--visible" : ""}`}
          >
            <p className="serp-ai-summary">{aiSummary}</p>
          </div>

          {/* Section 1 – Entity Spotlight */}
          {serpData?.entityCard && (
            <div
              className={`serp-section serp-section--entity ${sectionsVisible[1] ? "serp-section--visible" : ""}`}
            >
              <EntityCard entity={serpData.entityCard} />
            </div>
          )}

          {/* Section 2 – Content Grid */}
          {serpData?.contentGrid && (
            <div
              className={`serp-section serp-section--grid ${sectionsVisible[2] ? "serp-section--visible" : ""}`}
            >
              <div className="serp-grid">
                {serpData.contentGrid.map((card, i) => (
                  <GridCard key={i} card={card} />
                ))}
              </div>
              <button className="serp-see-more">
                <span>See more</span>
                <Icon name="chevron-down-filled" size={16} color="secondary" style={{ display: "block" }} />
              </button>
            </div>
          )}
        </div>

        {/* Bottom padding so content scrolls above the floating bar */}
        <div style={{ height: "100px" }} />
      </div>

      {/* Floating bar is outside .serp-page so its position:fixed
          isn't broken by the parent's transform animation */}
      <div
        className="serp-floating-bar"
        style={{
          bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : undefined,
          transition: "bottom 0.1s ease-out",
        }}
      >
        <button
          className="serp-floating-bar__back"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <Icon name="chevron-left-outline" size={24} color="primary" style={{ display: "block" }} />
        </button>
        <div className="serp-floating-bar__search">
          <Icon
            name="gen-ai-magnifying-glass-filled"
            size={20}
            color="active"
            style={{ display: "block", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            type="text"
            className="serp-floating-bar__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
            placeholder="Ask anything..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button
            className="serp-floating-bar__submit"
            onClick={handleSearchSubmit}
            aria-label="Search"
          >
            <Icon
              name="arrow-up-filled"
              size={12}
              color={searchQuery.trim() ? "active" : "disabled"}
              style={{
                display: "block",
                color: searchQuery.trim() ? "#0866ff" : "#b0b3b8",
              }}
            />
          </button>
        </div>
      </div>
    </>
  );
}
