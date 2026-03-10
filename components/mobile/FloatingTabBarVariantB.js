"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

/**
 * FloatingTabBarVariantB - "Search as 5th Tab" Pattern
 * 
 * Search is the 5th tab in the nav bar.
 * When tapped, glass overlay appears with search suggestions and keyboard.
 */

// Tab bar items including search as 5th element
const TAB_ITEMS = [
  { id: "home", icon: "news-feed-home", label: "Home", path: "/m?source=tabbar" },
  { id: "groups", icon: "app-facebook-groups", label: "Groups", path: "/m/groups?source=tabbar" },
  { id: "marketplace", icon: "marketplace", label: "Marketplace", path: "/m/marketplace/vehicles?source=tabbar" },
  { id: "reels", icon: "app-facebook-reels", label: "Reels", path: "/m/reels/stranger-things-1?source=tabbar" },
];

// Default suggested queries
const DEFAULT_SUGGESTED_QUERIES = [
  "Who plays Eleven?",
  "When is Season 5 out?",
  "Best Stranger Things theories?",
];

// Search suggestion chip component
const SearchSuggestionChip = ({ query, onClick, darkMode }) => (
  <button
    className={`floating-tab-bar-b__suggestion-chip ${darkMode ? 'floating-tab-bar-b__suggestion-chip--dark' : ''}`}
    onClick={() => onClick(query)}
  >
    <Icon 
      name="gen-ai-magnifying-glass-filled" 
      size={16} 
      color="primary" 
      style={{ flexShrink: 0, color: darkMode ? '#e4e6eb' : undefined }} 
    />
    <span>{query}</span>
  </button>
);

// Tab Icon component
const TabIcon = ({ iconName, isActive }) => {
  return (
    <div className="floating-tab-bar-b__icon-stack">
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

const FloatingTabBarVariantB = ({
  placeholder = "Ask a question...",
  suggestedQueries = DEFAULT_SUGGESTED_QUERIES,
  activeTab = "home",
  isSearchExpanded = false,
  positionRelative = false, // When true, use relative positioning instead of fixed
  disableNavigation = false, // When true, don't navigate on tab click
  darkMode = false, // When true, apply dark mode styling to search overlay
  isAutoExpanded = false, // When true, search was auto-expanded (SERP landing) - hide chips/overlay
  onTabChange,
  onSearchToggle,
  onSearch,
  onBeforeNavigate, // Called before navigation with destination tab id
}) => {
  // Track if user manually tapped search (vs auto-expand on landing)
  const [userTappedSearch, setUserTappedSearch] = useState(false);
  
  // Track keyboard height for positioning above keyboard
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Track if component has mounted - skip animations on initial mount when auto-expanded
  const [hasMounted, setHasMounted] = useState(false);
  // Skip expand transition entirely - show search bar instantly on tap
  const [skipExpandTransition, setSkipExpandTransition] = useState(false);
  const skipInitialTransition = (isAutoExpanded && !hasMounted) || skipExpandTransition;
  
  // Mark as mounted after first render
  useEffect(() => {
    if (isAutoExpanded) {
      // Small delay to ensure the initial render has no transition
      const timer = setTimeout(() => setHasMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isAutoExpanded]);
  
  // Show suggestion chips only when user tapped search AND not auto-expanded from SERP
  const showSuggestionChips = userTappedSearch && !isAutoExpanded;
  const router = useRouter();
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState("idle");
  const [showInitialPlaceholder, setShowInitialPlaceholder] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const cycleIntervalRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Listen to Visual Viewport API for keyboard height changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;
    
    const handleViewportResize = () => {
      // Calculate keyboard height as difference between window height and visual viewport height
      const keyboardH = window.innerHeight - window.visualViewport.height;
      setKeyboardHeight(keyboardH > 0 ? keyboardH : 0);
    };
    
    window.visualViewport.addEventListener('resize', handleViewportResize);
    window.visualViewport.addEventListener('scroll', handleViewportResize);
    
    return () => {
      window.visualViewport.removeEventListener('resize', handleViewportResize);
      window.visualViewport.removeEventListener('scroll', handleViewportResize);
    };
  }, []);
  
  // Track previous active tab index for smooth highlight animations
  const previousActiveIndexRef = useRef(-1);
  const activeIndex = TAB_ITEMS.findIndex(t => t.id === activeTab);
  const hasValidTab = activeIndex >= 0;
  
  // Update the previous index ref when activeTab changes
  useEffect(() => {
    // Store the current index as previous for the next change
    return () => {
      previousActiveIndexRef.current = activeIndex;
    };
  }, [activeIndex]);

  // Prefetch all tab routes for faster navigation
  useEffect(() => {
    if (!disableNavigation) {
      TAB_ITEMS.forEach(tab => {
        router.prefetch(tab.path);
      });
    }
  }, [router, disableNavigation]);

  // Reset state when search is closed
  useEffect(() => {
    if (!isSearchExpanded) {
      setCurrentSuggestionIndex(0);
      setAnimationPhase("idle");
      setShowInitialPlaceholder(true);
      setSearchQuery("");
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
      return;
    }
  }, [isSearchExpanded]);

  // Cycle through suggestions when search is expanded
  useEffect(() => {
    if (!isSearchExpanded) {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
      return;
    }

    // Start cycling after initial delay
    const initialTimer = setTimeout(() => {
      setAnimationPhase("exiting");
      setTimeout(() => {
        setShowInitialPlaceholder(false);
        setAnimationPhase("entering");
        setTimeout(() => setAnimationPhase("idle"), 300);
      }, 300);

      cycleIntervalRef.current = setInterval(() => {
        setAnimationPhase("exiting");
        setTimeout(() => {
          setCurrentSuggestionIndex((prev) => (prev + 1) % suggestedQueries.length);
          setAnimationPhase("entering");
          setTimeout(() => setAnimationPhase("idle"), 300);
        }, 300);
      }, 3000);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, [isSearchExpanded, suggestedQueries.length]);


  const handleTabClick = (tab) => {
    if (isSearchExpanded) {
      onSearchToggle?.(false);
    }
    
    // Don't navigate if already on this tab
    if (tab.id === activeTab) return;
    
    // Call onBeforeNavigate immediately to trigger skeleton BEFORE navigation
    onBeforeNavigate?.(tab.id);
    
    onTabChange?.(tab.id);
    
    // Only navigate if navigation is enabled
    if (!disableNavigation) {
      setTimeout(() => {
        router.push(tab.path);
      }, 200);
    }
  };

  const handleSearchClick = () => {
    const willExpand = !isSearchExpanded;
    
    if (willExpand) {
      setSkipExpandTransition(true);
      onSearchToggle?.(true);
      setUserTappedSearch(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
        setSkipExpandTransition(false);
      }, 50);
    } else {
      onSearchToggle?.(false);
      setUserTappedSearch(false);
    }
  };

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSearchSubmit = () => {
    const query = showInitialPlaceholder ? placeholder : suggestedQueries[currentSuggestionIndex];
    onSearch?.(query);
  };

  const handleCloseSearch = () => {
    onSearchToggle?.(false);
    setUserTappedSearch(false);
  };

  const getPlaceholderAnimationClass = () => {
    if (animationPhase === "exiting") return "floating-tab-bar-b__placeholder--exiting";
    if (animationPhase === "entering") return "floating-tab-bar-b__placeholder--entering";
    return "";
  };

  const currentPlaceholder = showInitialPlaceholder ? placeholder : suggestedQueries[currentSuggestionIndex];

  return (
    <>
      {/* Glass overlay - only shown when search is expanded via tap (not SERP landing) */}
      {showSuggestionChips && (
        <div 
          className={`floating-tab-bar-b__overlay ${darkMode ? 'floating-tab-bar-b__overlay--dark' : ''}`}
          style={{
            opacity: isSearchExpanded ? 1 : 0,
            pointerEvents: isSearchExpanded ? "auto" : "none",
          }}
          onClick={handleCloseSearch}
        />
      )}

      {/* Search suggestions - only shown when search is expanded via tap (not SERP landing) */}
      {showSuggestionChips && (
        <div 
          className="floating-tab-bar-b__suggestions"
          style={{
            opacity: isSearchExpanded ? 1 : 0,
            transform: isSearchExpanded ? "translateY(0)" : "translateY(20px)",
            pointerEvents: isSearchExpanded ? "auto" : "none",
            bottom: isSearchExpanded && keyboardHeight > 0 ? `calc(100px + ${keyboardHeight}px)` : undefined,
          }}
        >
          {suggestedQueries.map((query, index) => (
            <SearchSuggestionChip 
              key={index} 
              query={query} 
              onClick={handleSuggestionClick}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      <div 
        className={`floating-tab-bar-b ${positionRelative ? 'floating-tab-bar-b--relative' : ''} ${darkMode ? 'floating-tab-bar-b--dark' : ''}`}
        style={{
          bottom: isSearchExpanded && keyboardHeight > 0 ? `${keyboardHeight}px` : undefined,
          transition: 'bottom 0.1s ease-out',
        }}
      >
        {/* Content container */}
        <div className="floating-tab-bar-b__content">
          <div className="floating-tab-bar-b__row">
            {/* Tab Bar - visible when search is collapsed */}
            <div 
              className="floating-tab-bar-b__tabs"
              style={{
                transform: isSearchExpanded ? "translateX(-120%)" : "translateX(0)",
                opacity: isSearchExpanded ? 0 : 1,
                pointerEvents: isSearchExpanded ? "none" : "auto",
                transition: skipInitialTransition ? "none" : undefined,
              }}
            >
              {/* Animated highlight indicator - slides between tabs, fades when appearing/disappearing */}
              <div 
                className="floating-tab-bar-b__highlight"
                style={{
                  // Use current position if valid, otherwise use previous position (prevents sliding from -100%)
                  transform: `translateX(${hasValidTab ? activeIndex * 100 : (previousActiveIndexRef.current >= 0 ? previousActiveIndexRef.current * 100 : 0)}%)`,
                  // Fade in/out based on whether there's a valid active tab
                  opacity: hasValidTab ? 1 : 0,
                }}
              />
              
              {TAB_ITEMS.map((tab) => (
                <button
                  key={tab.id}
                  className={`floating-tab-bar-b__tab ${tab.id === activeTab ? "floating-tab-bar-b__tab--active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  <div className="floating-tab-bar-b__tab-icon">
                    <TabIcon iconName={tab.icon} isActive={tab.id === activeTab} />
                  </div>
                </button>
              ))}

              {/* Search Tab Icon - part of the regular tabs */}
              <button
                className={`floating-tab-bar-b__tab floating-tab-bar-b__tab--search`}
                onClick={handleSearchClick}
              >
                <div className="floating-tab-bar-b__tab-icon">
                  <div className="floating-tab-bar-b__icon-stack">
                    <Icon
                      name="gen-ai-magnifying-glass-outline"
                      size={24}
                      color="primary"
                      style={{ 
                        display: "block",
                        opacity: 1,
                        color: "#080809",
                      }}
                    />
                  </div>
                </div>
              </button>
            </div>

            {/* Expanded Search Bar with actual input */}
            <div 
              className={`floating-tab-bar-b__search-bar ${darkMode ? 'floating-tab-bar-b__search-bar--dark' : ''}`}
              style={{
                transform: isSearchExpanded ? "translateX(0)" : "translateX(120%)",
                opacity: isSearchExpanded ? 1 : 0,
                pointerEvents: isSearchExpanded ? "auto" : "none",
                transition: skipInitialTransition ? "none" : undefined,
              }}
            >
              {/* Search input wrapper with rotating placeholder for SERP landing */}
              <div className="floating-tab-bar-b__search-input-wrapper">
                {/* Actual search input - not directly tappable, keyboard triggered via search icon */}
                <input
                  ref={searchInputRef}
                  type="text"
                  className={`floating-tab-bar-b__search-input ${darkMode ? 'floating-tab-bar-b__search-input--dark' : ''}`}
                  placeholder={showSuggestionChips ? placeholder : ""}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      onSearch?.(searchQuery);
                    }
                  }}
                  style={{ pointerEvents: 'none' }}
                  readOnly
                />
                {/* Rotating placeholder for SERP landing (when no suggestion chips) */}
                {!showSuggestionChips && !searchQuery && (
                  <div className={`floating-tab-bar-b__placeholder ${getPlaceholderAnimationClass()} ${darkMode ? 'floating-tab-bar-b__placeholder--dark' : ''}`}>
                    {currentPlaceholder}
                  </div>
                )}
              </div>

              {/* Submit button - fires with typed query or current rotating suggestion */}
              <button
                className={`floating-tab-bar-b__submit-btn ${darkMode ? 'floating-tab-bar-b__submit-btn--dark' : ''}`}
                onClick={() => {
                  const effectiveQuery = searchQuery.trim()
                    || (showInitialPlaceholder ? placeholder : suggestedQueries?.[currentSuggestionIndex])
                    || placeholder;
                  onSearch?.(effectiveQuery);
                }}
              >
                <Icon
                  name="arrow-up-filled"
                  size={12}
                  color="active"
                  style={{ display: "block", color: "#0866ff" }}
                />
              </button>
            </div>

            {/* X Close Circle - separate 52px circle, same styling as search circle */}
            <button
              className={`floating-tab-bar-b__close-circle ${darkMode ? 'floating-tab-bar-b__close-circle--dark' : ''}`}
              onClick={handleCloseSearch}
              style={{
                transform: isSearchExpanded ? "translateX(0) scale(1)" : "translateX(100px) scale(0.8)",
                opacity: isSearchExpanded ? 1 : 0,
                pointerEvents: isSearchExpanded ? "auto" : "none",
                transition: skipInitialTransition ? "none" : undefined,
              }}
            >
              <Icon
                name="nav-cross-outline"
                size={24}
                color="primary"
                style={{ display: "block", color: darkMode ? "#e4e6eb" : "#080809" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingTabBarVariantB;
