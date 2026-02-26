/**
 * Google Search Page Components
 * Centralized exports for all Google-related components
 */

// Main Section Components
export { default as GoogleHeader } from './GoogleHeader';
export { default as AIOverview } from './AIOverview';
export { default as MarketplaceResults } from './MarketplaceResults';
export { default as VideoResults } from './VideoResults';
export { default as ProfileResults } from './ProfileResults';
export { default as GroupsResults } from './GroupsResults';

// Shared Components
export { 
  GoogleDivider, 
  FilterPills, 
  ProductCard, 
  VideoCard 
} from './shared';

// Icons (re-exported for convenience)
export * from './Icons';

