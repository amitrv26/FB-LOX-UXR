import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { setPushView, setNavStyle } from "../store/appSlice";

function ImagePushLink(props) {

  // States
  const [active, setActive] = useState(false);

  // Refs
  const imgRef = useRef();
  const imageMap = useRef([]);
  const imageBounds = useRef();
  const imagesLoaded = useRef();

  // Redux
  const dispatch = useDispatch();
  const pushView = useSelector(state => state.app.pushView);

  useEffect(() => {
    if (pushView.view !== "image"){
      imageMap.current = [];
      setActive(false);
      imagesLoaded.current = 0;
    }
  }, [pushView.view]);

  function handleClick(e) {

    // Set Active State
    setActive(true);

    // Set clicked bounds
    imageBounds.current = e.currentTarget.getBoundingClientRect();

    // Loop over images
    props.images.map((img, i) => {

      let imageObj = {}

      // Immediately populate array
      imageObj.source = img;
      imageMap.current.push(imageObj);

      // Load image sizes
      let image = new Image();

      // On image load
      image.onload = () => {

        // Add image dimensions to array
        imageMap.current[i]["height"] = image.naturalHeight;
        imageMap.current[i]["width"]  = image.naturalWidth;

        // Count loaded images
        imagesLoaded.current = imagesLoaded.current + 1;

        // If looped over all images in gallery
        if ( props.images.length === imagesLoaded.current ){

          dispatch(setPushView({
            activeImage: props.activeImage,
            bounds: imageBounds.current,
            images: imageMap.current,
            info: props.info,
            padding: props.padding,
            scrolled: window.scrollY,
            style: props.style,
            view: "image"
          }));

          // Update Navigation
          dispatch(setNavStyle(props.navigation));
        }
      }

      // Image Source
      image.src = `/images/user/${img}`;
    })
  }

  return (
    <div
      className={classNames(
        "image-container",
        active ? "active" : null
      )}
      onClick={(e) => { handleClick(e) }}
    >
      <img
        ref={ imgRef }
        src={`/images/user/${props.images[props.activeImage]}`}
        alt=""
      />
    </div>
  )
}
export default ImagePushLink;
