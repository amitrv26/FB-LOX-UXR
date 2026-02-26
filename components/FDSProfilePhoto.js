"use client";

import { forwardRef } from "react";
import classNames from "classnames";

/**
 * FDSProfilePhoto Component
 * Based on Facebook's FDS implementation
 * 
 * @see https://www.internalfb.com/spec/FDSProfilePhoto
 * Supports: sizes, shapes, story rings, add-ons (badges), pressable functionality
 */

const FDSProfilePhoto = forwardRef((props, ref) => {
  const {
    // Core props
    size = 40,
    source,
    alt = "",
    shape = "circle",
    
    // Story status
    storyStatus = "none", // 'none' | 'unseen' | 'seen' | 'live' | 'uploading'
    shouldShowCloseFriendsBadge = false,
    
    // Add-ons
    addOn, // { type: 'availability' | 'activity', status: 'active' | 'inactive' }
    addOnTopEnd, // { type: 'notificationBadge', number: number }
    
    // Interaction
    onClick,
    onHoverIn,
    onHoverOut,
    disabled = false,
    cursorDisabled = false,
    overlayDisabled = false,
    
    // Accessibility
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    role,
    
    // Preview while loading
    preview, // { type: 'color' | 'blur', color?: string, source?: string }
    
    // Children overlay
    children,
    
    // Testing
    testid,
    
    // Internal
    isOverlapped = false,
  } = props;

  const isPressable = !!(onClick || props.linkProps);
  const hasStoryRing = storyStatus !== "none";
  
  // Calculate ring colors based on story status
  const getRingColor = () => {
    if (storyStatus === "live") {
      return "var(--live-video-ring, #F3425F)";
    }
    if (storyStatus === "unseen") {
      return shouldShowCloseFriendsBadge 
        ? "var(--close-friends-ring, #31A24C)" 
        : "var(--story-ring, #1877F2)";
    }
    if (storyStatus === "seen") {
      return "var(--story-seen-ring, #65676B)";
    }
    if (storyStatus === "uploading") {
      return "var(--uploading-ring, #E4E6EB)";
    }
    return "transparent";
  };

  // Get border radius based on shape
  const getBorderRadius = () => {
    if (shape === "circle") return "50%";
    if (shape === "roundedRect") return "8px";
    if (shape === "roundedRectLarge") return "16px";
    return "0";
  };

  const containerClasses = classNames(
    "fds-profile-photo",
    `fds-profile-photo--size-${size}`,
    `fds-profile-photo--shape-${shape}`,
    {
      "fds-profile-photo--pressable": isPressable,
      "fds-profile-photo--disabled": disabled,
      "fds-profile-photo--has-story-ring": hasStoryRing,
      "fds-profile-photo--overlapped": isOverlapped,
    }
  );

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      ref={ref}
      className={containerClasses}
      onClick={handleClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      role={role || (isPressable ? "button" : undefined)}
      aria-label={ariaLabel || alt}
      aria-hidden={ariaHidden}
      data-testid={testid}
      style={{
        cursor: disabled ? "default" : cursorDisabled ? "default" : isPressable ? "pointer" : "default",
      }}
    >
      {/* Story Ring */}
      {hasStoryRing && (
        <div
          className="fds-profile-photo__ring"
          style={{
            borderColor: getRingColor(),
            borderRadius: getBorderRadius(),
          }}
        />
      )}

      {/* Profile Image Container */}
      <div
        className="fds-profile-photo__image-container"
        style={{
          borderRadius: getBorderRadius(),
        }}
      >
        {/* Preview/Loading State */}
        {preview && preview.type === "color" && (
          <div
            className="fds-profile-photo__preview"
            style={{
              backgroundColor: preview.color || "var(--web-wash, #F0F2F5)",
              borderRadius: getBorderRadius(),
            }}
          />
        )}

        {/* Main Image */}
        <img
          src={source}
          alt={alt}
          className="fds-profile-photo__image"
          style={{
            borderRadius: getBorderRadius(),
          }}
        />

        {/* Hover/Press Overlay */}
        {isPressable && !overlayDisabled && (
          <div
            className="fds-profile-photo__overlay"
            style={{
              borderRadius: getBorderRadius(),
            }}
          />
        )}
      </div>

      {/* Children Overlay - rendered outside image-container to avoid clipping */}
      {children}

      {/* Bottom-End Add-on (Availability/Activity Badge) */}
      {addOn && shape === "circle" && (
        <div className={classNames(
          "fds-profile-photo__addon",
          "fds-profile-photo__addon--bottom-end",
          `fds-profile-photo__addon--${addOn.type}`,
          `fds-profile-photo__addon--${addOn.status}`
        )}>
          {addOn.type === "activity" && (
            <div className="fds-profile-photo__addon-icon" />
          )}
        </div>
      )}

      {/* Top-End Add-on (Notification Badge) */}
      {addOnTopEnd && shape === "circle" && (
        <div className="fds-profile-photo__addon fds-profile-photo__addon--top-end fds-profile-photo__addon--notification">
          <span className="fds-profile-photo__addon-number">
            {addOnTopEnd.number > 99 ? "99+" : addOnTopEnd.number}
          </span>
        </div>
      )}
    </div>
  );
});

FDSProfilePhoto.displayName = "FDSProfilePhoto";

export default FDSProfilePhoto;

