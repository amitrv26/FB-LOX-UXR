import ClientLayout from "./ClientLayout";
import "../public/styles/main.scss";
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const metadata = {
  title: "Facebook",
  description: "Facebook web template",
  icons: {
    icon: '/images/favicon.ico',
  },
  // NOTE: themeColor removed to enable Safari liquid glass effect on mobile
  // The theme-color meta tag tells Safari to use a solid color behind the URL bar
  // Without it, Safari can show the page content through the URL bar (liquid glass)
};

// Viewport configuration for Safari liquid glass effect
// Exported separately per Next.js 13+ requirements
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover', // Allow content to extend into safe areas
};

// Force dynamic rendering for now to avoid SSR issues
export const dynamic = "force-dynamic";

// Skip Clerk in development if no keys are configured
const isDev = process.env.NODE_ENV === 'development';
const hasClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  // Preload links for commonly used upsell illustrations
  const preloadLinks = (
    <>
      <link rel="preload" href="/illustrations/reactions.png" as="image" />
      <link rel="preload" href="/illustrations/comments.png" as="image" />
      <link rel="preload" href="/illustrations/follow.png" as="image" />
      <link rel="preload" href="/illustrations/save-mp-items.png" as="image" />
      <link rel="preload" href="/illustrations/messenger.png" as="image" />
      <link rel="preload" href="/illustrations/end-of-feed.png" as="image" />
    </>
  );

  // In development without Clerk keys, render without ClerkProvider
  if (isDev && !hasClerkKeys) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          {preloadLinks}
        </head>
        <body suppressHydrationWarning>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {preloadLinks}
        </head>
        <body suppressHydrationWarning>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
