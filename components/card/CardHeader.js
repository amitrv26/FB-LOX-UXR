"use client";

import { useRouter } from "next/navigation";
import AccessoryListCell from "../list/AccessoryListCell";
import CircleButton from "../button/circleButton";
import { IconInline } from "../Icon";

const CardHeader = (props) => {
  const router = useRouter();

  const handleProfileClick = () => {
    // Call onProfileClick callback if provided (e.g., to preserve URL state)
    if (props.onProfileClick) {
      props.onProfileClick();
    }
    // Navigate to profile without permalink
    // This ensures back navigation goes to home feed with permalink, not profile with permalink
    router.push("/profile");
  };

  return (
    <div className="card-header">
      <AccessoryListCell
        dp="40"
        image={props.profile}
        type="actor"
        handleClick={handleProfileClick}
      >
        <h4>{props.name}</h4>
        <p className="friends">
          <span>{props.timeago}</span> ·{" "}
          <IconInline
            name="friends-filled"
            size={12}
            className="glyph-friend"
          />
        </p>
      </AccessoryListCell>
      <CircleButton
        style="secondary"
        size="medium"
        icon="dots-3-horizontal-filled"
      />
    </div>
  );
};
export default CardHeader;
