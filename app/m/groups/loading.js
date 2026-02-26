"use client";

// Glimmer/Skeleton loading state for Groups tab feed
// Matches the groups feed layout with group posts and featured comments
export default function GroupsTabLoading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      paddingBottom: '120px',
    }}>
      {/* Group post skeletons */}
      {[0, 1, 2, 3].map((postIndex) => (
        <div 
          key={postIndex} 
          style={{ 
            borderBottom: postIndex < 3 ? '1px solid #e4e6eb' : 'none',
            paddingBottom: '12px',
          }}
        >
          {/* Group header - rounded square avatar */}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="glimmer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                flexShrink: 0,
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2}s`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="glimmer"
                style={{
                  width: '140px',
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '90px',
                  height: '13px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2}s`,
                }}
              />
            </div>
            {/* Join button skeleton */}
            <div
              className="glimmer"
              style={{
                width: '56px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2}s`,
              }}
            />
          </div>

          {/* Post author */}
          <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className="glimmer"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2 + 0.05}s`,
              }}
            />
            <div
              className="glimmer"
              style={{
                width: '100px',
                height: '13px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2 + 0.05}s`,
              }}
            />
          </div>

          {/* Post title */}
          <div style={{ padding: '0 16px 8px' }}>
            <div
              className="glimmer"
              style={{
                width: '100%',
                height: '20px',
                borderRadius: '4px',
                marginBottom: '6px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2 + 0.1}s`,
              }}
            />
            <div
              className="glimmer"
              style={{
                width: '70%',
                height: '20px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2 + 0.1}s`,
              }}
            />
          </div>

          {/* Post body lines */}
          <div style={{ padding: '0 16px 12px' }}>
            {[95, 88, 60].map((width, lineIndex) => (
              <div
                key={lineIndex}
                className="glimmer"
                style={{
                  width: `${width}%`,
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2 + 0.15 + lineIndex * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* UFI skeleton */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            height: '44px',
            padding: '0 16px',
            gap: '20px',
          }}>
            {[55, 40, 45].map((width, i) => (
              <div 
                key={i}
                className="glimmer"
                style={{ 
                  width: `${width}px`,
                  height: '18px',
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2 + 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Featured comment skeleton - matches MobileComment layout */}
          <div style={{ padding: '8px 16px 12px', display: 'flex', gap: '10px' }}>
            {/* Comment avatar */}
            <div
              className="glimmer"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${postIndex * 0.2 + 0.35}s`,
              }}
            />
            <div style={{ flex: 1 }}>
              {/* Author name + time row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div
                  className="glimmer"
                  style={{
                    width: '80px',
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${postIndex * 0.2 + 0.35}s`,
                  }}
                />
                <div
                  className="glimmer"
                  style={{
                    width: '24px',
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${postIndex * 0.2 + 0.35}s`,
                  }}
                />
              </div>
              {/* Comment text lines */}
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2 + 0.4}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '85%',
                  height: '15px',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${postIndex * 0.2 + 0.4}s`,
                }}
              />
              {/* Action bar - Reply button + reactions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  className="glimmer"
                  style={{
                    width: '40px',
                    height: '14px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${postIndex * 0.2 + 0.45}s`,
                  }}
                />
                <div
                  className="glimmer"
                  style={{
                    width: '50px',
                    height: '14px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'glimmer 1.5s infinite',
                    animationDelay: `${postIndex * 0.2 + 0.45}s`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

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

