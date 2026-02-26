"use client";

import { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import classNames from "classnames";
import { toggleNotifications, updateNavTabs } from "../../store/appSlice";

import NavigationTab from "./navigationTab";
import CircleButton from "../button/circleButton";
import AccessoryListCell from "../list/AccessoryListCell";
import Search from "../search";
import FDSProfilePhoto from "../FDSProfilePhoto";
import { IconInline } from "../Icon";

import { navManifest, useNavigation } from "./manifests/navigation";

const NavigationWrapper = (props) => {

  // Dispatch notification menu toggle
  const notificationMenu = useSelector(state => state.app.notificationMenu);
  const responsiveView = useSelector(state => state.app.responsiveView);
  const navigationStyle = useSelector(state => state.app.navigationStyle);
  const sticky = useSelector(state => state.app.sticky);
  const stickyPosition = useSelector(state => state.app.stickyPosition);
  const asPath = useSelector(state => state.app.asPath);
  const jewelsVisible = useSelector(state => state.app.jewelsVisible);

  const dispatch = useDispatch();

  // Nav Reducer
  const navReducer = (navState, action) => {
    switch (action.type) {
      case 'clear':
        return navManifest[action.payload]['badge'] = null;
    }
  }

  // Set reducer for nav list
  const [navList, setNavList] = useReducer(navReducer, navManifest);

  // On Initial Load
  useEffect(() => {
    dispatch(updateNavTabs(navList));
  }, [dispatch, navList]);

  // Watching for changes
  useEffect(() => {
    if (props.product === "marketplace" && props.page === "all"){
      setNavList({ type: "clear", payload: "marketplace" });
    }
  });

  const renderNavigation = () => {
    return (
      <div className="tab-bar">
        { useNavigation[responsiveView].map((tab) => {
          return (
            <div className="spacer" key={tab}>
              <NavigationTab
                asPath={asPath}
                product={props.product}
                tab={navManifest[tab]}
              />
            </div>
          );
        }) }
      </div>
    )
  }
  return (
    <div
      className={classNames(
        "navigation-bar",
        navigationStyle ? `nav--${navigationStyle}` : null,
        responsiveView === "desktop" ? "space-out" : null,
        sticky ? "sticky" : null
      )}
      style={
        sticky ? { transform: `translateY(${stickyPosition}px)` } : null
      }
    >
      <div className="logo-search">
        <Link href="/" className="logo">
        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"
            fill="var(--fb-blue)"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
            fill="var(--color-white)"
          />
          </svg>
        </Link>

        { props.product !== 'shops' ? <div className={classNames(props.minSearch ? "minimize-searchbar" : null)}>
          <Search placeholder="Search Facebook" collapsed={props.product !== 'newsfeed'} />
        </div> : undefined }
      </div>

      { props.product !== 'shops' ? renderNavigation() : undefined }

      <div className={classNames({
        "jewels": true,
        "hidden": jewelsVisible,
      })}>
        <CircleButton
          type="secondary"
          size="large"
          icon="grid-9-circle-filled"
          performAction={() => {}}
        />
        <CircleButton
          type="secondary"
          size="large"
          icon="app-messenger-filled"
          performAction={() => {}}
        />
        <CircleButton
          type="secondary"
          size="large"
          icon="notifications-filled"
          activeIcon="notifications-filled"
          active={notificationMenu}
          performAction={() => {
            dispatch(toggleNotifications(!notificationMenu))
          }}
        />
        
        <FDSProfilePhoto
          size={40}
          source="/images/thumbs/profile-0.png"
          alt="Josephine"
          onClick={() => {}}
          aria-label="Account menu"
        >
          <button
            className="profile-photo-menu-button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label="Open account menu"
          >
            <IconInline name="chevron-down-filled" size={12} color="primary" />
          </button>
        </FDSProfilePhoto>

      </div>
    </div>
  )
}

export default NavigationWrapper;
