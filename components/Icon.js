"use client";

import { useState, useEffect } from 'react';

/**
 * Icon component with 1651 Facebook icons
 * Converted from StyleX to regular CSS
 * 
 * Features:
 * - In-memory cache for instant subsequent loads
 * - Smooth fade-in animation
 */

// Global icon cache - persists across component instances
const iconCache = new Map();

// Preload function for critical icons
const preloadIcon = (name) => {
  if (iconCache.has(name)) return Promise.resolve(iconCache.get(name));
  
  return fetch(`/icons/${name}.svg`)
    .then(res => res.text())
    .then(svg => {
      const match = svg.match(/<svg[^>]*>(.*?)<\/svg>/s);
      if (match) {
        iconCache.set(name, match[1]);
        return match[1];
      }
      return null;
    })
    .catch(err => {
      console.error(`Failed to preload icon: ${name}`, err);
      return null;
    });
};

// Defer icon preloading until after page is interactive
if (typeof window !== 'undefined') {
  const deferIconPreload = () => {
    const criticalIcons = [
      'news-feed-home-outline', 'news-feed-home-filled',
      'app-facebook-groups-outline', 'app-facebook-groups-filled',
      'marketplace-outline', 'marketplace-filled',
      'app-facebook-reels-outline', 'app-facebook-reels-filled',
      'gen-ai-magnifying-glass-outline', 'gen-ai-magnifying-glass-filled',
      'nav-cross-outline', 'arrow-up-filled',
    ];
    criticalIcons.forEach(preloadIcon);
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(deferIconPreload);
  } else {
    setTimeout(deferIconPreload, 200);
  }
}

const sizeMap = {
  12: { width: '12px', height: '12px' },
  16: { width: '16px', height: '16px' },
  20: { width: '20px', height: '20px' },
  24: { width: '24px', height: '24px' },
  28: { width: '28px', height: '28px' },
  32: { width: '32px', height: '32px' },
};

const colorMap = {
  primary: 'var(--primary-icon, #080809)',
  secondary: 'var(--secondary-icon, #65686c)',
  active: 'var(--active-icon, #0064d1)',
  disabled: 'var(--disabled-icon, #b0b3b8)',
  placeholder: 'var(--placeholder-icon, #65686c)',
  meta: 'var(--meta-icon, #65686c)',
  device: 'var(--device-icon, #000000)',
  onMedia: 'var(--on-media-icon, #ffffff)',
  secondaryOnMedia: 'var(--secondary-on-media, rgba(255, 255, 255, 0.9))',
  'decorative-icon-red': 'var(--decorative-icon-red, #fb3c44)',
  'decorative-icon-green': 'var(--decorative-icon-green, #3fbb46)',
  'decorative-icon-yellow': 'var(--decorative-icon-yellow, #f9cf00)',
};

export default function Icon({
  name,
  size = 24,
  color,
  interactive = false,
  className,
  style,
  onClick,
  ...props
}) {
  // Always start with null to avoid hydration mismatch (server has no cache)
  const [svgContent, setSvgContent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only access cache after mount to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
    
    // Check cache first after mount
    if (iconCache.has(name)) {
      setSvgContent(iconCache.get(name));
      return;
    }
    
    fetch(`/icons/${name}.svg`)
      .then(res => res.text())
      .then(svg => {
        const match = svg.match(/<svg[^>]*>(.*?)<\/svg>/s);
        if (match) {
          // Cache for future use
          iconCache.set(name, match[1]);
          setSvgContent(match[1]);
        }
      })
      .catch(err => console.error(`Failed to load icon: ${name}`, err));
  }, [name]);

  const sizeStyle = sizeMap[size] || sizeMap[24];
  const colorValue = color ? colorMap[color] : undefined;

  const iconStyle = {
    display: 'inline-block',
    flexShrink: 0,
    ...sizeStyle,
    color: colorValue || style?.color,
    cursor: interactive ? 'pointer' : undefined,
    opacity: isMounted && svgContent ? 1 : 0,
    transition: 'opacity 0.1s ease-out',
    ...style,
  };

  return (
    <svg
      className={className}
      style={iconStyle}
      onClick={onClick}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
      {...props}
    />
  );
}

export function IconDirect({
  name,
  size = 24,
  color,
  interactive = false,
  className,
  style,
  onClick,
  ...props
}) {
  const sizeStyle = sizeMap[size] || sizeMap[24];
  const colorValue = color ? colorMap[color] : undefined;

  const iconStyle = {
    display: 'inline-block',
    flexShrink: 0,
    ...sizeStyle,
    color: colorValue || style?.color,
    cursor: interactive ? 'pointer' : undefined,
    ...style,
  };

  return (
    <span
      className={className}
      style={iconStyle}
      onClick={onClick}
      dangerouslySetInnerHTML={{
        __html: `<img src="/icons/${name}.svg" alt="${name}" style="width: 100%; height: 100%; display: block;" />`
      }}
      {...props}
    />
  );
}

export function IconInline({
  name,
  size = 24,
  color,
  interactive = false,
  className,
  style,
  onClick,
  ...props
}) {
  // Always start with null to avoid hydration mismatch
  const [svgContent, setSvgContent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check cache first after mount
    if (iconCache.has(name)) {
      setSvgContent(iconCache.get(name));
      return;
    }
    
    fetch(`/icons/${name}.svg`)
      .then(res => res.text())
      .then(svg => {
        const match = svg.match(/<svg[^>]*>(.*?)<\/svg>/s);
        if (match) {
          // Cache for future use
          iconCache.set(name, match[1]);
          setSvgContent(match[1]);
        }
      })
      .catch(err => console.error(`Failed to load icon: ${name}`, err));
  }, [name]);

  const sizeStyle = sizeMap[size] || sizeMap[24];
  const colorValue = color ? colorMap[color] : undefined;

  const iconStyle = {
    display: 'inline-block',
    flexShrink: 0,
    ...sizeStyle,
    color: colorValue || style?.color,
    cursor: interactive ? 'pointer' : undefined,
    opacity: isMounted && svgContent ? 1 : 0,
    transition: 'opacity 0.1s ease-out',
    ...style,
  };

  return (
    <svg
      className={className}
      style={iconStyle}
      onClick={onClick}
      viewBox="0 0 24 24"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    />
  );
}
