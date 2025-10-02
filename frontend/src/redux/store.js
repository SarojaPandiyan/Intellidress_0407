import { configureStore } from '@reduxjs/toolkit';
import dressReducer from './slices/dressSlice';

export const store = configureStore({
  reducer: {
    dresses: dressReducer,
  },
});

export default store;