"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import MobileComments from "../../../../../components/mobile/MobileComments";
import UpsellBottomSheet from "../../../../../components/mobile/UpsellBottomSheet";
import RelatedPostsUnit from "../../../../../components/mobile/RelatedPostsUnit";
import ShareSheet from "../../../../../components/mobile/ShareSheet";
import { IconInline } from "../../../../../components/Icon";

// Badge Checkmark Icon
const BadgeCheckmarkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="6" cy="6" r="6" fill="#0866ff"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// UFI Like icon
const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="mobile-post__ufi-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.41667 0.5C8.35812 0.5 7.5 1.35812 7.5 2.41667V3.02899C7.5 4.18278 7.18643 5.31488 6.5928 6.30425L5.7887 7.64443C5.62445 7.91818 5.48486 8.2045 5.37087 8.5H2.5C1.39543 8.5 0.5 9.39543 0.5 10.5V17C0.5 18.1046 1.39543 19 2.5 19H14.75C16.1617 19 17.3249 17.9363 17.482 16.5667C18.2439 16.0784 18.75 15.2239 18.75 14.25C18.75 14.1349 18.7429 14.0212 18.729 13.9093C19.2056 13.4153 19.5 12.742 19.5 12C19.5 11.4887 19.3599 11.009 19.1164 10.5985C19.2032 10.3308 19.25 10.0454 19.25 9.75C19.25 8.23122 18.0188 7 16.5 7H12.5V3.58333C12.5 1.88046 11.1195 0.5 9.41667 0.5ZM5 17.5V10H2.5C2.22386 10 2 10.2239 2 10.5V17C2 17.2761 2.22386 17.5 2.5 17.5H5ZM6.5 17.5H14.75C15.4404 17.5 16 16.9404 16 16.25C16 16.2195 15.9989 16.1894 15.9968 16.1596C15.9738 15.8347 16.1632 15.5321 16.4654 15.4107C16.9266 15.2255 17.25 14.7746 17.25 14.25C17.25 14.1144 17.2287 13.9852 17.1898 13.8649C17.0888 13.5527 17.2025 13.2112 17.4704 13.0218C17.7923 12.7941 18 12.4213 18 12C18 11.6872 17.8861 11.4029 17.6965 11.1835C17.4935 10.9485 17.4563 10.6127 17.603 10.339C17.6966 10.1643 17.75 9.96448 17.75 9.75C17.75 9.05964 17.1904 8.5 16.5 8.5H12.1365C11.5088 8.5 11 7.99118 11 7.36351V3.58333C11 2.70888 10.2911 2 9.41667 2C9.18655 2 9 2.18655 9 2.41667V3.02899C9 4.45465 8.61254 5.85351 7.87904 7.076L7.07494 8.41617C6.69873 9.04319 6.5 9.76066 6.5 10.4919V17.5Z" />
  </svg>
);

// UFI Comment icon
const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mobile-post__ufi-icon">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 13.9218 23.0278 15.7363 22.1922 17.3308C22.105 17.4973 22.092 17.6559 22.1233 17.7765L23.0047 21.1762C23.2918 22.2835 22.2835 23.2918 21.1762 23.0047L17.7765 22.1233C17.6559 22.092 17.4973 22.105 17.3308 22.1922C15.7363 23.0278 13.9218 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5C13.5908 21.5 15.0875 21.1098 16.4025 20.4207C16.9511 20.1333 17.6177 20.016 18.2785 20.1873L20.8554 20.8554L20.1873 18.2785C20.016 17.6177 20.1333 16.9511 20.4207 16.4025C21.1098 15.0875 21.5 13.5908 21.5 12Z" />
  </svg>
);

// UFI Share icon
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

// Generate comments based on the post
const generateComments = (post) => {
  const commentTemplates = [
    { name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" },
    { name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" },
    { name: "Emily Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces" },
    { name: "David Thompson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" },
    { name: "Jessica Park", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" },
    { name: "Alex Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces" },
  ];

  const reactions = [24, 89, 45, 12, 67, 33];

  return commentTemplates.map((template, idx) => ({
    id: `comment-${idx + 1}`,
    author: {
      id: `user-${idx + 1}`,
      name: template.name,
      avatar: template.avatar,
    },
    text: `This is amazing! ${post.author.name} always delivers great content. Can't wait to see more! 🔥`,
    time: `${idx + 1}h`,
    reactions: { like: reactions[idx] },
    replies: [],
    replyCount: 0,
  }));
};

export default function SimilarPostPage() {
  const router = useRouter();
  const params = useParams();
  const [postData, setPostData] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0 });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const commentsRef = useRef(null);

  useEffect(() => {
    const storedPost = sessionStorage.getItem('similarPost');
    if (storedPost) {
      setPostData(JSON.parse(storedPost));
    }
  }, []);

  const showUpsell = (config = {}) => {
    setUpsellConfig({ type: config.type || 'generic', count: config.count || 0 });
    setShowLoginPrompt(true);
  };

  const handleLike = () => {
    setLikeSheetReactionCount(postData?.reactions?.count || 0);
    setShowLikeSheet(true);
  };

  const handleComment = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    setShowShareSheet(true);
  };

  const handleReply = () => {
    showUpsell({ type: 'comment', count: postData?.comments || 0 });
  };

  const handleLikeComment = (reactionCount) => {
    setLikeSheetReactionCount(reactionCount || 0);
    setShowLikeSheet(true);
  };

  // Handle click on another similar post
  const handleSimilarPostClick = (post) => {
    sessionStorage.setItem('similarPost', JSON.stringify(post));
    router.push(`/m/profile/similar-post/${post.id}`);
  };

  if (!postData) {
    return (
      <div className="mobile-post-page has-floating-tab-bar" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#fff',
      }}>
        <p style={{ color: '#65676b' }}>Loading...</p>
      </div>
    );
  }

  const commentsData = generateComments(postData);

  return (
    <div className="mobile-post-page has-floating-tab-bar" style={{ overflowX: 'hidden' }}>
      {/* Post Content */}
      <article className="mobile-post" style={{ background: '#fff' }}>
        {/* Post Header - Profile attribution */}
        <div className="mobile-post__post-header">
          <div className="mobile-post__post-header-left">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <img 
                src={postData.author.avatar} 
                alt={postData.author.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="mobile-post__post-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h2 className="mobile-post__post-header-entity" style={{ margin: 0 }}>
                  {postData.author.name}
                </h2>
                {postData.author.verified && <BadgeCheckmarkIcon />}
              </div>
              <p className="mobile-post__post-header-meta">
                <span>2h</span>
                <span className="mobile-post__post-header-separator">·</span>
                <IconInline name="globe-americas-filled" size={12} color="secondary" />
              </p>
            </div>
          </div>
        </div>

        {/* Post Body */}
        <div className="mobile-post__body" style={{ marginBottom: '12px' }}>
          {isExpanded ? (
            <p style={{ whiteSpace: 'pre-wrap' }}>{postData.text}</p>
          ) : (
            <p>
              {postData.text.length > 200 ? (
                <>
                  {postData.text.substring(0, 200)}
                  <span 
                    className="mobile-post__see-more"
                    onClick={() => setIsExpanded(true)}
                    style={{ color: '#65676b', cursor: 'pointer' }}
                  >
                    ... See more
                  </span>
                </>
              ) : (
                postData.text
              )}
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
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {/* UFI Buttons */}
        <div className="mobile-post__ufi">
          <div className="mobile-post__ufi-left">
            {/* Like */}
            <button className="mobile-post__ufi-action" onClick={handleLike}>
              <LikeIcon />
              <span>{formatCount(postData.reactions.count)}</span>
            </button>

            {/* Comments */}
            <button className="mobile-post__ufi-action" onClick={handleComment}>
              <CommentIcon />
              <span>{postData.comments}</span>
            </button>

            {/* Share */}
            <button className="mobile-post__ufi-action" onClick={handleShare}>
              <ShareIcon />
              <span>Share</span>
            </button>
          </div>

          {/* Inline Reactions */}
          <div className="mobile-post__ufi-right">
            <div className="mobile-post__ufi-reactions">
              <img src="/images/reactions/like_default_40.png" alt="Like" />
              <img src="/images/reactions/love_default_40.png" alt="Love" />
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div ref={commentsRef} className="mobile-comments-wrapper">
        <MobileComments
          comments={commentsData}
          totalCount={postData.comments}
          postAuthorId={postData.author.name}
          showAllComments={true}
          composerPlaceholder="Log in to comment"
          initialVisibleCount={6}
          onReply={handleReply}
          onLikeComment={handleLikeComment}
          onCommentPromptClick={() => showUpsell({ type: 'comment', count: postData.comments })}
        />
      </div>

      {/* Similar Posts */}
      <RelatedPostsUnit title="Similar posts" onPostClick={handleSimilarPostClick} />

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
