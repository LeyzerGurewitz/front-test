import { configureStore } from "@reduxjs/toolkit";
import attackReducer from "./attacks/attacksSlice"; 

export const store = configureStore({
  reducer: {
    attacks: attackReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
