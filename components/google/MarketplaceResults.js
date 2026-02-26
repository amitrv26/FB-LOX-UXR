"use client";

/**
 * MarketplaceResults Component
 * Displays Facebook Marketplace products in Google-style layout
 */

import { MoreIcon, ChevronRightIcon } from './Icons';
import { GoogleDivider, FilterPills, ProductCard } from './shared';

// Default filters for marketplace
const DEFAULT_FILTERS = ['All', 'Electronics', 'Furniture', 'Vehicles', 'Clothing'];

export default function MarketplaceResults({ 
  products = [], 
  sponsoredProducts = [],
  collectibles = [],
  title = "Facebook Marketplace",
  showFilters = true,
  filters = DEFAULT_FILTERS,
  onProductClick,
  onViewAllClick,
}) {
  if (!products.length && !sponsoredProducts.length && !collectibles.length) {
    return null;
  }

  const renderProductRow = (items, sectionTitle, showViewAll = false, isSponsored = false) => (
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="https://www.facebook.com/images/fb_icon_325x325.png" 
            alt="Facebook"
            style={{ width: '20px', height: '20px', borderRadius: '4px' }}
          />
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#202124',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {sectionTitle}
          </span>
          {isSponsored && (
            <span style={{ 
              fontSize: '11px', 
              color: '#70757a',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              · Sponsored
            </span>
          )}
        </div>
        <button 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreIcon size={20} color="#70757a" />
        </button>
      </div>

      {/* Scrolling Products */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto',
          marginLeft: '-16px',
          marginRight: '-16px',
          padding: '0 16px',
          WebkitOverflowScrolling: 'touch',
        }}
        className="hide-scrollbar"
      >
        {items.map((product, idx) => (
          <ProductCard 
            key={product.id || idx}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>

      {/* View All Link */}
      {showViewAll && (
        <button
          onClick={onViewAllClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span style={{ 
            fontSize: '14px', 
            color: '#1a73e8',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            See results on Facebook
          </span>
          <ChevronRightIcon size={16} color="#1a73e8" />
        </button>
      )}
    </div>
  );

  return (
    <section style={{ marginBottom: '16px' }}>
      {/* Section Title */}
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: '400', 
        color: '#202124', 
        margin: '0 0 12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        {title}
      </h2>

      {/* Filter Pills */}
      {showFilters && (
        <FilterPills filters={filters} />
      )}

      {/* Sponsored Products */}
      {sponsoredProducts.length > 0 && (
        <>
          {renderProductRow(sponsoredProducts, "Sponsored picks from Marketplace", false, true)}
          <GoogleDivider />
        </>
      )}

      {/* Main Products */}
      {products.length > 0 && (
        <>
          {renderProductRow(products, "Products for sale", true)}
          <GoogleDivider />
        </>
      )}

      {/* Collectibles */}
      {collectibles.length > 0 && (
        <>
          {renderProductRow(collectibles, "Collectibles", false)}
          <GoogleDivider />
        </>
      )}
    </section>
  );
}

