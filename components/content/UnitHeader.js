import classNames from "classnames";

function UnitHeader(props) {
  return (
    <div className={classNames(
      "content--unit-header",
      props.align ? props.align : null,
      props.action ? "action" : null,
      props.hairline ? "hairline" : null,
      props.lighten ? "lighten" : null,
      props.compact ? "compact" : null
    )}>
      { props.children ? _renderContent() : null }
    </div>
  )

  function _renderContent() {
    return (
      <div className="unit-container">
        {props.children}
      </div>
    )
  }
}
export default UnitHeader;
