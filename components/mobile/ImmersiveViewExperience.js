"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import LoggedOutSearchHeaderTabs from "./LoggedOutSearchHeaderTabs";
import CfeUnitHeader from "./CfeUnitHeader";
import FeedCarouselPostCard from "./FeedCarouselPostCard";
import Icon from "../Icon";
import { ExperienceTypeBottomSheet, useExperienceTypeSheet } from "./ExperienceTypeSheet";

// Section Link Button - "See more on {label}" as a white pill, centered
const SectionLinkButton = ({ label, onClick }) => (
  <div style={{ padding: '4px 12px 12px', display: 'flex', justifyContent: 'center' }}>
    <button 
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 16px',
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '100px',
        cursor: 'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: 'normal',
        color: '#080809',
      }}
    >
      <Icon name="gen-ai-magnifying-glass-filled" size={16} color="primary" />
      <span>See more on {label}</span>
    </button>
  </div>
);

// Facepile - overlapping avatars for social proof
const Facepile = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
  ];
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {avatars.map((avatar, idx) => (
        <img 
          key={idx}
          src={avatar}
          alt=""
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '2px solid white',
            marginLeft: idx > 0 ? '-8px' : '0',
            zIndex: 3 - idx,
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

// Social proof section - description above facepile + count
const SocialProofSection = ({ count = "48K", description, onClick }) => (
  <div
    style={{
      padding: '0 12px 12px',
    }}
  >
    {/* Description of subcategories */}
    <p
      style={{
        // Body 3
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: 'normal',
        color: '#080809',
        margin: '0 0 8px 0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {description}
    </p>
    {/* Facepile + count */}
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <Facepile />
      <span
        style={{
          // Meta 3
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 'normal',
          color: '#65686c',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {count} people are talking about this
      </span>
    </button>
  </div>
);

// Discussion Card - matches LoggedOutSearchExperience
const DiscussionCard = ({ 
  headline, 
  groupName, 
  commentCount, 
  author, 
  authorAvatar, 
  commentText 
}) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '0 12px 4px',
    }}
  >
    {/* Header - Headline and group info */}
    <div style={{ padding: '8px 12px 8px' }}>
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: 'normal',
          color: '#080809',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 'normal',
          color: '#65686c',
          margin: '4px 0 0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {groupName} · {commentCount} comments
      </p>
    </div>

    {/* Featured Comment */}
    <div style={{ padding: '0 12px 12px', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <img
          src={authorAvatar}
          alt=""
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            marginTop: '4px',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '2px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                letterSpacing: 'normal',
                color: '#080809',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              {author}
            </span>
          </div>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: 'normal',
              color: '#080809',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            {commentText}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Video Post Card with configurable aspect ratio (4:5 for aggregation, 9:16 for feed)
const VideoPostCard = ({ 
  video, 
  aspectRatio = "4/5",
  onLikeClick,
  onCommentClick,
  onShareClick,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
        setShowPlayButton(true);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!video) return null;

  return (
    <div style={{
      background: 'transparent',
      margin: '4px 12px 0 12px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.1)',
    }}>
      {/* Video Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          background: '#000',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          poster={video.posterImage}
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Play button overlay */}
        {showPlayButton && !isPlaying && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5.14v14l11-7-11-7z"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay at TOP */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Author info at TOP */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={video.author.avatar}
              alt={video.author.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  lineHeight: '20px',
                  letterSpacing: 'normal',
                  textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
                }}>{video.author.name}</span>
                {video.author.isVerified && (
                  <Icon name="badge-checkmark-filled" size={12} color="onMedia" />
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '12px',
                fontWeight: 400,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}>
                <span>{video.timestamp}</span>
                <span>·</span>
                <span>{video.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay for footer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          padding: '16px 12px',
          paddingTop: '80px',
          zIndex: 10,
        }}>
          <p style={{
            color: 'white',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: 'normal',
            margin: '0 0 16px 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{video.caption}</p>

          {/* UFI */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onLikeClick?.(); }} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', paddingRight: '12px' }}
            >
              <Icon name="like-outline" size={20} color="onMedia" />
              <span style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '13px', 
                fontWeight: 600, 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', 
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' 
              }}>{video.stats.likes}</span>
            </button>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onCommentClick?.(); }} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}
            >
              <Icon name="comment-outline" size={20} color="onMedia" />
              <span style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '13px', 
                fontWeight: 600, 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', 
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' 
              }}>{video.stats.comments}</span>
            </button>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onShareClick?.(); }} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}
            >
              <Icon name="share-outline" size={20} color="onMedia" />
              <span style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '13px', 
                fontWeight: 600, 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', 
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' 
              }}>{video.stats.shares}</span>
            </button>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '20px', height: '20px', position: 'relative', zIndex: 3 }} />
              <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 2 }} />
              <img src="/images/reactions/wow_default_40.png" alt="Wow" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default discussion card data
const DEFAULT_DISCUSSION = {
  headline: "Who do we think is going to die in the finale?",
  groupName: "Stranger Things Fan Club",
  commentCount: 106,
  author: "Aleksandra Bauer",
  authorAvatar: "https://i.pravatar.cc/100?img=20",
  commentText: "Will! I've always said Will would be the one to go since he's connected to Vecna and the upside down.",
};

// Minimal video data shape expected by VideoPostCard
const DEFAULT_IMMERSIVE_VIDEOS = [
  {
    id: "immersive-1",
    videoSrc: "/videos/stranger-things-interviews/Video-153.mp4",
    posterImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=640&h=360&fit=crop",
    author: {
      name: "Netflix",
      avatar: "https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png",
      isVerified: true,
    },
    caption: "Millie and Noah Interview | Stranger Things",
    timestamp: "2 days ago",
    location: "Los Angeles, CA",
    stats: {
      likes: "2.8K",
      comments: "342",
      shares: "156",
    },
  },
  {
    id: "immersive-2",
    videoSrc: "/videos/stranger-things-interviews/Video-153.mp4",
    posterImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=640&h=360&fit=crop",
    author: {
      name: "Entertainment Weekly",
      avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
      isVerified: true,
    },
    caption: "Behind the scenes of the Upside Down | Stranger Things Season 5",
    timestamp: "5 hours ago",
    location: "Atlanta, GA",
    stats: {
      likes: "1.2K",
      comments: "89",
      shares: "45",
    },
  },
];

// Sample carousel post data with Stranger Things images
const DEFAULT_CAROUSEL_POST = {
  id: "carousel-1",
  author: {
    name: "Stranger Things Fan Art",
    avatar: "https://i.pravatar.cc/100?img=45",
    isVerified: false,
  },
  timestamp: "1 day ago",
  location: "New York, NY",
  caption: "Amazing fan art collection inspired by Season 5 theories 🎨✨ Which one is your favorite?",
  items: [
    { src: "/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg" },
    { src: "/images/stranger-things-assets/images/profile/rio-theatre-post.jpg" },
    { src: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg" },
    { src: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg" },
    { src: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg" },
  ],
  stats: {
    likes: "1.5K",
    comments: "234",
    shares: "89",
  },
};

export default function ImmersiveViewExperience({ data, onFacebookClick, onExperienceChange }) {
  const [activeTab, setActiveTab] = useState("all");
  const [section1Collapsed, setSection1Collapsed] = useState(false);
  const [section2Collapsed, setSection2Collapsed] = useState(false);

  // Experience type sheet state
  const { showSheet, openSheet, closeSheet, handleSelectType } = useExperienceTypeSheet('immersive-view', onExperienceChange);

  // Always use "Stranger Things finale predictions" for immersive view
  const searchQuery = "Stranger Things finale predictions";

  const sectionTitles = useMemo(() => {
    // Mirror ContentForwardExperience defaults
    return [
      "Tragic endings: Fans speculate that Steve, Jonathan and Eleven would die.",
      "Fake reality: Others think that characters are trapped in a fake reality.",
    ];
  }, []);

  const immersiveVideos = useMemo(() => DEFAULT_IMMERSIVE_VIDEOS, []);

  const handleUfiInteraction = () => {
    // Keep as no-op for now (other experiences open login prompts)
  };

  return (
    <div className="logged-out-search-experience">
      <LoggedOutSearchHeaderTabs
        searchQuery={searchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTitleClick={onFacebookClick}
        hideTabs={true}
      >
        {/* Social proof section - description + facepile + count */}
        <SocialProofSection 
          count="48K" 
          description="Explore tragic endings, fake reality theories, and more fan discussions."
          onClick={openSheet} 
        />
      </LoggedOutSearchHeaderTabs>

      {/* Section 1 header - extra space above */}
      <section className="cfe-bucket" style={{ marginTop: 24 }}>
        <CfeUnitHeader 
          title={sectionTitles[0]} 
          isCollapsed={section1Collapsed}
          onToggle={() => setSection1Collapsed(!section1Collapsed)}
        />
      </section>

      {/* Reel + discussion card for section 1 - collapsible */}
      {!section1Collapsed && (
        <>
          {immersiveVideos.slice(0, 1).map((video) => (
            <VideoPostCard
              key={video.id}
              video={video}
              aspectRatio="4/5"
              onLikeClick={handleUfiInteraction}
              onCommentClick={handleUfiInteraction}
              onShareClick={handleUfiInteraction}
            />
          ))}
          <div style={{ marginTop: '8px' }}>
            <DiscussionCard {...DEFAULT_DISCUSSION} />
          </div>
          <SectionLinkButton label="Tragic endings" onClick={handleUfiInteraction} />
        </>
      )}

      {/* Section 2 header */}
      <section className="cfe-bucket" style={{ marginTop: 12 }}>
        <CfeUnitHeader 
          title={sectionTitles[1]} 
          isCollapsed={section2Collapsed}
          onToggle={() => setSection2Collapsed(!section2Collapsed)}
        />
      </section>

      {/* Carousel + discussion card for section 2 - collapsible */}
      {!section2Collapsed && (
        <>
          {/* Debug: Simple image carousel placeholder */}
          <div 
            style={{ 
              margin: '8px 12px', 
              borderRadius: '16px', 
              overflow: 'hidden',
              aspectRatio: '4/5',
              background: '#000',
              position: 'relative',
            }}
          >
            <img 
              src="/images/stranger-things-assets/images/profile/stranger-things-in-theatres.jpg"
              alt="Carousel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Pagination dots */}
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
            }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  style={{
                    width: i === 0 ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <DiscussionCard {...DEFAULT_DISCUSSION} />
          </div>
          <SectionLinkButton label="Fake reality" onClick={handleUfiInteraction} />
        </>
      )}

      {/* Bottom spacer for floating tab bar */}
      <div style={{ height: 120 }} />

      {/* Simple expanded search bar - no tab bar */}
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '8px 8px',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {/* Chevron button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '52px',
            height: '52px',
            flexShrink: 0,
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '80px',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.12)',
            cursor: 'pointer',
          }}
        >
          <Icon name="chevron-right-outline" size={24} color="primary" />
        </button>
        
        {/* Search bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '52px',
            padding: '4px 12px',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '80px',
            boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.12)',
          }}
        >
          <Icon name="gen-ai-magnifying-glass-filled" size={20} color="secondary" />
          <span
            style={{
              flex: 1,
              fontSize: '15px',
              fontWeight: 400,
              color: '#8a8d91',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            Ask a question...
          </span>
          <button
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#e4e6eb',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="arrow-up-filled" size={12} color="disabled" />
          </button>
        </div>
      </div>

      {/* Experience Type Bottom Sheet */}
      <ExperienceTypeBottomSheet
        isOpen={showSheet}
        onClose={closeSheet}
        currentType="immersive-view"
        onSelectType={handleSelectType}
      />
    </div>
  );
}
