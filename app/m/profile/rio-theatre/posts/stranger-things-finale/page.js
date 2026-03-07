"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "../../../../../../components/mobile/MobileHeader";
import MobileComments from "../../../../../../components/mobile/MobileComments";
import UpsellBottomSheet from "../../../../../../components/mobile/UpsellBottomSheet";
import MarketplaceUnit from "../../../../../../components/mobile/MarketplaceUnit";
import RelatedPostsUnit from "../../../../../../components/mobile/RelatedPostsUnit";
import ShareSheet from "../../../../../../components/mobile/ShareSheet";
import { AISparkleIcon } from "../../../../../../components/icons";
import { IconInline } from "../../../../../../components/Icon";

// Profile data for Webster Hall (post author)
const profileData = {
  name: "Webster Hall",
  verified: true,
  username: "websterhall",
  bio: "Music Venue",
  followers: "180K",
  profileImage: "/images/rio-theatre/Entity header/Actor.png",
};

// Post data - Webster Hall announcing the Sabrina Carpenter concert
const postData = {
  id: "stranger-things-finale",
  aiGenerated: false,
  body: `🎤 SABRINA CARPENTER LIVE AT WEBSTER HALL - NYC! 🎤

We're thrilled to announce a special intimate show with Sabrina Carpenter at NYC's legendary Webster Hall!

📅 Date: March 28, 2026
🎟️ Doors open: 7:00 PM
🎤 Show starts: 8:30 PM
✨ VIP Meet & Greet: 6:00 PM`,
  image: "/images/rio-theatre/DATA-UNSPLASH-@slientlymine-coffee.png",
  postedTime: "2h",
  reactions: {
    like: 4500,
    love: 620,
    wow: 80,
    total: 5200,
  },
  commentsCount: 48,
  sharesCount: 1200,
};

// Comments data - Webster Hall Sabrina Carpenter concert (48 total comments)
const commentsData = [
  {
    id: "comment-1",
    author: {
      id: "user-1",
      name: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    },
    text: "OMG SABRINA AT WEBSTER HALL?! This is going to be SO intimate and amazing!! Already got my tickets and I'm literally shaking 🎟️",
    time: "1h",
    reactions: { like: 189 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-2",
    author: {
      id: "user-2",
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Webster Hall is the PERFECT venue for this! The sound in the Grand Ballroom is incredible. This is going to be an unforgettable night!",
    time: "1h",
    reactions: { like: 134 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-3",
    author: {
      id: "user-3",
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
    },
    text: "I'm literally crying right now 😭 Espresso live at Webster Hall?? This is a dream come true for every NYC Sabrina fan!",
    time: "58m",
    reactions: { like: 267 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-4",
    author: {
      id: "user-4",
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Just tried to get tickets and it says almost sold out already! If anyone has extras please let me know 🙏",
    time: "45m",
    reactions: { like: 67 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-5",
    author: {
      id: "user-5",
      name: "Jessica Park",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Webster Hall always gets the best acts! Remember Chappell Roan last month? That was insane. This is going to be even better!",
    time: "42m",
    reactions: { like: 98 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-6",
    author: {
      id: "user-6",
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Does anyone know if there will be merch available at the show? I'd love to grab something exclusive!",
    time: "38m",
    reactions: { like: 45 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-7",
    author: {
      id: "user-7",
      name: "Webster Hall",
      avatar: "/images/rio-theatre/Entity header/Actor.png",
      verified: true,
    },
    text: "Thanks everyone for the incredible response! 🙏 Yes, there will be exclusive tour merch and a special Webster Hall x Sabrina Carpenter collab available at the venue. See you there!",
    time: "35m",
    reactions: { like: 456 },
    replies: [],
    replyCount: 0,
    isAuthor: true,
  },
  {
    id: "comment-8",
    author: {
      id: "user-8",
      name: "Nicole Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Coming from Jersey for this! The L train straight to the East Village, easy. Worth it 100%",
    time: "30m",
    reactions: { like: 78 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-9",
    author: {
      id: "user-9",
      name: "Brandon Lee",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "My sister is going to lose her mind when I tell her about this! Best surprise birthday present ever 🎉",
    time: "28m",
    reactions: { like: 56 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-10",
    author: {
      id: "user-10",
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=64&h=64&fit=crop&crop=faces",
    },
    text: "NYC really is the best city for live music! We're so lucky to have Webster Hall 🗽",
    time: "25m",
    reactions: { like: 123 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-11",
    author: {
      id: "user-11",
      name: "Tyler Jackson",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Anyone want to meet up before the show? There are great spots on 11th St to grab food first!",
    time: "22m",
    reactions: { like: 34 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-12",
    author: {
      id: "user-12",
      name: "Amanda Foster",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
    },
    text: "I've never been to Webster Hall before but this is definitely going to be my first time! Any tips on where to stand?",
    time: "20m",
    reactions: { like: 23 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-13",
    author: {
      id: "user-13",
      name: "Jake Morrison",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Please Somebody Tell Me Something Good about getting tickets because I need to be there!! 🎶",
    time: "18m",
    reactions: { like: 89 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-14",
    author: {
      id: "user-14",
      name: "Lisa Nguyen",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Already planning my outfit! Sabrina's aesthetic is everything. Who else is going all out?",
    time: "15m",
    reactions: { like: 112 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-15",
    author: {
      id: "user-15",
      name: "Ryan Peters",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=faces",
    },
    text: "If she performs Nonsense live I will actually pass out on the floor of Webster Hall 😂",
    time: "14m",
    reactions: { like: 178 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-16",
    author: {
      id: "user-16",
      name: "Olivia Martinez",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=64&h=64&fit=crop&crop=faces",
    },
    text: "This venue has such incredible energy. Seeing Sabrina in a place this intimate is going to be magical ✨",
    time: "12m",
    reactions: { like: 67 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-17",
    author: {
      id: "user-17",
      name: "Chris Taylor",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Been following Sabrina since Girl Meets World days. So proud of how far she's come. NYC is going to show up for her!",
    time: "10m",
    reactions: { like: 93 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-18",
    author: {
      id: "user-18",
      name: "Megan Wright",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Anyone know what time we should line up to get a good spot near the stage?",
    time: "8m",
    reactions: { like: 29 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-19",
    author: {
      id: "user-19",
      name: "Daniel Kim",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces",
    },
    text: "This is why NYC is the best city in the world for live music. Things like this just don't happen anywhere else!",
    time: "7m",
    reactions: { like: 84 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-20",
    author: {
      id: "user-20",
      name: "Sophie Anderson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Got my ticket! GA Floor, see everyone there! 🎤",
    time: "6m",
    reactions: { like: 28 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-21",
    author: {
      id: "user-21",
      name: "Kevin Patel",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "The VIP Meet & Greet is going to be so special. I can't handle this 😢",
    time: "5m",
    reactions: { like: 33 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-22",
    author: {
      id: "user-22",
      name: "Hannah Brooks",
      avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Sabrina Carpenter + Webster Hall = literally the perfect combination ❤️",
    time: "4m",
    reactions: { like: 47 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-23",
    author: {
      id: "user-23",
      name: "Michael Davis",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Sabrina doing an intimate show like this? In NYC? She really loves her fans. What a queen!",
    time: "3m",
    reactions: { like: 61 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-24",
    author: {
      id: "user-24",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    },
    text: "This is the event of the year! Already told all my friends 📣",
    time: "2m",
    reactions: { like: 22 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-25",
    author: {
      id: "user-25",
      name: "Jason Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Running, not walking to get my tickets right now! 🏃‍♂️",
    time: "1m",
    reactions: { like: 18 },
    replies: [],
    replyCount: 0,
  },
  {
    id: "comment-26",
    author: {
      id: "user-26",
      name: "Rachel Green",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
    },
    text: "Just now seeing this - BEST NEWS EVER! 🙌",
    time: "Just now",
    reactions: { like: 5 },
    replies: [],
    replyCount: 0,
  },
];

// Concert merch listings for marketplace grid
const merchListings = [
  {
    id: 1,
    title: "Sabrina Carpenter Tour T-Shirt",
    price: "$35",
    location: "New York · 2 mi away",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop.jpg",
  },
  {
    id: 2,
    title: "Short n' Sweet Vinyl LP",
    price: "$28",
    location: "Brooklyn · 3 mi away",
    image: "/images/stranger-things-assets/images/marketplace/funko-pop-2.jpg",
  },
  {
    id: 3,
    title: "Webster Hall Concert Poster - Limited",
    price: "$15",
    location: "Manhattan · 1 mi away",
    image: "/images/stranger-things-assets/images/marketplace/lego-creel-house.jpg",
  },
  {
    id: 4,
    title: "Sabrina Carpenter Signed Photo",
    price: "$45",
    location: "Queens · 5 mi away",
    image: "/images/stranger-things-assets/images/marketplace/pez-set.jpg",
  },
];

// Badge Checkmark Icon
const BadgeCheckmarkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="6" cy="6" r="6" fill="#0866ff"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// AI Sparkle icon wrapper
const GenAiStarIcon = () => <AISparkleIcon size={12} color="currentColor" className="mobile-post__ai-icon" />;

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

export default function RioTheatrePostPage() {
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [upsellConfig, setUpsellConfig] = useState({ type: 'generic', count: 0 });
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsRef = useRef(null);

  // Handle click on similar post - navigate to that post's permalink
  const handleSimilarPostClick = (post) => {
    // Store the post data in sessionStorage for the destination page
    sessionStorage.setItem('similarPost', JSON.stringify(post));
    // Navigate to the similar post page
    router.push(`/m/profile/similar-post/${post.id}`);
  };

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
    setShowAllComments(true);
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
    <div className="mobile-post-page has-floating-tab-bar" style={{ overflowX: 'hidden' }}>
      {/* Facebook Header */}
      <MobileHeader />

      {/* Post Content */}
      <article className="mobile-post" style={{ background: '#fff' }}>
        {/* Post Header - Profile attribution (single circle avatar) */}
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
                loading="eager"
                fetchPriority="high"
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
                <IconInline name="globe-americas-filled" size={12} color="secondary" />
              </p>
            </div>
          </div>
        </div>

        {/* Post Title - AI-generated (only shown if aiGenerated is true) */}
        {postData.aiGenerated && postData.title && (
          <>
            <div className="mobile-post__title">
              <h1>{postData.title}</h1>
            </div>

            {/* AI Badge */}
            <div className="mobile-post__ai-badge">
              <GenAiStarIcon />
              <span>Title generated by AI from Meta</span>
            </div>
          </>
        )}

        {/* Post Body */}
        <div className="mobile-post__body" style={{ marginBottom: '12px' }}>
          {isExpanded ? (
            postData.body.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>
              {postData.body.substring(0, 205)}
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
              <span>{formatCount(postData.reactions.total)}</span>
            </button>

            {/* Comments */}
            <button className="mobile-post__ufi-action" onClick={handleComment}>
              <CommentIcon />
              <span>{postData.commentsCount}</span>
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
          totalCount={postData.commentsCount}
          postAuthorId="rio-theatre"
          showAllComments={showAllComments}
          composerPlaceholder="Log in to comment"
          initialVisibleCount={6}
          onReply={handleReply}
          onLikeComment={handleLikeComment}
          onCommentPromptClick={() => showUpsell({ type: 'comment', count: postData.commentsCount })}
        />
      </div>

      {/* Similar Posts */}
      <RelatedPostsUnit title="Similar posts" onPostClick={handleSimilarPostClick} />

      {/* Shop Marketplace Items */}
      <MarketplaceUnit 
        title="Shop for merchandise" 
        listings={merchListings}
        showSeeAll={true}
      />

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
