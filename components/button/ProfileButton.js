"use client";

import Link from "next/link";

function ProfileButton(props) {
  return (
    <Link href={props.path} className="btn-profile">
      <div className="image">
        <img src="/images/dancircle.png" alt="Profile" />
      </div>
    </Link>
  );
}
export default ProfileButton;
