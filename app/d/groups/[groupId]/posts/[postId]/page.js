"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { topicsData } from "../../../../../m/_data/topicsData";
import "./desktop-post.scss";

// Facebook Logo
const FacebookLogo = () => (
  <svg viewBox="0 0 36 36" width="40" height="40">
    <defs>
      <linearGradient x1="50%" x2="50%" y1="97.0782153%" y2="0%" id="gradient">
        <stop offset="0%" stopColor="#0062E0"/>
        <stop offset="100%" stopColor="#19AFFF"/>
      </linearGradient>
    </defs>
    <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" fill="url(#gradient)"/>
    <path d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" fill="#FFF"/>
  </svg>
);

// Gen AI Sparkle Icon (for LLM title) - matches mobile version
const GenAISparkleIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#65676B">
    <path d="M10.3137 9.16065C9.59548 7.62174 7.40721 7.62175 6.689 9.16065L6.3031 9.98752C5.62186 11.4472 4.44855 12.6205 2.98886 13.3018L2.16199 13.6877C0.623084 14.4059 0.623089 16.5941 2.16199 17.3123L2.98886 17.6982C4.44855 18.3795 5.62186 19.5528 6.3031 21.0125L6.689 21.8394C7.40721 23.3783 9.59548 23.3783 10.3137 21.8394L10.6996 21.0125C11.3808 19.5528 12.5541 18.3795 14.0138 17.6982L14.8407 17.3123C16.3796 16.5941 16.3796 14.4059 14.8407 13.6877L14.0138 13.3018C12.5541 12.6205 11.3808 11.4472 10.6996 9.98752L10.3137 9.16065Z" />
    <path d="M12.002 1C10.3451 1 9.00195 2.34315 9.00195 4C9.00195 5.65685 10.3451 7 12.002 7C13.6588 7 15.002 5.65685 15.002 4C15.002 2.34315 13.6588 1 12.002 1Z" />
    <path d="M20.9417 13.0532C22.4288 13.4517 23.7896 12.0908 23.3911 10.6037L22.0463 5.5846C21.6478 4.09745 19.7889 3.59936 18.7002 4.68802L15.026 8.36226C13.9373 9.45092 14.4354 11.3098 15.9226 11.7083L20.9417 13.0532Z" />
  </svg>
);

// AI Sparkle Icon
const AISparkleIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#9334E6">
    <path d="M10.3137 9.16065C9.59548 7.62174 7.40721 7.62175 6.689 9.16065L6.3031 9.98752C5.62186 11.4472 4.44855 12.6205 2.98886 13.3018L2.16199 13.6877C0.623084 14.4059 0.623089 16.5941 2.16199 17.3123L2.98886 17.6982C4.44855 18.3795 5.62186 19.5528 6.3031 21.0125L6.689 21.8394C7.40721 23.3783 9.59548 23.3783 10.3137 21.8394L10.6996 21.0125C11.3808 19.5528 12.5541 18.3795 14.0138 17.6982L14.8407 17.3123C16.3796 16.5941 16.3796 14.4059 14.8407 13.6877L14.0138 13.3018C12.5541 12.6205 11.3808 11.4472 10.6996 9.98752L10.3137 9.16065Z" />
    <path d="M12.002 1C10.3451 1 9.00195 2.34315 9.00195 4C9.00195 5.65685 10.3451 7 12.002 7C13.6588 7 15.002 5.65685 15.002 4C15.002 2.34315 13.6588 1 12.002 1Z" />
  </svg>
);

// More dots icon
const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#65676B">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Like icon (outline style)
const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.5">
    <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5031 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Comment icon (outline style - speech bubble without dots)
const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.5">
    <path d="M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Share icon (outline style)
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.5">
    <path d="M22 3L9.218 10.083M11.698 20.334L22 3.001H2L9.218 10.084L11.698 20.334Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Reaction icons for bling bar (Facebook style)
const ReactionLike = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" style={{display: 'block'}}>
    <defs>
      <linearGradient id="likeGrad" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#18AFFF"/>
        <stop offset="100%" stopColor="#0062DF"/>
      </linearGradient>
    </defs>
    <circle cx="8" cy="8" r="8" fill="url(#likeGrad)"/>
    <g transform="translate(3, 1.5)">
      <path fill="#FFF" d="M2.2 10.3h-.9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h.9v4.8zm7.1-4.8H7l.2-.8c.1-.4 0-.9-.3-1.2-.2-.2-.4-.3-.7-.3-.4 0-.8.3-.9.7l-.7 2.1H3v4.3h4.7c.4 0 .8-.3.9-.7l1-3c.2-.5-.2-1.1-.8-1.1h-.5z"/>
    </g>
  </svg>
);

const ReactionLove = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" style={{display: 'block'}}>
    <circle cx="8" cy="8" r="8" fill="#F33E58"/>
    <path fill="#FFF" d="M8 12.2c-.15 0-.3-.05-.42-.14l-3.04-2.8C3.55 8.36 3.2 7.2 3.2 6.4c0-1.5 1.12-2.6 2.6-2.6.74 0 1.48.37 1.86 1.12.38-.75 1.12-1.12 1.86-1.12 1.48 0 2.6 1.1 2.6 2.6 0 .8-.35 1.96-1.34 2.86l-3.04 2.8c-.12.1-.27.14-.42.14h-.32z"/>
  </svg>
);

// Globe icon
const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#65676B">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// Triangle down
const TriangleDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#65676B">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

// Thumbs up outline icon (for comment actions)
const ThumbsUpOutline = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676B">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" />
  </svg>
);

// Search icon
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#65676B">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

export default function DesktopPostPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [topicData, setTopicData] = useState(null);
  const [resultData, setResultData] = useState(null);

  // Get topic from URL param or localStorage
  const topicId = searchParams.get("topic") || "coffee";
  const resultIdx = parseInt(searchParams.get("resultIdx") || "0", 10);

  useEffect(() => {
    const data = topicsData[topicId];
    if (data) {
      setTopicData(data);
      setResultData(data.searchResults[resultIdx] || data.searchResults[0]);
    }
  }, [topicId, resultIdx]);

  if (!topicData || !resultData) {
    return (
      <div className="desktop-post-loading">
        <div className="desktop-post-loading__spinner"></div>
      </div>
    );
  }

  const { groupData, searchResults } = topicData;
  const comments = resultData.comments || [];
  const relatedPosts = searchResults.filter((_, idx) => idx !== resultIdx);

  return (
    <div className="desktop-post-page">
      {/* Logged Out Facebook Header */}
      <header className="desktop-fb-header desktop-fb-header--logged-out">
        <div className="desktop-fb-header__left">
          <FacebookLogo />
          <div className="desktop-fb-header__search">
            <SearchIcon />
            <input type="text" placeholder="Search Groups" />
          </div>
        </div>

        <div className="desktop-fb-header__right desktop-fb-header__right--logged-out">
          <input 
            type="text" 
            placeholder="Email or phone" 
            className="desktop-fb-header__input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="desktop-fb-header__input"
          />
          <button className="desktop-fb-header__login-btn">Log in</button>
          <a href="#" className="desktop-fb-header__create-link">Create new account</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="desktop-post-main">
        {/* Left - Post Content */}
        <div className="desktop-post-content">
          {/* Post Card */}
          <article className="desktop-post-card">
            {/* Post Header - Group Attribution */}
            <div className="desktop-post-card__header">
              <div className="desktop-post-card__avatar-group">
                <img 
                  src={groupData.groupAvatar}
                  alt={groupData.groupName}
                  className="desktop-post-card__avatar-group-img"
                />
                <img 
                  src={groupData.postAuthor?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"}
                  alt={groupData.postAuthor?.name}
                  className="desktop-post-card__avatar-user-img"
                />
              </div>
              <div className="desktop-post-card__meta">
                <div className="desktop-post-card__group-row">
                  <h3 className="desktop-post-card__group-name">{groupData.groupName}</h3>
                  <span className="desktop-post-card__join-link">· <span className="desktop-post-card__join-text">Join</span></span>
                </div>
                <div className="desktop-post-card__author-line">
                  <span className="desktop-post-card__author-name">{groupData.postAuthor?.name || "Anonymous"}</span>
                  <span className="desktop-post-card__dot">·</span>
                  <span className="desktop-post-card__time">{resultData.timeAgo}</span>
                  <span className="desktop-post-card__dot">·</span>
                  <GlobeIcon />
                </div>
              </div>
              <button className="desktop-post-card__more">
                <MoreIcon />
              </button>
            </div>

            {/* LLM Title */}
            <div className="desktop-post-card__llm-title">
              <h2 className="desktop-post-card__llm-title-text">{resultData.title}</h2>
              <div className="desktop-post-card__llm-title-meta">
                <GenAISparkleIcon size={12} />
                <span>Title generated by AI from Meta</span>
              </div>
            </div>

            {/* Post Body */}
            <div className="desktop-post-card__body">
              <p>{groupData.postBody}</p>
            </div>

            {/* Bling Bar (Reactions) */}
            <div className="desktop-post-card__bling-bar">
              <div className="desktop-post-card__bling-left">
                <div className="desktop-post-card__bling-reactions">
                  <ReactionLike />
                  <ReactionLove />
                </div>
                <span className="desktop-post-card__bling-count">{comments.reduce((sum, c) => sum + c.reactions, 0) || 12}</span>
              </div>
              <span className="desktop-post-card__bling-comments">{resultData.commentsCount} comments</span>
            </div>

            {/* Divider */}
            <div className="desktop-post-card__divider"></div>

            {/* UFI Buttons */}
            <div className="desktop-post-card__ufi">
              <button className="desktop-post-card__ufi-btn">
                <LikeIcon />
                <span>Like</span>
              </button>
              <button className="desktop-post-card__ufi-btn">
                <CommentIcon />
                <span>Comment</span>
              </button>
              <button className="desktop-post-card__ufi-btn">
                <ShareIcon />
                <span>Share</span>
              </button>
            </div>

            {/* Divider after UFI */}
            <div className="desktop-post-card__divider"></div>

            {/* Comments Sort */}
            <div className="desktop-post-card__sort">
              <span>Most relevant</span>
              <TriangleDown />
            </div>

            {/* Comments List */}
            <div className="desktop-post-card__comments">
              {comments.map((comment, idx) => (
                <div key={idx} className="desktop-comment">
                  <div className="desktop-comment__avatar">
                    <img 
                      src={`https://i.pravatar.cc/40?img=${idx + 10}`}
                      alt="Commenter"
                    />
                  </div>
                  <div className="desktop-comment__content">
                    <div className="desktop-comment__header">
                      <span className="desktop-comment__author">User {idx + 1}</span>
                      <span className="desktop-comment__separator">·</span>
                      <span className="desktop-comment__time">{idx + 1}h</span>
                    </div>
                    <p className="desktop-comment__text">{comment.text}</p>
                    <div className="desktop-comment__actions">
                      <div className="desktop-comment__actions-left">
                        <button className="desktop-comment__reply-btn">Reply</button>
                        {comment.reactions > 0 && (
                          <div className="desktop-comment__reactions">
                            <img src="/images/reactions/like_default_40.png" alt="Like" />
                            <span>{comment.reactions}</span>
                          </div>
                        )}
                      </div>
                      <div className="desktop-comment__actions-right">
                        <button className="desktop-comment__like-btn">
                          <ThumbsUpOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Right Sidebar */}
        <aside className="desktop-post-sidebar">
          {/* Related Discussions */}
          <div className="desktop-post-sidebar__card">
            <div className="desktop-post-sidebar__header">
              <AISparkleIcon size={12} />
              <h4>Related discussions</h4>
            </div>
            {relatedPosts.slice(0, 4).map((post, idx) => (
              <a 
                key={post.id}
                href={`/d/groups/${topicId}/posts/${post.postId || post.id}?topic=${topicId}&resultIdx=${searchResults.indexOf(post)}`}
                className="desktop-post-sidebar__related"
              >
                <h5>{post.title}</h5>
                <p>{post.comments[0]?.text}</p>
              </a>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
