"use client";

/**
 * ProductCard Component
 * Google-style product card for Marketplace results
 */
export default function ProductCard({ 
  product, 
  onClick,
  width = '140px',
  showDiscount = true,
  showNearby = true,
  showRating = true,
  showStore = true,
}) {
  return (
    <div 
      onClick={() => onClick?.(product)}
      style={{
        flex: '0 0 auto',
        width,
        cursor: 'pointer',
        border: '1px solid #dadce0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Product Image */}
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: width, // Square aspect ratio
        background: '#f5f5f5'
      }}>
        <img 
          src={product.image} 
          alt={product.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
        {/* Discount badge */}
        {showDiscount && product.discount && (
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: '#fff',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
            color: '#202124',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {product.discount}
          </span>
        )}
        {/* Nearby badge */}
        {showNearby && product.nearbyDistance && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '8px',
          }}>
            <span style={{
              position: 'relative',
              background: '#fff',
              padding: '4px 8px',
              borderRadius: '3px',
              fontSize: '12px',
              color: '#202124',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a73e8">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {product.nearbyDistance}
            </span>
            {/* Speech bubble caret */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '12px',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #fff',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
            }} />
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div style={{ padding: '8px' }}>
        {/* Product Title */}
        <p style={{ 
          fontSize: '13px', 
          color: '#1a0dab',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          margin: '0 0 4px',
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.title}
        </p>
        
        {/* Price */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          marginBottom: '4px'
        }}>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#202124',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {product.price}
          </span>
          {product.originalPrice && (
            <span style={{ 
              fontSize: '14px', 
              color: '#70757a',
              textDecoration: 'line-through',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              {product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Store */}
        {showStore && product.storeName && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginBottom: '6px'
          }}>
            <img 
              src={
                product.storeName.includes('Starcourt') ? 'https://www.netflix.com/favicon.ico' :
                product.storeName.includes('Upside Down') ? 'https://www.netflix.com/favicon.ico' :
                'https://www.facebook.com/favicon.ico'
              }
              alt=""
              style={{ width: '14px', height: '14px', borderRadius: '2px', flexShrink: 0 }}
            />
            <span style={{ 
              fontSize: '12px', 
              color: '#70757a',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {product.storeName}
            </span>
          </div>
        )}
        
        {/* Rating */}
        {showRating && product.rating && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px',
            fontSize: '12px',
            color: '#70757a',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            <span>{product.rating}</span>
            <span style={{ color: '#fbbc04' }}>★★★★★</span>
            {product.reviews && <span>({product.reviews})</span>}
          </div>
        )}
      </div>
    </div>
  );
}

