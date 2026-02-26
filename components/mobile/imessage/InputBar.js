"use client";

/**
 * InputBar Component
 * iMessage-style input bar with add button and microphone
 * 
 * Props:
 * - placeholder: Placeholder text (default: "iMessage")
 * - onSend: Optional handler for send action
 */
export default function InputBar({ 
  placeholder = "iMessage",
  onSend 
}) {
  return (
    <div style={{
      background: 'rgba(246, 246, 246, 0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: '0.5px solid rgba(0,0,0,0.08)',
      padding: '8px 12px',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {/* Add button */}
      <button style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.05)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Text input */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '0.5px solid rgba(0,0,0,0.1)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: '17px',
          color: '#c7c7cc',
        }}>{placeholder}</span>
      </div>

      {/* Microphone button */}
      <button style={{
        width: '32px',
        height: '32px',
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
          <rect x="4" y="1" width="10" height="16" rx="5" stroke="#007AFF" strokeWidth="1.5"/>
          <path d="M1 11V12C1 16.4183 4.58172 20 9 20C13.4183 20 17 16.4183 17 12V11" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9 20V23" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

