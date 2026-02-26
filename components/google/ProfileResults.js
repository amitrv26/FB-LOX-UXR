"use client";

/**
 * ProfileResults Component
 * Displays profile/business search results in Google-style layout
 */

import { 
  MoreIcon, 
  ChevronRightIcon, 
  ChevronDownIcon,
  LocationIcon, 
  PhoneIcon, 
  ClockIcon, 
  GlobeIcon,
  StarIcon,
  BadgeCheckmarkIcon
} from './Icons';
import { GoogleDivider } from './shared';

// Rating stars component
const RatingStars = ({ rating, showText = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ 
        fontSize: '14px', 
        fontWeight: '500', 
        color: '#202124',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        {rating}
      </span>
      <div style={{ display: 'flex', gap: '1px' }}>
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            size={14} 
            color={i < fullStars || (i === fullStars && hasHalf) ? '#fbbc04' : '#dadce0'} 
          />
        ))}
      </div>
      {showText && (
        <span style={{ 
          fontSize: '13px', 
          color: '#70757a',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          · {rating >= 4.5 ? 'Excellent' : rating >= 4 ? 'Very Good' : 'Good'}
        </span>
      )}
    </div>
  );
};

// Info row component
const InfoRow = ({ icon: Icon, text, link }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: '12px',
    marginBottom: '8px'
  }}>
    <Icon size={16} color="#70757a" style={{ marginTop: '2px', flexShrink: 0 }} />
    {link ? (
      <a 
        href={link}
        style={{ 
          fontSize: '14px', 
          color: '#1a73e8',
          textDecoration: 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {text}
      </a>
    ) : (
      <span style={{ 
        fontSize: '14px', 
        color: '#202124',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: '1.4',
      }}>
        {text}
      </span>
    )}
  </div>
);

export default function ProfileResults({ 
  profile,
  type = 'business', // 'business' | 'celebrity' | 'person'
  showActions = true,
  onDirectionsClick,
  onCallClick,
  onWebsiteClick,
  onViewMoreClick,
}) {
  if (!profile) {
    return null;
  }

  const isBusiness = type === 'business';
  const isCelebrity = type === 'celebrity';

  return (
    <section style={{ marginBottom: '16px' }}>
      {/* Profile Card */}
      <div style={{ 
        border: '1px solid #dadce0',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '12px',
      }}>
        {/* Cover Image */}
        {profile.coverImage && (
          <div style={{ 
            height: '120px',
            background: `url(${profile.coverImage}) center/cover no-repeat`,
          }} />
        )}
        
        {/* Profile Info */}
        <div style={{ padding: '16px' }}>
          {/* Avatar & Name Row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '12px',
            marginBottom: '12px',
            marginTop: profile.coverImage ? '-40px' : '0',
          }}>
            {/* Avatar */}
            <div style={{
              width: profile.coverImage ? '80px' : '60px',
              height: profile.coverImage ? '80px' : '60px',
              borderRadius: profile.coverImage ? '50%' : '8px',
              border: profile.coverImage ? '3px solid #fff' : 'none',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: profile.coverImage ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
            }}>
              <img 
                src={profile.avatar}
                alt={profile.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Name & Meta */}
            <div style={{ flex: 1, paddingTop: profile.coverImage ? '24px' : '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '500', 
                  color: '#202124', 
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {profile.name}
                </h2>
                {profile.verified && (
                  <BadgeCheckmarkIcon size={18} color="#1a73e8" />
                )}
              </div>
              
              {profile.subtitle && (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#70757a', 
                  margin: '2px 0 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  {profile.subtitle}
                </p>
              )}
              
              {/* Rating */}
              {profile.rating && (
                <div style={{ marginTop: '8px' }}>
                  <RatingStars rating={profile.rating} />
                  {profile.reviewCount && (
                    <span style={{ 
                      fontSize: '13px', 
                      color: '#70757a',
                      marginLeft: '4px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      ({profile.reviewCount.toLocaleString()} reviews)
                    </span>
                  )}
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
                marginTop: profile.coverImage ? '24px' : '0',
              }}
            >
              <MoreIcon size={20} color="#70757a" />
            </button>
          </div>
          
          {/* Tags/Categories */}
          {profile.tags && profile.tags.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              flexWrap: 'wrap',
              marginBottom: '12px'
            }}>
              {profile.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  style={{
                    padding: '4px 12px',
                    background: '#f1f3f4',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#5f6368',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Business Info */}
          {isBusiness && (
            <>
              {profile.address && (
                <InfoRow icon={LocationIcon} text={profile.address} />
              )}
              {profile.hours && (
                <InfoRow icon={ClockIcon} text={profile.hours} />
              )}
              {profile.phone && (
                <InfoRow icon={PhoneIcon} text={profile.phone} />
              )}
              {profile.website && (
                <InfoRow icon={GlobeIcon} text={profile.website} link={profile.website} />
              )}
            </>
          )}
          
          {/* Celebrity/Person Info */}
          {(isCelebrity || type === 'person') && profile.bio && (
            <p style={{ 
              fontSize: '14px', 
              color: '#202124', 
              margin: '0 0 12px',
              lineHeight: '1.5',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              {profile.bio}
            </p>
          )}
          
          {/* Quick Facts */}
          {profile.quickFacts && profile.quickFacts.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {profile.quickFacts.map((fact, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderTop: idx > 0 ? '1px solid #f1f3f4' : 'none',
                  }}
                >
                  <span style={{ 
                    fontSize: '13px', 
                    color: '#70757a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {fact.label}
                  </span>
                  <span style={{ 
                    fontSize: '13px', 
                    color: '#202124',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          {showActions && isBusiness && (
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '16px' 
            }}>
              <button
                onClick={onDirectionsClick}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: '#1a73e8',
                  border: 'none',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Directions
              </button>
              <button
                onClick={onCallClick}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: '#fff',
                  border: '1px solid #dadce0',
                  borderRadius: '20px',
                  color: '#1a73e8',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Call
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* View More Link */}
      {onViewMoreClick && (
        <button
          onClick={onViewMoreClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
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
            View on Facebook
          </span>
          <ChevronRightIcon size={16} color="#1a73e8" />
        </button>
      )}
      
      <GoogleDivider marginTop="16px" />
    </section>
  );
}

