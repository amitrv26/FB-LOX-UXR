"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MobileGroupPost from "../../../../components/mobile/MobileGroupPost";
import MobileComment from "../../../../components/mobile/MobileComment";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../../components/mobile/EndOfFeedUpsell";
import ShareSheet from "../../../../components/mobile/ShareSheet";

const groupData = {
  "nyc-funko-pop-buy-sell-trade": {
    name: "NYC Funko Pop Buy Sell Trade",
    avatar: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=80&h=80&fit=crop",
    cover: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=800&h=300&fit=crop",
    memberCount: "28.4K members",
    postsPerDay: "50+ listings a day",
    description: "Buy, sell, and trade Funko Pops in the NYC area. Meet-ups welcome!",
    posts: [
      {
        id: "fp-1",
        group: {
          id: "nyc-funko-pop-buy-sell-trade",
          name: "NYC Funko Pop Buy Sell Trade",
          avatar: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=80&h=80&fit=crop",
          memberCount: "28.4K members",
          isPublic: true,
        },
        post: {
          id: "fp-post-1",
          author: {
            id: "fp-author-1",
            name: "Danny Rivera",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
            date: "2h",
            privacy: "public",
          },
          title: "WTS: Stranger Things Chase Demogorgon - $85 OBO",
          body: "Selling my Chase Demogorgon Funko Pop, mint condition with protector. Located in Midtown Manhattan, can meet at Times Square area. Open to trades for other Stranger Things chases! 📦",
          reactions: { like: 45, love: 12, total: 57 },
          commentsCount: 23,
          sharesCount: 8,
        },
        featuredComment: {
          id: "fp-c-1",
          author: {
            id: "fp-commenter-1",
            name: "Sarah Kim",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
          },
          text: "PMd! I have a Stranger Things Eleven with Eggos chase I'd trade if you're interested.",
          time: "1h",
          reactions: { like: 8 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "fp-2",
        group: {
          id: "nyc-funko-pop-buy-sell-trade",
          name: "NYC Funko Pop Buy Sell Trade",
          avatar: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=80&h=80&fit=crop",
          memberCount: "28.4K members",
          isPublic: true,
        },
        post: {
          id: "fp-post-2",
          author: {
            id: "fp-author-2",
            name: "Mike Torres",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
            date: "5h",
            privacy: "public",
          },
          title: "NYC Funko Pop meet-up this Saturday at Union Square!",
          body: "Hey everyone! Organizing a trade meet-up this Saturday at 2pm near the Union Square Greenmarket. Bring your duplicates and want lists. Last month we had 30+ people show up! 🎉",
          reactions: { like: 120, love: 34, total: 154 },
          commentsCount: 67,
          sharesCount: 22,
        },
        featuredComment: {
          id: "fp-c-2",
          author: {
            id: "fp-commenter-2",
            name: "Jess Patel",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
          },
          text: "I'll be there! Bringing my Marvel exclusives and looking for any Disney Parks pops. See everyone Saturday!",
          time: "3h",
          reactions: { like: 15 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "fp-3",
        group: {
          id: "nyc-funko-pop-buy-sell-trade",
          name: "NYC Funko Pop Buy Sell Trade",
          avatar: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=80&h=80&fit=crop",
          memberCount: "28.4K members",
          isPublic: true,
        },
        post: {
          id: "fp-post-3",
          author: {
            id: "fp-author-3",
            name: "Alex Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
            date: "8h",
            privacy: "public",
          },
          title: "Price check: Funko Pop Hawkins Gang Set (6 pack)?",
          body: "Found a complete Hawkins Gang 6-pack set at a flea market in Brooklyn for $55. Is that a good deal? Box has minor shelf wear but all figures are mint. Thanks!",
          reactions: { like: 32, love: 5, total: 37 },
          commentsCount: 41,
          sharesCount: 3,
        },
        featuredComment: {
          id: "fp-c-3",
          author: {
            id: "fp-commenter-3",
            name: "Tom Bradley",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
          },
          text: "That's a steal! They usually go for $65-75 in this condition. Grab it before someone else does.",
          time: "7h",
          reactions: { like: 22 },
          replies: [],
          replyCount: 0,
        },
      },
    ],
  },
  "nyc-collectibles-marketplace": {
    name: "NYC Collectibles Marketplace",
    avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=300&fit=crop",
    memberCount: "52.1K members",
    postsPerDay: "120+ listings a day",
    description: "NYC's largest online collectibles marketplace. Toys, cards, memorabilia & more.",
    posts: [
      {
        id: "col-1",
        group: {
          id: "nyc-collectibles-marketplace",
          name: "NYC Collectibles Marketplace",
          avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
          memberCount: "52.1K members",
          isPublic: true,
        },
        post: {
          id: "col-post-1",
          author: {
            id: "col-author-1",
            name: "Rachel Green",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
            date: "1h",
            privacy: "public",
          },
          title: "WTS: Vintage Stranger Things Board Game Collection",
          body: "Cleaning out my collection - selling Stranger Things Monopoly (sealed), Eggo Card Game, and the Ouija Board edition. All in great condition. Will sell individually or as a bundle for $90. Pickup in SoHo or can ship! 🎲",
          reactions: { like: 67, love: 18, total: 85 },
          commentsCount: 34,
          sharesCount: 12,
        },
        featuredComment: {
          id: "col-c-1",
          author: {
            id: "col-commenter-1",
            name: "Kevin Park",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
          },
          text: "Interested in the sealed Monopoly! What's your price for just that one? I'm in the West Village so SoHo works.",
          time: "45m",
          reactions: { like: 5 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "col-2",
        group: {
          id: "nyc-collectibles-marketplace",
          name: "NYC Collectibles Marketplace",
          avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
          memberCount: "52.1K members",
          isPublic: true,
        },
        post: {
          id: "col-post-2",
          author: {
            id: "col-author-2",
            name: "Marcus Lee",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
            date: "3h",
            privacy: "public",
          },
          title: "Just scored these at a Brooklyn estate sale!",
          body: "Found a box of 90s action figures and vintage TV show memorabilia at an estate sale in Park Slope. Some real gems in here including sealed Stranger Things promo items from the Netflix launch. Will be listing everything this week! 📸",
          reactions: { like: 198, love: 45, total: 243 },
          commentsCount: 89,
          sharesCount: 31,
        },
        featuredComment: {
          id: "col-c-2",
          author: {
            id: "col-commenter-2",
            name: "Diana Wu",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
          },
          text: "Please post pics of the Stranger Things promo items! Those Netflix launch exclusives are getting really hard to find.",
          time: "2h",
          reactions: { like: 28 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "col-3",
        group: {
          id: "nyc-collectibles-marketplace",
          name: "NYC Collectibles Marketplace",
          avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
          memberCount: "52.1K members",
          isPublic: true,
        },
        post: {
          id: "col-post-3",
          author: {
            id: "col-author-3",
            name: "Naomi Scott",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
            date: "6h",
            privacy: "public",
          },
          title: "ISO: Steve Harrington autographed items",
          body: "Looking to buy any Joe Keery / Steve Harrington signed merchandise. Cards, posters, Funko Pops - anything! Budget is flexible for the right piece. DM me what you have! ✍️",
          reactions: { like: 29, love: 8, total: 37 },
          commentsCount: 18,
          sharesCount: 6,
        },
        featuredComment: {
          id: "col-c-3",
          author: {
            id: "col-commenter-3",
            name: "Ethan Brooks",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
          },
          text: "I have a signed photo from NYCC 2023! DM me if interested.",
          time: "5h",
          reactions: { like: 11 },
          replies: [],
          replyCount: 0,
        },
      },
    ],
  },
  "lego-buy-sell-trade-nyc": {
    name: "LEGO Buy Sell Trade NYC",
    avatar: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=80&h=80&fit=crop",
    cover: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=300&fit=crop",
    memberCount: "15.7K members",
    postsPerDay: "35+ listings a day",
    description: "Buy, sell, and trade LEGO sets in New York City. New and used sets welcome!",
    posts: [
      {
        id: "lego-1",
        group: {
          id: "lego-buy-sell-trade-nyc",
          name: "LEGO Buy Sell Trade NYC",
          avatar: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=80&h=80&fit=crop",
          memberCount: "15.7K members",
          isPublic: true,
        },
        post: {
          id: "lego-post-1",
          author: {
            id: "lego-author-1",
            name: "Chris Martinez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
            date: "1h",
            privacy: "public",
          },
          title: "WTS: LEGO The Upside Down 75810 - Complete, $180",
          body: "Selling my complete LEGO Stranger Things The Upside Down set #75810. All pieces present, includes minifigures and instructions. Original box available too (some wear). Pickup in Astoria or can meet in Manhattan. 🧱",
          reactions: { like: 89, love: 23, total: 112 },
          commentsCount: 45,
          sharesCount: 18,
        },
        featuredComment: {
          id: "lego-c-1",
          author: {
            id: "lego-commenter-1",
            name: "Pat O'Brien",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
          },
          text: "Great price! This set is retired and going for $250+ on BrickLink. Would you take $170?",
          time: "30m",
          reactions: { like: 12 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "lego-2",
        group: {
          id: "lego-buy-sell-trade-nyc",
          name: "LEGO Buy Sell Trade NYC",
          avatar: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=80&h=80&fit=crop",
          memberCount: "15.7K members",
          isPublic: true,
        },
        post: {
          id: "lego-post-2",
          author: {
            id: "lego-author-2",
            name: "Amy Zhang",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
            date: "4h",
            privacy: "public",
          },
          title: "Custom MOC: Stranger Things Hawkins Lab - build pics inside!",
          body: "Just finished my custom Hawkins National Laboratory MOC! Used about 3,200 pieces. Took me 3 months to design and build. Not for sale but happy to share the instructions if there's interest! What do you guys think? 🔬",
          reactions: { like: 312, love: 87, total: 399 },
          commentsCount: 112,
          sharesCount: 56,
        },
        featuredComment: {
          id: "lego-c-2",
          author: {
            id: "lego-commenter-2",
            name: "Jake Williams",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
          },
          text: "This is INCREDIBLE! The detail on the lab entrance is insane. Would absolutely buy the instructions if you made them available!",
          time: "3h",
          reactions: { like: 45 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "lego-3",
        group: {
          id: "lego-buy-sell-trade-nyc",
          name: "LEGO Buy Sell Trade NYC",
          avatar: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=80&h=80&fit=crop",
          memberCount: "15.7K members",
          isPublic: true,
        },
        post: {
          id: "lego-post-3",
          author: {
            id: "lego-author-3",
            name: "Lisa Nguyen",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
            date: "9h",
            privacy: "public",
          },
          title: "ISO: LEGO Creel House MOC or any ST custom builds",
          body: "Looking to buy any Stranger Things themed LEGO sets or custom MOCs. Especially interested in a Creel House build if anyone has one. Budget up to $100. Also looking for any minifig lot of ST characters. Located in UWS. 🏠",
          reactions: { like: 18, love: 4, total: 22 },
          commentsCount: 14,
          sharesCount: 2,
        },
        featuredComment: {
          id: "lego-c-3",
          author: {
            id: "lego-commenter-3",
            name: "Ben Foster",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
          },
          text: "I have a Creel House MOC I built from BrickLink instructions. Would let it go for $85. DMing you pics!",
          time: "8h",
          reactions: { like: 6 },
          replies: [],
          replyCount: 0,
        },
      },
    ],
  },
  "toys-games-resellers-ny": {
    name: "Toys & Games Resellers NY",
    avatar: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=80&h=80&fit=crop",
    cover: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=300&fit=crop",
    memberCount: "41.3K members",
    postsPerDay: "80+ listings a day",
    description: "New York's top reseller group for toys, games, and collectibles. Tips, finds & deals!",
    posts: [
      {
        id: "toy-1",
        group: {
          id: "toys-games-resellers-ny",
          name: "Toys & Games Resellers NY",
          avatar: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=80&h=80&fit=crop",
          memberCount: "41.3K members",
          isPublic: true,
        },
        post: {
          id: "toy-post-1",
          author: {
            id: "toy-author-1",
            name: "Victor Ramirez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
            date: "30m",
            privacy: "public",
          },
          title: "Target clearance alert: Stranger Things toys 70% off!",
          body: "Heads up! The Target in East Harlem just put all their Stranger Things toys and games on 70% clearance. Saw Funko Pops for $4, board games for $8, and action figures for $5. Get there before they're gone! 🏃‍♂️💨",
          reactions: { like: 234, love: 56, total: 290 },
          commentsCount: 98,
          sharesCount: 67,
        },
        featuredComment: {
          id: "toy-c-1",
          author: {
            id: "toy-commenter-1",
            name: "Maria Santos",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
          },
          text: "Just went - they still have a ton! Grabbed 8 Funko Pops for $32 total. Thanks for the tip!! 🙌",
          time: "15m",
          reactions: { like: 34 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "toy-2",
        group: {
          id: "toys-games-resellers-ny",
          name: "Toys & Games Resellers NY",
          avatar: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=80&h=80&fit=crop",
          memberCount: "41.3K members",
          isPublic: true,
        },
        post: {
          id: "toy-post-2",
          author: {
            id: "toy-author-2",
            name: "Tina Wu",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
            date: "3h",
            privacy: "public",
          },
          title: "Best spots to source vintage toys in NYC?",
          body: "New to reselling and want to find good sourcing spots in NYC for vintage toys and collectibles. I know about the usual flea markets but looking for hidden gems. Anyone have recommendations? Also interested in Stranger Things stuff specifically 🔍",
          reactions: { like: 67, love: 11, total: 78 },
          commentsCount: 52,
          sharesCount: 15,
        },
        featuredComment: {
          id: "toy-c-2",
          author: {
            id: "toy-commenter-2",
            name: "Derek Johnson",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
          },
          text: "The Annex on W 39th on weekends is amazing for vintage finds. Also check out estate sales in Brooklyn - I've found some incredible Stranger Things promo items that way.",
          time: "2h",
          reactions: { like: 19 },
          replies: [],
          replyCount: 0,
        },
      },
      {
        id: "toy-3",
        group: {
          id: "toys-games-resellers-ny",
          name: "Toys & Games Resellers NY",
          avatar: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=80&h=80&fit=crop",
          memberCount: "41.3K members",
          isPublic: true,
        },
        post: {
          id: "toy-post-3",
          author: {
            id: "toy-author-3",
            name: "Jordan Blake",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
            date: "7h",
            privacy: "public",
          },
          title: "WTS: Full Stranger Things PEZ collection + display",
          body: "Selling my complete Stranger Things PEZ dispensers collection (12 characters) with the custom acrylic display case. All in mint condition, never dispensed. Asking $45 for everything. Located in Williamsburg. 🍬",
          reactions: { like: 41, love: 9, total: 50 },
          commentsCount: 21,
          sharesCount: 7,
        },
        featuredComment: {
          id: "toy-c-3",
          author: {
            id: "toy-commenter-3",
            name: "Olivia Hart",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
          },
          text: "That display case alone is worth it! Is the Joyce one included? That's the hardest one to find.",
          time: "6h",
          reactions: { like: 7 },
          replies: [],
          replyCount: 0,
        },
      },
    ],
  },
};

export default function GroupDiscussionPage() {
  const params = useParams();
  const groupId = params.groupId;
  const group = groupData[groupId];

  const [upsellType, setUpsellType] = useState(null);
  const [upsellCount, setUpsellCount] = useState(0);
  const [showShareSheet, setShowShareSheet] = useState(false);

  if (!group) {
    return (
      <div style={{ padding: '40px 16px', textAlign: 'center', color: '#65686c' }}>
        Group not found
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: '100px' }}>
      {/* Group Header */}
      <div style={{ position: 'relative' }}>
        {/* Cover Image */}
        <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
          <img
            src={group.cover}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Group Info */}
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid #fff',
              marginTop: '-24px',
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}>
              <img
                src={group.avatar}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '17px',
                fontWeight: 700,
                lineHeight: '22px',
                color: '#050505',
                margin: 0,
              }}>
                {group.name}
              </h1>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '18px',
                color: '#65686c',
                margin: '2px 0 0',
              }}>
                {group.memberCount} · {group.postsPerDay}
              </p>
            </div>
          </div>

          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#050505',
            margin: '12px 0 0',
          }}>
            {group.description}
          </p>

          {/* Join + Invite buttons */}
          <div style={{ display: 'flex', gap: '8px', margin: '12px 0 0' }}>
            <button
              onClick={() => setUpsellType('join_group')}
              style={{
                flex: 1,
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#0866ff',
                color: '#fff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                lineHeight: '20px',
                cursor: 'pointer',
              }}
            >
              Join group
            </button>
            <button
              onClick={() => setShowShareSheet(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#e4e6eb',
                color: '#050505',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                lineHeight: '20px',
                cursor: 'pointer',
              }}
            >
              Invite
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '8px', background: '#f0f2f5', marginTop: '16px' }} />
      </div>

      {/* Discussion header */}
      <div style={{ padding: '12px 16px 4px' }}>
        <h2 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontSize: '17px',
          fontWeight: 700,
          lineHeight: '22px',
          color: '#050505',
          margin: 0,
        }}>
          Discussion
        </h2>
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {group.posts.map((item, index) => (
          <div
            key={item.id}
            style={{
              background: '#fff',
              borderBottom: index < group.posts.length - 1 ? '1px solid #e4e6eb' : 'none',
            }}
          >
            <MobileGroupPost
              group={item.group}
              post={item.post}
              hideAiBadge={true}
              hideSeeMore={true}
              maxLines={5}
              onJoinGroup={() => setUpsellType('join_group')}
              onLike={() => {
                setUpsellCount(item.post.reactions.total);
                setUpsellType('like');
              }}
              onComment={() => {
                setUpsellCount(item.post.commentsCount);
                setUpsellType('comment');
              }}
              onShare={() => setShowShareSheet(true)}
            />
            {item.featuredComment && (
              <div style={{ padding: 0, cursor: 'default' }}>
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

      <ShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />
    </div>
  );
}
