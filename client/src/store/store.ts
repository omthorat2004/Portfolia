import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authenticationSlice';
import projectsReducer from '../features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;