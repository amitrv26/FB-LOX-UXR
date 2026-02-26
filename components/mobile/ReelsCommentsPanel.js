"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Dark-themed comment component for reels
const ReelsComment = ({ comment, onReply, onLikeComment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalReactions = comment.reactions
    ? Object.values(comment.reactions).reduce((sum, count) => sum + count, 0)
    : 0;
  
  const handleLike = () => {
    // Pass the reaction count to the parent for the upsell sheet
    onLikeComment?.(totalReactions);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '8px 12px',
    }}>
      {/* Avatar */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img 
          src={comment.author.avatar} 
          alt={comment.author.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Author + Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '2px',
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            {comment.author.name}
          </span>
          <span style={{
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}>
            · {comment.time}
          </span>
        </div>
        
        {/* Comment Text */}
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          color: '#ffffff',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          wordWrap: 'break-word',
        }}>
          {comment.text}
        </p>
        
        {/* Actions Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '4px',
          height: '32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <button
              onClick={onReply}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              Reply
            </button>
            
            {totalReactions > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <img 
                  src="/images/reactions/like_default_40.png" 
                  alt="Like" 
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}>
                  {totalReactions}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLike}
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" 
                fill="rgba(255,255,255,0.5)"
              />
            </svg>
          </button>
        </div>
        
        {/* Replies */}
        {comment.replyCount > 0 && (
          <>
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  padding: '4px 0',
                  cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
                  <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                }}>
                  View {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                </span>
              </button>
            ) : (
              <div style={{ marginTop: '8px', marginLeft: '-8px' }}>
                {comment.replies?.map((reply) => (
                  <ReelsComment 
                    key={reply.id} 
                    comment={reply} 
                    onReply={onReply}
                    onLikeComment={onLikeComment}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Main comments panel component - slides up from bottom, positioned below shrunk video
const ReelsCommentsPanel = ({ 
  isOpen, 
  onClose,
  comments = [],
  totalCount = 0,
  onCommentPromptClick,
  onLikeComment,
}) => {
  const panelRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef(0);
  const panelHeight = useRef(0);
  
  // Get viewport height for positioning
  const [viewportHeight, setViewportHeight] = useState(800);
  
  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate panel top position based on shrunk video
  // Minimized video: 173x230px (80% of original) at y=44 (below header)
  // Comments should start at y=286 (44 + 230 + 12px gap)
  const safeAreaTop = 44; // Safe area + header  
  const shrunkVideoHeight = 230;
  const gap = 12;
  const panelTop = safeAreaTop + shrunkVideoHeight + gap; // 286px from top

  // Handle drag to dismiss - swipe down anywhere on the panel (except comments list which stops propagation)
  const handleTouchStart = useCallback((e) => {
    dragStartY.current = e.touches[0].clientY;
    panelHeight.current = panelRef.current?.offsetHeight || viewportHeight * 0.55;
    setIsDragging(true);
  }, [viewportHeight]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;
    
    // Only allow dragging down
    if (diff > 0) {
      setDragOffset(diff);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // If dragged more than 30% of panel height, close
    if (dragOffset > panelHeight.current * 0.3) {
      onClose();
    }
    
    setDragOffset(0);
  }, [isDragging, dragOffset, onClose]);

  // Calculate sheet height - from panelTop to bottom of screen
  const sheetHeight = viewportHeight - panelTop;

  return (
    <>
      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        .comments-list-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Backdrop - tap to close (covers entire screen behind panel) */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 350ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      />

      {/* Comments Bottom Sheet - positioned below shrunk video */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: isOpen ? `calc(env(safe-area-inset-top, 0px) + ${panelTop}px)` : '100%',
          bottom: 0,
          background: '#1a1a1a',
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          transform: isOpen && dragOffset > 0 ? `translateY(${dragOffset}px)` : 'none',
          transition: isDragging 
            ? 'none' 
            : 'top 350ms cubic-bezier(0.32, 0.72, 0, 1), transform 350ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div 
          className="comments-handle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 0',
            cursor: 'grab',
            flexShrink: 0,
          }}
        >
          <div style={{
            width: '40px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
          }} />
        </div>

        {/* Comments List */}
        <div 
          className="comments-list-container"
          style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          {comments.map((comment) => (
            <ReelsComment
              key={comment.id}
              comment={comment}
              onReply={onCommentPromptClick}
              onLikeComment={onLikeComment}
            />
          ))}
        </div>

        {/* Comment Composer - full width, no avatar */}
        <div style={{
          paddingTop: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
          borderTop: '0.5px solid rgba(255, 255, 255, 0.1)',
          background: '#1a1a1a',
          flexShrink: 0,
        }}>
          <button
            onClick={onCommentPromptClick}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              minHeight: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              Log in to comment
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReelsCommentsPanel;
