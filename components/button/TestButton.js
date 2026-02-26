"use client";

import * as stylex from '@stylexjs/stylex';
import { styles } from './TestButton.stylex';

export default function TestButton({ children, variant = 'primary', onClick }) {
  return (
    <button
      {...stylex.props(
        styles.button,
        variant === 'secondary' && styles.secondary
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
