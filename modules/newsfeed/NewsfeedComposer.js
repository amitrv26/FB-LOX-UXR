import Card from "../../components/card/Card";
import Icon from "../../components/Icon";

const NewsfeedComposer = (props) => {
  const iconContainerStyle = { width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <Card type="newsfeed-composer">
      <div className="flex">
        <div className="profile-image">
          <img src="/images/thumbs/profile-0.png" />
        </div>

        <div className="field">What's on your mind, Josephine?</div>

        <div className="composer-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={iconContainerStyle}>
            <Icon
              name="camcorder-live-filled"
              size={24}
              color="decorative-icon-red"
              interactive
            />
          </div>

          <div style={iconContainerStyle}>
            <Icon
              name="photo-add-filled"
              size={24}
              color="decorative-icon-green"
              interactive
            />
          </div>

          <div style={iconContainerStyle}>
            <Icon
              name="emoji-filled"
              size={24}
              color="decorative-icon-yellow"
              interactive
            />
          </div>
        </div>
      </div>

    </Card>
  )
}
export default NewsfeedComposer;
