"use client";

import { useState, useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { IconInline } from './Icon';
import manifest from '../public/icons/manifest.json';

const styles = stylex.create({
  browser: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '24px',
  },
  search: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  filterButton: {
    padding: '8px 16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.15s',

    ':hover': {
      backgroundColor: '#f0f2f5',
    },
  },
  filterButtonActive: {
    backgroundColor: '#0866ff',
    color: '#fff',
    borderColor: '#0866ff',

    ':hover': {
      backgroundColor: '#0866ff',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
  },
  iconCard: {
    padding: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e5e9',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',

    ':hover': {
      borderColor: '#0866ff',
      backgroundColor: '#f7f9fc',
    },
  },
  iconWrapper: {
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '48px',
  },
  iconName: {
    fontSize: '11px',
    color: '#65686c',
    wordBreak: 'break-word',
  },
  count: {
    fontSize: '14px',
    color: '#65686c',
    marginBottom: '16px',
  },
});

export default function IconBrowser() {
  const [search, setSearch] = useState('');
  const [variant, setVariant] = useState('all');
  const [size, setSize] = useState(24);
  const [copied, setCopied] = useState(null);

  const filteredIcons = useMemo(() => {
    return manifest.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase());
      const matchesVariant = variant === 'all' || icon.variant === variant;
      return matchesSearch && matchesVariant;
    });
  }, [search, variant]);

  const handleCopy = (iconName) => {
    const code = `<Icon name="${iconName}" size={${size}} color="primary" />`;
    navigator.clipboard.writeText(code);
    setCopied(iconName);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div {...stylex.props(styles.browser)}>
      <div {...stylex.props(styles.header)}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Icon Browser</h1>
        <p {...stylex.props(styles.count)}>
          {filteredIcons.length} of {manifest.length} icons
        </p>

        <input
          {...stylex.props(styles.search)}
          type="text"
          placeholder="Search icons... (e.g., heart, star, settings)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div {...stylex.props(styles.filters)}>
          <button
            {...stylex.props(
              styles.filterButton,
              variant === 'all' && styles.filterButtonActive
            )}
            onClick={() => setVariant('all')}
          >
            All
          </button>
          <button
            {...stylex.props(
              styles.filterButton,
              variant === 'filled' && styles.filterButtonActive
            )}
            onClick={() => setVariant('filled')}
          >
            Filled
          </button>
          <button
            {...stylex.props(
              styles.filterButton,
              variant === 'outline' && styles.filterButtonActive
            )}
            onClick={() => setVariant('outline')}
          >
            Outline
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#65686c' }}>Size:</span>
            {[16, 20, 24, 28, 32].map(s => (
              <button
                key={s}
                {...stylex.props(
                  styles.filterButton,
                  size === s && styles.filterButtonActive
                )}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.grid)}>
        {filteredIcons.map(icon => (
          <div
            key={icon.name}
            {...stylex.props(styles.iconCard)}
            onClick={() => handleCopy(icon.name)}
            title={copied === icon.name ? 'Copied!' : 'Click to copy'}
          >
            <div {...stylex.props(styles.iconWrapper)}>
              <IconInline name={icon.name} size={size} color="primary" />
            </div>
            <div {...stylex.props(styles.iconName)}>
              {copied === icon.name ? '✓ Copied!' : icon.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
