# FDSComposer

A flexible text input component for writing comments, posts, or messages, adapted from React Native FDSComposer to web.

## Features

- ✅ **Auto-expanding textarea**: Grows with content
- ✅ **Profile photo integration**: Optional user avatar
- ✅ **Character limit**: With visual feedback
- ✅ **Submit button**: With loading state
- ✅ **Attachment buttons**: Photo, GIF, emoji support
- ✅ **Multiple layouts**: Default, compact, inline
- ✅ **Controlled/Uncontrolled**: Flexible state management
- ✅ **Keyboard shortcuts**: Submit on Enter (Shift+Enter for new line)
- ✅ **Accessibility**: Full ARIA support

## Basic Usage

```jsx
import FDSComposer from './components/FDSComposer';

<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  placeholder="Write a comment..."
  onSubmit={(text) => console.log('Submitted:', text)}
/>
```

## Props

### Profile

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profilePhotoSrc` | `string` | `undefined` | URL for profile photo |
| `profilePhotoSize` | `number` | `32` | Profile photo size in pixels |
| `showProfilePhoto` | `boolean` | `true` | Show/hide profile photo |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Write a comment...'` | Placeholder text |
| `value` | `string` | `undefined` | Controlled value |
| `defaultValue` | `string` | `''` | Initial uncontrolled value |
| `maxLength` | `number` | `null` | Maximum character limit |
| `minRows` | `number` | `1` | Minimum textarea rows |
| `maxRows` | `number` | `10` | Maximum textarea rows |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `disabled` | `boolean` | `false` | Disable input |

### Submit

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `function` | `undefined` | Called with text on submit |
| `submitButtonText` | `string` | `'Post'` | Submit button label |
| `submitIcon` | `string` | `null` | Icon name for submit button |
| `showSubmitButton` | `boolean` | `true` | Show/hide submit button |
| `submitOnEnter` | `boolean` | `true` | Submit on Enter key |
| `isSubmitting` | `boolean` | `false` | Show loading state |
| `canSubmit` | `boolean` | `true` | Additional validation |

### Callbacks

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `function` | `undefined` | Called on text change |
| `onFocus` | `function` | `undefined` | Called on focus |
| `onBlur` | `function` | `undefined` | Called on blur |
| `onKeyDown` | `function` | `undefined` | Called on key down |

### Attachments

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onAddPhoto` | `function` | `undefined` | Called when photo button clicked |
| `onAddGif` | `function` | `undefined` | Called when GIF button clicked |
| `onAddEmoji` | `function` | `undefined` | Called when emoji button clicked |
| `showAttachmentButtons` | `boolean` | `false` | Show attachment buttons |

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'default' \| 'compact' \| 'inline'` | `'default'` | Layout style |
| `backgroundColor` | `'default' \| 'transparent' \| 'elevated'` | `'default'` | Background style |

### Character Count

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCharacterCount` | `boolean` | `false` | Show character count |
| `characterCountThreshold` | `number` | `0.8` | Show count at X% of limit |

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class |
| `style` | `object` | `undefined` | Inline styles |

### Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | `'Write a comment'` | Accessibility label |
| `testid` | `string` | `undefined` | Test identifier |

## Examples

### Controlled Component

```jsx
const [comment, setComment] = useState('');

<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  value={comment}
  onChange={setComment}
  onSubmit={(text) => {
    console.log('Posted:', text);
    setComment(''); // Clear after submit
  }}
/>
```

### With Character Limit

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  placeholder="Keep it short..."
  maxLength={280}
  showCharacterCount={true}
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### With Attachments

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  showAttachmentButtons={true}
  onAddPhoto={() => console.log('Add photo')}
  onAddGif={() => console.log('Add GIF')}
  onAddEmoji={() => console.log('Add emoji')}
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### Loading State

```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (text) => {
  setIsSubmitting(true);
  await postComment(text);
  setIsSubmitting(false);
};

<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  isSubmitting={isSubmitting}
  onSubmit={handleSubmit}
/>
```

### Icon Submit Button

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  placeholder="Send a message..."
  submitIcon="send-filled"
  onSubmit={(text) => console.log('Sent:', text)}
/>
```

### Compact Layout

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  profilePhotoSize={24}
  layout="compact"
  placeholder="Quick reply..."
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### Inline Layout

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  profilePhotoSize={20}
  layout="inline"
  placeholder="Reply..."
  submitIcon="send-filled"
  onSubmit={(text) => console.log('Sent:', text)}
/>
```

### Without Profile Photo

```jsx
<FDSComposer
  showProfilePhoto={false}
  placeholder="Anonymous comment..."
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### Transparent Background

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  backgroundColor="transparent"
  placeholder="Write something..."
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### Multi-row Textarea

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  placeholder="Write a longer message..."
  minRows={3}
  maxRows={10}
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

### Custom Submit Button

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  submitButtonText="Share"
  placeholder="Share your thoughts..."
  onSubmit={(text) => console.log('Shared:', text)}
/>
```

### No Submit on Enter

```jsx
<FDSComposer
  profilePhotoSrc="/images/profile.jpg"
  placeholder="Click button to submit..."
  submitOnEnter={false}
  onSubmit={(text) => console.log('Posted:', text)}
/>
```

## Keyboard Shortcuts

- **Enter**: Submit (if `submitOnEnter` is true)
- **Shift + Enter**: New line
- **Tab**: Navigate to submit button

## Auto-expand Behavior

The textarea automatically expands as you type:
- Starts at `minRows` height
- Grows with content
- Stops at `maxRows` height
- Scrolls if content exceeds `maxRows`

## Character Count Display

When `showCharacterCount` is enabled:
- Hidden until `characterCountThreshold` is reached (default 80%)
- Shows current count / max length
- Turns yellow when at limit
- Turns red if over limit (prevents submit)

## Submit Button States

1. **Disabled** (gray): When input is empty or invalid
2. **Active** (blue): When input is valid and ready
3. **Loading**: Shows spinner during `isSubmitting`
4. **Icon**: Shows custom icon instead of text

## Validation

The composer prevents submission when:
- Input is empty or only whitespace
- Over `maxLength` limit
- `canSubmit` prop is false
- `isSubmitting` is true
- Component is `disabled`

## Styling

### CSS Classes

```css
.fds-composer {}                      /* Root container */
.fds-composer__container {}           /* Main container */
.fds-composer__profile {}             /* Profile photo wrapper */
.fds-composer__input-wrapper {}       /* Textarea wrapper */
.fds-composer__textarea {}            /* Textarea element */
.fds-composer__character-count {}     /* Character count display */
.fds-composer__actions {}             /* Actions container */
.fds-composer__attachments {}         /* Attachment buttons container */
.fds-composer__attachment-button {}   /* Individual attachment button */
.fds-composer__submit-button {}       /* Submit button */
```

### Modifiers

```css
.fds-composer--focused {}             /* When textarea is focused */
.fds-composer--disabled {}            /* When disabled */
.fds-composer--submitting {}          /* When submitting */
.fds-composer--layout-compact {}      /* Compact layout */
.fds-composer--layout-inline {}       /* Inline layout */
.fds-composer--bg-transparent {}      /* Transparent background */
.fds-composer--bg-elevated {}         /* Elevated background */
```

## Accessibility

- Proper `aria-label` for screen readers
- Keyboard navigation support
- Focus management
- Button roles and labels
- Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Best Practices

1. **Use controlled mode for complex forms**: Better state management
2. **Set appropriate maxLength**: Prevents overly long comments
3. **Show character count near limit**: Better UX
4. **Provide loading feedback**: Set `isSubmitting` during API calls
5. **Clear input after submit**: For uncontrolled mode
6. **Choose appropriate layout**: Match your UI density
7. **Handle errors gracefully**: Show validation messages

## Related Components

- `FDSComment`: Display comments
- `FDSProfilePhoto`: Used internally for avatar

## Notes

- Adapted from React Native FDSComposer for web
- Auto-expanding textarea uses native browser APIs
- Optimized for performance
- Fully responsive
- Mobile-friendly touch targets

