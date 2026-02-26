"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { 
  SearchIcon as SearchIconBase, 
  DotsIcon as DotsIconBase, 
  StarOutlineIcon,
  CaretDownIcon as CaretDownIconBase,
  BadgeCheckmarkIcon,
  LikeIcon as LikeIconBase,
  LikeReactionIcon as LikeReactionIconBase,
  LoveReactionIcon as LoveReactionIconBase,
  WowReactionIcon as WowReactionIconBase
} from "../icons";
import Icon from "../Icon";
import MarketplaceUnit from "./MarketplaceUnit";
import AILoadingChip from "./AILoadingChip";
import FullScreenPostViewer from "./FullScreenPostViewer";
import { ExperienceTypeBottomSheet, useExperienceTypeSheet } from "./ExperienceTypeSheet";

// ============================================
// CONSTANTS
// ============================================

const GREY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23E4E6EB' width='400' height='400'/%3E%3C/svg%3E";
const GREY_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23BCC0C4' width='40' height='40' rx='20'/%3E%3C/svg%3E";

// ============================================
// BLUEPRINT ICONS (local wrappers with specific sizes/colors)
// ============================================

const LikeIcon16 = ({ color = "#65676B" }) => (
  <LikeIconBase size={16} color={color} />
);

const CommentIcon16 = ({ color = "#65676B" }) => (
  <Icon name="comment-outline" size={16} color={color === "white" ? "onMedia" : "secondary"} />
);

const CaretDownIcon = () => <CaretDownIconBase size={12} color="#65676B" />;

// ============================================
// SUB-COMPONENTS
// ============================================

// Facepile - overlapping avatars
const Facepile = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  ];
  
  return (
    <div className="ai-forward__facepile">
      {avatars.map((avatar, idx) => (
        <img 
          key={idx}
          src={avatar}
          alt=""
          className="ai-forward__facepile-avatar"
          style={{ zIndex: 3 - idx }}
        />
      ))}
    </div>
  );
};

// Action Chip
const ActionChip = ({ label, onClick }) => (
  <button className="ai-forward__action-chip" onClick={onClick}>
    <Facepile />
    <span>{label}</span>
  </button>
);

// Page Header
// Info Bottom Sheet - overlay sheet with topic explanation
const InfoBottomSheet = ({ isOpen, onClose, title, body }) => {
  if (!isOpen) return null;
  
  return (
    <div className="info-bottom-sheet-overlay" onClick={onClose}>
      <div className="info-bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="info-bottom-sheet__handle" />
        <div className="info-bottom-sheet__header">
          <h2 className="info-bottom-sheet__title">{title}</h2>
        </div>
        <div className="info-bottom-sheet__body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

// Note: ExperienceTypeBottomSheet and useExperienceTypeSheet are now imported from ./ExperienceTypeSheet

const PageHeader = ({ topic, talkingCount, onFacebookClick, isLoading, onLoadingComplete, headerRef }) => (
  <div className="cfe-page-header" ref={headerRef}>
    <div className="cfe-page-header__title-row">
      <button className="cfe-page-header__topic-btn" onClick={onFacebookClick}>
        <h1 className="cfe-page-header__title">{topic}</h1>
      </button>
    </div>
    <div className="cfe-page-header__social-proof">
      {isLoading ? (
        <AILoadingChip 
          isLoading={isLoading} 
          finalCount={talkingCount}
          onLoadingComplete={onLoadingComplete}
        />
      ) : (
        <div className="cfe-page-header__talking-count">
          <Facepile />
          <span>{talkingCount} people are talking about this.</span>
        </div>
      )}
    </div>
  </div>
);

// Unit Header - section header (Blueprint styling)
// Split title at colon: first part is Headline 4 Emphasized, second part is Body 3
// Supports clickable keywords in description marked with [keyword](query)
const UnitHeader = ({ title, onKeywordClick }) => {
  const colonIndex = title.indexOf(':');
  const hasColon = colonIndex !== -1;
  const headerText = hasColon ? title.substring(0, colonIndex) : title;
  const descriptionText = hasColon ? title.substring(colonIndex + 1).trim() : null;

  // Parse description and strip [text](query) markdown - render as plain text
  const renderDescription = (text) => {
    if (!text) return null;
    
    // Strip markdown links [text](query) and just keep the text
    const plainText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    
    return plainText;
  };

  return (
    <div className="cfe-unit-header">
      <div className="cfe-unit-header__content">
        <h2 className="cfe-unit-header__title">{headerText}</h2>
        {descriptionText && (
          <p className="cfe-unit-header__description">{renderDescription(descriptionText)}</p>
        )}
      </div>
    </div>
  );
};

// Default group avatar for group posts
const DEFAULT_GROUP_AVATAR = "/images/groups/cover-framer.jpg";

// Grid Post Card - group squircle at top (no profile overlay), text in middle, likes/comments at bottom
// Memoized to prevent re-renders when parent state changes
const GridPostCard = React.memo(({ author, avatar, group = "Stranger Things Fans", groupAvatar, text, likes, comments = 12 }) => (
  <div className="cfe-post-card cfe-post-card--grid">
    <div className="cfe-post-card__header cfe-post-card__header--group">
      <img src={groupAvatar || DEFAULT_GROUP_AVATAR} alt="" className="cfe-post-card__avatar cfe-post-card__avatar--squircle" />
      <span className="cfe-post-card__author-name">{group}</span>
    </div>
    <p className="cfe-post-card__text">{text}</p>
    <div className="cfe-post-card__footer cfe-post-card__footer--split">
      <div className="cfe-post-card__ufi-item">
        <LikeIcon16 color="#65676B" />
        <span>{likes}</span>
      </div>
      <div className="cfe-post-card__ufi-item">
        <CommentIcon16 color="#65676B" />
        <span>{comments}</span>
      </div>
    </div>
  </div>
));

// Grid Post Card with Media - author overlaid on media at top, text + likes/comments below
// Memoized to prevent re-renders when parent state changes
const GridPostCardWithMedia = React.memo(({ author, avatar, image, text, likes, comments = 12 }) => (
  <div className="cfe-post-card cfe-post-card--grid cfe-post-card--with-media">
    <div className="cfe-post-card__media">
      <img src={image || GREY_PLACEHOLDER} alt="" className="cfe-post-card__media-image" loading="eager" decoding="async" />
      <div className="cfe-post-card__media-overlay-top" />
      <div className="cfe-post-card__media-header">
        <img src={avatar || GREY_AVATAR} alt="" className="cfe-post-card__avatar" />
        <span className="cfe-post-card__author-name">{author}</span>
      </div>
    </div>
    <div className="cfe-post-card__content">
      <p className="cfe-post-card__text cfe-post-card__text--media">{text}</p>
      <div className="cfe-post-card__footer cfe-post-card__footer--media cfe-post-card__footer--split">
        <div className="cfe-post-card__ufi-item">
          <LikeIcon16 color="#65676B" />
          <span>{likes}</span>
        </div>
        <div className="cfe-post-card__ufi-item">
          <CommentIcon16 color="#65676B" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  </div>
));

// Custom comparison for media cards - ignore onClick to prevent re-renders when viewer closes
const mediaCardPropsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.author === nextProps.author &&
    prevProps.avatar === nextProps.avatar &&
    prevProps.image === nextProps.image &&
    prevProps.videoSrc === nextProps.videoSrc &&
    prevProps.likes === nextProps.likes
    // onClick intentionally omitted - it changes on parent re-render but doesn't affect visual output
  );
};

// Grid Post Card Full Media - full bleed media with profile/name overlay at bottom
// Supports video with auto-play on scroll
// Memoized to prevent re-renders when parent state changes (e.g., viewer closing)
const GridPostCardFullMedia = React.memo(({ author, avatar, image, videoSrc, likes, comments = 12 }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Auto-play video when card is in viewport
  useEffect(() => {
    if (!videoSrc || !videoRef.current || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div ref={cardRef} className="cfe-post-card cfe-post-card--grid cfe-post-card--full-media">
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="cfe-post-card__full-media-video"
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img src={image || GREY_PLACEHOLDER} alt="" className="cfe-post-card__full-media-image" loading="eager" decoding="async" />
      )}
      <div className="cfe-post-card__overlay-gradient-top" />
      <div className="cfe-post-card__overlay-gradient-bottom" />
      <div className="cfe-post-card__overlay-header">
        <img src={avatar || GREY_AVATAR} alt="" className="cfe-post-card__avatar" />
        <span className="cfe-post-card__overlay-name">{author}</span>
      </div>
      <div className="cfe-post-card__overlay-footer cfe-post-card__overlay-footer--split">
        <div className="cfe-post-card__overlay-ufi">
          <LikeIcon16 color="white" />
          <span>{likes}</span>
        </div>
        <div className="cfe-post-card__overlay-ufi">
          <CommentIcon16 color="white" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
}, mediaCardPropsAreEqual);

// Grid Comment Card - group squircle at top (no profile overlay), text in middle, likes/comments at bottom
// Memoized to prevent re-renders when parent state changes
const GridCommentCard = React.memo(({ author, avatar, group = "Stranger Things Fans", groupAvatar, text, likes, comments = 12 }) => (
  <div className="cfe-post-card cfe-post-card--grid">
    <div className="cfe-post-card__header cfe-post-card__header--group">
      <img src={groupAvatar || DEFAULT_GROUP_AVATAR} alt="" className="cfe-post-card__avatar cfe-post-card__avatar--squircle" />
      <span className="cfe-post-card__author-name">{group}</span>
    </div>
    <p className="cfe-post-card__text">{text}</p>
    <div className="cfe-post-card__footer cfe-post-card__footer--split">
      <div className="cfe-post-card__ufi-item">
        <LikeIcon16 color="#65676B" />
        <span>{likes}</span>
      </div>
      <div className="cfe-post-card__ufi-item">
        <CommentIcon16 color="#65676B" />
        <span>{comments}</span>
      </div>
    </div>
  </div>
));

// Grid Reel Card - same styling as cfe-reel-card but in grid
// Memoized to prevent re-renders when parent state changes (e.g., viewer closing)
const GridReelCard = React.memo(({ author, avatar, videoSrc, likes, comments = 12 }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  // Auto-play video when card is in viewport
  useEffect(() => {
    if (!videoSrc || !videoRef.current || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div ref={cardRef} className="cfe-reel-card cfe-reel-card--grid">
      <div className="cfe-reel-card__media">
        <video
          ref={videoRef}
          className="cfe-reel-card__video"
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="cfe-reel-card__overlay-top" />
        <div className="cfe-reel-card__overlay-bottom" />
        
        <div className="cfe-reel-card__header">
          <img 
            src={avatar || GREY_AVATAR} 
            alt="" 
            className="cfe-reel-card__avatar" 
          />
          <span className="cfe-reel-card__author-name">{author}</span>
        </div>
        
        <div className="cfe-reel-card__footer cfe-reel-card__footer--split">
          <div className="cfe-reel-card__ufi-item">
            <LikeIcon16 color="white" />
            <span>{likes}</span>
          </div>
          <div className="cfe-reel-card__ufi-item">
            <CommentIcon16 color="white" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}, mediaCardPropsAreEqual);

// Post Grid - 2 column grid layout
const PostGrid = ({ children }) => (
  <div className="cfe-post-grid">
    {children}
  </div>
);

// Reels Grid - 2 column grid layout
const ReelsGrid = ({ children }) => (
  <div className="cfe-reels-grid">
    {children}
  </div>
);

// Related Topic Item
const RelatedTopicItem = ({ topic, onClick }) => (
  <button className="fds-action-chip" onClick={() => onClick?.(topic)}>
    <Icon name="gen-ai-magnifying-glass-outline" size={16} color="primary" />
    <span className="fds-action-chip__label">{topic}</span>
  </button>
);

// Suggested Search Pill
const SuggestedSearchPill = ({ query, onClick }) => (
  <button className="fds-action-chip" onClick={() => onClick?.(query)}>
    <Icon name="gen-ai-magnifying-glass-outline" size={16} color="primary" />
    <span className="fds-action-chip__label">{query}</span>
  </button>
);

// Suggested Search Pills - horizontal scrollable row (shown after "See more")
const SuggestedSearchPills = ({ queries, onQueryClick }) => (
  <div className="gve-suggested-pills">
    <div className="gve-suggested-pills__scroll">
      {queries.map((query, idx) => (
        <SuggestedSearchPill key={idx} query={query} onClick={onQueryClick} />
      ))}
    </div>
  </div>
);

// ============================================
// SECTION COMPONENTS
// ============================================

// See More Button
const SeeMoreButton = ({ onClick }) => (
  <button className="gve-see-more" onClick={onClick}>
    <span>See more</span>
    <Icon name="chevron-down-filled" size={12} color="secondary" style={{ marginTop: 2 }} />
  </button>
);

// Content Bucket Section - heading + GRID of mixed content cards
// Supports different card types: 'post', 'media', 'fullMedia', 'reel', 'comment'
// Supports "See more" to load additional tiles
// previousSectionExpanded: if the previous section was expanded, add spacing above this section's subheader
// suggestedQueries: shown at the end after "See more" is tapped
const ContentBucketSection = ({ title, posts, isCollapsed, onToggle, visibleCount, onSeeMore, initialCount = 2, previousSectionExpanded = false, suggestedQueries, onQueryClick, startIndex = 0 }) => {
  const displayedPosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;
  const isExpanded = visibleCount > initialCount;

  const renderCard = (post, idx) => {
    const cardType = post.type || 'post';
    
    switch (cardType) {
      case 'fullMedia':
        return (
          <GridPostCardFullMedia
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            image={post.image}
            videoSrc={post.videoSrc}
            likes={post.likes}
          />
        );
      case 'media':
        return (
          <GridPostCardWithMedia
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            image={post.image}
            text={post.text}
            likes={post.likes}
          />
        );
      case 'reel':
        return (
          <GridReelCard
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            videoSrc={post.videoSrc}
            likes={post.likes}
          />
        );
      case 'comment':
        return (
          <GridCommentCard
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            group={post.group}
            groupAvatar={post.groupAvatar}
            text={post.text}
            likes={post.likes}
          />
        );
      case 'post':
      default:
        return (
          <GridPostCard
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            group={post.group}
            groupAvatar={post.groupAvatar}
            text={post.text}
            likes={post.likes}
          />
        );
    }
  };

  return (
    <section className="cfe-bucket">
      {/* Add spacing div above subheader when previous section was expanded */}
      {previousSectionExpanded && <div style={{ height: 16 }} />}
      <UnitHeader title={title} onKeywordClick={onQueryClick} />
      {!isCollapsed && (
        <>
          <PostGrid>
            {displayedPosts.map((post, idx) => renderCard(post, idx))}
          </PostGrid>
          {hasMorePosts && <SeeMoreButton onClick={onSeeMore} />}
          {/* Show suggested search pills after "See more" is tapped */}
          {isExpanded && suggestedQueries && (
            <SuggestedSearchPills queries={suggestedQueries} onQueryClick={onQueryClick} />
          )}
        </>
      )}
    </section>
  );
};

// Reels Section - GRID instead of h-scroll (2 tiles only)
const ReelsSection = ({ title, reels, isCollapsed }) => (
  <section className="cfe-bucket">
    <UnitHeader title={title} />
    {!isCollapsed && (
      <>
        <ReelsGrid>
          {reels.slice(0, 2).map((reel, idx) => (
            <GridReelCard
              key={reel.id || idx}
              author={reel.author}
              avatar={reel.avatar}
              thumbnail={reel.thumbnail}
              likes={reel.likes}
              comments={reel.comments}
            />
          ))}
        </ReelsGrid>
        <SeeMoreButton onClick={() => console.log('See more reels clicked')} />
      </>
    )}
  </section>
);

// Related Topics Section
const RelatedTopicsSection = ({ topics, onTopicClick, previousSectionExpanded = false }) => (
  <section className="cfe-related-topics">
    {/* Add spacing when previous section was expanded */}
    {previousSectionExpanded && <div style={{ height: 16 }} />}
    <p className="cfe-related-topics__question">What else would you like to know about Stranger Things?</p>
    <div className="cfe-related-topics__list">
      {topics.map((topic, idx) => (
        <RelatedTopicItem key={idx} topic={topic} onClick={onTopicClick} />
      ))}
    </div>
  </section>
);

// Grid Marketplace Card - contained card with image, title, price
const GridMarketplaceCard = ({ image, title, price, onClick }) => (
  <button className="gve-marketplace-card" onClick={(e) => onClick?.(e)}>
    <div className="gve-marketplace-card__media">
      <img src={image} alt={title} className="gve-marketplace-card__image" />
    </div>
    <div className="gve-marketplace-card__content">
      <h4 className="gve-marketplace-card__title">{title}</h4>
      <span className="gve-marketplace-card__price">{price}</span>
    </div>
  </button>
);

// Mapping from grid marketplace IDs to PDP IDs
const MARKETPLACE_PDP_MAP = {
  'mp-1': 't1', 'mp-2': 't2', 'mp-3': 't3', 'mp-4': 't4',
  'mp-5': 't5', 'mp-6': 't6', 'mp-7': 't7', 'mp-8': 't8',
};

// Marketplace items data (8 items)
const MARKETPLACE_ITEMS = [
  {
    id: "mp-1",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
    title: "Eleven Funko Pop",
    price: "$45"
  },
  {
    id: "mp-2", 
    image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
    title: "LEGO Creel House Set",
    price: "$230"
  },
  {
    id: "mp-3",
    image: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
    title: "Steve Harrington Signed Card",
    price: "$150"
  },
  {
    id: "mp-4",
    image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
    title: "Stranger Things PEZ Set",
    price: "$35"
  },
  {
    id: "mp-5",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
    title: "Demogorgon Funko Pop",
    price: "$38"
  },
  {
    id: "mp-6",
    image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
    title: "LEGO Upside Down Set",
    price: "$199"
  },
  {
    id: "mp-7",
    image: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
    title: "Millie Bobby Brown Autograph",
    price: "$275"
  },
  {
    id: "mp-8",
    image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
    title: "Hawkins Lab Replica Badge",
    price: "$25"
  },
];

// Grid Marketplace Section - 2x2 grid of contained marketplace cards
const GridMarketplaceSection = ({ visibleCount = 4, onSeeMore, previousSectionExpanded = false, onItemClick }) => {
  const displayedItems = MARKETPLACE_ITEMS.slice(0, visibleCount);
  const hasMoreItems = visibleCount < MARKETPLACE_ITEMS.length;

  return (
    <section className="gve-marketplace-section">
      {/* Add spacing when previous section was expanded */}
      {previousSectionExpanded && <div style={{ height: 16 }} />}
      <h3 className="gve-marketplace-section__title">Shop for merchandise</h3>
      <div className="gve-marketplace-grid">
        {displayedItems.map((item) => (
          <GridMarketplaceCard
            key={item.id}
            onClick={(event) => onItemClick?.(item.id, event)}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
      {hasMoreItems && <SeeMoreButton onClick={onSeeMore} />}
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

// Section types for dynamic ordering
const SECTION_TYPES = {
  DISCUSSIONS: 'discussions',
  DISCUSSIONS_2: 'discussions_2',
  REELS: 'reels',
  MARKETPLACE: 'marketplace',
  RELATED: 'related',
};

// Intent types that determine section ordering
const INTENTS = {
  DEFAULT: 'default',
  PARTY_PLANNING: 'party',
  REVIEWS: 'reviews',
  SHOPPING: 'shopping',
  ENTERTAINMENT: 'entertainment',
  LOCAL_EVENTS: 'local_events',
};

// Section order mapping by intent
const INTENT_SECTION_ORDER = {
  [INTENTS.DEFAULT]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.PARTY_PLANNING]: [
    SECTION_TYPES.REELS,
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.REVIEWS]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.SHOPPING]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.ENTERTAINMENT]: [
    SECTION_TYPES.REELS,
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.LOCAL_EVENTS]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
  ],
};

// Query-specific content mapping with intent
const QUERY_CONTENT = {
  "Who plays Eleven?": {
    topic: "Who plays Eleven in Stranger Things?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Millie Bobby Brown: Fans discuss the actress's journey from child star to global icon.", key: "actress" },
      { title: "Audition stories: How MBB landed the role that changed her life.", key: "audition" },
      { title: "Behind the scenes: Fans share their favorite Eleven moments.", key: "bts" },
    ]
  },
  "When is Season 5 out?": {
    topic: "When is Stranger Things Season 5 coming out?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Release date: Netflix confirms the final season premieres in 2025.", key: "release" },
      { title: "Production updates: Filming wrapped and post-production is underway.", key: "production" },
      { title: "What to expect: Duffer Brothers tease an epic conclusion.", key: "tease" },
    ]
  },
  "Best Stranger Things theories?": {
    topic: "Best Stranger Things fan theories",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Time loop theory: Fans believe the Upside Down operates on different time rules.", key: "timeloop" },
      { title: "Will is the key: Many think Will's connection to the Upside Down is central to the finale.", key: "will" },
      { title: "Vecna's origin: Deep dives into Henry Creel's true motivations.", key: "vecna" },
    ]
  },
  "Stranger Things Finale Party": {
    topic: "Stranger Things Finale Party ideas",
    intent: INTENTS.PARTY_PLANNING,
    sections: [
      { title: "Party inspiration: Best Stranger Things themed decorations and setups.", key: "inspiration" },
      { title: "Watch party essentials: Fans share their must-haves for the finale viewing.", key: "essentials" },
      { title: "Themed food & drinks: Eggo waffles and Upside Down cocktails.", key: "food" },
    ]
  },
  "Finale Viewings in Seattle": {
    topic: "Stranger Things Finale Viewings in Seattle",
    intent: INTENTS.LOCAL_EVENTS,
    sections: [
      { title: "Local events: Bars and theaters hosting watch parties.", key: "events" },
      { title: "Fan meetups: Seattle Stranger Things community gatherings.", key: "meetups" },
      { title: "Costume contests: Where to show off your best cosplay.", key: "costumes" },
    ]
  },
  "Stranger Things Season 5 reviews": {
    topic: "Stranger Things Season 5 reviews",
    intent: INTENTS.REVIEWS,
    sections: [
      { title: "Early reactions: Critics weigh in on the final season.", key: "critics" },
      { title: "Fan reviews: What viewers are saying about the finale.", key: "fans" },
      { title: "Ratings breakdown: How Season 5 compares to previous seasons.", key: "ratings" },
    ]
  },
  // Tragic Endings drill-down queries
  "Will Steve die in Season 5?": {
    topic: "Will Steve die in Season 5?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Fan theories: Evidence that Steve's arc ends heroically.", key: "steve-theories" },
      { title: "Duffer hints: What the creators have said about Steve's fate.", key: "steve-hints" },
      { title: "Character analysis: Why Steve's death would be meaningful.", key: "steve-analysis" },
    ]
  },
  "Jonathan death theories": {
    topic: "Jonathan death theories",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Sidelined for a reason: Fans think Jonathan's reduced screentime hints at his fate.", key: "jonathan-screentime" },
      { title: "Sacrificing for Will: The brotherly bond that could end tragically.", key: "jonathan-will" },
      { title: "Nancy's choice: How Jonathan's death could affect the love triangle.", key: "jonathan-nancy" },
    ]
  },
  "Eleven sacrifice finale": {
    topic: "Will Eleven sacrifice herself?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Full circle: Eleven opened the gate, she may need to close it forever.", key: "eleven-gate" },
      { title: "Power limits: Fans debate if Eleven's sacrifice is the only way.", key: "eleven-power" },
      { title: "Alternative endings: Ways Eleven could survive the finale.", key: "eleven-survive" },
    ]
  },
  "Who dies in the finale?": {
    topic: "Who dies in the Stranger Things finale?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Death predictions: Fans rank which characters are most at risk.", key: "death-ranking" },
      { title: "Safe characters: Who the Duffers would never kill off.", key: "safe-chars" },
      { title: "Surprise deaths: Unexpected characters that could meet their end.", key: "surprise-deaths" },
    ]
  },
  "Character death predictions": {
    topic: "Character death predictions",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Most likely: The characters fans think will die.", key: "most-likely" },
      { title: "Plot armor: Characters too important to kill.", key: "plot-armor" },
      { title: "Redemption deaths: Villains who might sacrifice themselves.", key: "redemption" },
    ]
  },
  "Tragic ending evidence": {
    topic: "Evidence for a tragic ending",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Duffer interviews: Creators hint at an emotional finale.", key: "duffer-hints" },
      { title: "Foreshadowing: Clues from previous seasons pointing to tragedy.", key: "foreshadowing" },
      { title: "Genre expectations: Why horror finales often end sadly.", key: "genre" },
    ]
  },
  // Fake Reality drill-down queries
  "Upside Down reality theory": {
    topic: "Upside Down reality theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Mirror dimension: Is Hawkins itself inside the Upside Down?", key: "mirror" },
      { title: "Timeline splits: Evidence of multiple realities coexisting.", key: "timelines" },
      { title: "Vecna's control: The Upside Down as a constructed reality.", key: "vecna-control" },
    ]
  },
  "Is Hawkins real?": {
    topic: "Is Hawkins real?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Simulation theory: Signs that Hawkins is artificially created.", key: "simulation" },
      { title: "Memory manipulation: Characters' memories may be fabricated.", key: "memories" },
      { title: "The lab connection: How experiments could have altered reality.", key: "lab" },
    ]
  },
  "Mind Flayer simulation": {
    topic: "Mind Flayer simulation theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Hive mind illusion: Is the Mind Flayer creating a shared dream?", key: "hive-mind" },
      { title: "Will's connection: His link to the Mind Flayer reveals the truth.", key: "will-flayer" },
      { title: "Breaking free: How the characters could escape the simulation.", key: "escape" },
    ]
  },
  "Vecna's illusion theory": {
    topic: "Vecna's illusion theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Mind manipulation: Vecna's power to alter perception.", key: "manipulation" },
      { title: "Creel house clues: Victor's visions as evidence of illusions.", key: "creel" },
      { title: "Breaking the spell: How to defeat Vecna's mental control.", key: "breaking" },
    ]
  },
  "Fake reality clues": {
    topic: "Fake reality clues in Stranger Things",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Visual hints: Cinematography suggesting unreliable reality.", key: "visual" },
      { title: "Dialogue analysis: Characters questioning what's real.", key: "dialogue" },
      { title: "Timeline inconsistencies: Errors that might be intentional.", key: "inconsistencies" },
    ]
  },
  "Dream sequence evidence": {
    topic: "Dream sequence evidence",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Sleep imagery: Recurring dream motifs throughout the series.", key: "sleep" },
      { title: "Eleven's visions: Her powers blur the line between dreams and reality.", key: "visions" },
      { title: "Wake up theory: Signs the finale will reveal it was all a dream.", key: "wake-up" },
    ]
  },
  // Hidden Episode drill-down queries
  "Secret episode 9 leak": {
    topic: "Secret episode 9 leak rumors",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Insider claims: Alleged Netflix employees hint at hidden content.", key: "insiders" },
      { title: "Episode count mystery: Why Season 5 might have a secret finale.", key: "count" },
      { title: "Debunked?: Evidence against the hidden episode theory.", key: "debunked" },
    ]
  },
  "Hidden finale scenes": {
    topic: "Hidden finale scenes",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Post-credits speculation: What could come after the ending.", key: "post-credits" },
      { title: "Alternate endings: Rumored different versions of the finale.", key: "alternate" },
      { title: "Easter egg hunt: Hidden scenes fans might have missed.", key: "easter-eggs" },
    ]
  },
  "Post-credits scene rumors": {
    topic: "Post-credits scene rumors",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "MCU style: Will Stranger Things have a post-credits tease?", key: "mcu" },
      { title: "Spinoff setup: Post-credits could introduce new series.", key: "spinoff" },
      { title: "Final goodbye: A touching tribute to the fans.", key: "tribute" },
    ]
  },
  "Deleted scenes Season 5": {
    topic: "Deleted scenes from Season 5",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Cut content: Scenes that didn't make the final edit.", key: "cut" },
      { title: "Director's cut: Will we get an extended version?", key: "directors-cut" },
      { title: "Behind the scenes: What the cast says about deleted material.", key: "bts" },
    ]
  },
  "Extended cut theory": {
    topic: "Extended cut theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Longer finale: Rumors of a 3+ hour final episode.", key: "longer" },
      { title: "Netflix strategy: Why they might release an extended version.", key: "strategy" },
      { title: "Fan demand: Campaigns for more content.", key: "demand" },
    ]
  },
  "Bonus episode evidence": {
    topic: "Bonus episode evidence",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "ARG clues: Alternate reality game hints at extra content.", key: "arg" },
      { title: "Social media cryptic posts: Official accounts teasing secrets.", key: "social" },
      { title: "Release schedule: Gaps that could hide surprise content.", key: "schedule" },
    ]
  },
  // Suggested queries from posts - Tragic Endings
  "Who dies in finale?": {
    topic: "Who dies in the finale?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Death predictions: Fans rank which characters are most at risk.", key: "predictions" },
      { title: "Safe characters: Who has plot armor in Season 5.", key: "safe" },
      { title: "Emotional impact: Which death would hit hardest.", key: "impact" },
    ]
  },
  "Steve death theory": {
    topic: "Steve death theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Hero's sacrifice: Why Steve dying would complete his arc.", key: "hero" },
      { title: "Foreshadowing clues: Signs pointing to Steve's fate.", key: "foreshadowing" },
      { title: "Fan reactions: The community prepares for the worst.", key: "reactions" },
    ]
  },
  "Jonathan Season 5 fate": {
    topic: "Jonathan's Season 5 fate",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Sidelined for a reason: His reduced role hints at tragedy.", key: "sidelined" },
      { title: "Brotherly bond: Will Jonathan sacrifice for Will?", key: "brotherly" },
      { title: "Love triangle resolution: How his fate affects Nancy.", key: "love" },
    ]
  },
  "Eleven sacrifice theory": {
    topic: "Eleven sacrifice theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Full circle ending: She opened the gate, she must close it.", key: "circle" },
      { title: "Power limits: Is sacrifice the only way to stop Vecna?", key: "power" },
      { title: "Hopeful alternatives: Ways Eleven could survive.", key: "alternatives" },
    ]
  },
  "Max Season 5 fate": {
    topic: "Max's Season 5 fate",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Coma status: What we know about Max's condition.", key: "coma" },
      { title: "Vecna's hold: Is Max trapped in his mind?", key: "trapped" },
      { title: "Lucas's mission: Can he save her?", key: "lucas" },
    ]
  },
  "Is Max alive?": {
    topic: "Is Max still alive?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Brain dead debate: What the Season 4 ending showed.", key: "braindead" },
      { title: "Eleven's intervention: Did she save Max's soul?", key: "eleven" },
      { title: "Season 5 footage: Clues from trailers and set photos.", key: "footage" },
    ]
  },
  "Joyce death theory": {
    topic: "Joyce death theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Maternal sacrifice: Would Joyce die for her boys?", key: "maternal" },
      { title: "Hopper parallel: Their reunion only to be separated forever?", key: "hopper" },
      { title: "Character arc: Joyce's journey from worried mom to warrior.", key: "arc" },
    ]
  },
  "Will Dustin survive?": {
    topic: "Will Dustin survive?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Heart of the group: Why Dustin is essential.", key: "heart" },
      { title: "Eddie connection: Could Dustin avenge his friend?", key: "eddie" },
      { title: "Comic relief curse: Does his role protect him?", key: "curse" },
    ]
  },
  // Suggested queries from posts - Fake Reality
  "Hawkins simulation theory": {
    topic: "Hawkins simulation theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Signs of simulation: Glitches in Hawkins reality.", key: "signs" },
      { title: "Mind Flayer control: Is everything a hive mind dream?", key: "flayer" },
      { title: "Wake up ending: Could the finale reveal the truth?", key: "wakeup" },
    ]
  },
  "Vecna mind control": {
    topic: "Vecna's mind control powers",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "How it works: Understanding Vecna's abilities.", key: "howit" },
      { title: "Mass manipulation: Could Vecna control all of Hawkins?", key: "mass" },
      { title: "Breaking free: How victims escape his influence.", key: "escape" },
    ]
  },
  "Upside Down reality": {
    topic: "Upside Down reality theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Mirror dimension: Is our Hawkins the real one?", key: "mirror" },
      { title: "Frozen in time: Why the UD is stuck in 1983.", key: "frozen" },
      { title: "Merging worlds: The finale could collapse both realities.", key: "merge" },
    ]
  },
  "Henry Creel backstory": {
    topic: "Henry Creel backstory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Origin story: How Henry became Vecna.", key: "origin" },
      { title: "Family tragedy: The Creel house murders explained.", key: "family" },
      { title: "Lab experiments: What Brenner did to One.", key: "lab" },
    ]
  },
  "Will's Upside Down connection": {
    topic: "Will's Upside Down connection",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Season 1 trauma: How the UD changed Will forever.", key: "trauma" },
      { title: "Psychic link: Will senses when Vecna is near.", key: "psychic" },
      { title: "Final battle role: Is Will the key to defeating Vecna?", key: "key" },
    ]
  },
  "Will trauma theory": {
    topic: "Will trauma theory",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Week in the UD: The lasting psychological effects.", key: "week" },
      { title: "Is it all in his head?: The dream theory explained.", key: "dream" },
      { title: "Healing arc: Will's journey to recovery.", key: "healing" },
    ]
  },
  "Russian experiment theories": {
    topic: "Russian experiment theories",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Cold War secrets: What the Russians were really doing.", key: "coldwar" },
      { title: "Mind control tech: Perception alteration experiments.", key: "mindtech" },
      { title: "Demogorgon army: Building weapons from the UD.", key: "army" },
    ]
  },
  "Eleven created Upside Down?": {
    topic: "Did Eleven create the Upside Down?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "The first gate: What really happened when El touched Henry.", key: "firstgate" },
      { title: "Creator vs discoverer: Competing theories explained.", key: "creator" },
      { title: "Implications: What this means for defeating it.", key: "implications" },
    ]
  },
  // Suggested queries from posts - Hidden Episode
  "S4 hidden credit messages": {
    topic: "Season 4 hidden credit messages",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Number codes: Fans decode mysterious sequences.", key: "codes" },
      { title: "Frame by frame: Hidden text discovered in credits.", key: "frames" },
      { title: "Duffer clues: Intentional breadcrumbs for fans.", key: "dufferclues" },
    ]
  },
  "Secret episode leak": {
    topic: "Secret episode leak rumors",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Insider claims: What alleged leakers are saying.", key: "insiders" },
      { title: "Episode count: Evidence of hidden content.", key: "count" },
      { title: "Fact check: Which leaks are credible.", key: "factcheck" },
    ]
  },
  "ARG clues found": {
    topic: "ARG clues discovered",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Website secrets: Hidden pages on official sites.", key: "websites" },
      { title: "Real world coordinates: Locations fans have found.", key: "coords" },
      { title: "Social media puzzles: Cryptic posts decoded.", key: "social" },
    ]
  },
  "Season 4 easter eggs": {
    topic: "Season 4 easter eggs",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Blink and miss: The most hidden references.", key: "blink" },
      { title: "Timeline clues: Details that hint at Season 5.", key: "timeline" },
      { title: "Pop culture nods: 80s references you may have missed.", key: "popculture" },
    ]
  },
  "Duffer finale hints": {
    topic: "Duffer Brothers finale hints",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Interview analysis: What the creators have revealed.", key: "interviews" },
      { title: "Between the lines: Hidden meanings in their words.", key: "meanings" },
      { title: "Promise to fans: Their commitment to the ending.", key: "promise" },
    ]
  },
  "Netflix hidden codes": {
    topic: "Netflix hidden codes",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "App secrets: Rumored hidden menus.", key: "app" },
      { title: "Code hunters: Fan attempts to crack them.", key: "hunters" },
      { title: "Black Mirror precedent: Netflix's history with hidden content.", key: "precedent" },
    ]
  },
  "Secret Episode 9?": {
    topic: "Is there a secret Episode 9?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "True ending theory: The public finale as decoy.", key: "trueending" },
      { title: "ARG reward: Hidden episode for dedicated fans.", key: "reward" },
      { title: "Debunking: Arguments against the theory.", key: "debunking" },
    ]
  },
  "Hidden clues compilation": {
    topic: "Hidden clues compilation",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Complete timeline: All discovered clues in order.", key: "timeline" },
      { title: "Pattern analysis: What the clues point to.", key: "pattern" },
      { title: "Unsolved mysteries: Clues fans haven't cracked yet.", key: "unsolved" },
    ]
  },
  // Additional queries from layout suggestions
  "Who dies in the Stranger Things finale?": {
    topic: "Who dies in the Stranger Things finale?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Death predictions: Fans debate which beloved characters won't survive the final battle.", key: "death-predictions" },
      { title: "Safe characters: Characters most likely protected by plot armor in Season 5.", key: "safe-characters" },
      { title: "Heroic sacrifices: Which characters might die saving others from Vecna.", key: "heroic-sacrifices" },
    ]
  },
  "What happens to Eleven in Season 5?": {
    topic: "What happens to Eleven in Season 5?",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Power evolution: Fans speculate on how Eleven's abilities will grow in the finale.", key: "power-evolution" },
      { title: "Final confrontation: Eleven vs Vecna showdown theories and predictions.", key: "final-confrontation" },
      { title: "Sacrifice theories: Will Eleven give her life to save Hawkins forever?", key: "sacrifice-theories" },
    ]
  },
  "Stranger Things Season 5 release dates": {
    topic: "Stranger Things Season 5 release dates",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Official dates: Netflix confirms the final season release schedule.", key: "official-dates" },
      { title: "Volume releases: How Season 5 will be split across multiple parts.", key: "volume-releases" },
      { title: "Countdown updates: Latest news on when episodes drop.", key: "countdown-updates" },
    ]
  },
  "Will Byers Upside Down theories": {
    topic: "Will Byers Upside Down theories",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "The True Sight connection: Will's unique bond with the Upside Down explained.", key: "true-sight" },
      { title: "Key to victory: Why fans believe Will is essential to defeating Vecna.", key: "key-to-victory" },
      { title: "Dark transformation: Theories about Will's potential villain turn.", key: "dark-transformation" },
    ]
  },
  "Vecna final battle predictions": {
    topic: "Vecna final battle predictions",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Battle strategies: How the gang might defeat the ultimate villain.", key: "battle-strategies" },
      { title: "Vecna's true plan: What Henry Creel really wants in the finale.", key: "true-plan" },
      { title: "Upside Down showdown: Fans predict the epic final confrontation.", key: "upside-down-showdown" },
    ]
  },
};

const GridViewExperience = ({ 
  data,
  onBack,
  onDiscussionClick,
  onMarketplaceClick,
  onEventClick,
  onFacebookClick,
  onTopicClick,
  onExperienceChange,
  initialQuery = null, // Query from URL to initialize with
  onSearchNavigate, // Callback to navigate with query (for URL-based navigation)
}) => {
  const router = useRouter();
  
  // Search and loading state - initialize with URL query if provided
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false, false, false]);
  
  // Experience type bottom sheet state
  const { showSheet: showExperienceSheet, openSheet: openExperienceSheet, closeSheet: closeExperienceSheet, handleSelectType: handleExperienceSelect } = useExperienceTypeSheet('grid-view', onExperienceChange);
  
  // Collapsible section state
  const [collapsedSections, setCollapsedSections] = useState({});
  
  // Visible post counts for each section (start with 2)
  // Use lazy initializer to read from sessionStorage synchronously to avoid flash
  const [visibleCounts, setVisibleCounts] = useState(() => {
    const defaultCounts = {
      [SECTION_TYPES.DISCUSSIONS]: 2,
      [SECTION_TYPES.DISCUSSIONS_2]: 2,
      [SECTION_TYPES.REELS]: 2,
      [SECTION_TYPES.MARKETPLACE]: 4,
    };
    
    // Read from sessionStorage on first render (client-side only)
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('aggregationVisibleCounts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          sessionStorage.removeItem('aggregationVisibleCounts');
          return { ...defaultCounts, ...parsed };
        } catch (e) {
          // Fall through to default
        }
      }
    }
    return defaultCounts;
  });
  
  // Full screen viewer state
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [activePostIndex, setActivePostIndex] = useState(0);
  const [sourceRect, setSourceRect] = useState(null);
  const savedScrollPosition = useRef(0);
  
  const toggleSection = useCallback((sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  }, []);
  
  // Handle "See more" to load all remaining tiles
  const handleSeeMore = useCallback((sectionKey, totalCount) => {
    setVisibleCounts(prev => ({
      ...prev,
      [sectionKey]: totalCount
    }));
  }, []);
  
  // Refs for scrolling
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  // Restore scroll position when returning from permalink/PDP pages
  // Note: visibleCounts is restored synchronously in useState initializer to avoid flash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScroll = sessionStorage.getItem('aggregationScrollPosition');
      if (savedScroll) {
        const scrollY = parseInt(savedScroll, 10);
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
        sessionStorage.removeItem('aggregationScrollPosition');
      }
    }
  }, []);

  // Sync currentQuery with URL-based initialQuery (for back button support)
  useEffect(() => {
    // Update currentQuery when initialQuery changes (including when going back to null)
    setCurrentQuery(initialQuery);
    
    if (initialQuery) {
      // New query: trigger loading animation
      setIsLoading(true);
      setSectionsVisible([false, false, false, false, false]);
      // Scroll to top
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    } else {
      // Going back to original page (no query): reset to default state
      setIsLoading(false);
      setLoadingComplete(false);
      setSectionsVisible([true, true, true, true, true]);
    }
  }, [initialQuery]);

  // Handle suggestion tap from FloatingTabBar
  const handleSuggestionTap = useCallback((query) => {
    // If onSearchNavigate is provided, use URL-based navigation for proper back button support
    if (onSearchNavigate) {
      onSearchNavigate(query);
      return;
    }
    
    // Fallback: state-based navigation (for backwards compatibility)
    setSectionsVisible([false, false, false, false, false]);
    setLoadingComplete(false);
    setIsLoading(true);
    setCurrentQuery(query);
    
    // Reset all sections to initial state (collapsed counts, expanded headers)
    setVisibleCounts({
      [SECTION_TYPES.DISCUSSIONS]: 2,
      [SECTION_TYPES.DISCUSSIONS_2]: 2,
      [SECTION_TYPES.REELS]: 2,
      [SECTION_TYPES.MARKETPLACE]: 4,
    });
    setCollapsedSections({});
    
    requestAnimationFrame(() => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [onSearchNavigate]);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
    setIsLoading(false);
    
    const delays = [0, 200, 400, 600, 800];
    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setSectionsVisible(prev => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, delay);
    });
  }, []);

  // Get current content based on query
  const queryContent = currentQuery ? QUERY_CONTENT[currentQuery] : null;
  // Use the query itself as the topic if there's no special mapping, otherwise fall back to data.topic
  const displayTopic = currentQuery || queryContent?.topic || data?.topic || "Stranger Things finale predictions";
  
  const currentIntent = queryContent?.intent || INTENTS.DEFAULT;
  const sectionOrder = INTENT_SECTION_ORDER[currentIntent] || INTENT_SECTION_ORDER[INTENTS.DEFAULT];
  
  if (!data) return null;

  // Stranger Things specific content sections (8 posts each, mixed card types)
  // Section 1: Tragic Endings - character death theories
  const tragicEndingsPosts = [
    {
      id: "te-1",
      type: "reel",
      author: "ST_Theorist",
      avatar: "https://i.pravatar.cc/40?img=1",
      videoSrc: "/videos/stranger-things-finale-predictions/Video-384.mp4",
      likes: "2.3K",
      suggestedQuery: "Who dies in finale?"
    },
    {
      id: "te-2",
      type: "media",
      author: "Becker Threads",
      avatar: "https://i.pravatar.cc/40?img=3",
      image: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
      text: "Steve's character arc from bully to babysitter to hero... If he dies protecting the kids, it would be poetic but devastating 😭",
      likes: 156,
      suggestedQuery: "Steve death theory"
    },
    {
      id: "te-3",
      type: "comment",
      author: "HawkinsLocal",
      avatar: "https://i.pravatar.cc/40?img=5",
      group: "Stranger Things Fans",
      groupAvatar: "/images/stranger-things-assets/images/profile/stranger-things-post.png",
      text: "Jonathan literally hasn't had a plot line in 2 seasons. They're 100% setting him up to die saving Will or Nancy.",
      likes: 89,
      comments: 7,
      replyTo: "ST_Theorist",
      suggestedQuery: "Jonathan Season 5 fate"
    },
    {
      id: "te-4",
      type: "post",
      author: "ElevenFan",
      avatar: "https://i.pravatar.cc/40?img=11",
      group: "ST Death Pool",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
      text: "Eleven started this whole thing. She'll have to end it. I'm convinced she sacrifices herself to close the gates forever.",
      likes: 312,
      comments: 18,
      suggestedQuery: "Eleven sacrifice theory"
    },
    {
      id: "te-5",
      type: "fullMedia",
      author: "MaxFan2024",
      avatar: "https://i.pravatar.cc/40?img=28",
      videoSrc: "/videos/stranger-things-finale-predictions/Video-52.mp4",
      likes: "4.1K",
      suggestedQuery: "Max Season 5 fate"
    },
    {
      id: "te-6",
      type: "comment",
      author: "UpsideDownExpert",
      avatar: "https://i.pravatar.cc/40?img=31",
      group: "Stranger Things Fans",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
      text: "Max is already braindead. When she finally 'dies' it's going to destroy Lucas and the audience.",
      likes: 203,
      comments: 12,
      replyTo: "MaxFan2024",
      suggestedQuery: "Is Max alive?"
    },
    {
      id: "te-7",
      type: "post",
      author: "NancyDrewFan",
      avatar: "https://i.pravatar.cc/40?img=33",
      group: "Character Analysis",
      groupAvatar: "/images/stranger-things-assets/images/profile/rio-theatre-pp.jpg",
      text: "Hopper already had his fake death moment. The Duffers won't do that twice. But Joyce sacrificing herself for her boys? That tracks.",
      likes: 124,
      comments: 9,
      suggestedQuery: "Joyce death theory"
    },
    {
      id: "te-8",
      type: "media",
      author: "DustinForever",
      avatar: "https://i.pravatar.cc/40?img=35",
      image: "/images/millie/millie-1.jpg",
      text: "If Dustin dies I'm canceling Netflix. He's the heart of the show. The Duffers CANNOT do this to us.",
      likes: 478,
      suggestedQuery: "Will Dustin survive?"
    },
  ];

  // Section 2: Fake Reality - simulation/illusion theories
  const fakeRealityPosts = [
    {
      id: "fr-1",
      type: "fullMedia",
      author: "MatrixTheory",
      avatar: "https://i.pravatar.cc/40?img=5",
      videoSrc: "/videos/stranger-things-interviews/Video-153.mp4",
      likes: "5.2K",
      suggestedQuery: "Hawkins simulation theory"
    },
    {
      id: "fr-2",
      type: "post",
      author: "VecnaWatcher",
      avatar: "https://i.pravatar.cc/40?img=8",
      group: "Mind Control Theories",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg",
      text: "Vecna literally shows people their 'true reality' before killing them. What if the REAL Hawkins died in Season 1 and everything since is an illusion?",
      likes: 267,
      comments: 15,
      suggestedQuery: "Vecna mind control"
    },
    {
      id: "fr-3",
      type: "reel",
      author: "UpsideDownClues",
      avatar: "https://i.pravatar.cc/40?img=12",
      videoSrc: "/videos/stranger-things-interviews/Video-193.mp4",
      likes: "1.8K",
      suggestedQuery: "Upside Down reality"
    },
    {
      id: "fr-4",
      type: "comment",
      author: "CreelHouseHunter",
      avatar: "https://i.pravatar.cc/40?img=1",
      group: "Creel House Fans",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/lego.jpg",
      text: "Victor Creel was seeing things that weren't there. His whole reality was manipulated by Henry. What's stopping Henry from doing that to EVERYONE?",
      likes: 156,
      comments: 6,
      replyTo: "VecnaWatcher",
      suggestedQuery: "Henry Creel backstory"
    },
    {
      id: "fr-5",
      type: "media",
      author: "WillTheWise",
      avatar: "https://i.pravatar.cc/40?img=37",
      image: "/images/millie/millie-2.jpg",
      text: "Will drew the tunnels from memory... or was he unconsciously mapping a SIMULATION? His connection to the Upside Down might be showing him the truth.",
      likes: 341,
      suggestedQuery: "Will's Upside Down connection"
    },
    {
      id: "fr-6",
      type: "comment",
      author: "DreamsAndNightmares",
      avatar: "https://i.pravatar.cc/40?img=39",
      group: "Will Byers Fan Club",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
      text: "The whole show could be Will's trauma response. He was alone in the UD for a week. His mind created a 'safe' version of reality.",
      likes: 203,
      comments: 11,
      replyTo: "WillTheWise",
      suggestedQuery: "Will trauma theory"
    },
    {
      id: "fr-7",
      type: "post",
      author: "RussianLab",
      avatar: "https://i.pravatar.cc/40?img=41",
      group: "Government Secrets",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/funko-pop-3.jpg",
      text: "The Russians were experimenting with PERCEPTION ALTERATION. What if they succeeded and the whole town has been in a controlled reality since Season 3?",
      likes: 189,
      comments: 8,
      suggestedQuery: "Russian experiment theories"
    },
    {
      id: "fr-8",
      type: "reel",
      author: "ElevenCreated",
      avatar: "https://i.pravatar.cc/40?img=43",
      videoSrc: "/videos/stranger-things-interviews/Video-270.mp4",
      likes: "3.4K",
      suggestedQuery: "Eleven created Upside Down?"
    },
  ];

  // Section 3: Hidden Episode - secret episode 9 theories
  const hiddenEpisodePosts = [
    {
      id: "he-1",
      type: "media",
      author: "EasterEggHunter",
      avatar: "https://i.pravatar.cc/40?img=15",
      image: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
      text: "Found these cryptic numbers in the S4 credits. 11-8-9... November 8th, Episode 9? The Duffers are definitely teasing something hidden.",
      likes: 287,
      suggestedQuery: "S4 hidden credit messages"
    },
    {
      id: "he-2",
      type: "reel",
      author: "NetflixLeaks",
      avatar: "https://i.pravatar.cc/40?img=20",
      videoSrc: "/videos/stranger-things-finale-predictions/Video-198.mp4",
      likes: "4.7K",
      suggestedQuery: "Secret episode leak"
    },
    {
      id: "he-3",
      type: "post",
      author: "ARGHunter",
      avatar: "https://i.pravatar.cc/40?img=22",
      group: "Netflix Detectives",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
      text: "Netflix did hidden content for Black Mirror. The ST website has unlisted pages. I found coordinates leading to Atlanta. Something's there.",
      likes: 356,
      comments: 14,
      suggestedQuery: "ARG clues found"
    },
    {
      id: "he-4",
      type: "comment",
      author: "FrameByFrame",
      avatar: "https://i.pravatar.cc/40?img=25",
      group: "Easter Egg Hunters",
      groupAvatar: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg",
      text: "I scrubbed through all of S4 at 0.25x speed. There are AT LEAST 5 frames with hidden text that don't match the timeline.",
      likes: 178,
      comments: 5,
      replyTo: "EasterEggHunter",
      suggestedQuery: "Season 4 easter eggs"
    },
    {
      id: "he-5",
      type: "fullMedia",
      author: "DufferSecrets",
      avatar: "https://i.pravatar.cc/40?img=45",
      videoSrc: "/videos/stranger-things-interviews/Video-706.mp4",
      likes: "2.1K",
      suggestedQuery: "Duffer finale hints"
    },
    {
      id: "he-6",
      type: "comment",
      author: "InsiderInfo",
      avatar: "https://i.pravatar.cc/40?img=47",
      group: "Netflix Insiders",
      groupAvatar: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg",
      text: "My cousin works on the Netflix app team. They said there's a hidden menu that unlocks with a specific code. Still trying to crack it.",
      likes: 445,
      comments: 19,
      replyTo: "ARGHunter",
      suggestedQuery: "Netflix hidden codes"
    },
    {
      id: "he-7",
      type: "post",
      author: "TheoryConnector",
      avatar: "https://i.pravatar.cc/40?img=49",
      group: "Episode 9 Hunters",
      groupAvatar: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
      text: "What if the 'hidden episode' is the TRUE ending? The public finale is a decoy. Real fans who solve the ARG get the real conclusion.",
      likes: 523,
      comments: 16,
      suggestedQuery: "Secret Episode 9?"
    },
    {
      id: "he-8",
      type: "reel",
      author: "ClueCompilation",
      avatar: "https://i.pravatar.cc/40?img=51",
      videoSrc: "/videos/stranger-things-finale-predictions/Video-267.mp4",
      likes: "6.2K",
      suggestedQuery: "Hidden clues compilation"
    },
  ];

  // Related topics - relevant follow-up questions based on page content
  const relatedTopics = [
    "Who dies in the Stranger Things finale?",
    "Will there be a Stranger Things spinoff?",
    "Stranger Things finale watch parties near me"
  ];

  // Section-specific suggested search queries for drill-down
  const sectionSuggestedQueries = {
    [SECTION_TYPES.DISCUSSIONS]: [
      "Will Steve die in Season 5?",
      "Jonathan death theories",
      "Eleven sacrifice finale",
      "Who dies in the finale?",
      "Character death predictions",
      "Tragic ending evidence"
    ],
    [SECTION_TYPES.DISCUSSIONS_2]: [
      "Upside Down reality theory",
      "Is Hawkins real?",
      "Mind Flayer simulation",
      "Vecna's illusion theory",
      "Fake reality clues",
      "Dream sequence evidence"
    ],
    [SECTION_TYPES.REELS]: [
      "Secret episode 9 leak",
      "Hidden finale scenes",
      "Post-credits scene rumors",
      "Deleted scenes Season 5",
      "Extended cut theory",
      "Bonus episode evidence"
    ]
  };

  // Build flat array of all posts for full-screen navigation
  const allPosts = useMemo(() => [
    ...tragicEndingsPosts,
    ...fakeRealityPosts,
    ...hiddenEpisodePosts,
  ], [tragicEndingsPosts, fakeRealityPosts, hiddenEpisodePosts]);

  // Calculate start index for each section
  const sectionStartIndices = useMemo(() => ({
    [SECTION_TYPES.DISCUSSIONS]: 0,
    [SECTION_TYPES.DISCUSSIONS_2]: tragicEndingsPosts.length,
    [SECTION_TYPES.REELS]: tragicEndingsPosts.length + fakeRealityPosts.length,
  }), [tragicEndingsPosts.length, fakeRealityPosts.length]);

  // Handle post click - route based on post type
  const handlePostClick = useCallback((post, globalIndex, event) => {
    const cardType = post.type || 'post';
    
    // Group posts and comments -> Groups permalink page
    if (cardType === 'post' || cardType === 'comment') {
      // Save scroll position and expanded state before navigating
      sessionStorage.setItem('aggregationScrollPosition', String(window.scrollY));
      sessionStorage.setItem('aggregationVisibleCounts', JSON.stringify(visibleCounts));
      
      // Capture the bounding rect for expand animation
      if (event?.currentTarget) {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const rect = {
          top: boundingRect.top,
          left: boundingRect.left,
          width: boundingRect.width,
          height: boundingRect.height,
        };
        // Store in sessionStorage for the permalink page to use
        sessionStorage.setItem('aggregationSourceRect', JSON.stringify(rect));
      }
      
      // Store the full post data for the permalink page to reflect the card content
      const postData = {
        type: cardType,
        text: post.text || '',
        author: post.author || 'Community Member',
        avatar: post.avatar || '',
        group: post.group || 'Stranger Things Fans',
        groupAvatar: post.groupAvatar || '',
        likes: post.likes || 0,
        comments: post.comments || 12,
        replyTo: post.replyTo || null,
        suggestedQuery: post.suggestedQuery || '',
      };
      sessionStorage.setItem('aggregationPostData', JSON.stringify(postData));
      
      const groupId = encodeURIComponent(post.group || 'stranger-things-fans');
      const postId = `source-${post.id}`;
      const params = new URLSearchParams({
        fromAggregation: 'true',
      });
      // Add highlight param for comments to trigger pulse animation
      if (cardType === 'comment') {
        params.set('highlightComment', 'true');
      }
      router.push(`/m/groups/${groupId}/posts/${postId}?${params}`);
      return;
    }
    
    // All other types (reel, media, fullMedia) -> Immersive viewer
    // Save current scroll position
    savedScrollPosition.current = window.scrollY;
    
    // Capture the bounding rect of the clicked tile for expand animation
    let rect = null;
    if (event?.currentTarget) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      rect = {
        top: boundingRect.top,
        left: boundingRect.left,
        width: boundingRect.width,
        height: boundingRect.height,
      };
    }
    
    // Set all state synchronously to ensure sourceRect is available when viewer opens
    setSourceRect(rect);
    setActivePostIndex(globalIndex);
    
    // Use requestAnimationFrame to ensure state is flushed before opening
    requestAnimationFrame(() => {
      setShowFullScreenViewer(true);
    });
  }, [router, visibleCounts]);

  // Handle closing full screen viewer - restore scroll position
  const handleCloseViewer = useCallback(() => {
    setShowFullScreenViewer(false);
    // Delay clearing source rect until after exit animation completes (200ms)
    setTimeout(() => {
      setSourceRect(null);
    }, 250);
    // Restore scroll position after viewer closes
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition.current);
    });
  }, []);

  // Handle marketplace item click - navigate to PDP with expand animation
  const handleMarketplaceClick = useCallback((itemId, event) => {
    // Save scroll position and expanded state before navigating
    sessionStorage.setItem('aggregationScrollPosition', String(window.scrollY));
    sessionStorage.setItem('aggregationVisibleCounts', JSON.stringify(visibleCounts));
    
    // Capture the bounding rect for expand animation
    if (event?.currentTarget) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const rect = {
        top: boundingRect.top,
        left: boundingRect.left,
        width: boundingRect.width,
        height: boundingRect.height,
      };
      sessionStorage.setItem('marketplaceSourceRect', JSON.stringify(rect));
    }
    
    const pdpId = MARKETPLACE_PDP_MAP[itemId] || 't1';
    router.push(`/m/marketplace/${pdpId}?fromAggregation=true`);
  }, [router, visibleCounts]);

  // Get section titles based on current query or defaults
  const getSectionTitles = () => {
    if (queryContent?.sections) {
      return queryContent.sections.map(s => s.title);
    }
    return [
      "Tragic endings: Fans speculate that beloved characters like Steve, Jonathan, and Eleven may not survive the [final battle](Stranger Things final battle) against Vecna in [Season 5](Stranger Things Season 5 finale).",
      "Fake reality: Others think that the characters have been trapped in a [simulated reality](Stranger Things simulation theory) created by the Mind Flayer or Vecna since [Season 1](Stranger Things Season 1 theories).",
      "Hidden episode: Some fans believe Netflix is hiding a [secret ninth episode](secret episode 9 Stranger Things) that will only be unlocked after solving an [ARG puzzle](Stranger Things ARG clues).",
    ];
  };

  const sectionTitles = getSectionTitles();

  // Helper to check if previous section needs extra spacing below it
  // Returns true if section has more tiles visible OR is collapsed
  const previousSectionNeedsSpacing = (sectionType) => {
    const initialCounts = {
      [SECTION_TYPES.DISCUSSIONS]: 2,
      [SECTION_TYPES.DISCUSSIONS_2]: 2,
      [SECTION_TYPES.REELS]: 2,
      [SECTION_TYPES.MARKETPLACE]: 4,
    };
    const hasMoreTiles = visibleCounts[sectionType] > (initialCounts[sectionType] || 2);
    const isCollapsed = collapsedSections[sectionType];
    // Add spacing if section has more tiles (and not collapsed) OR if section is collapsed
    return (hasMoreTiles && !isCollapsed) || isCollapsed;
  };

  // Render a section based on its type
  const renderSection = (sectionType, index) => {
    const isVisible = !currentQuery || sectionsVisible[index];
    
    // Check if the previous section needs spacing (has more tiles or is collapsed)
    const previousSectionType = index > 0 ? sectionOrder[index - 1] : null;
    const previousExpanded = previousSectionType ? previousSectionNeedsSpacing(previousSectionType) : false;
    
    switch (sectionType) {
      case SECTION_TYPES.DISCUSSIONS:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
          >
            <ContentBucketSection 
              title={sectionTitles[0] || "Tragic endings: Fans speculate that beloved characters like Steve, Jonathan, and Eleven may not survive the [final battle](Stranger Things final battle) against Vecna in [Season 5](Stranger Things Season 5 finale)."}
              posts={tragicEndingsPosts}
              isCollapsed={collapsedSections[SECTION_TYPES.DISCUSSIONS]}
              onToggle={() => toggleSection(SECTION_TYPES.DISCUSSIONS)}
              visibleCount={visibleCounts[SECTION_TYPES.DISCUSSIONS]}
              onSeeMore={() => handleSeeMore(SECTION_TYPES.DISCUSSIONS, tragicEndingsPosts.length)}
              previousSectionExpanded={previousExpanded}
              suggestedQueries={sectionSuggestedQueries[SECTION_TYPES.DISCUSSIONS]}
              onQueryClick={(query) => {
                handleSuggestionTap(query);
                onTopicClick?.(query);
              }}
              startIndex={sectionStartIndices[SECTION_TYPES.DISCUSSIONS]}
            />
          </div>
        );
      
      case SECTION_TYPES.DISCUSSIONS_2:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
          >
            <ContentBucketSection 
              title={sectionTitles[1] || "Fake reality: Others think that the characters have been trapped in a [simulated reality](Stranger Things simulation theory) created by the Mind Flayer or Vecna since [Season 1](Stranger Things Season 1 theories)."}
              posts={fakeRealityPosts}
              isCollapsed={collapsedSections[SECTION_TYPES.DISCUSSIONS_2]}
              onToggle={() => toggleSection(SECTION_TYPES.DISCUSSIONS_2)}
              visibleCount={visibleCounts[SECTION_TYPES.DISCUSSIONS_2]}
              onSeeMore={() => handleSeeMore(SECTION_TYPES.DISCUSSIONS_2, fakeRealityPosts.length)}
              previousSectionExpanded={previousExpanded}
              suggestedQueries={sectionSuggestedQueries[SECTION_TYPES.DISCUSSIONS_2]}
              onQueryClick={(query) => {
                handleSuggestionTap(query);
                onTopicClick?.(query);
              }}
              startIndex={sectionStartIndices[SECTION_TYPES.DISCUSSIONS_2]}
            />
          </div>
        );
      
      case SECTION_TYPES.REELS:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
          >
            <ContentBucketSection 
              title={sectionTitles[2] || "Hidden episode: Some fans believe Netflix is hiding a [secret ninth episode](secret episode 9 Stranger Things) that will only be unlocked after solving an [ARG puzzle](Stranger Things ARG clues)."}
              posts={hiddenEpisodePosts}
              isCollapsed={collapsedSections[SECTION_TYPES.REELS]}
              onToggle={() => toggleSection(SECTION_TYPES.REELS)}
              visibleCount={visibleCounts[SECTION_TYPES.REELS]}
              onSeeMore={() => handleSeeMore(SECTION_TYPES.REELS, hiddenEpisodePosts.length)}
              previousSectionExpanded={previousExpanded}
              suggestedQueries={sectionSuggestedQueries[SECTION_TYPES.REELS]}
              onQueryClick={(query) => {
                handleSuggestionTap(query);
                onTopicClick?.(query);
              }}
              startIndex={sectionStartIndices[SECTION_TYPES.REELS]}
            />
          </div>
        );
      
      case SECTION_TYPES.RELATED:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
          >
            <RelatedTopicsSection 
              topics={relatedTopics}
              onTopicClick={(topic) => {
                handleSuggestionTap(topic);
                onTopicClick?.(topic);
              }}
              previousSectionExpanded={previousExpanded}
            />
          </div>
        );
      
      case SECTION_TYPES.MARKETPLACE:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
          >
            <GridMarketplaceSection 
              visibleCount={visibleCounts[SECTION_TYPES.MARKETPLACE]}
              onSeeMore={() => handleSeeMore(SECTION_TYPES.MARKETPLACE, MARKETPLACE_ITEMS.length)}
              previousSectionExpanded={previousExpanded}
              onItemClick={handleMarketplaceClick}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="grid-view-experience has-floating-tab-bar">
      {/* Page Header */}
      <PageHeader 
        topic={displayTopic}
        talkingCount={data.socialProof?.count || "32.1K"}
        onFacebookClick={onFacebookClick}
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        headerRef={headerRef}
      />

      {/* Content sections - rendered dynamically based on intent */}
      <main className="gve-content" style={{ paddingBottom: '200px' }}>
        {sectionOrder.map((sectionType, index) => renderSection(sectionType, index))}
      </main>

      {/* Experience Type Bottom Sheet */}
      <ExperienceTypeBottomSheet
        isOpen={showExperienceSheet}
        onClose={closeExperienceSheet}
        currentType="grid-view"
        onSelectType={handleExperienceSelect}
      />

      {/* Full Screen Post Viewer */}
      <FullScreenPostViewer
        isOpen={showFullScreenViewer}
        onClose={handleCloseViewer}
        posts={allPosts}
        initialIndex={activePostIndex}
        sourceRect={sourceRect}
        searchPlaceholder="Ask about Stranger Things..."
        onSearch={(query) => {
          handleCloseViewer();
          handleSuggestionTap(query);
          onTopicClick?.(query);
        }}
      />
    </div>
  );
};

export default GridViewExperience;
