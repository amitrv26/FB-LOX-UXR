"use client";

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect device shake gesture
 * @param {Function} onShake - Callback function to execute when shake is detected
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Acceleration threshold to trigger shake (default: 15)
 * @param {number} options.timeout - Minimum time between shakes in ms (default: 1000)
 * @param {boolean} options.enabled - Whether shake detection is enabled (default: true)
 */
export default function useShakeDetection(onShake, options = {}) {
  const {
    threshold = 15,
    timeout = 1000,
    enabled = true,
  } = options;

  const lastShake = useRef(0);
  const lastX = useRef(null);
  const lastY = useRef(null);
  const lastZ = useRef(null);

  const handleMotion = useCallback((event) => {
    if (!enabled) return;

    const { accelerationIncludingGravity } = event;
    if (!accelerationIncludingGravity) return;

    const { x, y, z } = accelerationIncludingGravity;

    // Skip if we don't have previous values
    if (lastX.current === null) {
      lastX.current = x;
      lastY.current = y;
      lastZ.current = z;
      return;
    }

    // Calculate the change in acceleration
    const deltaX = Math.abs(x - lastX.current);
    const deltaY = Math.abs(y - lastY.current);
    const deltaZ = Math.abs(z - lastZ.current);

    // Update last values
    lastX.current = x;
    lastY.current = y;
    lastZ.current = z;

    // Check if shake threshold is exceeded
    const totalDelta = deltaX + deltaY + deltaZ;
    
    if (totalDelta > threshold) {
      const now = Date.now();
      
      // Prevent multiple triggers within timeout period
      if (now - lastShake.current > timeout) {
        lastShake.current = now;
        onShake?.();
      }
    }
  }, [enabled, threshold, timeout, onShake]);

  useEffect(() => {
    if (!enabled) return;

    // Check if DeviceMotionEvent is supported
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) {
      console.log('DeviceMotionEvent not supported');
      return;
    }

    // For iOS 13+, we need to request permission
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (error) {
          console.log('DeviceMotionEvent permission denied:', error);
        }
      } else {
        // Non-iOS or older iOS - just add the listener
        window.addEventListener('devicemotion', handleMotion);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [enabled, handleMotion]);

  // Return a function to manually request permission (useful for iOS)
  const requestPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.log('DeviceMotionEvent permission denied:', error);
        return false;
      }
    }
    return true; // Permission not required
  }, []);

  return { requestPermission };
}

