"use client";

const Reactions = ({ likes = 344, comments = 47, onCommentsClick }) => {
  return (
    <div className="card--reactions">
      <div className="reaction-container">
        <div className="reaction like">
          <img src="/images/reactions/like_default_40.png" alt="" />
        </div>
        <div className="reaction love">
          <img src="/images/reactions/love_default_40.png" alt="" />
        </div>
        <div className="reaction wow">
          <img src="/images/reactions/wow_default_40.png" alt="" />
        </div>
      </div>
      <p>{likes}</p>
      <p 
        className="align-right" 
        onClick={onCommentsClick}
        style={{ cursor: onCommentsClick ? 'pointer' : 'default' }}
      >
        {comments} {comments === 1 ? 'comment' : 'comments'}
      </p>
    </div>
  )
}
export default Reactions;
