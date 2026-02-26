import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Waypoint } from "react-waypoint";
import { toggleSticky } from "../store/appSlice";

function StickyHeader(props) {

  // Redux
  const dispatch = useDispatch();
  const sticky = useSelector(state => state.app.sticky);
  const navigationHeight = useSelector(state => state.app.navigationHeight);

  // States
  const [scrollOffset, setScrollOffset] = useState(null);

  const last_scroll_pos = useRef(0);
  const frameID = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll());

    return () => {
      window.cancelAnimationFrame(frameID.current);
      window.removeEventListener('scroll', handleScroll());
    }
  });

  function handleScroll() {

    let ticking = false;
    let last_known_scroll_position = window.scrollY;

    if (!ticking) {
      frameID.current = window.requestAnimationFrame(() => {
        scrollAction(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  }

  function scrollAction(scroll_pos) {

    let scroll = {
      position: scroll_pos,
      delta: scroll_pos - last_scroll_pos.current
    }

    // Determine Scroll Direction
    if ( sticky ){
      if ( scroll.delta > 0 ){
        scrollDown(scroll);
      } else {
        scrollUp(scroll);
      }
    }

    // Set last known scroll position
    last_scroll_pos.current = scroll_pos;

  }

  function scrollDown(scroll) {
    console.log(scroll)
    let offset = ( scrollOffset - scroll.delta );
    let nav_height = navigationHeight;

    if ( offset > nav_height ){
      setScrollOffset(offset)
    }
    else if ( offset <= 0 ){
      setScrollOffset(nav_height);
    }
  }

  function scrollUp(scroll) {
    let offset = ( scrollOffset - ( scroll.delta * 0.3334 ) );
    let nav_height = navigationHeight;

    if ( offset < nav_height ){
      setScrollOffset(offset)
    }
    else if ( offset > nav_height ){
      setScrollOffset(nav_height);
    }
  }

  return (
    <div className="sticky--wrapper" style={{...props.style}}>
      <Waypoint
        topOffset={navigationHeight}
        fireOnRapidScroll={true}
        onLeave={() => {
          dispatch(toggleSticky(true));
        }}
        onEnter={() => {
          dispatch(toggleSticky(false));
        }}
      />
      <div
        className={classNames(
          "sticky--container",
          sticky ? "sticky" : null
        )}
        style={
          sticky ? {
            transform: `translateY(${scrollOffset}px)`,
            left: props.leftOffset ? `${props.leftOffset}px` : "0px"
          } : null
        }
      >
        {props.children}
      </div>
    </div>
  )
}
export default StickyHeader;
