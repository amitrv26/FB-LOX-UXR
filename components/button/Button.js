import classNames from "classnames";
import PropTypes from "prop-types";
import { IconInline } from "../Icon";

function Button(props) {
  return (
    <button className={classNames(
      "btn",
      props.type,
      props.size,
      props.style,
      props.border ? "bordered" : null,
      props.icon ? "glyph" : null,
      props.deemph ? "deemph" : null,
      props.flip ? "flip" : null,
      !props.content ? "no-content": null,
    )} onClick={() => { props.performAction ? props.performAction() : null }}
    >
      { props.icon ?
        <span className="glyph-icon">
          <IconInline name={props.icon} size={20} />
        </span>
        : null }
      { props.content ? <span className="btn-content">{ props.content }</span> : null }
    </button>
  )
}
Button.propTypes = {
  border: PropTypes.bool,
  content: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
  style: PropTypes.oneOf(["extra-padding", "expanding"]),
  deemph: PropTypes.bool,
  icon: PropTypes.string
}

export default Button;
