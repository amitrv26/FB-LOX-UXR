"use client";

/**
 * VideoResults Component
 * Displays video search results in Google-style layout
 */

import { MoreIcon, ChevronRightIcon } from './Icons';
import { GoogleDivider, VideoCard } from './shared';

export default function VideoResults({ 
  videos = [], 
  shortVideos = [],
  title = "Videos",
  showViewAll = true,
  onVideoClick,
  onViewAllClick,
}) {
  if (!videos.length && !shortVideos.length) {
    return null;
  }

  return (
    <section style={{ marginBottom: '16px' }}>
      {/* Main Videos Section */}
      {videos.length > 0 && (
        <>
          {/* Section Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '400', 
              color: '#202124', 
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              {title}
            </h2>
            <button 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreIcon size={20} color="#70757a" />
            </button>
          </div>

          {/* Video List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {videos.map((video, idx) => (
              <VideoCard 
                key={video.id || idx}
                video={video}
                layout="horizontal"
                onClick={onVideoClick}
              />
            ))}
          </div>

          {/* View All Link */}
          {showViewAll && (
            <button
              onClick={onViewAllClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px',
                marginBottom: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ 
                fontSize: '14px', 
                color: '#1a73e8',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                More videos
              </span>
              <ChevronRightIcon size={16} color="#1a73e8" />
            </button>
          )}
          
          <GoogleDivider />
        </>
      )}

      {/* Short Videos Section */}
      {shortVideos.length > 0 && (
        <>
          {/* Section Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '400', 
              color: '#202124', 
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Short videos
            </h2>
            <button 
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreIcon size={20} color="#70757a" />
            </button>
          </div>

          {/* Horizontal Scrolling Short Videos */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              overflowX: 'auto',
              marginLeft: '-16px',
              marginRight: '-16px',
              padding: '0 16px',
              WebkitOverflowScrolling: 'touch',
            }}
            className="hide-scrollbar"
          >
            {shortVideos.map((video, idx) => (
              <VideoCard 
                key={video.id || idx}
                video={video}
                layout="vertical"
                onClick={onVideoClick}
              />
            ))}
          </div>

          {/* View All Link */}
          {showViewAll && (
            <button
              onClick={onViewAllClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ 
                fontSize: '14px', 
                color: '#1a73e8',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                View more short videos
              </span>
              <ChevronRightIcon size={16} color="#1a73e8" />
            </button>
          )}
          
          <GoogleDivider marginTop="16px" />
        </>
      )}
    </section>
  );
}

