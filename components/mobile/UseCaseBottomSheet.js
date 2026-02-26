"use client";

import { useRouter } from "next/navigation";

// All use case categories (combined)
const USE_CASE_ITEMS = [
  { key: 'groups', label: '1' },
  { key: 'marketplace', label: '2' },
  { key: 'videoLinkShare', label: '3' },
  { key: 'profileBusiness', label: '4' },
  { key: 'aggregation', label: '5' },
];

// Route mapping for all categories
const CATEGORY_ROUTES = {
  'groups': '/google?category=groups',
  'aggregation': '/google?category=aggregation',
  'profileBusiness': '/google?category=profileBusiness',
  'marketplace': '/google?category=marketplace',
  'videoLinkShare': '/m/messages-share',
};

export default function UseCaseBottomSheet({ 
  isOpen, 
  onClose, 
  selectedCategory,
  currentRoute, // The current page's route to prevent navigation to same page
  onCategoryChange // Optional callback for when category changes (used by google page)
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCategorySelect = (category) => {
    onClose();
    
    // If a custom handler is provided, use it
    if (onCategoryChange) {
      onCategoryChange(category);
      return;
    }
    
    // Otherwise, use default navigation
    const route = CATEGORY_ROUTES[category];
    if (route && route !== currentRoute) {
      router.push(route);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#f2f4f7',
          borderRadius: '16px 16px 0 0',
          width: '100%',
          maxWidth: '500px',
          paddingBottom: '32px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h3 style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontSize: '17px', 
          fontWeight: 700, 
          margin: 0,
          padding: '16px 12px',
          textAlign: 'center',
          color: '#080809',
          letterSpacing: '-0.41px',
          lineHeight: '20px',
        }}>
          Select use case
        </h3>
        
        {/* Use Cases - Single White Card */}
        <div style={{ padding: '0 12px' }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '0 12px',
          }}>
            {USE_CASE_ITEMS.map((item) => (
              <button 
                key={item.key}
                onClick={() => handleCategorySelect(item.key)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minHeight: '44px',
                }}
              >
                <p style={{ 
                  margin: 0, 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '17px',
                  fontWeight: 500,
                  color: '#080809',
                  letterSpacing: '-0.41px',
                  lineHeight: '20px',
                }}>
                  {item.label}
                </p>
                
                {/* Radio Button */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: selectedCategory === item.key ? 'none' : '2px solid #65686c',
                  background: selectedCategory === item.key ? '#0866ff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {selectedCategory === item.key && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'white',
                    }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

