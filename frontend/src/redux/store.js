import { configureStore } from '@reduxjs/toolkit';
import dressReducer from './dressSlice';

export const store = configureStore({
  reducer: {
    dresses: dressReducer,
  },
});

export default store;