import React from 'react';
import { IconInline } from '../Icon';

const VideoMetadata = ({ 
  author = "Nature",
  isVerified = true,
  isPublic = true,
  musicArtist = "Joe Hisaishi",
  musicTitle = "One Summer's Day",
  description = "Start your day off right with this breathtaking sunrise video, set against the stunning backdrop of nature. Let the gentle sounds and vibrant colors transport you to a peaceful state of mind.",
  showMore = true,
  profileImage = "/images/thumbs/nature.jpg"
}) => {
  return (
    <div className="video-metadata">
      {/* Content Protection Overlay */}
      <div className="content-protection-overlay">
        <div className="content-protection-solid" />
        <div className="content-protection-gradient" />
      </div>

      {/* Post Header + Body */}
      <div className="video-metadata-content">
        <div className="video-metadata-header">
          {/* Profile Photo */}
          <div className="video-metadata-profile">
            <img 
              src={profileImage} 
              alt={author}
              className="video-metadata-profile-image"
            />
          </div>

          {/* Actor Info */}
          <div className="video-metadata-info">
            <div className="video-metadata-author-line">
              <div className="video-metadata-author">
                <span className="video-metadata-author-name">{author}</span>
                {isVerified && (
                  <div className="video-metadata-badge">
                    <IconInline name="badge-checkmark-filled" size={12} color="onMedia" />
                  </div>
                )}
                {isPublic && (
                  <IconInline name="globe-americas-filled" size={12} color="onMedia" />
                )}
              </div>
              <span className="video-metadata-separator">·</span>
              <a href="#" className="video-metadata-follow">Follow</a>
            </div>

            {/* Music Info */}
            <div className="video-metadata-music">
              <div className="video-metadata-music-icon">
                <IconInline name="music-filled" size={12} color="onMedia" />
              </div>
              <span className="video-metadata-music-text">
                {musicArtist} · {musicTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="video-metadata-description">
          <span className="video-metadata-description-text">{description}</span>
          {showMore && (
            <a href="#" className="video-metadata-more">more</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoMetadata;

