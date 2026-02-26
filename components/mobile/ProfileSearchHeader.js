"use client";

import { useState, useEffect, useRef } from "react";
import { IconInline } from "../Icon";

// Animation timing constants
const INITIAL_DELAY = 2000;
const CYCLE_INTERVAL = 3000;

const ProfileSearchHeader = ({ 
  suggestions = [],
  placeholder = "Search",
  onSuggestionTap,
}) => {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [showInitialPlaceholder, setShowInitialPlaceholder] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const cycleIntervalRef = useRef(null);

  // Initial transition: placeholder -> first suggestion
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setAnimationPhase('exiting');
      
      setTimeout(() => {
        setShowInitialPlaceholder(false);
        setAnimationPhase('entering');
        
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 300);
      }, 300);
    }, INITIAL_DELAY);

    return () => clearTimeout(initialTimer);
  }, []);

  // Cycle through suggestions
  useEffect(() => {
    if (showInitialPlaceholder || suggestions.length === 0) return;
    
    cycleIntervalRef.current = setInterval(() => {
      setAnimationPhase('exiting');
      
      setTimeout(() => {
        setCurrentSuggestionIndex((prev) => 
          (prev + 1) % suggestions.length
        );
        setAnimationPhase('entering');
        
        setTimeout(() => {
          setAnimationPhase('idle');
        }, 300);
      }, 300);
    }, CYCLE_INTERVAL);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, [showInitialPlaceholder, suggestions.length]);

  const currentText = showInitialPlaceholder 
    ? placeholder 
    : suggestions[currentSuggestionIndex];

  const getAnimationClass = () => {
    if (animationPhase === 'exiting') return 'profile-search__text--exiting';
    if (animationPhase === 'entering') return 'profile-search__text--entering';
    return '';
  };

  const handleClick = () => {
    if (!showInitialPlaceholder && onSuggestionTap) {
      onSuggestionTap(currentText);
    }
  };

  return (
    <div className="profile-search-header">
      <div className="profile-search-header__bar">
        <div className="profile-search-header__icon">
          <IconInline name="magnifying-glass-filled" size={16} color="secondary" />
        </div>
        <button 
          className="profile-search-header__input"
          onClick={handleClick}
        >
          <span 
            className={`profile-search__text ${getAnimationClass()}`}
            key={showInitialPlaceholder ? 'initial' : currentSuggestionIndex}
          >
            {currentText}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSearchHeader;

