"use client";

import { useState } from "react";
import AggregationHeader from "./AggregationHeader";
import ReelsGrid from "./ReelsGrid";
import MarketplaceGrid from "./MarketplaceGrid";
import { 
  AISparkleIcon, 
  ChevronDownIcon as ChevronDownIconBase, 
  LinkIcon as LinkIconBase 
} from "../icons";

// Wrapper components with local styling
const GenAiStarIcon = ({ size = 12 }) => <AISparkleIcon size={size} color="#9334E6" />;
const ChevronDownIcon = () => <ChevronDownIconBase size={16} color="#0866ff" />;
const LinkIcon = () => <LinkIconBase size={12} color="#0866ff" />;

// AI Intro Section with inline links
const AIIntroSection = ({ intro, onLinkClick }) => {
  // Parse text and replace highlights with clickable links
  const renderTextWithLinks = () => {
    if (!intro.highlights || intro.highlights.length === 0) {
      return intro.text;
    }

    let text = intro.text;
    const parts = [];
    let lastIndex = 0;

    intro.highlights.forEach((highlight, idx) => {
      const index = text.indexOf(highlight.text, lastIndex);
      if (index !== -1) {
        // Add text before the link
        if (index > lastIndex) {
          parts.push(text.substring(lastIndex, index));
        }
        // Add the link
        parts.push(
          <button 
            key={idx}
            className="balanced__inline-link"
            onClick={() => onLinkClick?.(highlight)}
          >
            {highlight.text}
            <LinkIcon />
          </button>
        );
        lastIndex = index + highlight.text.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="balanced__ai-intro">
      <div className="balanced__ai-badge">
        <GenAiStarIcon size={14} />
        <span>AI Overview</span>
      </div>
      <p className="balanced__ai-text">{renderTextWithLinks()}</p>
    </div>
  );
};

// AI Section for mid-page summaries
const AISectionMid = ({ title, summary }) => (
  <div className="balanced__ai-section">
    <h3 className="balanced__ai-section-title">{title}</h3>
    <p className="balanced__ai-section-text">{summary}</p>
  </div>
);

const BalancedExperience = ({ 
  data,
  onBack,
  onReelClick,
  onMarketplaceClick,
  onQueryClick,
  onLinkClick,
  onFacebookClick
}) => {
  const [showMoreReels, setShowMoreReels] = useState(false);

  if (!data) return null;

  const displayReels = showMoreReels ? data.reels : data.reels?.slice(0, 4);

  return (
    <div className="balanced-experience">
      {/* Header */}
      <AggregationHeader
        topic={data.topic}
        socialProof={data.socialProof}
        onBack={onBack}
        onFacebookClick={onFacebookClick}
      />

      {/* Main Content */}
      <main className="balanced__main">
        {/* AI Intro */}
        {data.aiIntro && (
          <AIIntroSection 
            intro={data.aiIntro} 
            onLinkClick={onLinkClick}
          />
        )}

        {/* Reels Grid - Theories and Discussions */}
        {data.reels && data.reels.length > 0 && (
          <section className="balanced__reels-section">
            <ReelsGrid
              reels={displayReels}
              columns={2}
              onReelClick={onReelClick}
            />
            
            {!showMoreReels && data.reels.length > 4 && (
          <button 
                className="balanced__see-more"
                onClick={() => setShowMoreReels(true)}
          >
                <span>See more</span>
            <ChevronDownIcon />
          </button>
        )}
      </section>
        )}

        {/* Divider */}
        <div className="balanced__divider" />

        {/* AI Section - Watch Party Ideas */}
        <AISectionMid
          title="Watch party ideas"
          summary="Fans are getting creative with their Stranger Things finale watch parties. Popular ideas include Eggo waffle bars, Demogorgon-themed treats, 80s playlists, and Christmas light decorations to recreate the iconic Byers house aesthetic."
        />

        {/* Marketplace Section */}
        {data.marketplace && data.marketplace.length > 0 && (
          <section className="balanced__marketplace-section">
            <MarketplaceGrid
              items={data.marketplace}
              title="Shop for your watch party"
              columns={2}
              maxItems={4}
              onItemClick={onMarketplaceClick}
              showSeeMore={data.marketplace.length > 4}
              onSeeMore={() => {}}
            />
          </section>
        )}

        {/* Party Reels Section */}
        {data.partyReels && data.partyReels.length > 0 && (
          <section className="balanced__party-reels">
            <ReelsGrid
              reels={data.partyReels}
              title="Party inspiration"
              columns={2}
              maxItems={4}
              onReelClick={onReelClick}
            />
          </section>
        )}

        {/* Divider */}
        <div className="balanced__divider" />

        {/* Others Searched For */}
        {data.relatedQueries && data.relatedQueries.length > 0 && (
          <section className="balanced__related">
            <h3 className="balanced__related-title">Others searched for</h3>
            <div className="balanced__related-chips">
              {data.relatedQueries.map((query, idx) => (
            <button 
                  key={idx}
                  className="balanced__related-chip"
                  onClick={() => onQueryClick?.(query)}
            >
                  {query}
            </button>
              ))}
            </div>
          </section>
        )}

        {/* Related Groups */}
        {data.relatedGroups && data.relatedGroups.length > 0 && (
          <section className="balanced__groups">
            <h3 className="balanced__groups-title">Join the conversation</h3>
            <div className="balanced__groups-scroll">
              {data.relatedGroups.map((group) => (
                <div key={group.id} className="balanced__group-card">
                  <img 
                    src={group.avatar} 
                    alt={group.name}
                    className="balanced__group-avatar"
                  />
                  <h4 className="balanced__group-name">{group.name}</h4>
                  <span className="balanced__group-members">{group.members} members</span>
                  <button className="balanced__group-join">Join</button>
          </div>
        ))}
      </div>
    </section>
        )}
      </main>
      </div>
  );
};

export default BalancedExperience;
