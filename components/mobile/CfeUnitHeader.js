"use client";

import Icon from "../Icon";

// Unit Header - section header (Blueprint styling)
// Single line with bold text before colon, regular text after
// Supports collapsible sections with chevron
export default function CfeUnitHeader({ title, isCollapsed = false, onToggle }) {
  // Parse title to split at colon for styling
  const colonIndex = title.indexOf(':');
  
  const boldPart = colonIndex !== -1 ? title.substring(0, colonIndex + 1) : title;
  const regularPart = colonIndex !== -1 ? title.substring(colonIndex + 1) : '';
  
  return (
    <button 
      className="cfe-unit-header"
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'none',
        border: 'none',
        padding: '0 12px',
        cursor: onToggle ? 'pointer' : 'default',
        textAlign: 'left',
        gap: '12px',
      }}
    >
      <p
        style={{
          // Body 3
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: 'normal',
          color: '#080809',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          flex: 1,
        }}
      >
        <span style={{ fontWeight: 700 }}>{boldPart}</span>
        {regularPart}
      </p>
      {onToggle && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <Icon 
            name={isCollapsed ? "chevron-down-circle-outline" : "chevron-up-circle-outline"} 
            size={20} 
            color="secondary" 
          />
        </div>
      )}
    </button>
  );
}
