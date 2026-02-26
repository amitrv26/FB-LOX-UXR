"use client";

// Glimmer/Skeleton loading state for Profile post permalink page
// Matches the groups permalink loading structure
export default function ProfilePostLoading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      paddingBottom: '120px',
    }}>
      {/* Profile header skeleton - single circle avatar */}
      <div style={{ padding: '12px', borderBottom: '1px solid #e4e6eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            className="glimmer"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
              backgroundSize: '200% 100%',
              animation: 'glimmer 1.5s infinite',
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              className="glimmer"
              style={{
                width: '120px',
                height: '17px',
                borderRadius: '4px',
                marginBottom: '6px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
              }}
            />
            <div
              className="glimmer"
              style={{
                width: '80px',
                height: '13px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Post content skeleton */}
      <div style={{ padding: '16px' }}>
        {/* Post body lines */}
        {[100, 95, 88, 92, 70].map((width, i) => (
          <div
            key={i}
            className="glimmer"
            style={{
              width: `${width}%`,
              height: '16px',
              borderRadius: '4px',
              marginBottom: '8px',
              background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
              backgroundSize: '200% 100%',
              animation: 'glimmer 1.5s infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Post image skeleton */}
      <div
        className="glimmer"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
          backgroundSize: '200% 100%',
          animation: 'glimmer 1.5s infinite',
          animationDelay: '0.5s',
        }}
      />

      {/* UFI skeleton */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        padding: '0 16px',
        gap: '24px',
      }}>
        {[60, 45, 50].map((width, i) => (
          <div 
            key={i}
            className="glimmer"
            style={{ 
              width: `${width}px`,
              height: '20px',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
              backgroundSize: '200% 100%',
              animation: 'glimmer 1.5s infinite',
              animationDelay: `${0.6 + i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Comments section skeleton */}
      <div style={{ padding: '16px', borderTop: '8px solid #f0f2f5' }}>
        <div
          className="glimmer"
          style={{
            width: '100px',
            height: '15px',
            borderRadius: '4px',
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
            backgroundSize: '200% 100%',
            animation: 'glimmer 1.5s infinite',
          }}
        />

        {/* Comment skeletons */}
        {[1, 2, 3].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div
              className="glimmer"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                backgroundSize: '200% 100%',
                animation: 'glimmer 1.5s infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="glimmer"
                style={{
                  width: '100px',
                  height: '14px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
              <div
                className="glimmer"
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'glimmer 1.5s infinite',
                  animationDelay: `${i * 0.15}s`,
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

