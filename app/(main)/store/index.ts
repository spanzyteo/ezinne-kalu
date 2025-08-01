import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from './darkModeSlice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
