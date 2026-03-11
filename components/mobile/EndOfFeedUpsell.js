"use client";

const FACEBOOK_WORDMARK_URL = "/images/facebook-wordmark.png";

export default function EndOfFeedUpsell({ hideWordmark = false }) {
  const handleOpenApp = () => {
    window.location.href = "fb://";
    setTimeout(() => {
      const ua = navigator.userAgent || "";
      if (/android/i.test(ua)) {
        window.location.href = "https://play.google.com/store/apps/details?id=com.facebook.katana";
      } else {
        window.location.href = "https://apps.apple.com/app/facebook/id284882215";
      }
    }, 500);
  };

  const handleLogin = () => {
    window.location.href = "https://www.facebook.com/login";
  };

  return (
    <div style={{
      background: '#ffffff',
      width: '100%',
      flexShrink: 0,
    }}>
      {/* Upper separator line */}
      <hr style={{
        margin: 0,
        padding: 0,
        border: 'none',
        borderTop: '1px solid #ccd0d5',
        width: '100%',
        display: 'block',
      }} />

      {!hideWordmark && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #e4e6eb',
        }}>
          <img
            src={FACEBOOK_WORDMARK_URL}
            alt="Facebook"
            style={{ height: '20px' }}
          />
        </div>
      )}

      {/* Illustration - 64x64 check icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '12px',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ display: 'block', width: '64px', height: '64px', flexShrink: 0 }}>
          <defs>
            <linearGradient id="eofGrad1" x1="5.93" y1="8.24" x2="33.77" y2="54.99" gradientUnits="userSpaceOnUse">
              <stop stopColor="#42BDFF"/>
              <stop offset="0.78" stopColor="#0866FF"/>
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="32" fill="url(#eofGrad1)"/>
          <path d="M44.35 21.6C45.68 20.32 47.79 20.36 49.07 21.68C50.34 23.01 50.31 25.12 48.98 26.4L29.65 45.06C28.36 46.31 26.32 46.31 25.02 45.07L16.36 36.74C15.03 35.46 14.99 33.35 16.26 32.02C17.54 30.7 19.65 30.65 20.98 31.93L27.33 38.04L44.35 21.6Z" fill="white"/>
        </svg>
      </div>

      {/* Text content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '0 12px',
        textAlign: 'center',
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '17px',
          fontWeight: 700,
          lineHeight: '22px',
          letterSpacing: 'normal',
          color: '#080809',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          There&apos;s always more to see
        </h3>
        <p style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: 'normal',
          color: '#080809',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}>
          Open the app to see what&apos;s happening right now.
        </p>
      </div>

      {/* Stacking button group */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
      }}>
        <button
          onClick={handleOpenApp}
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
            backgroundColor: '#e2e5e9',
            color: '#080809',
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
  );
}
