import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { fds } from "../../components/vars";
import { hideJewels } from "../../store/appSlice";
import { usePalette } from "react-palette";

import Button from "../../components/button/Button";
import CircleButton from "../../components/button/circleButton";
import ArrowNavigation from "./ArrowNavigation";

const variants = {
    initial: {
        opacity: 0
    },
    enter: (direction) => {
        return {
            x: 128 * direction,
            opacity: 1
        };
    },
    center: {
        zIndex: 5,
        x: 0,
        opacity: 1,
        transition: {
            duration: fds.duration.shortIn,
            ease: fds.animation.passiveMoveIn
        }
    },
    exit: () => {
        return {
            zIndex: 4,
            opacity: 0,
            transition: {
                duration: fds.duration.extraShortOut,
                ease: fds.animation.fadeOut
            }
        }
    }
};

//
// Image Component
const ImageHandler = (props) => {

    const constraintsRef = useRef(null);
    const [[direction], setPage] = useState([0]);
    const [bgColor, setBgColor] = useState(null);
    const paginate = (newDirection) => {
        setPage([newDirection]);
    };
    const [imageZoom, setImageZoom] = useState(1);
    const [isFullScreen, setFullScreen] = useState(false);
    const [showZoomControls, setShowZoomControls] = useState(false);

    // Safe access to current image with fallback
    const currentImage = props.images[props.activeImage] || { source: 'placeholder.jpg' };
    const { data } = usePalette(`/images/user/${currentImage.source}`);

    function handleFullScreen() {
        if (isFullScreen){
            setFullScreen(false);
            dispatch(hideJewels(false));
        } else {
            setFullScreen(true);
            dispatch(hideJewels(true));
        }

        props.triggerFullScreen(isFullScreen);
    }

    useEffect(() => {
        if ( data.darkMuted ) setBgColor(data.darkMuted);
    });

    const zoomControls = () => {
        return (
            <motion.div
                className="zoom-controls"
                initial={{
                    opacity: 0,
                    y: -12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: fds.duration.extraShortIn,
                        ease: fds.animation.quickMoveIn
                    }
                }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: fds.duration.extraShortOut,
                        ease: fds.animation.quickMoveOut
                    }
                }}
            >
                <div className="top-arrow" style={{ backgroundImage: `url(/images/bubble-up.png)` }} />
                <CircleButton
                    type="secondary"
                    size="medium"
                    icon="plus-filled"
                    iconColor="onMedia"
                    deemph
                    disabled={imageZoom === 2.5}
                    performAction={() => {
                        let currentZoom = imageZoom;
                        setImageZoom(currentZoom + 0.5);
                    }}
                />

                <CircleButton
                    type="secondary"
                    size="medium"
                    icon="minus-filled"
                    iconColor="onMedia"
                    deemph
                    disabled={imageZoom === 1}
                    performAction={() => {
                        let currentZoom = imageZoom;
                        setImageZoom(currentZoom - 0.5);
                    }}
                />
                <Button
                    type="secondary"
                    size="medium"
                    content="Reset"
                    performAction={() => { setImageZoom(1) }}
                />
            </motion.div>
        );
    }

    // Dispatch
    const dispatch = useDispatch();

    return (
        <motion.div 
            className={classNames({
                "image--panel": true,
                "zoom": imageZoom > 1,
                "fullscreen": isFullScreen,
            })} 
            layout
            transition={{
                duration: fds.duration.shortOut,
                ease: fds.animation.moveOut,
            }}
        >
            <motion.div className="actions">
                <CircleButton
                    type="secondary"
                    size="medium"
                    icon="rotate-cw-filled"
                    iconColor="onMedia"
                    deemph
                />
                <div className="zoom-wrap">
                    <CircleButton
                        active={showZoomControls}
                        type="secondary"
                        size="medium"
                        activeIcon="zoom-in-filled"
                        icon="zoom-in-filled"
                        iconColor="onMedia"
                        deemph
                        performAction={()=> { setShowZoomControls(!showZoomControls) }}
                    />
                    <AnimatePresence>
                        { showZoomControls ? zoomControls() : undefined }
                    </AnimatePresence>
                </div>

                <CircleButton
                    type="secondary"
                    size="medium"
                    icon="tag-filled"
                    iconColor="onMedia"
                    deemph
                />
                <CircleButton
                    active={isFullScreen}
                    type="secondary"
                    size="medium"
                    icon="resize-up-filled"
                    activeIcon="resize-down-filled"
                    iconColor="onMedia"
                    deemph
                    performAction={() => { handleFullScreen() }}
                />
            </motion.div>

            { props.images.length > 1 ?
                <ArrowNavigation direction={(direction) => {
                    paginate(direction)
                }} /> : undefined
            }

            <motion.div
                className="image-container"
                initial={props.initial}
                ref={constraintsRef}
                animate={{
                    x: 0,
                    y: 0,
                    scale: imageZoom,
                    transition: {
                        duration: fds.duration.shortIn,
                        ease: fds.animation.moveIn
                    }
                }}
            >
                <div className="gradient-protection--top" />
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className="image--slide"
                        key={props.activeImage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag={imageZoom > 1}
                        dragConstraints={constraintsRef}
                    >
                        <img
                            src={`/images/user/${currentImage.source}`}
                            onClick={(e) => { e.preventDefault()}}
                        />
                    </motion.div>
                </AnimatePresence>
                <div
                    className="close-overlay"
                    style={{ backgroundColor: bgColor }}
                    onClick={() => { props.triggerClose() }}
                />
            </motion.div>
        </motion.div>
    )
};
export default ImageHandler;
