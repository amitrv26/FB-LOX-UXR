"use client";

/**
 * Google-specific icon re-exports
 * This file re-exports icons from the centralized icon system
 * for backwards compatibility with existing Google components
 */

export {
  // AI & Sparkle
  AISparkleIcon,
  
  // Navigation
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  
  // Actions
  MoreIcon,
  SearchIcon,
  CloseIcon,
  
  // Menu
  HamburgerMenuIcon as MenuIcon,
  
  // Rating
  StarIcon,
  
  // Location
  LocationIcon,
  
  // Media
  PlayIcon,
  
  // Social
  PeopleIcon,
  
  // Additional
  ClockIcon,
  PhoneIcon,
  GlobeIcon,
  BadgeCheckmarkIcon,
} from '../icons';

/**
 * Google Logo Component
 */
export const GoogleLogo = ({ className, style, ...props }) => (
  <svg 
    height="30" 
    viewBox="0 0 92 30" 
    className={className}
    style={style}
    {...props}
  >
    <path fill="#4285F4" d="M10.59 12.7c0-.82-.07-1.62-.21-2.39H.5v4.51h5.66c-.24 1.31-.98 2.43-2.09 3.17v2.64h3.39c1.98-1.82 3.13-4.51 3.13-7.93z" transform="translate(0 3)"/>
    <path fill="#34A853" d="M.5 21.93c2.83 0 5.21-.94 6.95-2.54l-3.39-2.64c-.94.63-2.14 1-3.56 1-2.74 0-5.06-1.85-5.89-4.34h-3.5v2.72c1.73 3.43 5.29 5.8 9.39 5.8z" transform="translate(0 3)"/>
    <path fill="#FBBC05" d="M-5.39 13.41c-.21-.63-.33-1.3-.33-2s.12-1.37.33-2V6.69h-3.5c-.69 1.38-1.08 2.94-1.08 4.72s.39 3.34 1.08 4.72l3.5-2.72z" transform="translate(10 3)"/>
    <path fill="#EA4335" d="M.5 5.07c1.54 0 2.93.53 4.02 1.57l3.02-3.02C5.7 1.89 3.33.91.5.91c-4.1 0-7.66 2.37-9.39 5.8l3.5 2.72c.83-2.49 3.15-4.36 5.89-4.36z" transform="translate(0 3)"/>
    <path fill="#4285F4" d="M29.12 15.41c0-4.45-2.99-7.75-7.04-7.75s-7.04 3.3-7.04 7.75 2.99 7.75 7.04 7.75 7.04-3.3 7.04-7.75zm-2.75 0c0 2.94-1.73 4.85-4.29 4.85s-4.29-1.91-4.29-4.85 1.73-4.85 4.29-4.85 4.29 1.91 4.29 4.85z"/>
    <path fill="#EA4335" d="M44.58 15.41c0-4.45-2.99-7.75-7.04-7.75s-7.04 3.3-7.04 7.75 2.99 7.75 7.04 7.75 7.04-3.3 7.04-7.75zm-2.75 0c0 2.94-1.73 4.85-4.29 4.85s-4.29-1.91-4.29-4.85 1.73-4.85 4.29-4.85 4.29 1.91 4.29 4.85z"/>
    <path fill="#FBBC05" d="M59.66 8.06v14.37c0 5.91-3.49 8.32-7.62 8.32-3.89 0-6.23-2.6-7.12-4.73l2.4-1c.55 1.31 1.9 2.87 4.71 2.87 3.09 0 4.99-1.9 4.99-5.49v-1.35h-.14c-.92 1.13-2.68 2.12-4.91 2.12-4.66 0-8.19-4.07-8.19-8.01 0-4 3.53-8.08 8.19-8.08 2.23 0 3.99.99 4.91 2.08h.14V8.06h2.64zm-2.44 7.23c0-2.83-1.89-4.9-4.3-4.9-2.45 0-4.5 2.07-4.5 4.9 0 2.8 2.05 4.83 4.5 4.83 2.41 0 4.3-2.03 4.3-4.83z"/>
    <path fill="#4285F4" d="M66.08 1v21.9h-2.71V1h2.71z"/>
    <path fill="#34A853" d="M77.88 18.32l2.15 1.43c-.69 1.03-2.37 2.8-5.27 2.8-3.59 0-6.27-2.78-6.27-7.12 0-4.23 2.7-7.12 5.96-7.12 3.28 0 4.89 2.61 5.41 4.02l.29.72-8.46 3.5c.65 1.27 1.66 1.92 3.08 1.92 1.43 0 2.42-.7 3.11-1.76zm-6.64-2.56l5.66-2.35c-.31-.79-1.25-1.34-2.35-1.34-1.41 0-3.38 1.25-3.31 3.69z"/>
  </svg>
);

