"use client";

// Loading state that matches the Safari screen from the app switcher animation
export default function ReelsLoading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img 
        src="https://1000logos.net/wp-content/uploads/2020/08/Safari-Logo.png"
        alt="Safari"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
