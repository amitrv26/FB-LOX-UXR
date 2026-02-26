"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import FloatingTabBar from "./FloatingTabBar";
import AILoadingChip from "./AILoadingChip";
import { ExperienceTypeBottomSheet, useExperienceTypeSheet } from "./ExperienceTypeSheet";

// ============================================
// CONSTANTS
// ============================================

const GREY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23E4E6EB' width='400' height='400'/%3E%3C/svg%3E";
const GREY_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23BCC0C4' width='40' height='40' rx='20'/%3E%3C/svg%3E";

// ============================================
// BLUEPRINT ICONS (local wrappers with specific sizes/colors)
// ============================================

// Blueprint Like icon - 16dp outline (thumbs up from Blueprint library)
const LikeIcon16 = ({ color = "#65676B" }) => (
  <LikeIconBase size={16} color={color} />
);

// Blueprint Comment icon - 16dp outline (from Blueprint library)  
const CommentIcon16 = ({ color = "#65676B" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.75C4.27208 1.75 1.25 4.40816 1.25 7.75C1.25 9.20021 1.79772 10.5346 2.71651 11.5937L2.25 14.25L5.07926 12.9896C5.97943 13.4082 6.96334 13.6389 8 13.6389C11.7279 13.6389 14.75 10.9808 14.75 7.75C14.75 4.40816 11.7279 1.75 8 1.75Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Wrapper icons that use the centralized library
const CaretDownIcon = () => <CaretDownIconBase size={12} color="#65676B" />;
const SearchIcon = () => <SearchIconBase size={20} color="#65676B" />;
const DotsIcon = () => <DotsIconBase size={24} color="white" />;
const StarIcon = () => <StarOutlineIcon size={16} color="currentColor" />;
const VerifiedBadge = () => <BadgeCheckmarkIcon size={12} color="#1877F2" />;

// Reaction icons with unique gradient IDs
let reactionId = 0;
const getReactionId = (prefix) => `${prefix}-cfe-${++reactionId}`;

const LikeReactionIcon = () => <LikeReactionIconBase size={18} />;
const LoveReactionIcon = () => <LoveReactionIconBase size={18} />;
const WowReactionIcon = () => <WowReactionIconBase size={18} />;

// Inline reactions component
const InlineReactions = ({ count }) => (
  <div className="cfe-inline-reactions">
    <div className="cfe-inline-reactions__icons">
      <div className="cfe-inline-reactions__icon"><LikeReactionIcon /></div>
      <div className="cfe-inline-reactions__icon cfe-inline-reactions__icon--overlap"><LoveReactionIcon /></div>
      <div className="cfe-inline-reactions__icon cfe-inline-reactions__icon--overlap"><WowReactionIcon /></div>
    </div>
  </div>
);

// ============================================
// SUB-COMPONENTS
// ============================================

// Facepile - overlapping avatars (same as AI-forward)
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

// Action Chip - same as AI-forward page
const ActionChip = ({ label, onClick }) => (
  <button className="ai-forward__action-chip" onClick={onClick}>
    <Facepile />
    <span>{label}</span>
  </button>
);

// Page Header - AI-forward style topic title + action chip
// Supports loading state with AILoadingChip
const PageHeader = ({ topic, talkingCount, onFacebookClick, isLoading, onLoadingComplete, headerRef, onExperienceClick }) => (
  <div className="cfe-page-header" ref={headerRef}>
    <button className="cfe-page-header__topic-btn" onClick={onFacebookClick}>
      <h1 className="cfe-page-header__title">{topic}</h1>
    </button>
    <div className="cfe-page-header__chip-wrapper">
      {isLoading ? (
        <AILoadingChip 
          isLoading={isLoading} 
          finalCount={talkingCount}
          onLoadingComplete={onLoadingComplete}
        />
      ) : (
        <ActionChip 
          label={`${talkingCount} people talking about this`}
          onClick={onExperienceClick}
        />
      )}
    </div>
  </div>
);

// Unit Header - section header (Blueprint styling)
// Formats title so first two words before colon are bold
// Supports collapsible sections with chevron-up/down
const UnitHeader = ({ title, isCollapsed, onToggle }) => {
  // Parse title to bold first two keywords before colon
  const formatTitle = (text) => {
    const colonIndex = text.indexOf(':');
    if (colonIndex === -1) {
      return <span>{text}</span>;
    }
    
    const beforeColon = text.substring(0, colonIndex);
    const afterColon = text.substring(colonIndex);
    
    return (
      <>
        <span className="cfe-unit-header__title-bold">{beforeColon}</span>
        <span>{afterColon}</span>
      </>
    );
  };

  return (
    <button 
      className={`cfe-unit-header ${onToggle ? 'cfe-unit-header--clickable' : ''}`}
      onClick={onToggle}
    >
      <h2 className="cfe-unit-header__title">{formatTitle(title)}</h2>
      {onToggle && (
        <div className="cfe-unit-header__chevron">
          <Icon 
            name={isCollapsed ? "chevron-down-outline" : "chevron-up-outline"} 
            size={20} 
            color="secondary" 
          />
        </div>
      )}
    </button>
  );
};

// Responsive Post Card - text on top, author bottom-left, like count bottom-right
const ResponsivePostCard = ({ author, avatar, group, text, likes }) => (
  <div className="cfe-post-card">
    <p className="cfe-post-card__text">{text}</p>
    <div className="cfe-post-card__footer">
      <div className="cfe-post-card__author-row">
        <img src={avatar || GREY_AVATAR} alt="" className="cfe-post-card__avatar" />
        <span className="cfe-post-card__author-text">
          <span className="cfe-post-card__author-name">{author}</span> in {group}
        </span>
      </div>
      <div className="cfe-post-card__ufi-item">
        <LikeIcon16 color="#65676B" />
        <span>{likes}</span>
      </div>
    </div>
  </div>
);

// Horizontal scroll container with snap scroll
const HorizontalScroll = ({ children }) => (
  <div className="cfe-hscroll">
    <div className="cfe-hscroll__track">
      {children}
    </div>
  </div>
);

// Reel Card - for reels h-scroll with auto-play on visibility
const ReelCard = ({ author, avatar, thumbnail, videoSrc, likes, comments, shouldPlay }) => {
  const videoRef = useRef(null);

  // Handle play/pause based on shouldPlay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (shouldPlay) {
      video.play().catch(() => {
        // Autoplay may be blocked, ignore error
      });
    } else {
      video.pause();
    }
  }, [shouldPlay, videoSrc]);

  return (
    <div className="cfe-reel-card">
      <div className="cfe-reel-card__media">
        {videoSrc ? (
          <video 
            ref={videoRef}
            className="cfe-reel-card__video" 
            src={videoSrc}
            muted 
            playsInline 
            loop
            preload="auto"
          />
        ) : (
          <img 
            className="cfe-reel-card__image" 
            src={thumbnail || GREY_PLACEHOLDER} 
            alt="" 
          />
        )}
        <div className="cfe-reel-card__overlay-top" />
        <div className="cfe-reel-card__overlay-bottom" />
        
        {/* Header with profile */}
        <div className="cfe-reel-card__header">
          <img 
            src={avatar || GREY_AVATAR} 
            alt="" 
            className="cfe-reel-card__avatar" 
          />
          <span className="cfe-reel-card__author-name">{author}</span>
        </div>
        
        {/* Footer with UFI */}
        <div className="cfe-reel-card__footer">
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
};

// Media Card for marketplace (with price badge)
const MediaCard = ({ title, price }) => (
  <div className="cfe-media-card">
    <div className="cfe-media-card__image-wrapper">
      <img src={GREY_PLACEHOLDER} alt={title} className="cfe-media-card__image" />
      {price && <span className="cfe-media-card__price-badge">{price}</span>}
    </div>
    <h4 className="cfe-media-card__title">{title}</h4>
  </div>
);

// Media Grid - 2 column grid
const MediaGrid = ({ items }) => (
  <div className="cfe-media-grid">
    {items.map((item, idx) => (
      <MediaCard key={item.id || idx} title={item.title} price={item.price} />
    ))}
  </div>
);

// Event Post Card - full width event with "Interested" button
const EventPostCard = ({ author, time, location, title, venue, date, interested, going, shares }) => (
  <div className="cfe-event-post">
    <div className="cfe-event-post__media">
      <img src={GREY_PLACEHOLDER} alt="" className="cfe-event-post__image" />
      
      {/* Header overlay */}
      <div className="cfe-event-post__header">
        <div className="cfe-event-post__author-info">
          <img src={GREY_AVATAR} alt="" className="cfe-event-post__author-avatar" />
          <div className="cfe-event-post__author-text">
            <div className="cfe-event-post__author-name">
              {author}
              <VerifiedBadge />
            </div>
            <span className="cfe-event-post__author-meta">{time} · {location}</span>
          </div>
        </div>
        <button className="cfe-event-post__menu">
          <DotsIcon />
        </button>
      </div>
    </div>

    {/* Event details footer */}
    <div className="cfe-event-post__details">
      <div className="cfe-event-post__event-info">
        <span className="cfe-event-post__date">{date}</span>
        <h3 className="cfe-event-post__title">{title}</h3>
        <span className="cfe-event-post__venue">{venue}</span>
      </div>
      <button className="cfe-event-post__interested-btn">
        <StarIcon />
        <span>Interested</span>
      </button>
    </div>

    {/* UFI */}
    <div className="cfe-event-post__ufi">
      <div className="cfe-event-post__ufi-item">
        <LikeIcon16 />
        <span>{interested}</span>
      </div>
      <div className="cfe-event-post__ufi-item">
        <CommentIcon16 />
        <span>{going}</span>
      </div>
      <div className="cfe-event-post__ufi-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676B">
          <path d="M12 3l12 15H0z" transform="rotate(90 12 12)"/>
        </svg>
        <span>{shares}</span>
      </div>
      <InlineReactions />
    </div>
  </div>
);

// See More Button
const SeeMoreButton = ({ label = "View more items", onClick }) => (
  <div className="cfe-see-more">
    <button className="cfe-see-more__btn" onClick={onClick}>
      <span>{label}</span>
      <CaretDownIcon />
    </button>
  </div>
);

// Related Topic Item - FDS Action Chip Primary Medium on Surface
const RelatedTopicItem = ({ topic, onClick }) => (
  <button className="fds-action-chip" onClick={() => onClick?.(topic)}>
    <Icon name="gen-ai-magnifying-glass-outline" size={16} color="primary" />
    <span className="fds-action-chip__label">{topic}</span>
  </button>
);

// ============================================
// SECTION COMPONENTS
// ============================================

// Content Bucket Section - heading + h-scroll of post cards
// Supports collapsible sections
const ContentBucketSection = ({ title, posts, isCollapsed, onToggle }) => (
  <section className="cfe-bucket">
    <UnitHeader title={title} isCollapsed={isCollapsed} onToggle={onToggle} />
    {!isCollapsed && (
      <HorizontalScroll>
        {posts.map((post, idx) => (
          <ResponsivePostCard
            key={post.id || idx}
            author={post.author}
            avatar={post.avatar}
            group={post.group}
            text={post.text}
            likes={post.likes}
          />
        ))}
      </HorizontalScroll>
    )}
  </section>
);

// Reels Section - h-scroll with auto-play on first visible reel
// Supports collapsible sections
const ReelsSection = ({ title, reels, isCollapsed, onToggle }) => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const reelRefs = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);

  // Detect when section enters/leaves viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { 
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    sectionObserver.observe(section);
    return () => sectionObserver.disconnect();
  }, []);

  // Set up IntersectionObserver to detect which reel is most visible
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const options = {
      root: container,
      rootMargin: '0px',
      threshold: 0.6, // 60% visible to be considered "in view"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = reelRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setVisibleIndex(index);
          }
        }
      });
    }, options);

    // Observe all reel cards
    reelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [reels.length]);

  return (
    <section className="cfe-bucket" ref={sectionRef}>
      <UnitHeader title={title} isCollapsed={isCollapsed} onToggle={onToggle} />
      {!isCollapsed && (
        <div className="cfe-reels-hscroll" ref={scrollContainerRef}>
          <div className="cfe-hscroll__track">
            {reels.map((reel, idx) => (
              <div
                key={reel.id || idx}
                ref={(el) => (reelRefs.current[idx] = el)}
              >
                <ReelCard
                  author={reel.author}
                  avatar={reel.avatar}
                  thumbnail={reel.thumbnail}
                  videoSrc={reel.videoSrc}
                  likes={reel.likes}
                  comments={reel.comments}
                  shouldPlay={sectionInView && idx === visibleIndex}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// Marketplace Section
const MarketplaceSection = ({ title, items, onSeeMore }) => (
  <section className="cfe-bucket">
    <UnitHeader title={title} />
    <MediaGrid items={items} />
    <SeeMoreButton label="View more items" onClick={onSeeMore} />
  </section>
);

// Event Section
const EventSection = ({ title, event, onSeeMore }) => (
  <section className="cfe-bucket">
    <UnitHeader title={title} />
    <EventPostCard {...event} />
    <SeeMoreButton label="View more events" onClick={onSeeMore} />
  </section>
);

// Related Topics Section
const RelatedTopicsSection = ({ topics, onTopicClick }) => (
  <section className="cfe-related-topics">
    <h3 className="cfe-related-topics__title">Others searched for</h3>
    <div className="cfe-related-topics__list">
      {topics.map((topic, idx) => (
        <RelatedTopicItem key={idx} topic={topic} onClick={onTopicClick} />
      ))}
    </div>
  </section>
);

// ============================================
// MAIN COMPONENT
// ============================================

// Section types for dynamic ordering
const SECTION_TYPES = {
  DISCUSSIONS: 'discussions',      // Group discussions h-scroll
  DISCUSSIONS_2: 'discussions_2',  // Second discussions section
  REELS: 'reels',                  // Reels h-scroll
  MARKETPLACE: 'marketplace',      // Marketplace unit
  RELATED: 'related',              // Related topics
};

// Intent types that determine section ordering
const INTENTS = {
  DEFAULT: 'default',           // Default ordering for general queries
  PARTY_PLANNING: 'party',      // Party/event planning - visual content first
  REVIEWS: 'reviews',           // Reviews/opinions - discussions first
  SHOPPING: 'shopping',         // Shopping intent - marketplace first
  ENTERTAINMENT: 'entertainment', // Entertainment - reels first
  LOCAL_EVENTS: 'local_events', // Local events - discussions + marketplace
};

// Section order mapping by intent
const INTENT_SECTION_ORDER = {
  [INTENTS.DEFAULT]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
    SECTION_TYPES.MARKETPLACE,
  ],
  [INTENTS.PARTY_PLANNING]: [
    SECTION_TYPES.REELS,
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.MARKETPLACE,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.REVIEWS]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
    SECTION_TYPES.MARKETPLACE,
  ],
  [INTENTS.SHOPPING]: [
    SECTION_TYPES.MARKETPLACE,
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.REELS,
    SECTION_TYPES.RELATED,
  ],
  [INTENTS.ENTERTAINMENT]: [
    SECTION_TYPES.REELS,
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.DISCUSSIONS_2,
    SECTION_TYPES.RELATED,
    SECTION_TYPES.MARKETPLACE,
  ],
  [INTENTS.LOCAL_EVENTS]: [
    SECTION_TYPES.DISCUSSIONS,
    SECTION_TYPES.MARKETPLACE,
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
  "Hawkins lab explained": {
    topic: "Hawkins Lab explained",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Project MKUltra: The real-life inspiration behind Hawkins National Laboratory.", key: "mkultra" },
      { title: "Dr. Brenner's experiments: A timeline of the lab's dark history.", key: "brenner" },
      { title: "The other children: What happened to subjects 001-010?", key: "children" },
    ]
  },
  "Vecna's origin story": {
    topic: "Vecna's origin story explained",
    intent: INTENTS.DEFAULT,
    sections: [
      { title: "Henry Creel: From disturbed child to the Upside Down's ultimate villain.", key: "henry" },
      { title: "One becomes Vecna: How Eleven's powers transformed him.", key: "transform" },
      { title: "His master plan: Fans theorize about Vecna's endgame.", key: "plan" },
    ]
  },
  // Related topics (Others searched for) - with intent-based ordering
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
};

const ContentForwardExperience = ({ 
  data,
  onBack,
  onDiscussionClick,
  onMarketplaceClick,
  onEventClick,
  onFacebookClick,
  onTopicClick,
  onExperienceChange,
}) => {
  // Search and loading state
  const [currentQuery, setCurrentQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Initialize with enough slots for max possible sections (5)
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false, false, false]);
  
  // Collapsible section state - track which sections are collapsed
  const [collapsedSections, setCollapsedSections] = useState({});
  
  // Toggle collapse for a section
  const toggleSection = useCallback((sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  }, []);
  
  // Experience type sheet state
  const { showSheet, openSheet, closeSheet, handleSelectType } = useExperienceTypeSheet('h-scroll', onExperienceChange);
  
  // Refs for scrolling
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  // Handle suggestion tap from FloatingTabBar
  const handleSuggestionTap = useCallback((query) => {
    // Reset state first - use 5 slots for max possible sections
    setSectionsVisible([false, false, false, false, false]);
    setLoadingComplete(false);
    setIsLoading(true);
    setCurrentQuery(query);
    
    // Scroll to top using multiple methods for compatibility
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      // Method 1: scrollIntoView on header
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
      
      // Method 2: Direct scroll assignments
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 3: Find and scroll any parent scroll containers
      let parent = containerRef.current?.parentElement;
      while (parent) {
        if (parent.scrollTop > 0) {
          parent.scrollTop = 0;
        }
        parent = parent.parentElement;
      }
    });
  }, []);

  // Handle loading complete - start cascading section reveals
  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
    setIsLoading(false);
    
    // Cascade sections with 0.2s stagger (5 sections max)
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
  const displayTopic = queryContent?.topic || data?.topic || "Stranger Things finale predictions";
  
  // Get intent and section order - default to DEFAULT intent if no query or unknown query
  const currentIntent = queryContent?.intent || INTENTS.DEFAULT;
  const sectionOrder = INTENT_SECTION_ORDER[currentIntent] || INTENT_SECTION_ORDER[INTENTS.DEFAULT];
  
  if (!data) return null;

  // Stranger Things specific content sections
  const tragicEndingsPosts = [
    {
      id: "te-1",
      author: "Sarah",
      avatar: "https://i.pravatar.cc/40?img=1",
      group: "Japan Travel Ti...",
      text: "I think Will's connection to the Upside Down will be what ultimately saves Hawkins. He might have to sacrifice himself 😭",
      likes: 20
    },
    {
      id: "te-2",
      author: "Mike",
      avatar: "https://i.pravatar.cc/40?img=3",
      group: "TOK...",
      text: "Hot take: Time works differently in The Upside Down. The 1983 HAS to mean something big for the finale.",
      likes: 31
    },
    {
      id: "te-3",
      author: "Emma",
      avatar: "https://i.pravatar.cc/40?img=5",
      group: "Stranger Things Fans",
      text: "Steve better not die. He's gone from villain to best babysitter to hero. The Duffer Brothers wouldn't dare... right?",
      likes: 156
    },
    {
      id: "te-4",
      author: "Liam",
      avatar: "https://i.pravatar.cc/40?img=11",
      group: "TV Theory Group",
      text: "Jonathan has been sidelined for too long. I have a feeling his arc will end tragically to save Nancy or Will.",
      likes: 42
    },
    {
      id: "te-5",
      author: "Ava",
      avatar: "https://i.pravatar.cc/40?img=16",
      group: "Netflix Fans",
      text: "Eleven losing her powers permanently would be the most tragic ending. She's sacrificed so much already.",
      likes: 89
    },
    {
      id: "te-6",
      author: "James",
      avatar: "https://i.pravatar.cc/40?img=8",
      group: "Hawkins Lab...",
      text: "What if the entire town gets absorbed into the Upside Down? That would explain the dark cloud in the trailer.",
      likes: 67
    },
    {
      id: "te-7",
      author: "Olivia",
      avatar: "https://i.pravatar.cc/40?img=9",
      group: "80s Nostalgia",
      text: "I'm calling it now: Eddie comes back somehow. His death was too quick and they hinted at something supernatural.",
      likes: 203
    }
  ];

  const fakeRealityPosts = [
    {
      id: "fr-1",
      author: "Emma",
      avatar: "https://i.pravatar.cc/40?img=5",
      group: "Stranger Things Fans",
      text: "What if Hawkins has been inside the Upside Down all along? The Mind Flayer could be controlling everyone's perception.",
      likes: 45
    },
    {
      id: "fr-2",
      author: "James",
      avatar: "https://i.pravatar.cc/40?img=8",
      group: "TV Theory Group",
      text: "The way they keep showing clocks... I think time loops are definitely involved. Everything reset after S3.",
      likes: 38
    },
    {
      id: "fr-3",
      author: "Noah",
      avatar: "https://i.pravatar.cc/40?img=12",
      group: "Mind Flayer Dis...",
      text: "Remember when Will drew that map? What if he was unconsciously mapping out a simulation they're all trapped in?",
      likes: 112
    },
    {
      id: "fr-4",
      author: "Sarah",
      avatar: "https://i.pravatar.cc/40?img=1",
      group: "Netflix Theories",
      text: "The Creel house feels like a trap. Victor Creel's story has holes—what if his 'reality' was fabricated by Vecna?",
      likes: 78
    },
    {
      id: "fr-5",
      author: "Mike",
      avatar: "https://i.pravatar.cc/40?img=3",
      group: "Hawkins High",
      text: "El's memories keep getting manipulated. First Papa, then the lab. What if her whole life is a constructed reality?",
      likes: 94
    },
    {
      id: "fr-6",
      author: "Ava",
      avatar: "https://i.pravatar.cc/40?img=16",
      group: "Horror Fans",
      text: "The show references The Matrix constantly. 'Wake up' appears in multiple episodes. Can't be coincidence.",
      likes: 56
    },
    {
      id: "fr-7",
      author: "Liam",
      avatar: "https://i.pravatar.cc/40?img=11",
      group: "Sci-Fi Discussion",
      text: "Dustin's compass theory from S1 applies to everything. The Upside Down isn't a place—it's a state of perception.",
      likes: 134
    }
  ];

  const hiddenEpisodePosts = [
    {
      id: "he-1",
      author: "Olivia",
      avatar: "https://i.pravatar.cc/40?img=9",
      group: "Stranger Things Fans",
      text: "There's a rumor about a secret ninth episode. Some fans believe there are hidden clues throughout the season.",
      likes: 87
    },
    {
      id: "he-2",
      author: "Noah",
      avatar: "https://i.pravatar.cc/40?img=12",
      group: "TV Theory Group",
      text: "I've been analyzing every scene and I think there are definitely Easter eggs pointing to something bigger.",
      likes: 65
    },
    {
      id: "he-3",
      author: "Sarah",
      avatar: "https://i.pravatar.cc/40?img=1",
      group: "Netflix Secrets",
      text: "The episode titles spell out a hidden message if you take the first letters. Has anyone else noticed this?!",
      likes: 245
    },
    {
      id: "he-4",
      author: "James",
      avatar: "https://i.pravatar.cc/40?img=8",
      group: "ARG Hunters",
      text: "There's a website hidden in the credits that leads to a countdown. I think something drops after the finale airs.",
      likes: 189
    },
    {
      id: "he-5",
      author: "Emma",
      avatar: "https://i.pravatar.cc/40?img=5",
      group: "Duffer Bros Fan...",
      text: "The Duffers said the finale is 'movie-length' but the runtime seems short. Secret post-credits scene incoming?",
      likes: 156
    },
    {
      id: "he-6",
      author: "Mike",
      avatar: "https://i.pravatar.cc/40?img=3",
      group: "Hawkins Lab...",
      text: "Someone found frames spliced into episode 7 that don't match any scene. Could be from a hidden episode.",
      likes: 98
    },
    {
      id: "he-7",
      author: "Ava",
      avatar: "https://i.pravatar.cc/40?img=16",
      group: "Easter Egg Hunt...",
      text: "The Russian lab scenes have morse code in the background audio. When decoded it says 'WATCH AGAIN' 👀",
      likes: 312
    }
  ];

  // Reels data for h-scroll below third heading
  const reelsData = [
    {
      id: "reel-1",
      author: "Becker Threads",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 14,
      comments: 20
    },
    {
      id: "reel-2",
      author: "Becker Threads",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 14,
      comments: 20
    },
    {
      id: "reel-3",
      author: "Netflix Fan Club",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 28,
      comments: 15
    },
    {
      id: "reel-4",
      author: "ST Theories",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 42,
      comments: 31
    },
    {
      id: "reel-5",
      author: "Hawkins Insider",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 89,
      comments: 47
    },
    {
      id: "reel-6",
      author: "80s Nostalgia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 156,
      comments: 62
    },
    {
      id: "reel-7",
      author: "Upside Down Pod",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=faces",
      thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=500&fit=crop",
      videoSrc: "/images/stranger-things-assets/videos/reels/Video-850.mp4",
      likes: 203,
      comments: 94
    }
  ];

  // Marketplace items
  const marketplaceItems = [
    { id: "mp-1", title: "Cotopaxi Allpa 35L Travel Pack", price: "$120" },
    { id: "mp-2", title: "UPPAbaby MINU Stroller", price: "$203" },
    { id: "mp-3", title: "Away Luggage Carry-on Suitcase", price: "$225" },
    { id: "mp-4", title: "Kids' Camelbak Backpack", price: "$150" },
  ];

  // Event data
  const eventData = {
    author: "Lady Gaga",
    time: "18h",
    location: "New York City",
    date: "April 13, 2026 at 7:00PM",
    title: "The Mayhem Ball",
    venue: "Madison Square Garden",
    interested: "13.1K",
    going: "8.7K",
    shares: "9.4K"
  };

  // Related topics
  const relatedTopics = [
    "Stranger Things Finale Party",
    "Finale Viewings in Seattle",
    "Stranger Things Season 5 reviews"
  ];

  // Get section titles based on current query or defaults
  const getSectionTitles = () => {
    if (queryContent?.sections) {
      return queryContent.sections.map(s => s.title);
    }
    return [
      "Tragic endings: Fans speculate that Steve, Jonathan and Eleven would die.",
      "Fake reality: Others think that characters are trapped in a fake reality.",
      "Hidden episode: Some fans believed in a secret ninth episode.",
    ];
  };

  const sectionTitles = getSectionTitles();

  // Render a section based on its type
  const renderSection = (sectionType, index) => {
    const isVisible = !currentQuery || sectionsVisible[index];
    const marginStyle = index > 0 ? { marginTop: 12 } : {};
    
    switch (sectionType) {
      case SECTION_TYPES.DISCUSSIONS:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
            style={marginStyle}
          >
            <ContentBucketSection 
              title={sectionTitles[0] || "Tragic endings: Fans speculate that Steve, Jonathan and Eleven would die."}
              posts={tragicEndingsPosts}
              isCollapsed={collapsedSections[SECTION_TYPES.DISCUSSIONS]}
              onToggle={() => toggleSection(SECTION_TYPES.DISCUSSIONS)}
            />
          </div>
        );
      
      case SECTION_TYPES.DISCUSSIONS_2:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
            style={marginStyle}
          >
            <ContentBucketSection 
              title={sectionTitles[1] || "Fake reality: Others think that characters are trapped in a fake reality."}
              posts={fakeRealityPosts}
              isCollapsed={collapsedSections[SECTION_TYPES.DISCUSSIONS_2]}
              onToggle={() => toggleSection(SECTION_TYPES.DISCUSSIONS_2)}
            />
          </div>
        );
      
      case SECTION_TYPES.REELS:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
            style={marginStyle}
          >
            <ReelsSection 
              title={sectionTitles[2] || "Hidden episode: Some fans believed in a secret ninth episode."}
              reels={reelsData}
              isCollapsed={collapsedSections[SECTION_TYPES.REELS]}
              onToggle={() => toggleSection(SECTION_TYPES.REELS)}
            />
          </div>
        );
      
      case SECTION_TYPES.RELATED:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
            style={marginStyle}
          >
            <RelatedTopicsSection 
              topics={relatedTopics}
              onTopicClick={(topic) => {
                handleSuggestionTap(topic);
                onTopicClick?.(topic);
              }}
            />
          </div>
        );
      
      case SECTION_TYPES.MARKETPLACE:
        return (
          <div 
            key={`section-${sectionType}-${index}`}
            className={`cfe-section-loading ${isVisible ? 'cfe-section-loading--visible' : ''}`}
            style={marginStyle}
          >
            <MarketplaceUnit variant="compact" />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="content-forward-experience-v2 has-floating-tab-bar">
      {/* Page Header - always visible, shows loading chip when searching */}
      <PageHeader 
        topic={displayTopic}
        talkingCount={data.socialProof?.count || "32.1K"}
        onFacebookClick={onFacebookClick}
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        headerRef={headerRef}
        onExperienceClick={openSheet}
      />

      {/* Content sections - rendered dynamically based on intent */}
      {sectionOrder.map((sectionType, index) => renderSection(sectionType, index))}

      {/* Floating Tab Bar with Search */}
      <FloatingTabBar 
        placeholder="Ask a question..."
        activeTab="marketplace"
        searchConducted={!!currentQuery}
        isLoading={isLoading}
        currentSearchQuery={currentQuery}
        onSearch={(query) => console.log("Search:", query)}
        onSuggestionTap={handleSuggestionTap}
        onTabChange={(tabId) => console.log("Tab changed:", tabId)}
      />

      {/* Experience Type Bottom Sheet */}
      <ExperienceTypeBottomSheet
        isOpen={showSheet}
        onClose={closeSheet}
        currentType="h-scroll"
        onSelectType={handleSelectType}
      />
    </div>
  );
};

export default ContentForwardExperience;
