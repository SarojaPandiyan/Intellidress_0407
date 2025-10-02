import { configureStore } from '@reduxjs/toolkit';
import dressReducer from './slices/dressSlice';

export const store = configureStore({
  reducer: {
    dresses: dressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;