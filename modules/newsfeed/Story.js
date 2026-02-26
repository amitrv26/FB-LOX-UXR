import { IconInline } from "../../components/Icon";

const Story = (props) => {
  return (
    <div className={`story ${props.addButton ? 'story--create' : ''}`}>
      { props.addButton ? (
        <>
          <div className="story-create-content">
            <div className="story-profile-image">
              <img src={`/images/thumbs/${props.profileImage || 'profile-1.png'}`} />
            </div>
            <div className="story-create-button">
              <IconInline name="plus-filled" size={20} color="onMedia" />
            </div>
            <div className="story-create-text">{props.copy}</div>
          </div>
        </>
      ) : (
        <>
          <div className="story-profile-ring">
            <div className="story-profile-avatar">
              <img src={`/images/thumbs/${props.profileImage || 'profile-1.png'}`} />
            </div>
          </div>
          <div className="story-image-wrapper">
            <img src={`/images/user/${props.image}`} />
          </div>
          <div className="story-username">{props.copy}</div>
        </>
      )}
    </div>
  )
}
export default Story;
