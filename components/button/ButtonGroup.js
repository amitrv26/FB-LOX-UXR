import classNames from "classnames";

function ButtonGroup(props) {
  return (
    <div className={classNames(
      "btn-group",
      props.padding ? null : "no-padding",
      props.paddingTop ? "padding-top" : null
    )}>
      {props.children}
    </div>
  )
}
export default ButtonGroup;
