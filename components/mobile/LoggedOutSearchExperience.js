"use client";

import { useState } from "react";
import LoggedOutSearchHeaderTabs from "./LoggedOutSearchHeaderTabs";

// Discussion Card component
const DiscussionCard = ({ 
  headline, 
  groupName, 
  commentCount, 
  author, 
  authorAvatar, 
  commentText 
}) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '0 12px 12px',
    }}
  >
    <div style={{ padding: '12px' }}>
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: 'normal',
          color: '#080809',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {headline}
      </h3>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 'normal',
          color: '#65686c',
          margin: '4px 0 0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {groupName} · {commentCount} comments
      </p>
    </div>

    <div style={{ padding: '0 12px 12px', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <img
          src={authorAvatar}
          alt=""
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            marginTop: '4px',
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '2px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                letterSpacing: 'normal',
                color: '#080809',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              {author}
            </span>
          </div>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: 'normal',
              color: '#080809',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            {commentText}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// AI Summary component
const AISummary = ({ text }) => (
  <div
    style={{
      background: '#ebf5ff',
      borderRadius: '12px',
      padding: '16px',
      margin: '0 12px 12px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0866ff 0%, #a033ff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#0866ff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        AI Summary
      </span>
    </div>
    <p
      style={{
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: 'normal',
        color: '#080809',
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}
    >
      {text}
    </p>
  </div>
);

// Post Card component
const PostCard = ({ author, avatar, text, image, likes }) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '0 12px 12px',
    }}
  >
    {image && (
      <img
        src={image}
        alt=""
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
    )}
    <div style={{ padding: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <img
          src={avatar}
          alt=""
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <span
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#080809',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        >
          {author}
        </span>
      </div>
      <p
        style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: 'normal',
          color: '#080809',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        }}
      >
        {text}
      </p>
      {likes && (
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <img src="/images/reactions/like_default_40.png" alt="" style={{ width: '16px', height: '16px' }} />
          <span style={{ fontSize: '13px', color: '#65686c' }}>{likes}</span>
        </div>
      )}
    </div>
  </div>
);

// Sample data
const SAMPLE_DISCUSSION = {
  headline: "Who do we think is going to die in the finale?",
  groupName: "Stranger Things Fan Club",
  commentCount: 106,
  author: "Aleksandra Bauer",
  authorAvatar: "https://i.pravatar.cc/100?img=20",
  commentText: "Will! I've always said Will would be the one to go since he's connected to Vecna and the upside down.",
};

const SAMPLE_POSTS = [
  {
    id: 1,
    author: "Netflix",
    avatar: "https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png",
    text: "The final season of Stranger Things premieres this November. Are you ready to say goodbye?",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=640&h=360&fit=crop",
    likes: "2.8K",
  },
  {
    id: 2,
    author: "Entertainment Weekly",
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    text: "Behind the scenes: How the Duffer Brothers crafted the perfect ending for Stranger Things.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=640&h=360&fit=crop",
    likes: "1.5K",
  },
];

export default function LoggedOutSearchExperience({ data, onBack, onQueryClick, onFacebookClick }) {
  const [activeTab, setActiveTab] = useState("all");

  const searchQuery = data?.topic || "Stranger Things costume ideas";

  return (
    <div className="logged-out-search-experience">
      <LoggedOutSearchHeaderTabs
        searchQuery={searchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTitleClick={onFacebookClick}
      />

      {/* AI Summary */}
      <div style={{ marginTop: '12px' }}>
        <AISummary 
          text="Stranger Things fans are buzzing about costume ideas for Halloween and conventions. Popular choices include Eleven's iconic pink dress with bloody nose, the Hellfire Club t-shirt, and various Upside Down-inspired looks."
        />
      </div>

      {/* Discussion Card */}
      <DiscussionCard {...SAMPLE_DISCUSSION} />

      {/* Posts */}
      {SAMPLE_POSTS.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}

      {/* Bottom spacer */}
      <div style={{ height: 24 }} />
    </div>
  );
}
