"use client";

/**
 * GoogleDivider Component
 * Standard Google-style divider line
 */
export default function GoogleDivider({ 
  marginTop = '12px',
  marginBottom = '12px',
  height = '4px'
}) {
  return (
    <div style={{ 
      backgroundColor: '#dadce0', 
      marginLeft: '-16px',
      marginRight: '-16px',
      marginTop,
      marginBottom,
      height
    }} />
  );
}

