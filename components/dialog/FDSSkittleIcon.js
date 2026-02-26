"use client";

import classNames from "classnames";
import { IconInline } from "../Icon";
import * as stylex from "@stylexjs/stylex";

/**
 * FDSSkittleIcon - A circular button with an icon inside
 * Based on Facebook Design System SkittleIcon component
 * 
 * @param {Object} props
 * @param {string} props.color - Background color: 'gray', 'blue', 'white', 'red', etc.
 * @param {boolean} props.disabled - Whether the icon is disabled
 * @param {string} props.icon - Icon name
 * @param {string} props.iconBadge - Optional badge icon name
 * @param {string} props.shape - Shape: 'circle', 'roundedRect', 'square' (default: 'circle')
 * @param {number} props.size - Size: 32, 36, 40, 48, 56, 60
 * @param {Function} props.onClick - Click handler
 * @param {string} props['aria-label'] - Accessibility label
 * @param {string} props.className - Additional CSS classes
 */
export default function FDSSkittleIcon({
  color = "gray",
  disabled = false,
  icon,
  iconBadge,
  shape = "circle",
  size = 40,
  onClick,
  "aria-label": ariaLabel,
  className,
  ...props
}) {
  // Map sizes to icon sizes
  const iconSizeMap = {
    32: 16,
    36: 20,
    40: 24,
    48: 24,
    56: 24,
    60: 24,
  };

  // Map colors to icon colors
  const getIconColor = (bgColor) => {
    switch (bgColor) {
      case "gray":
      case "white":
        return "primary";
      case "lightblue":
        return "highlight";
      default:
        return "white";
    }
  };

  const iconSize = iconSizeMap[size] || 24;
  const iconColor = disabled ? "disabled" : getIconColor(color);

  const isDecorative = !ariaLabel;

  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={classNames("fds-skittle-icon", className, {
        [`fds-skittle-icon--${color}`]: color,
        [`fds-skittle-icon--${shape}`]: shape,
        [`fds-skittle-icon--size-${size}`]: size,
        "fds-skittle-icon--disabled": disabled,
        "fds-skittle-icon--clickable": onClick,
      })}
      onClick={onClick}
      disabled={disabled}
      aria-label={isDecorative ? undefined : ariaLabel}
      aria-hidden={isDecorative}
      {...props}
    >
      <div className="fds-skittle-icon-glyph">
        <IconInline name={icon} size={iconSize} color={iconColor} />
      </div>
      {iconBadge && (
        <div className="fds-skittle-icon-badge">
          <IconInline name={iconBadge} size={8} color="white" />
        </div>
      )}
    </Component>
  );
}

