"use client";

import { useState } from "react";
import FloatingTabBarVariantB from "../../../components/mobile/FloatingTabBarVariantB";
import "../../../public/styles/mobile/aggregation.scss";

// Glimmer style helper - using background shorthand to avoid React warnings
const glimmerStyle = (delay = 0) => ({
  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%) 0 0 / 200% 100%',
  animation: 'glimmer 1.5s infinite',
  animationDelay: `${delay}s`,
});

// Dark glimmer for reels
const glimmerStyleDark = (delay = 0) => ({
  background: 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%) 0 0 / 200% 100%',
  animation: 'glimmer 1.5s infinite',
  animationDelay: `${delay}s`,
});

// Wireframe content for each tab - matches actual loading states
// Search pills component - rendered separately from content
const SearchWireframePills = () => {
  const pillWidths = ['80px', '110px', '95px'];
  return (
    <div style={{ 
      position: 'fixed',
      bottom: '82px',
      left: '16px',
      zIndex: 1000,
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        alignItems: 'flex-start',
      }}>
        {pillWidths.map((width, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: '#fff',
              border: '1px solid #e4e6eb',
              borderRadius: '25px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, ...glimmerStyle(i * 0.1) }} />
            <div style={{ width, height: '12px', borderRadius: '25px', ...glimmerStyle(i * 0.1 + 0.05) }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const WireframeContent = ({ activeTab, isSearchActive }) => {
  if (isSearchActive) {
    return null; // Pills are rendered separately
  }

  switch (activeTab) {
    case "home":
      // Matches actual home feed loading state
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#fff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {/* Post cards */}
          {[0, 1, 2].map((postIndex) => (
            <div key={postIndex} style={{ borderBottom: '1px solid #e4e6eb', paddingBottom: postIndex === 0 ? '4px' : '12px' }}>
              {/* Post header */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, ...glimmerStyle(postIndex * 0.2) }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: '140px', height: '15px', borderRadius: '25px', marginBottom: '4px', ...glimmerStyle(postIndex * 0.2) }} />
                  <div style={{ width: '90px', height: '13px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2) }} />
                </div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', ...glimmerStyle(postIndex * 0.2) }} />
              </div>

              {/* Post body lines */}
              <div style={{ padding: '0 16px 12px' }}>
                {[100, 95, 70].map((width, lineIndex) => (
                  <div
                    key={lineIndex}
                    style={{
                      width: `${width}%`,
                      height: '15px',
                      borderRadius: '25px',
                      marginBottom: '6px',
                      ...glimmerStyle(postIndex * 0.2 + 0.1 + lineIndex * 0.05),
                    }}
                  />
                ))}
              </div>

              {/* Post image */}
              <div style={{ width: '100%', height: '280px', ...glimmerStyle(postIndex * 0.2 + 0.2) }} />

              {/* UFI skeleton */}
              <div style={{ display: 'flex', alignItems: 'center', height: '44px', padding: '0 16px', gap: '20px' }}>
                {[55, 40, 45].map((width, i) => (
                  <div key={i} style={{ width: `${width}px`, height: '18px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.3) }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "groups":
      // Matches actual groups loading state from app/m/groups/loading.js
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#fff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {/* Group post skeletons */}
          {[0, 1, 2].map((postIndex) => (
            <div key={postIndex} style={{ borderBottom: postIndex < 2 ? '1px solid #e4e6eb' : 'none', paddingBottom: '4px' }}>
              {/* Group header - rounded square avatar */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', flexShrink: 0, ...glimmerStyle(postIndex * 0.2) }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: '140px', height: '15px', borderRadius: '25px', marginBottom: '4px', ...glimmerStyle(postIndex * 0.2) }} />
                  <div style={{ width: '90px', height: '13px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2) }} />
                </div>
                {/* Join button skeleton */}
                <div style={{ width: '56px', height: '32px', borderRadius: '6px', ...glimmerStyle(postIndex * 0.2) }} />
              </div>

              {/* Post author */}
              <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, ...glimmerStyle(postIndex * 0.2 + 0.05) }} />
                <div style={{ width: '100px', height: '13px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.05) }} />
              </div>

              {/* Post title */}
              <div style={{ padding: '0 16px 8px' }}>
                <div style={{ width: '100%', height: '20px', borderRadius: '25px', marginBottom: '6px', ...glimmerStyle(postIndex * 0.2 + 0.1) }} />
                <div style={{ width: '70%', height: '20px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.1) }} />
                </div>

              {/* Post body lines */}
              <div style={{ padding: '0 16px 12px' }}>
                {[95, 88, 60].map((width, lineIndex) => (
                  <div
                    key={lineIndex}
                    style={{
                      width: `${width}%`,
                      height: '15px',
                      borderRadius: '25px',
                      marginBottom: '6px',
                      ...glimmerStyle(postIndex * 0.2 + 0.15 + lineIndex * 0.05),
                    }}
                  />
                ))}
              </div>

              {/* UFI skeleton */}
              <div style={{ display: 'flex', alignItems: 'center', height: '44px', padding: '0 16px', gap: '20px' }}>
                {[55, 40, 45].map((width, i) => (
                  <div key={i} style={{ width: `${width}px`, height: '18px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.3) }} />
                ))}
              </div>

              {/* Featured comment skeleton */}
              <div style={{ padding: '8px 16px 12px', display: 'flex', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, ...glimmerStyle(postIndex * 0.2 + 0.35) }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ width: '80px', height: '12px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.35) }} />
                    <div style={{ width: '24px', height: '12px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.35) }} />
                  </div>
                  <div style={{ width: '100%', height: '15px', borderRadius: '25px', marginBottom: '4px', ...glimmerStyle(postIndex * 0.2 + 0.4) }} />
                  <div style={{ width: '85%', height: '15px', borderRadius: '25px', ...glimmerStyle(postIndex * 0.2 + 0.4) }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "marketplace":
      // Matches actual marketplace loading state from app/m/marketplace/vehicles/loading.js
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#fff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          paddingTop: '48px',
        }}>
          {/* First 2 tiles - 2 column grid (1 row) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#fff' }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #e4e6eb' }}>
                {/* Image skeleton - square aspect ratio */}
                <div style={{ width: '100%', paddingTop: '100%', ...glimmerStyle(i * 0.1) }} />
                {/* Text skeleton */}
                <div style={{ padding: '12px 12px 12px' }}>
                  <div style={{ width: '100%', height: '13px', borderRadius: '25px', marginBottom: '6px', ...glimmerStyle(i * 0.1) }} />
                  <div style={{ width: '80%', height: '12px', borderRadius: '25px', ...glimmerStyle(i * 0.1) }} />
                </div>
          </div>
            ))}
          </div>

          {/* Discovery Unit (after 2 tiles) */}
          <div style={{ padding: '16px 12px 12px' }}>
            {/* Discovery Header - wide pill */}
            <div style={{ width: 'calc(100% - 96px)', height: '24px', borderRadius: '25px', marginBottom: '12px', background: '#a8d4ff' }} />
            {/* Discovery Pills - 2 rows, h-scrollable */}
            <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowX: 'auto', marginRight: '-12px', paddingRight: '12px' }}>
              {/* Row 1 */}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {['48px', '72px', '56px', '64px', '52px', '68px'].map((width, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 12px', 
                    borderRadius: '25px', 
                    border: '1px solid #a8d4ff',
                    background: '#fff',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: '#a8d4ff' }} />
                    <div style={{ width, height: '12px', borderRadius: '25px', background: '#a8d4ff' }} />
                  </div>
                ))}
              </div>
              {/* Row 2 */}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginBottom: '4px' }}>
                {['60px', '44px', '80px', '52px', '58px', '70px'].map((width, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 12px', 
                    borderRadius: '25px', 
                    border: '1px solid #a8d4ff',
                    background: '#fff',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: '#a8d4ff' }} />
                    <div style={{ width, height: '12px', borderRadius: '25px', background: '#a8d4ff' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Remaining tiles - 2 column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#fff' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #e4e6eb' }}>
                {/* Image skeleton - square aspect ratio */}
                <div style={{ width: '100%', paddingTop: '100%', ...glimmerStyle(0.6 + i * 0.1) }} />
                {/* Text skeleton */}
                <div style={{ padding: '12px 12px 12px' }}>
                  <div style={{ width: '100%', height: '13px', borderRadius: '25px', marginBottom: '6px', ...glimmerStyle(0.6 + i * 0.1) }} />
                  <div style={{ width: '80%', height: '12px', borderRadius: '25px', ...glimmerStyle(0.6 + i * 0.1) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "reels":
      // Dark mode reels skeleton - full screen dark background
      return (
        <div style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#1f2937',
          overflow: 'hidden',
        }}>

          {/* Right side action buttons skeleton */}
          <div style={{
            position: 'absolute',
            right: '12px',
            bottom: '140px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', ...glimmerStyleDark(i * 0.1) }} />
                <div style={{ width: '24px', height: '8px', borderRadius: '25px', ...glimmerStyleDark(i * 0.1 + 0.05) }} />
                </div>
              ))}
          </div>

          {/* Creator info skeleton */}
          <div style={{
            position: 'absolute',
            bottom: '140px',
            left: '16px',
            right: '60px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', ...glimmerStyleDark(0) }} />
              <div style={{ width: '80px', height: '14px', borderRadius: '25px', ...glimmerStyleDark(0.1) }} />
              <div style={{ width: '60px', height: '28px', borderRadius: '6px', ...glimmerStyleDark(0.15) }} />
            </div>
            <div style={{ width: '100%', height: '14px', borderRadius: '25px', marginBottom: '6px', ...glimmerStyleDark(0.2) }} />
            <div style={{ width: '80%', height: '14px', borderRadius: '25px', ...glimmerStyleDark(0.25) }} />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default function NavComparisonPage() {
  const [activeNavTab, setActiveNavTab] = useState("home");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleNavTabChange = (tabId) => {
    setActiveNavTab(tabId);
    setIsSearchExpanded(false);
  };

  const handleSearchToggle = (expanded) => {
    setIsSearchExpanded(expanded);
  };

  // Determine if we're in dark mode (reels tab AND search not expanded)
  const isDarkMode = activeNavTab === "reels";
  const showDarkUI = isDarkMode && !isSearchExpanded;

  return (
    <div 
      className="nav-comparison-page"
      style={showDarkUI ? { background: '#1f2937', minHeight: '100vh' } : {}}
    >
      {/* Wireframe Content Area */}
      <div className="nav-comparison-page__content" style={showDarkUI ? { background: 'transparent' } : {}}>
        <WireframeContent 
          activeTab={activeNavTab}
          isSearchActive={isSearchExpanded}
        />
      </div>

      {/* Search wireframe pills - positioned above search bar */}
      {isSearchExpanded && <SearchWireframePills />}

      {/* Floating Tab Bar - Both variants now use connected search + nav (like other pages) */}
      <FloatingTabBarVariantB
        placeholder="Ask a question..."
        activeTab={activeNavTab}
        isSearchExpanded={isSearchExpanded}
        isAutoExpanded={true}
        disableNavigation={true}
        darkMode={showDarkUI}
        onTabChange={handleNavTabChange}
        onSearchToggle={handleSearchToggle}
        onSearch={(query) => {
          console.log("Search:", query);
          setIsSearchExpanded(false);
        }}
      />

      {/* Glimmer animation keyframes */}
      <style jsx global>{`
        @keyframes glimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide suggestion chips on nav-comparison page */
        .nav-comparison-page .floating-tab-bar-b__suggestions,
        .nav-comparison-page .floating-tab-bar-b__suggestion-chip {
          display: none !important;
        }
        /* Left align ghost text in search bar */
        .nav-comparison-page .floating-tab-bar__placeholder,
        .nav-comparison-page .floating-tab-bar__placeholder-container,
        .nav-comparison-page .floating-tab-bar-b__placeholder,
        .nav-comparison-page .floating-tab-bar-b__input-wrapper {
          text-align: left !important;
          justify-content: flex-start !important;
        }
      `}</style>
    </div>
  );
}
