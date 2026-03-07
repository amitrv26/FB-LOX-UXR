/**
 * Google Search Header
 * Contains the logo, search bar, and navigation tabs
 * 
 * DESIGNERS: 
 * - Edit TABS array to change tab names
 * - Edit PROFILE_IMAGE to change the avatar
 */

import { GoogleLogo, MenuIcon, SearchIcon, CloseIcon } from './Icons';

// ============================================
// EDIT THESE VALUES TO CHANGE THE TABS
// ============================================
const TABS = [
  { id: 'all', label: 'All', active: true },
  { id: 'short-videos', label: 'Short videos' },
  { id: 'images', label: 'Images' },
  { id: 'forums', label: 'Forums' },
  { id: 'news', label: 'News' },
];

// Profile avatar image URL
const PROFILE_IMAGE = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces";

export default function GoogleHeader({ query, onMenuClick }) {
  return (
    <header className="google-header">
      {/* Top Row: Menu, Logo, Avatar */}
      <div className="google-header__top">
        <button 
          className="google-header__menu"
          onClick={onMenuClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        
        <GoogleLogo />
        
        <div className="google-header__avatar">
          <img src={PROFILE_IMAGE} alt="Profile" />
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

      {/* Navigation Tabs */}
      <div className="google-tabs">
        {TABS.map((tab) => (
          <button 
            key={tab.id}
            className={`google-tabs__tab ${tab.active ? 'google-tabs__tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
