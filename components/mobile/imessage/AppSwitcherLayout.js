"use client";

/**
 * AppSwitcherLayout Component
 * iOS app switcher animation container with phase-based transitions
 * 
 * Phases:
 * - 0: Initial - Source app full screen
 * - 1: Both apps slide left, source exits left, destination enters center
 * - 2: Destination scales up to full screen
 * 
 * Props:
 * - phase: Current animation phase (0, 1, or 2)
 * - sourceContent: Content for the source app (e.g., iMessage)
 * - destinationContent: Content for the destination app (e.g., Safari loading screen)
 * - destinationLogo: Optional logo to show in destination (default: Safari logo)
 */
export default function AppSwitcherLayout({
  phase,
  sourceContent,
  destinationContent,
  destinationLogo = "https://1000logos.net/wp-content/uploads/2020/08/Safari-Logo.png",
}) {
  // Timing
  const phase1Duration = '650ms';
  const phase2Duration = '400ms';
  const easing = 'cubic-bezier(0.32, 0.72, 0, 1)';
  const cardScale = 0.88;
  const slideAmount = 107;

  // Messages (source) app styles based on phase
  const getSourceStyle = () => {
    const base = {
      position: 'absolute',
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      willChange: 'transform',
    };

    if (phase === 0) {
      return {
        ...base,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '0px',
        transform: 'translateX(0%) scale(1)',
        zIndex: 20,
        boxShadow: 'none',
        transition: 'none',
      };
    } else {
      return {
        ...base,
        top: '20px',
        left: '12px',
        right: '12px',
        bottom: '20px',
        borderRadius: '40px',
        transform: `translateX(-${slideAmount}%) scale(${cardScale})`,
        zIndex: 10,
        boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
        transition: `transform ${phase1Duration} ${easing}, border-radius ${phase1Duration} ${easing}, box-shadow ${phase1Duration} ${easing}`,
      };
    }
  };

  // Safari (destination) app styles based on phase
  const getDestinationStyle = () => {
    const base = {
      position: 'absolute',
      background: '#000',
      overflow: 'hidden',
      willChange: 'transform',
    };

    if (phase === 0) {
      return {
        ...base,
        top: '20px',
        left: '12px',
        right: '12px',
        bottom: '20px',
        borderRadius: '40px',
        transform: `translateX(${slideAmount}%) scale(${cardScale})`,
        zIndex: 15,
        boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
        opacity: 1,
        transition: 'none',
      };
    } else if (phase === 1) {
      return {
        ...base,
        top: '20px',
        left: '12px',
        right: '12px',
        bottom: '20px',
        borderRadius: '40px',
        transform: `translateX(0%) scale(${cardScale})`,
        zIndex: 20,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        opacity: 1,
        transition: `transform ${phase1Duration} ${easing}`,
      };
    } else {
      return {
        ...base,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '0px',
        transform: 'translateX(0%) scale(1)',
        zIndex: 30,
        boxShadow: 'none',
        opacity: 1,
        transition: `transform ${phase2Duration} ${easing}, border-radius ${phase2Duration} ${easing}, top ${phase2Duration} ${easing}, left ${phase2Duration} ${easing}, right ${phase2Duration} ${easing}, bottom ${phase2Duration} ${easing}, box-shadow ${phase2Duration} ${easing}`,
      };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      background: '#1c1c1e',
    }}>
      {/* Destination App (Safari) */}
      <div style={getDestinationStyle()}>
        {destinationContent || (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            position: 'relative',
          }}>
            {/* Main content area - Safari logo */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img 
                src={destinationLogo}
                alt="Safari"
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Source App (Messages) */}
      <div style={getSourceStyle()}>
        {sourceContent}
      </div>
    </div>
  );
}

/**
 * Helper hook for managing app switcher phase transitions
 * Returns phase state and a function to start the transition
 */
export function useAppSwitcherPhase(onNavigate, navigateDelay = 1000) {
  const { useState, useCallback } = require('react');
  const [phase, setPhase] = useState(0);

  const startTransition = useCallback(() => {
    // Phase 1: Both slide left together
    setPhase(1);

    // Phase 2: Destination scales up to full screen
    setTimeout(() => {
      setPhase(2);
    }, 550);

    // Navigate after destination has scaled up
    if (onNavigate) {
      setTimeout(() => {
        onNavigate();
      }, navigateDelay);
    }
  }, [onNavigate, navigateDelay]);

  return { phase, startTransition };
}

