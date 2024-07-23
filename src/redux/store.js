import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
});
