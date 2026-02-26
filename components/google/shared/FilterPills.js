"use client";

/**
 * FilterPills Component
 * Horizontal scrolling filter pills for Google-style search results
 */
export default function FilterPills({ 
  filters = [],
  activeFilter = null,
  onFilterClick 
}) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        marginTop: '16px',
        marginLeft: '-16px',
        marginRight: '-16px', 
        marginBottom: '12px',
        padding: '0 16px',
        WebkitOverflowScrolling: 'touch'
      }}
      className="hide-scrollbar"
    >
      {filters.map((filter) => (
        <button 
          key={typeof filter === 'string' ? filter : filter.id}
          onClick={() => onFilterClick?.(filter)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 14px',
            background: activeFilter === filter ? '#e8eaed' : '#fff',
            border: '1px solid #dadce0',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#202124',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {typeof filter === 'string' ? filter : filter.label}
        </button>
      ))}
    </div>
  );
}

