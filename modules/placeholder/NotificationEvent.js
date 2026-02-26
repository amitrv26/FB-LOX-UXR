import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

function NotificationEvent() {

  const [loaded, setLoaded] = useState(false);
  const timeout = useRef();

  useEffect(() => {

    timeout.current = setTimeout(()=> {
      setLoaded(true);
    }, 250);

    return () => {
      clearTimeout(timeout.current)
    }
  });

  return (
    <div className={classNames(
      "placeholder--notification",
      "event",
      loaded ? "loaded" : null
    )}>
      <div className="layout">
        <div className="image" />
        <div className="content">
          <h3>Placeholder Artison Market</h3>
          <p>Join us at the Artisan Market for crafted goods, delicious food and friendly local artisans!</p>
        </div>
      </div>

      <div className="liked">
        <p>Kayla is interested</p>
      </div>
    </div>
  )
}
export default NotificationEvent;
