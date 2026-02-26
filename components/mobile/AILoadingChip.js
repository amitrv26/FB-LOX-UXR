"use client";

import { useState, useEffect } from "react";

// ============================================
// AI LOADING CHIP
// Animated chip that shows AI processing status
// Cycles through 6 phases with facepile animation
// ============================================

const LOADING_PHASES = [
  { text: "", duration: 250, photos: 1 },
  { text: "", duration: 250, photos: 2 },
  { text: "", duration: 250, photos: 3 },
  { text: "Working on this", duration: 800, photos: 3 },
  { text: "Putting it all together...", duration: 600, photos: 3 },
];

const FACEPILE_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
];

const AILoadingChip = ({ 
  finalCount = "32.1K",
  appearDelay = 200,
  onLoadingComplete 
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fade in after appearDelay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), appearDelay);
    return () => clearTimeout(timer);
  }, [appearDelay]);

  // Cycle through loading phases
  useEffect(() => {
    if (!isVisible || isComplete) return;

    if (currentPhase < LOADING_PHASES.length) {
      const timer = setTimeout(() => {
        setCurrentPhase((prev) => prev + 1);
      }, LOADING_PHASES[currentPhase].duration);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      onLoadingComplete?.();
    }
  }, [isVisible, currentPhase, isComplete, onLoadingComplete]);

  const getCurrentText = () => {
    if (isComplete) {
      return `${finalCount} people talking about this`;
    }
    return LOADING_PHASES[currentPhase]?.text || LOADING_PHASES[0].text;
  };

  const getVisiblePhotos = () => {
    if (isComplete) return 3;
    return LOADING_PHASES[currentPhase]?.photos || 0;
  };

  const visiblePhotos = getVisiblePhotos();

  return (
    <div 
      className={`ai-loading-chip ${isVisible ? 'ai-loading-chip--visible' : ''}`}
    >
      {/* Facepile - always rendered to maintain consistent width */}
      <div className="ai-loading-chip__facepile">
        {FACEPILE_AVATARS.map((avatar, idx) => (
          <img
            key={idx}
            src={avatar}
            alt=""
            className={`ai-loading-chip__avatar ${idx < visiblePhotos ? 'ai-loading-chip__avatar--visible' : ''}`}
            style={{ 
              zIndex: 3 - idx,
              marginLeft: idx > 0 ? '-8px' : '0'
            }}
          />
        ))}
      </div>
      
      {/* Text - only show if there's text */}
      {getCurrentText() && (
        <span className="ai-loading-chip__text">{getCurrentText()}</span>
      )}
    </div>
  );
};

export default AILoadingChip;

