import classNames from "classnames";
import { useSelector } from "react-redux";
import CircleButton from "../../components/button/circleButton";
import Button from "../../components/button/Button";
import AccessoryListCell from "../../components/list/AccessoryListCell";
import CoverPhoto from "../../components/CoverPhoto";
import StickyHeader from "../../components/StickyHeader";
import { IconInline } from "../../components/Icon";

function EntityHeaderProfile() {

  // Redux
  const sticky = useSelector(state => state.app.sticky);

  function smoothScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className="entity-header--profile">

      <CoverPhoto image="/images/user/cover-photo.jpg">
        <div className="cover-button-edit">
          <Button type="secondary" size="medium" content="Edit" icon="camera-filled" />
        </div>
      </CoverPhoto>

      <div className="profile-image">
        <div className="profile">
          <img src="/images/profile-large.jpg" />
        </div>
        <CircleButton type="secondary" size="smedium" icon="camera-filled" />
      </div>

      <div className="profile-info">
        <div className="name-caption">
          <h1>Josephine Williams</h1>
          <p>Lorem ipsum profile bio. <a>Edit</a></p>
        </div>

        <StickyHeader style={{ height: "60px" }}>
          <div className={classNames(
            "tab-actions",
            sticky ? "tab-sticked" : null
          )}>
          <span className="expands">
            <AccessoryListCell
              dp="40"
              image="profile-0"
              type="actor"
              handleClick={() => { smoothScroll() }}
            >
              <h4>Josephine Williams</h4>
            </AccessoryListCell>
          </span>
            <div className="tabs">
              <a className="active">Timeline</a>
              <a>About</a>
              <a>Friends</a>
              <a>Photos</a>
              <a>Videos</a>
              <a className="dropdown">
                <span>More</span>
                <IconInline name="chevron-down-filled" size={16} />
              </a>
            </div>

            <div className="actions">
              <Button content="Edit Profile" type="secondary" size="medium" style="extra-padding" icon="pencil-filled" />
              <Button content="" type="secondary" size="medium" icon="dots-3-horizontal-filled" />
            </div>
          </div>
        </StickyHeader>
      </div>
    </div>
  )
}
export default EntityHeaderProfile;
