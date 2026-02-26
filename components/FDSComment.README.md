# FDSComment

A flexible and feature-rich comment component following Facebook Design System patterns.

## Features

- ✅ **Profile Photos**: Supports various sizes (24px, 32px, 40px)
- ✅ **Author Badges**: Verified checkmarks, public indicators
- ✅ **Rich Content**: Text with expand/collapse for long comments
- ✅ **Reactions**: Display like, love, haha reaction counts with icons
- ✅ **Actions**: Like, Reply, More buttons
- ✅ **Nested Replies**: Full support for threaded conversations
- ✅ **Timestamps**: With edited indicators
- ✅ **Layouts**: Default and compact modes
- ✅ **Themes**: Default and transparent backgrounds
- ✅ **Accessibility**: Proper ARIA labels and semantic HTML

## Basic Usage

```jsx
import FDSComment from './components/FDSComment';

<FDSComment
  author="Sarah Johnson"
  authorProfileSrc="/images/profile.jpg"
  timestamp="2h"
  text="This is a great post!"
  onLike={() => console.log('Liked')}
  onReply={() => console.log('Reply')}
  onMore={() => console.log('More')}
/>
```

## Props

### Author Information

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `author` | `string` | **required** | Author's display name |
| `authorProfileSrc` | `string` | **required** | Profile photo URL |
| `authorBadge` | `'verified' \| 'public' \| null` | `null` | Badge to display next to author name |
| `authorSubtext` | `string` | `null` | Additional text below author (e.g., "Top fan") |

### Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Comment text content |
| `isEdited` | `boolean` | `false` | Show edited indicator |
| `maxLines` | `number` | `null` | Truncate text after N characters with "See more" |

### Metadata

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `timestamp` | `string` | **required** | Time since comment (e.g., "2h", "3d") |
| `timestampLabel` | `string` | `null` | Custom timestamp text override |

### Actions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onLike` | `function` | `undefined` | Called when like button is clicked |
| `onReply` | `function` | `undefined` | Called when reply button is clicked |
| `onMore` | `function` | `undefined` | Called when more button is clicked |
| `likeCount` | `number` | `0` | Number of likes |
| `isLiked` | `boolean` | `false` | Whether current user has liked |
| `showActions` | `boolean` | `true` | Show/hide action buttons |

### Reactions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reactions` | `object` | `null` | Reaction counts: `{ like: 5, love: 2, haha: 1 }` |

### Replies

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `replies` | `array` | `[]` | Array of reply comment objects |
| `replyCount` | `number` | `0` | Total number of replies |
| `showReplies` | `boolean` | `false` | Initially show/hide replies |
| `onViewReplies` | `function` | `undefined` | Called when view replies is clicked |

### Visual

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profilePhotoSize` | `number` | `32` | Profile photo size in pixels |
| `backgroundColor` | `'default' \| 'transparent'` | `'default'` | Background style |
| `highlightColor` | `string` | `null` | Custom highlight background color |
| `layout` | `'default' \| 'compact'` | `'default'` | Layout style |

### Interactive

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `function` | `undefined` | Called when comment is clicked |
| `disabled` | `boolean` | `false` | Disable all interactions |

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class |
| `style` | `object` | `undefined` | Inline styles |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | `undefined` | Accessibility label |
| `testid` | `string` | `undefined` | Test identifier |

## Examples

### Verified Author

```jsx
<FDSComment
  author="Meta Official"
  authorProfileSrc="/images/meta.jpg"
  authorBadge="verified"
  timestamp="1h"
  text="Thanks for being part of our community!"
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Comment with Reactions

```jsx
<FDSComment
  author="John Doe"
  authorProfileSrc="/images/john.jpg"
  timestamp="3h"
  text="This made my day! 😄"
  reactions={{ like: 15, love: 8, haha: 3 }}
  isLiked={true}
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Long Comment with Truncation

```jsx
<FDSComment
  author="Jane Smith"
  authorProfileSrc="/images/jane.jpg"
  timestamp="5h"
  text="This is a very long comment that will be truncated..."
  maxLines={3}
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Comment with Replies

```jsx
<FDSComment
  author="Alice Brown"
  authorProfileSrc="/images/alice.jpg"
  timestamp="8h"
  text="Great question! Anyone have insights?"
  replyCount={3}
  showReplies={true}
  replies={[
    {
      author: "Bob Wilson",
      authorProfileSrc: "/images/bob.jpg",
      timestamp: "7h",
      text: "Here's what I think...",
      onLike: handleReplyLike,
      onReply: handleReplyToReply,
    },
    // ... more replies
  ]}
  onLike={handleLike}
  onReply={handleReply}
  onViewReplies={handleViewReplies}
/>
```

### Compact Layout (for nested comments)

```jsx
<FDSComment
  author="Tom Harris"
  authorProfileSrc="/images/tom.jpg"
  timestamp="1h"
  text="Reply to a reply"
  layout="compact"
  profilePhotoSize={24}
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Transparent Background (for dark mode)

```jsx
<FDSComment
  author="Nina Patel"
  authorProfileSrc="/images/nina.jpg"
  timestamp="2h"
  text="Dark mode friendly comment"
  backgroundColor="transparent"
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Top Fan Badge

```jsx
<FDSComment
  author="Rachel Green"
  authorProfileSrc="/images/rachel.jpg"
  authorSubtext="Top fan"
  timestamp="6h"
  text="Love your content!"
  onLike={handleLike}
  onReply={handleReply}
/>
```

### Edited Comment

```jsx
<FDSComment
  author="Mike Wilson"
  authorProfileSrc="/images/mike.jpg"
  timestamp="1d"
  text="Updated my comment with more details"
  isEdited={true}
  onLike={handleLike}
  onReply={handleReply}
/>
```

## Styling

The component uses CSS classes with the `fds-comment` prefix. You can customize styling by:

1. **Override CSS classes**:
```css
.fds-comment__bubble {
  background-color: #f5f5f5;
  border-radius: 12px;
}
```

2. **Use inline styles**:
```jsx
<FDSComment
  style={{ padding: '10px' }}
  // ... other props
/>
```

3. **Use custom className**:
```jsx
<FDSComment
  className="my-custom-comment"
  // ... other props
/>
```

## Accessibility

The component follows accessibility best practices:

- Semantic HTML structure
- Proper button roles and labels
- Keyboard navigation support
- ARIA attributes for screen readers
- Focus management

## Best Practices

1. **Always provide author and timestamp**: These are required for context
2. **Use compact layout for replies**: Saves space in nested threads
3. **Limit nested reply depth**: Keep UI manageable (typically 1-2 levels)
4. **Handle like state properly**: Update `isLiked` based on user action
5. **Truncate long comments**: Use `maxLines` for better UX
6. **Provide action handlers**: Even if they just log for now

## Related Components

- `FDSProfilePhoto`: Used internally for profile images
- `IconInline`: Used for icons throughout the component

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- This is a web-adapted version of the React Native FDSComment
- Optimized for performance with minimal re-renders
- Fully responsive and mobile-friendly
- Supports both light and dark themes

