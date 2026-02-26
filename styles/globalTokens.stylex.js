import * as stylex from '@stylexjs/stylex';
import { colors, durations, easings } from './tokens.stylex';

/**
 * Global styles that inject CSS variables for backward compatibility
 * with existing SCSS files during migration
 */
export const globalTokens = stylex.createTheme(colors, {
  // Colors
  activeBlue: '#E6F1FF',
  background: '#ffffff',
  backgroundAlt: '#F2F3F5',
  wash: '#f5f6f7',
  webWash: '#F0F2F5',
  textDark: '#1C1E21',
  textSecButton: '#444950',
  textMedium: '#606770',
  textLight: '#8A8D91',
  accent: '#3578E5',
  fbBlue: '#006DE3',
  error: '#D64541',
  white: '#ffffff',
  btnPrimaryHover: '#1569D6',
  btnSecondaryHover: '#D8DCE3',
  border: '#dddddd',
  gray90: '#E4E5EC',
  secondaryButtonBackground: '#E4E6Eb',
  commentBackground: '#f0f2f5',
  fdsBlue95: '#E7F3FF',
  overlayBackground: '#2164D1',
  overlayText: '#ffffff',
  overlayAccent: '#2A2F36',
});
