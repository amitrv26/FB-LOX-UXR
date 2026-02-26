# FDSProfilePhoto

A comprehensive profile photo component based on Facebook's Design System (FDS) implementation.

## Features

- ✅ **Multiple Sizes**: 24, 32, 40, 48, 56, 60 (dp)
- ✅ **Shape Options**: Circle, Square, Rounded Rectangle, Rounded Rectangle Large
- ✅ **Story Rings**: Support for unseen, seen, live, and uploading states
- ✅ **Close Friends**: Green ring for close friends stories
- ✅ **Add-ons**: Availability badges, activity badges, notification badges
- ✅ **Pressable**: Click and hover interactions with overlay effects
- ✅ **Preview States**: Loading states with color or blur previews
- ✅ **Accessibility**: Full ARIA support
- ✅ **Facepiles**: Overlapping profile photos support

## Reference

Based on Facebook's internal FDS implementation:
- [FDSProfilePhoto Spec](https://www.internalfb.com/spec/FDSProfilePhoto)
- [Source Code](https://www.internalfb.com/code/fbsource/www/html/xplat-react/core/components/fds/FDSProfilePhoto/)

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `24 \| 32 \| 40 \| 48 \| 56 \| 60` | `40` | Size of the profile photo in dp |
| `source` | `string` | **Required** | URL or path to the profile image |
| `alt` | `string` | `""` | Alternative text for the image |
| `shape` | `'circle' \| 'square' \| 'roundedRect' \| 'roundedRectLarge'` | `'circle'` | Shape of the profile photo |

### Story Status

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storyStatus` | `'none' \| 'unseen' \| 'seen' \| 'live' \| 'uploading'` | `'none'` | Story ring indicator |
| `shouldShowCloseFriendsBadge` | `boolean` | `false` | Show green ring for close friends |

### Add-ons

| Prop | Type | Description |
|------|------|-------------|
| `addOn` | `object` | Availability or activity badge at bottom-end |
| `addOn.type` | `'availability' \| 'activity'` | Type of badge |
| `addOn.status` | `'active' \| 'inactive'` | Badge status |
| `addOnTopEnd` | `object` | Notification badge at top-end |
| `addOnTopEnd.type` | `'notificationBadge'` | Badge type (always notification) |
| `addOnTopEnd.number` | `number` | Number to display (shows "99+" if > 99) |

### Interaction Props

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `function` | Click handler (makes photo pressable) |
| `onHoverIn` | `function` | Mouse enter handler |
| `onHoverOut` | `function` | Mouse leave handler |
| `disabled` | `boolean` | Disable interactions |
| `cursorDisabled` | `boolean` | Disable pointer cursor |
| `overlayDisabled` | `boolean` | Disable hover/press overlay |

### Accessibility Props

| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | Accessible label (defaults to alt) |
| `aria-hidden` | `boolean` | Hide from screen readers |
| `role` | `string` | ARIA role (defaults to "button" if pressable) |

### Other Props

| Prop | Type | Description |
|------|------|-------------|
| `preview` | `object` | Loading state preview |
| `children` | `ReactNode` | Overlay content |
| `testid` | `string` | Test identifier |
| `isOverlapped` | `boolean` | Enable overlapping mode for facepiles |

## Usage Examples

### Basic Profile Photo

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-0.png"
  alt="John Doe"
/>
```

### Profile Photo with Story Ring

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-1.png"
  alt="Jane Smith"
  storyStatus="unseen"
/>
```

### Live Video Profile

```jsx
<FDSProfilePhoto
  size={60}
  source="/images/thumbs/profile-2.png"
  alt="Sarah Williams"
  storyStatus="live"
/>
```

### Close Friends Story

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-3.png"
  alt="Emily Davis"
  storyStatus="unseen"
  shouldShowCloseFriendsBadge={true}
/>
```

### With Availability Badge

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-4.png"
  alt="David Lee"
  addOn={{
    type: 'availability',
    status: 'active'
  }}
/>
```

### With Notification Badge

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-5.png"
  alt="Tom Wilson"
  addOnTopEnd={{
    type: 'notificationBadge',
    number: 5
  }}
/>
```

### Clickable Profile Photo

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/thumbs/profile-6.png"
  alt="Anna Chen"
  onClick={() => router.push('/profile/anna')}
  aria-label="View Anna Chen's profile"
/>
```

### Square Profile (Pages/Brands)

```jsx
<FDSProfilePhoto
  size={40}
  source="/images/pages/tech-company.png"
  alt="Tech Company Page"
  shape="square"
/>
```

### Facepile (Overlapping Photos)

```jsx
<div style={{ display: 'flex' }}>
  <FDSProfilePhoto size={32} source="/images/thumbs/profile-0.png" alt="User 1" />
  <FDSProfilePhoto size={32} source="/images/thumbs/profile-1.png" alt="User 2" isOverlapped />
  <FDSProfilePhoto size={32} source="/images/thumbs/profile-2.png" alt="User 3" isOverlapped />
</div>
```

## Sizes Reference

| Size (dp) | Use Case |
|-----------|----------|
| 24 | Comments, small facepiles, compact lists |
| 32 | Feed stories, medium facepiles, list items |
| 40 | Default size, navigation, cards |
| 48 | Special cases (non-standard) |
| 56 | Larger cards, conversation headers |
| 60 | Profile headers, large cards, featured content |

## Shape Reference

| Shape | Use Case | Border Radius |
|-------|----------|---------------|
| `circle` | People, individual users | 50% |
| `square` | Pages, brands, businesses | 0 |
| `roundedRect` | Groups, special accounts | 8px |
| `roundedRectLarge` | Large groups, featured content | 16px |

## Story Status Colors

| Status | Color | Use Case |
|--------|-------|----------|
| `unseen` | Blue (#1877F2) | New story not yet viewed |
| `seen` | Gray (#65676B) | Story already viewed |
| `live` | Red (#F3425F) | Active live video |
| `uploading` | Light Gray (#E4E6EB) | Story being uploaded |
| `none` | Transparent | No story |

## Best Practices

1. **Accessibility**: Always provide meaningful `alt` text
2. **Sizes**: Use standard sizes (24, 32, 40, 60) when possible
3. **Shapes**: Use `circle` for people, `square` for pages
4. **Add-ons**: Only use with `circle` shape
5. **Story Rings**: Reserve for actual story functionality
6. **Performance**: Use appropriate image sizes for each profile photo size

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- `AccessoryListCell` - List items with profile photos
- `CardHeader` - Card headers with profile info
- `Story` - Story tray items

