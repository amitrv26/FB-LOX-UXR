"use client";

import classNames from "classnames";

/**
 * FDSDialogPage - Internal page component for FDSDialog
 * Handles the structure with header, scrollable content, and footer
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Dialog content
 * @param {React.ReactNode} props.header - Dialog header component
 * @param {React.ReactNode} props.footer - Dialog footer component
 * @param {boolean} props.disablePageScroll - Disable page scrolling
 * @param {boolean} props.isFullHeightByDefault - Dialog should be full height
 * @param {boolean} props.mobileFullHeight - Full height on mobile
 * @param {boolean} props.isContentInert - Content is inert (non-interactive)
 */
export default function FDSDialogPage({
  children,
  header,
  footer,
  disablePageScroll = false,
  isFullHeightByDefault = false,
  mobileFullHeight = true,
  isContentInert = false,
}) {
  return (
    <div
      className={classNames("fds-dialog-page", {
        "fds-dialog-page--full-height": isFullHeightByDefault,
        "fds-dialog-page--mobile-full-height": mobileFullHeight,
        "fds-dialog-page--inert": isContentInert,
      })}
    >
      {header && <div className="fds-dialog-header">{header}</div>}

      {children != null && (
        <div
          className={classNames("fds-dialog-content", {
            "fds-dialog-content--scrollable": !disablePageScroll,
            "fds-dialog-content--inert": isContentInert,
          })}
        >
          {children}
        </div>
      )}

      {footer && <div className="fds-dialog-footer">{footer}</div>}
    </div>
  );
}

