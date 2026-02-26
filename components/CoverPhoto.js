function CoverPhoto(props) {
  return (
    <div className="cover--wrapper">
      <div className="cover--main">
        <div className="cover--photo">
          {props.children}
          <div className="cover--image-wrapper">
            <img src={props.image} alt="" />
          </div>
        </div>
      </div>

      <div className="cover--bg-wrapper">
        <img src={props.image} alt="" />
      </div>
    </div>
  )
}
export default CoverPhoto;
