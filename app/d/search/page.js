"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { topicsData, getAllTopics } from "../../m/_data/topicsData";
import "./desktop-search.scss";

// Google logo SVG
const GoogleLogo = () => (
  <svg viewBox="0 0 272 92" width="92" height="30" className="google-logo">
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#9334E6">
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

// Search icon
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#4285F4">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

// Clear icon
const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#70757a">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Mic icon
const MicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="#4285f4" d="M12 15c1.66 0 3-1.31 3-2.97V5.97C15 4.31 13.66 3 12 3S9 4.31 9 5.97v6.06C9 13.69 10.34 15 12 15z"/>
    <path fill="#34a853" d="M11 18.08h2V22h-2z"/>
    <path fill="#fbbc04" d="M7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45.56 2.42 1.47 3.38l-1.42 1.49z"/>
    <path fill="#ea4335" d="M12 16.93a4.97 5.25 0 0 1-3.54-1.55l-1.41 1.49C8.84 18.75 10.34 19 12 19s3.16-.25 4.95-2.13l-1.41-1.49A4.97 5.25 0 0 1 12 16.93z"/>
    <path fill="#4285f4" d="M18.95 12H17c0 2.04-.78 3.54-2.05 4.87l1.42 1.49C18.19 16.42 19 14.61 19 12h-.05z"/>
  </svg>
);

// Google Lens icon  
const LensIcon = () => (
  <svg width="24" height="24" viewBox="0 0 192 192" fill="none">
    <circle cx="96" cy="96" r="28" stroke="#4285F4" strokeWidth="16"/>
    <path d="M160 96c0 35.346-28.654 64-64 64" stroke="#34A853" strokeWidth="16" strokeLinecap="round"/>
    <path d="M96 160c-35.346 0-64-28.654-64-64" stroke="#FBBC04" strokeWidth="16" strokeLinecap="round"/>
    <path d="M32 96c0-35.346 28.654-64 64-64" stroke="#EA4335" strokeWidth="16" strokeLinecap="round"/>
    <path d="M96 32c35.346 0 64 28.654 64 64" stroke="#4285F4" strokeWidth="16" strokeLinecap="round"/>
  </svg>
);

// Apps grid icon
const AppsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
    <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
  </svg>
);

// Chevron down icon
const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a73e8">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

// Tab icons
const TabIcons = {
  all: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),
  images: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  ),
  videos: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
    </svg>
  ),
  news: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 3H2v18h20V3zm-2 16H4V5h16v14zm-6-2H6v-2h8v2zm4-4H6V7h12v6z"/>
    </svg>
  ),
  shopping: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/>
    </svg>
  ),
  more: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
};

export default function DesktopSearchPage() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState("coffee");
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const allTopics = getAllTopics();
  
  // Get current topic data
  const topicData = topicsData[selectedTopic];
  const searchQuery = topicData.searchQuery;
  const aiOverviewContent = topicData.aiOverview;
  const groupName = topicData.groupData.groupName;

  // Build search results from topic data
  const searchResults = topicData.searchResults.map((result, idx) => ({
    ...result,
    groupName: topicData.groupData.groupName,
    postUrl: `/d/groups/${selectedTopic}/posts/${result.postId || result.id}?topic=${selectedTopic}&resultIdx=${idx}`,
  }));

  // Store selected topic in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTopic', selectedTopic);
    }
  }, [selectedTopic]);

  const handleResultClick = (url) => {
    router.push(url);
  };

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setShowTopicDropdown(false);
  };

  return (
    <div className="gserp">
      {/* Header */}
      <header className="gserp-header">
        <div className="gserp-header__left">
          <GoogleLogo />
        </div>
        
        <div className="gserp-header__center">
          <div className="gserp-searchbox">
            <input 
              type="text" 
              className="gserp-searchbox__input" 
              defaultValue={searchQuery}
              readOnly
            />
            <button className="gserp-searchbox__clear">
              <ClearIcon />
            </button>
            <div className="gserp-searchbox__divider" />
            <button className="gserp-searchbox__mic">
              <MicIcon />
            </button>
            <button className="gserp-searchbox__lens">
              <LensIcon />
            </button>
            <button className="gserp-searchbox__search">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="gserp-header__right">
          {/* Topic Selector for Demo */}
          <div className="gserp-topic-selector">
            <button 
              className="gserp-topic-selector__btn"
              onClick={() => setShowTopicDropdown(!showTopicDropdown)}
            >
              <span>Topic: {topicData.label}</span>
              <ChevronDownIcon />
            </button>
            {showTopicDropdown && (
              <div className="gserp-topic-selector__dropdown">
                {allTopics.map((topic) => (
                  <button
                    key={topic.id}
                    className={`gserp-topic-selector__option ${selectedTopic === topic.id ? 'active' : ''}`}
                    onClick={() => handleTopicSelect(topic.id)}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="gserp-header__apps">
            <AppsIcon />
          </button>
          <div className="gserp-header__avatar">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces" 
              alt="Profile"
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div style={{
        borderBottom: '1px solid #ebebeb',
        paddingLeft: '152px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#1a73e8', fontSize: '14px', cursor: 'pointer', borderBottom: '3px solid #1a73e8', marginBottom: '-1px', fontWeight: '500'}}>All</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Forums</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Short videos</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Images</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Shopping</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Videos</span>
        <span style={{display: 'flex', alignItems: 'center', padding: '14px 16px', color: '#5f6368', fontSize: '14px', cursor: 'pointer'}}>Tools</span>
      </div>

      {/* Main Content */}
      <main className="gserp-main">
        <div className="gserp-results">
          {/* AI Overview */}
          <section className="gserp-ai-overview">
            <div className="gserp-ai-overview__header">
              <AISparkleIcon />
              <span className="gserp-ai-overview__title">AI Overview</span>
              <button className="gserp-ai-overview__more">
                <MoreIcon />
              </button>
            </div>

            <div className="gserp-ai-overview__body">
              <div className="gserp-ai-overview__content">
                <p>
                  For top-rated cafes in Portland, Maine, <span className="gserp-ai-overview__highlight">consider Coveside Coffee, Proper Cup, Yordprom Coffee, and Coffee by Design on Diamond St.</span> Other great options include LB Kitchen and Coffee Me Up on Commercial Street.
                </p>
                <p className="gserp-ai-overview__subtitle">Here are the top recommendations:</p>
                <ul className="gserp-ai-overview__list">
                  <li><strong>Speckled Ax:</strong> Known for unique, innovative coffee practices; a true destination.</li>
                  <li><strong>Tandem Coffee Roasters:</strong> Popular for its excellent coffee and pastries.</li>
                  <li><strong>Coffee by Design:</strong> Local favorite with great atmosphere and strong community ties.</li>
                </ul>
                {isExpanded && (
                  <>
                    <p>{aiOverviewContent.expandedText}</p>
                    <ul className="gserp-ai-overview__list">
                      {searchResults[0]?.comments?.slice(0, 4).map((comment, idx) => (
                        <li key={idx}>{comment.text}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {!isExpanded && <div className="gserp-ai-overview__gradient" />}

            <button 
              className="gserp-ai-overview__showmore"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>{isExpanded ? 'Show less' : 'Show more'}</span>
              <ChevronDownIcon />
            </button>

            <div className="gserp-ai-overview__divider" />
          </section>

          {/* Search Results */}
          {searchResults.map((result, index) => (
            <article 
              key={result.id} 
              className="gserp-result"
              onClick={() => handleResultClick(result.postUrl)}
            >
              <div className="gserp-result__source">
                <img 
                  src="https://www.facebook.com/favicon.ico" 
                  alt="Facebook" 
                  className="gserp-result__favicon"
                />
                <div className="gserp-result__source-text">
                  <span className="gserp-result__site">Facebook · {result.groupName}</span>
                  <span className="gserp-result__breadcrumb">{result.commentsCount} comments · {result.timeAgo}</span>
                </div>
                <button className="gserp-result__more" onClick={(e) => e.stopPropagation()}>
                  <MoreIcon />
                </button>
              </div>

              <h3 className="gserp-result__title">{result.title}</h3>
              
              <p className="gserp-result__description">
                {result.description}
                <a href="#" className="gserp-result__readmore" onClick={(e) => e.stopPropagation()}>Read more</a>
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
