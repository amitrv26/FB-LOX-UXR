"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { closeCommentsDialog, setCommentsDialog } from "../../store/appSlice";
import { fds } from "../../components/vars";
import { FDSDialog, FDSDialogHeader, FDSDialogFooter } from "../../components/dialog";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import Reactions from "../../components/card/Reactions";
import BlingString from "../../components/card/BlingString";
import ImagePushLink from "../../components/ImagePushLink";
import classNames from "classnames";

export default function CommentsDialog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const commentsDialog = useSelector((state) => state.app.commentsDialog);
  const permalinkParam = searchParams.get('permalink');
  const [isClosing, setIsClosing] = useState(false);

  // Restore dialog from URL on mount or when permalink param changes
  useEffect(() => {
    if (permalinkParam) {
      // Check if we need to restore dialog state
      if (!commentsDialog || commentsDialog.postId !== permalinkParam) {
        // Get post data from window map (stored when dialog was opened)
        if (typeof window !== 'undefined' && window.__postDataMap) {
          const postData = window.__postDataMap.get(permalinkParam);
          if (postData) {
            dispatch(setCommentsDialog(postData));
            setIsClosing(false);
          }
        }
      }
    } else if (!permalinkParam && commentsDialog && !isClosing) {
      // URL doesn't have permalink but dialog is open - close it
      // This happens when navigating to profile without permalink
      dispatch(closeCommentsDialog());
    }
  }, [permalinkParam, commentsDialog, dispatch, pathname, isClosing]);

  // Don't auto-close when navigating to profile - let URL handle it
  // The dialog will be hidden visually but state preserved for back nav

  if (!commentsDialog) return null;

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationComplete = () => {
    // Animation completed, now update state and URL
    dispatch(closeCommentsDialog());
    // Remove permalink from URL but stay on current page
    const params = new URLSearchParams(searchParams.toString());
    params.delete('permalink');
    const currentPath = pathname || '/';
    const newUrl = params.toString() ? `${currentPath}?${params.toString()}` : currentPath;
    router.push(newUrl, { scroll: false });
    setIsClosing(false);
  };

  const handleProfileClick = () => {
    // Profile navigation is handled by CardHeader
    // It navigates to /profile without permalink, which will close the dialog
    // Back navigation will go back to /?permalink=... where dialog will reopen
  };

  const handleCommentsClick = () => {
    // Prevent opening another dialog when clicking comments in the dialog
  };

  // Only show dialog on home feed or profile page (when permalink exists)
  // Keep showing during close animation to prevent flash
  const shouldShowDialog = commentsDialog && !isClosing && (pathname === "/" || (pathname === "/profile" && permalinkParam));

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {shouldShowDialog && (
        <FDSDialog
          key={commentsDialog.postId || 'dialog'}
          onClose={handleClose}
          size="large"
          aria-label={`${commentsDialog.info.name}'s Post`}
          header={
            <FDSDialogHeader onClose={handleClose}>
              {commentsDialog.info.name}'s Post
            </FDSDialogHeader>
          }
          footer={null}
          disablePageScroll={false}
        >
          <div className="comments-dialog-content">
            <Card type={commentsDialog.type === 'gallery' ? 'gallery' : 'image'}>
              <CardHeader
                profile={commentsDialog.info.image}
                name={commentsDialog.info.name}
                timeago={commentsDialog.info.time}
                onProfileClick={handleProfileClick}
              />

              <div className="card-content">
                <p>{commentsDialog.info.text}</p>
              </div>

              {commentsDialog.type === 'gallery' ? (
                <div className={classNames(
                  "gallery-wrapper",
                  commentsDialog.images ? `img-count-${commentsDialog.images.length}` : null
                )}>
                  {commentsDialog.images.map((img, i) => {
                    return (
                      <ImagePushLink
                        activeImage={i}
                        images={commentsDialog.images}
                        info={commentsDialog.info}
                        key={i}
                        navigation={commentsDialog.navigation}
                        padding={commentsDialog.padding}
                        style={commentsDialog.style}
                      />
                    );
                  })}
                </div>
              ) : (
                <ImagePushLink
                  activeImage={0}
                  images={commentsDialog.images}
                  info={commentsDialog.info}
                  navigation={commentsDialog.navigation}
                  padding={commentsDialog.padding}
                  style={commentsDialog.style}
                />
              )}

              <Reactions 
                likes={commentsDialog.likes} 
                comments={commentsDialog.comments} 
                onCommentsClick={handleCommentsClick}
              />
              <BlingString onCommentClick={handleCommentsClick} />
            </Card>

            {/* Comments section placeholder */}
            <div className="comments-list" style={{ padding: '16px', minHeight: '200px' }}>
              <p style={{ color: 'var(--text-light-color, #65676B)', textAlign: 'center', padding: '40px 0' }}>
                Comments section - to be implemented
              </p>
            </div>
          </div>
        </FDSDialog>
      )}
    </AnimatePresence>
  );
}

