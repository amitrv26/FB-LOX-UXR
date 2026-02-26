import React from 'react';
import classNames from 'classnames';
import { IconInline } from '../Icon';

const VerticalUFI = ({ 
  stats = {},
  onLike,
  onComment,
  onShare,
  onSave,
  onMore,
  isCommentActive = false,
}) => {
  const {
    likes = "99.9K",
    comments = "99.9K",
    shares = "99.9K"
  } = stats;

  return (
    <div className="vertical-ufi">
      <button 
        className="vertical-ufi__button" 
        aria-label="Like"
        onClick={onLike}
      >
        <IconInline name="like-outline" size={24} color="onMedia" />
        <span className="vertical-ufi__count">{likes}</span>
      </button>

      <button 
        className={classNames(
          "vertical-ufi__button",
          { "vertical-ufi__button--active": isCommentActive }
        )}
        aria-label="Comment"
        onClick={onComment}
      >
        <IconInline name="comment-outline" size={24} color="onMedia" />
        <span className="vertical-ufi__count">{comments}</span>
      </button>

      <button 
        className="vertical-ufi__button" 
        aria-label="Share"
        onClick={onShare}
      >
        <IconInline name="share-outline" size={24} color="onMedia" />
        <span className="vertical-ufi__count">{shares}</span>
      </button>

      <button 
        className="vertical-ufi__button" 
        aria-label="Save"
        onClick={onSave}
      >
        <IconInline name="bookmark-outline" size={24} color="onMedia" />
        <span className="vertical-ufi__count">Save</span>
      </button>

      <button 
        className="vertical-ufi__button vertical-ufi__button--no-text" 
        aria-label="More options"
        onClick={onMore}
      >
        <IconInline name="dots-3-horizontal-outline" size={24} color="onMedia" />
      </button>
    </div>
  );
};

export default VerticalUFI;

