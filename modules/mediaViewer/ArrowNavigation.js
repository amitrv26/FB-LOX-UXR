import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPushView } from "../../store/appSlice";

import CircleButton from "../../components/button/circleButton";

function ArrowNavigation(props) {

  // Redux
  const dispatch = useDispatch();
  const pushView = useSelector(state => state.app.pushView);

  useEffect(() => {
    // Listen for arrow keys
    document.addEventListener("keydown", handleArrowKeys, false);

    return () => {
      document.removeEventListener("keydown", handleArrowKeys, false);
    }
  })

  function handleClickBack() {

    props.direction(-1);

    let pushViewCopy = JSON.parse(JSON.stringify(pushView));
    const imageCount = pushViewCopy.images.length - 1;

    // Check if last image
    if ( pushViewCopy.activeImage === 0  ){
      pushViewCopy.activeImage = imageCount;
    } else {
      pushViewCopy.activeImage = pushViewCopy.activeImage - 1;
    }

    // Set new active image
    dispatch(setPushView(pushViewCopy));
  }

  function handleClickForward() {

    props.direction(1);

    let pushViewCopy = JSON.parse(JSON.stringify(pushView));
    const imageCount = pushViewCopy.images.length - 1;

    // Check if last image
    if ( imageCount === pushViewCopy.activeImage  ){
      pushViewCopy.activeImage = 0;
    } else {
      pushViewCopy.activeImage = pushViewCopy.activeImage + 1;
    }

    // Set new active image
    dispatch(setPushView(pushViewCopy));
  }

  function handleArrowKeys(e) {
    if ( e.keyCode == 37 ){
      handleClickBack();
    }
    if ( e.keyCode == 39 ){
      handleClickForward();
    }
  }

  return (
    <div className="layer--arrows-container">
      <div
        className="arrow-btn arrow-left"
        onClick={()=> {
          handleClickBack();
        }}
      >
        <CircleButton
          type="secondary"
          size="xlarge"
          icon="chevron-left-filled"
          deemph
          performAction={() => {
            handleClickBack();
          }}
        />
        <div className="gradient" />
      </div>

      <div
        className="arrow-btn arrow-right"
        onClick={()=> {
          handleClickForward();
        }}
      >
        <CircleButton
          type="secondary"
          size="xlarge"
          icon="chevron-right-filled"
          deemph
          performAction={() => {
            handleClickForward();
          }}
        />
        <div className="gradient" />
      </div>
    </div>
  )
}
export default ArrowNavigation;
