"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import MobileHeader from "../../components/mobile/MobileHeader";
import FloatingTabBarVariantB from "../../components/mobile/FloatingTabBarVariantB";
import { topicsData } from "./_data/topicsData";

// Tab order for determining transition direction
const TAB_ORDER = ['home', 'groups', 'marketplace', 'reels'];

// Determine which tab is active based on pathname
function getActiveTabFromPath(pathname) {
  if (pathname?.startsWith('/m/reels')) return 'reels';
  if (pathname?.startsWith('/m/marketplace')) return 'marketplace';
  if (pathname?.startsWith('/m/groups')) return 'groups';
  return 'home';
}

// Check if current page is a marketplace PDP (product detail page)
function isMarketplacePDP(pathname) {
  // Match /m/marketplace/[id] but not /m/marketplace/vehicles or other category pages
  // Handle both with and without trailing slash
  const normalizedPath = pathname?.replace(/\/$/, ''); // Remove trailing slash
  const match = normalizedPath?.match(/^\/m\/marketplace\/([^/]+)$/);
  if (!match) return false;
  const id = match[1];
  // Exclude known category pages
  return id !== 'vehicles' && id !== 'share';
}

// Check if current page is a profile page that should have expanded search
function isProfilePageWithExpandedSearch(pathname) {
  return pathname?.startsWith('/m/profile/rio-theatre');
}

// Check if current page is a groups permalink page (from Google SEO)
function isGroupsPermalinkPage(pathname) {
  // Match /m/groups/[groupId]/posts/[postId]
  return pathname?.match(/^\/m\/groups\/[^/]+\/posts\/[^/]+/);
}

// Check if current page is an explore topic page (FB explore experience with header/nav)
function isExploreTopicPage(pathname) {
  // Match /m/explore/[topic] but not /m/explore
  return pathname?.startsWith('/m/explore/') && pathname !== '/m/explore/' && pathname !== '/m/explore';
}

// Check if current page is the aggregation SERP page (standalone SEO landing)
function isAggregationSerpPage(pathname) {
  // Match exactly /m/aggregation or /m/aggregation/
  const normalizedPath = pathname?.replace(/\/$/, '');
  return normalizedPath === '/m/aggregation';
}

// Check if current page is an aggregation topic page (FB aggregation experience)
function isAggregationTopicPage(pathname) {
  // Match /m/aggregation/[topic] but not /m/aggregation
  return pathname?.startsWith('/m/aggregation/') && pathname !== '/m/aggregation/' && pathname !== '/m/aggregation';
}

// Marketplace PDP suggested queries
const MARKETPLACE_PDP_QUERIES = [
  "Is this item authentic?",
  "What's a fair price for this?",
  "How to spot fakes?",
  "Best way to ship collectibles?",
  "Should I buy this now or wait?",
];

// Webster Hall profile page suggested queries
const RIO_THEATRE_QUERIES = [
  "Sabrina Carpenter concert tickets",
  "Upcoming shows at Webster Hall",
  "Webster Hall NYC events this week",
  "Best concerts in East Village NYC",
  "Webster Hall hours and location",
];

// Groups permalink page suggested queries (Stranger Things themed)
const GROUPS_STRANGER_THINGS_QUERIES = [
  "Who dies in the Stranger Things finale?",
  "What happens to Eleven in Season 5?",
  "Stranger Things Season 5 release dates",
  "Will Byers Upside Down theories",
  "Vecna final battle predictions",
];

// Aggregation topic page suggested queries
const AGGREGATION_TOPIC_QUERIES = [
  "Who plays Eleven?",
  "When is Season 5 out?",
  "Best Stranger Things theories?",
];

export default function MobileLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isHomePage = pathname === '/m' || pathname === '/m/';
  const isLoginPage = pathname === '/m/login' || pathname === '/m/login/';
  const isSearchPage = pathname?.startsWith('/m/search');
  const isSerpPage = pathname?.startsWith('/m/serp');
  const isReelsPage = pathname?.startsWith('/m/reels');
  const isMessagesSharePage = pathname?.startsWith('/m/messages-share');
  const isMarketplaceSharePage = pathname?.startsWith('/m/marketplace-share');
  const isFeedVideoPage = pathname?.startsWith('/m/feed-video');
  const isNavComparisonPage = pathname?.startsWith('/m/nav-comparison');
  const isPDPPage = isMarketplacePDP(pathname);
  
  // Check if coming from Google SEO
  const isFromGoogle = searchParams?.get('source') === 'google';
  
  // Check if coming from aggregation page
  const isFromAggregation = searchParams?.get('fromAggregation') === 'true';
  
  // Check if search should stay expanded (from related answers navigation)
  const keepSearchExpanded = searchParams?.get('keepSearchExpanded') === 'true';
  
  // Topic-aware suggested queries derived from localStorage.selectedTopic
  const [topicSuggestedQueries, setTopicSuggestedQueries] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const topicId = localStorage.getItem('selectedTopic');
    if (topicId && topicsData[topicId]) {
      const topic = topicsData[topicId];
      // Build suggestions from the topic's search results titles / AI overview context
      const queries = [
        topic.searchQuery,
        ...(topic.searchResults?.slice(0, 2).map(r => r.title) || []),
      ].filter(Boolean).slice(0, 3);
      setTopicSuggestedQueries(queries);
    }
  }, [pathname]);

  // Determine active tab from URL
  const activeTabFromPath = getActiveTabFromPath(pathname);
  const [activeTab, setActiveTab] = useState(activeTabFromPath);
  const [reelsTabBarVisible, setReelsTabBarVisible] = useState(!isFromGoogle);
  const [feedVideoTabBarVisible, setFeedVideoTabBarVisible] = useState(false);
  
  // Page transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null); // destination tab name for skeleton selection
  const [isReelsTransition, setIsReelsTransition] = useState(false);
  const previousTabRef = useRef(activeTabFromPath);
  const isFromTabBar = searchParams?.get('source') === 'tabbar';
  
  // Check if coming from messages link share (session storage check)
  useEffect(() => {
    if (isReelsPage && typeof window !== 'undefined') {
      const cameFromMessages = sessionStorage.getItem('cameFromMessages');
      if (cameFromMessages === 'true') {
        // Hide tab bar initially when coming from messages (will show on second video)
        setReelsTabBarVisible(false);
      }
    }
  }, [isReelsPage]);
  
  // Track if search should be expanded (for PDP pages, profile pages, aggregation/explore topic pages, or any page from Google SERP or aggregation)
  const isGroupsPage = isGroupsPermalinkPage(pathname);
  const isAggregationTopicPageCheck = isAggregationTopicPage(pathname);
  const isExploreTopicPageCheck = isExploreTopicPage(pathname);
  const shouldAutoExpandSearch = isPDPPage || isProfilePageWithExpandedSearch(pathname) || isFromGoogle || isFromAggregation || keepSearchExpanded || isAggregationTopicPageCheck || isExploreTopicPageCheck;
  const [searchExpanded, setSearchExpanded] = useState(shouldAutoExpandSearch);
  
  // Sync search state when navigating to a page that should auto-expand
  useEffect(() => {
    if (shouldAutoExpandSearch) {
      setSearchExpanded(true);
    }
  }, [shouldAutoExpandSearch, pathname]);
  
  // Track previous tab for transitions - update BEFORE pathname changes trigger new render
  useEffect(() => {
    // On mount, set the initial previous tab
    if (typeof window !== 'undefined' && !sessionStorage.getItem('previousMobileTab')) {
      sessionStorage.setItem('previousMobileTab', activeTabFromPath);
    }
  }, []);

  // Update active tab and search state when pathname changes
  // Also trigger page transitions when navigating via tab bar
  useEffect(() => {
    const newTab = getActiveTabFromPath(pathname);
    // Get previous tab from session storage for reliable cross-navigation tracking
    const previousTab = typeof window !== 'undefined' 
      ? sessionStorage.getItem('previousMobileTab') || 'home'
      : 'home';
    
    // Check if this is a tab bar navigation
    if (isFromTabBar && previousTab !== newTab) {
      // Check if transitioning to reels (dark mode transition)
      const goingToReels = newTab === 'reels';
      
      setTransitionDirection(newTab); // Store destination tab for skeleton selection
      setIsReelsTransition(goingToReels);
      setIsTransitioning(true);
      
      // End transition after animation completes (skeleton fade out)
      setTimeout(() => {
        setIsTransitioning(false);
        setIsReelsTransition(false);
      }, 400);
    }
    
    setActiveTab(newTab);
    // Store current tab as previous for next navigation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('previousMobileTab', newTab);
    }
    previousTabRef.current = newTab;
    
    const shouldExpand = isMarketplacePDP(pathname) || isProfilePageWithExpandedSearch(pathname) || (isGroupsPermalinkPage(pathname) && (searchParams?.get('source') === 'google' || searchParams?.get('fromAggregation') === 'true' || searchParams?.get('keepSearchExpanded') === 'true')) || isAggregationTopicPage(pathname) || isExploreTopicPage(pathname);
    setSearchExpanded(shouldExpand);
  }, [pathname, searchParams, isFromTabBar]);

  // Enable Safari liquid glass effect on all mobile pages
  // This is more reliable than :has() selectors which can have timing issues
  useEffect(() => {
    // Add class immediately on mount for transparent backgrounds
    document.body.classList.add('mobile-transparent-mode');
    document.documentElement.classList.add('mobile-transparent-mode');
    
    // Remove theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const originalColor = metaThemeColor?.getAttribute('content');
    
    if (metaThemeColor) {
      metaThemeColor.remove();
    }
    
    // Cleanup on unmount (when leaving mobile pages)
    return () => {
      document.body.classList.remove('mobile-transparent-mode');
      document.documentElement.classList.remove('mobile-transparent-mode');
      
      if (originalColor) {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'theme-color';
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', originalColor);
      }
    };
  }, []);

  // Listen for tab bar visibility changes from Reels page
  useEffect(() => {
    const handleTabBarVisibility = (event) => {
      setReelsTabBarVisible(event.detail.visible);
    };
    
    window.addEventListener('reelsTabBarVisibility', handleTabBarVisibility);
    return () => window.removeEventListener('reelsTabBarVisibility', handleTabBarVisibility);
  }, []);

  // Listen for tab bar visibility changes from Feed Video page
  useEffect(() => {
    const handleFeedVideoTabBarVisibility = (event) => {
      setFeedVideoTabBarVisible(event.detail.visible);
    };
    
    window.addEventListener('feedVideoTabBarVisibility', handleFeedVideoTabBarVisibility);
    return () => window.removeEventListener('feedVideoTabBarVisibility', handleFeedVideoTabBarVisibility);
  }, []);

  // Reset visibility when navigating away from reels or when source changes
  useEffect(() => {
    if (!isReelsPage) {
      setReelsTabBarVisible(true);
    } else if (isFromGoogle) {
      setReelsTabBarVisible(false);
    } else {
      setReelsTabBarVisible(true);
    }
  }, [isReelsPage, isFromGoogle]);

  // Reset feed video tab bar visibility when navigating away
  useEffect(() => {
    if (!isFeedVideoPage) {
      setFeedVideoTabBarVisible(false);
    }
  }, [isFeedVideoPage]);

  // Add scroll detection for Chrome tab bar positioning
  // Only applies 12px bottom margin when user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      if (scrolled) {
        document.body.classList.add('has-scrolled');
      } else {
        document.body.classList.remove('has-scrolled');
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('has-scrolled');
    };
  }, []);

  // Check if on aggregation SERP page (Google search results)
  const isAggregationSerp = isAggregationSerpPage(pathname);
  
  // Don't show tab bar on share pages, nav comparison page, aggregation SERP page
  // For Reels from Google, defer to reelsTabBarVisible state
  // For Feed Video page, defer to feedVideoTabBarVisible state
  // Aggregation and Explore topic pages DO show tab bar (with search auto-expanded)
  const showTabBar = !isLoginPage && !isMessagesSharePage && !isMarketplaceSharePage && !isSearchPage && !isSerpPage && !isAggregationSerp && !isNavComparisonPage &&
    (isReelsPage ? reelsTabBarVisible : (isFeedVideoPage ? feedVideoTabBarVisible : true));

  // Determine which skeleton to show based on destination tab
  // transitionDirection now stores the destination tab name
  const isTransitioningToReels = isTransitioning && transitionDirection === 'reels';
  const isTransitioningToMarketplace = isTransitioning && transitionDirection === 'marketplace';
  const isTransitioningToHome = isTransitioning && transitionDirection === 'home';
  const isTransitioningToGroups = isTransitioning && transitionDirection === 'groups';

  // Build transition class names - no push animations, just fade with skeleton
  const layoutClassName = [
    'mobile-layout',
    isReelsTransition && isTransitioning ? 'mobile-layout--reels-transition' : '',
  ].filter(Boolean).join(' ');
  
  const mainClassName = [
    'mobile-main',
    isTransitioning ? 'mobile-main--tab-transition' : '',
  ].filter(Boolean).join(' ');

  // Marketplace skeleton loader component - content only, header and tab bar stay persistent
  const MarketplaceSkeleton = () => (
    <div className="marketplace-skeleton">
      {/* Category pills */}
      <div className="marketplace-skeleton__categories">
        <div className="marketplace-skeleton__pill marketplace-skeleton__pill--active" />
        <div className="marketplace-skeleton__pill" />
        <div className="marketplace-skeleton__pill" />
        <div className="marketplace-skeleton__pill" />
      </div>
      
      {/* Product grid - 3 rows of 2 to fill the page */}
      <div className="marketplace-skeleton__grid">
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
        <div className="marketplace-skeleton__product">
          <div className="marketplace-skeleton__product-image" />
          <div className="marketplace-skeleton__product-price" />
          <div className="marketplace-skeleton__product-title" />
        </div>
      </div>
    </div>
  );

  // Light page skeleton (for home/groups) - content only, header and tab bar stay persistent
  const LightPageSkeleton = () => (
    <div className="light-skeleton">
      {/* Feed items - multiple posts to fill full page */}
      <div className="light-skeleton__feed">
        <div className="light-skeleton__post">
          <div className="light-skeleton__post-header">
            <div className="light-skeleton__avatar" />
            <div className="light-skeleton__post-meta">
              <div className="light-skeleton__name" />
              <div className="light-skeleton__time" />
            </div>
          </div>
          <div className="light-skeleton__post-title" />
          <div className="light-skeleton__post-body" />
          <div className="light-skeleton__post-body light-skeleton__post-body--short" />
          {/* Comments skeleton */}
          <div className="light-skeleton__comments">
            <div className="light-skeleton__comment">
              <div className="light-skeleton__comment-avatar" />
              <div className="light-skeleton__comment-content">
                <div className="light-skeleton__comment-name" />
                <div className="light-skeleton__comment-text" />
              </div>
            </div>
            <div className="light-skeleton__comment">
              <div className="light-skeleton__comment-avatar" />
              <div className="light-skeleton__comment-content">
                <div className="light-skeleton__comment-name" />
                <div className="light-skeleton__comment-text light-skeleton__comment-text--short" />
              </div>
            </div>
          </div>
        </div>
        <div className="light-skeleton__post">
          <div className="light-skeleton__post-header">
            <div className="light-skeleton__avatar" />
            <div className="light-skeleton__post-meta">
              <div className="light-skeleton__name" />
              <div className="light-skeleton__time" />
            </div>
          </div>
          <div className="light-skeleton__post-title" />
          <div className="light-skeleton__post-body" />
          <div className="light-skeleton__post-body light-skeleton__post-body--short" />
          {/* Comments skeleton */}
          <div className="light-skeleton__comments">
            <div className="light-skeleton__comment">
              <div className="light-skeleton__comment-avatar" />
              <div className="light-skeleton__comment-content">
                <div className="light-skeleton__comment-name" />
                <div className="light-skeleton__comment-text" />
              </div>
            </div>
          </div>
        </div>
        <div className="light-skeleton__post">
          <div className="light-skeleton__post-header">
            <div className="light-skeleton__avatar" />
            <div className="light-skeleton__post-meta">
              <div className="light-skeleton__name" />
              <div className="light-skeleton__time" />
            </div>
          </div>
          <div className="light-skeleton__post-title" />
          <div className="light-skeleton__post-body" />
          {/* Comments skeleton */}
          <div className="light-skeleton__comments">
            <div className="light-skeleton__comment">
              <div className="light-skeleton__comment-avatar" />
              <div className="light-skeleton__comment-content">
                <div className="light-skeleton__comment-name" />
                <div className="light-skeleton__comment-text" />
              </div>
            </div>
            <div className="light-skeleton__comment">
              <div className="light-skeleton__comment-avatar" />
              <div className="light-skeleton__comment-content">
                <div className="light-skeleton__comment-name" />
                <div className="light-skeleton__comment-text light-skeleton__comment-text--short" />
              </div>
            </div>
          </div>
        </div>
        <div className="light-skeleton__post">
          <div className="light-skeleton__post-header">
            <div className="light-skeleton__avatar" />
            <div className="light-skeleton__post-meta">
              <div className="light-skeleton__name" />
              <div className="light-skeleton__time" />
            </div>
          </div>
          <div className="light-skeleton__post-title" />
          <div className="light-skeleton__post-body" />
          <div className="light-skeleton__post-body light-skeleton__post-body--short" />
        </div>
      </div>
    </div>
  );

  // Home skeleton loader - matches actual home feed layout
  const HomeSkeleton = () => (
    <div className="home-skeleton">
      {/* Hero image placeholder */}
      <div className="home-skeleton__hero-image" />

      {/* Text pairing placeholder */}
      <div className="home-skeleton__text-pairing">
        <div className="home-skeleton__headline" />
        <div className="home-skeleton__body-text" />
      </div>

      {/* Button group placeholder */}
      <div className="home-skeleton__buttons">
        <div className="home-skeleton__btn-primary" />
        <div className="home-skeleton__btn-secondary" />
      </div>
    </div>
  );

  // Reels skeleton loader component - full screen for dark mode transition
  const ReelsSkeleton = () => (
    <div className="reels-skeleton">
      {/* Dark background */}
      <div className="reels-skeleton__bg" />
      
      {/* Bottom gradient */}
      <div className="reels-skeleton__gradient" />
      
      {/* Right side action buttons skeleton */}
      <div className="reels-skeleton__actions">
        <div className="reels-skeleton__action-btn" />
        <div className="reels-skeleton__action-btn" />
        <div className="reels-skeleton__action-btn" />
        <div className="reels-skeleton__action-btn reels-skeleton__action-btn--small" />
      </div>
      
      {/* Creator info skeleton */}
      <div className="reels-skeleton__creator">
        <div className="reels-skeleton__avatar" />
        <div className="reels-skeleton__creator-info">
          <div className="reels-skeleton__name" />
          <div className="reels-skeleton__desc" />
          <div className="reels-skeleton__desc reels-skeleton__desc--short" />
        </div>
      </div>
      
      {/* Progress bar skeleton */}
      <div className="reels-skeleton__progress" />
    </div>
  );

  return (
    <div className={layoutClassName}>
      {/* Skeleton loaders - shown during transitions */}
      {isTransitioningToReels && <ReelsSkeleton />}
      {isTransitioningToMarketplace && <MarketplaceSkeleton />}
      {isTransitioningToHome && <HomeSkeleton />}
      {isTransitioningToGroups && <LightPageSkeleton />}
      {/* Safari liquid glass + Reels overrides - combined to avoid nested styled-jsx error */}
      <style jsx global>{`
        /* Enable native document scrolling for Safari liquid glass effect */
        html {
          background: transparent !important;
          background-color: transparent !important;
          overflow-y: auto !important;
          height: auto !important;
        }
        body {
          background: transparent !important;
          background-color: transparent !important;
          overflow-y: auto !important;
          height: auto !important;
          position: relative !important;
        }
        #__next {
          background: transparent !important;
          background-color: transparent !important;
          height: auto !important;
          min-height: 100vh;
          min-height: 100dvh;
        }
        .layout-container {
          background: transparent !important;
          background-color: transparent !important;
          position: relative !important;
          overflow: visible !important;
          height: auto !important;
          min-height: 100vh;
          min-height: 100dvh;
        }
        .frame,
        .frame--logged-out,
        #frame {
          background: transparent !important;
          background-color: transparent !important;
          position: relative !important;
          top: 0 !important;
          overflow: visible !important;
          height: auto !important;
          min-height: 100vh;
          min-height: 100dvh;
        }
        [class^="page--"] {
          background: transparent !important;
          background-color: transparent !important;
          overflow: visible !important;
          height: auto !important;
        }
        /* All page containers must be transparent for Safari liquid glass */
        .mobile-post-page,
        .mobile-profile-page,
        .mobile-groups-page,
        .mobile-marketplace-page,
        .mobile-search-page,
        .mobile-reels-page,
        .feed-video-page,
        [class$="-page"] {
          background: transparent !important;
          background-color: transparent !important;
        }
        .mobile-layout {
          background: transparent !important;
          overflow: visible !important;
          min-height: 100vh;
          min-height: 100dvh;
        }
        .mobile-main {
          background: transparent !important;
          overflow: visible !important;
        }
        /* Tab bar must touch viewport edge - no gaps */
        .floating-tab-bar-b {
          bottom: 0 !important;
          background: transparent !important;
          padding-bottom: 0 !important;
        }
        /* Reels page tab bar overrides */
        .reels-floating-tab-bar .floating-tab-bar-b {
          animation: none !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .reels-floating-tab-bar .floating-tab-bar-b__tab--active svg {
          color: #FFFFFF !important;
        }
        
        /* Page transition animations - fade in with skeleton */
        @keyframes fadeInContent {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Tab transition - content fades in after skeleton */
        .mobile-main--tab-transition {
          animation: fadeInContent 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
          opacity: 0;
        }
        
        /* Dark mode overlay for reels transition - removed, using skeleton instead */
        
        /* Reels Skeleton Loader */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes skeletonFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .reels-skeleton {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000;
          z-index: 99; /* Below tab bar (100) but above content */
          opacity: 1;
          visibility: visible;
        }
        
        .reels-skeleton__bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(110deg, #000 0%, #1a1a1a 50%, #000 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .reels-skeleton__gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to top, rgba(40,40,40,0.8) 0%, transparent 100%);
        }
        
        .reels-skeleton__actions {
          position: absolute;
          right: 12px;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 140px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        
        .reels-skeleton__action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(110deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .reels-skeleton__action-btn--small {
          width: 36px;
          height: 36px;
        }
        
        .reels-skeleton__creator {
          position: absolute;
          left: 12px;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 100px);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        
        .reels-skeleton__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(110deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        
        .reels-skeleton__creator-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .reels-skeleton__name {
          width: 120px;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(110deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .reels-skeleton__desc {
          width: 200px;
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(110deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .reels-skeleton__desc--short {
          width: 140px;
        }
        
        .reels-skeleton__progress {
          position: absolute;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 68px);
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.2);
        }

        /* Marketplace Skeleton Styles - content area only, header/tabbar stay persistent */
        .marketplace-skeleton {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 56px); /* Below header */
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99; /* Below tab bar (100) but above content */
          background: #fff;
          opacity: 1;
          visibility: visible;
          padding-bottom: 100px; /* Space for tab bar */
          overflow-y: auto;
          overflow-x: hidden;
        }
        .marketplace-skeleton__categories {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          overflow-x: hidden;
        }
        .marketplace-skeleton__pill {
          width: 80px;
          height: 32px;
          border-radius: 16px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .marketplace-skeleton__pill--active {
          width: 100px;
          background: linear-gradient(110deg, #e4e6eb 0%, #d8dadf 50%, #e4e6eb 100%);
          background-size: 200% 100%;
        }
        .marketplace-skeleton__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 8px 16px;
        }
        .marketplace-skeleton__product {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .marketplace-skeleton__product-image {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 8px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .marketplace-skeleton__product-price {
          width: 60px;
          height: 16px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .marketplace-skeleton__product-title {
          width: 100%;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        /* Light Page Skeleton Styles (Home/Groups) - content area only */
        .light-skeleton {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 56px); /* Below header */
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99; /* Below tab bar (100) but above content */
          background: #fff;
          opacity: 1;
          visibility: visible;
          padding-bottom: 100px; /* Space for tab bar */
          overflow-y: auto;
          overflow-x: hidden;
        }
        .light-skeleton__feed {
          display: flex;
          flex-direction: column;
        }
        .light-skeleton__post {
          background: #fff;
          padding: 12px 16px;
          border-bottom: 1px solid #e4e6eb;
        }
        .light-skeleton__post-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .light-skeleton__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .light-skeleton__post-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .light-skeleton__name {
          width: 120px;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__time {
          width: 80px;
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__post-title {
          width: 200px;
          height: 16px;
          border-radius: 4px;
          margin-bottom: 8px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__post-body {
          width: 100%;
          height: 14px;
          border-radius: 4px;
          margin-bottom: 6px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__post-body--short {
          width: 70%;
        }
        .light-skeleton__comments {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e4e6eb;
        }
        .light-skeleton__comment {
          display: flex;
          gap: 8px;
        }
        .light-skeleton__comment-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .light-skeleton__comment-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .light-skeleton__comment-name {
          width: 80px;
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__comment-text {
          width: 100%;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .light-skeleton__comment-text--short {
          width: 60%;
        }

        /* Home skeleton styles */
        .home-skeleton {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 48px);
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .home-skeleton__hero-image {
          width: 233px;
          height: 328px;
          border-radius: 16px;
          margin-top: 66px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .home-skeleton__text-pairing {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 0 24px;
        }
        .home-skeleton__headline {
          width: 200px;
          height: 34px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .home-skeleton__body-text {
          width: 280px;
          height: 40px;
          border-radius: 4px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .home-skeleton__buttons {
          position: fixed;
          bottom: calc(81px + env(safe-area-inset-bottom, 0px));
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px;
        }
        .home-skeleton__btn-primary {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(110deg, #cce0ff 0%, #a8cbff 50%, #cce0ff 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        .home-skeleton__btn-secondary {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(110deg, #f0f2f5 0%, #e4e6eb 50%, #f0f2f5 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
      {!isHomePage && !isLoginPage && !isSearchPage && !isSerpPage && !isReelsPage && !isMessagesSharePage && !isMarketplaceSharePage && !isNavComparisonPage && !isAggregationSerp && (
        <MobileHeader 
          showCloseButton={(isGroupsPage || isPDPPage) && isFromAggregation}
        />
      )}
      <main className={mainClassName} style={{ opacity: isTransitioning ? 0 : 1, visibility: isTransitioning ? 'hidden' : 'visible' }}>
        {children}
      </main>
      {showTabBar && (
        <div className={isReelsPage && !searchExpanded ? 'reels-floating-tab-bar reels-floating-tab-bar--visible' : ''} style={isReelsPage && !searchExpanded ? {
          '--primary-text': '#E4E6EB',
          '--primary-icon': '#E4E6EB',
          '--secondary-text': '#B0B3B8',
          '--secondary-icon': '#B0B3B8',
          '--placeholder-text': '#B0B3B8',
          '--nav-bar-background': '#242526',
          '--surface-background': '#242526',
          '--accent': '#2D88FF',
        } : undefined}>
          <FloatingTabBarVariantB 
            activeTab={(isProfilePageWithExpandedSearch(pathname) || isGroupsPage || isAggregationTopicPageCheck || isExploreTopicPageCheck) ? null : activeTab}
            onTabChange={setActiveTab}
            onBeforeNavigate={(destTab) => {
              // Start transition immediately BEFORE navigation to prevent content flash
              setTransitionDirection(destTab);
              setIsReelsTransition(destTab === 'reels');
              setIsTransitioning(true);
            }}
            isSearchExpanded={searchExpanded}
            onSearchToggle={(expanded) => {
              setSearchExpanded(expanded);
            }}
            onSearch={(query) => {
              const topicId = typeof window !== 'undefined' ? (localStorage.getItem('selectedTopic') || 'strangerthings') : 'strangerthings';
              setSearchExpanded(false);
              window.scrollTo(0, 0);
              router.push(`/m/serp?q=${encodeURIComponent(query)}&topic=${topicId}`);
            }}
            darkMode={false}
            isAutoExpanded={shouldAutoExpandSearch}
            placeholder={
              isProfilePageWithExpandedSearch(pathname) 
                ? "Search Webster Hall" 
                : (isGroupsPage && (isFromGoogle || isFromAggregation))
                  ? "Ask about Stranger Things..."
                  : (isAggregationTopicPageCheck || isExploreTopicPageCheck)
                    ? "Ask a question..."
                    : "Ask a question..."
            }
            suggestedQueries={
              isProfilePageWithExpandedSearch(pathname) 
                ? RIO_THEATRE_QUERIES 
                : (isGroupsPage && (isFromGoogle || isFromAggregation))
                  ? GROUPS_STRANGER_THINGS_QUERIES
                  : (isAggregationTopicPageCheck || isExploreTopicPageCheck)
                    ? undefined // No rotating suggestions on aggregation pages, just static placeholder
                    : (isPDPPage 
                        ? MARKETPLACE_PDP_QUERIES 
                        : (topicSuggestedQueries || undefined))
            }
          />
        </div>
      )}
    </div>
  );
}

