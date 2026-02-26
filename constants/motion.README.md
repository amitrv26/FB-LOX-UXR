# Blueprint Motion System

A comprehensive implementation of Facebook's Blueprint design system motion guidelines, providing reusable easing curves and durations for consistent animations across the application.

## Reference

Based on: [Blueprint Easing and Durations](https://www.internalfb.com/dimsum/blueprint/easing-and-durations)

## Usage

### Basic Import

```javascript
import { easingCurves, durations, animationVariants } from '../constants/motion';
```

### With Framer Motion

#### Simple Fade Animation

```javascript
import { motion } from 'framer-motion';
import { easingCurves, durations } from '../constants/motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    duration: durations.ultraFast,
    ease: easingCurves.fadeIn
  }}
>
  Content here
</motion.div>
```

#### Enter/Exit Animation (Modal, Bottom Sheet)

```javascript
<motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{
    duration: durations.normal,
    ease: easingCurves.enter
  }}
>
  Modal content
</motion.div>
```

#### Using Pre-configured Variants

```javascript
import { animationVariants } from '../constants/motion';

<motion.div
  initial="initial"
  animate="animate"
  exit="exit"
  variants={animationVariants.fade}
>
  Content here
</motion.div>
```

### With CSS/SCSS

```scss
.my-element {
  transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);
  // For fadeIn/fadeOut
  
  // Or for enter animation:
  transition: transform 0.2s cubic-bezier(0.14, 1, 0.34, 1);
}
```

## Available Easing Curves

### `easingCurves.enter` / `easingCurves.exit`
**Use for:** Elements entering or exiting the screen frame  
**Examples:** Push views, Modals, Bottom Sheets, Sticky CTAs  
**Bezier:** In `[0.14, 1, 0.34, 1]`, Out `[0.45, 0.1, 0.2, 1]`

```javascript
// Entering the screen
transition: { duration: durations.normal, ease: easingCurves.enter }

// Exiting the screen
transition: { duration: durations.fast, ease: easingCurves.exit }
```

### `easingCurves.expand` / `easingCurves.collapse`
**Use for:** Elements changing size along Z-axis  
**Examples:** Stories opening, photo expand, media grids  
**Bezier:** `[0.17, 0.17, 0, 1]`

```javascript
// Expanding
transition: { duration: durations.normal, ease: easingCurves.expand }

// Collapsing (use shorter duration)
transition: { duration: durations.fast, ease: easingCurves.collapse }
```

### `easingCurves.swapIn` / `easingCurves.swapOut`
**Use for:** Switching content in the same position  
**Examples:** Tab switching, friend requests  
**Bezier:** In `[0.14, 1, 0.34, 1]`, Out `[0.45, 0.1, 0.2, 1]`

```javascript
// Content coming in (slower to draw attention)
transition: { duration: durations.normal, ease: easingCurves.swapIn }

// Content going out (faster, starts slightly before)
transition: { duration: durations.fast, ease: easingCurves.swapOut, delay: -0.05 }
```

### `easingCurves.moveIn` / `easingCurves.moveOut`
**Use for:** On-screen position/scale/rotation changes  
**Examples:** Stories drawer, element repositioning  
**Bezier:** `[0.17, 0.17, 0, 1]`

```javascript
// Moving in
transition: { duration: durations.normal, ease: easingCurves.moveIn }

// Moving out (use shorter duration)
transition: { duration: durations.fast, ease: easingCurves.moveOut }
```

### `easingCurves.quickMove`
**Use for:** Exceptionally responsive user-initiated movement  
**Bezier:** `[0.1, 0.9, 0.2, 1]`

```javascript
transition: { duration: durations.fast, ease: easingCurves.quickMove }
```

### `easingCurves.passiveMove`
**Use for:** Non user-initiated on-screen movement  
**Examples:** Video ad breaks, automatic carousels  
**Bezier:** `[0.5, 0, 0.1, 1]`

```javascript
transition: { duration: durations.medium, ease: easingCurves.passiveMove }
```

### `easingCurves.fadeIn` / `easingCurves.fadeOut`
**Use for:** Opacity changes  
**Examples:** Toasts, overlays, tooltips  
**Bezier:** `[0, 0, 1, 1]` (linear)

```javascript
transition: { duration: durations.ultraFast, ease: easingCurves.fadeIn }
```

## Available Durations

All durations are in seconds (for framer-motion compatibility):

| Constant | Value | Use Case |
|----------|-------|----------|
| `durations.ultraFast` | 0.1s (100ms) | Quick responses, fades, micro-interactions |
| `durations.fast` | 0.15s (150ms) | Small element movements, quick transitions |
| `durations.normal` | 0.2s (200ms) | Standard transitions, most UI animations |
| `durations.medium` | 0.3s (300ms) | Larger element movements, significant state changes |
| `durations.slow` | 0.4s (400ms) | Complex animations, page transitions |
| `durations.slower` | 0.5s (500ms) | Full screen transitions, major view changes |

## Duration Helpers

### `durationHelpers.getExitDuration(entranceDuration)`
Calculate exit duration (2/3 of entrance) per Blueprint guidelines:

```javascript
const entranceDuration = durations.normal; // 0.2s
const exitDuration = durationHelpers.getExitDuration(entranceDuration); // 0.133s
```

### `durationHelpers.getFasterDuration(duration)`
Get 25% faster duration for larger screens/elements:

```javascript
const standardDuration = durations.medium; // 0.3s
const fasterDuration = durationHelpers.getFasterDuration(standardDuration); // 0.225s
```

## Blueprint Principles

### General Guidelines
1. **Entrances should be under 500ms** - Keep users moving
2. **Exits should be 2/3 of entrance duration** - Faster out than in
3. **Consistent curves for similar elements** - Modal = Bottom Sheet (>50% screen)
4. **Context-aware motion** - Longer distances may need longer durations

### Performance
- Avoid spring-based animations on Android (poor performance on lower-end devices)
- Use physics only when directly manipulating elements (e.g., dragging)
- Prefer predefined curves for better performance and consistency

### Navigation vs. Personality
- **Navigation**: Intentional, clear, efficient - no overshooting or hesitation
- **Personality**: Reserved for celebratory moments (Like button, profile decorations)

## Examples

### Modal Opening/Closing

```javascript
<AnimatePresence>
  {isOpen && (
    <motion.div
      className="modal"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        duration: durations.normal,
        ease: easingCurves.enter
      }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### Tab Switching

```javascript
// Outgoing content
<motion.div
  exit={{ opacity: 0 }}
  transition={{
    duration: durations.fast,
    ease: easingCurves.swapOut
  }}
>
  Old tab content
</motion.div>

// Incoming content
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: durations.normal,
    ease: easingCurves.swapIn,
    delay: 0.05 // Start slightly after old content begins fading
  }}
>
  New tab content
</motion.div>
```

### Video Controls (Fade In/Out)

```javascript
<AnimatePresence>
  {isHovering && (
    <motion.div
      className="video-controls"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: durations.ultraFast,
        ease: easingCurves.fadeIn
      }}
    >
      Controls
    </motion.div>
  )}
</AnimatePresence>
```

## Converting to CSS

To use these curves in CSS/SCSS:

```scss
// Ultra Fast Fade
transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);

// Normal Enter
transition: transform 0.2s cubic-bezier(0.14, 1, 0.34, 1);

// Fast Exit
transition: transform 0.15s cubic-bezier(0.45, 0.1, 0.2, 1);

// Expand
transition: scale 0.2s cubic-bezier(0.17, 0.17, 0, 1);
```

## Contributing

When adding new animations:
1. Choose the appropriate curve based on the interaction type
2. Use standard durations when possible
3. Document the use case and reasoning
4. Test on both high and low-end devices
5. Ensure consistency with similar UI elements

