/**
 * FDSProfilePhoto Usage Examples
 * 
 * This file demonstrates how to use the FDSProfilePhoto component
 * with various configurations.
 */

import FDSProfilePhoto from './FDSProfilePhoto';

// Example 1: Basic profile photo
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-0.png"
  alt="John Doe"
/>

// Example 2: Profile photo with unseen story ring
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-1.png"
  alt="Jane Smith"
  storyStatus="unseen"
/>

// Example 3: Profile photo with seen story
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-2.png"
  alt="Mike Johnson"
  storyStatus="seen"
/>

// Example 4: Live video profile photo
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/profile-3.png"
  alt="Sarah Williams"
  storyStatus="live"
/>

// Example 5: Close friends story (green ring)
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-4.png"
  alt="Emily Davis"
  storyStatus="unseen"
  shouldShowCloseFriendsBadge={true}
/>

// Example 6: Profile photo with availability badge (active)
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-5.png"
  alt="David Lee"
  addOn={{
    type: 'availability',
    status: 'active'
  }}
/>

// Example 7: Profile photo with activity badge
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/profile-6.png"
  alt="Lisa Park"
  addOn={{
    type: 'activity',
    status: 'active'
  }}
/>

// Example 8: Profile photo with notification badge
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-7.png"
  alt="Tom Wilson"
  addOnTopEnd={{
    type: 'notificationBadge',
    number: 5
  }}
/>

// Example 9: Clickable profile photo
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-8.png"
  alt="Anna Chen"
  onClick={() => console.log('Profile clicked')}
  aria-label="View Anna Chen's profile"
/>

// Example 10: Square profile photo (for pages)
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/page-1.png"
  alt="Tech Company"
  shape="square"
/>

// Example 11: Rounded rectangle
<FDSProfilePhoto
  size={48}
  source="/images/thumbs/profile-9.png"
  alt="Music Artist"
  shape="roundedRect"
/>

// Example 12: Large rounded rectangle
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/group-1.png"
  alt="Photography Group"
  shape="roundedRectLarge"
/>

// Example 13: Small size (24dp)
<FDSProfilePhoto
  size={24}
  source="/images/thumbs/profile-10.png"
  alt="Comment Author"
/>

// Example 14: Extra large size (60dp) with story and availability
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/profile-0.png"
  alt="Featured User"
  storyStatus="unseen"
  addOn={{
    type: 'availability',
    status: 'active'
  }}
/>

// Example 15: Profile photo with hover events
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-1.png"
  alt="Hover Example"
  onHoverIn={() => console.log('Hover in')}
  onHoverOut={() => console.log('Hover out')}
  onClick={() => console.log('Clicked')}
/>

// Example 16: Disabled profile photo
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-2.png"
  alt="Disabled User"
  disabled={true}
  onClick={() => console.log('Should not fire')}
/>

// Example 17: Profile photo with preview color (loading state)
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-3.png"
  alt="Loading Example"
  preview={{
    type: 'color',
    color: '#E4E6EB'
  }}
/>

// Example 18: Profile photo with children overlay
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/profile-4.png"
  alt="Overlay Example"
>
  <div style={{
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'white',
    borderRadius: '50%',
    padding: '2px'
  }}>
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="#31A24C" />
    </svg>
  </div>
</FDSProfilePhoto>

// Example 19: All sizes showcase
const sizes = [24, 32, 40, 48, 56, 60];
{sizes.map(size => (
  <FDSProfilePhoto
    key={size}
    size={size}
    source="/images/thumbs/profile-0.png"
    alt={`Profile ${size}dp`}
  />
))}

// Example 20: Facepile (overlapped photos)
<div style={{ display: 'flex' }}>
  <FDSProfilePhoto
    size={32}
    source="/images/thumbs/profile-0.png"
    alt="User 1"
  />
  <FDSProfilePhoto
    size={32}
    source="/images/thumbs/profile-1.png"
    alt="User 2"
    isOverlapped={true}
  />
  <FDSProfilePhoto
    size={32}
    source="/images/thumbs/profile-2.png"
    alt="User 3"
    isOverlapped={true}
  />
</div>

export default null;

