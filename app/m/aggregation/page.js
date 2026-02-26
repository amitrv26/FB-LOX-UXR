"use client";

import React from "react";
import { useRouter } from "next/navigation";

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

// AI sparkle icon
const AISparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#9334E6">
    <path d="M10.3137 9.16065C9.59548 7.62174 7.40721 7.62175 6.689 9.16065L6.3031 9.98752C5.62186 11.4472 4.44855 12.6205 2.98886 13.3018L2.16199 13.6877C0.623084 14.4059 0.623089 16.5941 2.16199 17.3123L2.98886 17.6982C4.44855 18.3795 5.62186 19.5528 6.3031 21.0125L6.689 21.8394C7.40721 23.3783 9.59548 23.3783 10.3137 21.8394L10.6996 21.0125C11.3808 19.5528 12.5541 18.3795 14.0138 17.6982L14.8407 17.3123C16.3796 16.5941 16.3796 14.4059 14.8407 13.6877L14.0138 13.3018C12.5541 12.6205 11.3808 11.4472 10.6996 9.98752L10.3137 9.16065Z" />
    <path d="M12.002 1C10.3451 1 9.00195 2.34315 9.00195 4C9.00195 5.65685 10.3451 7 12.002 7C13.6588 7 15.002 5.65685 15.002 4C15.002 2.34315 13.6588 1 12.002 1Z" />
    <path d="M20.9417 13.0532C22.4288 13.4517 23.7896 12.0908 23.3911 10.6037L22.0463 5.5846C21.6478 4.09745 19.7889 3.59936 18.7002 4.68802L15.026 8.36226C13.9373 9.45092 14.4354 11.3098 15.9226 11.7083L20.9417 13.0532Z" />
  </svg>
);

// Three dots menu icon
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#70757a">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Chevron down icon
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

// Facepile avatars
const facepileAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
];

// AI Overview content for aggregation
const AI_OVERVIEW = {
  summary: "Stranger Things Season 5 finale predictions focus on Will Byers' special connection to the Upside Down and Eleven's potential sacrifice. Fans expect major revelations about Vecna's true origin and the Mind Flayer's role.",
  expandedText: "Popular theories suggest the Upside Down being frozen in 1983 is key to the finale, with many predicting time manipulation and at least one major character death. The Duffer Brothers promise to tie up all storylines.",
};

export default function AggregationGoogleSearchPage() {
  const router = useRouter();
  const searchQuery = "Stranger Things finale predictions";

  return (
    <div className="google-search-page">
      {/* Header - matches /m/search structure */}
      <header className="google-header">
        <div className="google-header__top">
          <button className="google-header__menu">
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
          <span className="google-search-bar__query">{searchQuery}</span>
          <button className="google-search-bar__clear">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#202124">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="google-tabs">
          <button className="google-tabs__tab google-tabs__tab--active">All</button>
          <button className="google-tabs__tab">Short videos</button>
          <button className="google-tabs__tab">Images</button>
          <button className="google-tabs__tab">Forums</button>
          <button className="google-tabs__tab">News</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="google-results">
        {/* AI Overview */}
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
              {AI_OVERVIEW.summary}
            </p>
            <p className="ai-overview__text">
              {AI_OVERVIEW.expandedText}
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

        {/* Aggregation Result - "Explore Topic" Card */}
        <article 
          style={{ 
            cursor: 'pointer', 
            paddingBottom: '0px',
          }}
          onClick={() => router.push('/m/aggregation/stranger-things-finale')}
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

        {/* Divider after aggregation result */}
        <div style={{ 
          backgroundColor: '#dadce0', 
          marginLeft: '-16px',
          marginRight: '-16px',
          marginTop: '12px',
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
            {/* Short video cards */}
            {[
              { id: 'video-1', title: 'Season 5 finale theory breakdown', source: 'Facebook', duration: '2:15', poster: '/images/stranger-things-assets/images/profile/stranger-things-post.png' },
              { id: 'video-2', title: 'Will Byers is the key!', source: 'Facebook', duration: '1:45', poster: '/images/stranger-things-assets/images/profile/rio-theatre-post.jpg' },
              { id: 'video-3', title: 'Who will survive? My picks', source: 'Facebook', duration: '1:32', poster: '/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg' },
            ].map((video) => (
              <div 
                key={video.id} 
                style={{ 
                  flexShrink: 0, 
                  width: '140px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '140px',
                  height: '200px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '8px',
                }}>
                  <img 
                    src={video.poster}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Duration badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {video.duration}
                  </span>
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#202124',
                  margin: '0 0 4px',
                  lineHeight: '1.3',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {video.title}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#70757a',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {video.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
