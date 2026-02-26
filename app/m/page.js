"use client";

export default function MobileLandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingBottom: "calc(173px + env(safe-area-inset-bottom, 0px))" }}>
      <div
        style={{
          marginTop: "66px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/home-hero.png"
          alt=""
          style={{ width: "233px", height: "328px", aspectRatio: "103/145", display: "block" }}
        />
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "12px 24px 0",
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
