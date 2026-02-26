"use client";

// Experience type options
const EXPERIENCE_TYPES = [
  { key: 'ai-forward', label: 'AI-Forward' },
  { key: 'content-forward', label: 'Content-Forward' },
  { key: 'logged-out-search', label: 'Logged-Out Search' },
  { key: 'immersive-view', label: 'Immersive View' },
  { key: 'grid-view', label: 'Grid View' },
];

export default function ExperienceTypeBottomSheet({ 
  isOpen, 
  onClose, 
  selectedType,
  onTypeChange
}) {
  if (!isOpen) return null;

  const handleTypeSelect = (type) => {
    onTypeChange(type);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#f2f4f7',
          borderRadius: '16px 16px 0 0',
          width: '100%',
          maxWidth: '500px',
          paddingBottom: '32px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontSize: '17px', 
          fontWeight: 700, 
          margin: 0,
          padding: '16px 12px',
          textAlign: 'center',
          color: '#080809',
          letterSpacing: '-0.41px',
          lineHeight: '20px',
        }}>
          Select experience type
        </h3>
        
        {/* Experience Types Section */}
        <div style={{ padding: '0 12px' }}>
          {/* Experience Type Items - White Card */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '0 12px',
          }}>
            {EXPERIENCE_TYPES.map((item) => (
              <button 
                key={item.key}
                onClick={() => handleTypeSelect(item.key)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minHeight: '44px',
                }}
              >
                <div>
                  <p style={{ 
                    margin: 0, 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#080809',
                    letterSpacing: '-0.41px',
                    lineHeight: '20px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{ 
                    margin: '2px 0 0', 
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#65686c',
                    letterSpacing: '-0.16px',
                    lineHeight: '18px',
                  }}>
                    {item.key === 'ai-forward' && 'Long AI summary with FB content as secondary'}
                    {item.key === 'balanced' && 'Balanced mix of AI summary and content'}
                    {item.key === 'content-forward' && 'AI categorizes content buckets'}
                    {item.key === 'logged-out-search' && 'Search results with AI summaries'}
                    {item.key === 'immersive-view' && 'Full-bleed videos with discussions'}
                    {item.key === 'grid-view' && '2-column grid layout with thumbnails'}
                  </p>
                </div>
                
                {/* Radio Button */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: selectedType === item.key ? 'none' : '2px solid #65686c',
                  background: selectedType === item.key ? '#0866ff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: '12px',
                }}>
                  {selectedType === item.key && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'white',
                    }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

