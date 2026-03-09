"use client";

import { useUseCase } from "../../contexts/UseCaseContext";

export default function MobileLandingPage() {
  const { openBottomSheet } = useUseCase();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingBottom: "calc(173px + env(safe-area-inset-bottom, 0px))" }}>
      <div
        onClick={() => openBottomSheet({ selectedCategory: null })}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          padding: "12px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
          cursor: "pointer",
        }}
      >
        <img
          src="/images/facebook-wordmark.png"
          alt="Facebook"
          style={{ height: "24px", width: "auto" }}
        />
      </div>
      <div
        style={{
          marginTop: "66px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "351px",
            height: "328px",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/home-hero.png"
            alt=""
            style={{
              position: "absolute",
              top: "8.74%",
              left: "-18.52%",
              width: "137.04%",
              height: "82.51%",
              maxWidth: "none",
              display: "block",
            }}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "0 24px 0",
          marginTop: "-5px",
        }}
      >
        <h1
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "34px",
            letterSpacing: "normal",
            color: "#050505",
            margin: "0 0 8px 0",
          }}
        >
          Join the 3 billion
        </h1>
        <p
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "normal",
            color: "#65676b",
            margin: 0,
          }}
        >
          See what people are loving, listing, and talking about right now.
        </p>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "calc(81px + env(safe-area-inset-bottom, 0px))",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0 16px",
        }}
      >
        <button
          onClick={() => {
            window.location.href = "fb://";
            setTimeout(() => {
              const ua = navigator.userAgent || "";
              if (/android/i.test(ua)) {
                window.location.href = "https://play.google.com/store/apps/details?id=com.facebook.katana";
              } else {
                window.location.href = "https://apps.apple.com/app/facebook/id284882215";
              }
            }, 500);
          }}
          style={{
            width: "100%",
            padding: "10px 16px",
            background: "#0866ff",
            border: "none",
            borderRadius: "8px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "20px",
            letterSpacing: "normal",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Open Facebook app
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px 16px",
            background: "#e4e6eb",
            border: "none",
            borderRadius: "8px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "20px",
            letterSpacing: "normal",
            color: "#050505",
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
