"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UseCaseBottomSheet from "../../components/mobile/UseCaseBottomSheet";
import { tokyoHotelsResults, formatTimeAgo, formatCount } from "../../_data/search/tokyoHotels";
import { marketplaceResults, marketplaceQuery, marketplaceFilters, usedBikesResults } from "../../_data/search/marketplaceData";
import { profileResults, profileQuery, quickFacts, facebookData, newsArticles, seeAlso } from "../../_data/search/profileData";
import { businessProfileResults, businessProfileQuery, businessQuickFacts, businessFacebookData, businessNewsArticles, businessSeeAlso } from "../../_data/search/businessProfileData";
import { videoResults, videoQuery } from "../../_data/search/videoData";
import { finalePredictionsResults, finalePredictionsQuery } from "../../_data/search/finalePredictionsData";
import { 
  AISparkleIcon as AISparkleIconBase, 
  CheckIcon as CheckIconBase, 
  ChevronDownIcon as ChevronDownIconBase,
  MoreIcon as MoreIconBase
} from "../../components/icons";

// Category configurations
const CATEGORIES = {
  groups: {
    name: "Groups",
    icon: "👥",
    query: "stranger things season 5 theories",
    data: tokyoHotelsResults,
  },
  aggregation: {
    name: "FB Aggregation",
    icon: "📄",
    query: "Stranger Things finale predictions",
    data: finalePredictionsResults,
  },
  profileCelebrity: {
    name: "Profile: Celebrity",
    icon: "👤",
    query: profileQuery,
    data: profileResults,
  },
  profileBusiness: {
    name: "Profile",
    icon: "🏢",
    query: businessProfileQuery,
    data: businessProfileResults,
  },
  marketplace: {
    name: "Marketplace",
    icon: "🏪",
    query: marketplaceQuery,
    data: marketplaceResults,
  },
  videoSEO: {
    name: "Video: SEO",
    icon: "🎬",
    query: videoQuery,
    data: videoResults,
  },
  videoLinkShare: {
    name: "Video: Link Share",
    icon: "🎬",
    query: videoQuery,
    data: videoResults,
    navigateTo: "/m/messages-share",
  },
  videoLinkShareFeed: {
    name: "Video: Link Share (Feed)",
    icon: "🎬",
    query: videoQuery,
    data: videoResults,
    navigateTo: "/m/messages-share-feed",
  },
  marketplaceLinkShare: {
    name: "Marketplace: Link Share",
    icon: "🏪",
    query: marketplaceQuery,
    data: marketplaceResults,
    navigateTo: "/m/marketplace-share",
  },
};

// AI Overview content for each category
const AI_OVERVIEWS = {
  groups: {
    summary: "Stranger Things Season 5 fan theories suggest Will Byers may play a key role in defeating Vecna. The finale is expected to tie together all storylines from the past four seasons.",
    expandedText: "Popular discussions include time travel theories related to the Upside Down being frozen in 1983, and speculation about which characters will survive the final battle in Hawkins.",
  },
  aggregation: {
    summary: "Stranger Things Season 5 finale predictions focus on Will Byers' special connection to the Upside Down and Eleven's potential sacrifice. Fans expect major revelations about Vecna's true origin and the Mind Flayer's role.",
    expandedText: "Popular theories suggest the Upside Down being frozen in 1983 is key to the finale, with many predicting time manipulation and at least one major character death. The Duffer Brothers promise to tie up all storylines.",
  },
  profileCelebrity: {
    summary: "Joe's Pizza is a legendary New York pizzeria known for authentic thin-crust slices. Featured in Spider-Man films, it's a must-visit spot in Greenwich Village.",
    expandedText: "Open late night, Joe's serves classic New York-style pizza with a perfectly crispy crust. Expect lines but quick service.",
  },
  profileBusiness: {
    summary: "Webster Hall is NYC's legendary live music venue in the East Village, hosting iconic concerts and unforgettable live events since 1886.",
    expandedText: "Located on E 11th St in Manhattan, Webster Hall features multiple performance spaces and has hosted everyone from the Ramones to Billie Eilish. Sabrina Carpenter's upcoming intimate show is nearly sold out.",
  },
  marketplace: {
    summary: "Stranger Things toys are highly sought after by collectors. Funko Pops and LEGO sets are the most popular, with rare chase editions fetching premium prices.",
    expandedText: "The official LEGO Stranger Things set 75810 features the Byers house that flips to reveal the Upside Down. Funko Pop collectors especially prize the glow-in-the-dark Demogorgon chase variant.",
  },
  videoSEO: {
    summary: "The Stranger Things cast has been sharing behind-the-scenes insights about the final season. Millie Bobby Brown discusses Eleven's emotional journey in recent interviews.",
    expandedText: "The Duffer Brothers hint at major revelations about the Upside Down's origin and promise a satisfying conclusion for all fan-favorite characters.",
  },
};

// Facepile avatars
const facepileAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
];

// Wrapper components for icons with Google-specific colors
const AISparkleIcon = () => <AISparkleIconBase size={16} color="#9334E6" />;
const CheckIcon = () => <CheckIconBase size={14} color="#202124" />;
const ChevronDownIcon = () => <ChevronDownIconBase size={20} color="#1a73e8" />;
const MoreIcon = () => <MoreIconBase size={20} color="#70757a" />;

// Google logo SVG
const GoogleLogo = () => (
  <svg viewBox="0 0 272 92" width="92" height="30">
    <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
    <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
    <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
    <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
    <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
    <path fill="#EA4335" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
  </svg>
);

export default function GoogleSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("groups");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  // Prefetch likely navigation destinations for faster page loads
  useEffect(() => {
    router.prefetch('/m/messages-share');
    router.prefetch('/m/marketplace-share');
    router.prefetch('/m/marketplace/vehicles');
    router.prefetch('/m/reels/stranger-things-1');
    router.prefetch('/m/profile/rio-theatre');
    router.prefetch('/m/explore/stranger-things-finale');
    router.prefetch('/m/explore/stranger-things-finale');
  }, [router]);

  // Read category from URL parameter on mount
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam && CATEGORIES[categoryParam]) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Get current category config
  const currentCategory = CATEGORIES[selectedCategory];
  const query = currentCategory.query;
  const results = currentCategory.data;

  const handleResultClick = (result) => {
    // For Groups results, route to the mobile post page with result data
    if ((selectedCategory === 'groups' || selectedCategory === 'aggregation') && result.type === 'group') {
      // Store the result data in sessionStorage for the landing page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('googleGroupResult', JSON.stringify(result));
      }
      // Route to the mobile post page with a special source param
      router.push(`/m/groups/google/posts/${result.id}?source=google`);
    } else if (selectedCategory === 'videoSEO' && result.type === 'video') {
      // For Video results, route to the reels page with video data
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('googleVideoResult', JSON.stringify(result));
      }
      // Route to the reels page with a special source param
      router.push(`/m/reels/${result.id}?source=google`);
    } else {
      router.push(result.href || "/groups");
    }
  };

  const handleCategorySelect = (category) => {
    const categoryConfig = CATEGORIES[category];
    if (categoryConfig?.navigateTo) {
      router.push(categoryConfig.navigateTo);
    } else {
      // Update both state and URL so back navigation works correctly
      setSelectedCategory(category);
      router.replace(`/google?category=${category}`, { scroll: false });
    }
    // Note: setBottomSheetOpen(false) is handled by the UseCaseBottomSheet's onClose
  };

  return (
    <div className="google-search-page">
      {/* Header */}
      <header className="google-header">
        <div className="google-header__top">
          <button 
            className="google-header__menu"
            onClick={() => setBottomSheetOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <GoogleLogo />
          <div className="google-header__avatar">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces" 
              alt="Profile"
            />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="google-search-bar">
          <svg className="google-search-bar__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="#202124">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            className="google-search-bar__query" 
            defaultValue={query}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button className="google-search-bar__clear">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#202124">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="google-tabs">
          <button className="google-tabs__tab">AI Mode</button>
          <button className="google-tabs__tab google-tabs__tab--active">All</button>
          <button className="google-tabs__tab">Images</button>
          <button className="google-tabs__tab">News</button>
          <button className="google-tabs__tab">Videos</button>
          <button className="google-tabs__tab">Short vide</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="google-results" style={{ paddingTop: '20px' }}>
        {/* Marketplace Filter Pills */}
        {selectedCategory === 'marketplace' && (
          <div>
            <div 
              style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                marginTop: '16px',
                marginLeft: '-16px',
                marginRight: '-16px', 
                marginBottom: '12px',
                padding: '0 16px',
                WebkitOverflowScrolling: 'touch'
              }}
              className="hide-scrollbar"
            >
              {['Within 8.1 km', 'In stock', 'Open now', 'Top rated'].map((filter) => (
                <button 
                  key={filter}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px 14px',
                    background: '#fff',
                    border: '1px solid #dadce0',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            {/* Location */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#1a73e8',
                }}></span>
                <span style={{ color: '#202124', fontWeight: '500' }}>Seattle, WA 98101</span>
                <span style={{ color: '#70757a' }}>·</span>
                <span style={{ color: '#1a73e8', cursor: 'pointer' }}>Choose area</span>
              </div>
            </div>
            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginTop: '4px',
              height: '4px'
            }}></div>
          </div>
        )}

        {/* AI Overview - hide for marketplace, video, and profiles */}
        {selectedCategory !== 'marketplace' && selectedCategory !== 'videoSEO' && selectedCategory !== 'videoLinkShare' && selectedCategory !== 'profileCelebrity' && selectedCategory !== 'profileBusiness' && (
          <section className="ai-overview">
            <div className="ai-overview__header">
              <AISparkleIcon />
              <span className="ai-overview__title">AI Overview</span>
              <div className="ai-overview__facepile">
                {facepileAvatars.map((avatar, idx) => (
                  <img 
                    key={idx}
                    src={avatar} 
                    alt=""
                    className="ai-overview__avatar"
                    style={{ marginLeft: idx > 0 ? '-8px' : '0' }}
                  />
                ))}
                <span className="ai-overview__more">+2</span>
              </div>
              <button className="ai-overview__menu">
                <MoreIcon />
              </button>
            </div>
            
            <div className="ai-overview__content">
              <p className="ai-overview__text">
                {AI_OVERVIEWS[selectedCategory].summary}
              </p>
              <p className="ai-overview__text">
                {AI_OVERVIEWS[selectedCategory].expandedText}
              </p>
            </div>

            <button className="ai-overview__show-more">
              <span>Show more</span>
              <ChevronDownIcon />
            </button>
            
            {/* Divider between AI Overview and Search Results */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginTop: '16px',
              marginBottom: '12px',
              height: '4px'
            }}></div>
          </section>
        )}

        {/* Marketplace - Brand picks for you */}
        {selectedCategory === 'marketplace' && (
          <section style={{ marginBottom: '12px', marginTop: '4px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '4px'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#202124',
                fontFamily: "'Product Sans', sans-serif",
                margin: 0
              }}>
                Sponsored picks
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                <MoreIcon />
              </button>
            </div>
            
            {/* Horizontal scroll product cards */}
            <div 
              style={{ 
                display: 'flex', 
                gap: '8px', 
                overflowX: 'auto', 
                margin: '0 -16px', 
                padding: '0 16px 8px',
                WebkitOverflowScrolling: 'touch'
              }}
              className="hide-scrollbar"
            >
              {results.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleResultClick(product)}
                  style={{
                    flex: '0 0 auto',
                    width: '140px',
                    cursor: 'pointer',
                    border: '1px solid #dadce0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Product Image */}
                  <div style={{ 
                    position: 'relative',
                    width: '100%',
                    height: '140px',
                    background: '#f5f5f5'
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                    {/* Discount badge */}
                    {product.discount && (
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#fff',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#202124',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {product.discount}
                      </span>
                    )}
                    {/* Nearby badge */}
                    {product.nearbyDistance && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '8px',
                      }}>
                        <span style={{
                          position: 'relative',
                          background: '#fff',
                          padding: '4px 8px',
                          borderRadius: '3px',
                          fontSize: '12px',
                          color: '#202124',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a73e8">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {product.nearbyDistance}
                        </span>
                        {/* Speech bubble caret */}
                        <div style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '12px',
                          width: 0,
                          height: 0,
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: '4px solid #fff',
                          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
                        }}></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div style={{ padding: '8px' }}>
                    {/* Product Title */}
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#1a0dab',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: '0 0 4px',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.title}
                    </p>
                    
                    {/* Price */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        color: '#202124',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#70757a',
                          textDecoration: 'line-through',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}>
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Store */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      marginBottom: '6px'
                    }}>
                      <img 
                        src={
                          product.storeName.includes('Starcourt') ? 'https://www.netflix.com/favicon.ico' :
                          product.storeName.includes('Upside Down') ? 'https://www.netflix.com/favicon.ico' :
                          product.storeName.includes('Argyle') ? 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=28&h=28&fit=crop' :
                          product.storeName.includes('Hawkins') ? 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=28&h=28&fit=crop' :
                          product.storeName.includes('Collector') ? 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=28&h=28&fit=crop' :
                          'https://www.facebook.com/favicon.ico'
                        }
                        alt=""
                        style={{ width: '14px', height: '14px', borderRadius: '2px', flexShrink: 0 }}
                      />
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#70757a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {product.storeName}
                      </span>
                    </div>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '2px',
                        fontSize: '12px',
                        color: '#70757a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        <span>{product.rating}</span>
                        <span style={{ color: '#fbbc04' }}>★★★★★</span>
                        {product.reviews && <span>({product.reviews})</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Divider after Brand picks */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginTop: '12px',
              marginBottom: '0px',
              height: '4px'
            }}></div>
          </section>
        )}

        {/* Marketplace - Bicycles for sale unit */}
        {selectedCategory === 'marketplace' && (
          <section style={{ marginBottom: '12px' }}>
            {/* Header with Facebook icon and URL */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src="https://www.facebook.com/images/fb_icon_325x325.png" 
                  alt="Facebook" 
                  width="28" 
                  height="28" 
                  style={{ borderRadius: '50%' }}
                />
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Facebook Marketplace
                  </span>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#70757a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    margin: 0
                  }}>
                    https://www.facebook.com/marketplace
                  </p>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <MoreIcon />
              </button>
            </div>

            {/* Title */}
            <h3 
              onClick={() => router.push('/m/marketplace/vehicles')}
              style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
                cursor: 'pointer',
              }}>
              Stranger Things Toys for sale near you under $100
            </h3>

            {/* Description */}
            <p style={{ 
              fontSize: '14px', 
              color: '#4d5156', 
              margin: '0 0 8px', 
              lineHeight: '1.5',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Find Funko Pops, LEGO sets, and collectible toys from your favorite Stranger Things characters on Marketplace.
            </p>

            {/* Two product tiles */}
            <div 
              style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '0px',
              }}
            >
              {usedBikesResults.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleResultClick(product)}
                  style={{
                    flex: '1',
                    cursor: 'pointer',
                    border: '1px solid #dadce0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ 
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    background: '#f5f5f5'
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                    {product.nearbyDistance && (
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '8px',
                      }}>
                        <span style={{
                          position: 'relative',
                          background: '#fff',
                          padding: '4px 8px',
                          borderRadius: '3px',
                          fontSize: '12px',
                          color: '#202124',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a73e8">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {product.nearbyDistance}
                        </span>
                        {/* Speech bubble caret */}
                        <div style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '12px',
                          width: 0,
                          height: 0,
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: '4px solid #fff',
                          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
                        }}></div>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '8px' }}>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#1a0dab',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: '0 0 4px',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.title}
                    </p>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '700', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* Marketplace - Stranger Things Collectibles Product Unit */}
        {selectedCategory === 'marketplace' && (
          <section style={{ marginBottom: '12px' }}>
            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginTop: '4px',
              marginBottom: '12px',
              height: '4px'
            }}></div>

            {/* Header with Facebook icon and URL */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src="https://www.facebook.com/images/fb_icon_325x325.png" 
                  alt="Facebook" 
                  width="28" 
                  height="28" 
                  style={{ borderRadius: '50%' }}
                />
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Facebook Marketplace
                  </span>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#70757a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    margin: 0
                  }}>
                    https://www.facebook.com/marketplace
                  </p>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <MoreIcon />
              </button>
            </div>

            {/* Product Title - Clickable to PDP */}
            <h3 
              onClick={() => router.push('/m/marketplace/t2')}
              style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
                cursor: 'pointer',
              }}
            >
              LEGO Stranger Things The Upside Down 75810 - Collector's Set
            </h3>

            {/* Product Description */}
            <p style={{ 
              fontSize: '14px', 
              color: '#4d5156', 
              margin: '0 0 8px', 
              lineHeight: '1.5',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              Build the iconic Byers house from Stranger Things with this 2,287-piece LEGO set. Features a flip-design revealing the Upside Down version, 8 minifigures including Eleven, Mike, Lucas, Dustin, Will, Joyce, Hopper, and the Demogorgon. Perfect display piece for any fan!
            </p>

            {/* Image Gallery - 3 images in a row - Clickable to PDP */}
            <div 
              onClick={() => router.push('/m/marketplace/t2')}
              style={{ 
                display: 'flex', 
                gap: '4px', 
                marginBottom: '8px',
                cursor: 'pointer',
              }}
            >
              <div style={{ 
                flex: 1, 
                height: '87px', 
                background: '#f6f6f6', 
                borderRadius: '12px 0 0 12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src="/images/stranger-things-assets/images/marketplace/lego.jpg" 
                  alt="LEGO Stranger Things set"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ 
                flex: 1, 
                height: '87px', 
                background: '#a3a3a3',
                overflow: 'hidden',
              }}>
                <img 
                  src="/images/stranger-things-assets/images/marketplace/funko-pop.jpg" 
                  alt="Funko Pop collectibles"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ 
                flex: 1, 
                height: '87px', 
                background: '#a3a3a3',
                borderRadius: '0 12px 12px 0',
                overflow: 'hidden',
              }}>
                <img 
                  src="/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg" 
                  alt="LEGO Creel House"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Rating, Store Rating, Price */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '13px',
              color: '#70757a',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              marginTop: '4px',
            }}>
              <span>4.9</span>
              <span style={{ color: '#fbbc04' }}>★★★★★</span>
              <span>(156)</span>
              <span>$199</span>
              <span>·</span>
              <span>In stock</span>
            </div>
          </section>
        )}

        {/* Video Search Results */}
        {selectedCategory === 'videoSEO' && (
          <section style={{ marginTop: '-4px' }}>
            {/* Videos Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '400',
                color: '#202124',
                margin: 0,
                fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              }}>
                Videos
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginRight: '-8px' }}>
                <MoreIcon />
              </button>
            </div>

            {/* Video Cards */}
            {results.map((result, index) => (
              <article 
                key={result.id}
                style={{ 
                  display: 'flex',
                  gap: '12px',
                  cursor: 'pointer',
                  marginBottom: '16px',
                }}
                onClick={() => handleResultClick(result)}
              >
                {/* Video Thumbnail with Play Button and Duration */}
                <div style={{ 
                  position: 'relative',
                  flexShrink: 0,
                  width: '140px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#000',
                }}>
                  {/* Use poster image for reliable thumbnail display */}
                  {result.poster ? (
                    <img 
                      src={result.poster} 
                      alt={result.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : result.videoSrc ? (
                    <video 
                      src={result.videoSrc}
                      muted
                      playsInline
                      preload="metadata"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <img 
                      src={result.image} 
                      alt={result.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  )}
                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  {/* Duration Badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '4px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '500',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {result.duration}
                  </span>
                </div>

                {/* Video Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title - Blue link */}
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: '400', 
                    color: '#1a0dab', 
                    margin: '0 0 4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {result.title}
                  </h3>
                  
                  {/* Source Attribution with More Options */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '13px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        marginBottom: '2px',
                      }}>
                        <span style={{ color: '#202124' }}>{result.source}</span>
                        <span style={{ color: '#70757a' }}> · {result.channelName}</span>
                      </div>
                      
                      {/* Date */}
                      <div style={{ 
                        fontSize: '13px',
                        color: '#70757a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {result.postedTime}
                      </div>
                    </div>
                    
                    {/* More Options - aligned with attribution */}
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '4px',
                        marginRight: '-4px',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* More videos button */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px 16px',
              background: '#f1f3f4',
              border: 'none',
              borderRadius: '24px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#202124',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              marginTop: '8px',
              marginBottom: '16px',
            }}>
              More videos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#202124">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>

            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '16px',
              height: '4px'
            }}></div>

            {/* Short videos section */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '400',
                color: '#202124',
                margin: '0 0 12px',
                fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              }}>
                Short videos
              </h2>

              {/* Horizontal scroll container */}
              <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                margin: '0 -16px',
                padding: '0 16px 12px',
                WebkitOverflowScrolling: 'touch',
              }} className="hide-scrollbar">
                {/* Short video cards - using Stranger Things video assets with poster images */}
                {[
                  { id: 'stranger-things-1', title: 'Stranger Things 5 Official Teaser 🔴', source: 'Facebook', channel: 'Netflix', duration: '0:45', videoSrc: '/images/stranger-things-assets/videos/reels/Video-850.mp4', poster: '/images/stranger-things-assets/images/profile/stranger-things-post.png', channelName: 'Netflix', type: 'video' },
                  { id: 'video-1', title: 'Millie Bobby Brown talks Eleven\'s powers 🔮', source: 'Facebook', channel: 'Netflix', duration: '0:31', videoSrc: '/images/stranger-things-assets/videos/reels/Video-221.mp4', poster: '/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg', channelName: 'Netflix', type: 'video' },
                  { id: 'video-2', title: 'The Upside Down is coming ❤️', source: 'Facebook', channel: 'Netflix', duration: '0:22', videoSrc: '/images/stranger-things-assets/videos/reels/Video-522.mp4', poster: '/images/stranger-things-assets/images/profile/rio-theatre-post.jpg', channelName: 'Netflix', type: 'video' },
                ].map((video) => (
                  <div 
                    key={video.id} 
                    style={{
                      flexShrink: 0,
                      width: '160px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      // Store video data in sessionStorage for the video player
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('googleVideoResult', JSON.stringify(video));
                      }
                      router.push(`/m/reels/${video.id}?source=google`);
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '220px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#000',
                      marginBottom: '8px',
                    }}>
                      {video.poster ? (
                        <img 
                          src={video.poster}
                          alt={video.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : video.videoSrc ? (
                        <video 
                          src={video.videoSrc}
                          muted
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <img 
                          src={video.image}
                          alt={video.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      {/* Play button */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      {/* Duration */}
                      <span style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '500',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        {video.duration}
                      </span>
                    </div>
                    {/* Title and Source container */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#202124',
                        margin: '0',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {video.title}
                      </p>
                      {/* Source */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#70757a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        <img 
                          src="https://www.facebook.com/images/fb_icon_325x325.png"
                          alt="Facebook"
                          style={{ width: '14px', height: '14px', borderRadius: '4px' }}
                        />
                        <span style={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap',
                          flex: 1,
                        }}>
                          {video.source} · {video.channel}
                        </span>
                        <button style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}>
                          <MoreIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* More short videos button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px 16px',
                background: '#f1f3f4',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#202124',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                More short videos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#202124">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '12px',
              height: '4px'
            }}></div>

            {/* Facebook Video Results - using Stranger Things video assets with poster images */}
            {[
              { id: 'stranger-things-1', type: 'video', title: 'Stranger Things 5 | Official Teaser 🔴', channelName: 'Netflix', likes: '2.8M+ likes', time: '2 days ago', postedTime: '2 days ago', description: '2.8M likes, 156K comments - Netflix on December 15, 2025: "The final chapter begins. Stranger Things 5 coming 2025 #StrangerThings #Netflix".', duration: '2:34', videoSrc: '/images/stranger-things-assets/videos/reels/Video-850.mp4', poster: '/images/stranger-things-assets/images/profile/stranger-things-post.png' },
              { id: 'video-1', type: 'video', title: 'Millie on filming the final season 😭', channelName: 'Netflix', likes: '1.2M+ likes', time: '3 days ago', postedTime: '3 days ago', description: '1.2M likes, 45.3K comments - Netflix on December 12, 2025: "Millie opens up about saying goodbye to Eleven #StrangerThings5".', duration: '3:45', videoSrc: '/images/stranger-things-assets/videos/reels/Video-221.mp4', poster: '/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg' },
              { id: 'video-2', type: 'video', title: 'Cast reunion BTS #StrangerThings', channelName: 'Netflix', likes: '2.1M+ likes', time: '2 weeks ago', postedTime: '2 weeks ago', description: '2.1M likes, 78.4K comments - Netflix on December 1, 2025: "The whole gang back together one last time 🥹 #StrangerThings5".', duration: '4:12', videoSrc: '/images/stranger-things-assets/videos/reels/Video-522.mp4', poster: '/images/stranger-things-assets/images/profile/rio-theatre-post.jpg' },
            ].map((video, index) => (
              <div 
                key={video.id} 
                style={{ marginBottom: '16px', cursor: 'pointer' }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('googleVideoResult', JSON.stringify(video));
                  }
                  router.push(`/m/reels/${video.id}?source=google`);
                }}
              >
                {/* Divider between results */}
                {index > 0 && (
                  <div style={{ 
                    backgroundColor: '#dadce0', 
                    marginLeft: '-16px',
                    marginRight: '-16px',
                    marginBottom: '12px',
                    height: '4px'
                  }}></div>
                )}
                
                {/* Attribution header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img 
                      src="https://www.facebook.com/images/fb_icon_325x325.png"
                      alt="Facebook"
                      style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', color: '#202124', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                        Facebook · {video.channelName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#70757a', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                        {video.likes} · {video.time}
                      </div>
                    </div>
                  </div>
                  <button 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreIcon />
                  </button>
                </div>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '400', 
                  color: '#1a0dab', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1.3',
                }}>
                  {video.title}
                </h3>

                {/* Video thumbnail with description */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '180px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#000',
                  }}>
                    {video.poster ? (
                      <img 
                        src={video.poster}
                        alt={video.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : video.videoSrc ? (
                      <video 
                        src={video.videoSrc}
                        muted
                        playsInline
                        preload="metadata"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img 
                        src={video.image}
                        alt={video.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {/* Play button */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '36px',
                      height: '36px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* Duration */}
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '4px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '500',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {video.duration}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#4d5156',
                    margin: 0,
                    lineHeight: '1.5',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    flex: 1,
                  }}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Profile Search Results - Celebrity (Finn Wolfhard) */}
        {selectedCategory === 'profileCelebrity' && (
          <section style={{ marginTop: '-12px' }}>
            {/* Profile Unit Card */}
            <div style={{ 
              background: '#fff',
              marginLeft: '-16px',
              marginRight: '-16px',
              padding: '16px',
            }}>
              {/* Name and Share */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '0px',
              }}>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '400', 
                  color: '#202124', 
                  margin: 0,
                  fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  {profileResults[0]?.name || 'Finn Wolfhard'}
                </h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '8px' 
                  }}>
                    <MoreIcon />
                  </button>
                  <button style={{ 
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #dadce0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtitle */}
              <p style={{ 
                fontSize: '14px', 
                color: '#5f6368', 
                margin: '0 0 12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                {profileResults[0]?.subtitle || 'Canadian actor and musician'}
              </p>

              {/* Tabs */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '16px',
                overflowX: 'auto',
                marginLeft: '-16px',
                marginRight: '-16px',
                padding: '0 16px',
              }} className="hide-scrollbar">
                {['Overview', 'Movies and shows', 'Music groups', 'Songs'].map((tab, idx) => (
                  <button 
                    key={tab}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: idx === 0 ? 'none' : '1px solid #dadce0',
                      background: idx === 0 ? '#e8eaed' : 'transparent',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div style={{ 
                position: 'relative',
                marginBottom: '12px',
                marginLeft: '-16px',
                marginRight: '-16px',
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ 
                    flex: 3, 
                    height: '300px',
                    background: '#e0e0e0',
                    overflow: 'hidden',
                  }}>
                    <img 
                      src={profileResults[0]?.image || "https://flxt.tmsimg.com/assets/817022_v9_bb.jpg"}
                      alt="Finn Wolfhard"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </div>
                  <div style={{ 
                    flex: 1, 
                    height: '300px',
                    background: '#e0e0e0',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img 
                      src="/images/profile/finn-post-2.jpg"
                      alt="Finn Wolfhard at event"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
                <span style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  fontSize: '11px',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  Savion Washington/FilmMagic
                </span>
              </div>

              {/* Age and Songs Row */}
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                marginBottom: '12px',
              }}>
                {/* Age Card */}
                <div style={{ 
                  flex: 1, 
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '12px',
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '600',
                  }}>
                    Age
                  </span>
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '400', 
                    color: '#202124', 
                    margin: '4px 0 0',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    23 years
                  </p>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#5f6368',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    December 23, 2002
                  </span>
                </div>

                {/* Songs Card */}
                <div style={{ 
                  flex: 1, 
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '12px',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: '600',
                    }}>
                      Songs
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: '#fff3cd',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: '#856404',
                    }}>
                      Calpurnia
                    </div>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: '#e8f4f8',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=40&h=40&fit=crop"
                        alt="Song"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: '#e0e0e0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=40&h=40&fit=crop"
                        alt="Song"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview Text */}
              <div style={{ 
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '16px',
              }}>
                <h3 style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#202124', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Overview
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#4d5156', 
                  margin: 0,
                  lineHeight: '1.5',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {profileResults[0]?.description || 'Finn Michael Wolfhard is a Canadian actor, musician, and film director. He received international attention for playing Mike Wheeler on the Netflix series Stranger Things.'}
                  <span style={{ color: '#1a73e8', cursor: 'pointer' }}> Wikipedia ›</span>
                </p>
              </div>
            </div>

            {/* News Articles */}
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              padding: '0',
              marginTop: '-4px',
            }}>
              {newsArticles.map((article) => (
                <div 
                  key={article.id}
                  style={{ 
                    flex: 1, 
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #dadce0',
                  }}
                >
                  <div style={{ 
                    height: '120px', 
                    background: '#e0e0e0',
                    overflow: 'hidden',
                  }}>
                    <img 
                      src={article.image}
                      alt={article.title || ''}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      marginBottom: '6px',
                    }}>
                      {article.platform === 'Instagram' ? (
                        <img 
                          src="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png"
                          alt="Instagram"
                          style={{ width: '16px', height: '16px', borderRadius: '4px' }}
                        />
                      ) : (
                        <div style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%',
                          background: '#4285f4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                          V
                        </div>
                      )}
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#202124',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {article.source}
                      </span>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        padding: '2px',
                        marginLeft: 'auto',
                        cursor: 'pointer',
                      }}>
                        <MoreIcon />
                      </button>
                    </div>
                    {article.title && (
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#202124', 
                        margin: '0 0 4px',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        {article.title}
                      </p>
                    )}
                    {article.platform === 'Instagram' && (
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#202124',
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        <div>{article.source}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>📷</span>
                          <span>{article.photographer}</span>
                        </div>
                      </div>
                    )}
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#70757a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {article.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider before Quick Facts */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginTop: '12px',
              height: '4px'
            }}></div>

            {/* Quick Facts Section */}
            <div style={{ 
              background: '#fff',
              marginLeft: '-16px',
              marginRight: '-16px',
              padding: '16px',
              marginBottom: '8px',
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '400', 
                  color: '#202124', 
                  margin: 0,
                  fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  Quick facts
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '4px',
                  }}>
                    <MoreIcon />
                  </button>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '4px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Facts List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Born
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    : {quickFacts.born}, <span style={{ color: '#1a73e8' }}>{quickFacts.birthPlace}</span>
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Height
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    : {quickFacts.height}
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Parents
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#1a73e8',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    : {quickFacts.parents.join(', ')}
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Siblings
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#1a73e8',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    : {quickFacts.siblings.join(', ')}
                  </span>
                </div>
                <div>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    Appears in
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#1a73e8',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    : {quickFacts.appearsIn.map((item, idx) => (
                      <span key={idx}>
                        {idx > 0 && ', '}
                        {item.title} ({item.year})
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '16px',
              height: '4px'
            }}></div>

            {/* Facebook Unit */}
            <div 
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => router.push('/m/profile/finn-wolfhard')}
            >
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    alt="Facebook"
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  />
                  <div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Facebook
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {' '}· {facebookData.username}
                    </span>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#70757a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: 0,
                    }}>
                      {facebookData.followers}+ followers
                    </p>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <MoreIcon />
                </button>
              </div>

              {/* Title Link */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
              }}>
                {facebookData.displayName} | Facebook
              </h3>

              {/* Image Grid - same styling as business profile */}
              <div style={{ 
                display: 'flex', 
                gap: '2px',
                marginBottom: '8px',
              }}>
                {facebookData.images.slice(0, 5).map((img, idx, arr) => (
                  <div 
                    key={idx}
                    style={{ 
                      flex: 1,
                      height: '100px', 
                      borderRadius: idx === 0 ? '8px 0 0 8px' : idx === arr.length - 1 ? '0 8px 8px 0' : '0',
                      overflow: 'hidden',
                    }}
                  >
                    <img 
                      src={img}
                      alt={`Facebook post ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <p style={{ 
                fontSize: '14px', 
                color: '#4d5156', 
                margin: 0,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                {facebookData.followers} followers · {facebookData.following} following · {facebookData.posts} posts - {facebookData.displayName} on Facebook. Profile · {facebookData.bio}
              </p>
            </div>

            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '16px',
              height: '4px'
            }}></div>

            {/* Facebook Post - Finn Wolfhard */}
            <div 
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => router.push('/m/profile/finn-wolfhard/posts/calpurnia-sessions')}
            >
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    alt="Facebook"
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  />
                  <div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Facebook
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {' '}· Finn Wolfhard
                    </span>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#70757a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: 0,
                    }}>
                      {facebookData.followers} followers · {facebookData.posts} posts
                    </p>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <MoreIcon />
                </button>
              </div>

              {/* Title Link */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
              }}>
                New album THE CALPURNIA SESSIONS out now!
              </h3>

              {/* Content */}
              <p style={{ 
                fontSize: '14px', 
                color: '#4d5156', 
                margin: 0,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                My mind is blown. I'm completely floored by the love you've shown this album. 2.6 million streams - ARE YOU ACTUALLY SERIOUS?? Thank you for listening and welcoming The Aubreys into your life.
              </p>
            </div>
          </section>
        )}

        {/* Profile Search Results - Business (Webster Hall) */}
        {selectedCategory === 'profileBusiness' && (
          <section style={{ marginTop: '-12px' }}>
            {/* Google Maps-style Business Card */}
            <div style={{ 
              background: '#fff',
              marginLeft: '-16px',
              marginRight: '-16px',
              padding: '16px',
            }}>
              {/* Name and Actions Row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '0px',
              }}>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '400', 
                  color: '#202124', 
                  margin: 0,
                  fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  {businessProfileResults[0]?.name || 'Webster Hall'}
                </h1>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    padding: '8px' 
                  }}>
                    <MoreIcon />
                  </button>
                  <button style={{ 
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #dadce0',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Rating and Type Row */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                gap: '4px',
                marginBottom: '12px',
              }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#202124',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {businessQuickFacts.rating}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span style={{ 
                  fontSize: '14px', 
                  color: '#1a73e8',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  (3K)
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  color: '#70757a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  · Music venue
                </span>
              </div>

              {/* Tabs */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '16px',
                overflowX: 'auto',
                marginLeft: '-16px',
                marginRight: '-16px',
                padding: '0 16px',
              }} className="hide-scrollbar">
                {['Overview', 'Reviews', 'Photos', 'About'].map((tab, idx) => (
                  <button 
                    key={tab}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid #dadce0',
                      background: idx === 0 ? '#e8eaed' : 'transparent',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Photo Carousel - H-scroll with rounded images */}
              <div style={{ 
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                marginLeft: '-16px',
                marginRight: '-16px',
                padding: '0 16px',
                overflowX: 'auto',
              }} className="hide-scrollbar">
                {/* Image 1 - Interior */}
                <div style={{ 
                  width: '55%',
                  minWidth: '55%',
                  height: '200px',
                  borderRadius: '12px',
                  background: '#e0e0e0',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop"
                    alt="Webster Hall Interior"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                    }}
                  />
                </div>
                {/* Image 2 - Video thumbnail */}
                <div style={{ 
                  width: '40%',
                  minWidth: '40%',
                  height: '200px',
                  borderRadius: '12px',
                  background: '#e0e0e0',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop"
                    alt="Webster Hall Street View"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                    }}
                  />
                  {/* Video Play Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    0:28
                  </div>
                </div>
                {/* Image 3 - Extra for scroll */}
                <div style={{ 
                  width: '40%',
                  minWidth: '40%',
                  height: '200px',
                  borderRadius: '12px',
                  background: '#e0e0e0',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
                    alt="Webster Hall Event"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start',
                gap: '24px',
                marginBottom: '16px',
                padding: '0',
                overflowX: 'auto',
              }} className="hide-scrollbar">
                {[
                  { icon: 'call', label: 'Call' },
                  { icon: 'directions', label: 'Directions' },
                  { icon: 'website', label: 'Website' },
                  { icon: 'share', label: 'Share' },
                  { icon: 'save', label: 'Save' },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid #1a73e8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {action.icon === 'call' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      )}
                      {action.icon === 'directions' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                          <path d="M22.43 10.59l-9.01-9.01c-.75-.75-2.07-.76-2.83 0l-9 9c-.78.78-.78 2.04 0 2.82l9 9c.39.39.9.58 1.41.58.51 0 1.02-.19 1.41-.58l9.01-9.01c.78-.78.78-2.04 0-2.82zM12.01 20L4 12l8.01-8 8 8-8 8zm-.99-7h4v-2h-4V8l-4 4 4 4v-3z"/>
                        </svg>
                      )}
                      {action.icon === 'website' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      )}
                      {action.icon === 'share' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                        </svg>
                      )}
                      {action.icon === 'save' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      color: '#1a73e8',
                      fontWeight: '500',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Address with Map */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0 8px 0',
                borderTop: '1px solid #e8eaed',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#e8f0fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#202124', 
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {businessQuickFacts.address}
                  </p>
                </div>
                {/* Mini Map with realistic map background */}
                <div style={{
                  width: '100px',
                  height: '70px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                  background: '#e8f4ea',
                }}>
                  {/* Map background with streets */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#f0f4f0',
                  }}>
                    {/* Horizontal streets */}
                    <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '8px', background: '#fff' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '10px', background: '#fff' }} />
                    <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, height: '6px', background: '#fff' }} />
                    {/* Vertical streets */}
                    <div style={{ position: 'absolute', left: '25%', top: 0, bottom: 0, width: '6px', background: '#fff' }} />
                    <div style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, width: '8px', background: '#fff' }} />
                    {/* Parks/green areas */}
                    <div style={{ position: 'absolute', top: '60%', left: '70%', width: '25px', height: '20px', background: '#c5e1a5', borderRadius: '4px' }} />
                  </div>
                  {/* Red pin marker */}
                  <div style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -100%)',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ea4335">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider after address */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '12px',
              height: '4px'
            }}></div>

            {/* Facebook Unit */}
            <div 
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => router.push('/m/profile/rio-theatre')}
            >
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    alt="Facebook"
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  />
                  <div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Facebook
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {' '}· Webster Hall
                    </span>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#70757a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: 0,
                    }}>
                      180K followers · 5.8K+ posts
                    </p>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <MoreIcon />
                </button>
              </div>

              {/* Title Link */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
              }}>
                Webster Hall (@websterhall)
              </h3>

              {/* Image Grid - 5 images that fit perfectly */}
              <div style={{ 
                display: 'flex', 
                gap: '2px',
                marginBottom: '8px',
              }}>
                {businessFacebookData.images.slice(0, 5).map((img, idx, arr) => (
                  <div 
                    key={idx}
                    style={{ 
                      flex: 1,
                      height: '100px', 
                      borderRadius: idx === 0 ? '8px 0 0 8px' : idx === arr.length - 1 ? '0 8px 8px 0' : '0',
                      overflow: 'hidden',
                    }}
                  >
                    <img 
                      src={img}
                      alt={`Facebook post ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <p style={{ 
                fontSize: '14px', 
                color: '#4d5156', 
                margin: 0,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                NYC's legendary live music venue since 1886. Concerts, DJ nights, and unforgettable live events in the East Village.
              </p>
            </div>

            {/* Divider */}
            <div style={{ 
              backgroundColor: '#dadce0', 
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '12px',
              height: '4px'
            }}></div>

            {/* Facebook Post - Webster Hall NYC */}
            <div 
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => router.push('/m/profile/rio-theatre/posts/stranger-things-finale')}
            >
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="https://www.facebook.com/images/fb_icon_325x325.png"
                    alt="Facebook"
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  />
                  <div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      Facebook
                    </span>
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#202124',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {' '}· Webster Hall
                    </span>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#70757a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      margin: 0,
                    }}>
                      180K followers · 5.8K+ posts
                    </p>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <MoreIcon />
                </button>
              </div>

              {/* Title Link */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '400', 
                color: '#1a0dab', 
                margin: '0 0 8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                lineHeight: '1.3',
              }}>
                🎤 SABRINA CARPENTER LIVE AT WEBSTER HALL - NYC! 🎤
              </h3>

              {/* Content */}
              <p style={{ 
                fontSize: '14px', 
                color: '#4d5156', 
                margin: 0,
                lineHeight: '1.5',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                We're thrilled to announce a special intimate show with Sabrina Carpenter at NYC's legendary Webster Hall! Tickets on sale this Friday.
              </p>
            </div>

          </section>
        )}

        {/* Search Results - hide for marketplace, video, and profiles since they have custom layouts */}
        {selectedCategory !== 'marketplace' && selectedCategory !== 'videoSEO' && selectedCategory !== 'videoLinkShare' && selectedCategory !== 'profileCelebrity' && selectedCategory !== 'profileBusiness' && (
        <div>
          {/* Aggregation Result - appears FIRST for aggregation category */}
          {selectedCategory === 'aggregation' && (
            <>
              <article 
                style={{ 
                  cursor: 'pointer', 
                  paddingBottom: '0px',
                }}
                onClick={() => router.push('/m/explore/stranger-things-finale')}
              >
                <table 
                  style={{ 
                    marginBottom: '8px', 
                    borderCollapse: 'collapse',
                    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'middle', paddingRight: '10px' }} rowSpan={2}>
                        <img 
                          src="https://www.facebook.com/images/fb_icon_325x325.png" 
                          alt="Facebook" 
                          width="28" 
                          height="28" 
                          style={{ borderRadius: '50%', display: 'block' }}
                        />
                      </td>
                      <td style={{ fontSize: '14px', color: '#202124', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.3' }}>
                        Facebook
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '12px', color: '#70757a', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                        32.1K people are talking about this
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400', 
                    color: '#1a0dab', 
                    margin: '8px 0 4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.3',
                  }}
                >
                  Stranger Things finale predictions
                </h3>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#4d5156', 
                    margin: '0', 
                    lineHeight: '1.58',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    flex: 1,
                  }}>
                    Discover the most popular fan theories about the Season 5 finale, including predictions about Vecna, the Mind Flayer, and which characters will survive.
                  </p>
                  <img 
                    src="/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg"
                    alt="Stranger Things"
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      flexShrink: 0,
                      marginTop: '6px',
                    }}
                  />
                </div>
              </article>
              {/* Short videos section - right after aggregation result */}
              <div style={{ 
                backgroundColor: '#dadce0', 
                marginLeft: '-16px',
                marginRight: '-16px',
                marginTop: '12px',
                marginBottom: '16px',
                height: '4px'
              }}></div>

              <div style={{ marginBottom: '16px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  color: '#202124',
                  margin: '0 0 12px',
                  fontFamily: "'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                  Short videos
                </h2>

                {/* Horizontal scroll container */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  margin: '0 -16px',
                  padding: '0 16px 12px',
                  WebkitOverflowScrolling: 'touch',
                }} className="hide-scrollbar">
                  {/* Short video cards - finale predictions themed with poster images */}
                  {[
                    { id: 'stranger-things-1', title: 'Season 5 finale theory breakdown 🔮', source: 'Facebook', channel: 'STTheories', duration: '2:15', videoSrc: '/images/stranger-things-assets/videos/reels/Video-850.mp4', poster: '/images/stranger-things-assets/images/profile/stranger-things-post.png', channelName: 'STTheories', type: 'video' },
                    { id: 'video-1', title: 'Will Byers is the key! 🗝️', source: 'Facebook', channel: 'UpsideDownFan', duration: '1:45', videoSrc: '/images/stranger-things-assets/videos/reels/Video-221.mp4', poster: '/images/stranger-things-assets/images/profile/rio-theatre-post.jpg', channelName: 'UpsideDownFan', type: 'video' },
                    { id: 'video-2', title: 'Who will survive? My picks 😱', source: 'Facebook', channel: 'HawkinsHQ', duration: '1:32', videoSrc: '/images/stranger-things-assets/videos/reels/Video-522.mp4', poster: '/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg', channelName: 'HawkinsHQ', type: 'video' },
                  ].map((video) => (
                    <div 
                      key={video.id} 
                      style={{
                        flexShrink: 0,
                        width: '160px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('googleVideoResult', JSON.stringify(video));
                        }
                        router.push(`/m/reels/${video.id}?source=google`);
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '220px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#000',
                        marginBottom: '8px',
                      }}>
                        {video.poster ? (
                          <img 
                            src={video.poster}
                            alt={video.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : video.videoSrc ? (
                          <video 
                            src={video.videoSrc}
                            muted
                            playsInline
                            preload="metadata"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <img 
                            src={video.image}
                            alt={video.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                        {/* Play button */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '40px',
                          height: '40px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        {/* Duration */}
                        <span style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: '500',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          {video.duration}
                        </span>
                      </div>
                      {/* Title and Source container */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}>
                        <p style={{
                          fontSize: '14px',
                          color: '#202124',
                          margin: '0',
                          lineHeight: '1.3',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}>
                          {video.title}
                        </p>
                        {/* Source */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#70757a',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}>
                          <img 
                            src="https://www.facebook.com/images/fb_icon_325x325.png"
                            alt="Facebook"
                            style={{ width: '14px', height: '14px', borderRadius: '4px' }}
                          />
                          <span style={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap',
                            flex: 1,
                          }}>
                            {video.source} · {video.channel}
                          </span>
                          <button style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}>
                            <MoreIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* More short videos button */}
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 16px',
                  background: '#f1f3f4',
                  border: 'none',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#202124',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  More short videos
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#202124">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              </div>

              <div style={{ 
                backgroundColor: '#dadce0', 
                marginLeft: '-16px',
                marginRight: '-16px',
                marginBottom: '12px',
                height: '4px'
              }}></div>
            </>
          )}

          {results.map((result, index) => (
            <div key={result.id}>
              {/* Divider between results */}
              {index > 0 && (
                <div style={{ 
                  backgroundColor: '#dadce0', 
                  marginLeft: '-16px',
                  marginRight: '-16px',
                  marginTop: '12px',
                  marginBottom: '12px',
                  height: '4px'
                }}></div>
              )}
              <article 
                style={{ 
                  cursor: 'pointer', 
                  paddingBottom: '0px'
                }}
                onClick={() => handleResultClick(result)}
              >
                {/* Result Header - Attribution */}
                <table 
                  style={{ 
                    marginBottom: '8px', 
                    borderCollapse: 'collapse',
                    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'middle', paddingRight: '10px' }} rowSpan={2}>
                        <img 
                          src="https://www.facebook.com/images/fb_icon_325x325.png" 
                          alt="Facebook" 
                          width="28" 
                          height="28" 
                          style={{ borderRadius: '50%', display: 'block' }}
                        />
                      </td>
                      <td style={{ fontSize: '14px', color: '#202124', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.3' }}>
                        Facebook <span style={{ color: '#70757a' }}>·</span> {result.groupName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '12px', color: '#70757a', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                        {formatCount(result.comments)} comments · {result.createdTime ? formatTimeAgo(result.createdTime) : result.postedTime || 'Recently'}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Title */}
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400', 
                    color: '#1a0dab', 
                    margin: '8px 0 4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.3',
                  }}
                >
                  {result.title || `${result.groupName} | Facebook`}
                </h3>

                {/* Price for Marketplace */}
                {result.price && (
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#1877f2', 
                    margin: '4px 0',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {result.price}
                  </p>
                )}

                {/* Rating for Profile/Pages */}
                {result.rating && (
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#202124', 
                    marginBottom: '6px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    ⭐ {result.rating} ({result.reviews?.toLocaleString()} reviews) · {result.category}
                  </div>
                )}

                {/* Views for Video */}
                {result.views && (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#65676b', 
                    marginBottom: '6px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {result.views} · {result.duration}
                  </div>
                )}
                
                {/* Description */}
                <p style={{ 
                  fontSize: '14px', 
                  color: '#4d5156', 
                  margin: '0 0 8px', 
                  lineHeight: '1.58',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {result.description}
                </p>

                {/* Comment Cards - for groups results */}
                {result.topComments && result.topComments.length > 0 && (
                  <div 
                    style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      overflowX: 'auto', 
                      margin: '12px -16px 0', 
                      padding: '0 16px 4px',
                      WebkitOverflowScrolling: 'touch'
                    }}
                    className="hide-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {result.topComments.slice(0, 3).map((comment, idx) => {
                      const isTruncated = comment.text.length > 120;
                      
                      return (
                        <div 
                          key={idx} 
                          style={{ 
                            flex: '0 0 auto', 
                            width: '220px', 
                            padding: '12px', 
                            background: '#f1f3f4', 
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '120px',
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <p style={{ 
                            fontSize: '14px', 
                            color: '#202124', 
                            margin: '0', 
                            lineHeight: '1.4',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            flex: '1',
                          }}>
                            {comment.text}
                            {isTruncated && (
                              <span style={{ color: '#1a73e8', fontWeight: '600' }}> More</span>
                            )}
                          </p>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px', 
                            fontSize: '12px',
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            marginTop: '8px',
                          }}>
                            {idx === 0 && (
                              <>
                                <CheckIcon />
                                <span style={{ color: '#202124' }}>Top comment</span>
                                <span style={{ color: '#70757a' }}>·</span>
                              </>
                            )}
                            <span style={{ color: '#70757a' }}>{comment.reactions} reactions</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Location for Marketplace/Profile */}
                {result.location && (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#65676b', 
                    marginTop: '4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    📍 {result.location}
                  </div>
                )}

                {/* Author/Seller info - only show for non-group types */}
                {result.seller && (
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#65676b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    <img 
                      src={result.seller?.profilePicture} 
                      alt=""
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span>{result.seller?.name}</span>
                    {result.seller?.rating && (
                      <span>· ⭐ {result.seller.rating}</span>
                    )}
                  </div>
                )}

                {/* Engagement stats for videos */}
                {result.type === 'reel' && result.reactions && (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#65676b', 
                    marginTop: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    👍 {formatCount(result.reactions)} · 💬 {formatCount(result.comments)}
                  </div>
                )}
              </article>


            </div>
          ))}

        </div>
        )}
      </main>

      {/* Bottom Sheet */}
      <UseCaseBottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategorySelect}
      />
    </div>
  );
}
