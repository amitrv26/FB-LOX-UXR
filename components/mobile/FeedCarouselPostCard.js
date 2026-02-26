"use client";

import { useState, useEffect } from "react";
import Icon from "../Icon";

// Chevron Down Icon for Scroll indicator
const ChevronDownIcon = ({ size = 16, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M4.47 5.97a.75.75 0 0 1 1.06 0L8 8.44l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06z"/>
  </svg>
);

// Carousel Post Card (separate unit with pagination dots - extracted from feed-video page)
export default function FeedCarouselPostCard({ 
  post, 
  onLikeClick,
  onCommentClick,
  onShareClick,
  hideScrollIndicator = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Show scroll indicator after 1.5 seconds (unless hidden)
  useEffect(() => {
    if (hideScrollIndicator) return;
    
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [hideScrollIndicator]);

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

  if (!post || !post.items || post.items.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes bounceUpDown {
          0%, 100% {
            transform: translate(-50%, -50%);
          }
          50% {
            transform: translate(-50%, calc(-50% + 8px));
          }
        }
      `}</style>
      <div 
        style={{
          position: 'relative',
          margin: '4px 12px 0 12px',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '4/5',
          background: '#000',
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

        {/* Scroll for more indicator - appears after 1.5s with bounce animation */}
        {showScrollIndicator && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
            animation: 'bounceUpDown 1.5s ease-in-out infinite',
          }}>
            <span style={{
              color: 'white',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: '16px',
              textShadow: '0 1px 3px rgba(0,0,0,0.7)',
            }}>
              Scroll for more
            </span>
            <ChevronDownIcon size={20} color="white" />
          </div>
        )}

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
                  letterSpacing: 'normal',
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
                fontWeight: 400,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}>
                <span>{post.timestamp}</span>
                <span>·</span>
                <span>{post.location}</span>
              </div>
            </div>
          </div>
        </div>

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
                  type="button"
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
              }}>{post.stats.likes}</span>
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
              }}>{post.stats.comments}</span>
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
              }}>{post.stats.shares}</span>
            </button>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '20px', height: '20px', position: 'relative', zIndex: 3 }} />
              <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '20px', height: '20px', position: 'relative', marginLeft: '-6px', zIndex: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

