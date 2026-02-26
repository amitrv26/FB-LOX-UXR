"use client";

/**
 * VideoCard Component
 * Google-style video result card
 */
export default function VideoCard({ 
  video, 
  onClick,
  layout = 'horizontal', // 'horizontal' or 'vertical'
  showSource = true,
}) {
  const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#70757a">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  );

  if (layout === 'vertical') {
    return (
      <div 
        style={{
          flexShrink: 0,
          width: '160px',
          cursor: 'pointer',
        }}
        onClick={() => onClick?.(video)}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#000',
          marginBottom: '8px',
        }}>
          {video.videoSrc ? (
            <video 
              src={video.videoSrc}
              muted
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img 
              src={video.image}
              alt={video.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          {/* Play button */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          {/* Duration */}
          <span style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '500',
            padding: '2px 6px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {video.duration}
          </span>
        </div>
        {/* Title and Source */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            fontSize: '14px',
            color: '#202124',
            margin: '0',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {video.title}
          </p>
          {showSource && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#70757a',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              marginTop: '4px',
            }}>
              <img 
                src="https://www.facebook.com/images/fb_icon_325x325.png"
                alt="Facebook"
                style={{ width: '14px', height: '14px', borderRadius: '4px' }}
              />
              <span style={{ 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                flex: 1,
              }}>
                {video.source} · {video.channel || video.channelName}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <article 
      style={{ 
        display: 'flex',
        gap: '12px',
        cursor: 'pointer',
        marginBottom: '16px',
      }}
      onClick={() => onClick?.(video)}
    >
      {/* Video Thumbnail */}
      <div style={{ 
        position: 'relative',
        flexShrink: 0,
        width: '140px',
        height: '80px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#000',
      }}>
        {video.videoSrc ? (
          <video 
            src={video.videoSrc}
            muted
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img 
            src={video.image} 
            alt={video.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {/* Play Button */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        {/* Duration */}
        <span style={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '500',
          padding: '2px 6px',
          borderRadius: '8px',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {video.duration}
        </span>
      </div>

      {/* Video Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '400', 
          color: '#1a0dab', 
          margin: '0 0 4px',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {video.title}
        </h3>
        
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ 
              fontSize: '13px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              marginBottom: '2px',
            }}>
              <span style={{ color: '#202124' }}>{video.source}</span>
              <span style={{ color: '#70757a' }}> · {video.channelName}</span>
            </div>
            
            <div style={{ 
              fontSize: '13px',
              color: '#70757a',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              {video.postedTime}
            </div>
          </div>
          
          <button 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '4px',
              marginRight: '-4px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

