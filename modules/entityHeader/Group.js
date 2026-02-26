import { useSelector } from "react-redux";
import classNames from "classnames";
import Button from "../../components/button/Button";
import AccessoryListCell from "../../components/list/AccessoryListCell";
import CoverPhoto from "../../components/CoverPhoto";
import StickyHeader from "../../components/StickyHeader";

function EntityHeaderGroup() {

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
    <div className="entity-header--group">

      <CoverPhoto
        image="/images/groups/cover-framer.jpg"
      />

      <div className="profile-info">
        <div className="description">
          <div className="left">
            <h1>Framer</h1>
            <p>
              <img src="/images/groups/glyph-globe-americas.png" />
              <span>Public group · 25.5K members</span>
            </p>
          </div>

          <div className="right">
            <div className="face-pile">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <Button
              content="Invite"
              type="primary"
              size="large"
              icon="plus-filled"
            />
          </div>
        </div>

        <StickyHeader style={{ height: "60px" }} leftOffset={180}>
          <div className={classNames(
            "tab-actions",
            sticky ? "tab-sticked" : null
          )}>
          <span className="expands">
            <AccessoryListCell
              dp="40"
              image="/images/thumbs/framer.png"
              type="nonactor"
              handleClick={() => { smoothScroll() }}
              rounded
            >
              <h4>Framer</h4>
            </AccessoryListCell>
          </span>
            <div className="tabs">
              <a className="active">About</a>
              <a>Discussion</a>
              <a>Announcements</a>
              <a>Members</a>
            </div>

            <div className="actions">
              <Button content="" type="secondary" size="medium" icon="magnifying-glass-filled" />
              <Button content="" type="secondary" size="medium" icon="dots-3-horizontal-filled" />
            </div>
          </div>
        </StickyHeader>
      </div>
    </div>
  )
}
export default EntityHeaderGroup;
