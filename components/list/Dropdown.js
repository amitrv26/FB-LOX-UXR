import { useState, useEffect } from "react";
import classNames from "classnames";

function Dropdown(props) {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1)
  }, [])

  return (
    <div
      className={classNames(
        "list--dropdown",
        open ? "open" : null
      )}
      style={{...props.style}}
    >
      {props.children}
    </div>
  )
}
export default Dropdown;
