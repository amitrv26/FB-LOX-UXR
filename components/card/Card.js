import classNames from "classnames";

const Card = (props) => {
  return (
    <div className={classNames(
        "card",
        props.type ? `card--${props.type}` : null
      )
    }>
      {props.children}
    </div>
  )
}
export default Card;
