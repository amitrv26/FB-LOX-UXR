"use client";

import { useState } from "react";
import MobileGroupPost from "../../../components/mobile/MobileGroupPost";
import MobileComment from "../../../components/mobile/MobileComment";
import UpsellBottomSheet from "../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../components/mobile/EndOfFeedUpsell";
import ShareSheet from "../../../components/mobile/ShareSheet";

// Groups feed data - diverse group posts with featured comments
const groupsFeedData = [
  {
    id: "stranger-things-finale",
    group: {
      id: "stranger-things-fans",
      name: "Stranger Things Fans",
      avatar: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=80&h=80&fit=crop",
      memberCount: "2.1M members",
      isPublic: true,
    },
    post: {
      id: "st-finale-post",
      author: {
        id: "author-maya",
        name: "Maya Rodriguez",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
        date: "2h",
        privacy: "public",
      },
      title: "When is the Stranger Things finale coming out?",
      aiGenerated: true,
      body: `Just catching up on all the Season 5 news! I know they split it into volumes but I'm confused about the release schedule. When exactly does the finale drop? 

I want to plan a watch party with friends and need to know when to book the day off work! 📺🍿`,
      reactions: {
        like: 342,
        love: 89,
        total: 431,
      },
      commentsCount: 156,
      sharesCount: 45,
    },
    featuredComment: {
      id: "comment-st-1",
      author: {
        id: "commenter-1",
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
      },
      text: "Netflix confirmed Nov 15 for Volume 1, then Volume 2 drops the following Friday. I already requested PTO for both — no way I'm getting spoiled at work again like last season 😅",
      time: "1h",
      reactions: { like: 89 },
      replies: [],
      replyCount: 0,
    },
  },
  {
    id: "portland-coffee",
    group: {
      id: "portland-maine-community",
      name: "Portland, Maine Community",
      avatar: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=80&h=80&fit=crop",
      memberCount: "45.2K members",
      isPublic: true,
    },
    post: {
      id: "coffee-post",
      author: {
        id: "author-emily",
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
        date: "5h",
        privacy: "public",
      },
      title: "What are the best cafes in Portland, Maine?",
      aiGenerated: true,
      body: `Hi everyone! I just moved to Portland and I'm a huge coffee lover ☕

I work remotely so I'm looking for cafes with good wifi, great coffee, and a nice atmosphere to work from. Bonus points if they have outdoor seating for warmer days!`,
      reactions: {
        like: 24,
        love: 8,
        total: 32,
      },
      commentsCount: 21,
      sharesCount: 12,
    },
    featuredComment: {
      id: "comment-portland-1",
      author: {
        id: "commenter-2",
        name: "Rachel Adams",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
      },
      text: "Tandem Coffee Roasters on Congress St is my go-to for remote work days — wifi is fast, outlets at most tables, and their almond croissant is dangerous. Speckled Ax is great too but gets packed by 10am on weekdays.",
      time: "3h",
      reactions: { like: 12 },
      replies: [],
      replyCount: 0,
    },
  },
  {
    id: "diy-thanksgiving",
    group: {
      id: "diy-home-decor",
      name: "DIY Home Decor Ideas",
      avatar: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=80&h=80&fit=crop",
      memberCount: "890K members",
      isPublic: true,
    },
    post: {
      id: "pinecone-post",
      author: {
        id: "author-sarah",
        name: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
        date: "8h",
        privacy: "public",
      },
      title: "Creative pinecone centerpiece ideas for Thanksgiving?",
      aiGenerated: true,
      body: `I collected SO many pinecones this fall and want to make some beautiful Thanksgiving centerpieces! 🍂

Looking for easy DIY ideas that don't require too many supplies. Bonus points for kid-friendly crafts we can do as a family!`,
      reactions: {
        like: 156,
        love: 67,
        total: 223,
      },
      commentsCount: 89,
      sharesCount: 34,
    },
    featuredComment: {
      id: "comment-diy-1",
      author: {
        id: "commenter-3",
        name: "Lisa Martinez",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=faces",
      },
      text: "My kids and I did this last year — we painted the tips gold, tossed them in a wooden bowl with cinnamon sticks and dried orange slices. Took maybe 30 minutes and honestly it looked better than anything I could've bought. The house smelled incredible for weeks too 🎨",
      time: "6h",
      reactions: { like: 45 },
      replies: [],
      replyCount: 0,
    },
  },
  {
    id: "nfl-streaming",
    group: {
      id: "nfl-fans",
      name: "NFL Fans & Fantasy Football",
      avatar: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=80&h=80&fit=crop",
      memberCount: "1.5M members",
      isPublic: true,
    },
    post: {
      id: "streaming-post",
      author: {
        id: "author-james",
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
        date: "12h",
        privacy: "public",
      },
      title: "Best way to stream NFL games without cable?",
      aiGenerated: true,
      body: `Cut the cord last month and now I'm scrambling to find a good way to watch football! 🏈

What streaming services do you all use? Looking for something reliable that won't break the bank. Sunday Ticket worth it?`,
      reactions: {
        like: 89,
        love: 12,
        total: 101,
      },
      commentsCount: 67,
      sharesCount: 23,
    },
    featuredComment: {
      id: "comment-nfl-1",
      author: {
        id: "commenter-4",
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
      },
      text: "I've tried pretty much everything — YouTube TV is the most reliable for live games, no buffering issues during primetime. Sunday Ticket is only worth it if your team is out of market though. Otherwise you're paying $350 for games you'd already get on local channels.",
      time: "10h",
      reactions: { like: 34 },
      replies: [],
      replyCount: 0,
    },
  },
];

export default function GroupsFeedPage() {
  const [upsellType, setUpsellType] = useState(null);
  const [upsellCount, setUpsellCount] = useState(0);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const handleLikeAction = (reactionCount) => {
    setUpsellCount(reactionCount);
    setUpsellType('like');
  };

  const handleShareAction = () => {
    setShowShareSheet(true);
  };

  const handleCommentAction = (commentCount) => {
    setUpsellCount(commentCount);
    setUpsellType('comment');
  };

  return (
    <div className="groups-feed-page">
      {/* Feed */}
      <div className="groups-feed-page__feed">
        {groupsFeedData.map((item, index) => (
          <div 
            key={item.id} 
            className={`groups-feed-page__post-wrapper ${index < groupsFeedData.length - 1 ? 'groups-feed-page__post-wrapper--with-divider' : ''}`}
          >
            <MobileGroupPost
              group={item.group}
              post={item.post}
              hideAiBadge={true}
              hideSeeMore={true}
              maxLines={5}
              onJoinGroup={() => setUpsellType('joinGroup')}
              onLike={() => handleLikeAction(item.post.reactions.total)}
              onComment={() => handleCommentAction(item.post.commentsCount)}
              onShare={handleShareAction}
            />
            {/* Featured Comment */}
            {item.featuredComment && (
              <div className="groups-feed-page__comment">
                <MobileComment
                  comment={item.featuredComment}
                  postAuthorId={item.post.author.id}
                  onReply={() => setUpsellType('generic')}
                  onLike={() => setUpsellType('generic')}
                  isExpanded={false}
                  onToggleReplies={() => {}}
                />
              </div>
            )}
          </div>
        ))}
        <EndOfFeedUpsell hideWordmark={true} />
      </div>

      <UpsellBottomSheet
        isOpen={!!upsellType}
        onClose={() => setUpsellType(null)}
        type={upsellType || 'generic'}
        count={upsellCount}
      />

      {/* Share Sheet */}
      <ShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />

      <style jsx>{`
        .groups-feed-page {
          min-height: 100vh;
          background: #fff;
          padding-bottom: 100px;
        }

        .groups-feed-page__feed {
          display: flex;
          flex-direction: column;
        }

        .groups-feed-page__post-wrapper {
          background: #fff;
        }

        .groups-feed-page__post-wrapper--with-divider {
          border-bottom: 1px solid #e4e6eb;
        }

        .groups-feed-page__comment {
          padding: 0;
          cursor: default;
        }
      `}</style>
    </div>
  );
}

