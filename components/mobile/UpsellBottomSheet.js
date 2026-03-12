"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FacebookIcon as FacebookIconBase } from "../icons";

const FacebookIcon = ({ darkMode }) => (
  <FacebookIconBase size={48} color={darkMode ? "#2D88FF" : "#0866ff"} />
);

const formatCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
};

const UPSELL_CONFIGS = {
  follow: {
    illustration: "/illustrations/follow.png",
    getTitle: (name) => `Follow ${name || ''}`.trim(),
    message: "Log in to follow them on Facebook.",
  },
  like: {
    illustration: "/illustrations/reactions.png",
    getTitle: (_name, count) => `${formatCount(count || 0)} reactions and counting`,
    message: "Add yours in the app.",
  },
  comment: {
    illustration: "/illustrations/comments.png",
    getTitle: (_name, count) => `${formatCount(count || 0)}+ comments and counting`,
    message: "Join the conversation in the app.",
  },
  message: {
    illustration: "/illustrations/messenger-icon.png",
    getTitle: (name) => `Message ${name || ''}`.trim(),
    message: "Log in to contact them directly.",
  },
  save: {
    illustration: "/illustrations/save-mp-items.png",
    getTitle: () => "Good finds go fast",
    message: "Save this and more on the app.",
  },
  joinGroup: {
    illustration: "/illustrations/follow.png",
    getTitle: (name) => `Join ${name || 'this group'}`,
    message: "Log in to join this group on Facebook.",
  },
  join_group: {
    illustration: "/illustrations/follow.png",
    getTitle: (name) => `Join ${name || 'this group'}`,
    message: "Log in to join this group on Facebook.",
  },
  generic: {
    illustration: null,
    getTitle: () => "Log in to continue",
    message: "Log in to see more from Facebook.",
  },
  moreOptions: {
    illustration: null,
    getTitle: () => "More options",
    message: "Log in to access more options.",
  },
};

const darkModeColors = {
  background: '#242526',
  handle: '#3E4042',
  primaryText: '#E4E6EB',
  secondaryText: '#B0B3B8',
  overlay: 'rgba(0, 0, 0, 0.7)',
  primaryButton: '#FFFFFF',
  primaryButtonText: '#050505',
  secondaryButton: '#3A3B3C',
  secondaryButtonText: '#E4E6EB',
};

const lightModeColors = {
  background: '#ffffff',
  handle: '#84878b',
  primaryText: '#080809',
  secondaryText: '#65686c',
  overlay: 'rgba(0, 0, 0, 0.4)',
  primaryButton: '#0866ff',
  primaryButtonText: '#ffffff',
  secondaryButton: '#e2e5e9',
  secondaryButtonText: '#080809',
};

const isImageCached = (src) => {
  if (typeof window === 'undefined' || !src) return false;
  const img = new Image();
  img.src = src;
  return img.complete;
};

const UpsellBottomSheet = ({
  isOpen,
  onClose,
  type = "generic",
  entityName = "",
  count = 0,
  darkMode = false,
}) => {
  const sheetRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const config = UPSELL_CONFIGS[type] || UPSELL_CONFIGS.generic;
  const illustration = config.illustration;
  const title = config.getTitle(entityName, count);
  const message = config.message;
  const colors = darkMode ? darkModeColors : lightModeColors;

  const [imageLoaded, setImageLoaded] = useState(() => !illustration || isImageCached(illustration));

  useEffect(() => {
    if (illustration) {
      if (isImageCached(illustration)) {
        setImageLoaded(true);
      } else {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = illustration;
      }
    } else {
      setImageLoaded(true);
    }
  }, [illustration]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && !isAnimatingOut) {
      const timer = setTimeout(() => setContentVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isOpen, isAnimatingOut]);

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
    if (e.target === e.currentTarget) handleClose();
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 200);
  };

  const handleOpenApp = () => {
    window.location.href = "fb://";
    setTimeout(() => {
      window.location.href = "https://apps.apple.com/app/facebook/id284882215";
    }, 500);
  };

  const handleLogin = () => {
    window.location.href = "/m/login";
  };

  if (!isOpen && !isAnimatingOut) return null;
  if (!mounted) return null;

  const sheetContent = (
    <>
      <style jsx global>{`
        @keyframes upsellSheetSlideUp {
          from { transform: translateY(100%); opacity: 0.8; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes upsellSheetSlideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0.8; }
        }
        @keyframes upsellOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes upsellOverlayFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      <div
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.overlay,
          zIndex: 9998,
          animation: isAnimatingOut
            ? 'upsellOverlayFadeOut 0.2s ease-out forwards'
            : 'upsellOverlayFadeIn 0.2s ease-out forwards',
        }}
      />

      <div
        ref={sheetRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.background,
          borderRadius: '16px 16px 0 0',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxHeight: '90vh',
          zIndex: 9999,
          boxShadow: darkMode ? '0 -4px 20px rgba(0, 0, 0, 0.5)' : '0 -4px 20px rgba(0, 0, 0, 0.15)',
          animation: isAnimatingOut
            ? 'upsellSheetSlideDown 0.25s cubic-bezier(0.32, 0, 0.67, 0) forwards'
            : 'upsellSheetSlideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards',
          willChange: 'transform, opacity',
        }}
      >
        {/* Handle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 0 0',
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            backgroundColor: colors.handle,
            borderRadius: '2px',
          }} />
        </div>

        {/* Content */}
        <div style={{
          padding: '12px 12px 0',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        }}>
          {/* Illustration or Facebook icon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            {illustration ? (
              <div style={{
                width: '132px',
                height: '132px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                overflow: 'hidden',
              }}>
                <img
                  src={illustration}
                  alt=""
                  style={{
                    width: type === 'message' ? '88px' : '100%',
                    height: type === 'message' ? '88px' : '100%',
                    objectFit: 'contain',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.15s ease-out',
                  }}
                />
              </div>
            ) : (
              <FacebookIcon darkMode={darkMode} />
            )}
          </div>

          {/* Text pairing */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
            padding: '0 0 12px',
          }}>
            <h2 style={{
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '17px',
              fontWeight: 700,
              lineHeight: '20px',
              letterSpacing: '-0.41px',
              textAlign: 'center',
              color: colors.primaryText,
            }}>{title}</h2>
            <p style={{
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              textAlign: 'center',
              color: colors.primaryText,
            }}>{message}</p>
          </div>
        </div>

        {/* Persistent CTA */}
        <div style={{
          padding: '0 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <button
            onClick={handleOpenApp}
            style={{
              width: '100%',
              height: '36px',
              backgroundColor: colors.primaryButton,
              color: colors.primaryButtonText,
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: 'normal',
              cursor: 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            Open app
          </button>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              height: '36px',
              backgroundColor: colors.secondaryButton,
              color: colors.secondaryButtonText,
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: 'normal',
              cursor: 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            Log in
          </button>
        </div>

      </div>
    </>
  );

  return createPortal(sheetContent, document.body);
};

export default UpsellBottomSheet;
