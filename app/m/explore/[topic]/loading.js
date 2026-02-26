"use client";

// Glimmer/Skeleton loading state for Explore/Categories page
// Matches GridViewExperience layout: header + 2-column grid of content cards
export default function ExploreLoading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      paddingBottom: '120px',
    }}>
      {/* Page Header Skeleton */}
      <div style={{ padding: '16px 12px 8px' }}>
        {/* Topic title skeleton */}
        <div
          className="glimmer"
          style={{
            width: '280px',
            height: '28px',
            borderRadius: '6px',
            marginBottom: '12px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
          }}
        />
        {/* Social proof chip skeleton */}
        <div
          className="glimmer"
          style={{
            width: '200px',
            height: '32px',
            borderRadius: '16px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
            animationDelay: '0.1s',
          }}
        />
      </div>

      {/* Section Header Skeleton */}
      <div style={{ padding: '16px 12px 8px' }}>
        <div
          className="glimmer"
          style={{
            width: '90%',
            height: '20px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* Grid of content cards - 2 columns matching cfe-post-card--grid (281px height) */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '4px 12px 0 12px',
      }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              background: '#f0f2f5',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '281px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Card header with squircle avatar skeleton */}
            <div style={{ padding: '12px 12px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                className="glimmer"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  flexShrink: 0,
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.3 + i * 0.1}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '100px',
                  height: '13px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.35 + i * 0.1}s`,
                }}
              />
            </div>
            {/* Card text content skeleton - 6 lines to match actual card */}
            <div style={{ padding: '0 12px', flex: 1 }}>
              {[100, 95, 88, 92, 85, 70].map((width, lineIndex) => (
                <div
                  key={lineIndex}
                  className="glimmer"
                  style={{
                    width: `${width}%`,
                    height: '14px',
                    borderRadius: '4px',
                    marginBottom: '6px',
                    background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.4 + i * 0.1 + lineIndex * 0.05}s`,
                  }}
                />
              ))}
            </div>
            {/* Card footer with likes/comments skeleton */}
            <div style={{ padding: '8px 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div
                  className="glimmer"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.7 + i * 0.1}s`,
                  }}
                />
                <div
                  className="glimmer"
                  style={{
                    width: '28px',
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.75 + i * 0.1}s`,
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div
                  className="glimmer"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.8 + i * 0.1}s`,
                  }}
                />
                <div
                  className="glimmer"
                  style={{
                    width: '20px',
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.85 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Section Header Skeleton */}
      <div style={{ padding: '24px 12px 8px' }}>
        <div
          className="glimmer"
          style={{
            width: '85%',
            height: '20px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
            animationDelay: '0.8s',
          }}
        />
      </div>

      {/* Second grid of content cards - with media variant (281px height) */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '4px 12px 0 12px',
      }}>
        {Array.from({ length: 2 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              background: '#f0f2f5',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '281px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Card media area with author overlay skeleton */}
            <div style={{ position: 'relative', height: '160px', flexShrink: 0 }}>
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${0.9 + i * 0.1}s`,
                }}
              />
              {/* Author overlay skeleton */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  className="glimmer"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, rgba(200,200,200,0.5) 25%, rgba(220,220,220,0.5) 50%, rgba(200,200,200,0.5) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${0.95 + i * 0.1}s`,
                  }}
                />
                <div
                  className="glimmer"
                  style={{
                    width: '80px',
                    height: '13px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, rgba(200,200,200,0.5) 25%, rgba(220,220,220,0.5) 50%, rgba(200,200,200,0.5) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${1.0 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
            {/* Card content skeleton */}
            <div style={{ padding: '8px 12px 11px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '14px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${1.05 + i * 0.1}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '85%',
                  height: '14px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${1.1 + i * 0.1}s`,
                }}
              />
              <div style={{ flex: 1 }} />
              {/* Footer with likes/comments skeleton */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div
                    className="glimmer"
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'glimmer 1.5s infinite',
                      animationDelay: `${1.15 + i * 0.1}s`,
                    }}
                  />
                  <div
                    className="glimmer"
                    style={{
                      width: '28px',
                      height: '12px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'glimmer 1.5s infinite',
                      animationDelay: `${1.2 + i * 0.1}s`,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div
                    className="glimmer"
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'glimmer 1.5s infinite',
                      animationDelay: `${1.25 + i * 0.1}s`,
                    }}
                  />
                  <div
                    className="glimmer"
                    style={{
                      width: '20px',
                      height: '12px',
                      borderRadius: '4px',
                      background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'glimmer 1.5s infinite',
                      animationDelay: `${1.3 + i * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Marketplace Section Header Skeleton */}
      <div style={{ padding: '24px 12px 8px' }}>
        <div
          className="glimmer"
          style={{
            width: '75%',
            height: '20px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
            animationDelay: '1.3s',
          }}
        />
      </div>

      {/* Marketplace grid - 2x2 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '8px 12px',
      }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i} 
            style={{ 
              background: '#f0f2f5',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* Marketplace card image skeleton */}
            <div
              className="glimmer"
              style={{
                width: '100%',
                paddingTop: '75%',
                background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${1.4 + i * 0.1}s`,
              }}
            />
            <div style={{ padding: '8px 12px 12px' }}>
              <div
                className="glimmer"
                style={{
                  width: '90%',
                  height: '14px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${1.5 + i * 0.1}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '50px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${1.6 + i * 0.1}s`,
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

