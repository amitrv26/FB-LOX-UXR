import * as stylex from '@stylexjs/stylex';

// Colors
export const colors = stylex.defineVars({
  // Primary colors
  activeBlue: '#E6F1FF',
  background: '#ffffff',
  backgroundAlt: '#F2F3F5',
  wash: '#f5f6f7',
  webWash: '#F0F2F5',

  // Text colors
  textDark: '#1C1E21',
  textSecButton: '#444950',
  textMedium: '#606770',
  textLight: '#8A8D91',

  // Accent colors
  accent: '#3578E5',
  fbBlue: '#006DE3',
  error: '#D64541',
  white: '#ffffff',

  // Button colors
  btnPrimaryHover: '#1569D6',
  btnSecondaryHover: '#D8DCE3',

  // Borders and backgrounds
  border: '#dddddd',
  gray90: '#E4E5EC',
  secondaryButtonBackground: '#E4E6Eb',
  commentBackground: '#f0f2f5',
  fdsBlue95: '#E7F3FF',

  // Overlay
  overlayBackground: '#2164D1',
  overlayText: '#ffffff',
  overlayAccent: '#2A2F36',
});

// Spacing
export const spacing = stylex.defineVars({
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
});

// Border radius
export const radius = stylex.defineVars({
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '50%',
});

// Durations (in milliseconds for StyleX)
export const durations = stylex.defineVars({
  extraExtraShortIn: '100ms',
  extraExtraShortOut: '100ms',
  extraLongIn: '1000ms',
  extraLongOut: '1000ms',
  extraShortIn: '200ms',
  extraShortOut: '150ms',
  longIn: '500ms',
  longOut: '350ms',
  mediumIn: '400ms',
  mediumOut: '350ms',
  none: '0ms',
  shortIn: '280ms',
  shortOut: '200ms',
});

// Easing functions (timing functions)
export const easings = stylex.defineVars({
  enterExitIn: 'cubic-bezier(.14,1,.34,1)',
  enterExitOut: 'cubic-bezier(.45,.1,.2,1)',
  expandCollapseIn: 'cubic-bezier(.17,.17,0,1)',
  expandCollapseOut: 'cubic-bezier(.17,.17,0,1)',
  fadeIn: 'cubic-bezier(0,0,1,1)',
  fadeOut: 'cubic-bezier(0,0,1,1)',
  moveIn: 'cubic-bezier(.17,.17,0,1)',
  moveOut: 'cubic-bezier(.17,.17,0,1)',
  passiveMoveIn: 'cubic-bezier(.5,0,.1,1)',
  passiveMoveOut: 'cubic-bezier(.5,0,.1,1)',
  quickMoveIn: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
  quickMoveOut: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
  swapShuffleIn: 'cubic-bezier(.14,1,.34,1)',
  swapShuffleOut: 'cubic-bezier(.45,.1,.2,1)',
});

// Z-index scale
export const zIndex = stylex.defineVars({
  base: '1',
  elevated: '5',
  modal: '9',
  navigation: '10',
  tooltip: '100',
});
