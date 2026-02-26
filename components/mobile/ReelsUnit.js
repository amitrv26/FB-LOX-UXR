"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon";

// Grey placeholder for missing images
const GREY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23E4E6EB' width='400' height='400'/%3E%3C/svg%3E";
const GREY_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect fill='%23BCC0C4' width='40' height='40' rx='20'/%3E%3C/svg%3E";

// Reel Card component - uses cfe-reel-card classes from aggregation.scss
const ReelCard = ({ author, avatar, thumbnail, videoSrc, likes, comments, shouldPlay, onClick }) => {
  const videoRef = useRef(null);

  // Handle play/pause based on shouldPlay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (shouldPlay) {
      // Reset video to start and play
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may be blocked, ignore error
        });
      }
    } else {
      video.pause();
    }
  }, [shouldPlay, videoSrc]);

  return (
    <div 
      className="cfe-reel-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
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
            autoPlay={shouldPlay}
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
        
        {/* Footer with UFI - likes on left, comments on right */}
        <div className="cfe-reel-card__footer-left">
          <div className="cfe-reel-card__ufi-item">
            <Icon name="like-outline" size={16} color="white" />
            <span>{likes}</span>
          </div>
        </div>
        <div className="cfe-reel-card__footer-right">
          <div className="cfe-reel-card__ufi-item">
            <Icon name="comment-outline" size={16} color="white" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default reels data - using stranger-things-finale-predictions videos
const defaultReelsData = [
  {
    id: "reel-1",
    author: "ST Theories",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-384.mp4",
    likes: 42,
    comments: 31
  },
  {
    id: "reel-2",
    author: "Becker Threads",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-198.mp4",
    likes: 14,
    comments: 20
  },
  {
    id: "reel-3",
    author: "Netflix Fan Club",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-267.mp4",
    likes: 28,
    comments: 15
  },
  {
    id: "reel-4",
    author: "Hawkins Insider",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-413.mp4",
    likes: 89,
    comments: 47
  },
  {
    id: "reel-5",
    author: "Becker Threads",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-52.mp4",
    likes: 14,
    comments: 20
  },
  {
    id: "reel-6",
    author: "80s Nostalgia",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=500&fit=crop",
    videoSrc: "/videos/stranger-things-finale-predictions/Video-604.mp4",
    likes: 156,
    comments: 62
  }
];

// Main ReelsUnit component
const ReelsUnit = ({ title = "Related reels", reels = defaultReelsData, className = '', showSeeAll = false, seeAllText = "See all", seeAllAsPill = false, bottomMargin = '12px', autoPlayFirst = false, onReelClick }) => {
  const router = useRouter();
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const reelRefs = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);

  // Handle reel click - navigate to reels viewer with the clicked reel
  const handleReelClick = (reel, index) => {
    // If custom handler is provided, use it
    if (onReelClick) {
      onReelClick(reel, index);
      return;
    }

    // Store the reels data in session storage for the reels viewer
    const reelsViewerData = {
      reels: reels,
      startIndex: index,
      source: 'groupsPermalink',
    };
    sessionStorage.setItem('groupsReelsData', JSON.stringify(reelsViewerData));
    
    // Navigate to reels viewer
    router.push(`/m/reels/${reel.id}?source=groups`);
  };

  // Detect when section enters/leaves viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '50px' } // Very low threshold and margin to trigger earlier
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
      threshold: 0.6,
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

    reelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [reels.length]);

  return (
    <section className={`reels-unit ${className}`} ref={sectionRef} style={{ marginBottom: bottomMargin }}>
      {/* Header - styled like Related Answers */}
      <div className="reels-unit__header">
        <h2 className="reels-unit__title">{title}</h2>
        {showSeeAll && (
          seeAllAsPill ? (
            <button className="reels-unit__see-all-pill">
              {seeAllText}
            </button>
          ) : (
            <button className="reels-unit__see-all">{seeAllText}</button>
          )
        )}
      </div>
      
      {/* Reels H-Scroll - uses cfe-reels-hscroll from aggregation.scss */}
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
                shouldPlay={(sectionInView || autoPlayFirst) && idx === visibleIndex}
                onClick={() => handleReelClick(reel, idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsUnit;
