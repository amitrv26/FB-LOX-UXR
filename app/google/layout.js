"use client";

// Google SERP layout - matches mobile layout structure
export default function GoogleLayout({ children }) {
  return (
    <div className="mobile-layout">
      <main className="mobile-main">
        {children}
      </main>
    </div>
  );
}
