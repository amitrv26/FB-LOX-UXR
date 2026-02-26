import { actionTypes } from "./actionTypes";
import { HYDRATE } from "next-redux-wrapper";

// Reducers
export const reducer = (state = state, action) => {
  switch (action.type) {
    case HYDRATE:
        return {...state, ...action.payload};
    case 'TICK':
        return {...state, tick: action.payload};
    case actionTypes.DARK_MODE:
      return Object.assign({}, state, {
        darkMode: action.payload
      })
    case actionTypes.CONFIGURE_LAYOUT:
      return Object.assign({}, state, {
        layout: action.payload
      })
    case actionTypes.RESIZE_WINDOW:
      return Object.assign({}, state, {
        windowHeight: action.height,
        windowWidth: action.width
      })
    case actionTypes.UPDATE_NAV_TABS:
      return Object.assign({}, state, {
        navigationTabs: action.payload
      })
    case actionTypes.TOGGLE_SETTINGS:
      return Object.assign({}, state, {
        settings: action.payload
      })
    case actionTypes.TOGGLE_NOTIFICATIONS:
      return Object.assign({}, state, {
        notificationMenu: action.payload
      })
    case actionTypes.MINIMIZE_SEARCH:
      return Object.assign({}, state, {
        minimizeSearch: action.payload
      })
    case actionTypes.SET_NAV_STYLE:
      return Object.assign({}, state, {
        navigationStyle: action.payload
      })
    case actionTypes.SET_NOTIFICATION:
      return Object.assign({}, state, {
        currentNotification: action.payload
      })
    case actionTypes.TOGGLE_STICKY:
      return Object.assign({}, state, {
        sticky: action.payload
      })
    case actionTypes.SET_STICKY:
      return Object.assign({}, state, {
        stickyPosition: action.payload
      })
    case actionTypes.SET_PUSH_VIEW:
      return Object.assign({}, state, {
        pushView: action.payload
      })
    case actionTypes.CLOSE_PUSH_VIEW:
      return Object.assign({}, state, {
        pushViewExit: action.payload
      })
    case actionTypes.SET_TEST:
      return Object.assign({}, state, {
        tests: action.payload
      })
    case actionTypes.SET_MARKETPLACE_TEST:
      return Object.assign({}, state, {
        marketplaceTest: action.payload
      })
    case actionTypes.SET_RESPONSIVE:
      return Object.assign({}, state, {
        responsiveView: action.payload
      })
    case actionTypes.SET_NAVIGATION_HEIGHT:
      return Object.assign({}, state, {
        navigationHeight: action.payload
      })
    case actionTypes.FLAG_MARKETPLACE_UPDATES:
      return Object.assign({}, state, {
        marketplaceUpdates: action.payload
      })
    case actionTypes.HIDE_JEWELS:
      return Object.assign({}, state, {
        jewelsVisible: action.payload
      })
    default:
      return state
  }
}
