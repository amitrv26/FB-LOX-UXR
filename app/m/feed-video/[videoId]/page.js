"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import ShareSheet from "../../../../components/mobile/ShareSheet";
import UseCaseBottomSheet from "../../../../components/mobile/UseCaseBottomSheet";
import RelatedPostsUnit from "../../../../components/mobile/RelatedPostsUnit";
import ReelsUnit from "../../../../components/mobile/ReelsUnit";
import { BadgeCheckmarkIcon, ChevronDownIcon, ChevronUpIcon, Icon } from "../../../../components/icons";

// ============================================
// MOCK DATA
// ============================================

const SAMPLE_VIDEO = {
  id: "stranger-things-1",
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
};

// Second reel - different content
const SECOND_REEL = {
  id: "stranger-things-2",
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
};

const GROUPS_DATA = [
  {
    id: 1,
    name: "Stranger Things Fans",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=200&h=200&fit=crop",
    members: "1.2M members",
    activity: "20+ posts today",
    snippet: "What was everyone's favorite scene from the finale? I'm still not over...",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    authorName: "Sarah",
    likes: 42,
  },
  {
    id: 2,
    name: "Netflix Shows Discussion",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=200&fit=crop",
    members: "854K members",
    activity: "15+ posts today",
    snippet: "Just finished watching and I have so many theories about the ending...",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    authorName: "Mike",
    likes: 31,
  },
  {
    id: 3,
    name: "TV Show Theories & Spoilers",
    image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=200&h=200&fit=crop",
    members: "432K members",
    activity: "8+ posts today",
    snippet: "I think Max is going to...",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    authorName: "Emma",
    likes: 53,
  },
];

// Sample group post data for the full discussion post
const GROUP_POST_DATA = {
  id: "group-post-1",
  title: "Who do we think is going to die in the finale?",
  groupName: "Stranger Things Fan Club",
  commentCount: 106,
  author: {
    name: "Aleksandra Bauer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  comment: "Will! I've always said Will would be the one to go since he's connected to Vecna and the upside down.",
};

// Interview reels data - using stranger-things-interviews videos
const INTERVIEW_REELS = [
  {
    id: "interview-1",
    author: "Variety",
    avatar: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=40&h=40&fit=crop",
    videoSrc: "/videos/stranger-things-interviews/Video-270.mp4",
    likes: 6200,
    comments: 421,
  },
  {
    id: "interview-2",
    author: "Netflix",
    avatar: "https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png",
    videoSrc: "/videos/stranger-things-interviews/Video-153.mp4",
    likes: 12400,
    comments: 892,
  },
  {
    id: "interview-3",
    author: "Entertainment Weekly",
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop",
    videoSrc: "/videos/stranger-things-interviews/Video-193.mp4",
    likes: 8700,
    comments: 534,
  },
  {
    id: "interview-4",
    author: "The Tonight Show",
    avatar: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=40&h=40&fit=crop",
    videoSrc: "/videos/stranger-things-interviews/Video-706.mp4",
    likes: 15800,
    comments: 1247,
  },
  {
    id: "interview-5",
    author: "MTV",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=40&h=40&fit=crop",
    videoSrc: "/videos/stranger-things-interviews/Video-877.mp4",
    likes: 9300,
    comments: 678,
  },
];

// Millie Bobby Brown posts for the related posts carousel
const MILLIE_POSTS = [
  {
    id: 1,
    author: {
      name: "Millie Bobby Brown",
      avatar: "/images/millie/millie-pp.jpg",
      verified: true,
    },
    image: "/images/millie/millie-1.jpg",
    text: "Last day on set vibes 🎬 Can't believe this journey is coming to an end. Thank you to the most incredible cast and crew ❤️",
    reactions: { count: 24853 },
    comments: 3421,
  },
  {
    id: 2,
    author: {
      name: "Millie Bobby Brown",
      avatar: "/images/millie/millie-pp.jpg",
      verified: true,
    },
    image: "/images/millie/millie-3.jpg",
    text: "The Upside Down will always be a part of me. Eleven taught me so much about strength and resilience 💪",
    reactions: { count: 18234 },
    comments: 2156,
  },
  {
    id: 3,
    author: {
      name: "Millie Bobby Brown",
      avatar: "/images/millie/millie-pp.jpg",
      verified: true,
    },
    image: "/images/millie/millie-2.jpg",
    text: "Throwback to when we first started. Look how far we've come! Forever grateful for this family 🙏",
    reactions: { count: 31562 },
    comments: 4523,
  },
  {
    id: 4,
    author: {
      name: "Millie Bobby Brown",
      avatar: "/images/millie/millie-pp.jpg",
      verified: true,
    },
    image: "/images/millie/millie-3.jpg",
    text: "Behind the scenes magic ✨ The finale is going to blow your minds. Get ready!",
    reactions: { count: 15678 },
    comments: 1892,
  },
  {
    id: 5,
    author: {
      name: "Millie Bobby Brown",
      avatar: "/images/millie/millie-pp.jpg",
      verified: true,
    },
    image: "/images/millie/millie-2.jpg",
    text: "Feeling all the feels as we wrap up this chapter. Thank you for growing up with us 💕",
    reactions: { count: 28945 },
    comments: 3678,
  },
];

// Carousel post data - separate post below the main video
const CAROUSEL_POST = {
  id: "millie-trip",
  author: {
    name: "Millie Bobby Brown",
    avatar: "/images/millie/millie-pp.jpg",
    isVerified: true,
  },
  timestamp: "9h",
  location: "Atlanta, GA",
  caption: "Behind the scenes from our last day on set. Can't believe it's finally wrapping up after all these years 🎬❤️",
  items: [
    { id: 1, type: "image", src: "/images/millie/millie-2.jpg" },
    { id: 2, type: "image", src: "/images/millie/millie-2.jpg" },
    { id: 3, type: "image", src: "/images/millie/millie-2.jpg" },
    { id: 4, type: "image", src: "/images/millie/millie-2.jpg" },
    { id: 5, type: "image", src: "/images/millie/millie-2.jpg" },
  ],
  stats: {
    likes: "11",
    comments: "8",
    shares: "1",
  },
};

// Similar items data for marketplace unit
const SIMILAR_ITEMS_DATA = [
  {
    id: 1,
    title: "Stranger Things Experience LA",
    price: "$45",
    image: "/images/tickets/ticket-1.png",
  },
  {
    id: 2,
    title: "Stranger Things VIP Pass",
    price: "$89",
    image: "/images/tickets/ticket-2.png",
  },
  {
    id: 3,
    title: "Stranger Things Concert",
    price: "$65",
    image: "/images/tickets/s-l400.jpg",
  },
  {
    id: 4,
    title: "Hawkins Lab Tour Ticket",
    price: "$35",
    image: "/images/tickets/s-l400 (1).jpg",
  },
  {
    id: 5,
    title: "Season 5 Premiere Ticket",
    price: "$120",
    image: "/images/tickets/ticket-1.png",
  },
  {
    id: 6,
    title: "Fan Convention Pass",
    price: "$75",
    image: "/images/tickets/ticket-2.png",
  },
];

// ============================================
// COMPONENTS
// ============================================

// Sender info for "Sent by" pill
const senderInfo = {
  name: "Sarah Manna",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces",
};

// Video Post Card (original video only - no carousel)
const VideoPostCard = ({ 
  video, 
  showSentBy = false,
  onLikeClick,
  onCommentClick,
  onShareClick,
  onSenderClick,
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

  return (
    <div style={{
      background: 'transparent',
      margin: '4px 12px 0 12px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.1)',
    }}>
      {/* Video Container - 9:16 reels aspect ratio */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9/16',
          background: '#000',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          src={video.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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

        {/* Gradient overlay at TOP - stronger */}
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
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
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
          {/* Sent by pill */}
          {showSentBy && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px',
              padding: '6px 12px 6px 6px',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '100px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}>
              <img 
                src={senderInfo.avatar}
                alt={senderInfo.name}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <span style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '13px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
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
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 600,
                    fontSize: '13px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >{senderInfo.name}</button>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}> · </span>
                <span style={{ color: 'rgba(255,255,255,0.95)' }}>2 new posts</span>
              </span>
            </div>
          )}

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
            <button onClick={(e) => { e.stopPropagation(); onLikeClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', paddingRight: '12px' }}>
              <Icon name="like-outline" size={20} color="onMedia" />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{video.stats.likes}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onCommentClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
              <Icon name="comment-outline" size={20} color="onMedia" />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{video.stats.comments}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onShareClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
              <Icon name="share-outline" size={20} color="onMedia" />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{video.stats.shares}</span>
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

// Carousel Post Card (separate unit with pagination dots matching Figma)
const CarouselPostCard = ({ 
  post, 
  showScrollIndicator = false,
  scrollIndicatorOpacity = 0,
  onLikeClick,
  onCommentClick,
  onShareClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance && currentIndex < post.items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (distance < -minSwipeDistance && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentItem = post.items[currentIndex];

  return (
    <div 
      style={{
      position: 'relative',
      margin: '4px 12px 0 12px',
      borderRadius: '16px',
      overflow: 'hidden',
      aspectRatio: '4/5',
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Full bleed image */}
      <img
        src={currentItem.src}
        alt={`Slide ${currentIndex + 1}`}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
        }}
      />

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

      {/* Gradient overlay at BOTTOM */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Author info at TOP - fades in as scroll indicator fades out */}
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
        opacity: showScrollIndicator ? (1 - scrollIndicatorOpacity) : 1,
        transition: 'opacity 0.15s ease-out',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
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
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}>{post.author.name}</span>
              {post.author.isVerified && (
                <Icon name="badge-checkmark-filled" size={12} color="onMedia" />
              )}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: '16px',
              textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            }}>
              <span>{post.timestamp}</span>
              <span>·</span>
              <span>{post.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll for more indicator overlay - fades out as user scrolls */}
      {showScrollIndicator && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          height: '56px',
          zIndex: 3,
          opacity: scrollIndicatorOpacity,
          transition: 'opacity 0.15s ease-out',
          pointerEvents: scrollIndicatorOpacity > 0 ? 'auto' : 'none',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Icon name="arrow-up-filled" size={12} color="onMedia" />
            <span style={{
              color: 'white',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: '16px',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}>
              Scroll for more
            </span>
          </div>
        </div>
      )}

      {/* Bottom content - pagination dots + caption + UFI */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px',
        zIndex: 2,
      }}>
        {/* Pagination Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '12px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '100px',
            padding: '6px 10px',
          }}>
            {post.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  padding: 0,
                  margin: '0 3px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <p style={{
          color: 'white',
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: 'normal',
          margin: '0 0 12px 0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{post.caption}</p>

        {/* UFI */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); onLikeClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', paddingRight: '12px' }}>
            <Icon name="like-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{post.stats.likes}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onCommentClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
            <Icon name="comment-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{post.stats.comments}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onShareClick(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
            <Icon name="share-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{post.stats.shares}</span>
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '20px', height: '20px', position: 'relative', zIndex: 3 }} />
            <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Scroll for More indicator
const ScrollForMore = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    color: '#65686c',
  }}>
    <span style={{
      fontSize: '13px',
      fontWeight: 500,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      marginBottom: '4px',
    }}>
      Scroll for more
    </span>
    <ChevronUpIcon size={20} color="#65686c" />
  </div>
);

// Groups Discussion Card - matching related answers quote card EXACTLY
const GroupDiscussionCard = ({ group, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '261px',
      flexShrink: 0,
      padding: '12px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid rgba(0,0,0,0.1)',
      cursor: 'pointer',
      scrollSnapAlign: 'start',
      textAlign: 'left',
      WebkitTapHighlightColor: 'transparent',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      letterSpacing: 'inherit',
    }}
  >
    {/* Quote/Snippet text - matching related answers exactly */}
    <p style={{
      margin: 0,
      paddingBottom: '12px',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: 0,
      color: '#080809',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      minHeight: '100px',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      {group.snippet}
    </p>
    
    {/* Footer - matching related answers: avatar + "Name in GroupName" + like */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '12px',
      gap: '8px',
    }}>
      {/* Author row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flex: 1,
        minWidth: 0,
      }}>
        <img
          src={group.authorAvatar || group.image}
          alt=""
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <span style={{
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#65676b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontWeight: 600, color: '#080809' }}>{group.authorName || 'Sarah'}</span> in {group.name}
        </span>
      </div>
      
      {/* Like action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676b">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" />
        </svg>
        <span style={{
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          color: '#65676b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>{group.likes || 42}</span>
      </div>
    </div>
  </button>
);

// Related Posts Shelf - h-scroll
const GroupsShelf = ({ groups, onGroupClick }) => (
  <div style={{ padding: '24px 0 12px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      marginBottom: '12px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: '17px',
        fontWeight: 700,
        color: '#080809',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
        Related posts
      </h3>
      <button style={{
        background: 'none',
        border: 'none',
        color: '#0866ff',
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: 'normal',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        cursor: 'pointer',
      }}>
        See all
      </button>
    </div>
    <div 
      className="groups-shelf-scroll"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollSnapType: 'x mandatory',
        paddingBottom: '4px',
        gap: '8px',
      }}
    >
      {groups.map((group) => (
        <div
          key={group.id}
          style={{ flexShrink: 0 }}
        >
          <GroupDiscussionCard 
            group={group} 
            onClick={() => onGroupClick(group)}
          />
        </div>
      ))}
    </div>
  </div>
);

// Group Post Card - Text-based group discussion card
const GroupPostCard = ({ post, onInteraction }) => (
  <div 
    onClick={onInteraction}
    style={{
      margin: '0 12px',
      borderRadius: '12px',
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.1)',
      cursor: 'pointer',
      padding: '16px',
    }}
  >
    {/* Title/Question */}
    <h3 style={{
      margin: '0 0 4px',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '20px',
      color: '#080809',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    }}>
      {post.title}
    </h3>
    
    {/* Group name and comment count */}
    <p style={{
      margin: '0 0 12px',
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '18px',
      color: '#65686c',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    }}>
      {post.groupName} · {post.commentCount} comments
    </p>
    
    {/* Author comment section */}
    <div style={{
      display: 'flex',
      gap: '8px',
    }}>
      <img
        src={post.author.avatar}
        alt={post.author.name}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#080809',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {post.author.name}
        </span>
        <p style={{
          margin: '2px 0 0',
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          color: '#080809',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {post.comment}
        </p>
      </div>
    </div>
  </div>
);

// Text Post Card - Full text post with group attribution and UFI
const TextPostCard = ({ 
  group,
  author, 
  aiTitle = null,
  content, 
  likes = 0, 
  commentCount = 0, 
  shares = 0,
  comments = [],
  onLikeClick,
  onCommentClick,
  onShareClick,
}) => (
  <div style={{
    margin: '0 12px 12px',
    borderRadius: '16px',
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.1)',
    overflow: 'hidden',
  }}>
    {/* Header with group attribution */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Group-style avatar: squircle with circle overlay */}
        <div style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          flexShrink: 0,
        }}>
          {/* Squircle - Group photo */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
            <img
              src={group.avatar}
              alt={group.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Inner border */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
            }} />
          </div>
          {/* Circle - Author photo (overlaid at bottom-right) */}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            border: '1px solid #fff',
            boxSizing: 'content-box',
          }}>
            <img
              src={author.avatar}
              alt={author.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Inner border */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: '20px',
              color: '#080809',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              {group.name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '16px',
              color: '#65686c',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              {author.name}
            </span>
            <span style={{
              fontSize: '13px',
              color: '#65686c',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>·</span>
            <span style={{
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '16px',
              color: '#65686c',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              {author.timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* AI-generated Title */}
    {aiTitle && (
      <div style={{ padding: '0 12px 6px' }}>
        <h3 style={{
          margin: 0,
          fontSize: '17px',
          fontWeight: 700,
          lineHeight: '22px',
          color: '#080809',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          {aiTitle}
        </h3>
      </div>
    )}

    {/* Content - Body 3 typography */}
    <div style={{ padding: '0 12px 0' }}>
      <p style={{
        margin: 0,
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '20px',
        color: '#080809',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </p>
    </div>

    {/* UFI - Like, Comment, Share with Reactions */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 12px 8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        <button 
          onClick={onLikeClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            padding: '0 12px 0 0',
            cursor: 'pointer',
          }}
        >
          <Icon name="like-outline" size={20} color="secondary" />
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '16px',
            color: '#65686c',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {likes}
          </span>
        </button>
        <button 
          onClick={onCommentClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            padding: '0 12px',
            cursor: 'pointer',
          }}
        >
          <Icon name="comment-outline" size={20} color="secondary" />
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '16px',
            color: '#65686c',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {commentCount}
          </span>
        </button>
        <button 
          onClick={onShareClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            padding: '0 12px',
            cursor: 'pointer',
          }}
        >
          <Icon name="share-outline" size={20} color="secondary" />
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            lineHeight: '16px',
            color: '#65686c',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {shares}
          </span>
        </button>
      </div>
      
      {/* Inline reactions - same as reel */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '20px', height: '20px', position: 'relative', zIndex: 3 }} />
        <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 2 }} />
        <img src="/images/reactions/wow_default_40.png" alt="Wow" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 1 }} />
      </div>
    </div>

    {/* Comment section - matching groups post permalink style */}
    {comments && comments.length > 0 && (
      <div style={{ padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {comments.map((comment, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px' }}>
            <img
              src={comment.avatar}
              alt={comment.author}
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
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  letterSpacing: 'normal',
                  color: '#080809',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}>
                  {comment.author}
                </span>
              </div>
              <p style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '20px',
                letterSpacing: 'normal',
                color: '#080809',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}>
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Event Card - Event post with media, gradient footer, and UFI
const EventCard = ({
  author,
  eventImage,
  eventDate,
  eventTitle,
  eventVenue,
  likes = "0",
  comments = "0",
  shares = "0",
  onLikeClick,
  onCommentClick,
  onShareClick,
  onInterestedClick,
}) => (
  <div style={{
    margin: '4px 12px 0',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#000',
  }}>
    {/* Media Container - Square aspect ratio */}
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1/1',
    }}>
      {/* Event Image */}
      <img
        src={eventImage}
        alt={eventTitle}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Top gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
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
            src={author.avatar}
            alt={author.name}
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
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}>{author.name}</span>
              {author.isVerified && (
                <Icon name="badge-checkmark-filled" size={12} color="onMedia" />
              )}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: '16px',
              textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            }}>
              <span>{author.timestamp}</span>
              {author.location && (
                <>
                  <span>·</span>
                  <span>{author.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient + footer content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.7) 100%)',
        padding: '60px 12px 16px',
        zIndex: 2,
      }}>
        {/* Event info + Interested button */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <div style={{ flex: 1 }}>
            {/* Date - Meta 4 */}
            <p style={{
              margin: '0 0 4px',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '16px',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            }}>
              {eventDate}
            </p>
            {/* Title - Headline 4 Emphasized */}
            <h3 style={{
              margin: '0 0 2px',
              fontSize: '15px',
              fontWeight: 700,
              lineHeight: '20px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            }}>
              {eventTitle}
            </h3>
            {/* Venue - Body 4 */}
            <p style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
            }}>
              {eventVenue}
            </p>
          </div>
          
          {/* Interested Button */}
          <button
            onClick={onInterestedClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Icon name="star-outline" size={16} color="onMedia" />
            <span style={{
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: '20px',
              color: 'white',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              Interested
            </span>
          </button>
        </div>

        {/* UFI */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={(e) => { e.stopPropagation(); onLikeClick?.(); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', paddingRight: '12px' }}>
            <Icon name="like-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{likes}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onCommentClick?.(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
            <Icon name="comment-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{comments}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onShareClick?.(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 12px' }}>
            <Icon name="share-outline" size={20} color="onMedia" />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', lineHeight: '16px', textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)' }}>{shares}</span>
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

// Similar Items with Lower Price - matching marketplace PDP
const SimilarItemsShelf = ({ items, onItemClick }) => (
  <div style={{
    background: '#fff',
    marginTop: '16px',
  }}>
    {/* Unit Header */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
    }}>
      {/* Headline 3 Emphasized */}
      <h2 style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        fontSize: '17px',
        fontWeight: '700',
        lineHeight: '22px',
        letterSpacing: 'normal',
        color: '#080809',
        margin: 0,
      }}>
        Similar items with a lower price
      </h2>
      {/* Body 3 Link */}
      <button style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: '#0866ff',
        fontSize: '15px',
        fontWeight: '400',
        lineHeight: '20px',
        letterSpacing: 'normal',
        cursor: 'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
        See all
      </button>
    </div>

    {/* Tiles container - horizontal scroll */}
    <div 
      className="similar-items-scroll"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '0 12px 12px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {items.map((item) => (
        <div 
          key={item.id}
          onClick={onItemClick}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            width: '157px',
            cursor: 'pointer',
          }}
        >
          {/* Media - 1:1 aspect ratio with 12px corner radius */}
          <div style={{
            width: '157px',
            height: '157px',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          {/* Content - matching marketplace grid */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            paddingTop: '8px',
            paddingRight: '4px',
          }}>
            {/* Price - Headline 4: 15px, 500 weight */}
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '15px',
              fontWeight: '500',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              color: '#080809',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {item.price}
            </p>
            {/* Item name - Body 4: 13px, 400 weight */}
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '13px',
              fontWeight: '400',
              lineHeight: '16px',
              letterSpacing: '-0.08px',
              color: '#080809',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function FeedVideoPage() {
  const params = useParams();
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0 });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);
  const scrollContainerRef = useRef(null);
  const firstPageRef = useRef(null);
  const secondPageRef = useRef(null);

  // Parse likes string (e.g., "2.8M", "1.2K") to number
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

  // Format number for display (e.g., 2800 -> "2.8K")
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  const handleInteraction = () => {
    setUpsellConfig({ type: 'generic', count: 0 });
    setShowLoginSheet(true);
  };

  // Handle comment click - shows login prompt with comment count
  const handleCommentClick = (commentsCount) => {
    const numComments = parseLikesString(commentsCount);
    setUpsellConfig({ type: 'comment', count: numComments });
    setShowLoginSheet(true);
  };

  const handleLikeClick = (likesCount) => {
    const numLikes = parseLikesString(likesCount);
    setCurrentLikeCount(numLikes);
    setShowLikeSheet(true);
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  // Remove theme-color to let Safari use its liquid glass effect
  useEffect(() => {
    // Find existing theme-color meta tag and remove it for this page
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const originalColor = metaThemeColor?.getAttribute('content');
    
    if (metaThemeColor) {
      metaThemeColor.remove();
    }
    
    // Restore original on unmount
    return () => {
      if (originalColor) {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'theme-color';
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', originalColor);
      }
    };
  }, []);

  // Detect browser for tab bar positioning
  useEffect(() => {
    const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                        !window.MSStream && 
                        /Safari/.test(navigator.userAgent) &&
                        !/CriOS|FxiOS/.test(navigator.userAgent);
    
    if (!isIOSSafari) {
      // Chrome or other browsers - add class for different positioning
      document.body.classList.add('non-ios-safari');
    }
    
    return () => document.body.classList.remove('non-ios-safari');
  }, []);

  // Scroll to top on mount to ensure video is fully visible
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Show scroll indicator after 1.5 second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to detect when user scrolls - using window scroll for Safari liquid glass
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const firstPageHeight = firstPageRef.current?.offsetHeight || 0;
      
      // Show tab bar once user scrolls past 80% of the first page
      const threshold = firstPageHeight * 0.8;
      const shouldShowTabBar = scrollTop > threshold;
      
      // Emit event to layout to control the existing tab bar
      window.dispatchEvent(new CustomEvent('feedVideoTabBarVisibility', {
        detail: { visible: shouldShowTabBar }
      }));

      // Calculate scroll indicator opacity - fade out as user scrolls
      const fadeEndThreshold = firstPageHeight * 0.3;
      const indicatorOpacity = Math.max(0, Math.min(1, 1 - (scrollTop / fadeEndThreshold)));
      setScrollIndicatorOpacity(indicatorOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="feed-video-page"
      style={{
        background: 'transparent',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        overflow: 'visible',
        minHeight: '100vh',
      }}
    >
      {/* Page-specific styles: no header padding, scrollbar hiding, bounce animation */}
      <style jsx global>{`
        /* Feed video page: no header padding */
        .mobile-main {
          padding-top: 0 !important;
        }
        /* White header for this page */
        .mobile-header {
          background: #ffffff !important;
        }
        /* Hide scrollbars on scroll containers */
        .feed-video-scroll-container::-webkit-scrollbar,
        .groups-shelf-scroll::-webkit-scrollbar,
        .similar-items-scroll::-webkit-scrollbar {
          display: none;
        }
        .groups-shelf-scroll > div:first-child {
          margin-left: 12px !important;
        }
        .groups-shelf-scroll > div:last-child {
          margin-right: 12px !important;
        }
        /* Bounce animation for scroll indicator */
        @keyframes bouncePeek {
          0% {
            transform: translateY(0);
          }
          18% {
            transform: translateY(-68px);
          }
          38%, 100% {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Scrollable Content with Snap */}
      <div 
        ref={scrollContainerRef}
        className="feed-video-scroll-container"
        style={{
          minHeight: '100vh',
          overflowY: 'visible',
          overflowX: 'hidden',
          background: 'transparent',
        }}
      >
        {/* First Page - Video Reel */}
        <div 
          ref={firstPageRef}
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: '48px', // Space for header
            background: 'transparent',
          }}
        >
          {/* Video Post Card */}
          <VideoPostCard 
            video={SAMPLE_VIDEO}
            showSentBy={true}
            onLikeClick={() => handleLikeClick(SAMPLE_VIDEO.stats.likes)}
            onCommentClick={() => handleCommentClick(SAMPLE_VIDEO.stats.comments)}
            onShareClick={handleShare}
            onSenderClick={handleInteraction}
          />
        </div>

        {/* Second Page - Carousel Post Card */}
        <div 
          ref={secondPageRef}
          className="carousel-card-bounce"
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'transparent',
            animation: showScrollIndicator && scrollIndicatorOpacity > 0 ? 'bouncePeek 1.6s ease-in-out infinite' : 'none',
          }}
        >
          {/* Carousel Post Card */}
          <CarouselPostCard 
            post={CAROUSEL_POST}
            showScrollIndicator={showScrollIndicator}
            scrollIndicatorOpacity={scrollIndicatorOpacity}
            onLikeClick={() => handleLikeClick(CAROUSEL_POST.stats.likes)}
            onCommentClick={() => handleCommentClick(CAROUSEL_POST.stats.comments)}
            onShareClick={handleShare}
          />
        </div>

        {/* Third section - Shelves - no snap, flows naturally after carousel */}
        <div 
          style={{
            background: '#ffffff',
          }}
        >
          {/* Related Posts */}
          <div style={{ marginTop: '12px' }}>
            <RelatedPostsUnit title="More from Millie Bobby Brown" posts={MILLIE_POSTS} scrollBottomPadding="4px" />
            
            {/* Reels Discovery Unit */}
            <ReelsUnit 
              title="More about Stranger Things" 
              reels={INTERVIEW_REELS}
              showSeeAll={true} 
              bottomMargin="100px"
              autoPlayFirst={true}
            />
          </div>

          {/* Bottom padding for tab bar and safe area */}
          <div style={{ height: '100px' }} />
        </div>
      </div>

      {/* Login Prompt Sheet */}
      <UpsellBottomSheet 
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
        type={upsellConfig.type}
        count={upsellConfig.count}
      />

      {/* Like Sheet for reactions upsell */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={currentLikeCount}
      />

      {/* Share Sheet */}
      <ShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />

      {/* Use Case Bottom Sheet */}
      <UseCaseBottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        selectedCategory="videoLinkShareFeed"
        currentRoute={`/m/feed-video/${params?.videoId || 'stranger-things-1'}`}
      />
    </div>
  );
}

