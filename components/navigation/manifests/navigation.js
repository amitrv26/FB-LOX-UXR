const navManifest = {
  newsfeed: {
    name: "News Feed",
    product: "newsfeed",
    path: "/",
    badge: null
  },
  notifications: {
    name: "Notifications",
    product: "notifications",
    path: "/notifications",
    badge: null
  },
  pages: {
    name: "Pages",
    product: "pages",
    path: "/pages",
    badge: null
  },
  watch: {
    name: "Watch",
    product: "watch",
    path: "/reels",
    badge: null
  },
  profile: {
    name: "Profile",
    product: "profile",
    path: "/profile",
    badge: null
  },
  marketplace: {
    name: "Marketplace",
    product: "marketplace",
    path: "/marketplace",
    badge: null
  },
  gaming: {
    name: "Gaming",
    product: "gaming",
    path: "/gaming",
    badge: null
  },
  groups: {
    name: "Groups",
    product: "groups",
    path: "/groups/discover",
    badge: null
  },
  messenger: {
    name: "Messenger",
    product: "messenger",
    path: "/messenger",
    badge: null
  },
  more: {
    name: "More",
    product: "more",
    path: null,
    action: "drawer",
    badge: null
  }
};

const useNavigation = {
  default: [
    "newsfeed",
    "notifications",
    "watch",
    "profile",
    "marketplace",
    "groups",
    "messenger"
  ],
  mobile: [
    "more"
  ],
  tablet: [
    "newsfeed",
    "gaming",
    "watch",
    "marketplace",
    "more"
  ],
  desktop: [
    "newsfeed",
    "watch",
    "marketplace",
    "groups",
    "gaming",
  ]
};
export {navManifest, useNavigation};
