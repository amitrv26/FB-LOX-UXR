import classNames from "classnames";
import PropTypes from "prop-types";
import { IconInline } from "../Icon";

function CircleButton(props) {
  // Determine which icon to show
  const currentIconName = props.active && props.activeIcon ? props.activeIcon : props.icon;

  // Determine icon size based on button size
  const iconSizeMap = {
    'xlarge': 32,
    'large': 24,
    'medium': 20,
    'smedium': 16,
    'small': 16,
  };
  const iconSize = iconSizeMap[props.size] || 20;

  return (
    <button
      className={classNames(
        "circle-btn",
        props.type,
        props.size,
        props.style,
        props.active ? "active" : null,
        props.deemph ? "deemph" : null,
        props.disabled ? "disabled" : null,
      )}
      disabled={props.disabled ? "disabled" : null}
      onClick={(e) => {
        e.stopPropagation();
        props.performAction ? props.performAction() : null
      }}
    >
      <div className="glyph">
        { currentIconName ?
          <IconInline name={currentIconName} size={iconSize} color={props.iconColor} />
          : undefined }
      </div>
    </button>
  )
}
CircleButton.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "secondary-on-media", "red"]),
  size: PropTypes.oneOf(["xlarge", "large", "medium", "smedium", "small"]),
  icon: PropTypes.string,
  activeIcon: PropTypes.string,
  iconColor: PropTypes.oneOf(["primary", "secondary", "active", "disabled", "placeholder", "meta", "device", "onMedia"])
}

export default CircleButton;
