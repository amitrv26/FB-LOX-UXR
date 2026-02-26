import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FDSComment from '../FDSComment';
import FDSComposer from '../FDSComposer';
import FDSProfilePhoto from '../FDSProfilePhoto';
import { IconInline } from '../Icon';
import { easingCurves, durations } from '../../constants/motion';

/**
 * ReelsSidePanel - Side panel for Reels with comments
 * 
 * Features:
 * - Video metadata at top
 * - Scrollable comments section
 * - Fixed composer at bottom
 * - Slide in/out animation
 */
const ReelsSidePanel = ({
  isOpen = false,
  onClose,
  
  // Video metadata (same as VideoMetadata component)
  author = "Nature",
  isVerified = true,
  isPublic = true,
  musicArtist = "Joe Hisaishi",
  musicTitle = "One Summer's Day",
  description = "Start your day off right with this breathtaking sunrise video, set against the stunning backdrop of nature. Let the gentle sounds and vibrant colors transport you to a peaceful state of mind.",
  profileImage = "/images/thumbs/nature.jpg",
  
  // Comments
  comments = [],
  onPostComment,
  onLikeComment,
  onReplyToComment,
  
  // User info for composer
  userProfileImage = "/images/thumbs/profile-0.png",
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostComment = async (text) => {
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    try {
      if (onPostComment) {
        await onPostComment(text);
      }
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="reels-side-panel"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 440, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{
            duration: durations.medium,
            ease: easingCurves.enter,
          }}
        >
          {/* Main Content Area (360px) */}
          <div className="reels-side-panel__main">
            {/* Content Container */}
            <div className="reels-side-panel__content">
              {/* Video Metadata Header */}
              <div className="reels-side-panel__header">
                <div className="reels-side-panel__author-section">
                  <FDSProfilePhoto
                    source={profileImage}
                    size={40}
                    alt={author}
                  />
                  <div className="reels-side-panel__author-info">
                    <div className="reels-side-panel__author-name-line">
                      <span className="reels-side-panel__author-name">{author}</span>
                      {isVerified && (
                        <div className="reels-side-panel__badge">
                          <IconInline name="badge-checkmark-filled" size={12} color="primary" />
                        </div>
                      )}
                      {isPublic && (
                        <div className="reels-side-panel__badge">
                          <IconInline name="globe-americas-filled" size={12} color="secondary" />
                        </div>
                      )}
                      <span className="reels-side-panel__separator">·</span>
                      <a href="#" className="reels-side-panel__follow">Follow</a>
                    </div>
                    
                    {/* Music Info */}
                    <div className="reels-side-panel__music">
                      <div className="reels-side-panel__music-icon">
                        <IconInline name="music-outline" size={12} color="secondary" />
                      </div>
                      <span className="reels-side-panel__music-text">
                        {musicArtist} · {musicTitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="reels-side-panel__description">
                  {description}
                </div>
              </div>

              {/* Comments Section */}
              <div className="reels-side-panel__comments">
                {comments.length === 0 ? (
                  <div className="reels-side-panel__no-comments">
                    <div className="reels-side-panel__no-comments-icon">
                      <IconInline name="comment-outline" size={48} color="secondary" />
                    </div>
                    <h3 className="reels-side-panel__no-comments-title">No comments yet</h3>
                    <p className="reels-side-panel__no-comments-text">
                      Be the first to comment
                    </p>
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <FDSComment
                      key={comment.id || index}
                      author={comment.author}
                      authorProfileSrc={comment.authorProfileSrc}
                      authorBadge={comment.authorBadge}
                      timestamp={comment.timestamp}
                      text={comment.text}
                      isLiked={comment.isLiked}
                      likeCount={comment.likeCount}
                      reactions={comment.reactions}
                      replyCount={comment.replyCount}
                      replies={comment.replies}
                      isEdited={comment.isEdited}
                      onLike={() => onLikeComment?.(comment.id || index)}
                      onReply={() => onReplyToComment?.(comment.id || index)}
                      onMore={() => console.log('More options for comment', comment.id || index)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Composer at Bottom */}
            <div className="reels-side-panel__composer-wrapper">
              <FDSComposer
                profilePhotoSrc={userProfileImage}
                profilePhotoSize={32}
                placeholder="Add a comment..."
                value={commentText}
                onChange={setCommentText}
                onSubmit={handlePostComment}
                isSubmitting={isSubmitting}
                backgroundColor="transparent"
                showSubmitButton={false}
                layout="compact"
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="reels-side-panel__divider" />

          {/* Empty Space (80px) */}
          <div className="reels-side-panel__empty-space" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReelsSidePanel;

