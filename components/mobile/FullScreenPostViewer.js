"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fds } from '../vars';
import Icon from '../Icon';
import ReelsCommentsPanel from './ReelsCommentsPanel';
import UpsellBottomSheet from './UpsellBottomSheet';

// Grey placeholder for missing images
const GREY_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23e4e6eb'/%3E%3C/svg%3E";

// Glimmer loading component for media
const MediaGlimmer = ({ isVisible = true, style = {} }) => (
  <>
    <style>{`
      @keyframes fullscreen-glimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
    <div 
      className="fullscreen-viewer__glimmer"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        backgroundSize: '200% 100%',
        animation: 'fullscreen-glimmer 1.5s ease-in-out infinite',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease-out',
        pointerEvents: 'none',
        ...style,
      }}
    />
  </>
);

// Vertical UFI Component (reused from reels pattern) - only Like, Comment, Share
const VerticalUFI = ({ likes = "21.1K", comments = "21.1K", shares = "21.1K", onCommentClick, onLikeClick }) => (
  <div className="fullscreen-viewer__ufi">
    <button className="fullscreen-viewer__ufi-btn" aria-label="Like" onClick={onLikeClick}>
      <Icon name="like-outline" size={24} color="onMedia" />
      <span className="fullscreen-viewer__ufi-count">{likes}</span>
    </button>
    <button className="fullscreen-viewer__ufi-btn" aria-label="Comment" onClick={onCommentClick}>
      <Icon name="comment-outline" size={24} color="onMedia" />
      <span className="fullscreen-viewer__ufi-count">{comments}</span>
    </button>
    <button className="fullscreen-viewer__ufi-btn" aria-label="Share">
      <Icon name="share-outline" size={24} color="onMedia" />
      <span className="fullscreen-viewer__ufi-count">{shares}</span>
    </button>
  </div>
);

// Dark mode search bar for immersive viewer (no X button, full width with margins)
const ImmersiveSearchBar = ({ placeholder = "Ask a question...", onSearch, initialQuery = "" }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  // Update when initialQuery changes (e.g., when swiping between posts)
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);
  
  const handleSubmit = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <div className="fullscreen-viewer__search-bar">
      <div className="fullscreen-viewer__search-input-wrapper">
        <Icon 
          name="gen-ai-magnifying-glass-outline" 
          size={20} 
          color="onMedia"
          style={{ flexShrink: 0, opacity: 0.6 }}
        />
        <input
          type="text"
          className="fullscreen-viewer__search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button
          className="fullscreen-viewer__search-submit"
          onClick={handleSubmit}
          disabled={!searchQuery.trim()}
        >
          <Icon
            name="arrow-up-filled"
            size={12}
            color="onMedia"
            style={{ opacity: searchQuery.trim() ? 1 : 0.4 }}
          />
        </button>
      </div>
    </div>
  );
};

// Default group avatar for group posts
const DEFAULT_GROUP_AVATAR = "/images/groups/cover-framer.jpg";

// Author Metadata Component
// isGroup: true for text posts/comments (squircle group avatar with profile overlay + Join button)
// isGroup: false for media posts/reels (circle avatar + Follow button)
const AuthorMetadata = ({ author, avatar, text, isOnMedia = true, isGroup = false, groupName = "Stranger Things Fans", groupAvatar }) => {
  if (isGroup) {
    // Group post layout: squircle group icon with profile overlay
    return (
      <div className={`fullscreen-viewer__metadata ${isOnMedia ? 'fullscreen-viewer__metadata--on-media' : ''}`}>
        <div className="fullscreen-viewer__author-row">
          <div className="fullscreen-viewer__group-avatar-container">
            <img 
              src={groupAvatar || DEFAULT_GROUP_AVATAR} 
              alt={groupName} 
              className="fullscreen-viewer__group-avatar"
            />
            <img 
              src={avatar || GREY_AVATAR} 
              alt={author} 
              className="fullscreen-viewer__profile-overlay"
            />
          </div>
          <div className="fullscreen-viewer__author-info">
            <div className="fullscreen-viewer__author-line fullscreen-viewer__author-line--group">
              <span className="fullscreen-viewer__author-name fullscreen-viewer__author-name--group">{groupName}</span>
              <button className="fullscreen-viewer__follow-btn">Join</button>
            </div>
            <div className="fullscreen-viewer__author-meta">
              <span className="fullscreen-viewer__author-subname">{author}</span>
              <span className="fullscreen-viewer__author-dot">·</span>
              <span className="fullscreen-viewer__author-time">1mo</span>
              <span className="fullscreen-viewer__author-dot">·</span>
              <Icon name="globe-americas-filled" size={12} color="onMedia" style={{ opacity: 0.6 }} />
            </div>
          </div>
        </div>
        {text && (
          <p className="fullscreen-viewer__post-text">{text}</p>
        )}
      </div>
    );
  }

  // Regular post layout: circle avatar
  return (
    <div className={`fullscreen-viewer__metadata ${isOnMedia ? 'fullscreen-viewer__metadata--on-media' : ''}`}>
      <div className="fullscreen-viewer__author-row">
        <img 
          src={avatar || GREY_AVATAR} 
          alt={author} 
          className="fullscreen-viewer__author-avatar"
        />
        <div className="fullscreen-viewer__author-info">
          <div className="fullscreen-viewer__author-line">
            <span className="fullscreen-viewer__author-name">{author}</span>
            <Icon name="globe-americas-filled" size={12} color="onMedia" />
            <button className="fullscreen-viewer__follow-btn">Follow</button>
          </div>
        </div>
      </div>
      {text && (
        <p className="fullscreen-viewer__post-text">{text}</p>
      )}
    </div>
  );
};

// Sample comments for text post view (preview - 2 comments shown inline)
const SAMPLE_COMMENTS = [
  { id: 1, author: "Sarah Chen", avatar: "/images/thumbs/profile-1.png", text: "This is such an interesting take! I never thought about it that way.", likes: "1.2K" },
  { id: 2, author: "Mike Rodriguez", avatar: "/images/thumbs/profile-2.png", text: "Totally agree! The evidence is all there if you look closely.", likes: "892" },
];

// Full comments data for the bottom sheet (format compatible with ReelsCommentsPanel)
const FULL_COMMENTS = [
  { id: 1, author: { name: "Sarah Chen", avatar: "/images/thumbs/profile-1.png" }, text: "This is such an interesting take! I never thought about it that way.", time: "2h", reactions: { like: 1200 }, replyCount: 3 },
  { id: 2, author: { name: "Mike Rodriguez", avatar: "/images/thumbs/profile-2.png" }, text: "Totally agree! The evidence is all there if you look closely.", time: "1h", reactions: { like: 892 }, replyCount: 1 },
  { id: 3, author: { name: "Emma Wilson", avatar: "/images/thumbs/profile-3.png" }, text: "I'm not convinced yet, but this theory is getting more compelling.", time: "45m", reactions: { like: 456 }, replyCount: 0 },
  { id: 4, author: { name: "James Thompson", avatar: "/images/thumbs/profile-4.png" }, text: "The Duffer Brothers definitely planted this seed early. Look at season 2 episode 3!", time: "30m", reactions: { like: 234 }, replyCount: 2 },
  { id: 5, author: { name: "Lisa Park", avatar: "/images/thumbs/profile-5.png" }, text: "I rewatched that scene 5 times and you're right 😱", time: "25m", reactions: { like: 189 }, replyCount: 0 },
  { id: 6, author: { name: "David Kim", avatar: "/images/thumbs/profile-6.png" }, text: "This would explain SO much about Will's arc throughout the series.", time: "20m", reactions: { like: 156 }, replyCount: 4 },
  { id: 7, author: { name: "Rachel Green", avatar: "/images/thumbs/profile-7.png" }, text: "I've been saying this for years! Finally people are catching on.", time: "15m", reactions: { like: 98 }, replyCount: 0 },
  { id: 8, author: { name: "Alex Martinez", avatar: "/images/thumbs/profile-8.png" }, text: "The foreshadowing is unreal when you know what to look for.", time: "10m", reactions: { like: 76 }, replyCount: 1 },
  { id: 9, author: { name: "Chris Lee", avatar: "/images/thumbs/profile-9.png" }, text: "Can't wait to see how this plays out in the finale!", time: "5m", reactions: { like: 45 }, replyCount: 0 },
  { id: 10, author: { name: "Nina Patel", avatar: "/images/thumbs/profile-10.png" }, text: "If this doesn't happen I'm going to be so disappointed lol", time: "2m", reactions: { like: 23 }, replyCount: 0 },
  { id: 11, author: { name: "Tom Brady", avatar: "/images/thumbs/profile-11.png" }, text: "The attention to detail in this show is incredible.", time: "1m", reactions: { like: 12 }, replyCount: 0 },
  { id: 12, author: { name: "Amy Wong", avatar: "/images/thumbs/profile-12.png" }, text: "Just joined this group and already my mind is blown 🤯", time: "Just now", reactions: { like: 5 }, replyCount: 0 },
];

// Comments Section for Text Posts - mirrors group post comments in dark mode
const CommentsSection = ({ comments = SAMPLE_COMMENTS, totalCount = 12, onViewMore }) => (
  <div className="fullscreen-viewer__comments">
    {comments.map(comment => (
      <div key={comment.id} className="fullscreen-viewer__comment">
        <img 
          src={comment.avatar || GREY_AVATAR} 
          alt={comment.author}
          className="fullscreen-viewer__comment-avatar"
        />
        <div className="fullscreen-viewer__comment-body">
          <span className="fullscreen-viewer__comment-author">{comment.author}</span>
          <p className="fullscreen-viewer__comment-text">{comment.text}</p>
          <div className="fullscreen-viewer__comment-actions">
            <span className="fullscreen-viewer__comment-likes">
              <Icon name="like-outline" size={12} color="onMedia" />
              <span>{comment.likes}</span>
            </span>
          </div>
        </div>
      </div>
    ))}
    {/* View more comments CTA */}
    <button 
      className="fullscreen-viewer__view-more-comments"
      onClick={onViewMore}
    >
      View {totalCount} comments
    </button>
  </div>
);

// Reel/Video View - Full screen video player
const ReelView = ({ post, showCommentsPanel, onCommentClick, onLikeClick }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Reset loading state when post changes
  useEffect(() => {
    setIsLoaded(false);
  }, [post.videoSrc, post.thumbnail]);

  const videoSrc = post.videoSrc || post.thumbnail;

  // Use transform-only animation for smooth GPU-accelerated transitions
  // Scale: ~0.28 to shrink to a smaller thumbnail that doesn't overlap comments
  // TranslateY: Move down so it sits at ~52px from top after scaling (closer to comments sheet)
  const shrinkScale = 0.28;
  const containerStyle = {
    transformOrigin: 'top center',
    transform: showCommentsPanel 
      ? `scale(${shrinkScale}) translateY(calc(52px / ${shrinkScale}))`
      : 'scale(1) translateY(0)',
    borderRadius: showCommentsPanel ? '43px' : '0px', // 12px / 0.28 ≈ 43px to appear as 12px when scaled
    transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 350ms cubic-bezier(0.32, 0.72, 0, 1)',
    overflow: 'hidden',
    willChange: 'transform',
  };

  return (
    <div className="fullscreen-viewer__reel" style={containerStyle}>
      {/* Glimmer loading state - fades out when loaded */}
      <MediaGlimmer isVisible={!isLoaded} />
      <video
        ref={videoRef}
        src={videoSrc}
        className="fullscreen-viewer__reel-video"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
        loop
        playsInline
        muted
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
      />
      {!showCommentsPanel && <div className="fullscreen-viewer__gradient-top" />}
      {!showCommentsPanel && <div className="fullscreen-viewer__gradient-bottom" />}
      {!showCommentsPanel && <VerticalUFI likes={post.likes} comments={post.comments} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
      {!showCommentsPanel && <AuthorMetadata author={post.author} avatar={post.avatar} />}
    </div>
  );
};

// Media Post View - Blurred background + centered media + text
const MediaPostView = ({ post, showCommentsPanel, onCommentClick, onLikeClick }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = post.videoSrc || (post.image && post.image.includes('.mp4'));
  const mediaSrc = post.videoSrc || post.image;

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => {
      if (isVideo && videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isVideo]);

  // Check if image is already cached on mount, skip loading state if so
  useEffect(() => {
    if (!isVideo && mediaSrc) {
      const img = new Image();
      img.src = mediaSrc;
      // If image is already complete (cached), skip loading state
      if (img.complete && img.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    } else {
      setIsLoaded(false);
    }
  }, [post.videoSrc, post.image, isVideo, mediaSrc]);

  // Use transform-only animation for smooth GPU-accelerated transitions
  const shrinkScale = 0.28;
  const containerStyle = {
    transformOrigin: 'top center',
    transform: showCommentsPanel 
      ? `scale(${shrinkScale}) translateY(calc(52px / ${shrinkScale}))`
      : 'scale(1) translateY(0)',
    borderRadius: showCommentsPanel ? '43px' : '0px',
    transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 350ms cubic-bezier(0.32, 0.72, 0, 1)',
    overflow: 'hidden',
    willChange: 'transform',
  };

  // Hide backdrop when shrunk (it has blur effect)
  const backdropStyle = {
    opacity: showCommentsPanel ? 0 : isLoaded ? 1 : 0,
    transition: 'opacity 350ms cubic-bezier(0.32, 0.72, 0, 1)',
  };

  // Main media wrapper - fills container when shrunk
  const mainMediaStyle = showCommentsPanel ? {
    position: 'absolute',
    inset: 0,
    maxWidth: 'none',
    maxHeight: 'none',
  } : {};

  // Media content - fills and covers when shrunk
  const mediaContentStyle = {
    ...(showCommentsPanel ? {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
      objectFit: 'cover',
    } : {}),
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-out',
  };

  return (
    <div className="fullscreen-viewer__media-post" style={containerStyle}>
      {/* Glimmer loading state - fades out when loaded */}
      <MediaGlimmer isVisible={!isLoaded} />
      
      {/* Blurred background - hide when shrunk or loading, lazy load since it's decorative */}
      <div className="fullscreen-viewer__media-backdrop" style={backdropStyle}>
        {isVideo ? (
          <video src={mediaSrc} className="fullscreen-viewer__backdrop-media" muted loop playsInline preload="none" />
        ) : (
          <img src={mediaSrc} alt="" className="fullscreen-viewer__backdrop-media" loading="lazy" decoding="async" />
        )}
        <div className="fullscreen-viewer__backdrop-overlay" />
      </div>
      
      {/* Main media - shown always, fills container when shrunk */}
      <div 
        className="fullscreen-viewer__media-main"
        style={mainMediaStyle}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={mediaSrc}
            className="fullscreen-viewer__media-content"
            style={mediaContentStyle}
            loop
            playsInline
            muted
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
          />
        ) : (
          <img 
            src={mediaSrc} 
            alt="" 
            className="fullscreen-viewer__media-content"
            style={mediaContentStyle}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
      
      {!showCommentsPanel && <div className="fullscreen-viewer__gradient-top" />}
      {!showCommentsPanel && <div className="fullscreen-viewer__gradient-bottom" />}
      {!showCommentsPanel && <VerticalUFI likes={post.likes} comments={post.comments} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
      {!showCommentsPanel && <AuthorMetadata author={post.author} avatar={post.avatar} text={post.text} />}
    </div>
  );
};

// Text Post View - Black background + large text + comments below text + author at bottom
const TextPostView = ({ post, onViewMoreComments, showCommentsPanel, onCommentClick, onLikeClick }) => {
  // Use transform-only animation for smooth GPU-accelerated transitions
  const shrinkScale = 0.28;
  const containerStyle = {
    transformOrigin: 'top center',
    transform: showCommentsPanel 
      ? `scale(${shrinkScale}) translateY(calc(52px / ${shrinkScale}))`
      : 'scale(1) translateY(0)',
    borderRadius: showCommentsPanel ? '43px' : '0px',
    transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 350ms cubic-bezier(0.32, 0.72, 0, 1)',
    overflow: 'hidden',
    willChange: 'transform',
  };

  return (
    <div className="fullscreen-viewer__text-post" style={containerStyle}>
      <div className="fullscreen-viewer__text-main">
        <p className="fullscreen-viewer__text-content">{post.text}</p>
        {/* Comments right below the large text - hide when shrunk */}
        {!showCommentsPanel && <CommentsSection onViewMore={onViewMoreComments} totalCount={post.comments || "21.1K"} />}
      </div>
      {!showCommentsPanel && <div className="fullscreen-viewer__gradient-bottom" />}
      {!showCommentsPanel && <VerticalUFI likes={post.likes} comments={post.comments} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
      {/* Author at the bottom, above the search bar - hide when shrunk */}
      {!showCommentsPanel && (
        <AuthorMetadata 
          author={post.author} 
          avatar={post.avatar} 
          isOnMedia={true} 
          isGroup={true}
          groupName={post.group}
          groupAvatar={post.groupAvatar}
        />
      )}
    </div>
  );
};

// Determine which view to render based on post type
const getPostViewType = (post) => {
  const type = post.type || 'post';
  
  // Reel or fullMedia with video -> Reel viewer
  if (type === 'reel') return 'reel';
  if (type === 'fullMedia' && post.videoSrc) return 'reel';
  
  // Media post or fullMedia with image -> Media viewer
  if (type === 'media' || type === 'fullMedia') return 'media';
  
  // Text post or comment -> Text viewer
  return 'text';
};

// Individual Post Slide (no chaining - single post view)
const PostSlide = ({ post, onViewMoreComments, showCommentsPanel, onCommentClick, onLikeClick }) => {
  const viewType = getPostViewType(post);

  return (
    <div className="fullscreen-viewer__slide">
      {viewType === 'reel' && <ReelView post={post} showCommentsPanel={showCommentsPanel} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
      {viewType === 'media' && <MediaPostView post={post} showCommentsPanel={showCommentsPanel} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
      {viewType === 'text' && <TextPostView post={post} onViewMoreComments={onViewMoreComments} showCommentsPanel={showCommentsPanel} onCommentClick={onCommentClick} onLikeClick={onLikeClick} />}
    </div>
  );
};

// Main Full Screen Post Viewer Component
const FullScreenPostViewer = ({
  isOpen,
  onClose,
  posts = [],
  initialIndex = 0,
  onSearch,
  searchPlaceholder = "Ask a question...",
  sourceRect = null, // Bounding rect of the tapped tile for expand animation
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef(null);
  
  // Comments panel state
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  
  // Upsell sheets state
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  // Store the sourceRect and transform origin for the duration of this open session
  // These persist through the exit animation to prevent glitching
  const initialSourceRect = useRef(null);
  const storedTransformOrigin = useRef({ originX: '50%', originY: '50%' });
  const hasAnimatedIn = useRef(false);

  // Capture sourceRect and calculate transform origin on open
  useEffect(() => {
    if (isOpen && sourceRect && !hasAnimatedIn.current) {
      initialSourceRect.current = sourceRect;
      
      // Calculate and store transform origin
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      storedTransformOrigin.current = {
        originX: `${sourceCenterX}px`,
        originY: `${sourceCenterY}px`,
      };
    }
  }, [isOpen, sourceRect]);

  // Reset current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Mark animation as complete and reset on close
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        hasAnimatedIn.current = true;
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Reset when viewer closes
      hasAnimatedIn.current = false;
      initialSourceRect.current = null;
    }
  }, [isOpen]);

  // Track if viewer is closing via back button vs normal close
  const closingViaBackButton = useRef(false);

  // Handle browser back button - close viewer instead of navigating away
  useEffect(() => {
    if (!isOpen) {
      closingViaBackButton.current = false;
      return;
    }

    // Push a state to history when viewer opens so back button closes it
    window.history.pushState({ fullscreenViewer: true }, '');

    const handlePopState = () => {
      // Back button was pressed - close viewer without further history manipulation
      closingViaBackButton.current = true;
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Only clean up history if closing normally (not via back button)
      // Back button already navigated back, so we don't need to do it again
      if (!closingViaBackButton.current && window.history.state?.fullscreenViewer === true) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  // Handle keyboard navigation (Escape only - no chaining)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handler for viewing more comments
  const handleViewMoreComments = useCallback(() => {
    setShowCommentsPanel(true);
  }, []);

  // Handler for like button click - shows upsell sheet
  const handleLikeClick = useCallback(() => {
    setShowLikeSheet(true);
  }, []);

  // Handler for login to comment click - shows login prompt
  const handleLoginToComment = useCallback(() => {
    setShowLoginPrompt(true);
  }, []);

  // Close comments panel and upsell sheets when viewer closes
  useEffect(() => {
    if (!isOpen) {
      setShowCommentsPanel(false);
      setShowLikeSheet(false);
      setShowLoginPrompt(false);
    }
  }, [isOpen]);

  // Update Safari browser chrome color (theme-color meta tag)
  useEffect(() => {
    // Find or create the theme-color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const originalColor = metaThemeColor?.getAttribute('content') || '#ffffff';
    
    if (isOpen) {
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', '#000000'); // Dark mode for immersive viewer
    }
    
    return () => {
      // Reset to white when viewer closes
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
    };
  }, [isOpen]);

  // Calculate initial scale from sourceRect
  const getInitialScale = () => {
    const rect = sourceRect || initialSourceRect.current;
    if (!rect) {
      return { scale: 0.9, hasSourceRect: false };
    }
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 812;
    
    // Calculate scale based on tile size vs viewport
    const scaleX = rect.width / viewportWidth;
    const scaleY = rect.height / viewportHeight;
    const scale = Math.max(scaleX, scaleY, 0.25); // Minimum scale of 0.25
    
    return { scale, hasSourceRect: true };
  };

  // Animation variants - smooth expand animation from tile
  const overlayVariants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Get scale value at render time
  const initialScale = getInitialScale();

  const contentVariants = {
    initial: { 
      opacity: initialScale.hasSourceRect ? 0.9 : 0, 
      scale: initialScale.scale,
      borderRadius: initialScale.hasSourceRect ? 16 : 0,
    },
    enter: {
      opacity: 1,
      scale: 1,
      borderRadius: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out curve, no overshoot
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const currentPost = posts[currentIndex];
  if (!currentPost) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fullscreen-viewer"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={overlayVariants}
          >
            <motion.div
              ref={containerRef}
              className="fullscreen-viewer__container"
              variants={contentVariants}
              style={{
                transformOrigin: `${storedTransformOrigin.current.originX} ${storedTransformOrigin.current.originY}`,
              }}
            >
              {/* Header with logo and close button */}
              <div className="fullscreen-viewer__header">
                <div className="fullscreen-viewer__logo">
                  <img 
                    src="/images/facebook-wordmark.png" 
                    alt="Facebook" 
                    style={{ height: '24px', filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                <button 
                  className="fullscreen-viewer__close-btn"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <Icon name="cross-outline" size={24} color="onMedia" />
                </button>
              </div>

              {/* Current post - no chaining */}
              <PostSlide 
                post={currentPost} 
                onViewMoreComments={handleViewMoreComments}
                showCommentsPanel={showCommentsPanel}
                onCommentClick={handleViewMoreComments}
                onLikeClick={handleLikeClick}
              />

              {/* Dark mode search bar at bottom - hide when comments panel is open */}
              {!showCommentsPanel && (
                <ImmersiveSearchBar 
                  placeholder={searchPlaceholder}
                  onSearch={onSearch}
                  initialQuery={currentPost.suggestedQuery || ""}
                />
              )}

              {/* Comments Bottom Sheet */}
              <ReelsCommentsPanel
                isOpen={showCommentsPanel}
                onClose={() => setShowCommentsPanel(false)}
                comments={FULL_COMMENTS}
                totalCount={12}
                onCommentPromptClick={handleLoginToComment}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Like Upsell Sheet - uses portal, so placed outside AnimatePresence */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={parseInt(String(currentPost?.likes || '21100').replace(/[^\d]/g, '')) || 21100}
        darkMode={true}
      />

      {/* Login Prompt Sheet - uses portal, so placed outside AnimatePresence */}
      <UpsellBottomSheet
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type="comment"
        count={15}
        darkMode={true}
      />
    </>
  );
};

export default FullScreenPostViewer;
