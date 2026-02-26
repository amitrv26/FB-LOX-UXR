"use client";

/**
 * GroupsResults Component
 * Displays Facebook Groups search results in Google-style layout
 */

import { MoreIcon, ChevronRightIcon, PeopleIcon, GlobeIcon } from './Icons';
import { GoogleDivider } from './shared';

// Single group card component
const GroupCard = ({ group, onClick }) => (
  <div 
    onClick={() => onClick?.(group)}
    style={{
      display: 'flex',
      gap: '12px',
      padding: '12px 0',
      cursor: 'pointer',
      borderBottom: '1px solid #f1f3f4',
    }}
  >
    {/* Group Image */}
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '8px',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <img 
        src={group.image}
        alt={group.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
    
    {/* Group Info */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: '500', 
        color: '#1a0dab', 
        margin: '0 0 4px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: '1.3',
      }}>
        {group.name}
      </h3>
      
      {/* Meta info */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        marginBottom: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <PeopleIcon size={14} color="#70757a" />
          <span style={{ 
            fontSize: '13px', 
            color: '#70757a',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {group.memberCount}
          </span>
        </div>
        <span style={{ color: '#70757a' }}>·</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <GlobeIcon size={14} color="#70757a" />
          <span style={{ 
            fontSize: '13px', 
            color: '#70757a',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {group.privacy}
          </span>
        </div>
      </div>
      
      {/* Description */}
      {group.description && (
        <p style={{ 
          fontSize: '13px', 
          color: '#4d5156', 
          margin: 0,
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {group.description}
        </p>
      )}
      
      {/* Activity */}
      {group.activity && (
        <div style={{ 
          fontSize: '12px', 
          color: '#70757a',
          marginTop: '4px',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {group.activity}
        </div>
      )}
    </div>
    
    {/* More Button */}
    <button 
      style={{ 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        padding: '4px',
        alignSelf: 'flex-start',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MoreIcon size={20} color="#70757a" />
    </button>
  </div>
);

export default function GroupsResults({ 
  groups = [],
  title = "Facebook Groups",
  showViewAll = true,
  maxVisible = 3,
  onGroupClick,
  onViewAllClick,
}) {
  if (!groups.length) {
    return null;
  }

  const visibleGroups = groups.slice(0, maxVisible);

  return (
    <section style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        marginBottom: '8px'
      }}>
        <img 
          src="https://www.facebook.com/images/fb_icon_325x325.png" 
          alt="Facebook"
          style={{ width: '20px', height: '20px', borderRadius: '4px' }}
        />
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '400', 
          color: '#202124', 
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {title}
        </h2>
      </div>

      {/* Groups List */}
      <div>
        {visibleGroups.map((group, idx) => (
          <GroupCard 
            key={group.id || idx}
            group={group}
            onClick={onGroupClick}
          />
        ))}
      </div>

      {/* View All Link */}
      {showViewAll && groups.length > maxVisible && (
        <button
          onClick={onViewAllClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span style={{ 
            fontSize: '14px', 
            color: '#1a73e8',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            See more groups on Facebook
          </span>
          <ChevronRightIcon size={16} color="#1a73e8" />
        </button>
      )}

      <GoogleDivider marginTop="16px" />
    </section>
  );
}

