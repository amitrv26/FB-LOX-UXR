"use client";

import { useState } from "react";

// Experience Type options - shared across all aggregation experiences
export const EXPERIENCE_TYPES = [
  { 
    id: 'grid-view', 
    label: 'Grid View', 
    description: 'Card-based layout with expandable sections',
    icon: '⊞'
  },
  { 
    id: 'h-scroll', 
    label: 'Horizontal Scroll', 
    description: 'Swipeable carousel experience',
    icon: '↔'
  },
  { 
    id: 'ai-forward', 
    label: 'AI Forward', 
    description: 'AI-generated summary with deep dives',
    icon: '✨'
  },
  { 
    id: 'immersive-view', 
    label: 'Immersive View', 
    description: 'Full-screen video-forward experience',
    icon: '▶'
  },
];

// Experience Type Bottom Sheet - lets users switch between aggregation page variants
export const ExperienceTypeBottomSheet = ({ isOpen, onClose, currentType, onSelectType }) => {
  if (!isOpen) return null;
  
  return (
    <div className="info-bottom-sheet-overlay" onClick={onClose}>
      <div className="info-bottom-sheet experience-type-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="info-bottom-sheet__handle" />
        <div className="info-bottom-sheet__header">
          <h2 className="info-bottom-sheet__title">Experience Type</h2>
          <p className="experience-type-sheet__subtitle">Try different aggregation page layouts</p>
        </div>
        <div className="experience-type-sheet__options">
          {EXPERIENCE_TYPES.map((type) => (
            <button
              key={type.id}
              className={`experience-type-sheet__option ${currentType === type.id ? 'experience-type-sheet__option--selected' : ''}`}
              onClick={() => {
                onSelectType(type.id);
                onClose();
              }}
            >
              <span className="experience-type-sheet__option-icon">{type.icon}</span>
              <div className="experience-type-sheet__option-content">
                <span className="experience-type-sheet__option-label">{type.label}</span>
                <span className="experience-type-sheet__option-description">{type.description}</span>
              </div>
              {currentType === type.id && (
                <span className="experience-type-sheet__option-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hook to manage experience type sheet state
export const useExperienceTypeSheet = (currentExperienceId, onExperienceChange) => {
  const [showSheet, setShowSheet] = useState(false);

  const openSheet = () => setShowSheet(true);
  const closeSheet = () => setShowSheet(false);

  const handleSelectType = (type) => {
    if (type !== currentExperienceId && onExperienceChange) {
      onExperienceChange(type);
    }
  };

  return {
    showSheet,
    openSheet,
    closeSheet,
    handleSelectType,
  };
};

export default ExperienceTypeBottomSheet;
