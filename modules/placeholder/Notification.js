import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import AccessoryListCell from "../../components/list/AccessoryListCell";

function Notification() {

  const [loaded, setLoaded] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setLoaded(true);
    }, 250);

    return () => {
      clearTimeout(timeout);
    }
  });

  return (
    <div className={classNames(
      "placeholder--notification",
      loaded ? "loaded" : null
    )}>
      <AccessoryListCell
        context
        dp="40"
        image="profile-7"
        type="actor"
      >
        <h4><b>Mark Malta</b> added a photo.</h4>
        <p>August 8 at 12:20 PM</p>
      </AccessoryListCell>
      <div className="image" />
      <div className="liked">
        <span><img src="/images/badge/badge-like.png" /></span>
        <p>Brooke Wilds</p>
      </div>
      <div className="actions" />
      <div className="comment">
        <aside />
        <figure />
      </div>
    </div>
  )
}
export default Notification;
