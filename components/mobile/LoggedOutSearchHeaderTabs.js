"use client";

import { useState } from "react";

// Default tabs for logged-out search header
const DEFAULT_TABS = [
  { id: "all", label: "All" },
  { id: "groups", label: "Groups" },
  { id: "reels", label: "Reels" },
  { id: "marketplace", label: "Marketplace" },
  { id: "pages", label: "Pages" },
  { id: "people", label: "People" },
];

// Top Navigation Bar with search query title - Headline 3 Emphasized
const TopNavBar = ({ searchQuery, onTitleClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "12px 12px 4px 12px",
      background: "#fff",
    }}
  >
    <button
      onClick={onTitleClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <h1
        style={{
          // Headline 3 Emphasized
          fontSize: "17px",
          fontWeight: 700,
          lineHeight: "22px",
          letterSpacing: "normal",
          color: "#080809",
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {searchQuery}
      </h1>
    </button>
  </div>
);

// Tab Bar - Profile sub-nav style (no scrollbar)
const TabBar = ({ tabs, activeTab, onTabChange }) => (
  <div
    style={{
      display: "flex",
      gap: "8px",
      padding: "0px 12px 12px",
      background: "#fff",
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
    className="hide-scrollbar"
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          padding: "8px 16px",
          borderRadius: "20px",
          border: "none",
          background: activeTab === tab.id ? "#ebf5ff" : "transparent",
          color: activeTab === tab.id ? "#0064d1" : "#080809",
          fontSize: "15px",
          fontWeight: activeTab === tab.id ? 600 : 400,
          lineHeight: "20px",
          letterSpacing: "normal",
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// Combined Header + Tabs component
export default function LoggedOutSearchHeaderTabs({
  searchQuery,
  activeTab,
  onTabChange,
  onTitleClick,
  tabs = DEFAULT_TABS,
  hideTabs = false, // Option to hide the tab bar
  children, // Optional content to render between title and tabs
}) {
  return (
    <div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <TopNavBar searchQuery={searchQuery} onTitleClick={onTitleClick} />
      {children}
      {!hideTabs && <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />}
    </div>
  );
}

