"use client";

const FACEBOOK_WORDMARK_URL = "/images/facebook-wordmark.png";

export default function EndOfFeedUpsell({ hideWordmark = false }) {
  const handleOpenApp = () => {
    window.location.href = "fb://";
    setTimeout(() => {
      window.location.href = "https://apps.apple.com/app/facebook/id284882215";
    }, 500);
  };

  const handleLogin = () => {
    window.location.href = "https://www.facebook.com/login";
  };

  return (
    <div style={{
      background: '#ffffff',
      width: '100%',
    }}>
      {/* Upper separator line */}
      <div style={{
        height: '1px',
        background: '#ccd0d5',
        width: '100%',
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

      {/* Illustration */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '12px',
      }}>
        <svg width="64" height="66" viewBox="0 0 64 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="33" r="28" fill="#ebf5ff" />
          <circle cx="32" cy="33" r="20" fill="#c2dbff" />
          <path d="M24 33L29.5 38.5L40.5 27.5" stroke="#0866ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
          lineHeight: '20px',
          letterSpacing: '-0.41px',
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
          letterSpacing: '-0.24px',
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
