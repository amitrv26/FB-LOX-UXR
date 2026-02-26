"use client";

/**
 * ChatHeader Component
 * iMessage-style header with avatar, name pill, and glass buttons
 * 
 * Props:
 * - friend: Object with name and avatar URL
 * - onBackClick: Handler for back button
 * - showVideoCall: Whether to show video call button (default: true)
 */
export default function ChatHeader({ 
  friend, 
  onBackClick, 
  showVideoCall = true 
}) {
  const glassButtonStyle = {
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    pointerEvents: 'auto',
  };

  return (
    <>
      {/* Header gradient overlay - sits on top of messages */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '160px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
        pointerEvents: 'none',
        zIndex: 10,
      }} />

      {/* Header controls - on top of gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '160px',
        zIndex: 15,
        pointerEvents: 'none',
      }}>
        {/* Back button - liquid glass circle */}
        <button 
          onClick={onBackClick}
          style={{
            ...glassButtonStyle,
            position: 'absolute',
            top: '50px',
            left: '12px',
            paddingRight: '2px',
          }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Video call button - liquid glass circle */}
        {showVideoCall && (
          <button style={{
            ...glassButtonStyle,
            position: 'absolute',
            top: '50px',
            right: '12px',
          }}>
            <svg width="18" height="12" viewBox="0 0 22 14" fill="none">
              <rect x="1" y="1" width="14" height="12" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
              <path d="M15 5L20 2V12L15 9V5Z" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            </svg>
          </button>
        )}

        {/* Name pill - liquid glass */}
        <button style={{
          position: 'absolute',
          top: '110px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: 'none',
          borderRadius: '14px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          pointerEvents: 'auto',
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#000',
            letterSpacing: '-0.2px',
          }}>{friend.name}</span>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Centered avatar - overlaps the name pill slightly */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          zIndex: 5,
        }}>
          <img
            src={friend.avatar}
            alt={friend.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          />
        </div>
      </div>
    </>
  );
}

