import classNames from "classnames";
import PropTypes from "prop-types";

function PivotLink(props) {
  return (
    <button className={classNames(
      "pivot-link",
      props.style,
      props.glyph ? "glyph" : null,
      props.selected ? "selected" : null,
      props.dropdown ? "dropdown" : null,
      !props.label ? "no-content": null,
    )} onClick={() => { props.performAction ? props.performAction() : null }}
    >
      { props.glyph ? <span className={classNames("glyph-icon", props.glyph)} /> : null }
      { props.label ? <span className="label">{ props.label }</span> : null }
    </button>
  )
}
PivotLink.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  glyph: PropTypes.string,
  selected: PropTypes.bool
}

export default PivotLink;
