/**
 * Blueprint Motion System
 * 
 * Based on Facebook's Blueprint design system guidelines for easing and durations.
 * Reference: https://www.internalfb.com/dimsum/blueprint/easing-and-durations
 * 
 * These constants provide reusable animation curves and durations that ensure
 * consistent, performant motion across the application.
 */

/**
 * EASING CURVES
 * 
 * Cubic Bezier curves that describe the acceleration and deceleration of animations.
 * Each curve is defined as [x1, y1, x2, y2] values for cubic-bezier timing functions.
 */

export const easingCurves = {
  /**
   * Enter/Exit
   * For elements entering or exiting the screen frame.
   * - Enter: Deceleration curve (elements enter at peak velocity and decelerate)
   * - Exit: Acceleration curve (elements start static and accelerate off-screen)
   * 
   * Examples: Push, Modal, BottomSheets, Sticky CTA
   */
  enter: [0.14, 1, 0.34, 1],
  exit: [0.45, 0.1, 0.2, 1],

  /**
   * Expand/Collapse
   * For elements moving along the Z-axis by changing size.
   * Used when repositioning fully starts and stops on-screen as a direct user response.
   * Creates a feeling of speed and responsiveness.
   * 
   * Examples: Stories opening, photo expand
   */
  expand: [0.17, 0.17, 0, 1],
  collapse: [0.17, 0.17, 0, 1],

  /**
   * Swap/Shuffle
   * For switching content in the same position and plane.
   * Spend more time on new elements settling in to draw focus.
   * 
   * Examples: Tab switching, adding a friend
   */
  swapIn: [0.14, 1, 0.34, 1],
  swapOut: [0.45, 0.1, 0.2, 1],

  /**
   * Move
   * For elements changing position, scale, or rotation fully on-screen.
   * Direct response to user input, giving time to register the change.
   * 
   * Examples: Stories drawer
   */
  moveIn: [0.17, 0.17, 0, 1],
  moveOut: [0.17, 0.17, 0, 1],

  /**
   * Quick Move
   * For exceptionally responsive user-initiated movement.
   * Fast initial acceleration followed by longer deceleration.
   */
  quickMove: [0.1, 0.9, 0.2, 1],

  /**
   * Passive Move
   * For non user-initiated movement on-screen.
   * Slower, less disruptive introduction that's not jarring.
   * 
   * Examples: Video ad breaks
   */
  passiveMove: [0.5, 0, 0.1, 1],

  /**
   * Fade
   * For elements fading on or off.
   * Linear change as velocity changes aren't as perceivable for opacity.
   * 
   * Examples: Toast, overlays
   */
  fadeIn: [0, 0, 1, 1],
  fadeOut: [0, 0, 1, 1],
};

/**
 * DURATIONS
 * 
 * Standard animation durations in milliseconds.
 * 
 * Guidelines:
 * - Entrances should generally be under 500ms
 * - Exit animations should be around 2/3 of entrance animation
 * - Similar elements should use the same curve and duration
 * - Motion should be responsive to context (longer distances may need longer duration)
 */

export const durations = {
  // Ultra-fast (100ms) - Quick responses, fades, micro-interactions
  ultraFast: 0.1, // 100ms in seconds for framer-motion
  
  // Fast (150ms) - Small element movements, quick transitions
  fast: 0.15, // 150ms
  
  // Normal (200ms) - Standard transitions, most UI animations
  normal: 0.2, // 200ms
  
  // Medium (300ms) - Larger element movements, significant state changes
  medium: 0.3, // 300ms
  
  // Slow (400ms) - Complex animations, page transitions
  slow: 0.4, // 400ms
  
  // Slower (500ms) - Full screen transitions, major view changes
  slower: 0.5, // 500ms
};

/**
 * DURATION HELPERS
 * 
 * Utility functions for calculating related durations
 */

export const durationHelpers = {
  /**
   * Get exit duration (2/3 of entrance)
   * @param {number} entranceDuration - Entrance duration in seconds
   * @returns {number} Exit duration in seconds
   */
  getExitDuration: (entranceDuration) => entranceDuration * (2 / 3),
  
  /**
   * Get faster duration (75% of original)
   * Useful for larger screens/elements that need faster motion
   * @param {number} duration - Original duration in seconds
   * @returns {number} Faster duration in seconds
   */
  getFasterDuration: (duration) => duration * 0.75,
};

/**
 * COMMON ANIMATION VARIANTS
 * 
 * Pre-configured animation objects for common use cases.
 * Can be used directly with framer-motion components.
 */

export const animationVariants = {
  // Fade animations
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: durations.ultraFast,
      ease: easingCurves.fadeIn,
    },
  },

  // Enter/Exit (from/to screen edge)
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transitionIn: {
      duration: durations.normal,
      ease: easingCurves.enter,
    },
    transitionOut: {
      duration: durationHelpers.getExitDuration(durations.normal),
      ease: easingCurves.exit,
    },
  },

  // Expand/Collapse
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transitionIn: {
      duration: durations.normal,
      ease: easingCurves.expand,
    },
    transitionOut: {
      duration: durationHelpers.getExitDuration(durations.normal),
      ease: easingCurves.collapse,
    },
  },
};

export default {
  easingCurves,
  durations,
  durationHelpers,
  animationVariants,
};

