"use client";

import classNames from "classnames";
import FDSSkittleIcon from "./FDSSkittleIcon";

/**
 * FDSDialogHeader - Standard dialog header component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Header content (usually title text)
 * @param {Function} props.onClose - Callback for close button
 * @param {boolean} props.showCloseButton - Show close button (default: true)
 * @param {string} props.testid - Test ID
 */
export default function FDSDialogHeader({
  children,
  onClose,
  showCloseButton = true,
  testid,
}) {
  return (
    <div className="fds-dialog-header-content" data-testid={testid}>
      {showCloseButton && onClose && (
        <div className="fds-dialog-header-spacer" />
      )}
      <div className="fds-dialog-header-title">{children}</div>
      {showCloseButton && onClose && (
        <FDSSkittleIcon
          icon="cross-filled"
          color="gray"
          size={36}
          onClick={onClose}
          aria-label="Close dialog"
          className="fds-dialog-header-close"
        />
      )}
    </div>
  );
}

