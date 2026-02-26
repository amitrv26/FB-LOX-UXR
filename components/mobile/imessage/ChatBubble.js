"use client";

/**
 * ChatBubble Component
 * Reusable iMessage-style chat bubble
 * 
 * Props:
 * - text: The message text
 * - isSent: Whether this is a sent message (blue) or received (gray)
 * - children: Optional custom content (for link previews, etc.)
 * - maxWidth: Optional max width override (default: 75%)
 */
export default function ChatBubble({ 
  text, 
  isSent = false, 
  children, 
  maxWidth = '75%',
  style = {} 
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isSent ? 'flex-end' : 'flex-start',
      marginBottom: '4px',
      ...style,
    }}>
      {children || (
        <div style={{
          background: isSent ? '#007AFF' : '#e9e9eb',
          borderRadius: '18px',
          padding: '10px 14px',
          maxWidth,
        }}>
          <span style={{
            fontSize: '17px',
            color: isSent ? '#fff' : '#000',
            lineHeight: '1.35',
          }}>
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

