"use client";

import { useState, useEffect } from "react";
import { 
  SearchIcon as SearchIconBase, 
  SearchCircleIcon,
  CommentIconSmall,
  LikeReactionIcon as LikeReactionIconBase,
  LoveReactionIcon as LoveReactionIconBase,
  WowReactionIcon as WowReactionIconBase,
  REACTION_COMPONENTS as REACTION_COMPONENTS_BASE,
  ChevronUpIcon
} from "../icons";
import FloatingTabBar from "./FloatingTabBar";
import { ExperienceTypeBottomSheet, useExperienceTypeSheet } from "./ExperienceTypeSheet";

// Wrapper components with local styling
const CommentIcon = ({ onMedia = false }) => (
  <CommentIconSmall size={16} onMedia={onMedia} />
);

const SearchIcon = () => <SearchIconBase size={20} color="#65686c" />;

// Facepile component for social proof action chip
const Facepile = ({ avatars = [] }) => {
  const defaultAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  ];
  const displayAvatars = avatars.length > 0 ? avatars : defaultAvatars;
  
  return (
    <div className="ai-forward__facepile">
      {displayAvatars.slice(0, 3).map((avatar, idx) => (
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

// Blueprint UFI Reaction Icons - wrapped from centralized library with CSS class
const LikeReactionIcon = () => (
  <span className="ai-forward__ufi-reaction-icon">
    <LikeReactionIconBase size={16} />
  </span>
);

const WowReactionIcon = () => (
  <span className="ai-forward__ufi-reaction-icon">
    <WowReactionIconBase size={16} />
  </span>
);

const LoveReactionIcon = () => (
  <span className="ai-forward__ufi-reaction-icon">
    <LoveReactionIconBase size={16} />
  </span>
);

const REACTION_COMPONENTS = {
  like: LikeReactionIcon,
  wow: WowReactionIcon,
  love: LoveReactionIcon,
};

// Inline Reactions Component - Blueprint UFI style with stacked reaction icons
const InlineReactions = ({ count, onMedia = false, reactions = ['like', 'wow', 'love'] }) => (
  <div className={`ai-forward__ufi-reactions ${onMedia ? 'ai-forward__ufi-reactions--on-media' : ''}`}>
    <div className="ai-forward__ufi-icons">
      {reactions.slice(0, 3).map((reaction, idx) => {
        const ReactionIcon = REACTION_COMPONENTS[reaction] || LikeReactionIcon;
        return (
          <div 
            key={reaction}
            className="ai-forward__ufi-reaction-wrapper"
            style={{ zIndex: 3 - idx }}
          >
            <ReactionIcon />
          </div>
        );
      })}
    </div>
    <span className={`ai-forward__ufi-count ${onMedia ? 'ai-forward__ufi-count--on-media' : ''}`}>{count}</span>
  </div>
);

// Responsive Post Card - Text only variant (186px width per Figma)
const ResponsivePostCardText = ({ source, onClick }) => (
  <button className="ai-forward__post-card ai-forward__post-card--text" onClick={() => onClick?.(source)}>
    <div className="ai-forward__post-content">
      {/* Header with avatar and name */}
      <div className="ai-forward__post-header">
        <img 
          src={source.author?.avatar} 
          alt="" 
          className="ai-forward__post-avatar"
        />
        <span className="ai-forward__post-author">{source.author?.name}</span>
      </div>

      {/* Quote text */}
      <p className="ai-forward__post-quote">{source.quote}</p>
        </div>
        
    {/* Footer UFI - reactions left, comments right */}
    <div className="ai-forward__post-ufi">
      <InlineReactions count={source.reactions} />
      <div className="ai-forward__ufi-comments">
        <CommentIcon />
        <span>{source.comments || Math.floor(source.reactions / 7)}</span>
      </div>
    </div>
  </button>
);

// Responsive Post Card - Media variant (186px width per Figma)
const ResponsivePostCardMedia = ({ source, onClick }) => (
  <button 
    className={`ai-forward__post-card ai-forward__post-card--media ${source.placeholder ? 'ai-forward__post-card--placeholder' : ''}`}
    onClick={() => onClick?.(source)}
    style={source.placeholder ? {} : { backgroundImage: `url(${source.image})` }}
  >
    {/* Header overlay with gradient */}
    <div className="ai-forward__post-media-header">
      <img 
        src={source.author?.avatar} 
        alt="" 
        className="ai-forward__post-avatar ai-forward__post-avatar--on-media"
      />
      <span className="ai-forward__post-author ai-forward__post-author--on-media">{source.author?.name}</span>
    </div>
    
    {/* Footer UFI overlay - on media variant */}
    <div className="ai-forward__post-media-footer">
      <InlineReactions count={source.reactions} onMedia />
      <div className="ai-forward__ufi-comments ai-forward__ufi-comments--on-media">
        <CommentIcon onMedia />
        <span>{source.comments || Math.floor(source.reactions / 5)}</span>
      </div>
    </div>
  </button>
  );

// AI Section Component with bulleted list format
const AISection = ({ section, onSourceClick }) => {
  return (
    <div className="ai-forward__section">
      {/* Section Title - Body 2 Link (17px semibold) with info icon */}
      <div className="ai-forward__section-header">
        <h3 className="ai-forward__section-title">{section.title}</h3>
        <ChevronUpIcon size={12} color="#65686c" className="ai-forward__section-icon" /></div>
      
      {/* Bulleted list of key points */}
      <ul className="ai-forward__section-bullets">
        {section.bullets.map((bullet, idx) => (
          <li key={idx} className="ai-forward__section-bullet">
            <span className="ai-forward__bullet-label">{bullet.label}</span>
            <span className="ai-forward__bullet-text">{bullet.text}</span>
            {bullet.blueQuote && (
              <span className="ai-forward__blue-quote">{bullet.blueQuote}</span>
            )}
          </li>
        ))}
      </ul>

      {/* Horizontal scroll of source posts */}
      {section.sources && section.sources.length > 0 && (
        <div className="ai-forward__posts-scroll">
          {section.sources.map((source, idx) => (
            source.image || source.placeholder ? (
              <ResponsivePostCardMedia 
                key={source.id} 
                source={source} 
                onClick={onSourceClick}
              />
            ) : (
              <ResponsivePostCardText 
                key={source.id} 
                source={source} 
                onClick={onSourceClick}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

// Related Group Item - FDS List Cell style
const RelatedGroupItem = ({ group, onJoin }) => (
  <div className="ai-forward__group-item">
    <div className="ai-forward__group-avatar ai-forward__group-avatar--placeholder" />
    <div className="ai-forward__group-info">
      <div className="ai-forward__group-headline">
        <span className="ai-forward__group-name">{group.name}</span>
        <span className="ai-forward__group-dot">·</span>
        <button 
          className="ai-forward__group-join-link"
          onClick={() => onJoin?.(group)}
        >
          Join
        </button>
      </div>
      <span className="ai-forward__group-meta">
        Public · {group.members} members · {group.postsPerDay}
      </span>
    </div>
  </div>
);

// Related Topic Item - with search/magnifying glass icon
const RelatedTopicItem = ({ topic, onClick }) => (
  <button className="ai-forward__topic-item" onClick={() => onClick?.(topic)}>
    <SearchIcon />
    <span className="ai-forward__topic-text">{topic}</span>
  </button>
);

const AIForwardExperience = ({ 
  data,
  onBack,
  onSourceClick,
  onGroupJoin,
  onQueryClick,
  onFacebookClick,
  onExperienceChange,
}) => {
  // State for rotating placeholders
  const [isInitialState, setIsInitialState] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animationState, setAnimationState] = useState('idle'); // 'idle' | 'exiting' | 'entering'
  
  // Experience type sheet state
  const { showSheet, openSheet, closeSheet, handleSelectType } = useExperienceTypeSheet('ai-forward', onExperienceChange);
  
  const relatedQuestions = data?.relatedTopics || [
    "Stranger Things watch party ideas",
    "Stranger Things finale viewing events near me",
    "Best Stranger Things theories Reddit"
  ];

  useEffect(() => {
    // Initial 5-second delay before starting rotation
    const initialTimer = setTimeout(() => {
      // Start exit animation
      setAnimationState('exiting');
      
      setTimeout(() => {
        // Switch content and start enter animation
        setIsInitialState(false);
        setAnimationState('entering');
        
        setTimeout(() => {
          setAnimationState('idle');
        }, 300);
      }, 300);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (isInitialState) return;

    // Rotate through related questions every 5 seconds
    const interval = setInterval(() => {
      // Start exit animation
      setAnimationState('exiting');
      
      setTimeout(() => {
        // Switch content and start enter animation
        setPlaceholderIndex((prev) => (prev + 1) % relatedQuestions.length);
        setAnimationState('entering');
        
        setTimeout(() => {
          setAnimationState('idle');
        }, 300);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInitialState, relatedQuestions.length]);

  const currentPlaceholder = isInitialState 
    ? "Ask a follow up question..." 
    : relatedQuestions[placeholderIndex];

  if (!data) return null;

  return (
    <div className="ai-forward-experience has-floating-tab-bar">
      {/* Main Content */}
      <main className="ai-forward__main">
        {/* Topic Title - Clickable to open experience picker */}
        <button className="ai-forward__topic-btn" onClick={onFacebookClick}>
          <h1 className="ai-forward__topic">{data.topic}</h1>
        </button>

        {/* Social Proof Action Chip - tapping opens experience picker */}
        <button className="ai-forward__action-chip" onClick={openSheet}>
          <Facepile />
          <span>{data.socialProof.count.toLocaleString()} {data.socialProof.label}</span>
        </button>

        {/* Main AI Summary Intro - Body 3 style */}
        <p className="ai-forward__intro">
          {data.aiIntroSummary}
        </p>

        {/* AI Sections with bullets and post cards */}
        <div className="ai-forward__sections">
          {data.aiSectionsV2.map((section) => (
            <AISection 
              key={section.id}
              section={section}
              onSourceClick={onSourceClick}
            />
          ))}
            </div>

        {/* Related Groups Section */}
        {data.relatedGroups && data.relatedGroups.length > 0 && (
          <section className="ai-forward__groups-section">
            <h3 className="ai-forward__unit-header">Related groups</h3>
            <div className="ai-forward__groups-list">
              {data.relatedGroups.slice(0, 3).map((group) => (
                <RelatedGroupItem 
                  key={group.id}
                  group={group}
                  onJoin={onGroupJoin}
                />
        ))}
      </div>
    </section>
        )}

        {/* Related Topics Section */}
        {data.relatedTopics && data.relatedTopics.length > 0 && (
          <section className="ai-forward__topics-section">
            <h3 className="ai-forward__unit-header">Related topics</h3>
            <div className="ai-forward__topics-list">
              {data.relatedTopics.map((topic, idx) => (
                <RelatedTopicItem 
                  key={idx}
                  topic={topic}
                  onClick={onQueryClick}
                />
        ))}
      </div>
    </section>
        )}
      </main>

      {/* Floating Tab Bar with Search - expanded by default */}
      <FloatingTabBar 
        placeholder="Ask a question..."
        activeTab="groups"
        initialSearchExpanded={true}
        onSuggestionTap={(query) => {
          console.log("AI Forward - Suggestion tapped:", query);
          onQueryClick?.(query);
        }}
      />

      {/* Experience Type Bottom Sheet */}
      <ExperienceTypeBottomSheet
        isOpen={showSheet}
        onClose={closeSheet}
        currentType="ai-forward"
        onSelectType={handleSelectType}
      />
    </div>
  );
};

export default AIForwardExperience;
