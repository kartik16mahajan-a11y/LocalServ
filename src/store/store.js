import { configureStore } from '@reduxjs/toolkit';
import servicesFilterReducer from './servicesFilterSlice';

export const store = configureStore({
  reducer: {
    servicesFilter: servicesFilterReducer,
  },
});
