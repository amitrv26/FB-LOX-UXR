import { useState, useEffect } from "react";
import classNames from "classnames";
import CircleButton from "../../components/button/circleButton";

function NotificationHeader(props) {

  const timeout = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setLoaded(true);
    }, 250)

    return () => {
      clearTimeout(timeout.current);
    }
  })

  useEffect(() => {
    setLoaded(false);
    timeout.current = setTimeout(() => {
      setLoaded(true);
    }, 250)
  }, [props.currentNotification])

  return (
    <div className={classNames(
      "placeholder--notification-header",
      loaded ? "loaded" : null,
      props.compact ? "compact" : null
    )}>
      <div className="info">
        <div className="thumb">
          <img src="/images/thumbs/newsfeed-group-1.png" />
        </div>
        <h2 className="light">Undiscovered Eats</h2>
        <div className="triangle">
          <img className="triangle" src="/images/glyphs/triangle-right.png" />
        </div>
        <h2>Aiden's Post</h2>
      </div>
      <div className="actions">
        <CircleButton
          type="secondary"
          size="medium"
          icon="search"
        />
        <CircleButton
          type="secondary"
          size="medium"
          icon="resize-up"
        />
      </div>
    </div>
  )
}
export default NotificationHeader;
