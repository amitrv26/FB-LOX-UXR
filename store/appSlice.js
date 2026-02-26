import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  tests: {
    marketplace: null,
    navigation: "notifications",
    notifications: null,
    jewel: "notifications"
  },
  asPath: "",
  darkMode: false,
  hideJewels: false,
  settings: false,
  notificationMenu: false,
  currentNotification: "example",
  marketplaceUpdates: true,
  marketplaceTest: null,
  minimizeSearch: false,
  navigationHeight: 60,
  navigationTabs: [],
  navigationStyle: null,
  responsiveView: "desktop",
  sticky: false,
  stickyPosition: 0,
  pushView: {
    activeImage: 0,
    bounds: {},
    dimensions: {},
    info: {},
    images: [],
    scrolled: 0,
    style: null,
    view: "",
  },
  pushViewExit: false,
  commentsDialog: null, // null or object with card data
  windowHeight: 0,
  windowWidth: 0
};

// Create slice with all reducers
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    resizeWindow: (state, action) => {
      state.windowHeight = action.payload.height;
      state.windowWidth = action.payload.width;
    },
    setNavigationHeight: (state, action) => {
      state.navigationHeight = action.payload;
    },
    setResponsive: (state, action) => {
      state.responsiveView = action.payload;
    },
    updateNavTabs: (state, action) => {
      state.navigationTabs = action.payload;
    },
    toggleSettings: (state, action) => {
      state.settings = action.payload;
    },
    minimizeSearch: (state, action) => {
      state.minimizeSearch = action.payload;
    },
    toggleNotifications: (state, action) => {
      state.notificationMenu = action.payload;
    },
    setNotification: (state, action) => {
      state.currentNotification = action.payload;
    },
    setNavStyle: (state, action) => {
      state.navigationStyle = action.payload;
    },
    setSticky: (state, action) => {
      state.stickyPosition = action.payload;
    },
    setPushView: (state, action) => {
      state.pushView = action.payload;
    },
    closePushView: (state, action) => {
      state.pushViewExit = action.payload;
    },
    toggleSticky: (state, action) => {
      state.sticky = action.payload;
    },
    setTest: (state, action) => {
      state.tests = action.payload;
    },
    flagMarketplaceUpdates: (state, action) => {
      state.marketplaceUpdates = action.payload;
    },
    setMarketplaceTest: (state, action) => {
      state.marketplaceTest = action.payload;
    },
    hideJewels: (state, action) => {
      state.jewelsVisible = action.payload;
    },
    setAsPath: (state, action) => {
      state.asPath = action.payload;
    },
    setCommentsDialog: (state, action) => {
      state.commentsDialog = action.payload;
    },
    closeCommentsDialog: (state) => {
      state.commentsDialog = null;
    },
  },
});

// Export actions
export const {
  toggleDarkMode,
  resizeWindow,
  setNavigationHeight,
  setResponsive,
  updateNavTabs,
  toggleSettings,
  minimizeSearch,
  toggleNotifications,
  setNotification,
  setNavStyle,
  setSticky,
  setPushView,
  closePushView,
  toggleSticky,
  setTest,
  flagMarketplaceUpdates,
  setMarketplaceTest,
  hideJewels,
  setAsPath,
  setCommentsDialog,
  closeCommentsDialog,
} = appSlice.actions;

// Export reducer
export default appSlice.reducer;
