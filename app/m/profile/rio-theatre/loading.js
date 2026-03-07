"use client";

// Glimmer/Skeleton loading state for Webster Hall profile page
// Matches the actual page layout for a smooth transition

export default function RioTheatreLoading() {
  return (
    <div style={{ 
      background: '#fff', 
      minHeight: '100vh',
      maxWidth: '500px',
      margin: '0 auto',
      paddingBottom: '100px',
    }}>
      {/* Glimmer animation styles */}
      <style jsx>{`
        @keyframes glimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .glimmer {
          background: linear-gradient(90deg, #e4e6eb 25%, #f0f2f5 50%, #e4e6eb 75%);
          background-size: 200% 100%;
          animation: glimmer 1.5s infinite;
        }
      `}</style>

      <main>
        {/* Cover Photo Container */}
        <div style={{ position: 'relative', paddingTop: '0px' }}>
          {/* Cover Photo Skeleton - 180px */}
          <div 
            className="glimmer"
            style={{ 
              height: '180px',
              background: '#e4e6eb',
            }}
          />
          
          {/* White rounded corner background */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24px',
            background: '#fff',
            borderRadius: '16px 16px 0 0',
          }} />
          
          {/* Profile Photo Skeleton - 88px circle */}
          <div 
            className="glimmer"
            style={{
              position: 'absolute',
              bottom: '-44px',
              left: '12px',
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              border: '4px solid #fff',
              background: '#e4e6eb',
              zIndex: 10,
            }}
          />
        </div>

        {/* Profile Info Section */}
        <div style={{ 
          background: '#fff',
          padding: '0 12px',
          position: 'relative',
          zIndex: 5,
        }}>
          {/* Name and Stats Row */}
          <div style={{ 
            display: 'flex',
            gap: '12px',
            marginBottom: '8px',
          }}>
            {/* Spacer for profile photo */}
            <div style={{ width: '88px', flexShrink: 0 }} />
            
            {/* Name and Stats skeleton */}
            <div style={{ marginTop: '-12px', flex: 1 }}>
              {/* Name skeleton */}
              <div 
                className="glimmer"
                style={{ 
                  width: '120px',
                  height: '24px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                }}
              />
              {/* Followers/following skeleton */}
              <div 
                className="glimmer"
                style={{ 
                  width: '160px',
                  height: '16px',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
          
          {/* Description skeleton - 3 lines */}
          <div style={{ marginTop: '16px', marginBottom: '4px' }}>
            <div 
              className="glimmer"
              style={{ 
                width: '100%',
                height: '18px',
                borderRadius: '4px',
                marginBottom: '6px',
              }}
            />
            <div 
              className="glimmer"
              style={{ 
                width: '100%',
                height: '18px',
                borderRadius: '4px',
                marginBottom: '6px',
              }}
            />
            <div 
              className="glimmer"
              style={{ 
                width: '70%',
                height: '18px',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Action Buttons skeleton */}
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            padding: '12px 0',
          }}>
            <div 
              className="glimmer"
              style={{
                flex: 1,
                height: '36px',
                borderRadius: '6px',
              }}
            />
            <div 
              className="glimmer"
              style={{
                flex: 1,
                height: '36px',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>

        {/* Tab Pills skeleton */}
        <div style={{ 
          display: 'flex',
          gap: '8px',
          padding: '4px 12px 12px',
          background: '#fff',
        }}>
          {['All', 'Photos', 'Reels', 'Events'].map((tab, i) => (
            <div
              key={tab}
              className="glimmer"
              style={{
                width: i === 0 ? '40px' : '70px',
                height: '36px',
                borderRadius: '20px',
              }}
            />
          ))}
        </div>

        {/* Details Section skeleton */}
        <div style={{ background: '#fff', padding: '12px' }}>
          {/* Section title */}
          <div 
            className="glimmer"
            style={{ 
              width: '80px',
              height: '22px',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          />
          
          {/* List items - 3 rows */}
          {[1, 2, 3].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div 
                className="glimmer"
                style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                }}
              />
              <div 
                className="glimmer"
                style={{ 
                  flex: 1,
                  height: '20px',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>

        {/* Photos Section skeleton */}
        <div style={{ background: '#fff', marginTop: '8px' }}>
          <div style={{ 
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div 
              className="glimmer"
              style={{ 
                width: '60px',
                height: '22px',
                borderRadius: '4px',
              }}
            />
            <div 
              className="glimmer"
              style={{ 
                width: '50px',
                height: '20px',
                borderRadius: '4px',
              }}
            />
          </div>
          
          {/* 3x3 Photo grid skeleton */}
          <div style={{ padding: '0 12px 12px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '4px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div 
                  key={num}
                  className="glimmer"
                  style={{
                    aspectRatio: '1',
                    width: '100%',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Posts Section Header skeleton */}
        <div style={{ 
          background: '#fff',
          padding: '12px 12px 4px',
          marginTop: '8px',
        }}>
          <div 
            className="glimmer"
            style={{ 
              width: '50px',
              height: '22px',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Post skeleton */}
        <div style={{ background: '#fff', marginTop: '4px' }}>
          {/* Post Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px',
            gap: '12px',
          }}>
            <div 
              className="glimmer"
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
              }}
            />
            <div style={{ flex: 1 }}>
              <div 
                className="glimmer"
                style={{ 
                  width: '100px',
                  height: '18px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                }}
              />
              <div 
                className="glimmer"
                style={{ 
                  width: '60px',
                  height: '14px',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>

          {/* Post Text skeleton */}
          <div style={{ padding: '0 12px 12px' }}>
            <div 
              className="glimmer"
              style={{ 
                width: '100%',
                height: '18px',
                borderRadius: '4px',
                marginBottom: '6px',
              }}
            />
            <div 
              className="glimmer"
              style={{ 
                width: '80%',
                height: '18px',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Post Image skeleton - 16:9 */}
          <div 
            className="glimmer"
            style={{ 
              width: '100%',
              aspectRatio: '16/9',
            }}
          />

          {/* UFI skeleton */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            padding: '0 12px',
            gap: '16px',
          }}>
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="glimmer"
                style={{ 
                  width: '50px',
                  height: '20px',
                  borderRadius: '4px',
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

