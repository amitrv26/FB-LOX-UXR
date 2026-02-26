/**
 * AI Overview Section
 * The purple AI summary that appears at the top of search results
 * 
 * DESIGNERS:
 * - Edit AI_CONTENT to change the summary text for each category
 * - Edit FACEPILE_AVATARS to change the profile pictures
 */

import { AISparkleIcon, MoreIcon, ChevronDownIcon } from './Icons';

// ============================================
// EDIT THIS TO CHANGE AI OVERVIEW CONTENT
// ============================================
const AI_CONTENT = {
  groups: {
    summary: "For family-friendly hotels in Tokyo, travelers recommend staying in Shinjuku or Shibuya for convenience. Popular options include the Keio Plaza Hotel, Hilton Tokyo, and Hotel Gracery Shinjuku.",
    expandedText: "Many families prefer hotels with larger rooms and easy access to train stations. The Tokyo Bay area is also popular for families visiting Tokyo Disney Resort.",
  },
  profile: {
    summary: "Joe's Pizza is a legendary New York pizzeria known for authentic thin-crust slices. Featured in Spider-Man films, it's a must-visit spot in Greenwich Village.",
    expandedText: "Open late night, Joe's serves classic New York-style pizza with a perfectly crispy crust. Expect lines but quick service.",
  },
  marketplace: {
    summary: "When buying used cars, check vehicle history reports, inspect for rust or damage, and verify maintenance records. Popular reliable brands include Toyota, Honda, and Lexus.",
    expandedText: "Consider certified pre-owned vehicles for added warranty protection. Always test drive and have an independent mechanic inspect the car.",
  },
  video: {
    summary: "Tonight's NBA highlights feature Steph Curry's incredible shooting performance and LeBron's clutch plays. The Warriors and Lakers delivered an instant classic.",
    expandedText: "Watch full game recaps and player interviews on NBA official channels. Don't miss the top 10 plays of the week.",
  },
};

// Profile pictures shown next to AI Overview
const FACEPILE_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces",
];

export default function AIOverview({ category }) {
  const content = AI_CONTENT[category] || AI_CONTENT.groups;

  return (
    <section className="ai-overview">
      {/* Header Row */}
      <div className="ai-overview__header">
        <AISparkleIcon />
        <span className="ai-overview__title">AI Overview</span>
        
        {/* Facepile */}
        <div className="ai-overview__facepile">
          {FACEPILE_AVATARS.map((avatar, idx) => (
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
      
      {/* Content */}
      <div className="ai-overview__content">
        <p className="ai-overview__text">{content.summary}</p>
        <p className="ai-overview__text">{content.expandedText}</p>
      </div>

      {/* Show More Button */}
      <button className="ai-overview__show-more">
        <span>Show more</span>
        <ChevronDownIcon />
      </button>
      
      {/* Divider */}
      <div style={{ 
        backgroundColor: '#dadce0', 
        marginLeft: '-16px',
        marginRight: '-16px',
        marginTop: '16px',
        marginBottom: '12px',
        height: '4px'
      }} />
    </section>
  );
}
