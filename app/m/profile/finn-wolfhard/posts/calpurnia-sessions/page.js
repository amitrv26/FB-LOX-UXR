"use client";

import { useState, useRef } from "react";
import MobileComments from "../../../../../../components/mobile/MobileComments";
import UpsellBottomSheet from "../../../../../../components/mobile/UpsellBottomSheet";
import ShareSheet from "../../../../../../components/mobile/ShareSheet";

// Profile data for Finn Wolfhard
const profileData = {
  name: "Finn Wolfhard",
  verified: true,
  username: "FinnWolfhard",
  bio: "Profile · Musician/band",
  followers: "80M",
  profileImage: "/images/profile/finn-pp.jpg",
};

// Post data - Calpurnia Sessions album announcement
const postData = {
  id: "calpurnia-sessions",
  body: `🎵 NEW ALBUM THE CALPURNIA SESSIONS OUT NOW! 🎵

My mind is blown. I'm completely floored by the love you've shown this album.

2.6 million streams - ARE YOU ACTUALLY SERIOUS?? 

Thank you for listening, streaming, and welcoming The Aubreys into your life. Feeling completely overwhelmed with gratitude right now.

This album has been years in the making. Every late night in the studio, every rewrite, every moment of doubt... it was all worth it to share this with you.

I was already so fired up to get back on tour but you doing THIS?! May 9th can't come soon enough. Vancouver, we're coming home first 🇨🇦

Stream it now on all platforms. Link in bio.

Love you all so much ❤️

#TheCalpurniaSessions #TheAubreys #NewMusic #OutNow`,
  image: "/images/profile/finn-post-1.jpg",
  postedTime: "9h",
  reactions: {
    like: 45200,
    love: 32100,
    total: 77300,
  },
  commentsCount: 2100,
  sharesCount: 367,
};

// Comments data
const commentsData = [
  {
    id: "comment-1",
    author: {
      id: "user-1",
      name: "Emma Collins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    },
    text: "THIS ALBUM IS EVERYTHING 😭 I've had it on repeat since it dropped. 'Midnight in Vancouver' literally made me cry",
    time: "8h",
    reactions: { like: 1243 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-2",
    author: {
      id: "user-2",
      name: "Jake Morrison",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Been a fan since Calpurnia days and this is by far your best work. The growth as an artist is insane. So proud of you Finn! 🎸",
    time: "7h",
    reactions: { like: 892 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-3",
    author: {
      id: "user-3",
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Got my tickets for the Vancouver show!! Can't believe you're starting the tour in your hometown. It's gonna be so special 🇨🇦",
    time: "6h",
    reactions: { like: 567 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-4",
    author: {
      id: "user-4",
      name: "Tyler Brooks",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "The production on this album is chef's kiss 👨‍🍳 Who produced it? The sound is so unique",
    time: "5h",
    reactions: { like: 234 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-5",
    author: {
      id: "user-5",
      name: "Mia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    },
    text: "From Mike Wheeler to rock star 🎤 You're literally living the dream. This album proves you can do anything",
    time: "4h",
    reactions: { like: 445 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-6",
    author: {
      id: "user-6",
      name: "Noah Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Track 7 is absolutely incredible. The guitar solo gave me chills. Please release the tabs!!",
    time: "3h",
    reactions: { like: 178 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-7",
    author: {
      id: "user-7",
      name: "Finn Wolfhard",
      avatar: "/images/profile/finn-pp.jpg",
      verified: true,
    },
    text: "Reading all these comments and I genuinely can't stop smiling. You guys mean the world to me. See you on tour!! ❤️🎸",
    time: "2h",
    reactions: { like: 8934 },
    replies: [],
    replyCount: 0,
    isAuthor: true,
  },
  {
    id: "comment-8",
    author: {
      id: "user-8",
      name: "Ava Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
    },
    text: "My Spotify wrapped is going to be 99% this album and I'm not even mad about it 😂",
    time: "1h",
    reactions: { like: 312 },
    replies: [],
    replyCount: 0,
  },
];

// Globe icon
const GlobeIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm5.9 7H11.1a14.3 14.3 0 0 0-1-4.4A6 6 0 0 1 13.9 7zM8 14c-.8 0-2.3-2.4-2.5-6h5c-.2 3.6-1.7 6-2.5 6zM5.5 7C5.7 3.4 7.2 1 8 1s2.3 2.4 2.5 6h-5zM5.9 2.6a14.3 14.3 0 0 0-1 4.4H2.1a6 6 0 0 1 3.8-4.4zM2.1 8h2.8a14.3 14.3 0 0 0 1 4.4A6 6 0 0 1 2.1 8zm7.9 4.4a14.3 14.3 0 0 0 1-4.4h2.8a6 6 0 0 1-3.8 4.4z" />
  </svg>
);

// Badge Checkmark Icon
const BadgeCheckmarkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#0866ff"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// UFI Like icon (20px outline) - with className for styling
const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="mobile-post__ufi-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.41667 0.5C8.35812 0.5 7.5 1.35812 7.5 2.41667V3.02899C7.5 4.18278 7.18643 5.31488 6.5928 6.30425L5.7887 7.64443C5.62445 7.91818 5.48486 8.2045 5.37087 8.5H2.5C1.39543 8.5 0.5 9.39543 0.5 10.5V17C0.5 18.1046 1.39543 19 2.5 19H14.75C16.1617 19 17.3249 17.9363 17.482 16.5667C18.2439 16.0784 18.75 15.2239 18.75 14.25C18.75 14.1349 18.7429 14.0212 18.729 13.9093C19.2056 13.4153 19.5 12.742 19.5 12C19.5 11.4887 19.3599 11.009 19.1164 10.5985C19.2032 10.3308 19.25 10.0454 19.25 9.75C19.25 8.23122 18.0188 7 16.5 7H12.5V3.58333C12.5 1.88046 11.1195 0.5 9.41667 0.5ZM5 17.5V10H2.5C2.22386 10 2 10.2239 2 10.5V17C2 17.2761 2.22386 17.5 2.5 17.5H5ZM6.5 17.5H14.75C15.4404 17.5 16 16.9404 16 16.25C16 16.2195 15.9989 16.1894 15.9968 16.1596C15.9738 15.8347 16.1632 15.5321 16.4654 15.4107C16.9266 15.2255 17.25 14.7746 17.25 14.25C17.25 14.1144 17.2287 13.9852 17.1898 13.8649C17.0888 13.5527 17.2025 13.2112 17.4704 13.0218C17.7923 12.7941 18 12.4213 18 12C18 11.6872 17.8861 11.4029 17.6965 11.1835C17.4935 10.9485 17.4563 10.6127 17.603 10.339C17.6966 10.1643 17.75 9.96448 17.75 9.75C17.75 9.05964 17.1904 8.5 16.5 8.5H12.1365C11.5088 8.5 11 7.99118 11 7.36351V3.58333C11 2.70888 10.2911 2 9.41667 2C9.18655 2 9 2.18655 9 2.41667V3.02899C9 4.45465 8.61254 5.85351 7.87904 7.076L7.07494 8.41617C6.69873 9.04319 6.5 9.76066 6.5 10.4919V17.5Z" />
  </svg>
);

// UFI Comment icon (24px outline, scaled to 20px) - with className for styling
const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mobile-post__ufi-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 13.9218 23.0278 15.7363 22.1922 17.3308C22.105 17.4973 22.092 17.6559 22.1233 17.7765L23.0047 21.1762C23.2918 22.2835 22.2835 23.2918 21.1762 23.0047L17.7765 22.1233C17.6559 22.092 17.4973 22.105 17.3308 22.1922C15.7363 23.0278 13.9218 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5C13.5908 21.5 15.0875 21.1098 16.4025 20.4207C16.9511 20.1333 17.6177 20.016 18.2785 20.1873L20.8554 20.8554L20.1873 18.2785C20.016 17.6177 20.1333 16.9511 20.4207 16.4025C21.1098 15.0875 21.5 13.5908 21.5 12Z" />
  </svg>
);

// UFI Share icon (24px outline, scaled to 20px) - with className for styling
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mobile-post__ufi-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" />
  </svg>
);

// Format number with K/M suffix
const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function FinnWolfhardPostPage() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0 });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const commentsRef = useRef(null);

  const showUpsell = (config = {}) => {
    setUpsellConfig({ type: config.type || 'generic', count: config.count || 0 });
    setShowLoginPrompt(true);
  };

  const handleLike = () => {
    // Show reactions upsell with the post's reaction count
    setLikeSheetReactionCount(postData.reactions.total || 0);
    setShowLikeSheet(true);
  };

  const handleComment = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleReply = () => {
    showUpsell({ type: 'comment', count: postData.commentsCount });
  };

  const handleLikeComment = (reactionCount) => {
    // Show reactions upsell with the comment's reaction count
    setLikeSheetReactionCount(reactionCount || 0);
    setShowLikeSheet(true);
  };

  return (
    <div className="mobile-post-page" style={{ overflowX: 'hidden' }}>
      {/* Post Content */}
      <article className="mobile-post" style={{ background: '#fff' }}>
        {/* Post Header - Profile attribution (no group) */}
        <div className="mobile-post__post-header">
          <div className="mobile-post__post-header-left">
            {/* Single circle avatar for profile */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <img 
                src={profileData.profileImage} 
                alt={profileData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="mobile-post__post-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h2 className="mobile-post__post-header-entity" style={{ margin: 0 }}>
                  {profileData.name}
                </h2>
                {profileData.verified && <BadgeCheckmarkIcon />}
              </div>
              <p className="mobile-post__post-header-meta">
                <span>{postData.postedTime}</span>
                <span className="mobile-post__post-header-separator">·</span>
                <GlobeIcon />
              </p>
            </div>
          </div>
        </div>

        {/* Post Body - No AI-generated title */}
        <div className="mobile-post__body" style={{ marginBottom: '12px' }}>
          {isExpanded ? (
            postData.body.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>
              {postData.body.substring(0, 320)}
              <span 
                className="mobile-post__see-more"
                onClick={() => setIsExpanded(true)}
                style={{ color: '#65676b', cursor: 'pointer' }}
              >
                ... See more
              </span>
            </p>
          )}
        </div>

        {/* Post Image */}
        {postData.image && (
          <div style={{ margin: '0 -12px' }}>
            <img 
              src={postData.image}
              alt=""
              style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* UFI Buttons */}
        <div className="mobile-post__ufi">
          <div className="mobile-post__ufi-left">
            {/* Like */}
            <button className="mobile-post__ufi-action" onClick={handleLike}>
              <LikeIcon />
              <span>{formatCount(postData.reactions.total)}</span>
            </button>

            {/* Comments */}
            <button className="mobile-post__ufi-action" onClick={handleComment}>
              <CommentIcon />
              <span>{formatCount(postData.commentsCount)}</span>
            </button>

            {/* Share */}
            <button className="mobile-post__ufi-action" onClick={handleShare}>
              <ShareIcon />
              <span>{postData.sharesCount}</span>
            </button>
          </div>

          {/* Inline Reactions */}
          <div className="mobile-post__ufi-right">
            <div className="mobile-post__ufi-reactions">
              {postData.reactions.like > 0 && (
                <img src="/images/reactions/like_default_40.png" alt="Like" />
              )}
              {postData.reactions.love > 0 && (
                <img src="/images/reactions/love_default_40.png" alt="Love" />
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div ref={commentsRef} className="mobile-comments-wrapper">
        <MobileComments
          comments={commentsData}
          totalCount={commentsData.length}
          postAuthorId="finn-wolfhard"
          showAllComments={true}
          hideLoadMore={true}
          onReply={handleReply}
          onLikeComment={handleLikeComment}
          onCommentPromptClick={() => showUpsell({ type: 'comment', count: postData.commentsCount })}
        />
      </div>

      {/* Upsell Bottom Sheet */}
      <UpsellBottomSheet
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type={upsellConfig.type}
        count={upsellConfig.count}
      />

      {/* Like Sheet */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={likeSheetReactionCount}
      />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
      />
    </div>
  );
}

