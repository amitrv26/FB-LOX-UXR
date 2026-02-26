"use client";

/**
 * Centralized Icon Library
 * 
 * This module provides a unified interface for all icons used across the application.
 * It includes:
 * 1. Re-exports from the main Icon component for dynamic icon loading
 * 2. Pre-built SVG components for commonly used icons (faster rendering, no fetch)
 * 
 * Usage:
 * import { ChevronDownIcon, LikeIcon, Icon } from '@/components/icons';
 */

// Re-export the dynamic Icon component for cases where you need to load icons by name
export { default as Icon, IconDirect, IconInline } from '../Icon';

// ============================================
// NAVIGATION & UI ICONS
// ============================================

export const ChevronDownIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

export const ChevronUpIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
  </svg>
);

export const ChevronRightIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
  </svg>
);

export const CaretDownIcon = ({ size = 12, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 12 12" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M6 9L1.5 3h9L6 9z"/>
  </svg>
);

// ============================================
// ACTION ICONS (Like, Comment, Share, etc.)
// ============================================

export const LikeIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23C6.99968 23 7.00132 23 7.00197 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5ZM8 21H13.4785L13.5 21.0002H17.75C18.5784 21.0002 19.25 20.3287 19.25 19.5002C19.25 19.4833 19.2497 19.4663 19.2492 19.4495C19.237 19.0807 19.429 18.7352 19.7484 18.5507C20.1999 18.2899 20.5 17.8045 20.5 17.2502C20.5 17.0609 20.4654 16.8819 20.403 16.7177C20.2344 16.2739 20.4011 15.7727 20.802 15.5182C21.2237 15.2506 21.5 14.7823 21.5 14.2502C21.5 13.8943 21.3773 13.5697 21.171 13.3126C20.9193 12.999 20.88 12.5652 21.0711 12.2114C21.185 12.0007 21.25 11.7594 21.25 11.5C21.25 10.6716 20.5784 10 19.75 10L14.4902 10C13.6671 10 12.999 9.33273 12.999 8.50961V4.5C12.999 3.39543 12.1036 2.5 10.999 2.5C10.7229 2.5 10.499 2.72386 10.499 3V3.81449C10.499 5.40699 10.1282 6.97762 9.41606 8.40199L8.52689 10.1803C8.19449 10.8451 8.01467 11.5753 8 12.3176V21ZM6 12.2995C5.99935 12.3384 5.99902 12.3774 5.99902 12.4164V21H3C2.72386 21 2.5 20.7761 2.5 20.5V12.5C2.5 12.2239 2.72386 12 3 12H6V12.2995Z" />
  </svg>
);

export const LikeIconFilled = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M10.999 0.5C9.61831 0.5 8.49902 1.61929 8.49902 3V3.81449C8.49902 5.0965 8.20054 6.3609 7.62721 7.50757L6.73803 9.28591C6.62168 9.51861 6.51869 9.75703 6.42932 10H3C1.61929 10 0.5 11.1193 0.5 12.5V20.5C0.5 21.8807 1.61929 23 3 23L6.99902 23H13.4582L13.5 23.0002H17.75C19.5287 23.0002 20.9975 21.6734 21.2207 19.9555C22.0005 19.3146 22.5 18.3412 22.5 17.2502C22.5 17.0763 22.4872 16.905 22.4625 16.7372C23.1022 16.1037 23.5 15.2236 23.5 14.2502C23.5 13.6479 23.3472 13.0799 23.0785 12.5842C23.1899 12.2422 23.25 11.8775 23.25 11.5C23.25 9.567 21.683 8 19.75 8H14.999V4.5C14.999 2.29086 13.2082 0.5 10.999 0.5Z"/>
  </svg>
);

export const CommentIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 13.9218 23.0278 15.7363 22.1922 17.3308C22.105 17.4973 22.092 17.6559 22.1233 17.7765L23.0047 21.1762C23.2918 22.2835 22.2835 23.2918 21.1762 23.0047L17.7765 22.1233C17.6559 22.092 17.4973 22.105 17.3308 22.1922C15.7363 23.0278 13.9218 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.7533 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.7533 21.5 12 21.5C13.5908 21.5 15.0875 21.1098 16.4025 20.4207C16.9511 20.1333 17.6177 20.016 18.2785 20.1873L20.8554 20.8554L20.1873 18.2785C20.016 17.6177 20.1333 16.9511 20.4207 16.4025C21.1098 15.0875 21.5 13.5908 21.5 12Z" />
  </svg>
);

// Smaller comment icon variant (16px default)
export const CommentIconSmall = ({ size = 16, color = "currentColor", onMedia = false, className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <path 
      d="M8 1C4.13 1 1 3.69 1 7c0 1.68.82 3.18 2.1 4.21v2.79l2.52-1.35c.75.2 1.54.35 2.38.35 3.87 0 7-2.69 7-6s-3.13-6-7-6zm0 10.67c-.67 0-1.3-.08-1.91-.23l-1.43.77v-1.46l-.4-.33C2.99 9.3 2.33 8.2 2.33 7c0-2.58 2.54-4.67 5.67-4.67s5.67 2.09 5.67 4.67-2.54 4.67-5.67 4.67z" 
      fill={onMedia ? "white" : color === "currentColor" ? "#65686c" : color}
    />
  </svg>
);

export const ShareIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8628 3.15582C12.5462 2.83512 12 3.05932 12 3.50998V8.00248C12 8.55476 11.5523 9.00248 11 9.00248H10.5C7.58095 9.00248 5.50274 10.222 4.12357 12.0953C2.91318 13.7395 2.21242 15.9327 2.04135 18.3301C2.81703 17.3939 3.76238 16.6319 4.93033 16.075C6.44545 15.3526 8.27778 15.0025 10.5 15.0025H11C11.5523 15.0025 12 15.4502 12 16.0025V20.4901C12 20.9408 12.5462 21.165 12.8628 20.8443L21.2451 12.3543C21.4389 12.1579 21.4389 11.8423 21.2451 11.6459L12.8628 3.15582ZM10 3.50998C10 1.27134 12.7132 0.157623 14.286 1.75067L22.6683 10.2408C23.6312 11.216 23.6312 12.7842 22.6683 13.7594L14.286 22.2494C12.7132 23.8425 10 22.7288 10 20.4901V17.0092C8.22692 17.058 6.86408 17.3687 5.79111 17.8803C4.63182 18.433 3.75465 19.2468 3.04864 20.3333C2.59207 21.0359 1.78571 21.1208 1.2696 21.0032C0.755147 20.8861 0 20.429 0 19.5025C0 16.3518 0.789377 13.2508 2.51296 10.9096C4.17987 8.6454 6.68372 7.14917 10 7.01268V3.50998Z" />
  </svg>
);

export const ReplyIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M6 3v2.5c4.5 0 7.5 1.5 9 5.5-1-3-3.5-4.5-9-4.5V9L2 6l4-3z"/>
  </svg>
);

// ============================================
// MENU & DOTS ICONS
// ============================================

export const MoreIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const MoreHorizontalIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <circle cx="6" cy="12" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="18" cy="12" r="2"/>
  </svg>
);

export const DotsIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <circle cx="12" cy="12" r="2"/>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="19" r="2"/>
  </svg>
);

// ============================================
// SEARCH & MAGNIFYING GLASS ICONS
// ============================================

export const SearchIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

// Search icon in circle for input fields
export const SearchCircleIcon = ({ size = 28, isActive = false, className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 28 28" 
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="14" cy="14" r="14" fill={isActive ? "#0866FF" : "#BCC0C4"}/>
    <circle cx="12.5" cy="12.5" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
    <path d="M15.5 15.5L19 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ============================================
// AI & SPARKLE ICONS
// ============================================

export const AISparkleIcon = ({ size = 16, color = "#9334E6", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M10.3137 9.16065C9.59548 7.62174 7.40721 7.62175 6.689 9.16065L6.3031 9.98752C5.62186 11.4472 4.44855 12.6205 2.98886 13.3018L2.16199 13.6877C0.623084 14.4059 0.623089 16.5941 2.16199 17.3123L2.98886 17.6982C4.44855 18.3795 5.62186 19.5528 6.3031 21.0125L6.689 21.8394C7.40721 23.3783 9.59548 23.3783 10.3137 21.8394L10.6996 21.0125C11.3808 19.5528 12.5541 18.3795 14.0138 17.6982L14.8407 17.3123C16.3796 16.5941 16.3796 14.4059 14.8407 13.6877L14.0138 13.3018C12.5541 12.6205 11.3808 11.4472 10.6996 9.98752L10.3137 9.16065Z" />
    <path d="M12.002 1C10.3451 1 9.00195 2.34315 9.00195 4C9.00195 5.65685 10.3451 7 12.002 7C13.6588 7 15.002 5.65685 15.002 4C15.002 2.34315 13.6588 1 12.002 1Z" />
    <path d="M20.9417 13.0532C22.4288 13.4517 23.7896 12.0908 23.3911 10.6037L22.0463 5.5846C21.6478 4.09745 19.7889 3.59936 18.7002 4.68802L15.026 8.36226C13.9373 9.45092 14.4354 11.3098 15.9226 11.7083L20.9417 13.0532Z" />
  </svg>
);

export const GenAiStarIcon = ({ size = 16, color = "#9334E6", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M8 0l2.5 5 5.5 1-4 4 1 5.5L8 13l-5 2.5 1-5.5-4-4 5.5-1L8 0z"/>
  </svg>
);

// Blueprint Nucleus: gen-ai-magnifying-glass (outline variant)
export const GenAiMagnifyingGlassIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <path d="M6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 7.74832 11.5841 8.89961 10.8863 9.82544L14.7803 13.7197C15.0732 14.0126 15.0732 14.4874 14.7803 14.7803C14.4874 15.0732 14.0126 15.0732 13.7197 14.7803L9.82569 10.8861C8.89982 11.584 7.74845 12 6.5 12ZM6.5 10.5C8.70914 10.5 10.5 8.70914 10.5 6.5C10.5 4.29086 8.70914 2.5 6.5 2.5C4.29086 2.5 2.5 4.29086 2.5 6.5C2.5 8.70914 4.29086 10.5 6.5 10.5Z" fill={color}/>
  </svg>
);

// ============================================
// CHECKMARK & VALIDATION ICONS
// ============================================

export const CheckIcon = ({ size = 14, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const CheckmarkIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
  </svg>
);

export const SelectedCheckIcon = ({ size = 20, color = "#1a73e8", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const BadgeCheckmarkIcon = ({ size = 16, color = "#1877f2", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05z"/>
  </svg>
);

// ============================================
// CLOSE & CLEAR ICONS
// ============================================

export const CloseIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

export const ClearIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// ============================================
// LOCATION & MAP ICONS
// ============================================

export const LocationIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export const GlobeIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8c0-.51.06-1 .17-1.48h2.4c-.05.49-.07.98-.07 1.48s.02.99.07 1.48h-2.4A6.52 6.52 0 011.5 8zm.84-3h2.11c.17-.76.42-1.46.73-2.07A6.52 6.52 0 002.34 5zm2.11 6H2.34a6.52 6.52 0 002.84 2.07A9.33 9.33 0 014.45 11zm.12-1c-.06-.49-.1-.98-.1-1.48s.04-.99.1-1.48H7.5v2.96H4.57zm.61-4.52c.23-.6.53-1.14.88-1.6.36-.47.77-.86 1.2-1.15A3.17 3.17 0 007.5 5h-.03c-.4 0-.79-.02-1.16-.06l-.53-.08-.6.62zm2.32 9.34c-.43-.29-.84-.68-1.2-1.15-.35-.46-.65-1-.88-1.6l.6.62c.37-.04.76-.06 1.16-.06h.03v2.52a3.17 3.17 0 00-.71-.33zm.5.18V12.52H7.5v2.52c.16.1.33.18.5.24a4.09 4.09 0 003.18 0c.17-.06.34-.14.5-.24V12.52H8.5V15zm2.82-4.48c.06.49.1.98.1 1.48s-.04.99-.1 1.48H8.5V6.52h2.32c.06.49.1.98.1 1.48zm.08-4c.35.61.6 1.31.77 2.07h2.11a6.52 6.52 0 00-2.88-2.07zm.77 8.07a9.33 9.33 0 01-.77 2.07 6.52 6.52 0 002.88-2.07h-2.11zm2.19-4.11h-2.4c.05-.49.07-.98.07-1.48s-.02-.99-.07-1.48h2.4c.11.48.17.97.17 1.48s-.06 1-.17 1.48z"/>
  </svg>
);

// ============================================
// MEDIA & PLAY ICONS
// ============================================

export const PlayIcon = ({ size = 40, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M8 5.14v14l11-7-11-7z"/>
  </svg>
);

export const PlayCircleIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
  </svg>
);

export const ViewsIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// ============================================
// SOCIAL & CONTACT ICONS
// ============================================

export const PhoneIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

export const ClockIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
);

export const CalendarIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
  </svg>
);

export const PeopleIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

export const PeopleTalkingIcon = ({ size = 20, color = "#65686c", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none"
    className={className}
    style={style}
    {...props}
  >
    <circle cx="6" cy="6" r="3" fill={color}/>
    <circle cx="14" cy="6" r="3" fill={color}/>
    <path d="M0 16c0-2.21 2.69-4 6-4s6 1.79 6 4v1H0v-1z" fill={color}/>
    <path d="M14 12c2.21 0 4 1.34 4 3v2h-6v-1c0-1.48-.81-2.77-2-3.46.61-.35 1.28-.54 2-.54h2z" fill={color}/>
    <path d="M4 3.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v0c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v0z" fill={color}/>
    <path d="M13 3.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v0c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v0z" fill={color}/>
  </svg>
);

export const SendIcon = ({ size = 20, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

// ============================================
// RATING & STAR ICONS
// ============================================

export const StarIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

export const StarOutlineIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
  </svg>
);

// ============================================
// MARKETPLACE & COMMERCE ICONS
// ============================================

export const MessengerIcon = ({ size = 24, color = "#0866FF", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.877 1.431 5.444 3.667 7.126V22l3.455-1.897c.92.255 1.897.39 2.878.39 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.05 12.441l-2.545-2.717-4.968 2.717 5.465-5.804 2.608 2.717 4.905-2.717-5.465 5.804z"/>
  </svg>
);

export const NotificationsIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...props}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export const HandCoinIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm9 6.5c0-.83-.67-1.5-1.5-1.5h-4.34c-.94 0-1.84.39-2.5 1.07l-2.79 2.79c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L14 17.59V22h8v-3.5c0-.83-.67-1.5-1.5-1.5H21v-.5zM3 13.5C3 14.33 3.67 15 4.5 15H6v7H2v-7h.5c.83 0 1.5-.67 1.5-1.5v0z"/>
  </svg>
);

export const BookmarkIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

export const BookmarkOutlineIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
  </svg>
);

export const LinkIcon = ({ size = 16, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M6.354 5.5H4a3 3 0 000 6h3a3 3 0 002.83-4H9a2 2 0 01-2 2H4a2 2 0 010-4h1.354a4.013 4.013 0 01.944 0H6.5a2.5 2.5 0 000-.5h-.146zM9.646 10.5H12a3 3 0 000-6H9a3 3 0 00-2.83 4H7a2 2 0 012-2h3a2 2 0 010 4h-1.354a4.013 4.013 0 01-.944 0H9.5a2.5 2.5 0 000 .5h.146z"/>
  </svg>
);

export const TriangleDownIcon = ({ size = 12, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 12 12" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M2 4h8L6 10 2 4z"/>
  </svg>
);

// ============================================
// GOOGLE-SPECIFIC ICONS
// ============================================

export const MicIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
  </svg>
);

export const LensIcon = ({ size = 24, className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 192 192" 
    className={className}
    style={style}
    {...props}
  >
    <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="192" width="192"/>
    <g>
      <circle cx="96" cy="104.15" fill="#fff" r="28"/>
      <path clipRule="evenodd" d="M160,72v40.15V136c0,1.69-0.34,3.29-0.82,4.82v0 c-1.57,4.92-5.43,8.78-10.35,10.35h0C147.29,151.66,145.68,152,144,152H48c-6.63,0-12-5.37-12-12v-23.85V72 c0-6.62,5.37-12,12-12h18.55H96h29.45H144C150.63,60,160,65.38,160,72z" fill="#fff" fillRule="evenodd"/>
      <g>
        <path clipRule="evenodd" d="M155.18,140.82L155.18,140.82c1.58-4.93,0.82-3.13,0.82-4.82 v-10.15V90.15c-9.07-15.73-26.29-26.32-46-26.32c-29.27,0-53,23.77-53,53.08c0,14.56,5.87,27.76,15.36,37.36 c0.89,0.86,1.82,1.68,2.78,2.46c0.03,0.03,0.07,0.06,0.1,0.08c0.57,0.46,1.15,0.91,1.74,1.34h0.01 c9.57,6.89,21.29,10.95,33.97,10.95c7.82,0,15.27-1.63,22.02-4.57h0.01c0.09-0.04,0.19-0.08,0.28-0.12 c1.39-0.61,2.75-1.28,4.07-2.01c0.26-0.15,0.52-0.3,0.78-0.45c0.89-0.51,1.76-1.05,2.61-1.62c0.05-0.03,0.1-0.06,0.14-0.09 c0.87-0.59,1.71-1.21,2.53-1.85h0c0.01,0,0.01-0.01,0.02-0.01c0.82-0.65,1.62-1.33,2.39-2.03c0.12-0.11,0.24-0.21,0.36-0.32 c0.63-0.58,1.24-1.18,1.83-1.8c0.21-0.22,0.41-0.44,0.62-0.67C150.24,148.79,153.72,145.22,155.18,140.82L155.18,140.82z" fill="#34a853" fillRule="evenodd"/>
        <path clipRule="evenodd" d="M74.04,74.04C81.3,66.78,91.21,63.91,110,63.91V60H66.54H48 c-6.63,0-12,5.38-12,12v23.85v16.06C36,91.21,59.49,88.59,74.04,74.04z" fill="#fbbc04" fillRule="evenodd"/>
        <path clipRule="evenodd" d="M110,63.91c-18.79,0-28.7,2.87-35.96,10.13 C59.49,88.59,36,91.21,36,111.91c0,10.52,3.06,20.34,8.33,28.61C36.61,130.67,32,117.87,32,104c0-39.76,32.24-72,72-72 c4.72,0,9.35,0.46,13.82,1.33C114.93,62.72,110,63.91,110,63.91z" fill="#ea4335" fillRule="evenodd"/>
        <path clipRule="evenodd" d="M148.82,151.18c4.92-1.57,8.78-5.43,10.35-10.35v0 c0.49-1.53,0.82-3.13,0.82-4.82v-24.98c0,17.09-5.93,32.8-15.84,45.2C146.38,155,148.82,151.18,148.82,151.18z" fill="#4285f4" fillRule="evenodd"/>
      </g>
      <circle cx="96" cy="104.15" fill="#f1f3f4" r="22"/>
    </g>
  </svg>
);

export const AppsIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
  </svg>
);

// ============================================
// REACTION ICONS (with gradients)
// ============================================

export const LikeReactionIcon = ({ size = 16, className, style, ...props }) => (
  <svg 
    viewBox="0 0 16 16" 
    width={size}
    height={size}
    className={className}
    style={style}
    {...props}
  >
    <defs>
      <linearGradient id="likeGrad" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#18AFFF"/>
        <stop offset="100%" stopColor="#0062DF"/>
      </linearGradient>
    </defs>
    <circle cx="8" cy="8" r="8" fill="url(#likeGrad)"/>
    <path fill="#fff" d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.072.194-.073.394-.073.643 0 .823.27.823.75 0 .29-.082.725-.188 1.123h2.18c.59 0 1.09.417 1.09.876 0 .459-.175.612-.335.746z"/>
  </svg>
);

export const LoveReactionIcon = ({ size = 16, className, style, ...props }) => (
  <svg 
    viewBox="0 0 16 16" 
    width={size}
    height={size}
    className={className}
    style={style}
    {...props}
  >
    <defs>
      <linearGradient id="loveGrad" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#FF6680"/>
        <stop offset="100%" stopColor="#E61739"/>
      </linearGradient>
    </defs>
    <circle cx="8" cy="8" r="8" fill="url(#loveGrad)"/>
    <path fill="#fff" d="M8 12.5l-.5-.5C5 9.5 3.5 8 3.5 6.5 3.5 5.1 4.6 4 6 4c.8 0 1.5.4 2 1 .5-.6 1.2-1 2-1 1.4 0 2.5 1.1 2.5 2.5 0 1.5-1.5 3-4 5.5l-.5.5z"/>
  </svg>
);

export const WowReactionIcon = ({ size = 16, className, style, ...props }) => (
  <svg 
    viewBox="0 0 16 16" 
    width={size}
    height={size}
    className={className}
    style={style}
    {...props}
  >
    <defs>
      <linearGradient id="wowGrad" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#FEEA70"/>
        <stop offset="100%" stopColor="#F69B30"/>
      </linearGradient>
    </defs>
    <circle cx="8" cy="8" r="8" fill="url(#wowGrad)"/>
    <circle cx="5.5" cy="5" r="1.5" fill="#000" opacity="0.7"/>
    <circle cx="10.5" cy="5" r="1.5" fill="#000" opacity="0.7"/>
    <ellipse cx="8" cy="11" rx="2" ry="2.5" fill="#000" opacity="0.7"/>
  </svg>
);

// Reaction icon mapping for dynamic use
export const REACTION_COMPONENTS = {
  like: LikeReactionIcon,
  love: LoveReactionIcon,
  wow: WowReactionIcon,
};

// ============================================
// FACEBOOK APP ICONS
// ============================================

export const FacebookIcon = ({ size = 24, color = "#1877f2", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);

// ============================================
// MENU ICONS
// ============================================

export const HamburgerMenuIcon = ({ size = 24, color = "currentColor", className, style, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
    style={style}
    {...props}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

