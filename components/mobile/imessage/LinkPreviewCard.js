"use client";

/**
 * LinkPreviewCard Component
 * iMessage-style link preview card for videos and products
 * 
 * Props:
 * - type: 'video' | 'product'
 * - title: Title of the content
 * - subtitle: Custom subtitle (e.g., "2.8M views | Reel by Netflix")
 * - domain: Domain to display (e.g., "facebook.com")
 * - image: Image URL (for products)
 * - videoSrc: Video source URL (for videos)
 * - duration: Video duration (for videos)
 * - price: Product price (for products)
 * - bubbleColor: Background color for video link preview bubble
 * - onClick: Click handler
 * - disabled: Whether the card is disabled
 */
export default function LinkPreviewCard({
  type = 'video',
  title,
  subtitle,
  domain = 'facebook.com',
  image,
  videoSrc,
  duration,
  price,
  bubbleColor,
  onClick,
  disabled = false,
  children,
}) {
  const isVideo = type === 'video';
  
  // For video type, use the new Figma-style design with dark bubble
  if (isVideo) {
    // Default to a dark red that matches Stranger Things aesthetic
    const bgColor = bubbleColor || '#60180c';
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: '85%',
        marginBottom: '4px',
      }}>
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            background: bgColor,
            borderRadius: '20px',
            overflow: 'hidden',
            border: 'none',
            padding: 0,
            cursor: disabled ? 'default' : 'pointer',
            textAlign: 'left',
            width: '214px',
            position: 'relative',
          }}
        >
          {/* Video thumbnail section */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '265px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            overflow: 'hidden',
          }}>
            <video
              src={`${videoSrc}#t=1`}
              muted
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Play button overlay - matching Figma design */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              {/* Outer blur circle */}
              <div style={{
                width: '62px',
                height: '62px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Play icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {children}
          </div>

          {/* Text section - Figma style */}
          <div style={{ 
            padding: '10px 12px 12px',
          }}>
            {/* Title/subtitle - Headline 4 Emphasized style */}
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              marginBottom: '2px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>
              {subtitle || title}
            </div>
            {/* Domain - Meta 4 style */}
            <div style={{
              fontSize: '12px',
              fontWeight: '400',
              color: '#B0B3B8',
              lineHeight: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}>{domain}</div>
          </div>
        </button>
        
      </div>
    );
  }
  
  // Product type - keep original style
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      maxWidth: '85%',
      marginBottom: '4px',
    }}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          background: '#f2f2f7',
          borderRadius: '18px',
          overflow: 'hidden',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'default' : 'pointer',
          textAlign: 'left',
          width: '270px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        {/* Media section */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '150px',
        }}>
              <img
                src={image}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Price badge */}
              {price && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#fff',
                  }}>{price}</span>
                </div>
              )}
              {/* Marketplace icon badge */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0866ff">
                  <path d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1zM10 5h4v1h-4V5zm8 14H6V8h12v11z"/>
                </svg>
              </div>
          {children}
        </div>

        {/* Link info */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#000',
            lineHeight: '1.3',
            marginBottom: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{title}</div>
          <div style={{
            fontSize: '13px',
            color: '#8e8e93',
            fontWeight: '400',
          }}>{domain}</div>
        </div>
      </button>
    </div>
  );
}

