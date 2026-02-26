"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FacebookIcon as FacebookIconBase } from "../icons";

// Facebook "f" icon - color adjusts based on dark mode
const FacebookIcon = ({ darkMode }) => (
  <FacebookIconBase size={48} color={darkMode ? "#2D88FF" : "#0866ff"} />
);

// FDS Dark Mode Colors
const darkModeColors = {
  background: '#242526',
  surface: '#3A3B3C',
  handle: '#3E4042',
  primaryText: '#E4E6EB',
  secondaryText: '#B0B3B8',
  overlay: 'rgba(0, 0, 0, 0.7)',
  primaryButton: '#FFFFFF', // FDS dark mode primary button is white
  primaryButtonText: '#050505', // Black text on white button
  secondaryButton: '#3A3B3C',
  secondaryButtonText: '#E4E6EB',
};

// FDS Light Mode Colors
const lightModeColors = {
  background: '#ffffff',
  surface: '#f0f2f5',
  handle: '#e4e6eb',
  primaryText: '#080809',
  secondaryText: '#65686c',
  overlay: 'rgba(0, 0, 0, 0.4)',
  primaryButton: '#0866ff',
  primaryButtonText: '#ffffff', // White text on blue button
  secondaryButton: '#e4e6eb',
  secondaryButtonText: '#080809',
};

// Check if image is already in browser cache (via preload hints in layout.js)
const isImageCached = (src) => {
  if (typeof window === 'undefined' || !src) return false;
  const img = new Image();
  img.src = src;
  return img.complete;
};

const LoginPromptSheet = ({ 
  isOpen, 
  onClose, 
  title = "Log in to continue",
  message = "Log in to see more from Facebook.",
  primaryLabel = "Open app",
  secondaryLabel = "Log in",
  darkMode = false,
  illustration = null, // Optional custom illustration image path
}) => {
  const sheetRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(() => !illustration || isImageCached(illustration));
  const [contentVisible, setContentVisible] = useState(false);
  
  // Select color scheme based on dark mode
  const colors = darkMode ? darkModeColors : lightModeColors;

  // Check if illustration is loaded from browser cache (via preload hints)
  useEffect(() => {
    if (illustration) {
      if (isImageCached(illustration)) {
        setImageLoaded(true);
      } else {
        // Fallback: load if not cached
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = illustration;
      }
    } else {
      // No illustration, mark as loaded immediately
      setImageLoaded(true);
    }
  }, [illustration]);

  // Ensure we only render the portal after mounting (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger content fade-in after sheet slides up
  useEffect(() => {
    if (isOpen && !isAnimatingOut) {
      // Delay content appearance to sync with slide animation
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

  const handleOpenApp = () => {
    // Deep link to Facebook app, fallback to app store
    const fbAppLink = "fb://";
    const appStoreLink = "https://apps.apple.com/app/facebook/id284882215";
    
    // Try to open the app
    window.location.href = fbAppLink;
    
    // Fallback to app store after a short delay
    setTimeout(() => {
      window.location.href = appStoreLink;
    }, 500);
  };

  const handleLogin = () => {
    window.location.href = "https://www.facebook.com/login";
  };

  if (!isOpen && !isAnimatingOut) return null;

  // Don't render portal until mounted (client-side only)
  if (!mounted) return null;

  const sheetContent = (
    <>
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes upsellSheetSlideUp {
          from {
            transform: translateY(100%);
            opacity: 0.8;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes upsellSheetSlideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0.8;
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

      {/* Backdrop overlay - sits behind the sheet but above everything else */}
    <div 
      className="login-prompt-overlay" 
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
            : 'upsellOverlayFadeIn 0.2s ease-out forwards'
        }}
      />

      {/* Bottom sheet - positioned to overlay on top of tab bar */}
      <div 
        className="login-prompt-sheet" 
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
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          willChange: 'transform, opacity'
        }}
      >
        {/* Handle */}
        <div style={{
          width: '40px',
          height: '4px',
          backgroundColor: colors.handle,
          borderRadius: '2px',
          margin: '12px auto 4px'
        }} />
        
        <div style={{ 
          padding: '0 16px 24px',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
        }}>
          {/* Icon or Illustration - fixed height container to prevent layout shift */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: illustration ? '16px' : '12px',
            marginBottom: illustration ? '12px' : '8px',
            minHeight: illustration ? '80px' : '48px' // Reserve space for icon/illustration
          }}>
            {illustration ? (
              <img 
                src={illustration} 
                alt="" 
                style={{ 
                  width: '116px', 
                  height: 'auto', 
                  objectFit: 'contain',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.15s ease-out'
                }} 
              />
            ) : (
              <FacebookIcon darkMode={darkMode} />
            )}
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '24px',
            letterSpacing: '0.38px',
            textAlign: 'center',
            color: colors.primaryText,
            margin: '0 0 4px'
          }}>{title}</h2>
          
          {/* Message */}
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '20px',
            textAlign: 'center',
            color: colors.secondaryText,
            margin: '0 0 16px'
          }}>{message}</p>

          {/* Buttons - FDS Stacking Button Group (Medium size) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Primary Button - Open app */}
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
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
            >
              {primaryLabel}
            </button>

            {/* Secondary Button - Gray (Log in) */}
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
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Use portal to render at document body level, bypassing any parent stacking contexts
  return createPortal(sheetContent, document.body);
};

export default LoginPromptSheet;
