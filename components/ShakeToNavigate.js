"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import UseCaseBottomSheet from './mobile/UseCaseBottomSheet';
import { useUseCase } from '../contexts/UseCaseContext';

// Route to category mapping for determining selected category
const ROUTE_TO_CATEGORY = {
  '/m/messages-share': 'videoLinkShare',
  '/m/messages-share-feed': 'videoLinkShareFeed',
  '/m/marketplace-share': 'marketplace',
  '/m/groups': 'groups',
  '/m/marketplace': 'marketplace',
  '/m/reels': 'videoLinkShare',
  '/m/profile': 'profileBusiness',
  '/m/explore': 'aggregation',
};

// Check if pathname starts with a route prefix
function getCategoryFromPathname(pathname) {
  // Check exact matches first
  if (ROUTE_TO_CATEGORY[pathname]) {
    return ROUTE_TO_CATEGORY[pathname];
  }
  
  // Check prefix matches for nested routes (e.g., /m/groups/123/posts/456)
  for (const [route, category] of Object.entries(ROUTE_TO_CATEGORY)) {
    if (pathname?.startsWith(route + '/')) {
      return category;
    }
  }
  
  return null;
}

/**
 * ShakeToNavigate
 * 
 * Wrapper component that renders the global Use Case Bottom Sheet.
 * The bottom sheet is triggered by:
 * - Tapping the Facebook logo (MobileHeader)
 * - Tapping the hamburger menu (Google page)
 * - Tapping the chevron/back button (Messages share pages)
 */
export default function ShakeToNavigate({ children }) {
  const pathname = usePathname();
  const { isBottomSheetOpen, closeBottomSheet, selectedCategory, setSelectedCategory } = useUseCase();

  // Update selected category when route changes
  // Read URL params client-side only to avoid hydration mismatch
  useEffect(() => {
    // First check direct route mappings and prefix matches
    const categoryFromPath = getCategoryFromPathname(pathname);
    if (categoryFromPath) {
      setSelectedCategory(categoryFromPath);
      return;
    }
    
    // For Google page, check category from URL params (client-side only)
    if (pathname === '/google' && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');
      if (category) {
        setSelectedCategory(category);
        return;
      }
    }
    
    // Default: keep existing selection or null
  }, [pathname, setSelectedCategory]);

  return (
    <>
      {children}
      
      {/* Global Use Case Bottom Sheet triggered by logo tap, hamburger menu, or chevron */}
      <UseCaseBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        selectedCategory={selectedCategory}
        currentRoute={pathname}
      />
    </>
  );
}

