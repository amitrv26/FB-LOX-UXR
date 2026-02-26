"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUseCase } from "../../contexts/UseCaseContext";
import Icon from "../Icon";

// Facebook wordmark - local image
const FACEBOOK_WORDMARK_URL = "/images/facebook-wordmark.png";

// App Store URLs
const IOS_APP_STORE_URL = "https://apps.apple.com/app/facebook/id284882215";
const ANDROID_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.facebook.katana";

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

// Get category from pathname
function getCategoryFromPathname(pathname) {
  if (!pathname) return null;
  
  // Check exact matches first
  if (ROUTE_TO_CATEGORY[pathname]) {
    return ROUTE_TO_CATEGORY[pathname];
  }
  
  // Check prefix matches for nested routes
  for (const [route, category] of Object.entries(ROUTE_TO_CATEGORY)) {
    if (pathname.startsWith(route + '/')) {
      return category;
    }
  }
  
  return null;
}

const MobileHeader = ({ showCloseButton = false, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { openBottomSheet } = useUseCase();

  const handleLogoClick = () => {
    const category = getCategoryFromPathname(pathname);
    openBottomSheet({ selectedCategory: category });
  };

  const handleOpenApp = () => {
    // Detect platform and open appropriate store
    const isAndroid = /android/i.test(navigator.userAgent);
    const url = isAndroid ? ANDROID_PLAY_STORE_URL : IOS_APP_STORE_URL;
    window.location.href = url;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/m/aggregation/stranger-things-finale');
    }
  };

  return (
    <>
      <header className="mobile-header">
        <div 
          className="mobile-header__logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={FACEBOOK_WORDMARK_URL} 
            alt="Facebook" 
            className="mobile-header__wordmark"
          />
        </div>

        <div className="mobile-header__actions">
          {showCloseButton ? (
            <button 
              className="mobile-header__close-btn"
              onClick={handleClose}
              aria-label="Close"
            >
              <Icon name="cross-outline" size={24} color="primary" />
            </button>
          ) : (
            <button 
              className="mobile-header__login"
              onClick={handleOpenApp}
            >
              Open app
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default MobileHeader;

