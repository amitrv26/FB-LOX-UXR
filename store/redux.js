import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

// Create store directly for App Router
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['app/setPushView'],
        // Ignore these paths in the state
        ignoredPaths: ['app.pushView.bounds', 'app.pushView.dimensions', 'app.pushView.images'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
