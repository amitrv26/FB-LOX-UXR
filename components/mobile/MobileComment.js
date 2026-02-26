"use client";

import { LikeIcon, ChevronDownIcon as ChevronDownIconBase } from "../icons";

// Thumbs up outline icon (16px)
const ThumbsUpIcon = () => <LikeIcon size={16} />;

// Chevron down icon (20px) - using image for compatibility with existing styling
const ChevronDownIcon = () => (
  <img 
    src="/images/glyphs/chevron-down-black.png" 
    alt="" 
    width="20" 
    height="20"
    className="mobile-comment__chevron"
  />
);

const MobileComment = ({
  comment,
  postAuthorId,
  onReply,
  onLike,
  isExpanded,
  onToggleReplies,
  visibleRepliesCount = 10,
  onLoadMoreReplies,
  isReply = false,
}) => {
  const totalReactions = comment.reactions
    ? Object.values(comment.reactions).reduce((sum, count) => sum + count, 0)
    : 0;

  // Handle like click - pass the reaction count for the upsell
  const handleLikeClick = () => {
    onLike?.(totalReactions);
  };

  // Get visible replies (paginated)
  const visibleReplies = comment.replies?.slice(0, visibleRepliesCount) || [];
  const remainingReplies = comment.replyCount - visibleRepliesCount;
  const hasMoreReplies = remainingReplies > 0;

  return (
    <div className={`mobile-comment ${isReply ? 'mobile-comment--reply' : ''}`}>
      <div className="mobile-comment__threading">
        <div className="mobile-comment__avatar">
          <img src={comment.author.avatar} alt={comment.author.name} />
        </div>
      </div>

      <div className="mobile-comment__content">
        {/* Author name + time row */}
        <div className="mobile-comment__header">
          <span className="mobile-comment__author">{comment.author.name}</span>
          <span className="mobile-comment__separator">·</span>
          <span className="mobile-comment__time">{comment.time}</span>
        </div>

        {/* Comment text */}
        <p className="mobile-comment__text">{comment.text}</p>

        {/* Action bar */}
        <div className="mobile-comment__actions">
          <div className="mobile-comment__actions-left">
            <button className="mobile-comment__reply-btn" onClick={onReply}>
              Reply
            </button>
            {totalReactions > 0 && (
              <div className="mobile-comment__reactions">
                {comment.reactions?.like > 0 && (
                  <img src="/images/reactions/like_default_40.png" alt="Like" />
                )}
                {comment.reactions?.love > 0 && (
                  <img src="/images/reactions/love_default_40.png" alt="Love" />
                )}
                <span>{totalReactions}</span>
              </div>
            )}
          </div>
          <div className="mobile-comment__actions-right">
            <button className="mobile-comment__like-btn" onClick={handleLikeClick}>
              <ThumbsUpIcon />
            </button>
          </div>
        </div>

        {/* View replies / Nested replies */}
        {!isReply && comment.replyCount > 0 && (
          <>
            {!isExpanded ? (
              <button
                className="mobile-comment__view-replies"
                onClick={onToggleReplies}
              >
                <ChevronDownIcon />
                <span>View {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}</span>
              </button>
            ) : (
              <div className="mobile-comment__replies">
                {visibleReplies.map((reply) => (
                  <MobileComment
                    key={reply.id}
                    comment={reply}
                    postAuthorId={postAuthorId}
                    onReply={onReply}
                    onLike={onLike}
                    isReply={true}
                  />
                ))}
                {hasMoreReplies && (
                  <button
                    className="mobile-comment__view-replies"
                    onClick={onLoadMoreReplies}
                  >
                    <ChevronDownIcon />
                    <span>View {remainingReplies} {remainingReplies === 1 ? "reply" : "replies"}</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MobileComment;

