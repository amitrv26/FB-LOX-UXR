"use client";

import { useEffect, useRef, useState } from "react";
import { IconInline } from "../Icon";

const ReviewsSheet = ({ 
  isOpen, 
  onClose,
  businessName = "Rio Theatre",
  recommendedPercent = "92",
  reviewCount = "1,234",
  onLoginPrompt
}) => {
  const sheetRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimatingOut(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 200);
  };

  if (!isOpen && !isAnimatingOut) return null;

  const reviews = [
    { name: "Sarah Chen", recommends: true, text: "Best independent theatre in Vancouver! Love the classic film nights.", avatar: "/images/rio-theatre/1.png" },
    { name: "Mike Thompson", recommends: false, text: "Sound quality could be better, but great selection of films.", avatar: "/images/rio-theatre/2.png" },
    { name: "Jessica Wong", recommends: true, text: "Amazing atmosphere and the staff is super friendly. My favorite!", avatar: "/images/rio-theatre/3.png" },
    { name: "David Park", recommends: true, text: "10/10 would recommend for movie lovers.", avatar: "/images/rio-theatre/4.png" },
  ];

  // Card style for white boxes
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
  };

  return (
    <>
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes upsellSheetSlideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes upsellSheetSlideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
        @keyframes upsellOverlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes upsellOverlayFadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>

      {/* Backdrop overlay */}
      <div 
        className="reviews-sheet-overlay"
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 9998,
          animation: isAnimatingOut 
            ? 'upsellOverlayFadeOut 0.2s ease-out forwards' 
            : 'upsellOverlayFadeIn 0.2s ease-out forwards'
        }}
      />

      {/* White bottom sheet - positioned to overlay on top of tab bar */}
      <div 
        ref={sheetRef}
        className="reviews-sheet"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderRadius: '16px 16px 0 0',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxHeight: '85vh',
          overflowY: 'auto',
          zIndex: 9999,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
          animation: isAnimatingOut 
            ? 'upsellSheetSlideDown 0.2s ease-in forwards' 
            : 'upsellSheetSlideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/* Handle */}
        <div style={{
          width: '40px',
          height: '4px',
          backgroundColor: '#d8dadf',
          borderRadius: '2px',
          margin: '12px auto'
        }} />
        
        <div style={{ padding: '0 12px 24px' }}>
          {/* Card 1: Title, Stats, and Message Button */}
          <div style={cardStyle}>
            {/* Title */}
            <h2 style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '24px',
              color: '#080809',
              margin: '0 0 16px'
            }}>Reviews</h2>
            
            {/* Recommendation Stats */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px',
              marginBottom: '16px'
            }}>
              <IconInline name="star-outline" size={24} color="primary" />
              <div>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  letterSpacing: '-0.24px',
                  color: '#080809',
                  margin: 0
                }}>{recommendedPercent}% recommended</p>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '16px',
                  letterSpacing: '-0.08px',
                  color: '#080809',
                  margin: 0
                }}>Based on the opinions of {reviewCount} people.</p>
              </div>
            </div>

            {/* Message CTA */}
            <button 
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: '#e4e6eb',
                color: '#080809',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IconInline name="app-messenger-filled" size={16} color="primary" />
              Message {businessName}
            </button>
          </div>

          {/* Card 2: Recent Reviews Header and Poll */}
          <div style={cardStyle}>
            {/* Recent Reviews Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <h3 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '17px',
                fontWeight: 700,
                lineHeight: '20px',
                letterSpacing: '-0.41px',
                color: '#080809',
                margin: 0
              }}>Recent reviews</h3>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '20px',
                letterSpacing: '-0.24px',
                color: '#0866ff',
                cursor: 'pointer'
              }}>See all</span>
            </div>

            {/* Poll Question / Contextual Message */}
            <div style={{ 
              backgroundColor: '#f0f2f5',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                {/* Facebook icon */}
                <IconInline name="app-facebook-circle-filled" size={24} style={{ color: '#0866ff' }} />
                
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: 'normal',
                    color: '#080809',
                    margin: '0 0 4px',
                  }}>Tell others what you think</p>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '16px',
                    letterSpacing: 'normal',
                    color: '#65676b',
                    margin: 0,
                  }}>Log in to share your experience and see what else your friends are recommending.</p>
                </div>
              </div>
              {/* Stacking Button Group */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  onClick={() => {
                    const fbAppLink = "fb://";
                    const appStoreLink = "https://apps.apple.com/app/facebook/id284882215";
                    window.location.href = fbAppLink;
                    setTimeout(() => { window.location.href = appStoreLink; }, 500);
                  }}
                  style={{
                    width: '100%',
                    height: '36px',
                    backgroundColor: '#0866ff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}
                >Open app</button>
                <button 
                  onClick={() => {
                    window.location.href = "https://www.facebook.com/login";
                  }}
                  style={{
                    width: '100%',
                    height: '36px',
                    backgroundColor: '#e4e6eb',
                    color: '#080809',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}
                >Log in</button>
              </div>
            </div>
          </div>

          {/* Card 3: Reviews List */}
          <div style={{ ...cardStyle, marginBottom: 0 }}>
            {reviews.map((review, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px',
                  padding: '8px 0',
                }}
              >
                <img 
                  src={review.avatar}
                  alt={review.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: '-0.24px',
                    color: '#080809',
                    margin: '0 0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    {review.name} <IconInline name="star-circle-filled" size={16} style={{ color: review.recommends ? '#f02849' : '#65676b' }} /> {review.recommends ? 'recommends' : 'does not recommend'}
                  </p>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '16px',
                    letterSpacing: '-0.08px',
                    color: '#65676b',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsSheet;

