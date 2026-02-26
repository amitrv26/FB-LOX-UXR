import React from 'react';
import { IconInline } from '../Icon';
import CircleButton from '../button/circleButton';

const ReelsActions = ({ 
  isPanelOpen = false,
  onPanelToggle, 
  onPreviousVideo, 
  onNextVideo,
  hasPrevious = false,
  hasNext = true
}) => {
  return (
    <div className="reels-actions">
      {/* Side Panel Toggle */}
      <div className="reels-actions-panel-toggle">
        <CircleButton
          type="secondary-on-media"
          size="large"
          icon={isPanelOpen ? "sidebar-right-close-filled" : "sidebar-right-open-filled"}
          iconColor="onMedia"
          active={isPanelOpen}
          performAction={onPanelToggle}
        />
      </div>

      {/* Video Navigation */}
      <div className="reels-actions-navigation">
        <button
          className="reels-navigation-button"
          onClick={onPreviousVideo}
          disabled={!hasPrevious}
          aria-label="Previous video"
        >
          <IconInline 
            name="chevron-up-circle-outline" 
            size={48} 
            color={hasPrevious ? "onMedia" : "disabled"}
          />
        </button>
        
        <button
          className="reels-navigation-button"
          onClick={onNextVideo}
          disabled={!hasNext}
          aria-label="Next video"
        >
          <IconInline 
            name="chevron-down-circle-outline" 
            size={48} 
            color="secondaryOnMedia"
          />
        </button>
      </div>
    </div>
  );
};

export default ReelsActions;

