import * as stylex from '@stylexjs/stylex';
import { colors, spacing, radius, durations, easings } from '../../styles/tokens.stylex';

export const styles = stylex.create({
  button: {
    backgroundColor: colors.accent,
    color: colors.white,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: radius.md,
    borderWidth: 0,
    borderStyle: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: `background-color ${durations.extraShortIn} ${easings.fadeIn}`,

    ':hover': {
      backgroundColor: colors.btnPrimaryHover,
    },

    ':active': {
      transform: 'scale(0.98)',
    },
  },

  secondary: {
    backgroundColor: colors.secondaryButtonBackground,
    color: colors.textSecButton,

    ':hover': {
      backgroundColor: colors.btnSecondaryHover,
    },
  },
});
