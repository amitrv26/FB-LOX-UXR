"use client";

import Icon from "../Icon";

/**
 * HomeFeedPostCard Component
 * Immersive full-bleed post card design matching the SEO video feed style
 * 
 * Based on FeedCarouselPostCard design from feed-video page
 */

// Helper to format counts (e.g., 2847 -> "2.8K")
const formatCount = (count) => {
  if (!count) return "0";
  if (typeof count === 'string') return count;
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

export default function HomeFeedPostCard({
  post,
  onLikeClick,
  onCommentClick,
  onShareClick,
  showCarouselDots = false,
  carouselDotsCount = 5,
}) {
  if (!post || !post.image) return null;

  return (
    <div
      style={{
        position: 'relative',
        margin: '4px 12px 0 12px',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '4/5',
        background: '#000',
      }}
    >
      {/* Full bleed image */}
      <img
        src={post.image}
        alt={post.text || 'Post image'}
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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.3) 65%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Gradient overlay at BOTTOM */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Author info at TOP */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={post.author.avatar || post.profileData?.profileImage}
            alt={post.author.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  lineHeight: '20px',
                  letterSpacing: 'normal',
                  textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
                }}
              >
                {post.author.name}
              </span>
              {post.author.verified && (
                <Icon name="badge-checkmark-filled" size={12} color="onMedia" />
              )}
            </div>
            <div
              style={{
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
              }}
            >
              <span>{post.author.date || post.timestamp}</span>
              <span>·</span>
              <Icon name="globe-americas-filled" size={12} color="onMedia" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom content - pagination dots + caption + UFI */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px',
          zIndex: 2,
        }}
      >
        {/* Pagination Dots */}
        {showCarouselDots && (
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
              {Array.from({ length: carouselDotsCount }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: index === 0 ? 'white' : 'rgba(255,255,255,0.4)',
                    margin: '0 3px',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Caption */}
        <p
          style={{
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
          }}
        >
          {post.text}
        </p>

        {/* UFI */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLikeClick?.();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              paddingRight: '12px',
            }}
          >
            <Icon name="like-outline" size={20} color="onMedia" />
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}
            >
              {formatCount(post.reactions?.count)}
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCommentClick?.();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 12px',
            }}
          >
            <Icon name="comment-outline" size={20} color="onMedia" />
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}
            >
              {formatCount(post.comments)}
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShareClick?.();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 12px',
            }}
          >
            <Icon name="share-outline" size={20} color="onMedia" />
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textShadow: '0 0 0.5px black, 0 0 1px rgba(0,0,0,0.5), 0 0 1.25px rgba(0,0,0,0.4), 0 0 1.5px rgba(0,0,0,0.6)',
              }}
            >
              {formatCount(post.shares)}
            </span>
          </button>
          <div style={{ flex: 1 }} />
          {/* Inline Reactions */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {post.reactions?.like && (
              <img
                src="/images/reactions/like_default_40.png"
                alt="Like"
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
            )}
            {post.reactions?.love && (
              <img
                src="/images/reactions/love_default_40.png"
                alt="Love"
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'relative',
                  marginLeft: '-6px',
                  zIndex: 2,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

