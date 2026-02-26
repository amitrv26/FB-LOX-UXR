"use client";

import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import NavigationWrapper from "../components/navigation/navigationWrapper";
import NotificationWrapper from "../modules/notifications/NotificationWrapper";
import PushImage from "../modules/pushView/PushImage";
import CommentsDialog from "../modules/commentsDialog/CommentsDialog";
// import MessengerWrapper from "../modules/messenger/MessengerWrapper";

const Frame = (props) => {
  const pathname = usePathname();
  const pushView = useSelector((state) => state.app.pushView);
  const notificationMenu = useSelector((state) => state.app.notificationMenu);

  // Derive page type from pathname
  let pageType = "newsfeed";
  if (pathname.includes("/google")) pageType = "google";
  else if (pathname.includes("/marketplace")) pageType = "marketplace";
  else if (pathname.includes("/reels")) pageType = "watch";
  else if (pathname.includes("/groups")) pageType = "groups";
  else if (pathname.includes("/gaming")) pageType = "gaming";
  else if (pathname.includes("/profile")) pageType = "profile";
  else if (pathname.includes("/messenger")) pageType = "messenger";
  else if (pathname.includes("/notifications")) pageType = "notifications";
  else if (pathname.includes("/pages")) pageType = "pages";

  // Hide navigation for Google SERP page, mobile logged-out routes, desktop logged-out routes, and root (which serves /m/search)
  const hideNavigation = pageType === "google" || pathname.startsWith("/m/") || pathname.startsWith("/d/") || pathname === "/";
  const isLoggedOut = pathname.startsWith("/m/") || pathname.startsWith("/d/") || pathname === "/";

  return (
    <div id="frame" className={`frame ${isLoggedOut ? 'frame--logged-out' : ''}`} data-observe-resizes>
      {!hideNavigation && <NavigationWrapper product={pageType} />}

      <AnimatePresence mode="wait">
        {pushView && pushView.view === "image" && <PushImage key="push-image" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {notificationMenu && <NotificationWrapper key="notifications" />}
      </AnimatePresence>

      {!hideNavigation && <CommentsDialog />}

      {/* props.product !== "shops" ? <MessengerWrapper /> : undefined */}
      <div className={`page--${pageType}`}>{props.children}</div>
    </div>
  );
};
export default Frame;
