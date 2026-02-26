import { actionTypes } from "./actionTypes";

// Actions
export const toggleDarkMode = toggleDarkMode => dispatch => {
  return dispatch({
    type: actionTypes.DARK_MODE,
    payload: toggleDarkMode
  });
}

export const resizeWindow = resizeWindow => dispatch => {
  return dispatch({
    type: actionTypes.RESIZE_WINDOW,
    height: resizeWindow.height,
    width: resizeWindow.width
  });
}

export const setNavigationHeight = setNavigationHeight => dispatch => {
  return dispatch({
    type: actionTypes.SET_NAVIGATION_HEIGHT,
    payload: setNavigationHeight
  });
}

export const setResponsive = setResponsive => dispatch => {
  return dispatch({
    type: actionTypes.SET_RESPONSIVE,
    payload: setResponsive
  });
}

export const updateNavTabs = updateNavTabs => dispatch => {
  return dispatch({
    type: actionTypes.UPDATE_NAV_TABS,
    payload: updateNavTabs
  });
}

export const toggleSettings = toggleSettings => dispatch => {
  return dispatch({
    type: actionTypes.TOGGLE_SETTINGS,
    payload: toggleSettings
  });
}

export const minimizeSearch = minimizeSearch => dispatch => {
  return dispatch({
    type: actionTypes.MINIMIZE_SEARCH,
    payload: minimizeSearch
  });
}

export const toggleNotifications = toggleNotifications => dispatch => {
  return dispatch({
    type: actionTypes.TOGGLE_NOTIFICATIONS,
    payload: toggleNotifications
  });
}

export const setNotification = setNotification => dispatch => {
  return dispatch({
    type: actionTypes.SET_NOTIFICATION,
    payload: setNotification
  });
}

export const setNavStyle = setNavStyle => dispatch => {
  return dispatch({
    type: actionTypes.SET_NAV_STYLE,
    payload: setNavStyle
  });
}

export const setSticky = setSticky => dispatch => {
  return dispatch({
    type: actionTypes.SET_STICKY,
    payload: setSticky
  });
}

export const setPushView = setPushView => dispatch => {
  return dispatch({
    type: actionTypes.SET_PUSH_VIEW,
    payload: setPushView
  });
}

export const closePushView = closePushView => dispatch => {
  return dispatch({
    type: actionTypes.CLOSE_PUSH_VIEW,
    payload: closePushView
  });
}

export const toggleSticky = toggleSticky => dispatch => {
  return dispatch({
    type: actionTypes.TOGGLE_STICKY,
    payload: toggleSticky
  });
}

export const setTest = setTest => dispatch => {
  return dispatch({
    type: actionTypes.SET_TEST,
    payload: setTest
  });
}

export const flagMarketplaceUpdates = flagMarketplaceUpdates => dispatch => {
  return dispatch({
    type: actionTypes.FLAG_MARKETPLACE_UPDATES,
    payload: flagMarketplaceUpdates
  });
}

export const setMarketplaceTest = setMarketplaceTest => dispatch => {
  return dispatch({
    type: actionTypes.SET_MARKETPLACE_TEST,
    payload: setMarketplaceTest
  });
}

export const hideJewels = hideJewels => dispatch => {
  return dispatch({
    type: actionTypes.HIDE_JEWELS,
    payload: hideJewels
  });
}
