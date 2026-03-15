"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UpsellBottomSheet from "../../../../components/mobile/UpsellBottomSheet";
import EndOfFeedUpsell from "../../../../components/mobile/EndOfFeedUpsell";
import ReviewsSheet from "../../../../components/mobile/ReviewsSheet";
import ShareSheet from "../../../../components/mobile/ShareSheet";
import { IconInline } from "../../../../components/Icon";

const profileData = {
  name: "Irving Plaza",
  verified: true,
  username: "irvingplaza",
  description: "Legendary NYC live music venue since 1978. Located at 17 Irving Place in Union Square. From punk to pop to hip-hop — if it rocks, it's been on our stage.",
  recommendedPercent: "90",
  priceRange: "$$",
  followers: "120K",
  following: "245",
  coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=400&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
};

const postsData = [
  {
    id: "post-1",
    author: { name: "Irving Plaza", verified: true, date: "3h" },
    text: "🔥 JUST ANNOUNCED: Turnstile is bringing their explosive live show to Irving Plaza on April 12th! Pre-sale starts tomorrow at 10AM. Set your alarms, NYC — this WILL sell out.",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=450&fit=crop",
    reactions: { count: "4.7K", like: true, love: true },
    comments: "189",
    shares: "567",
    commentPreviews: [
      { name: "Danny O.", avatar: "https://i.pravatar.cc/40?img=8", text: "TURNSTILE AT IRVING?! Setting every alarm I have for that pre-sale.", time: "2h", likes: 47 },
      { name: "Rae S.", avatar: "https://i.pravatar.cc/40?img=19", text: "This is going to be chaos in the best way possible.", time: "1h", likes: 22 },
      { name: "Marco V.", avatar: "https://i.pravatar.cc/40?img=3", text: "Turnstile in a room this size is going to be ELECTRIC. Mosh pit of the year incoming!", time: "1h", likes: 38 },
      { name: "Jas K.", avatar: "https://i.pravatar.cc/40?img=15", text: "Irving Plaza has the perfect capacity for a band like this. Not too big, not too small.", time: "45m", likes: 16 },
      { name: "Tommy R.", avatar: "https://i.pravatar.cc/40?img=22", text: "Got pre-sale code ready to go. NYC hardcore fans don't play around!", time: "30m", likes: 11 },
      { name: "Lena W.", avatar: "https://i.pravatar.cc/40?img=30", text: "Flew in from Boston for their last show here. Doing it again. No regrets!", time: "20m", likes: 7 },
    ],
  },
  {
    id: "post-2",
    author: { name: "Irving Plaza", verified: true, date: "1d" },
    text: "What a night! 🎶 Clairo's sold-out show last night was intimate, beautiful, and everything we love about live music. Thank you to everyone who came out!",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=450&fit=crop",
    reactions: { count: "2.8K", like: true, love: true },
    comments: "94",
    shares: "123",
    commentPreviews: [
      { name: "Olivia N.", avatar: "https://i.pravatar.cc/40?img=26", text: "Last night was so dreamy. Clairo's voice live is even better than the records.", time: "18h", likes: 35 },
      { name: "Ethan J.", avatar: "https://i.pravatar.cc/40?img=34", text: "The intimate vibes at Irving Plaza made this show so special.", time: "14h", likes: 13 },
      { name: "Nadia P.", avatar: "https://i.pravatar.cc/40?img=42", text: "The lighting design was beautiful. Whoever did it deserves a raise!", time: "12h", likes: 19 },
      { name: "Ben L.", avatar: "https://i.pravatar.cc/40?img=49", text: "I've been to a lot of venues and Irving Plaza just has that special energy. The walls breathe music.", time: "10h", likes: 12 },
      { name: "Chloe D.", avatar: "https://i.pravatar.cc/40?img=56", text: "Softcult opened and they were incredible too! Great curation on this bill.", time: "8h", likes: 8 },
    ],
  },
  {
    id: "post-3",
    author: { name: "Irving Plaza", verified: true, date: "4d" },
    text: "From the Green Day secret show in '94 to last night's headliner — Irving Plaza has been the heartbeat of NYC's live music scene for over 45 years. What's your favorite Irving Plaza memory?",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop",
    reactions: { count: "1.5K", like: true, love: true },
    comments: "234",
    shares: "78",
    commentPreviews: [
      { name: "Mike T.", avatar: "https://i.pravatar.cc/40?img=39", text: "I saw Radiohead here in '97 — still the best show of my life!", time: "3d", likes: 56 },
      { name: "Lisa C.", avatar: "https://i.pravatar.cc/40?img=46", text: "This place is a New York treasure. So much history in those walls.", time: "2d", likes: 28 },
      { name: "Steve M.", avatar: "https://i.pravatar.cc/40?img=5", text: "Saw the Ramones here in '96. This place is hallowed ground for punk!", time: "2d", likes: 41 },
      { name: "Diana K.", avatar: "https://i.pravatar.cc/40?img=12", text: "My parents met at an Irving Plaza show in the '80s. It's in our family DNA!", time: "1d", likes: 33 },
      { name: "Rashid T.", avatar: "https://i.pravatar.cc/40?img=25", text: "The balcony view here is one of the best in NYC. Legendary for a reason!", time: "1d", likes: 18 },
      { name: "Kim N.", avatar: "https://i.pravatar.cc/40?img=63", text: "45 years of incredible music. Here's to 45 more!", time: "1d", likes: 12 },
    ],
  },
  {
    id: "post-4",
    author: { name: "Irving Plaza", verified: true, date: "1w" },
    text: "Spring is here and so is our stacked lineup 🌷 Check out our calendar for March and April — we've got something for every music lover. Link in bio for tickets!",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=450&fit=crop",
    reactions: { count: "967", like: true, love: true },
    comments: "56",
    shares: "89",
    commentPreviews: [
      { name: "Zoe H.", avatar: "https://i.pravatar.cc/40?img=53", text: "Already got tickets to four shows! This spring is going to be amazing.", time: "5d", likes: 17 },
      { name: "Carlos M.", avatar: "https://i.pravatar.cc/40?img=60", text: "Love that there's something for every genre. True NYC energy.", time: "4d", likes: 8 },
      { name: "Alex F.", avatar: "https://i.pravatar.cc/40?img=36", text: "The hip-hop shows here hit different. Sound is always on point.", time: "4d", likes: 14 },
      { name: "Morgan B.", avatar: "https://i.pravatar.cc/40?img=44", text: "Just grabbed tickets to the indie weekend. Can't wait to discover new bands!", time: "3d", likes: 9 },
      { name: "Taylor S.", avatar: "https://i.pravatar.cc/40?img=68", text: "Union Square location makes it so easy to grab dinner before the show. Perfect evening!", time: "3d", likes: 5 },
    ],
  },
];

const photoGalleryImages = [
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop",
];

const similarPagesData = [
  { id: 'sp1', name: 'Webster Hall', followers: '180K', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop' },
  { id: 'sp2', name: 'Brooklyn Steel', followers: '95K', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop' },
  { id: 'sp3', name: 'Terminal 5', followers: '85K', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop' },
];

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

export default function IrvingPlazaProfile() {
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
  const [expandedComments, setExpandedComments] = useState({});
  const [activeTab, setActiveTab] = useState("All");

  const parseReactionCount = (countStr) => {
    if (!countStr) return 0;
    const str = countStr.toString();
    if (str.includes('K')) return parseFloat(str.replace('K', '')) * 1000;
    if (str.includes('M')) return parseFloat(str.replace('M', '')) * 1000000;
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  };

  const handleLikePost = (reactionCount) => {
    setLikeSheetReactionCount(parseReactionCount(reactionCount));
    setShowLikeSheet(true);
  };

  const togglePostExpanded = (postId) => {
    setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleShare = () => setShowShareSheet(true);

  const tabs = ["All", "Photos", "Reels", "Events"];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', maxWidth: '500px', margin: '0 auto', paddingBottom: '100px' }}>
      <main>
        <div style={{ position: 'relative', paddingTop: '0px' }}>
          <div style={{ height: '180px', background: '#e0e0e0' }}>
            <img src={profileData.coverImage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '24px', background: '#fff', borderRadius: '16px 16px 0 0' }} />
          <div style={{ position: 'absolute', bottom: '-44px', left: '12px', width: '88px', height: '88px', borderRadius: '50%', border: '4px solid #fff', overflow: 'hidden', background: '#e0e0e0', zIndex: 10 }}>
            <img src={profileData.profileImage} alt={profileData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ background: '#fff', padding: '0 12px', position: 'relative', zIndex: 5 }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '88px', flexShrink: 0 }} />
            <div style={{ marginTop: '-12px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{profileData.name}</h1>
                {profileData.verified && <BadgeCheckmarkIcon />}
              </div>
              <p style={{ fontSize: '13px', fontWeight: '400', color: '#080809', margin: '2px 0 0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                <span style={{ fontWeight: '600' }}>{profileData.followers}</span> followers · <span style={{ fontWeight: '600' }}>{profileData.following}</span> following
              </p>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: '#080809', margin: '16px 0 4px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', lineHeight: '1.4' }}>{profileData.description}</p>
          <div style={{ display: 'flex', gap: '8px', padding: '4px 0 12px' }}>
            <button onClick={() => setShowFollowPrompt(true)} style={{ flex: 1, height: '36px', padding: '0 16px', background: '#0866ff', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '15px', fontWeight: '600', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IconInline name="follow-filled" size={16} color="#fff" />
              Follow
            </button>
            <button onClick={() => setShowMessagePrompt(true)} style={{ flex: 1, height: '36px', padding: '0 16px', background: '#e4e6eb', border: 'none', borderRadius: '6px', color: '#080809', fontSize: '15px', fontWeight: '600', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IconInline name="app-messenger-filled" size={16} color="primary" />
              Message
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', padding: '4px 12px 12px', background: '#fff' }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 16px', background: activeTab === tab ? '#ebf5ff' : 'transparent', border: 'none', borderRadius: '20px', color: activeTab === tab ? '#0064d1' : '#080809', fontSize: '15px', fontWeight: activeTab === tab ? '600' : '400', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "All" && (
          <>
            <div style={{ background: '#fff' }}>
              <div style={{ padding: '12px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: '0 0 8px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Details</h2>
                <div onClick={() => setShowReviewsSheet(true)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0', cursor: 'pointer' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="star-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>90% recommend (5,234 reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="clock-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Open now · Closes 2:00 AM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="pin-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingTop: '10px' }}>17 Irving Pl, New York, NY 10003</span>
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: '0 0 8px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Links</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
                  <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconInline name="link-outline" size={24} color="primary" /></div>
                  <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>irvingplaza.com</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', marginTop: '8px' }}>
              <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Photos</h2>
                <span onClick={() => setActiveTab("Photos")} style={{ fontSize: '15px', fontWeight: '400', lineHeight: '20px', color: '#0866ff', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>See all</span>
              </div>
              <div style={{ padding: '0 12px 12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', borderRadius: '12px', overflow: 'hidden' }}>
                  {photoGalleryImages.map((img, i) => (
                    <img key={i} src={img} alt={`Photo ${i + 1}`} style={{ aspectRatio: '1', width: '100%', height: '100%', objectFit: 'cover' }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px 12px 4px', marginTop: '8px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Posts</h2>
            </div>
          </>
        )}

        {activeTab === "Photos" && (
          <div style={{ background: '#fff' }}>
            <div style={{ padding: '12px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Irving Plaza&apos;s photos</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              {photoGalleryImages.map((img, i) => (
                <div key={i} style={{ aspectRatio: '1', background: '#000' }}>
                  <img src={img} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "All" && (
          <div style={{ background: '#f0f2f5' }}>
            {postsData.map((post, index) => (
              <React.Fragment key={post.id}>
                <div style={{ background: '#fff', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={profileData.profileImage} alt={post.author.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <p style={{ fontSize: '15px', fontWeight: '600', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{post.author.name}</p>
                          {post.author.verified && <BadgeCheckmarkIcon />}
                        </div>
                        <p style={{ fontSize: '13px', color: '#65676b', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {post.author.date} · <IconInline name="globe-americas-filled" size={12} color="secondary" />
                        </p>
                      </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}><DotsIcon /></button>
                  </div>
                  <div style={{ padding: '0 12px 12px' }}>
                    <p style={{ fontSize: '15px', color: '#080809', margin: 0, lineHeight: '1.4', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', whiteSpace: 'pre-wrap' }}>
                      {expandedPosts[post.id] ? post.text : (
                        <>{post.text.substring(0, 120)}...<span onClick={() => togglePostExpanded(post.id)} style={{ color: '#65676b', fontWeight: '600', cursor: 'pointer' }}> See more</span></>
                      )}
                    </p>
                  </div>
                  {post.image && <img src={post.image} alt="" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', height: '40px', background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => handleLikePost(post.reactions.count)} style={{ padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#65676b' }}>
                        <LikeIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{post.reactions.count}</span>
                      </button>
                      <button onClick={() => { setCommentSheetCount(parseReactionCount(post.comments)); setShowCommentSheet(true); }} style={{ padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#65676b' }}>
                        <CommentIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{post.comments}</span>
                      </button>
                      <button onClick={() => handleShare()} style={{ padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#65676b' }}>
                        <ShareIcon />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{post.shares}</span>
                      </button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {post.reactions.like && <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '18px', height: '18px' }} />}
                        {post.reactions.love && <img src="/images/reactions/love_default_40.png" alt="Love" style={{ width: '18px', height: '18px', marginLeft: '-4px' }} />}
                      </div>
                    </div>
                  </div>
              {/* Comment Previews */}
              {post.commentPreviews && post.commentPreviews.length > 0 && (() => {
                const isExpanded = expandedComments[post.id];
                const visibleComments = isExpanded ? post.commentPreviews : post.commentPreviews.slice(0, 2);
                return (
                <div style={{ padding: '0 12px 12px', background: '#fff' }}>
                  <div style={{ borderTop: '1px solid #e4e6eb', paddingTop: '8px' }}>
                    {visibleComments.map((comment, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <img src={comment.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ background: '#f0f2f5', borderRadius: '12px', padding: '8px 12px' }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#050505', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.name}</p>
                            <p style={{ fontSize: '15px', fontWeight: '400', lineHeight: '20px', color: '#050505', margin: '2px 0 0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.text}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 4px 0' }}>
                            <span style={{ fontSize: '12px', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.time}</span>
                            <button onClick={() => setShowCommentSheet(true)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', fontWeight: '600', color: '#65686c', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Like</button>
                            <button onClick={() => setShowCommentSheet(true)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', fontWeight: '600', color: '#65686c', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Reply</button>
                            {comment.likes > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                                <img src="/images/reactions/like_default_40.png" alt="Like" style={{ width: '14px', height: '14px' }} />
                                <span style={{ fontSize: '12px', color: '#65686c', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{comment.likes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {!isExpanded && (
                      <button
                        onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: true }))}
                        style={{ background: 'none', border: 'none', padding: '4px 0 0', fontSize: '15px', fontWeight: '600', color: '#65686c', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        View all comments
                      </button>
                    )}
                  </div>
                </div>
                );
              })()}
                </div>

                {index === 1 && (
                  <div style={{ background: '#fff', marginTop: '4px', paddingBottom: '12px' }}>
                    <div style={{ padding: '12px 12px 8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ fontSize: '17px', fontWeight: '700', lineHeight: '22px', color: '#080809', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Similar Pages</h2>
                      <button onClick={() => setShowLoginPrompt(true)} style={{ background: 'none', border: 'none', padding: 0, fontSize: '15px', fontWeight: '400', lineHeight: '20px', color: '#0866ff', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>See all</button>
                    </div>
                    <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 12px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {similarPagesData.map((page) => (
                        <div key={page.id} style={{ flex: '0 0 auto', width: '164px', background: '#fff', cursor: 'pointer', borderRadius: '8px', border: '1px solid #E2E5E9', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                          <div style={{ width: '100%', height: '156px', overflow: 'hidden' }}>
                            <img src={page.image} alt={page.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '8px 12px 12px' }}>
                            <p style={{ fontSize: '15px', fontWeight: '700', color: '#050505', margin: '0 0 4px', lineHeight: '20px', letterSpacing: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: '40px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{page.name}</p>
                            <p style={{ fontSize: '12px', fontWeight: '400', color: '#65686c', margin: '0 0 12px', lineHeight: '16px', letterSpacing: 'normal', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>{page.followers} followers</p>
                            <button onClick={(e) => { e.stopPropagation(); const slug = page.name.toLowerCase().replace(/\s+/g, '-'); router.push(`/m/profile/${slug}`); }} style={{ width: '100%', padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#ebf5ff', color: '#0866ff', fontSize: '15px', fontWeight: '600', lineHeight: '20px', cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>View</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ height: '4px', background: '#f0f2f5', marginTop: '12px' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
            <EndOfFeedUpsell hideWordmark={true} />
          </div>
        )}
      </main>

      <UpsellBottomSheet isOpen={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} type="generic" />
      <UpsellBottomSheet isOpen={showFollowPrompt} onClose={() => setShowFollowPrompt(false)} type="follow" entityName="Irving Plaza" />
      <UpsellBottomSheet isOpen={showMessagePrompt} onClose={() => setShowMessagePrompt(false)} type="message" entityName="Irving Plaza" />
      <ReviewsSheet isOpen={showReviewsSheet} onClose={() => setShowReviewsSheet(false)} businessName="Irving Plaza" recommendedPercent="90" reviewCount="5,234" onLoginPrompt={() => setShowLoginPrompt(true)} />
      <UpsellBottomSheet isOpen={showLikeSheet} onClose={() => setShowLikeSheet(false)} type="like" count={likeSheetReactionCount} />
      <UpsellBottomSheet isOpen={showCommentSheet} onClose={() => setShowCommentSheet(false)} type="comment" count={commentSheetCount} />
      <ShareSheet isOpen={showShareSheet} onClose={() => setShowShareSheet(false)} />
    </div>
  );
}
