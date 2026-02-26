import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setNavStyle,
    setPushView,
    closePushView
} from "../../store/appSlice";
import classNames from "classnames";
import { motion } from "framer-motion";
import { fds, transition } from "../../components/vars";

import ImageHandler from "../mediaViewer/ImageHandler";
import CircleButton from "../../components/button/circleButton";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import Reactions from "../../components/card/Reactions";
import BlingString from "../../components/card/BlingString";
import Composer from "../../components/card/Composer";

function PushImage() {

    // Store Values
    const pushView = useSelector(state => state.app.pushView);
    const responsiveView = useSelector(state => state.app.responsiveView);

    // Dispatch to redux
    const dispatch = useDispatch();

    function _getInitialX() {
        const bounds = pushView.bounds || {};
        if (!bounds.x || !bounds.width) return 0;
        const SIDEBAR = responsiveView === "desktop" ? 360 : 0;

        return bounds.x - (( window.innerWidth - (bounds.width + SIDEBAR) ) * 0.5 );
    }

    function _getInitialY() {
        const bounds  = pushView.bounds || {};
        const padding = pushView.padding || [0, 0, 0, 0];
        if (!bounds.top || !bounds.height) return 0;
        const paddingDiff = padding[0] - padding[2];

        return bounds.top - (((window.innerHeight - bounds.height) + paddingDiff) * 0.5);
    }

    function _getInitialScale() {
        const SIDEBAR = responsiveView === "desktop" ? 360 : 0;
        const bounds = pushView.bounds || {};
        const padding = pushView.padding || [0, 0, 0, 0];
        if (!bounds.width) return 1;
        const horzPadding  = padding[1] + padding[3];
        const num  = bounds.width / (window.innerWidth - ( SIDEBAR + horzPadding ));

        return Math.round((num + Number.EPSILON ) * 1000) / 1000;
    }

    function _handleClose() {
        setTransitionState(true);
        setAnimation("exit");
    }

    function _handleEscKey(e) {
        if ( e.keyCode == 27 ){
           _handleClose();
        }
    }

    let timeoutID;

    function _startTimeout() {
        timeoutID = setTimeout(() => {
            setArrowsVisible(false);
        }, 1000);
    }

    function _handleMouseMove() {
        setArrowsVisible(true);
        clearTimeout(timeoutID);
        _startTimeout();
    }

    function handleFullScreen(isActive) {
        if (!isActive) {
            setSidebarAnimation("hide");
        } else {
            setSidebarAnimation("enter");
        }

    }

    // Constants - with safe defaults for exit animation
    const images = pushView.images || [];
    const padding = pushView.padding || [0, 0, 0, 0];
    const info = pushView.info || { image: '', name: '', time: '' };
    const sidebarWidth = responsiveView === "desktop" ? 360 : 0;

    // Set States
    const [animation, setAnimation] = useState("enter");
    const [sidebarAnimation, setSidebarAnimation] = useState("enter");
    const [transitionState, setTransitionState] = useState(false);
    const [arrowsVisible, setArrowsVisible] = useState(true);

    // Computate initial position (once only)
    const initX = _getInitialX();
    const initY = _getInitialY();
    const initScale = _getInitialScale();

    // Component Mounted
    useEffect(() => {

        _startTimeout();

        // Listen for keydown (close)
        document.addEventListener("keydown", _handleEscKey, false);
        document.addEventListener("mousemove", _handleMouseMove, false);

        return () => {
            // Clear listeners and timeout
            clearTimeout(timeoutID);
            document.removeEventListener("keydown", _handleEscKey, false);
            document.removeEventListener("mousemove", _handleMouseMove, false);
        }
    }, []);

    // Custom Animation Transition
    const sidebarTransition = {
        initial: {
            x: responsiveView === "desktop" ? 180 : 0,
            y: responsiveView !== "desktop" ? 64 : 0
        },
        enter: {
            x: 0,
            y: 0,
            opacity: 1,
        },
        exit: { x: 0 },
        hide: { opacity: 0 }
    }

    // Custom variants with proper z-index layering
    const overlayVariants = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: {
                duration: fds.duration.extraShortIn,
                ease: fds.animation.fadeIn
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: fds.duration.extraExtraShortOut,
                ease: fds.animation.fadeOut
            }
        }
    };

    const cardPanelVariants = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: {
                duration: fds.duration.extraShortIn,
                ease: fds.animation.fadeIn,
                delay: 0.05 // Slight delay to ensure it appears after overlay starts
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: fds.duration.extraExtraShortOut,
                ease: fds.animation.fadeOut
            }
        }
    };

    return (
        <motion.div
            className="push-view"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={transition.fade}
        >
            <motion.div
                className={classNames(
                    "push--image-wrapper",
                    pushView.style || '',
                    transitionState ? "push--transition" : null,
                    arrowsVisible ? "push--arrows-visible" : "push--arrows-hidden"
                )}
                animate={animation}
                onAnimationStart={() => {
                    if ( animation === "exit" ){
                        dispatch(setNavStyle(null)); // moves logo back into place
                    }
                }}
                onAnimationComplete={() => {
                    if ( animation === "exit" ){
                        dispatch(setPushView({
                            activeImage: 0,
                            images: [],
                            view: "",
                            top: pushView.top || 0,
                            scrolled: pushView.scrolled || 0
                        }));
                        dispatch(closePushView(false));
                    }
               }}
            >
                <motion.div
                    className="card--panel"
                    initial="initial"
                    animate={animation}
                    variants={cardPanelVariants}
                    style={{
                        top: padding[0],
                        right: padding[1],
                        bottom: padding[2],
                        left: padding[3]
                    }}
                >
                <Card type="image">
                    <div className="container--close-modal">
                        <CircleButton
                            type="secondary"
                            size="large"
                            icon="cross-filled"
                            performAction={() => {_handleClose()}}
                        />
                    </div>

                    {/* Image */}
                    <ImageHandler
                        activeImage={ pushView.activeImage || 0 }
                        images={ images }
                        initial={{
                            x: initX,
                            y: initY,
                            scale: initScale,
                            transition: { duration: 0 }
                        }}
                        sidebar={ sidebarWidth }
                        triggerClose={() => {
                            _handleClose();
                        }}
                        triggerFullScreen={(e) => {
                            handleFullScreen(e);
                        }}
                    />

                    <motion.div
                        className="sidebar"
                        initial="initial"
                        animate={sidebarAnimation}
                        variants={sidebarTransition}
                        transition={{
                            duration: fds.duration.extraShortOut,
                            ease: fds.animation.expandCollapseOut
                        }}
                    >
                        <CardHeader
                            profile={info.image}
                            name={info.name}
                            timeago={info.time}
                        />
                        <Reactions />
                        <BlingString />
                        <Composer />
                    </motion.div>
                    </Card>
                </motion.div>

                <motion.div
                    className="overlay"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={overlayVariants}
                    onClick={() => {
                        _handleClose();
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

export default PushImage;
