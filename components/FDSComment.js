import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FDSProfilePhoto from './FDSProfilePhoto';
import { IconInline } from './Icon';

/**
 * FDSComment - Facebook Design System Comment Component
 * 
 * A flexible comment component that supports various layouts and features:
 * - Profile photo with various sizes
 * - Author name and metadata
 * - Comment text with expand/collapse
 * - Timestamp and edited indicator
 * - Action buttons (like, reply, more)
 * - Nested replies
 * - Reactions display
 * 
 * @example
 * <FDSComment
 *   author="John Doe"
 *   authorProfileSrc="/images/profile.jpg"
 *   timestamp="2h"
 *   text="This is a comment"
 *   onLike={() => {}}
 *   onReply={() => {}}
 * />
 */
const FDSComment = ({
  // Author info
  author,
  authorProfileSrc,
  authorBadge = null, // 'verified', 'public', etc.
  authorSubtext = null, // Additional text below author name (e.g., "Top fan")
  
  // Content
  text,
  isEdited = false,
  maxLines = null, // Limit text lines before showing "See more"
  
  // Metadata
  timestamp,
  timestampLabel = null, // Custom timestamp label
  
  // Actions
  onLike,
  onReply,
  onMore,
  likeCount = 0,
  isLiked = false,
  showActions = true,
  
  // Reactions
  reactions = null, // { like: 5, love: 2, haha: 1 }
  
  // Replies
  replies = [],
  onViewReplies,
  replyCount = 0,
  showReplies = false,
  
  // Visual
  profilePhotoSize = 32,
  backgroundColor = 'default', // 'default', 'transparent'
  highlightColor = null, // Highlight background color
  
  // Interactive states
  onPress,
  disabled = false,
  
  // Layout
  layout = 'default', // 'default', 'compact'
  
  // Custom styling
  className,
  style,
  
  // Accessibility
  'aria-label': ariaLabel,
  testid,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplySection, setShowReplySection] = useState(showReplies);
  
  const shouldTruncate = maxLines && text && text.length > 200;
  const displayText = shouldTruncate && !isExpanded 
    ? text.substring(0, 200) + '...' 
    : text;

  const handleLike = (e) => {
    e.stopPropagation();
    if (onLike && !disabled) onLike();
  };

  const handleReply = (e) => {
    e.stopPropagation();
    if (onReply && !disabled) {
      onReply();
      setShowReplySection(true);
    }
  };

  const handleMore = (e) => {
    e.stopPropagation();
    if (onMore && !disabled) onMore();
  };

  const handleViewReplies = (e) => {
    e.stopPropagation();
    if (onViewReplies) {
      onViewReplies();
    }
    setShowReplySection(!showReplySection);
  };

  return (
    <div
      className={classNames(
        'fds-comment',
        `fds-comment--layout-${layout}`,
        `fds-comment--bg-${backgroundColor}`,
        {
          'fds-comment--disabled': disabled,
          'fds-comment--highlighted': highlightColor,
          'fds-comment--pressable': onPress,
        },
        className
      )}
      style={{
        ...style,
        ...(highlightColor && { '--highlight-color': highlightColor }),
      }}
      onClick={onPress && !disabled ? onPress : undefined}
      role={onPress ? 'button' : undefined}
      aria-label={ariaLabel}
      data-testid={testid}
    >
      <div className="fds-comment__container">
        {/* Profile Photo */}
        <div className="fds-comment__profile">
          <FDSProfilePhoto
            source={authorProfileSrc}
            size={profilePhotoSize}
            alt={author}
          />
        </div>

        {/* Content */}
        <div className="fds-comment__content">
          {/* Comment Bubble */}
          <div className="fds-comment__bubble">
            {/* Author Header */}
            <div className="fds-comment__header">
              <div className="fds-comment__author-wrapper">
                <span className="fds-comment__author-name">{author}</span>
                {authorBadge === 'verified' && (
                  <div className="fds-comment__badge">
                    <IconInline name="badge-checkmark-filled" size={12} color="primary" />
                  </div>
                )}
                {authorBadge === 'public' && (
                  <div className="fds-comment__badge">
                    <IconInline name="globe-americas-filled" size={12} color="secondary" />
                  </div>
                )}
              </div>
              {authorSubtext && (
                <div className="fds-comment__author-subtext">{authorSubtext}</div>
              )}
            </div>

            {/* Comment Text */}
            {text && (
              <div className="fds-comment__text">
                {displayText}
                {shouldTruncate && !isExpanded && (
                  <button
                    className="fds-comment__see-more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(true);
                    }}
                  >
                    See more
                  </button>
                )}
              </div>
            )}

            {/* Reactions (if any) */}
            {reactions && (
              <div className="fds-comment__reactions">
                <div className="fds-comment__reaction-icons">
                  {reactions.like > 0 && (
                    <div className="fds-comment__reaction-icon fds-comment__reaction-icon--like">
                      <IconInline name="like-filled" size={12} />
                    </div>
                  )}
                  {reactions.love > 0 && (
                    <div className="fds-comment__reaction-icon fds-comment__reaction-icon--love">
                      <IconInline name="heart-filled" size={12} />
                    </div>
                  )}
                  {reactions.haha > 0 && (
                    <div className="fds-comment__reaction-icon fds-comment__reaction-icon--haha">
                      <IconInline name="emoji-smile-filled" size={12} />
                    </div>
                  )}
                </div>
                <span className="fds-comment__reaction-count">
                  {Object.values(reactions).reduce((sum, count) => sum + count, 0)}
                </span>
              </div>
            )}
          </div>

          {/* Metadata and Actions */}
          <div className="fds-comment__footer">
            {/* Timestamp */}
            <span className="fds-comment__timestamp">
              {timestampLabel || timestamp}
              {isEdited && <span className="fds-comment__edited"> · Edited</span>}
            </span>

            {/* Action Buttons */}
            {showActions && (
              <div className="fds-comment__actions">
                <button
                  className={classNames(
                    'fds-comment__action-button',
                    { 'fds-comment__action-button--active': isLiked }
                  )}
                  onClick={handleLike}
                  disabled={disabled}
                >
                  Like
                </button>

                {onReply && (
                  <button
                    className="fds-comment__action-button"
                    onClick={handleReply}
                    disabled={disabled}
                  >
                    Reply
                  </button>
                )}

                {onMore && (
                  <button
                    className="fds-comment__action-button"
                    onClick={handleMore}
                    disabled={disabled}
                  >
                    More
                  </button>
                )}
              </div>
            )}
          </div>

          {/* View Replies Button */}
          {replyCount > 0 && !showReplySection && (
            <button
              className="fds-comment__view-replies"
              onClick={handleViewReplies}
              disabled={disabled}
            >
              <IconInline name="chevron-right-filled" size={12} color="primary" />
              <span>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
            </button>
          )}

          {/* Nested Replies */}
          {showReplySection && replies.length > 0 && (
            <div className="fds-comment__replies">
              {replies.map((reply, index) => (
                <FDSComment
                  key={index}
                  {...reply}
                  profilePhotoSize={24}
                  layout="compact"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FDSComment.propTypes = {
  author: PropTypes.string.isRequired,
  authorProfileSrc: PropTypes.string.isRequired,
  authorBadge: PropTypes.oneOf(['verified', 'public', null]),
  authorSubtext: PropTypes.string,
  text: PropTypes.string,
  isEdited: PropTypes.bool,
  maxLines: PropTypes.number,
  timestamp: PropTypes.string.isRequired,
  timestampLabel: PropTypes.string,
  onLike: PropTypes.func,
  onReply: PropTypes.func,
  onMore: PropTypes.func,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool,
  showActions: PropTypes.bool,
  reactions: PropTypes.object,
  replies: PropTypes.array,
  onViewReplies: PropTypes.func,
  replyCount: PropTypes.number,
  showReplies: PropTypes.bool,
  profilePhotoSize: PropTypes.number,
  backgroundColor: PropTypes.oneOf(['default', 'transparent']),
  highlightColor: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  layout: PropTypes.oneOf(['default', 'compact']),
  className: PropTypes.string,
  style: PropTypes.object,
  'aria-label': PropTypes.string,
  testid: PropTypes.string,
};

export default FDSComment;

