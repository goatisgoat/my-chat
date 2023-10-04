import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../modules/userSlice";
import socketSlice from "../modules/socketSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
