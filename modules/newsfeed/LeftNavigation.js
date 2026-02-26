"use client";

import { useRouter } from "next/navigation";
import UnitHeader from "../../components/content/UnitHeader";
import AccessoryListCell from "../../components/list/AccessoryListCell";
import Button from "../../components/button/Button";

function NewsfeedLeftNavigation() {
  const router = useRouter();
  return (
    <div className="left-navigation deemphasis">
      <div style={{ height: "16px" }} />

      <AccessoryListCell
        dp="36"
        image="profile-0"
        type="actor"
        handleClick={() => {
          router.push("/profile");
        }}
      >
        <h4>Josephine Williams</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/friends.png"
        dp="36" type="nonactor">
        <h4>Friends</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/app-messenger.png"
        dp="36" type="nonactor">
        <h4>Messenger</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/pages.png"
        dp="36" type="nonactor">
        <h4>Pages</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/app-marketplace.png"
        dp="36" type="nonactor">
        <h4>Marketplace</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/saved.png"
        dp="36" type="nonactor">
        <h4>Saved</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/memories.png"
        dp="36" type="nonactor">
        <h4>Memories</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/glyphs/chevron-down.png"
        type="nonactor"
        containedIcon
        rounded
      >
        <h4>See more</h4>
      </AccessoryListCell>

      <UnitHeader lighten hairline>
        <h3>Your shortcuts</h3>
      </UnitHeader>

      <AccessoryListCell
        dp="36"
        image="/images/thumbs/newsfeed-group-1.png"
        type="nonactor"
        rounded
        handleClick={() => {
          router.push("/groups/group");
        }}
      >
        <h4>Undiscovered Eats</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/newsfeed-group-2.png"
        dp="36" type="nonactor">
        <h4>Bay Area Social Club</h4>
      </AccessoryListCell>

      <AccessoryListCell
        image="/images/thumbs/framer.png"
        dp="36" type="nonactor">
        <h4>Framer Group</h4>
      </AccessoryListCell>


      <AccessoryListCell
        image="/images/thumbs/origami.png"
        dp="36" type="nonactor">
        <h4>Origami Community</h4>
      </AccessoryListCell>


      <AccessoryListCell
        image="/images/glyphs/chevron-down.png"
        type="nonactor"
        containedIcon
        rounded
      >
        <h4>See more</h4>
      </AccessoryListCell>

    </div>
  )
}
export default NewsfeedLeftNavigation;
