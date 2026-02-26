"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon";

const SHARE_TARGETS = [
  { key: "copy-link", icon: "link-outline", label: "Copy link" },
  { key: "messages", icon: "comment-filled", label: "Messages" },
  { key: "whatsapp", icon: "app-whatsapp-filled", label: "WhatsApp" },
  { key: "more", icon: "dots-3-horizontal-filled", label: "More" },
];

const font = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

const ShareSheet = ({ isOpen, onClose }) => {
  const sheetRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
    return () => { document.body.style.overflow = ""; };
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

  const handleOptionClick = (key) => {
    if (key === "copy-link") {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
    handleClose();
  };

  if (!isOpen && !isAnimatingOut) return null;
  if (!mounted) return null;

  const sheetContent = (
    <>
      <style jsx global>{`
        @keyframes shareSheetSlideUp {
          from { transform: translateY(100%); opacity: 0.8; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shareSheetSlideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0.8; }
        }
        @keyframes shareOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shareOverlayFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)", zIndex: 9998,
          animation: isAnimatingOut
            ? "shareOverlayFadeOut 0.2s ease-out forwards"
            : "shareOverlayFadeIn 0.2s ease-out forwards",
        }}
      />

      <div
        ref={sheetRef}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          backgroundColor: "#ffffff",
          borderRadius: "16px 16px 0 0",
          maxWidth: "500px", marginLeft: "auto", marginRight: "auto",
          zIndex: 9999,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
          animation: isAnimatingOut
            ? "shareSheetSlideDown 0.25s cubic-bezier(0.32, 0, 0.67, 0) forwards"
            : "shareSheetSlideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          willChange: "transform, opacity",
        }}
      >
        {/* Handle */}
        <div style={{ width: "40px", height: "4px", backgroundColor: "#e4e6eb", borderRadius: "2px", margin: "12px auto 0" }} />

        <div
          style={{
            padding: "16px 16px 24px",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
          }}
        >
          {/* Title */}
          <p style={{
            fontFamily: font, fontSize: "17px", fontWeight: 700,
            lineHeight: "22px", letterSpacing: "normal",
            color: "#050505", margin: "0 0 16px",
          }}>Share to</p>

          {/* Icons row */}
          <div style={{ display: "flex", gap: "16px" }}>
            {SHARE_TARGETS.map((target) => (
              <button
                key={target.key}
                onClick={() => handleOptionClick(target.key)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "8px", background: "none", border: "none", cursor: "pointer",
                  padding: 0, width: "60px", flexShrink: 0,
                }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  backgroundColor: "#e4e6eb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={target.icon} size={24} color="primary" />
                </div>
                <span style={{
                  fontFamily: font, fontSize: "13px", fontWeight: 400,
                  lineHeight: "16px", letterSpacing: "normal",
                  color: "#050505", textAlign: "center",
                }}>{target.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(sheetContent, document.body);
};

export default ShareSheet;
