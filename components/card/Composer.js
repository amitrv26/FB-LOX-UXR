import AccessoryListCell from "../list/AccessoryListCell";

function Composer() {
  return (
    <div className="card--composer">
      <AccessoryListCell
        dp="32"
        image="profile-0"
        type="actor"
      >
        <div className="composer-container">
          <div className="input">
            Write a comment...
          </div>
        </div>
      </AccessoryListCell>
    </div>
  )
}
export default Composer;
