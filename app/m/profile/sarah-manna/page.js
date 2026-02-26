"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "../../../../components/mobile/MobileHeader";
import LoginPromptSheet from "../../../../components/mobile/LoginPromptSheet";
import FloatingTabBar from "../../../../components/mobile/FloatingTabBar";
import { IconInline } from "../../../../components/Icon";

// Profile data for Sarah Manna
const profileData = {
  name: "Sarah Manna",
  verified: false,
  username: "sarahmanna",
  description: "Coffee enthusiast ☕ | Stranger Things superfan 🔴 | Dog mom 🐕\nAlways looking for the next adventure ✨",
  followers: "847",
  following: "412",
  friends: "623",
  coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=400&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
};

// About section data
const aboutData = {
  work: "Marketing Manager at Tech Startup",
  education: "University of Washington",
  location: "Seattle, WA",
  from: "Portland, OR",
  relationship: "In a relationship",
  joined: "January 2012",
};

// Sample posts data
const postsData = [
  {
    id: "post-1",
    author: {
      name: "Sarah Manna",
      verified: false,
      date: "2h",
    },
    text: "Just finished watching that Stranger Things teaser for the 100th time 😭 Season 5 is going to DESTROY me emotionally, I can already tell.\n\nWho else is counting down the days?? #StrangerThings5",
    image: null,
    reactions: { count: "127", like: true, love: true },
    comments: "34",
    shares: "8",
  },
  {
    id: "post-2",
    author: {
      name: "Sarah Manna",
      verified: false,
      date: "1d",
    },
    text: "Weekend vibes with this one 🐕❤️",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    reactions: { count: "256", like: true, love: true },
    comments: "42",
    shares: "3",
  },
];

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

// Horizontal 3 dots icon
const Dots3HorizontalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#080809">
    <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
  </svg>
);

export default function SarahMannaProfile() {
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Photos", "Friends", "Events"];

  // Prefetch the reels page for faster back navigation
  useEffect(() => {
    router.prefetch('/m/reels/stranger-things-1');
  }, [router]);

  return (
    <div style={{ 
      background: '#fff', 
      minHeight: '100vh',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <MobileHeader />

      {/* Main content */}
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
          
          {/* White rounded corner background overlaid on cover photo */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: '#fff',
            borderRadius: '16px 16px 0 0',
          }} />
          
          {/* Profile Photo - overlaid on cover photo */}
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
          {/* Name and Stats Row - positioned next to profile photo */}
          <div style={{ 
            display: 'flex',
            gap: '12px',
            marginBottom: '8px',
          }}>
            {/* Spacer for profile photo */}
            <div style={{ width: '88px', flexShrink: 0 }} />
            
            {/* Name and Stats */}
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
              </div>
              {/* Stats */}
              <p style={{ 
                fontSize: '13px', 
                fontWeight: '400',
                color: '#080809', 
                margin: '2px 0 0',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                <span style={{ fontWeight: '600' }}>{profileData.friends}</span> friends
              </p>
            </div>
          </div>

          {/* Description */}
          <p style={{ 
            fontSize: '15px', 
            color: '#080809', 
            margin: '16px 0 12px',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            whiteSpace: 'pre-line',
            lineHeight: '1.4',
          }}>
            {profileData.description}
          </p>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            marginBottom: '12px',
          }}>
            <button 
              onClick={() => setShowLoginPrompt(true)}
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
                gap: '6px',
              }}
            >
              <IconInline name="friend-add-filled" size={16} color="#fff" />
              Add friend
            </button>
            <button 
              onClick={() => setShowLoginPrompt(true)}
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
                gap: '6px',
              }}
            >
              <IconInline name="app-messenger-filled" size={16} color="primary" />
              Message
            </button>
            <button 
              onClick={() => setShowLoginPrompt(true)}
              style={{
                width: '40px',
                height: '36px',
                padding: '8px',
                background: '#e4e6eb',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Dots3HorizontalIcon />
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
                color: activeTab === tab ? '#0064d1' : '#080809', // Unselected tabs still black
                fontSize: '15px',
                fontWeight: activeTab === tab ? '600' : '400', // Not bold when unselected
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details Section */}
        <div style={{ 
          background: '#fff',
          paddingBottom: '8px',
        }}>
          {/* Details Header */}
          <div style={{ padding: '12px' }}>
            <h2 style={{ 
              fontSize: '17px', 
              fontWeight: '700', 
              lineHeight: '22px',
              letterSpacing: 'normal',
              color: '#080809', 
              margin: '0 0 8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Details
            </h2>

            {/* Work - FDS List Cell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconInline name="briefcase-outline" size={24} color="primary" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                {aboutData.work}
              </span>
            </div>

            {/* Education - FDS List Cell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconInline name="building-school-outline" size={24} color="primary" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                Studied at {aboutData.education}
              </span>
            </div>

            {/* Location - FDS List Cell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconInline name="pin-outline" size={24} color="primary" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                Lives in {aboutData.location}
              </span>
            </div>

            {/* Joined - FDS List Cell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0' }}>
              <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconInline name="clock-outline" size={24} color="primary" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: '600', lineHeight: '20px', letterSpacing: 'normal', color: '#080809', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                Joined {aboutData.joined}
              </span>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div style={{ 
          background: '#fff',
          padding: '4px 12px 4px',
        }}>
          <h2 style={{ 
            fontSize: '17px', 
            fontWeight: '700', 
            lineHeight: '22px',
            letterSpacing: 'normal',
            color: '#080809', 
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            Posts
          </h2>
        </div>

        {/* Posts */}
        <div style={{ background: '#f0f2f5' }}>
          {postsData.map((post) => (
            <div 
              key={post.id}
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
              <p style={{ 
                fontSize: '15px', 
                color: '#080809', 
                margin: 0,
                padding: '0 12px 12px',
                lineHeight: '1.4',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                whiteSpace: 'pre-line',
              }}>
                {post.text}
              </p>

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
                {/* Left side - Action buttons with counts */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Like */}
                  <button
                    onClick={() => setShowLoginPrompt(true)}
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
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.reactions.count}
                    </span>
                  </button>
                  
                  {/* Comment */}
                  <button
                    onClick={() => setShowLoginPrompt(true)}
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
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.comments}
                    </span>
                  </button>
                  
                  {/* Share */}
                  <button
                    onClick={() => setShowLoginPrompt(true)}
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
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#65686c',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {post.shares}
                    </span>
                  </button>
                </div>
                
                {/* Right side - Reactions */}
                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  padding: '0 12px',
                  gap: '8px',
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
          ))}
        </div>
      </main>

      {/* Floating Tab Bar with expanded search */}
      <div className="sarah-profile-tab-bar">
        <FloatingTabBar 
          placeholder="Ask about Sarah..."
          activeTab="home"
          forceExpanded={true}
          suggestedQueries={[
            "How do I know Sarah?",
            "Sarah's recent posts",
            "Mutual friends with Sarah",
            "Sarah's photos",
            "Message Sarah",
          ]}
          onSearch={(query) => console.log("Search:", query)}
          onTabChange={(tabId) => console.log("Tab changed:", tabId)}
        />
        <style jsx>{`
          .sarah-profile-tab-bar :global(.floating-tab-bar) {
            animation: none;
            opacity: 1;
          }
        `}</style>
      </div>

      {/* Login Prompt Sheet */}
      <LoginPromptSheet 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        title="Log in to Facebook"
        message="Log in to see more from Sarah Manna and connect with friends on Facebook."
      />
    </div>
  );
}
