"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OthersSearchedFor from "../../../../components/mobile/OthersSearchedFor";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import "../../../../public/styles/mobile/aggregation.scss";

// Stranger Things toys data for the grid - all items under $100
const toyListings = [
  { id: 't1', price: '$25', title: 'Funko Pop Eleven with Eggos #421', location: 'New York, NY', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
  { id: 't2', price: '$89', title: 'LEGO The Upside Down 75810', location: 'New York, NY', distance: '2 mi', image: '/images/stranger-things-assets/images/marketplace/lego.jpg', badge: 'Just listed' },
  { id: 't3', price: '$85', title: 'Demogorgon Chase Edition RARE', location: 'New York, NY', distance: '5 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 't4', price: '$79', title: 'LEGO Creel House Custom MOC', location: 'New York, NY', distance: '3 mi', image: '/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg', badge: 'Just listed' },
  { id: 't5', price: '$69', title: 'Funko Pop Hawkins Gang Set (6)', location: 'New York, NY', distance: '8 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 't6', price: '$35', title: 'Stranger Things PEZ Set', location: 'New York, NY', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/pez-set.jpg' },
  { id: 't7', price: '$75', title: 'Steve Harrington Autographed Card', location: 'New York, NY', distance: '2 mi', image: '/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg' },
  { id: 't8', price: '$45', title: 'Funko Pop Eddie Munson #1250', location: 'New York, NY', distance: '4 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg' },
  { id: 't9', price: '$65', title: 'Funko Pop Vecna #1312', location: 'New York, NY', distance: '6 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
  { id: 't10', price: '$99', title: 'LEGO Hawkins Lab Complete Set', location: 'New York, NY', distance: '12 mi', image: '/images/stranger-things-assets/images/marketplace/lego.jpg' },
  { id: 't11', price: '$18', title: 'Stranger Things Season 4 Poster', location: 'New York, NY', distance: '1 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg' },
  { id: 't12', price: '$55', title: 'Funko Pop Max with Skateboard', location: 'New York, NY', distance: '9 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop.jpg', badge: 'Just listed' },
  { id: 't13', price: '$92', title: 'LEGO Starcourt Mall MOC', location: 'New York, NY', distance: '5 mi', image: '/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg' },
  { id: 't14', price: '$28', title: 'Hellfire Club T-Shirt XL', location: 'New York, NY', distance: '15 mi', image: '/images/stranger-things-assets/images/marketplace/pez-set.jpg' },
  { id: 't15', price: '$50', title: 'Signed Dustin Henderson Photo', location: 'New York, NY', distance: '20 mi', image: '/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg' },
  { id: 't16', price: '$42', title: 'Funko Pop Hopper with Donut', location: 'New York, NY', distance: '18 mi', image: '/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg' },
];

// Marketplace-related suggestions for "Others searched for"
const marketplaceSuggestions = [
  "Stranger Things Funko Pops",
  "Stranger Things LEGO sets",
  "Demogorgon collectibles",
  "Eleven costume props",
  "Hawkins High merch",
  "Vintage 80s toys",
  "Netflix collectibles",
  "Pop vinyl figures",
  "Stranger Things posters",
  "Retro gaming items",
  "Horror movie merch",
  "Limited edition toys",
  "Sci-fi collectibles",
  "TV show memorabilia",
  "Rare Funko chase",
  "Upside Down decor",
];

// Groups with similar listings data
const suggestedGroups = [
  { id: 'g1', slug: 'nyc-funko-pop-buy-sell-trade', name: 'NYC Funko Pop Buy Sell Trade', listingsPerDay: '50+', image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=400&fit=crop' },
  { id: 'g2', slug: 'nyc-collectibles-marketplace', name: 'NYC Collectibles Marketplace', listingsPerDay: '120+', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop' },
  { id: 'g3', slug: 'lego-buy-sell-trade-nyc', name: 'LEGO Buy Sell Trade NYC', listingsPerDay: '35+', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&h=400&fit=crop' },
  { id: 'g4', slug: 'toys-games-resellers-ny', name: 'Toys & Games Resellers NY', listingsPerDay: '80+', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop' },
];

export default function MarketplaceToysPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if coming from tab bar navigation
  const isFromTabBar = searchParams?.get('source') === 'tabbar';
  
  // Save upsell sheet state
  const [showSaveSheet, setShowSaveSheet] = useState(false);
  
  // Active search chip filter
  const [activeQuery, setActiveQuery] = useState(null);

  const getFilteredListings = () => {
    if (!activeQuery) return toyListings;
    const q = activeQuery.toLowerCase();
    const scored = toyListings.map(toy => {
      const text = `${toy.title} ${toy.id}`.toLowerCase();
      let score = 0;
      if (q.includes('funko') && text.includes('funko')) score += 3;
      if (q.includes('lego') && text.includes('lego')) score += 3;
      if (q.includes('demogorgon') && text.includes('demogorgon')) score += 3;
      if (q.includes('eleven') && text.includes('eleven')) score += 3;
      if (q.includes('poster') && text.includes('poster')) score += 3;
      if (q.includes('chase') && text.includes('chase')) score += 3;
      if (q.includes('rare') && text.includes('rare')) score += 2;
      if (q.includes('vintage') || q.includes('retro')) score += 1;
      if (q.includes('collectible') || q.includes('merch')) score += 1;
      if (q.includes('limited') && text.includes('edition')) score += 2;
      if (q.includes('pop') && text.includes('pop')) score += 2;
      if (q.includes('upside down') && text.includes('upside down')) score += 3;
      q.split(' ').forEach(word => {
        if (word.length > 3 && text.includes(word)) score += 1;
      });
      return { ...toy, score };
    });
    return scored.sort((a, b) => b.score - a.score);
  };

  const filteredListings = getFilteredListings();
  
  // Prevent flash of unstyled content - show glimmer until mounted
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prefetch all product detail pages for instant navigation
  useEffect(() => {
    toyListings.forEach(toy => {
      router.prefetch(`/m/marketplace/${toy.id}`);
    });
  }, [router]);

  // Show glimmer skeleton until fully mounted
  if (!isMounted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        paddingBottom: '120px',
      }}>
        <style jsx>{`
          @keyframes glimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        {/* Skeleton grid for listings */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '100%',
                  paddingTop: '100%',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <div style={{ padding: '8px 12px 12px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '15px',
                    borderRadius: '4px',
                    marginBottom: '6px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div
                  style={{
                    width: '100%',
                    height: '13px',
                    borderRadius: '4px',
                    marginBottom: '6px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div
                  style={{
                    width: '80%',
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes contentFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .marketplace-content-fade-in {
          animation: contentFadeIn 300ms ease-out forwards;
        }
      `}</style>
      <div style={{ 
        minHeight: '100vh', 
        background: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        paddingBottom: '120px',
      }}>

      {/* Main content */}
      <main className="marketplace-content-fade-in">

        {/* Filter buttons - hidden when coming from tab bar */}
        {!isFromTabBar && (
        <div className="hide-scrollbar" style={{ 
          display: 'flex',
          gap: '8px',
          padding: '12px',
          background: '#fff',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          alignItems: 'center',
        }}>
          {/* Save button - Blueprint bookmark-outline icon */}
          <button 
            onClick={() => setShowSaveSheet(true)}
            style={{
              minHeight: '36px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              background: '#e2e5e9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#080809">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 3.5C3 1.84314 4.34315 0.5 6 0.5H18C19.6569 0.5 21 1.84315 21 3.5V20.9996C21 23.0597 18.6482 24.2356 17.0001 22.9997L12.3 19.4749C12.1222 19.3416 11.8778 19.3416 11.7 19.4749L6.99991 22.9997C5.35181 24.2356 3 23.0597 3 20.9996V3.5ZM6 2.5C5.44771 2.5 5 2.94771 5 3.5V20.9996C5 21.4116 5.47036 21.6468 5.79998 21.3996L10.5001 17.8749C11.3889 17.2083 12.6111 17.2083 13.4999 17.8749L18.2 21.3996C18.5296 21.6468 19 21.4116 19 20.9996V3.5C19 2.94772 18.5523 2.5 18 2.5H6Z" fill="#080809"/>
            </svg>
          </button>

          {/* Filter button with count - Selected state with blue background */}
          <button style={{
            minHeight: '36px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#ebf5ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0064d1">
              <path d="M4.14 8.5H3c-.55 0-1-.45-1-1s.45-1 1-1h1.14c.43-1.45 1.77-2.5 3.36-2.5 1.93 0 3.5 1.57 3.5 3.5S9.43 11 7.5 11c-1.59 0-2.93-1.05-3.36-2.5z"/>
              <path d="M16.5 13c1.59 0 2.93 1.05 3.36 2.5H21c.55 0 1 .45 1 1s-.45 1-1 1h-1.14c-.43 1.45-1.77 2.5-3.36 2.5-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5z"/>
              <path d="M11.5 16.5c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1h7.5c.55 0 1-.45 1-1z"/>
              <path d="M13.5 6.5c-.55 0-1 .45-1 1s.45 1 1 1H21c.55 0 1-.45 1-1s-.45-1-1-1h-7.5z"/>
            </svg>
            <span style={{
              fontSize: '15px',
              fontWeight: '600',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              color: '#0064d1',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              whiteSpace: 'nowrap',
            }}>2</span>
          </button>

          {/* Less than $100 dropdown filter - Selected state */}
          <button style={{
            minHeight: '36px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#ebf5ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '600',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              color: '#0064d1',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              whiteSpace: 'nowrap',
            }}>Less than $100</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0064d1">
              <path d="M7.41417 9C5.63236 9 4.74002 11.1543 5.99995 12.4142L10.2322 16.6464C11.2085 17.6228 12.7914 17.6228 13.7677 16.6464L18 12.4142C19.2599 11.1543 18.3675 9 16.5857 9H7.41417Z"/>
            </svg>
          </button>

          {/* Location dropdown filter - Selected state */}
          <button style={{
            minHeight: '36px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#ebf5ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '600',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              color: '#0064d1',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              whiteSpace: 'nowrap',
            }}>New York, NY</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0064d1">
              <path d="M7.41417 9C5.63236 9 4.74002 11.1543 5.99995 12.4142L10.2322 16.6464C11.2085 17.6228 12.7914 17.6228 13.7677 16.6464L18 12.4142C19.2599 11.1543 18.3675 9 16.5857 9H7.41417Z"/>
            </svg>
          </button>
        </div>
        )}

        {/* Results count - hidden when coming from tab bar */}
        {!isFromTabBar && (
          <div style={{ padding: '8px 12px' }}>
            <p style={{ 
              fontSize: '13px', 
              color: '#65686c',
              margin: 0,
            }}>
              {activeQuery
                ? `${filteredListings.length}+ results for "${activeQuery.toLowerCase()}"`
                : '16+ results for "stranger things toys"'}
            </p>
          </div>
        )}

        {/* First 4 toy listings */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {filteredListings.slice(0, 6).map((toy, index) => (
            <div 
              key={toy.id} 
              onClick={() => router.push(`/m/marketplace/${toy.id}`)}
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Image */}
              <div style={{ 
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
              }}>
                <img 
                  src={toy.image} 
                  alt={toy.title}
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }}
                />
                {/* Badge */}
                {toy.badge && toy.badge !== 'Just listed' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: toy.badge === 'RARE' ? '#e8383b' : '#0866ff',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    {toy.badge}
                  </div>
                )}
                {toy.badge === 'Just listed' && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    Just listed
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '8px 12px 12px',
                paddingLeft: index % 2 === 0 ? '12px' : '4px',
                paddingRight: '4px',
              }}>
                {/* Price - Headline 4 */}
                <p style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '20px',
                  letterSpacing: '-0.24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.price}
                </p>
                {/* Title - Body 4 */}
                <p style={{
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '-0.08px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.title}
                </p>
                {/* Location - Meta 4, Secondary Text */}
                <p style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#65686c',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.location} · {toy.distance}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Others searched for */}
        <OthersSearchedFor 
          queries={marketplaceSuggestions}
          onQueryClick={(query) => {
            setActiveQuery(query === activeQuery ? null : query);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="others-searched-for--no-divider"
        />

        {/* 4 more toy listings */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
          width: '100%',
          boxSizing: 'border-box',
          paddingTop: '12px',
        }}>
          {filteredListings.slice(6, 12).map((toy, index) => (
            <div 
              key={`more-${toy.id}`} 
              onClick={() => router.push(`/m/marketplace/${toy.id}`)}
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Image */}
              <div style={{ 
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
              }}>
                <img 
                  src={toy.image} 
                  alt={toy.title}
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }}
                />
                {toy.badge === 'Just listed' && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    Just listed
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '8px 12px 12px',
                paddingLeft: index % 2 === 0 ? '12px' : '4px',
                paddingRight: '4px',
              }}>
                {/* Price - Headline 4 */}
                <p style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '20px',
                  letterSpacing: '-0.24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.price}
                </p>
                {/* Title - Body 4 */}
                <p style={{
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '-0.08px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.title}
                </p>
                {/* Location - Meta 4, Secondary Text */}
                <p style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#65686c',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.location} · {toy.distance}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Groups you might like - Entity-based promotion */}
        <div style={{
          background: '#fff',
          width: '100%',
          marginTop: '4px',
          paddingBottom: '12px',
        }}>
          {/* Promotion Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 12px 8px',
          }}>
            {/* Title - Headline 3 Emphasized */}
            <span style={{
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '17px',
              fontWeight: '700',
              color: '#080809',
              lineHeight: '20px',
              letterSpacing: '-0.41px',
            }}>
              Groups with similar listings
            </span>
            {/* See all - Body 3 */}
            <button style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '15px',
              fontWeight: '400',
              color: '#0866ff',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
            }}>
              See all
            </button>
          </div>

          {/* Media Card H-scroll */}
          <div 
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              padding: '0 12px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {suggestedGroups.map((group) => (
              <div 
                key={group.id}
                onClick={() => router.push(`/m/groups/${group.slug}`)}
                style={{
                  flex: '0 0 auto',
                  width: '164px',
                  background: '#fff',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  border: '1px solid #E2E5E9',
                  overflow: 'hidden',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Group Image at top of card */}
                <div style={{
                  width: '100%',
                  height: '156px',
                  overflow: 'hidden',
                }}>
                  <img 
                    src={group.image} 
                    alt={group.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                {/* Card Content */}
                <div style={{
                  padding: '8px 12px 12px',
                }}>
                  {/* Group Name - Headline 4 Emphasized */}
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#050505',
                    margin: '0 0 4px',
                    lineHeight: '20px',
                    letterSpacing: '-0.24px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    height: '40px',
                  }}>
                    {group.name}
                  </p>
                  {/* Meta - Meta 4 */}
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#65686c',
                    margin: '0 0 12px',
                    lineHeight: '16px',
                  }}>
                    {group.listingsPerDay} listings a day
                  </p>
                  {/* View Button - Primary Deemphasized, Medium, Full Width */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/m/groups/${group.slug}`);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#ebf5ff',
                      color: '#0866ff',
                      fontSize: '15px',
                      fontWeight: '600',
                      lineHeight: '20px',
                      letterSpacing: '-0.24px',
                      cursor: 'pointer',
                    }}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Remaining toy listings after Groups */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
          width: '100%',
          boxSizing: 'border-box',
          paddingTop: '8px',
        }}>
          {filteredListings.slice(12).map((toy, index) => (
            <div 
              key={`final-${toy.id}`} 
              onClick={() => router.push(`/m/marketplace/${toy.id}`)}
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Image */}
              <div style={{ 
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                overflow: 'hidden',
              }}>
                <img 
                  src={toy.image} 
                  alt={toy.title}
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }}
                />
                {toy.badge === 'Just listed' && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}>
                    Just listed
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '8px 12px 12px',
                paddingLeft: index % 2 === 0 ? '12px' : '4px',
                paddingRight: '4px',
              }}>
                {/* Price - Headline 4 */}
                <p style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '20px',
                  letterSpacing: '-0.24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.price}
                </p>
                {/* Title - Body 4 */}
                <p style={{
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#080809',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '-0.08px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.title}
                </p>
                {/* Location - Meta 4, Secondary Text */}
                <p style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  color: '#65686c',
                  margin: 0,
                  lineHeight: '16px',
                  letterSpacing: '0px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {toy.location} · {toy.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Save Upsell Sheet */}
      <UpsellBottomSheet 
        isOpen={showSaveSheet}
        onClose={() => setShowSaveSheet(false)}
        type="save"
      />

      </div>
    </>
  );
}
