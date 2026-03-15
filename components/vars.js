export const fds = {
  animation: {
    enterExitIn: [0.14, 1, 0.34, 1],
    enterExitOut: [0.45, 0.1, 0.2, 1],
    expandCollapseIn:  [0.17, 0.17, 0, 1],
    expandCollapseOut: [0.17, 0.17, 0, 1],
    fadeIn: [0, 0, 1, 1],
    fadeOut: [0, 0, 1, 1],
    moveIn: [0.17, 0.17, 0, 1],
    moveOut: [0.17, 0.17, 0, 1],
    passiveMoveIn: [0.5, 0, 0.1, 1],
    passiveMoveOut: [0.5, 0, 0.1, 1],
    quickMoveIn: [0.1, 0.9, 0.2, 1],
    quickMoveOut: [0.1, 0.9, 0.2, 1],
    swapShuffleIn: [0.14, 1, 0.34, 1],
    swapShuffleOut: [0.45, 0.1, 0.2, 1]
  },
  duration: {
    extraExtraShortIn: 0.1,
    extraExtraShortOut: 0.1,
    extraLongIn: 1,
    extraLongOut: 1,
    extraShortIn: 0.2,
    extraShortOut: 0.15,
    longIn: 0.5,
    longOut: 0.35,
    mediumIn: 0.4,
    mediumOut: 0.35,
    none: 0,
    shortIn: 0.28,
    shortOut: 0.2
  }
}

export const transition = {
  page: {
    initial: { 
      opacity: 0
    },
    enter: {
      opacity: 1,
      transition: { duration: fds.duration.mediumIn, ease: fds.animation.moveIn }
    },
    exit: {
      opacity: 0,
      transition: { duration: fds.duration.mediumOut, ease: fds.animation.moveOut }
    }
  },

  banner: {
    initial: { opacity: 1, z: 0, maxHeight: "200px" },
    enter: { 
      opacity: 1,
      maxHeight: "200px",
      z: 0,
      transition: {
        duration: fds.duration.mediumIn,
        ease: fds.animation.expandCollapseIn
      }
    },
    exit: { 
      opacity: 0,
      maxHeight: "0",
      z: -50,
      transition: {
        duration: fds.duration.mediumOut,
        ease: fds.animation.expandCollapseOut,
        delay: fds.duration.shortIn
      }
    }
  },

  stagger: {
    enter: {
      transition: {
        staggerChildren: 0.01
      }
    }
  },

  slideUp: {
    initial: { opacity: 0, y: 15 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: fds.duration.extraShortIn,
        ease: fds.animation.moveIn
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: fds.duration.extraShortOut,
        ease: fds.animation.moveOut
      }
    }
  },

  slideLeft: {
    initial: { opacity: 0, x: "100%" },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: fds.duration.mediumIn,
        ease: fds.animation.moveIn
      }
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: fds.duration.mediumOut,
        ease: fds.animation.moveOut
      }
    }
  },

  fade: {
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
  }
}
