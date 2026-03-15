"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../../components/mobile/EndOfFeedUpsell";
import ReviewsSheet from "../../../../components/mobile/ReviewsSheet";
import RelatedPostsUnit from "../../../../components/mobile/RelatedPostsUnit";
import ShareSheet from "../../../../components/mobile/ShareSheet";
import { IconInline } from "../../../../components/Icon";

// Profile data for Scotiabank Theatre
const profileData = {
  name: "Scotiabank Theatre",
  verified: true,
  username: "scotiabanktheatre",
  description: "Vancouver's premier movie destination! Experience the latest blockbusters in IMAX, UltraAVX, and D-BOX. Located in the heart of downtown Vancouver.",
  recommendedPercent: "88",
  priceRange: "$$",
  followers: "28K",
  following: "42",
  coverImage: "/images/rio-theatre/scotiabank.png",
  profileImage: "/images/rio-theatre/scotiabank.png",
};

// Sample posts data
const postsData = [
  {
    id: "post-1",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "3h",
    },
    text: "🎬 AVATAR 3 - EXCLUSIVE IMAX PREMIERE! 🎬\n\nBe among the first to experience the next chapter in James Cameron's epic saga! Our IMAX screen delivers the ultimate visual experience.\n\n📅 Opening Night: February 14, 2026\n🎟️ Tickets on sale now!",
    image: "/images/rio-theatre/1.png",
    reactions: { count: "1.8K", like: true, love: true },
    comments: "89",
    shares: "156",
  },
  {
    id: "post-2",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "1d",
    },
    text: "Weekend movie plans? We've got you covered! 🍿\n\nCheck out our lineup of new releases and grab your tickets before they sell out!",
    image: "/images/rio-theatre/2.png",
    reactions: { count: "234", like: true, love: true },
    comments: "45",
    shares: "23",
  },
  {
    id: "post-3",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "2d",
    },
    text: "Our IMAX auditorium just got a major upgrade! 🔊 Experience Dolby Atmos sound like never before. The future of cinema is here!",
    image: "/images/rio-theatre/3.png",
    reactions: { count: "567", like: true, love: true },
    comments: "78",
    shares: "34",
  },
  {
    id: "post-4",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "4d",
    },
    text: "Family movie night just got better! 👨‍👩‍👧‍👦 Bring the kids for our special animated features every Saturday morning. Popcorn combos starting at $12!",
    image: "/images/rio-theatre/4.png",
    reactions: { count: "189", like: true, love: true },
    comments: "34",
    shares: "18",
  },
  {
    id: "post-5",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "1w",
    },
    text: "D-BOX motion seats are back! Feel every action scene like you're part of the movie. Available for select screenings. 🎢",
    image: "/images/rio-theatre/5.png",
    reactions: { count: "423", like: true, love: true },
    comments: "56",
    shares: "29",
  },
  {
    id: "post-6",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "1w",
    },
    text: "Thank you Vancouver for making us your #1 movie destination! 🏆 We're honored to serve this amazing community.",
    image: "/images/rio-theatre/6.png",
    reactions: { count: "312", like: true, love: true },
    comments: "67",
    shares: "41",
  },
  {
    id: "post-7",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "2w",
    },
    text: "Late night movie marathon anyone? 🌙 Our midnight screenings are perfect for night owls. Check our schedule for this weekend's lineup!",
    image: "/images/rio-theatre/7.png",
    reactions: { count: "156", like: true, love: true },
    comments: "23",
    shares: "12",
  },
  {
    id: "post-8",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "2w",
    },
    text: "New concession menu alert! 🍕 Try our gourmet pizza slices and craft sodas. Movie snacks just leveled up!",
    image: "/images/rio-theatre/8.png",
    reactions: { count: "289", like: true, love: true },
    comments: "92",
    shares: "37",
  },
  {
    id: "post-9",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "3w",
    },
    text: "Behind the scenes at our projection room! 🎥 State-of-the-art laser projection brings you the clearest, brightest images possible.",
    image: "/images/rio-theatre/9.png",
    reactions: { count: "198", like: true, love: true },
    comments: "41",
    shares: "19",
  },
  {
    id: "post-10",
    author: {
      name: "Scotiabank Theatre",
      verified: true,
      date: "3w",
    },
    text: "Movie magic happens here! ✨ What's your favorite Scotiabank Theatre memory? Share in the comments!",
    image: "/images/rio-theatre/1.png",
    reactions: { count: "234", like: true, love: true },
    comments: "108",
    shares: "22",
  },
];

// Events data for the Events Unit
const eventsData = [
  {
    id: "event-1",
    date: "Fri, Feb 14 at 7:00 PM",
    title: "Avatar 3 - IMAX Premiere",
    responded: 234,
    image: "/images/rio-theatre/1.png",
  },
  {
    id: "event-2",
    date: "Sat, Feb 15 at 10:00 AM",
    title: "Kids Saturday Morning Special",
    responded: 89,
    image: "/images/rio-theatre/2.png",
  },
  {
    id: "event-3",
    date: "Sun, Feb 16 at 2:00 PM",
    title: "Classic Film Series: Casablanca",
    responded: 156,
    image: "/images/rio-theatre/3.png",
  },
  {
    id: "event-4",
    date: "Fri, Feb 21 at 11:59 PM",
    title: "Midnight Horror Marathon",
    responded: 67,
    image: "/images/rio-theatre/4.png",
  },
  {
    id: "event-5",
    date: "Sat, Feb 22 at 7:30 PM",
    title: "Marvel Movie Marathon",
    responded: 312,
    image: "/images/rio-theatre/5.png",
  },
];

// Similar Pages data for the Similar Pages Unit
const similarPagesData = [
  { id: 'sp1', name: 'Rio Theatre', followers: '35K', image: '/images/rio-theatre/Entity header/Actor.png' },
  { id: 'sp2', name: 'Vancouver Civic Theatre', followers: '15K', image: '/images/rio-theatre/civic-theatre.png' },
  { id: 'sp3', name: 'Cineplex Cinemas Marine Gateway', followers: '42K', image: '/images/rio-theatre/marine-gateway.png' },
];

// Icons - Badge Checkmark (blueprint token icon)
const BadgeCheckmarkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#0866ff"/>
    <path d="M3.5 6L5.25 7.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.41667 0.5C8.35812 0.5 7.5 1.35812 7.5 2.41667V3.02899C7.5 4.18278 7.18643 5.31488 6.5928 6.30425L5.7887 7.64443C5.62445 7.91818 5.48486 8.2045 5.37087 8.5H2.5C1.39543 8.5 0.5 9.39543 0.5 10.5V17C0.5 18.1046 1.39543 19 2.5 19H14.75C16.1617 19 17.3249 17.9363 17.482 16.5667C18.2439 16.0784 18.75 15.2239 18.75 14.25C18.75 14.1349 18.7429 14.0212 18.729 13.9093C19.2056 13.4153 19.5 12.742 19.5 12C19.5 11.4887 19.3599 11.009 19.1164 10.5985C19.2032 10.3308 19.25 10.0454 19.25 9.75C19.25 8.23122 18.0188 7 16.5 7H12.5V3.58333C12.5 1.88046 11.1195 0.5 9.41667 0.5ZM5 17.5V10H2.5C2.22386 10 2 10.2239 2 10.5V17C2 17.2761 2.22386 17.5 2.5 17.5H5ZM6.5 17.5H14.75C15.4404 17.5 16 16.9404 16 16.25C16 16.2195 15.9989 16.1894 15.9968 16.1596C15.9738 15.8347 16.1632 15.5321 16.4654 15.4107C16.9266 15.2255 17.25 14.7746 17.25 14.25C17.25 14.1144 17.2287 13.9852 17.1898 13.8649C17.0888 13.5527 17.2025 13.2112 17.4704 13.0218C17.7923 12.7941 18 12.4213 18 12C18 11.6872 17.8861 11.4029 17.6965 11.1835C17.4935 10.9485 17.4563 10.6127 17.603 10.339C17.6966 10.1643 17.75 9.96448 17.75 9.75C17.75 9.05964 17.1904 8.5 16.5 8.5H12.1365C11.5088 8.5 11 7.99118 11 7.36351V3.58333C11 2.70888 10.2911 2 9.41667 2C9.18655 2 9 2.18655 9 2.41667V3.02899C9 4.45465 8.61254 5.85351 7.87904 7.076L7.07494 8.41617C6.69873 9.04319 6.5 9.76066 6.5 10.4919V17.5Z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 13.9218 23.0278 15.7363 22.1922 17.3308C22.105 17.4973 22.092 17.6559 22.1233 17.7765L23.0047 21.1762C23.2918 22.2835 22.2835 23.2918 21.1762 23.0047L17.7765 22.1233C17.6559 22.092 17.4973 22.105 17.3308 22.1922C15.7363 23.0278 13.9218 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5C13.5908 21.5 15.0875 21.1098 16.4025 20.4207C16.9511 20.1333 17.6177 20.016 18.2785 20.1873L20.8554 20.8554L20.1873 18.2785C20.016 17.6177 20.1333 16.9511 20.4207 16.4025C21.1098 15.0875 21.5 13.5908 21.5 12Z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#65676b">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export default function ScotiabankTheatreProfile() {
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showFollowPrompt, setShowFollowPrompt] = useState(false);
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [showReviewsSheet, setShowReviewsSheet] = useState(false);
  const [showLikeSheet, setShowLikeSheet] = useState(false);
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  const [commentSheetCount, setCommentSheetCount] = useState(0);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [likeSheetReactionCount, setLikeSheetReactionCount] = useState(0);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  // Parse reaction count string (e.g., "2.4K") to number
  const parseReactionCount = (countStr) => {
    if (!countStr) return 0;
    const str = countStr.toString();
    if (str.includes('K')) {
      return parseFloat(str.replace('K', '')) * 1000;
    }
    if (str.includes('M')) {
      return parseFloat(str.replace('M', '')) * 1000000;
    }
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  };

  // Handle like button click - show reactions upsell
  const handleLikePost = (reactionCount) => {
    setLikeSheetReactionCount(parseReactionCount(reactionCount));
    setShowLikeSheet(true);
  };

  // Toggle post text expansion
  const togglePostExpanded = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle share button
  const handleShare = () => {
    setShowShareSheet(true);
  };

  const tabs = ["All", "Photos", "Reels", "Events"];

  return (
    <div style={{ 
      background: '#fff', 
      minHeight: '100vh',
      maxWidth: '500px',
      margin: '0 auto',
      paddingBottom: '100px',
    }}>

      <main>
        {/* Cover Photo Container */}
        <div style={{ 
          position: 'relative',
          paddingTop: '0px',
        }}>
          {/* Cover Photo */}
          <div style={{ 
            height: '180px',
            background: '#e0e0e0',
          }}>
            <img 
              src={profileData.coverImage}
              alt="Cover"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
              }}
            />
          </div>
          
          {/* White rounded corner background */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: '#fff',
            borderRadius: '16px 16px 0 0',
          }} />
          
          {/* Profile Photo */}
          <div style={{
            position: 'absolute',
            bottom: '-44px',
            left: '12px',
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            border: '4px solid #fff',
            overflow: 'hidden',
            background: '#e0e0e0',
            zIndex: 10,
          }}>
            <img 
              src={profileData.profileImage}
              alt={profileData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Profile Info Section */}
        <div style={{ 
          background: '#fff',
          padding: '0 12px',
          position: 'relative',
          zIndex: 5,
        }}>
          {/* Name and Stats Row */}
          <div style={{ 
            display: 'flex',
            gap: '12px',
            marginBottom: '8px',
          }}>
            <div style={{ width: '88px', flexShrink: 0 }} />
            
            <div style={{ marginTop: '-12px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: '#080809', 
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {profileData.name}
                </h1>
                {profileData.verified && <BadgeCheckmarkIcon />}
              </div>
              <p style={{ 
                fontSize: '13px', 
                fontWeight: '400',
                color: '#080809', 
                margin: '2px 0 0',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                <span style={{ fontWeight: '600' }}>{profileData.followers}</span> followers · <span style={{ fontWeight: '600' }}>{profileData.following}</span> following
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p style={{ 
            fontSize: '15px', 
            color: '#080809', 
            margin: '16px 0 4px',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            lineHeight: '1.4',
          }}>
            {profileData.description}
          </p>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            padding: '4px 0 12px',
          }}>
            <button 
              onClick={() => setShowFollowPrompt(true)}
              style={{
                flex: 1,
                height: '36px',
                padding: '0 16px',
                background: '#0866ff',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IconInline name="follow-filled" size={16} color="#fff" />
              Follow
            </button>
            <button 
              onClick={() => setShowMessagePrompt(true)}
              style={{
                flex: 1,
                height: '36px',
                padding: '0 16px',
                background: '#e4e6eb',
                border: 'none',
                borderRadius: '6px',
                color: '#080809',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <IconInline name="app-messenger-filled" size={16} color="primary" />
              Message
            </button>
          </div>
        </div>

        {/* Sub-Nav Tabs */}
        <div style={{ 
          display: 'flex',
          gap: '8px',
          padding: '4px 12px 12px',
          background: '#fff',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? '#ebf5ff' : 'transparent',
                border: 'none',
                borderRadius: '20px',
                color: activeTab === tab ? '#0064d1' : '#080809',
                fontSize: '15px',
                fontWeight: activeTab === tab ? '600' : '400',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "All" && (
          <>
            {/* Directory Sections */}
            <div style={{ background: '#fff' }}>
              {/* Details Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  color: '#080809', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Details
                </h2>
                
                {/* Reviews */}
                <div 
                  onClick={() => setShowReviewsSheet(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0', cursor: 'pointer' }}
                >
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="star-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    88% recommend (2,456 reviews)
                  </span>
                </div>

                {/* Hours */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="clock-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Open now · Closes 12:00 AM
                  </span>
                </div>
                
                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="pin-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingTop: '10px' }}>
                    900 Burrard Street, Vancouver, BC, Canada V6Z 3G5
                  </span>
                </div>
              </div>

              {/* Links Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  color: '#080809', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Links
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="link-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    cineplex.com/theatre/scotiabank
                  </span>
                </div>
              </div>

              {/* Offers Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  color: '#080809', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Offers
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="coupon-outline" size={24} color="primary" /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                      SCENE+ members save 10%
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '400', lineHeight: '16px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Join SCENE+ for exclusive rewards
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact info Section */}
              <div style={{ padding: '12px' }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  color: '#080809', 
                  margin: '0 0 8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Contact info
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="at-sign-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    scotiabanktheatre
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="phone-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                    +1 (604) 630-1407
                  </span>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div style={{ background: '#fff', marginTop: '8px' }}>
              <div style={{ 
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h2 style={{ 
                  fontSize: '17px', 
                  fontWeight: '700', 
                  lineHeight: '22px',
                  color: '#080809', 
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Photos
                </h2>
                <span 
                  onClick={() => setActiveTab("Photos")}
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: '400', 
                    lineHeight: '20px',
                    color: '#0866ff', 
                    cursor: 'pointer',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  See all
                </span>
              </div>
              <div style={{ padding: '0 12px 12px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '4px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <img 
                      key={num}
                      src={`/images/rio-theatre/${num}.png`}
                      alt={`Photo ${num}`}
                      style={{
                        aspectRatio: '1',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div style={{ 
              background: '#fff',
              padding: '12px 12px 4px',
              marginTop: '8px',
            }}>
              <h2 style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                lineHeight: '22px',
                color: '#080809', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                Posts
              </h2>
            </div>
          </>
        )}

        {activeTab === "Photos" && (
          <div style={{ background: '#fff' }}>
            <div style={{ padding: '12px' }}>
              <h2 style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                lineHeight: '22px',
                color: '#080809', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                Scotiabank Theatre's photos
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '4px',
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div 
                  key={num}
                  style={{
                    aspectRatio: '1',
                    background: '#000',
                  }}
                >
                  <img 
                    src={`/images/rio-theatre/${num}.png`}
                    alt={`Photo ${num}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Reels" && (
          <div style={{ background: '#fff' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '2px',
            }}>
              {[
                { views: '1.2K', image: '/images/rio-theatre/1.png' },
                { views: '856', image: '/images/rio-theatre/2.png' },
                { views: '2.4K', image: '/images/rio-theatre/3.png' },
                { views: '567', image: '/images/rio-theatre/4.png' },
                { views: '1.8K', image: '/images/rio-theatre/5.png' },
                { views: '234', image: '/images/rio-theatre/6.png' },
                { views: '789', image: '/images/rio-theatre/7.png' },
                { views: '3.2K', image: '/images/rio-theatre/8.png' },
                { views: '456', image: '/images/rio-theatre/9.png' },
              ].map((reel, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'relative',
                    aspectRatio: '9/16',
                    background: '#000',
                    cursor: 'pointer',
                  }}
                >
                  <img 
                    src={reel.image}
                    alt={`Reel ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <IconInline name="play-filled" size={12} color="onMedia" />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#fff',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {reel.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Events" && (
          <div style={{ background: '#fff' }}>
            <div style={{ padding: '12px' }}>
              <h2 style={{ 
                fontSize: '17px', 
                fontWeight: '700', 
                lineHeight: '22px',
                color: '#080809', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                Upcoming events
              </h2>
            </div>
            
            <div style={{ paddingBottom: '8px' }}>
              {eventsData.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setShowLoginPrompt(true)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <img 
                      src={event.image}
                      alt={event.title}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#65686c',
                      margin: '0 0 2px 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.date}
                    </p>
                    
                    <p style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      lineHeight: '20px',
                      color: '#080809',
                      margin: '0 0 2px 0',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.title}
                    </p>
                    
                    <p style={{
                      fontSize: '13px',
                      fontWeight: '400',
                      lineHeight: '18px',
                      color: '#65686c',
                      margin: 0,
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {event.responded} responded
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts - only show on All tab */}
        {activeTab === "All" && (
          <div style={{ background: '#f0f2f5' }}>
            {postsData.map((post, index) => (
              <React.Fragment key={post.id}>
                <div 
                  style={{ 
                    background: '#fff',
                    marginBottom: '4px',
                  }}
                >
                  {/* Post Header */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={profileData.profileImage}
                        alt={post.author.name}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <p style={{ 
                            fontSize: '15px', 
                            fontWeight: '600', 
                            color: '#080809', 
                            margin: 0,
                            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          }}>
                            {post.author.name}
                          </p>
                          {post.author.verified && <BadgeCheckmarkIcon />}
                        </div>
                        <p style={{ 
                          fontSize: '13px', 
                          color: '#65676b', 
                          margin: 0,
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}>
                          {post.author.date} · <IconInline name="globe-americas-filled" size={12} color="secondary" />
                        </p>
                      </div>
                    </div>
                    <button style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      padding: '8px',
                    }}>
                      <DotsIcon />
                    </button>
                  </div>

                  {/* Post Text */}
                  <div style={{ padding: '0 12px 12px' }}>
                    <p style={{ 
                      fontSize: '15px', 
                      color: '#080809', 
                      margin: 0,
                      lineHeight: '1.4',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {expandedPosts[post.id] ? (
                        post.text
                      ) : (
                        <>
                          {post.text.substring(0, 120)}...
                          <span 
                            onClick={() => togglePostExpanded(post.id)}
                            style={{ color: '#65676b', fontWeight: '600', cursor: 'pointer' }}
                          > See more</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <img 
                      src={post.image}
                      alt=""
                      style={{ 
                        width: '100%', 
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                      }}
                    />
                  )}

                  {/* UFI Buttons */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    background: '#fff',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button
                        onClick={() => handleLikePost(post.reactions.count)}
                        style={{
                          padding: '10px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#65676b',
                        }}
                      >
                        <LikeIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                          {post.reactions.count}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setCommentSheetCount(parseReactionCount(post.comments));
                          setShowCommentSheet(true);
                        }}
                        style={{
                          padding: '10px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#65676b',
                        }}
                      >
                        <CommentIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                          {post.comments}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(post)}
                        style={{
                          padding: '10px 12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#65676b',
                        }}
                      >
                        <ShareIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                          {post.shares}
                        </span>
                      </button>
                    </div>
                    
                    <div style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                      padding: '0 12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {post.reactions.like && (
                          <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '18px', height: '18px' }} />
                        )}
                        {post.reactions.love && (
                          <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '18px', height: '18px', marginLeft: '-4px' }} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Events Unit - shown after the 3rd post */}
                {index === 2 && (
                  <div style={{ background: '#fff', marginBottom: '4px' }}>
                    <div style={{ 
                      padding: '12px 12px 4px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <h2 style={{ 
                        fontSize: '17px',
                        fontWeight: '700',
                        lineHeight: '22px',
                        color: '#080809',
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        Upcoming events at Scotiabank Theatre
                      </h2>
                      <button
                        onClick={() => setShowLoginPrompt(true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontSize: '15px',
                          fontWeight: '400',
                          lineHeight: '20px',
                          color: '#0866ff',
                          cursor: 'pointer',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        See all
                      </button>
                    </div>
                    
                    <div style={{ paddingBottom: '8px' }}>
                      {eventsData.slice(0, 3).map((event) => (
                        <div 
                          key={event.id}
                          onClick={() => setShowLoginPrompt(true)}
                          style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}>
                            <img 
                              src={event.image}
                              alt={event.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontSize: '12px',
                              fontWeight: '400',
                              lineHeight: '16px',
                              color: '#65686c',
                              margin: '0 0 2px 0',
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}>
                              {event.date}
                            </p>
                            
                            <p style={{
                              fontSize: '15px',
                              fontWeight: '500',
                              lineHeight: '20px',
                              color: '#080809',
                              margin: '0 0 2px 0',
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}>
                              {event.title}
                            </p>
                            
                            <p style={{
                              fontSize: '13px',
                              fontWeight: '400',
                              lineHeight: '18px',
                              color: '#65686c',
                              margin: 0,
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}>
                              {event.responded} responded
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Similar Pages - shown after the 5th post */}
                {index === 4 && (
                  <div style={{ 
                    background: '#fff',
                    marginTop: '4px',
                    paddingBottom: '12px',
                  }}>
                    <div style={{ 
                      padding: '12px 12px 8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <h2 style={{ 
                        fontSize: '17px',
                        fontWeight: '700',
                        lineHeight: '22px',
                        color: '#080809',
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        Similar Pages
                      </h2>
                      <button
                        onClick={() => setShowLoginPrompt(true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontSize: '15px',
                          fontWeight: '400',
                          lineHeight: '20px',
                          color: '#0866ff',
                          cursor: 'pointer',
                          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                        }}
                      >
                        See all
                      </button>
                    </div>
                    
                    <div 
                      className="hide-scrollbar"
                      style={{
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        padding: '0 12px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {similarPagesData.map((page) => (
                        <div 
                          key={page.id}
                          onClick={() => {
                            if (page.name === 'Rio Theatre') {
                              router.push('/m/profile/rio-theatre');
                            } else {
                              setShowLoginPrompt(true);
                            }
                          }}
                          style={{
                            flex: '0 0 auto',
                            width: '164px',
                            background: '#fff',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: '1px solid #E2E5E9',
                            overflow: 'hidden',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '156px',
                            overflow: 'hidden',
                          }}>
                            <img 
                              src={page.image} 
                              alt={page.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                          <div style={{ padding: '8px 12px 12px' }}>
                            <p style={{
                              fontSize: '15px',
                              fontWeight: '700',
                              color: '#050505',
                              margin: '0 0 4px',
                              lineHeight: '20px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              height: '40px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}>
                              {page.name}
                            </p>
                            <p style={{
                              fontSize: '12px',
                              fontWeight: '400',
                              color: '#65686c',
                              margin: '0 0 12px',
                              lineHeight: '16px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                            }}>
                              {page.followers} followers
                            </p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (page.name === 'Rio Theatre') {
                                  router.push('/m/profile/rio-theatre');
                                } else {
                                  setShowLoginPrompt(true);
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: '#ebf5ff',
                                color: '#0866ff',
                                fontSize: '15px',
                                fontWeight: '600',
                                lineHeight: '20px',
                                cursor: 'pointer',
                                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                              }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{
                      height: '4px',
                      background: '#f0f2f5',
                      marginTop: '12px',
                    }} />
                  </div>
                )}
              </React.Fragment>
            ))}
            <EndOfFeedUpsell hideWordmark={true} />
          </div>
        )}
      </main>

      {/* Generic Login Prompt */}
      <UpsellBottomSheet 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        type="generic"
      />

      {/* Follow Prompt */}
      <UpsellBottomSheet 
        isOpen={showFollowPrompt}
        onClose={() => setShowFollowPrompt(false)}
        type="follow"
        entityName="Scotiabank Theatre"
      />

      {/* Message Prompt */}
      <UpsellBottomSheet 
        isOpen={showMessagePrompt}
        onClose={() => setShowMessagePrompt(false)}
        type="message"
        entityName="Scotiabank Theatre"
      />

      {/* Reviews Sheet */}
      <ReviewsSheet 
        isOpen={showReviewsSheet}
        onClose={() => setShowReviewsSheet(false)}
        businessName="Scotiabank Theatre"
        recommendedPercent="88"
        reviewCount="2,456"
        onLoginPrompt={() => setShowLoginPrompt(true)}
      />

      {/* Like Sheet */}
      <UpsellBottomSheet
        isOpen={showLikeSheet}
        onClose={() => setShowLikeSheet(false)}
        type="like"
        count={likeSheetReactionCount}
      />

      {/* Comment Sheet */}
      <UpsellBottomSheet
        isOpen={showCommentSheet}
        onClose={() => setShowCommentSheet(false)}
        type="comment"
        count={commentSheetCount}
      />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
      />
    </div>
  );
}
