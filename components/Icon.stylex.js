import * as stylex from '@stylexjs/stylex';
import { iconColors } from '../styles/colors.stylex';

export const styles = stylex.create({
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    userSelect: 'none',
    color: 'currentColor',
  },

  // Size variants
  size12: {
    width: '12px',
    height: '12px',
  },
  size16: {
    width: '16px',
    height: '16px',
  },
  size20: {
    width: '20px',
    height: '20px',
  },
  size24: {
    width: '24px',
    height: '24px',
  },
  size28: {
    width: '28px',
    height: '28px',
  },
  size32: {
    width: '32px',
    height: '32px',
  },

  // Color variants
  primary: {
    color: iconColors.primary,
    fill: iconColors.primary,
  },
  secondary: {
    color: iconColors.secondary,
    fill: iconColors.secondary,
  },
  active: {
    color: '#0866ff', // Facebook blue
    fill: '#0866ff',
  },
  disabled: {
    color: iconColors.disabled,
    fill: iconColors.disabled,
  },
  placeholder: {
    color: iconColors.placeholder,
    fill: iconColors.placeholder,
  },
  meta: {
    color: iconColors.meta,
    fill: iconColors.meta,
  },
  device: {
    color: iconColors.device,
    fill: iconColors.device,
  },
  onMedia: {
    color: '#ffffff',
    fill: '#ffffff',
  },
  secondaryOnMedia: {
    color: 'rgba(255, 255, 255, 0.9)',
    fill: 'rgba(255, 255, 255, 0.9)',
  },
  decorativeIconRed: {
    color: '#FB3C44',
    fill: '#FB3C44',
  },
  decorativeIconGreen: {
    color: '#3FBB46',
    fill: '#3FBB46',
  },
  decorativeIconYellow: {
    color: '#F9CF00',
    fill: '#F9CF00',
  },

  // Interactive states
  interactive: {
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',

    ':hover': {
      opacity: 0.7,
    },

    ':active': {
      transform: 'scale(0.95)',
    },
  },
});
