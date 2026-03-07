"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

// ============================================
// CONSTANTS
// ============================================

// Tab bar items (without search - search is a separate morphing element)
const TAB_ITEMS = [
  { id: "home", icon: "news-feed-home", label: "Home", path: "/m?source=tabbar" },
  { id: "groups", icon: "app-facebook-groups", label: "Groups", path: "/m/groups?source=tabbar" },
  { id: "marketplace", icon: "marketplace", label: "Marketplace", path: "/m/marketplace/vehicles?source=tabbar" },
  { id: "reels", icon: "app-facebook-reels", label: "Reels", path: "/m/reels/stranger-things-1?source=tabbar" },
];

// Default suggested queries - can be overridden via props
const DEFAULT_SUGGESTED_QUERIES = [
  "Who plays Eleven?",
  "When is Season 5 out?",
  "Best Stranger Things theories?",
  "Hawkins lab explained",
  "Vecna's origin story",
];

// Animation timing constants
const INITIAL_DELAY = 2000; // Time before first transition
const CYCLE_INTERVAL = 3000; // Time between suggestion cycles

// Tab Icon component - renders both variants for instant switching
const TabIcon = ({ iconName, isActive }) => {
  return (
    <div className="floating-tab-bar__icon-stack">
      {/* Outline icon - shown when inactive */}
      <Icon
        name={`${iconName}-outline`}
        size={24}
        color="primary"
        style={{ 
          display: "block",
          position: "absolute",
          opacity: isActive ? 0 : 1,
          transition: "opacity 150ms ease-out"
        }}
      />
      {/* Filled icon - shown when active */}
      <Icon
        name={`${iconName}-filled`}
        size={24}
        color="active"
        style={{ 
          display: "block",
          opacity: isActive ? 1 : 0,
          transition: "opacity 150ms ease-out"
        }}
      />
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const FloatingTabBar = ({
  searchQuery = "",
  placeholder = "Ask a question...",
  suggestedQueries = DEFAULT_SUGGESTED_QUERIES,
  activeTab = "marketplace",
  initialSearchExpanded = true,
  forceExpanded = null, // When set, forces the search to expand/collapse
  pathname = "", // Current pathname to trigger updates
  searchConducted = false, // External signal that a search was conducted
  isLoading = false, // Loading state from parent
  currentSearchQuery = "", // The query currently being searched
  disableNavigation = false, // When true, don't navigate on tab click
  positionRelative = false, // When true, use relative positioning instead of fixed
  darkMode = false, // When true, apply dark mode styling
  onSearch,
  onSuggestionTap,
  onTabChange,
  onToggle,
}) => {
  const router = useRouter();
  
  // If forceExpanded is true, always start expanded
  const [isSearchExpanded, setIsSearchExpanded] = useState(forceExpanded === true ? true : initialSearchExpanded);
  const [hasSearched, setHasSearched] = useState(searchConducted);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // Sync expanded state when forceExpanded changes
  useEffect(() => {
    if (forceExpanded === true) {
      setIsSearchExpanded(true);
    } else if (forceExpanded === false) {
      setIsSearchExpanded(false);
    }
  }, [forceExpanded]);
  
  // Animation state for sequenced collapse
  const [isCollapseAnimating, setIsCollapseAnimating] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(true);

  // Prefetch all tab routes for faster navigation
  useEffect(() => {
    TAB_ITEMS.forEach(tab => {
      router.prefetch(tab.path);
    });
  }, [router]);

  // Update hasSearched when external searchConducted prop changes
  useEffect(() => {
    if (searchConducted) {
      setHasSearched(true);
    }
  }, [searchConducted]);
  
  // Placeholder animation states
  const [showInitialPlaceholder, setShowInitialPlaceholder] = useState(true);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle' | 'exiting' | 'entering'
  const cycleIntervalRef = useRef(null);

  // Initial transition: "Ask a question..." -> first suggestion
  useEffect(() => {
    if (!isSearchExpanded) return;
    
    const initialTimer = setTimeout(() => {
      // Start exit animation for initial placeholder
      setAnimationPhase('exiting');
      
      // After exit animation completes, switch to suggestions
      setTimeout(() => {
        setShowInitialPlaceholder(false);
        setAnimationPhase('entering');
        
        // Reset to idle after enter animation
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 300);
      }, 300);
    }, INITIAL_DELAY);

    return () => clearTimeout(initialTimer);
  }, [isSearchExpanded]);

  // Cycle through suggestions every 3 seconds
  useEffect(() => {
    if (!isSearchExpanded || showInitialPlaceholder) return;
    
    cycleIntervalRef.current = setInterval(() => {
      // Start exit animation
      setAnimationPhase('exiting');
      
      // After exit, update index and start enter animation
      setTimeout(() => {
        setCurrentSuggestionIndex((prev) => 
          (prev + 1) % suggestedQueries.length
        );
        setAnimationPhase('entering');
        
        // Reset to idle after enter animation
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 300);
      }, 300);
    }, CYCLE_INTERVAL);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, [isSearchExpanded, showInitialPlaceholder, suggestedQueries.length]);

  // Reset animation state when search collapses/expands
  useEffect(() => {
    if (!isSearchExpanded) {
      // Reset to initial state when collapsed
      setShowInitialPlaceholder(true);
      setCurrentSuggestionIndex(0);
      setAnimationPhase('idle');
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    }
  }, [isSearchExpanded]);

  const handleToggle = () => {
    if (isSearchExpanded) {
      // Collapsing: sequenced animation
      // Phase 1: Fade out the notice
      if (hasSearched && !isLoading) {
        setIsCollapseAnimating(true);
        setNoticeVisible(false);
        
        // Phase 2: After notice fades (0.2s), collapse the search bar
        setTimeout(() => {
          setIsSearchExpanded(false);
          onToggle?.(false);
          setIsCollapseAnimating(false);
          // Reset notice visibility for next time
          setNoticeVisible(true);
        }, 200);
      } else {
        // No notice visible, collapse immediately
        setIsSearchExpanded(false);
        onToggle?.(false);
      }
    } else {
      // Expanding: immediate
      setIsSearchExpanded(true);
      onToggle?.(true);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(true);
    onToggle?.(true);
  };

  // Handle tab click with navigation
  const handleTabClick = (tab) => {
    // Don't navigate if already on this tab
    if (tab.id === activeTab) return;
    
    // Update local state for highlight animation
    onTabChange?.(tab.id);
    
    // Only navigate if navigation is enabled
    if (!disableNavigation) {
      // Navigate after a brief delay for the highlight to animate
      setTimeout(() => {
        router.push(tab.path);
      }, 200);
    }
  };

  // Get the current placeholder text to display
  // When loading, show the searched query; otherwise show cycling suggestions
  const currentPlaceholderText = isLoading && currentSearchQuery
    ? currentSearchQuery
    : (showInitialPlaceholder 
        ? placeholder 
        : suggestedQueries[currentSuggestionIndex]);

  // Get animation class based on current phase
  const getPlaceholderAnimationClass = () => {
    if (animationPhase === 'exiting') return 'floating-tab-bar__placeholder--exiting';
    if (animationPhase === 'entering') return 'floating-tab-bar__placeholder--entering';
    return '';
  };

  // Determine if search should be shown as expanded
  // forceExpanded takes priority over internal state
  const showExpanded = forceExpanded === true ? true : isSearchExpanded;

  return (
    <div className={`floating-tab-bar ${positionRelative ? 'floating-tab-bar--relative' : ''} ${darkMode ? 'floating-tab-bar--dark' : ''}`}>
      {/* Gradient protection overlay */}
      <div className="floating-tab-bar__protection" />
      
      {/* Content container */}
      <div className="floating-tab-bar__content">
        <div className="floating-tab-bar__row">
          {/* Tab Bar - visible when search is collapsed */}
          <div 
            className="floating-tab-bar__tabs"
            style={{
              transform: showExpanded ? "translateX(-120%)" : "translateX(0)",
              opacity: showExpanded ? 0 : 1,
              pointerEvents: showExpanded ? "none" : "auto",
            }}
          >
            {/* Animated highlight indicator */}
            <div 
              className="floating-tab-bar__highlight"
              style={{
                transform: `translateX(${TAB_ITEMS.findIndex(t => t.id === activeTab) * 100}%)`
              }}
            />
            {TAB_ITEMS.map((tab) => (
              <button
                key={tab.id}
                className={`floating-tab-bar__tab ${tab.id === activeTab ? 'floating-tab-bar__tab--active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                <div className="floating-tab-bar__tab-icon">
                  <TabIcon iconName={tab.icon} isActive={tab.id === activeTab} />
                </div>
              </button>
            ))}
          </div>

          {/* Search Circle - visible when search is collapsed */}
          <button
            className="floating-tab-bar__search-circle"
            onClick={handleSearchIconClick}
            style={{
              transform: showExpanded ? "translateX(120%)" : "translateX(0)",
              opacity: showExpanded ? 0 : 1,
              pointerEvents: showExpanded ? "none" : "auto",
            }}
          >
            <Icon
              name="gen-ai-magnifying-glass-outline"
              size={24}
              color="primary"
              style={{ display: "block" }}
            />
          </button>

          {/* Search Bar - visible when search is expanded */}
          <div 
            className={`floating-tab-bar__search-bar ${isLoading ? 'floating-tab-bar__search-bar--loading' : ''}`}
            style={{
              transform: showExpanded ? "translateX(0)" : "translateX(120%)",
              opacity: showExpanded ? 1 : 0,
              pointerEvents: showExpanded ? "auto" : "none",
            }}
          >
            <div className="floating-tab-bar__search-icon">
              <Icon
                name="gen-ai-magnifying-glass-filled"
                size={20}
                color="secondary"
                style={{ display: "block" }}
              />
            </div>
            <div className="floating-tab-bar__search-input-wrapper">
              <input
                type="text"
                className="floating-tab-bar__placeholder-container floating-tab-bar__real-input"
                placeholder={currentPlaceholderText}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    setHasSearched(true);
                    if (onSuggestionTap) onSuggestionTap(inputValue.trim());
                    else if (onSearch) onSearch(inputValue.trim());
                  }
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            <button
              className="floating-tab-bar__submit-btn"
              onClick={() => {
                setHasSearched(true);
                onSearch?.(searchQuery);
              }}
            >
              <Icon
                name="arrow-up-filled"
                size={12}
                color="disabled"
                style={{ display: "block" }}
              />
            </button>
          </div>

          {/* X Close Circle - visible when search is expanded */}
          <button
            className="floating-tab-bar__close-circle"
            onClick={handleToggle}
            style={{
              transform: showExpanded ? "translateX(0) scale(1)" : "translateX(100px) scale(0.8)",
              opacity: showExpanded ? 1 : 0,
              pointerEvents: showExpanded ? "auto" : "none",
            }}
          >
            <Icon
              name="nav-cross-outline"
              size={24}
              color="primary"
              style={{ display: "block" }}
            />
          </button>
        </div>

        {/* Questions remaining notice - only shown after loading completes */}
        {showExpanded && hasSearched && !isLoading && (
          <div className={`floating-tab-bar__questions-notice ${!noticeVisible ? 'floating-tab-bar__questions-notice--hidden' : ''}`}>
            <span className="floating-tab-bar__questions-count">3 questions left.</span>
            {" "}
            <button className="floating-tab-bar__questions-link">Log in</button>
            {" for unlimited questions."}
          </div>
        )}
      </div>

      {/* Home indicator */}
      <div className="floating-tab-bar__home-indicator">
        <div className="floating-tab-bar__home-handle" />
      </div>
    </div>
  );
};

export default FloatingTabBar;
