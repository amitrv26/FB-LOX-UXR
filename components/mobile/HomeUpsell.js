"use client";

/**
 * HomeUpsell Component
 * "Join the 3 billion" upsell shown at the top of the home feed
 * 
 * Design based on Figma node 915:40047
 */
export default function HomeUpsell({ onLogin }) {
  return (
    <div style={{
      background: '#ffffff',
      width: '100%',
    }}>
      {/* Media frame with illustration */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8px',
        paddingBottom: '12px',
        background: '#ffffff',
      }}>
        <img
          src="/illustrations/reactions.png"
          alt="Join the conversation"
          style={{
            width: '136px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Text content and button container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '0 12px 12px 12px',
        }}>
          {/* Text Pairing - Headline + Body */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            textAlign: 'center',
          }}>
            {/* Headline 2 Emphasized */}
            <h2 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: '28px',
              letterSpacing: 'normal',
              color: '#080809',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              Join the 3 billion
            </h2>

            {/* Body 2 */}
            <p style={{
              margin: '0 auto',
              maxWidth: 'calc(100% - 40px)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: 'normal',
              color: '#080809',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              See what people are loving, listing, and talking about right now.
            </p>
          </div>

          {/* Log in button - Primary deemphasized, Medium size */}
          <button
            type="button"
            onClick={onLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '36px',
              padding: '0 16px',
              background: '#ebf5ff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            <span style={{
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: 'normal',
              color: '#0866ff',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              Log in
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

