"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import ShareSheet from "../../../../components/mobile/ShareSheet";
import ReelsCommentsPanel from "../../../../components/mobile/ReelsCommentsPanel";
import { 
  LikeIcon as LikeIconBase, 
  CommentIcon as CommentIconBase, 
  ShareIcon as ShareIconBase,
  DotsIcon,
  PlayIcon as PlayIconBase
} from "../../../../components/icons";
import Icon from "../../../../components/Icon";
import { useUseCase } from "../../../../contexts/UseCaseContext";
import "../../../../public/styles/mobile/aggregation.scss";

// Feature flags for discovery units - set to true to re-enable
const ENABLE_GROUPS_DISCOVERY_UNIT = false;
const ENABLE_MARKETPLACE_DISCOVERY_UNIT = false;

// Preload video utility - uses link preload only (no hidden video elements)
// Mobile browsers have strict limits on concurrent media elements (~4-8).
// Creating hidden <video> elements exhausts this budget and causes visible
// videos to go blank, so we only use <link rel="preload"> hints here.
const preloadedVideos = new Set();
const preloadVideo = (src) => {
  if (!src || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = src;
  document.head.appendChild(link);
};

const groupsYouMightLikeData = [
  {
    id: 'group-1',
    name: 'Stranger Things Fans',
    subtitle: '1.2M members',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=320&fit=crop',
  },
  {
    id: 'group-2',
    name: 'Horror & Sci-Fi Club',
    subtitle: '487K members',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=320&fit=crop',
  },
  {
    id: 'group-3',
    name: '80s Nostalgia',
    subtitle: '238K members',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=320&fit=crop',
  },
  {
    id: 'group-4',
    name: 'Netflix Binge Watch',
    subtitle: '3.5M members',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=320&fit=crop',
  },
];

// Video feed data - Stranger Things interviews and content
const videoFeed = [
  {
    id: 'stranger-things-1',
    type: 'video',
    title: 'Millie and Noah Interview | Stranger Things',
    videoSrc: '/videos/stranger-things-interviews/Video-153.mp4',
    author: {
      name: 'Netflix',
      avatar: 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
      verified: true,
    },
    likes: '2.8M',
    comments: '156K',
    shares: '892K',
    description: 'Millie and Noah talk about their favorite moments filming Season 5. #StrangerThings #Interview',
    postedTime: '2 days ago',
    accentColor: '#1c1c1e', // Charcoal black
  },
  {
    id: 'video-2',
    type: 'video',
    title: 'Stranger Things Cast Reunion - Behind the Scenes',
    videoSrc: '/videos/stranger-things-interviews/Video-270.mp4',
    author: {
      name: 'Netflix',
      avatar: 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
      verified: true,
    },
    likes: '2.1M',
    comments: '78.4K',
    shares: '156K',
    description: '👀 Season 1 Easter eggs you definitely missed! The Duffers hid SO many clues. #StrangerThings #EasterEggs #HiddenDetails',
    postedTime: '2 weeks ago',
    accentColor: '#2c2c2e', // Dark charcoal
  },
  {
    id: 'groups-interstitial',
    type: 'interstitial',
    interstitialType: 'groups_you_might_like',
  },
  {
    id: 'video-1',
    type: 'video',
    title: 'Millie Bobby Brown on Eleven\'s Final Journey | Season 5 Interview',
    videoSrc: '/videos/stranger-things-interviews/Video-193.mp4',
    author: {
      name: 'Netflix',
      avatar: 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
      verified: true,
    },
    likes: '1.2M',
    comments: '45.3K',
    shares: '89.2K',
    description: '🎬 Millie opens up about filming the emotional final season. "This character changed my life." #StrangerThings #Eleven #Interview',
    postedTime: '3 days ago',
    accentColor: '#242426', // Charcoal grey
  },
  {
    id: 'video-3',
    type: 'video',
    title: 'Finn Wolfhard Talks Mike Wheeler\'s Arc | Stranger Things 5',
    videoSrc: '/videos/stranger-things-interviews/Video-706.mp4',
    author: {
      name: 'Netflix',
      avatar: 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
      verified: true,
    },
    likes: '985K',
    comments: '32.1K',
    shares: '67.8K',
    description: '🎭 Finn reflects on playing Mike for almost a decade. "The show gave me everything." #StrangerThings #FinnWolfhard #MikeWheeler',
    postedTime: '1 week ago',
    accentColor: '#1a1a1c', // Near black
  },
];

// Marketplace discovery unit data (Stranger Things themed)
const marketplaceCards = [
  {
    id: 'mp-1',
    title: "Steve Harrington Autographed Card",
    price: "$30.00",
    source: "Marketplace",
    image: "/images/stranger-things-assets/images/marketplace/steve-harrington-autographed-card.jpg",
  },
  {
    id: 'mp-2',
    title: "Creel House LEGO Set",
    price: "$100.00",
    source: "Netflix Shop • Sponsored",
    image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
  },
  {
    id: 'mp-3',
    title: "Eleven Funko Pop",
    price: "$15.00",
    source: "Marketplace",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
  },
];

// Discovery unit data - Group discussions (Season 1 Easter eggs)
const discoveryCards = [
  {
    id: 'disc-1',
    text: "Did anyone catch the Jaws poster in Mike's basement? The Duffers said it was a hint about the Demogorgon being a 'shark' hunting in Hawkins!",
    userName: "Mike",
    groupName: "Stranger Things Fans",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
    likes: 342,
  },
  {
    id: 'disc-2',
    text: "The Christmas lights Joyce uses are the exact same brand from a 1983 Sears catalog. The attention to detail in Season 1 is insane 🎄",
    userName: "Sarah",
    groupName: "Hawkins Lab Theories",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    likes: 218,
  },
  {
    id: 'disc-3',
    text: "Eleven's number 011 appears EVERYWHERE in S1 if you look closely - clocks, license plates, even the barcodes. Once you see it you can't unsee it!",
    userName: "Dustin",
    groupName: "Behind the Scenes ST",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    likes: 156,
  },
];

// Facebook wordmark
const FACEBOOK_WORDMARK_URL = "/images/facebook-wordmark.png";

// Wrapper components with drop shadow effect for video overlay
const dropShadowStyle = { filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.6))' };

const LikeIcon = ({ size = 28, color = "white" }) => (
  <span style={dropShadowStyle}>
    <LikeIconBase size={size} color={color} />
  </span>
);

const CommentIcon = ({ size = 28, color = "white" }) => (
  <span style={dropShadowStyle}>
    <CommentIconBase size={size} color={color} />
  </span>
);

const ShareIcon = ({ size = 28, color = "white" }) => (
  <span style={dropShadowStyle}>
    <ShareIconBase size={size} color={color} />
  </span>
);

const MoreIcon = ({ size = 28, color = "white" }) => (
  <span style={dropShadowStyle}>
    <DotsIcon size={size} color={color} />
  </span>
);

const PlayIcon = ({ size = 40, color = "white" }) => (
  <PlayIconBase size={size} color={color} />
);

// Like Icon 16px (matching aggregation page)
const LikeIcon16 = ({ color = "#fff" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 14.25C8 14.25 1.75 10.5 1.75 5.75C1.75 4.69421 2.16964 3.68151 2.92582 2.92582C3.68151 2.16964 4.69421 1.75 5.75 1.75C6.89 1.75 7.91 2.27 8.5 3.08C9.09 2.27 10.11 1.75 11.25 1.75C12.3058 1.75 13.3185 2.16964 14.0742 2.92582C14.8304 3.68151 15.25 4.69421 15.25 5.75C15.25 10.5 9 14.25 9 14.25H8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Discovery Card Component (matching cfe-post-card width of 261px)
function DiscoveryCard({ card }) {
  return (
    <div style={{
      width: '261px',
      flexShrink: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      scrollSnapAlign: 'start',
    }}>
      {/* Discussion text */}
      <p style={{
        color: '#fff',
        fontSize: '13px',
        lineHeight: '1.4',
        margin: 0,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {card.text}
      </p>
      
      {/* User info row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <img 
          src={card.userAvatar}
          alt={card.userName}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <span style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '12px',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {card.userName} in {card.groupName}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '12px',
        }}>
          <LikeIcon16 color="rgba(255,255,255,0.8)" />
          <span>{card.likes}</span>
        </div>
      </div>
    </div>
  );
}

// Discovery Unit Component - Horizontal scrollable container
function DiscoveryUnit({ cards, isVisible, onDismiss, tabBarOffset = 0 }) {
  if (!isVisible) return null;
  
  // Prevent touch events from bubbling up to the parent video swipe handlers
  const handleTouchEvent = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${20 + tabBarOffset}px)`,
        left: 0,
        right: 0,
        zIndex: 55,
        animation: 'slideUpDiscovery 0.4s ease-out forwards',
      }}
      onTouchStart={handleTouchEvent}
      onTouchMove={handleTouchEvent}
      onTouchEnd={handleTouchEvent}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header - Headline 4 Emphasized with dismiss button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginTop: '12px',
        marginBottom: '8px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <h4 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            lineHeight: '20px',
            letterSpacing: '-0.23px',
            color: '#fff',
            margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            Join the conversation in Groups
          </h4>
          <Icon name="chevron-right-filled" size={16} color="onMedia" />
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="nav-cross-filled" size={16} color="onMedia" />
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingBottom: '4px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollPaddingLeft: '12px',
      }}>
        {cards.map((card) => (
          <DiscoveryCard key={card.id} card={card} />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideUpDiscovery {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Marketplace Card Component (same width as discussion cards - 261px)
function MarketplaceCard({ card }) {
  return (
    <div style={{
      width: '261px',
      flexShrink: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      gap: '12px',
      scrollSnapAlign: 'start',
    }}>
      {/* Product image - 48x48 */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
        background: '#333',
      }}>
        <img 
          src={card.image}
          alt={card.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      
      {/* Product info */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2px',
        minWidth: 0,
      }}>
        {/* Title - body 4 link */}
        <span style={{
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: '16px',
          letterSpacing: '-0.08px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {card.title}
        </span>
        {/* Price - body 4 */}
        <span style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: '-0.08px',
        }}>
          {card.price}
        </span>
        {/* Source - meta 4 */}
        <span style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: '0px',
        }}>
          {card.source}
        </span>
      </div>
    </div>
  );
}

// Marketplace Discovery Unit Component
function MarketplaceDiscoveryUnit({ cards, isVisible, onDismiss, tabBarOffset = 0 }) {
  if (!isVisible) return null;
  
  // Prevent touch events from bubbling up to the parent video swipe handlers
  const handleTouchEvent = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${20 + tabBarOffset}px)`,
        left: 0,
        right: 0,
        zIndex: 55,
        animation: 'slideUpMarketplace 0.4s ease-out forwards',
      }}
      onTouchStart={handleTouchEvent}
      onTouchMove={handleTouchEvent}
      onTouchEnd={handleTouchEvent}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginTop: '12px',
        marginBottom: '8px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <h4 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            lineHeight: '20px',
            letterSpacing: '-0.23px',
            color: '#fff',
            margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            Shop for merchandise
          </h4>
          <Icon name="chevron-right-filled" size={16} color="onMedia" />
        </div>
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="nav-cross-filled" size={16} color="onMedia" />
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingBottom: '4px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollPaddingLeft: '12px',
      }}>
        {cards.map((card) => (
          <MarketplaceCard key={card.id} card={card} />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideUpMarketplace {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function GroupCard({ group, onDismiss, onAction }) {
  return (
    <div style={{
      position: 'relative',
      background: '#242526',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #3A3B3C',
    }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss?.(group.id);
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          background: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      
      <div style={{
        width: '100%',
        aspectRatio: '5 / 4',
        position: 'relative',
        background: '#3A3B3C',
      }}>
        <img
          src={group.image}
          alt={group.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      
      <div style={{
        padding: '8px 12px 12px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <span style={{
          color: '#E4E6EB',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '20px',
          letterSpacing: 'normal',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block',
        }}>
          {group.name}
        </span>
        
        <span style={{
          color: '#B0B3B8',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: 'normal',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          marginTop: '2px',
        }}>
          {group.subtitle}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction?.(group);
          }}
          style={{
            marginTop: '10px',
            width: '100%',
            height: '36px',
            background: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            color: '#000000',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: 'normal',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}

function GroupsYouMightLikeInterstitial({ groups, onGroupDismiss, onGroupAction, onLoginPrompt, prevColor, nextColor }) {
  const [visibleGroups, setVisibleGroups] = useState(groups);
  
  const topColor = prevColor || '#2c2c2e';
  const bottomColor = nextColor || '#242426';
  
  const handleDismissGroup = (groupId) => {
    setVisibleGroups(prev => prev.filter(g => g.id !== groupId));
    onGroupDismiss?.(groupId);
  };
  
  const handleGroupAction = (group) => {
    onLoginPrompt?.({ type: 'join_group', entityName: group.name });
  };
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(180deg, ${topColor} 0%, #1a1a1c 50%, ${bottomColor} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 'calc(env(safe-area-inset-top, 0px) + 44px)',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingBottom: '12px',
    }}>
      <h2 style={{
        color: '#E4E6EB',
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: '28px',
        letterSpacing: 'normal',
        textAlign: 'center',
        margin: '0 0 12px 0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
        Groups you may like
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
      }}>
        {visibleGroups.slice(0, 4).map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onDismiss={handleDismissGroup}
            onAction={handleGroupAction}
          />
        ))}
      </div>
      
    </div>
  );
}

// Channel avatar mapping for consistent branding
const channelAvatars = {
  'Netflix': 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png',
  'Entertainment Weekly': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop',
  'Variety': 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=80&h=80&fit=crop',
  'The Tonight Show': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=80&h=80&fit=crop',
  'Jimmy Kimmel Live': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=80&h=80&fit=crop',
};

// Video sources mapping for variety - using Stranger Things interview videos
const videoSources = {
  'stranger-things-1': '/videos/stranger-things-interviews/Video-153.mp4',
  'video-1': '/videos/stranger-things-interviews/Video-193.mp4',
  'video-2': '/videos/stranger-things-interviews/Video-270.mp4',
};

// Helper to convert Google video result to video format
function getGoogleVideoData(result) {
  if (!result) return null;
  
  const channelName = result.channelName || 'Netflix';
  const avatar = channelAvatars[channelName] || 'https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png';
  const videoSrc = videoSources[result.id] || '/images/stranger-things-assets/videos/reels/Video-850.mp4';
  
  return {
    id: result.id,
    type: 'video',
    title: result.title,
    videoSrc: videoSrc,
    author: {
      name: channelName,
      avatar: avatar,
      verified: true,
    },
    likes: '856K',
    comments: '32.1K',
    shares: '67.8K',
    description: 'Millie and Noah talk about their favorite moments filming Season 5. #StrangerThings #Interview',
    postedTime: result.postedTime || 'Recently',
  };
}

// Helper to convert groups reel data to video format for the viewer
function convertGroupsReelToVideo(reel) {
  if (!reel) return null;
  
  // Format likes/comments as strings with K suffix if needed
  const formatCount = (count) => {
    if (typeof count === 'string') return count;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return String(count);
  };
  
  return {
    id: reel.id,
    type: 'video',
    title: reel.title || `${reel.author}'s Reel`,
    videoSrc: reel.videoSrc,
    author: {
      name: reel.author,
      avatar: reel.avatar,
      verified: false,
    },
    likes: formatCount(reel.likes),
    comments: formatCount(reel.comments),
    shares: formatCount(reel.shares || Math.floor(reel.likes * 0.3)),
    description: reel.description || `#StrangerThings #FanContent`,
    postedTime: reel.postedTime || 'Recently',
    accentColor: '#1c1c1e',
  };
}

// Sender info for "Sent by" pill (matches iMessage thread)
const senderInfo = {
  name: "Sarah Manna",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
};

// Comments data for the split-screen comments panel (Stranger Things themed)
const reelsCommentsData = [
  {
    id: "comment-1",
    author: {
      id: "user-1",
      name: "Colin Hoell",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Millie talking about Eleven's powers evolving in Season 5 gave me chills. The way she describes the emotional weight of those scenes 😭",
    time: "2d",
    reactions: { like: 67 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-2",
    author: {
      id: "user-2",
      name: "Larry Howard",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Noah's reaction when they mentioned the Upside Down finale... he definitely knows something we don't! 👀",
    time: "2d",
    reactions: { like: 67 },
    replies: [
      {
        id: "reply-1",
        author: {
          id: "user-3",
          name: "Macarena Morel",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
        },
        text: "Right?! He looked like he was about to spoil something big",
        time: "1h",
        reactions: { love: 146 },
      }
    ],
    replyCount: 1,
  },
  {
    id: "comment-3",
    author: {
      id: "user-4",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    },
    text: "The part where they talked about filming their last scene together in Hawkins... I'm not ready for this show to end 💔",
    time: "3d",
    reactions: { like: 234 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-4",
    author: {
      id: "user-5",
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Did anyone else catch when Millie said 'the mindflayer isn't what we think it is'?? WHAT DOES THAT MEAN",
    time: "4d",
    reactions: { like: 89 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-5",
    author: {
      id: "user-6",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    },
    text: "These two have grown up so much since Season 1. Watching them reflect on the journey is making me so emotional 🥺",
    time: "5d",
    reactions: { like: 156 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-6",
    author: {
      id: "user-7",
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "The chemistry between the whole cast is unmatched. You can tell they're genuinely best friends IRL",
    time: "1w",
    reactions: { like: 78 },
    replies: [],
    replyCount: 0,
  },
];

// Single Video Card Component
function VideoCard({ video, isActive, isPlaying, showPlayButton, showDiscoveryUnit, showMarketplaceUnit, showSentBy, showTabBar, isShrunk, shouldPreload, onPlayPause, onLike, onComment, onShare, onMore, onFollow, onSenderClick, onCloseComments, videoRef }) {
  // Calculate bottom offset based on discovery unit visibility (cards + header + spacing)
  // Marketplace unit is shorter (48px images vs taller discussion cards), so use smaller offset
  const discoveryOffset = showDiscoveryUnit ? 147 : showMarketplaceUnit ? 123 : 0;
  // Additional offset when tab bar is visible (68px for tab bar)
  const tabBarOffset = showTabBar ? 60 : 0;
  // Additional offset for first video (showSentBy) to position content above scrubber and comment composer
  const commentComposerOffset = showSentBy ? 48 : 0;
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000',
    }}>
      {/* Video element - shrinks when comments panel is open */}
      {/* When shrunk: 173x230px (80% of 216x288) positioned below header at y:44, centered horizontally */}
      <div 
        onClick={isShrunk ? onCloseComments : onPlayPause}
        style={{
          position: 'absolute',
          top: isShrunk ? 'calc(env(safe-area-inset-top, 0px) + 44px)' : 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isShrunk ? '173px' : '100vw',
          height: isShrunk ? '230px' : '100%',
          transition: 'top 350ms cubic-bezier(0.32, 0.72, 0, 1), width 350ms cubic-bezier(0.32, 0.72, 0, 1), height 350ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 350ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 350ms cubic-bezier(0.32, 0.72, 0, 1)',
          borderRadius: isShrunk ? '12px' : '0',
          overflow: 'hidden',
          zIndex: isShrunk ? 10 : 1,
          cursor: isShrunk ? 'pointer' : 'default',
          boxShadow: isShrunk ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          preload={shouldPreload ? "auto" : "metadata"}
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            background: '#000',
          }}
        />
        
        {/* Play/Pause indicator - only show when user manually tapped to pause */}
        {showPlayButton && isActive && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <PlayIcon size={40} color="white" />
          </div>
        )}
      </div>

      {/* Bottom Gradient Overlay - hidden when shrunk */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
        opacity: isShrunk ? 0 : 1,
        transition: 'opacity 350ms cubic-bezier(0.32, 0.72, 0, 1)',
      }} />

      {/* Vertical Action Buttons - hidden when shrunk */}
      <div 
        style={{
          position: 'absolute',
          right: '8px',
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${36 + discoveryOffset + tabBarOffset + commentComposerOffset}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 50,
          transition: 'bottom 0.4s ease-out, opacity 200ms ease-out',
          opacity: isShrunk ? 0 : 1,
          pointerEvents: isShrunk ? 'none' : 'auto',
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <button onClick={onLike} style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px',
        }}>
          <LikeIcon size={28} color="white" />
          <span style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            textShadow: '0 0 1px rgba(0,0,0,0.6)',
          }}>{video.likes}</span>
        </button>

        <button onClick={onComment} style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px',
        }}>
          <CommentIcon size={28} color="white" />
          <span style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            textShadow: '0 0 1px rgba(0,0,0,0.6)',
          }}>{video.comments}</span>
        </button>

        <button onClick={onShare} style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px',
        }}>
          <ShareIcon size={28} color="white" />
          <span style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            textShadow: '0 0 1px rgba(0,0,0,0.6)',
          }}>{video.shares}</span>
        </button>
      </div>

      {/* Bottom Metadata - hidden when shrunk */}
      <div 
        style={{
          position: 'absolute',
          bottom: `calc(env(safe-area-inset-bottom, 0px) + ${24 + discoveryOffset + tabBarOffset + commentComposerOffset}px)`,
          left: '12px',
          right: '60px',
          zIndex: 50,
          transition: 'bottom 0.4s ease-out, opacity 200ms ease-out',
          opacity: isShrunk ? 0 : 1,
          pointerEvents: isShrunk ? 'none' : 'auto',
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}>
          <img 
            src={video.author.avatar}
            alt={video.author.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '0.5px solid #fff',
              background: '#fff',
            }}
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              textShadow: '0 0 2px rgba(0,0,0,0.6)',
            }}>{video.author.name}</span>
            {video.author.verified && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </div>
          <button
            onClick={onFollow}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '6px',
              padding: '0 12px',
              height: '28px',
              fontSize: '13px',
              fontWeight: '600',
              lineHeight: '16px',
              letterSpacing: '-0.08px',
              cursor: 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            Follow
          </button>
        </div>

        <p style={{
          color: '#fff',
          fontSize: '14px',
          lineHeight: '1.4',
          margin: 0,
          textShadow: '0 0 2px rgba(0,0,0,0.6)',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {video.description} <span style={{ color: 'rgba(255,255,255,0.7)' }}>more</span>
        </p>
        
        {/* Sent by pill - only shown on first video */}
        {showSentBy && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
          }}>
            <img 
              src={senderInfo.avatar}
              alt={senderInfo.name}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '13px',
              textShadow: '0 0 2px rgba(0,0,0,0.6)',
            }}>
              Sent by <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSenderClick?.();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600,
                  fontSize: '13px',
                  lineHeight: '16px',
                  letterSpacing: '-0.08px',
                  textShadow: '0 0 2px rgba(0,0,0,0.6)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >{senderInfo.name}</button>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}> · </span>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>2 new posts</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoPlayerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openBottomSheet } = useUseCase();
  
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0, entityName: '' });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [currentVideoLikes, setCurrentVideoLikes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false); // Only show when user manually taps to pause
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState(() => {
    // Create a deduplicated copy of videoFeed on init
    const seenSrcs = new Set();
    return videoFeed.filter(v => {
      if (seenSrcs.has(v.videoSrc)) return false;
      seenSrcs.add(v.videoSrc);
      return true;
    });
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [cameFromMessages, setCameFromMessages] = useState(false);
  const [cameFromGroups, setCameFromGroups] = useState(false);
  const [containerHeight, setContainerHeight] = useState(800);
  const [pageOpacity, setPageOpacity] = useState(0); // Start invisible for fade-in
  const [showPeek, setShowPeek] = useState(false); // Show peek of next video
  const [peekDismissed, setPeekDismissed] = useState(false); // Track if user has dismissed peek
  const [showDiscoveryUnit, setShowDiscoveryUnit] = useState(false); // Show discovery unit cards
  const [showMarketplaceUnit, setShowMarketplaceUnit] = useState(false); // Show marketplace unit cards
  const [showCommentsPanel, setShowCommentsPanel] = useState(false); // Show split-screen comments panel
  
  const containerRef = useRef(null);
  const videoRefs = useRef({});
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const lastWheelTime = useRef(0);
  const isAnimatingRef = useRef(false); // Use ref to prevent race conditions
  const peekTimerRef = useRef(null); // Timer for showing peek
  const discoveryTimerRef = useRef(null); // Timer for showing discovery unit
  const marketplaceTimerRef = useRef(null); // Timer for showing marketplace unit
  
  // Set container height on client side to avoid hydration mismatch
  useEffect(() => {
    setContainerHeight(window.innerHeight);
    
    const handleResize = () => setContainerHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prefetch Sarah Manna's profile for instant navigation
  useEffect(() => {
    router.prefetch('/m/profile/sarah-manna');
  }, [router]);

  // Preload videos for faster playback
  useEffect(() => {
    if (typeof window === 'undefined' || videos.length === 0) return;
    
    // Immediately preload first video (highest priority)
    if (videos[0]?.videoSrc) {
      preloadVideo(videos[0].videoSrc);
    }
    
    // Preload second video after a short delay
    const timer = setTimeout(() => {
      if (videos[1]?.videoSrc) {
        preloadVideo(videos[1].videoSrc);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [videos]);

  // Preload next video when current index changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Preload the next video (currentIndex + 1)
    const nextVideo = videos[currentIndex + 1];
    if (nextVideo?.videoSrc) {
      preloadVideo(nextVideo.videoSrc);
    }
    
    // Also preload the one after that with lower priority
    const videoAfterNext = videos[currentIndex + 2];
    if (videoAfterNext?.videoSrc) {
      setTimeout(() => preloadVideo(videoAfterNext.videoSrc), 1000);
    }
  }, [currentIndex, videos]);

  // Check if user came from messages share and trigger fade-in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fromMessages = sessionStorage.getItem('cameFromMessages');
      if (fromMessages === 'true') {
        setCameFromMessages(true);
      }
      
      // Check if coming from tab bar - if so, don't fade in yet (handled below)
      const sourceParam = searchParams?.get('source');
      if (sourceParam !== 'tabbar') {
        // Fade in the page after a brief delay
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPageOpacity(1);
          });
        });
      }
      
      // For groups source, no "sent by" UI and ensure tab bar is visible
      if (sourceParam === 'groups') {
        setCameFromMessages(false);
        setCameFromGroups(true);
        setPeekDismissed(true); // No scroll hint needed
      }
    }
  }, [searchParams]);

  // Check if coming from tab bar navigation - start on clean video without discovery units
  useEffect(() => {
    const sourceParam = searchParams?.get('source');
    if (sourceParam === 'tabbar') {
      // Disable transition to prevent slide animation when setting initial index
      setDisableTransition(true);
      setCurrentIndex(0);
      setPeekDismissed(true); // No scroll hint
      setCameFromMessages(false); // No "Reply to Sarah" UI
      
      // After index is set, fade in the page (no slide, just fade)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
          setPageOpacity(1);
        });
      });
    }
  }, [searchParams]);

  // Load video data - check if coming from Google search or Groups permalink
  useEffect(() => {
    const sourceParam = searchParams?.get('source');
    
    // Handle groups permalink source
    if (sourceParam === 'groups' && typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('groupsReelsData');
      if (storedData) {
        try {
          const { reels, startIndex } = JSON.parse(storedData);
          if (reels && reels.length > 0) {
            // Convert all reels to video format
            const convertedVideos = reels.map(convertGroupsReelToVideo).filter(Boolean);
            
            if (convertedVideos.length > 0) {
              // Dedupe by videoSrc
              const seenSrcs = new Set();
              const uniqueVideos = convertedVideos.filter(v => {
                if (seenSrcs.has(v.videoSrc)) return false;
                seenSrcs.add(v.videoSrc);
                return true;
              });
              
              setVideos(uniqueVideos);
              // Set starting index if valid
              if (startIndex >= 0 && startIndex < uniqueVideos.length) {
                setDisableTransition(true);
                setCurrentIndex(startIndex);
                // Re-enable transition after render
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setDisableTransition(false);
                  });
                });
              }
              // Clear the stored data
              sessionStorage.removeItem('groupsReelsData');
              return;
            }
          }
        } catch (e) {
          console.error('Failed to parse groups reels data:', e);
        }
      }
    }
    
    if (sourceParam === 'google' && typeof window !== 'undefined') {
      const storedResult = sessionStorage.getItem('googleVideoResult');
      if (storedResult) {
        try {
          const result = JSON.parse(storedResult);
          const googleVideoData = getGoogleVideoData(result);
          if (googleVideoData) {
            // Filter out any video with the same id or videoSrc to avoid duplicates
            const filteredFeed = videoFeed.filter(v => 
              v.id !== googleVideoData.id && v.videoSrc !== googleVideoData.videoSrc
            );
            // Dedupe the final array by videoSrc to ensure no duplicates
            const allVideos = [googleVideoData, ...filteredFeed];
            const seenSrcs = new Set();
            const uniqueVideos = allVideos.filter(v => {
              if (seenSrcs.has(v.videoSrc)) return false;
              seenSrcs.add(v.videoSrc);
              return true;
            });
            setVideos(uniqueVideos);
            return;
          }
        } catch (e) {
          console.error('Failed to parse Google video result:', e);
        }
      }
    }
  }, [searchParams]);

  // Show tab bar when user scrolls to second video (for SEO/Google landing or messages link share)
  // Hide tab bar on interstitials (type !== 'video')
  // Always show tab bar for groups source
  useEffect(() => {
    const sourceParam = searchParams?.get('source');
    const shouldControlTabBar = sourceParam === 'google' || cameFromMessages;
    const isFromGroups = sourceParam === 'groups';
    
    if (typeof window !== 'undefined') {
      const currentItem = videos[currentIndex];
      const isInterstitial = currentItem?.type === 'interstitial';
      
      // For groups source, always show tab bar
      if (isFromGroups) {
        const event = new CustomEvent('reelsTabBarVisibility', {
          detail: { visible: !isInterstitial }
        });
        window.dispatchEvent(event);
      } else if (shouldControlTabBar) {
        // Dispatch event to layout to show/hide tab bar based on video index
        // Tab bar hidden on first video, slides in on second video, hidden on interstitials
        const event = new CustomEvent('reelsTabBarVisibility', {
          detail: { visible: currentIndex >= 1 && !isInterstitial }
        });
        window.dispatchEvent(event);
      }
    }
  }, [currentIndex, searchParams, cameFromMessages, videos]);

  // Set theme-color to black for iOS Safari dynamic island area
  useEffect(() => {
    // Find or create the theme-color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const originalColor = metaThemeColor?.getAttribute('content');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    // Set to black for reels viewer
    metaThemeColor.setAttribute('content', '#000000');
    
    // Restore original color on unmount
    return () => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        if (originalColor) {
          meta.setAttribute('content', originalColor);
        } else {
          meta.remove();
        }
      }
    };
  }, []);

  // Hide tab bar when comments panel is open, restore when closed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // When comments panel opens, hide tab bar
      // When it closes, restore based on current video index (also hide on interstitials)
      const sourceParam = searchParams?.get('source');
      const shouldControlTabBar = sourceParam === 'google' || cameFromMessages;
      const isFromGroups = sourceParam === 'groups';
      const currentItem = videos[currentIndex];
      const isInterstitial = currentItem?.type === 'interstitial';
      
      let shouldShowTabBar;
      if (showCommentsPanel) {
        shouldShowTabBar = false;
      } else if (isFromGroups) {
        // For groups source, always show tab bar (unless interstitial)
        shouldShowTabBar = !isInterstitial;
      } else if (shouldControlTabBar) {
        shouldShowTabBar = currentIndex >= 1 && !isInterstitial;
      } else {
        shouldShowTabBar = !isInterstitial;
      }
      
      const event = new CustomEvent('reelsTabBarVisibility', {
        detail: { visible: shouldShowTabBar }
      });
      window.dispatchEvent(event);
    }
  }, [showCommentsPanel, currentIndex, searchParams, cameFromMessages, videos]);

  // Animate progress bar when playing
  useEffect(() => {
    let interval;
    if (isPlaying && !isDragging) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isDragging]);

  // Show peek of next video after 3 seconds on first video (or shortly after returning from Sarah's profile)
  useEffect(() => {
    // Only show peek on first video, if not dismissed, and there's a next video
    if (currentIndex === 0 && !peekDismissed && isPlaying && videos.length > 1) {
      // Check if returning from Sarah's profile - show peek after brief delay for smooth animation
      if (typeof window !== 'undefined') {
        const returnFromSarah = sessionStorage.getItem('returnFromSarahProfile');
        if (returnFromSarah === 'true') {
          sessionStorage.removeItem('returnFromSarahProfile');
          // Small delay to let page render first, then animate in elegantly
          peekTimerRef.current = setTimeout(() => {
            setShowPeek(true);
          }, 300);
          return;
        }
      }
      
      peekTimerRef.current = setTimeout(() => {
        setShowPeek(true);
      }, 1500);
    } else {
      setShowPeek(false);
    }

    return () => {
      if (peekTimerRef.current) {
        clearTimeout(peekTimerRef.current);
      }
    };
  }, [currentIndex, peekDismissed, isPlaying, videos.length]);

  // Show discovery unit after 1.5 seconds on the second video
  useEffect(() => {
    if (ENABLE_GROUPS_DISCOVERY_UNIT && isPlaying && currentIndex === 1) {
      discoveryTimerRef.current = setTimeout(() => {
        setShowDiscoveryUnit(true);
      }, 1500);
    }

    return () => {
      if (discoveryTimerRef.current) {
        clearTimeout(discoveryTimerRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  // Reset discovery unit when changing videos
  useEffect(() => {
    setShowDiscoveryUnit(false);
  }, [currentIndex]);

  // Show marketplace unit after 1 second on the third video
  useEffect(() => {
    if (ENABLE_MARKETPLACE_DISCOVERY_UNIT && isPlaying && currentIndex === 2) {
      marketplaceTimerRef.current = setTimeout(() => {
        setShowMarketplaceUnit(true);
      }, 1000);
    }

    return () => {
      if (marketplaceTimerRef.current) {
        clearTimeout(marketplaceTimerRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  // Reset marketplace unit when changing videos
  useEffect(() => {
    setShowMarketplaceUnit(false);
  }, [currentIndex]);

  // Play/pause video based on state, with retry for when ref isn't ready
  useEffect(() => {
    const currentVideo = videos[currentIndex];
    if (!currentVideo || currentVideo.type === 'interstitial' || isDragging || isAnimating) return;

    const tryPlay = (attempts = 0) => {
      const el = videoRefs.current[currentVideo.id];
      if (el) {
        if (isPlaying) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      } else if (isPlaying && attempts < 10) {
        setTimeout(() => tryPlay(attempts + 1), 50);
      }
    };
    tryPlay();
  }, [isPlaying, currentIndex, isDragging, isAnimating, videos]);

  // Get container height
  const getContainerHeight = useCallback(() => {
    return containerRef.current?.offsetHeight || window.innerHeight;
  }, []);

  // Navigate to a specific video with animation
  const goToVideo = useCallback((newIndex) => {
    // Use ref for immediate check to prevent race conditions
    if (newIndex < 0 || newIndex >= videos.length || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setShowPlayButton(false); // Hide play button when navigating
    
    // Pause current video but don't reset time
    const currentVideo = videos[currentIndex];
    const currentVideoEl = currentVideo ? videoRefs.current[currentVideo.id] : null;
    if (currentVideoEl) {
      currentVideoEl.pause();
    }
    
    // After slide animation completes, update index
    setTimeout(() => {
      // Disable transition before changing index
      setDisableTransition(true);
      setCurrentIndex(newIndex);
      setDragOffset(0);
      setProgress(0);
      setIsPlaying(true);
      
      // Re-enable transition after React has rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
          setIsAnimating(false);
          isAnimatingRef.current = false;
          // Start playing the new video, with retry in case ref isn't mounted yet
          const newVideo = videos[newIndex];
          const tryPlay = (attempts = 0) => {
            const el = newVideo ? videoRefs.current[newVideo.id] : null;
            if (el) {
              el.currentTime = 0;
              el.play().catch(() => {});
            } else if (newVideo?.type !== 'interstitial' && attempts < 10) {
              setTimeout(() => tryPlay(attempts + 1), 50);
            }
          };
          tryPlay();
        });
      });
    }, 300);
  }, [currentIndex, videos]);

  // Touch handlers for swipe gesture
  const handleTouchStart = useCallback((e) => {
    // Disable scrolling when comments panel is open
    if (isAnimating || showCommentsPanel) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    setIsDragging(true);
    setShowPlayButton(false); // Hide play button during scroll
    // Dismiss peek when user starts touching
    if (showPeek) {
      setShowPeek(false);
      setPeekDismissed(true);
    }
  }, [isAnimating, showPeek, showCommentsPanel]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || isAnimating || showCommentsPanel) return;
    
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;
    
    // Apply resistance at boundaries
    const containerHeight = getContainerHeight();
    let offset = -diff;
    
    // Add resistance when at first or last video
    if ((currentIndex === 0 && diff < 0) || (currentIndex === videos.length - 1 && diff > 0)) {
      offset = -diff * 0.3;
    }
    
    // Limit drag to one screen height
    offset = Math.max(-containerHeight, Math.min(containerHeight, offset));
    
    setDragOffset(offset);
  }, [isDragging, isAnimating, currentIndex, videos.length, getContainerHeight, showCommentsPanel]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || isAnimating || showCommentsPanel) return;
    
    setIsDragging(false);
    
    const containerHeight = getContainerHeight();
    const threshold = containerHeight * 0.15; // 15% of screen height
    const timeDelta = Date.now() - touchStartTime.current;
    const velocity = timeDelta > 0 ? Math.abs(dragOffset) / timeDelta : 0;
    
    // Determine if we should navigate based on drag distance or velocity
    const shouldNavigate = Math.abs(dragOffset) > threshold || velocity > 0.3;
    
    if (shouldNavigate) {
      if (dragOffset < 0 && currentIndex < videos.length - 1) {
        // Swiped up - go to next video
        setDragOffset(-containerHeight);
        goToVideo(currentIndex + 1);
      } else if (dragOffset > 0 && currentIndex > 0) {
        // Swiped down - go to previous video
        setDragOffset(containerHeight);
        goToVideo(currentIndex - 1);
      } else {
        // At boundary - bounce back
        setDragOffset(0);
      }
    } else {
      // Snap back to current position
      setDragOffset(0);
    }
    
    touchStartY.current = 0;
  }, [isDragging, isAnimating, dragOffset, currentIndex, videos.length, getContainerHeight, goToVideo, showCommentsPanel]);

  // Mouse wheel handler for desktop
  const handleWheel = useCallback((e) => {
    // Disable scrolling when comments panel is open
    if (isAnimating || showCommentsPanel) return;
    
    const now = Date.now();
    if (now - lastWheelTime.current < 600) return; // Throttle wheel events
    
    setShowPlayButton(false); // Hide play button during scroll
    // Dismiss peek when user scrolls
    if (showPeek) {
      setShowPeek(false);
      setPeekDismissed(true);
    }
    const containerHeight = getContainerHeight();
    
    if (e.deltaY > 50 && currentIndex < videos.length - 1) {
      lastWheelTime.current = now;
      setDragOffset(-containerHeight);
      goToVideo(currentIndex + 1);
    } else if (e.deltaY < -50 && currentIndex > 0) {
      lastWheelTime.current = now;
      setDragOffset(containerHeight);
      goToVideo(currentIndex - 1);
    }
  }, [isAnimating, currentIndex, videos.length, goToVideo, getContainerHeight, showPeek, showCommentsPanel]);

  // Get current video
  const video = videos[currentIndex];
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  const showUpsell = (config = {}) => {
    setUpsellConfig({ type: config.type || 'generic', count: config.count || 0, entityName: config.entityName || '' });
    setShowLoginPrompt(true);
  };

  // Parse likes string (e.g., "2.8M") to number for the like upsell
  const parseLikesString = (likesStr) => {
    if (!likesStr) return 0;
    const str = likesStr.toString().toUpperCase();
    if (str.includes('M')) {
      return parseFloat(str.replace('M', '')) * 1000000;
    }
    if (str.includes('K')) {
      return parseFloat(str.replace('K', '')) * 1000;
    }
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  };

  const handleLike = () => {
    // Get the current video's likes count
    const currentLikes = video?.likes || '0';
    setCurrentVideoLikes(parseLikesString(currentLikes));
    setShowLikeSheet(true);
  };
  const handleComment = () => setShowCommentsPanel(true); // Open split-screen comments panel
  const handleShare = () => {
    setShowShareSheet(true);
  };
  const handleFollow = () => showUpsell({ type: 'follow', entityName: video.author.name });
  const handleMore = () => showUpsell({ type: 'moreOptions' });
  const handleVideoClick = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    // Only show play button when user manually pauses
    setShowPlayButton(!newIsPlaying);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        overflow: 'hidden',
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Content wrapper with fade-in transition - background stays black */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: pageOpacity,
        transition: 'opacity 400ms ease-out',
      }}>
      {/* Videos Container - each video is positioned based on its index */}
      {/* Don't apply peek transform when comments panel is open (video is minimized) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: (showPeek && !showCommentsPanel) ? 'translateY(-36px)' : 'translateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {videos.map((v, index) => {
          // Only render videos within range (current -1 to current +1)
          const relativeIndex = index - currentIndex;
          if (relativeIndex < -1 || relativeIndex > 1) return null;
          
          const isCurrentVideo = index === currentIndex;
          const yOffset = relativeIndex * containerHeight + dragOffset;
          
          return (
            <div
              key={v.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: `${containerHeight}px`,
                transform: `translateY(${yOffset}px)`,
                transition: (isDragging || disableTransition) ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {/* Render interstitial or video based on type */}
              {v.type === 'interstitial' ? (
                <GroupsYouMightLikeInterstitial
                  groups={groupsYouMightLikeData}
                  onGroupDismiss={(groupId) => console.log('Dismissed group:', groupId)}
                  onGroupAction={(group) => console.log('Action on group:', group)}
                  onLoginPrompt={showUpsell}
                  prevColor={videos[index - 1]?.accentColor}
                  nextColor={videos[index + 1]?.accentColor}
                />
              ) : (
                <>
                  <VideoCard
                    video={v}
                    isActive={isCurrentVideo}
                    isPlaying={isCurrentVideo && isPlaying && !isDragging}
                    showPlayButton={isCurrentVideo && showPlayButton}
                    showDiscoveryUnit={isCurrentVideo && showDiscoveryUnit}
                    showMarketplaceUnit={isCurrentVideo && showMarketplaceUnit}
                    showSentBy={!cameFromGroups && index === 0}
                    showTabBar={cameFromGroups || index >= 1}
                    isShrunk={isCurrentVideo && showCommentsPanel}
                    shouldPreload={index <= currentIndex + 1}
                    videoRef={el => { if (el) { videoRefs.current[v.id] = el; } else { delete videoRefs.current[v.id]; } }}
                    onPlayPause={isCurrentVideo ? handleVideoClick : () => {}}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onMore={handleMore}
                    onFollow={handleFollow}
                    onCloseComments={() => setShowCommentsPanel(false)}
                    onSenderClick={() => {
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('returnFromSarahProfile', 'true');
                      }
                      router.push('/m/profile/sarah-manna');
                    }}
                  />
                  
                  {/* Discovery Unit - only on current video (second video) */}
                  {isCurrentVideo && (
                    <DiscoveryUnit 
                      cards={discoveryCards} 
                      isVisible={showDiscoveryUnit}
                      onDismiss={() => setShowDiscoveryUnit(false)}
                      tabBarOffset={60}
                    />
                  )}
                  
                  {/* Marketplace Discovery Unit - only on current video (third video) */}
                  {isCurrentVideo && (
                    <MarketplaceDiscoveryUnit 
                      cards={marketplaceCards} 
                      isVisible={showMarketplaceUnit}
                      onDismiss={() => setShowMarketplaceUnit(false)}
                      tabBarOffset={60}
                    />
                  )}
                  
                  {/* Progress Bar - only on current video */}
                  {isCurrentVideo && (
                    <div 
                      style={{
                        position: 'absolute',
                        // Scrubber position: above tab bar on second+ videos (or all videos when from groups), above comment composer on first video
                        bottom: (cameFromGroups || index >= 1) 
                          ? 'calc(env(safe-area-inset-bottom, 0px) + 68px)' 
                          : 'calc(env(safe-area-inset-bottom, 0px) + 56px)',
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'rgba(255,255,255,0.3)',
                        zIndex: 50,
                        transition: 'bottom 0.3s ease-out',
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#fff',
                        borderRadius: '0 2px 2px 0',
                        transition: isDragging ? 'none' : 'width 0.1s linear',
                      }} />
                    </div>
                  )}
                </>
              )}
              
              {/* Comment Composer - only on first video when from messages (not groups) */}
              {isCurrentVideo && index === 0 && v.type !== 'interstitial' && !cameFromGroups && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
                    left: '12px',
                    right: '12px',
                    zIndex: 50,
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => showUpsell({ type: 'message', entityName: 'Sarah' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      height: '40px',
                      background: '#3A3B3C',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '0 16px',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      color: '#B0B3B8',
                      fontSize: '15px',
                      fontWeight: '400',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    }}>
                      Reply to Sarah in Messenger
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Peek of Next Video - small strip at very bottom */}
      {nextVideo && nextVideo.type !== 'interstitial' && (
        <div 
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: 0,
            right: 0,
            height: '48px',
            zIndex: 40,
            transform: (showPeek && !showCommentsPanel) ? 'translateY(0)' : 'translateY(100%)',
            opacity: (showPeek && !showCommentsPanel) ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${containerHeight}px`,
              background: nextVideo.accentColor || '#1c1c1e',
            }} />
          </div>
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}>
            <span style={{
              color: '#fff',
              fontSize: '12px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              animation: showPeek ? 'bouncePeekText 1.6s ease-in-out 1s infinite' : 'none',
            }}>
              <span style={{ fontSize: '10px' }}>↑</span> Scroll for more
            </span>
          </div>
          
          <style jsx>{`
            @keyframes bouncePeekText {
              0% { transform: translateY(0); }
              18% { transform: translateY(-4px); }
              38%, 100% { transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

      {/* Facebook Header - fixed at top */}
      <header 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
          background: 'transparent',
          gap: '8px',
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* "< Messages" back button - only shown when coming from messages */}
        {cameFromMessages && (
          <button
            onClick={() => router.push('/m/messages-share')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}>
            <svg width="8" height="10" viewBox="0 0 8 10" fill="#fff">
              <path d="M0 5L8 0V10L0 5Z"/>
            </svg>
            <span style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: '400',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>Messages</span>
          </button>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div 
            style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, cursor: 'pointer' }}
            onClick={() => openBottomSheet({ selectedCategory: 'videoLinkShare' })}
          >
            <img 
              src={FACEBOOK_WORDMARK_URL} 
              alt="Facebook" 
              style={{ height: '24px', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <button 
            onClick={() => {
              const isAndroid = /android/i.test(navigator.userAgent);
              window.location.href = isAndroid 
                ? "https://play.google.com/store/apps/details?id=com.facebook.katana"
                : "https://apps.apple.com/app/facebook/id284882215";
            }}
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              color: '#050505',
              fontSize: '15px',
              fontWeight: '600',
              lineHeight: '20px',
              letterSpacing: 'normal',
              height: '36px',
              padding: '0 12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Open app
          </button>
        </div>
        </div>
      </header>

      {/* Top Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 10,
      }} />
      </div>{/* End of content wrapper with fade-in transition */}

      {/* Upsell Bottom Sheet */}
      <UpsellBottomSheet
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type={upsellConfig.type}
        count={upsellConfig.count}
        entityName={upsellConfig.entityName}
      />

      {/* Like upsell bottom sheet */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={currentVideoLikes}
      />

      {/* Share Sheet */}
      <ShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />

      {/* Split-screen Comments Panel */}
      <ReelsCommentsPanel
        isOpen={showCommentsPanel}
        onClose={() => setShowCommentsPanel(false)}
        comments={reelsCommentsData}
        totalCount={reelsCommentsData.length}
          onCommentPromptClick={() => {
            showUpsell({ type: 'comment', count: parseLikesString(video.comments) });
          }}
        onLikeComment={(reactionCount) => {
          // Show reactions upsell with the comment's reaction count
          setCurrentVideoLikes(reactionCount);
          setShowLikeSheet(true);
        }}
      />
    </div>
  );
}
