import PropTypes from "prop-types";
import classNames from "classnames";
import { IconInline } from "../Icon";

function AccessoryListCell(props) {
  return (
    <div
      className={classNames(
        "accessory-list-cell",
        `dp${props.dp}`,
        props.context ? "context" : null,
        props.active ? "active" : null,
        props.unread ? "unread" : null,
        props.deemph ? "deemph" : null,
        props.dropdown ? "dropdown" : null,
        props.chevron ? "chevron" : null
      )}
      onClick={ props.handleClick ? () => { props.handleClick() } : null }
    >
      <div className="left-wrapper">
        { props.badge ? renderBadge() : null }
        { renderType() }
      </div>
      <div className="list-content">
        { props.children }
        { props.dropdown ? <IconInline name="chevron-down-filled" size={16} className="dropdown" /> : null }
        { props.chevron  ? <IconInline name="chevron-right-filled" size={16} className="chevron" /> : null }
      </div>
    </div>
  )

  function renderType() {

    switch (props.type) {
      case "actor":
        return (
          <aside
            className={classNames(
              "actor",
              !props.image ? "use-background" : null,
              props.containedIcon ? "contained-icon" : null
            )}
          >
            <img src={`/images/thumbs/${props.image}.png`} alt="" />
          </aside>
        );
      case "nonactor":
        // Extract icon name if it's from /icons/ folder
        const isIconPath = props.containedIcon && props.image?.includes('/icons/');
        const iconName = isIconPath
          ? props.image.replace('/icons/', '').replace('.svg', '')
          : null;

        return (
          <aside className={classNames(
            "non-actor",
            !props.image ? "use-background" : null,
            props.containedIcon ? "contained-icon" : null,
            props.rounded ? "rounded" : null
          )}>
            {isIconPath ? (
              <IconInline
                name={iconName}
                size={20}
                color="primary"
              />
            ) : (
              <img src={props.image} alt="" />
            )}
          </aside>
        );
      default:
        return null;
    }

  }

  function renderBadge() {
    return (
      <div className={classNames(
        "badge",
        "badge-" + props.badge
      )}>
        <img src={`/images/badge/badge-${props.badge}.png`} alt="" />
      </div>
    )
  }
}

AccessoryListCell.propTypes = {
  active: PropTypes.bool,
  badge: PropTypes.oneOf([
    "friend-add",
    "love",
    "image",
    "comment",
    "like",
    "posts",
    "birthday",
    "marketplace-magnifying-glass",
    "marketplace-megaphone",
    "marketplace-messages"
  ]),
  containedIcon: PropTypes.bool,
  context: PropTypes.bool,
  dp: PropTypes.oneOf(["24", "32", "36", "40", "48", "56", "60"]),
  deemph: PropTypes.bool,
  dropdown: PropTypes.bool,
  chevron: PropTypes.bool,
  image: PropTypes.string,
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(["actor", "nonactor", "inline"])
}

export default AccessoryListCell;
