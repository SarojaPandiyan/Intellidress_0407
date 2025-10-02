// store.js
import { configureStore } from '@reduxjs/toolkit';
import dressReducer from './redux/slices/dressSlice';

export const store = configureStore({
  reducer: {
    dresses: dressReducer,
  },
});