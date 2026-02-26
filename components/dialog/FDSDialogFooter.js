"use client";

import classNames from "classnames";
import Button from "../button/Button";

/**
 * FDSDialogFooter - Standard dialog footer component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Footer content (usually buttons)
 * @param {string} props.alignment - Button alignment: 'left', 'right', 'center', 'space-between' (default: 'right')
 * @param {string} props.testid - Test ID
 */
export default function FDSDialogFooter({
  children,
  alignment = "right",
  testid,
}) {
  return (
    <div
      className={classNames("fds-dialog-footer-content", {
        [`fds-dialog-footer--${alignment}`]: alignment,
      })}
      data-testid={testid}
    >
      {children}
    </div>
  );
}

