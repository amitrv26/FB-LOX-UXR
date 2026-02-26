"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotifications, setNotification } from "../../store/appSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import classNames from "classnames";
import { fds } from "../../components/vars";

// Build
import UnitHeader from "../../components/content/UnitHeader";
import CircleButton from "../../components/button/circleButton";
import NotificationList from "../../modules/notifications/NotificationList";
import Dropdown from "../../components/list/Dropdown";
import AccessoryListCell from "../../components/list/AccessoryListCell";

// Content & Styles
import notifs from "./manifest";

const notificationVariants = {
  initial: {
    opacity: 0,
    x: 360,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: fds.duration.mediumIn,
      ease: fds.animation.moveIn,
    },
  },
  exit: {
    opacity: 0,
    x: 360,
    transition: {
      duration: fds.duration.mediumOut,
      ease: fds.animation.moveOut,
    },
  },
};

function NotificationsWrapper() {
  const router = useRouter();
  const [compact, setCompact] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [transition, setTransition] = useState(false);
  const [snap, setSnap] = useState(false);

  const timeout = useRef();

  // Redux
  const dispatch = useDispatch();
  const currentNotification = useSelector(state => state.app.currentNotification);
  const tests = useSelector(state => state.app.tests);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setTransition(true);
    }, 1)

    return () => {
      clearTimeout(timeout.current);
    }
  });

  function renderDropdown() {
    return (
      <Dropdown style={{ width: "90%", right: "-10px", top: "48px"}}>
        <AccessoryListCell
          dp="24"
          type="nonactor"
          image="/images/glyphs/checkmark.png"
        >
          <h4>Mark All As Read</h4>
        </AccessoryListCell>
        <AccessoryListCell
          dp="24"
          type="nonactor"
          image="/images/glyphs/settings-outline.png"
        >
          <h4>Notification Settings</h4>
        </AccessoryListCell>
        <AccessoryListCell
          dp="24"
          type="nonactor"
          image="/images/glyphs/desktop-notifications.png"
        >
          <h4>Turn on Desktop Notifications</h4>
        </AccessoryListCell>
      </Dropdown>
    )
  }

  function handleScroll(e) {
    if ( e.currentTarget.scrollTop !== 0 ){
      setCompact(true);
    }
    else if ( e.currentTarget.scrollTop === 0 ){
      setCompact(false);
    }
  }

  function handleChange() {

    // Cache path location
    let path = currentNotification;

    // Update path for next notification click
    dispatch(setNotification(path === "example" ? "example-two" : "example"));

    // Close Notifications
    dispatch(toggleNotifications(false));

    // Push URL
    router.push(`/notifications/${path}`);

  }

  return (
    <motion.div
      className={classNames(
        "notifications--wrapper",
        tests.notifications,
        transition ? "transition" : null,
        currentNotification ? "open-drawer" : null,
        snap ? "snap" : null
      )}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={notificationVariants}
    >
      <div className="notifications--container">
        <div className="tray">
          <UnitHeader compact={compact} action={true}>
            <h2>Notifications</h2>
            <CircleButton
              active={dropdown}
              deemph
              icon="dots-3-horizontal-filled"
              activeIcon="dots-3-horizontal-filled"
              performAction={() => { setDropdown(!dropdown) }}
              size="medium"
              type="secondary"
            />
            { dropdown ? renderDropdown() : null }
          </UnitHeader>

          <div className="overflow" onScroll={(e) => { handleScroll(e) }}>
            <NotificationList notifications={notifs} handleChange={() => { handleChange() } } />
          </div>
        </div>
      </div>
      <div className="cover" onClick={() => { dispatch(toggleNotifications(false)) }} />
    </motion.div>
  )
}
export default NotificationsWrapper;
