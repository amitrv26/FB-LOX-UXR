import { useState, useEffect, useRef } from "react";
import UnitHeader from "../../components/content/UnitHeader";
import AccessoryListCell from "../../components/list/AccessoryListCell";
import ButtonGroup from "../../components/button/ButtonGroup";
import Button from "../../components/button/Button";

function NotificationsList(props) {

  const [active, setActive] = useState(-1);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notifications, setNotifications] = useState(props.notifications);

  const timeout = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    }
  })

  function createMarkup(copy) { return {__html: copy } }
  function handleActive(i, cat) {

    // Cache Data
    let notifState = notifications;

    // Mark as Read
    notifState[cat][i]["deemph"] = true;
    notifState[cat][i]["read"] = true;

    setActive(i);
    setActiveGroup(cat);
    setNotifications(notifState);

    // Push to notification open
    props.handleChange();
  }

  function renderFriendRequests() {
    const requests = notifications.friendRequests.map((request, i) => {
      return (
        <AccessoryListCell
          badge="friend-add"
          dp="60"
          image={request.profile}
          key={i}
          type="actor"
        >
          <h4>{request.name}</h4>
          <p>{request.mutual} mutual friends</p>
          <ButtonGroup paddingTop="8">
            <Button type="primary" size="medium" style="expanding" content="Confirm" />
            <Button type="secondary" size="medium" style="expanding" content="Delete" />
          </ButtonGroup>
        </AccessoryListCell>
      )
    });

    return requests;
  }

  return (
    <>
      <UnitHeader lighten={true}>
        <h3>New</h3>
      </UnitHeader>

      <div style={{ height: "8px" }} />

      { notifications.friendRequests.length ? renderFriendRequests() : null }
      { notifications.new.map((notif, i) => {
        const isActive = i === active && activeGroup == "new";

        return (
          <AccessoryListCell
            active={ isActive }
            badge={notif.type}
            context={true}
            dp="60"
            deemph={notif.deemph}
            handleClick={() => { handleActive(i, "new", notif) }}
            image={notif.profile}
            key={i}
            type="actor"
            unread={!notif.read}
          >
            <h4 dangerouslySetInnerHTML={createMarkup(notif.heading)} />
            <p>{notif.body}</p>
          </AccessoryListCell>
        )
      })}

      <UnitHeader lighten={true}>
        <h3>Earlier</h3>
      </UnitHeader>

      <div style={{ height: "8px" }} />

      { notifications.earlier.map((notif, i) => {

        const isActive = i === active && activeGroup == "earlier";

        return (
          <AccessoryListCell
            active={isActive}
            badge={notif.type}
            context
            deemph
            dp="60"
            handleClick={() => { handleActive(i, "earlier", notif) }}
            image={notif.profile}
            key={i}
            type="actor"
          >
            <h4 dangerouslySetInnerHTML={createMarkup(notif.heading)} />
            <p>{notif.body}</p>
          </AccessoryListCell>
        )
      }) }
    </>
  )

}
export default NotificationsList;
