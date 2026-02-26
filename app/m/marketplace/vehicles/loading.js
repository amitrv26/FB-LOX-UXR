"use client";

// Glimmer/Skeleton loading state for Marketplace tab
// Shows product grid without filter bar (matches tab bar navigation)
export default function MarketplaceLoading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      paddingBottom: '120px',
    }}>
      {/* Skeleton grid for listings - 2 column grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2px',
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Image skeleton - square aspect ratio */}
            <div
              className="glimmer"
              style={{
                width: '100%',
                paddingTop: '100%',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
            {/* Text skeleton */}
            <div style={{ padding: '8px 12px 12px' }}>
              {/* Price */}
              <div
                className="glimmer"
                style={{
                  width: '60px',
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              {/* Title */}
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '13px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              {/* Location */}
              <div
                className="glimmer"
                style={{
                  width: '80%',
                  height: '12px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* "Others searched for" skeleton */}
      <div style={{ padding: '16px 12px 12px', borderTop: '1px solid #e4e6eb', marginTop: '8px' }}>
        <div
          className="glimmer"
          style={{
            width: '140px',
            height: '17px',
            borderRadius: '4px',
            marginBottom: '12px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
          }}
        />
        {/* Pill chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[120, 100, 140, 90, 110, 130].map((width, i) => (
            <div
              key={i}
              className="glimmer"
              style={{
                width: `${width}px`,
                height: '32px',
                borderRadius: '16px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${0.6 + i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* More listings skeleton */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2px',
        marginTop: '12px',
      }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`more-${i}`} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Image skeleton */}
            <div
              className="glimmer"
              style={{
                width: '100%',
                paddingTop: '100%',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${0.8 + i * 0.1}s`,
              }}
            />
            {/* Text skeleton */}
            <div style={{ padding: '8px 12px 12px' }}>
              <div
                className="glimmer"
                style={{
                  width: '60px',
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.8 + i * 0.1}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '13px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.8 + i * 0.1}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '80%',
                  height: '12px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.8 + i * 0.1}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes glimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
