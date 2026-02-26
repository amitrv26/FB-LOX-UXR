"use client";

import { useState, useEffect } from "react";
import MobileComment from "./MobileComment";

const MobileComments = ({
  comments,
  totalCount,
  postAuthorId,
  onReply,
  onLikeComment,
  onCommentPromptClick,
  showAllComments = false,
  hideLoadMore = false,
  composerPlaceholder = "Log in to comment...",
  highlightCommentIndex = null,
  initialVisibleCount = 3,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  // Load all comments when showAllComments becomes true
  useEffect(() => {
    if (showAllComments) {
      setVisibleCount(totalCount);
    }
  }, [showAllComments, totalCount]);
  const [expandedComments, setExpandedComments] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});

  const handleLoadMore = () => {
    // Load 10 more comments at a time
    setVisibleCount((prev) => Math.min(prev + 10, totalCount));
  };

  const toggleReplies = (commentId, replyCount) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    // Initialize visible replies to 10 when first expanded
    if (!expandedComments[commentId]) {
      setVisibleReplies((prev) => ({
        ...prev,
        [commentId]: Math.min(10, replyCount),
      }));
    }
  };

  const loadMoreReplies = (commentId, replyCount) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: Math.min((prev[commentId] || 10) + 10, replyCount),
    }));
  };

  const visibleComments = comments.slice(0, visibleCount);
  // Compare against actual comments array length, not totalCount
  const hasMore = visibleCount < comments.length;
  const remainingCount = comments.length - visibleCount;

  return (
    <section className="mobile-comments">
      <div className="mobile-comments__list">
        {visibleComments.map((comment, index) => (
          <div 
            key={comment.id} 
            id={`comment-${index}`} 
            className={highlightCommentIndex === index ? 'mobile-comments__highlight-pulse' : ''}
          >
            <MobileComment
              comment={comment}
              postAuthorId={postAuthorId}
              onReply={onReply}
              onLike={onLikeComment}
              isExpanded={expandedComments[comment.id]}
              onToggleReplies={() => toggleReplies(comment.id, comment.replyCount)}
              visibleRepliesCount={visibleReplies[comment.id] || 10}
              onLoadMoreReplies={() => loadMoreReplies(comment.id, comment.replyCount)}
            />
          </div>
        ))}
      </div>

      {hasMore && !hideLoadMore && (
        <button className="mobile-comments__load-more" onClick={handleLoadMore}>
          <span>View {remainingCount} {remainingCount === 1 ? "comment" : "comments"}</span>
        </button>
      )}

      {/* Comment Composer */}
      <div className="mobile-comments__composer">
        <button 
          className="mobile-comments__composer-input"
          onClick={onCommentPromptClick}
        >
          <span className="mobile-comments__composer-placeholder">{composerPlaceholder}</span>
        </button>
      </div>
    </section>
  );
};

export default MobileComments;

