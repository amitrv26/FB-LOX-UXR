"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { fds } from "../vars";
import FDSDialogPage from "./FDSDialogPage";

/**
 * FDSDialog - A dialog component based on Facebook Design System Dialog
 * 
 * @param {Object} props
 * @param {Function} props.onClose - Callback when dialog should close
 * @param {boolean} props.disableClosingWithMask - If true, clicking overlay won't close dialog
 * @param {string} props.size - Dialog size: 'small', 'medium', 'large', 'full'
 * @param {string} props['aria-label'] - Accessibility label
 * @param {React.ReactNode} props.children - Dialog content (will be wrapped in FDSDialogPage)
 * @param {React.ReactNode} props.header - Dialog header component
 * @param {React.ReactNode} props.footer - Dialog footer component
 * @param {boolean} props.disablePageScroll - Disable page scrolling
 * @param {boolean} props.isFullHeightByDefault - Dialog should be full height
 * @param {boolean} props.mobileFullHeight - Full height on mobile
 * @param {string} props.testid - Test ID for testing
 */
export default function FDSDialog({
  onClose,
  disableClosingWithMask = false,
  size = "medium",
  "aria-label": ariaLabel,
  children,
  header,
  footer,
  disablePageScroll = false,
  isFullHeightByDefault = false,
  mobileFullHeight = true,
  testid,
  onAnimationComplete,
  ...pageProps
}) {
  const dialogRef = useRef(null);

  // Handle ESC key to close dialog
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.keyCode === 27 && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey, false);
    // Prevent body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey, false);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Handle overlay click
  const handleOverlayClick = () => {
    if (!disableClosingWithMask && onClose) {
      onClose();
    }
  };

  // Animation variants
  const overlayVariants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: fds.duration.extraShortIn,
        ease: fds.animation.fadeIn,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: fds.duration.extraExtraShortOut,
        ease: fds.animation.fadeOut,
      },
    },
  };

  const dialogVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: fds.duration.shortIn,
        ease: fds.animation.enterExitIn,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: fds.duration.shortOut,
        ease: fds.animation.enterExitOut,
      },
    },
  };

  return (
    <div className="fds-dialog-wrapper">
      <motion.div
        className="fds-dialog-overlay"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={overlayVariants}
        onClick={handleOverlayClick}
      />

      <motion.div
        ref={dialogRef}
        className={classNames("fds-dialog-container", `fds-dialog--${size}`)}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={dialogVariants}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        data-testid={testid}
        onClick={(e) => e.stopPropagation()}
        onAnimationComplete={(definition) => {
          if (definition === "exit" && onAnimationComplete) {
            onAnimationComplete();
          }
        }}
      >
        <FDSDialogPage
          header={header}
          footer={footer}
          disablePageScroll={disablePageScroll}
          isFullHeightByDefault={isFullHeightByDefault}
          mobileFullHeight={mobileFullHeight}
          {...pageProps}
        >
          {children}
        </FDSDialogPage>
      </motion.div>
    </div>
  );
}

