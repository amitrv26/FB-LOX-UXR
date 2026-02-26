"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import classNames from "classnames";

import { fds } from "../vars";
import Icon from "../Icon";

const variants = {
  enter: {
    scale: 0,
    opacity: 0
  },
  center: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: fds.duration.shortIn,
      ease: fds.animation.expandCollapseIn
    }
  },
  exit: {
    scale: 0,
    opacity: 1,
    transition: {
      duration: fds.duration.extraShortOut,
      ease: fds.animation.fadeOut,
      delay: fds.duration.longIn
    }
  }
};

// Map product names to icon names
const iconMap = {
  newsfeed: 'news-feed-home',
  notifications: 'notifications',
  pages: 'house',
  watch: 'app-facebook-reels',
  profile: 'profile-rounded-square',
  marketplace: 'marketplace',
  gaming: 'app-facebook-gaming',
  groups: 'app-facebook-groups',
  messenger: 'app-messenger-swish',
  more: 'more'
};

const NavigationTab = (props) => {
  const pathname = usePathname();

  if (props.tab.action) {
    const isActive = pathname === props.tab.path;
    const iconName = iconMap[props.tab.product] || props.tab.product;
    const iconVariant = isActive ? 'filled' : 'outline';
    const fullIconName = `${iconName}-${iconVariant}`;

    return (
      <a
        className={classNames(
          "navigation-tab",
          isActive ? "active" : undefined
        )}
      >
        <Icon 
          name={fullIconName}
          size={24}
          color={isActive ? "active" : "secondary"}
          style={{
            width: '24px',
            height: 'auto',
            position: 'relative',
            zIndex: 4
          }}
        />
        <span>{props.tab.name}</span>
      </a>
    );
  } else {
    const isActive = props.tab.product === props.product;
    const iconName = iconMap[props.tab.product] || props.tab.product;
    const iconVariant = isActive ? 'filled' : 'outline';
    const fullIconName = `${iconName}-${iconVariant}`;

    return (
      <Link
        href={props.tab.path}
        className={classNames(
          "navigation-tab",
          isActive ? "active" : undefined
        )}
      >
        <Badge count={props.tab.badge} />
        <Icon 
          name={fullIconName}
          size={24}
          color={isActive ? "active" : "secondary"}
          style={{
            width: '26px',
            height: 'auto',
            position: 'relative',
            zIndex: 4
          }}
        />
        <span>{props.tab.name}</span>
      </Link>
    );
  }
};

export default NavigationTab;

const Badge = (props) => {
  return (
    <AnimatePresence>
      { props.count && (
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="navigation-badge">
          <span>{props.count}</span>
        </motion.div>
      ) }
    </AnimatePresence>
  )
}
