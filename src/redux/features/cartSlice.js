import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (val) => val.domainId !== action.payload.domainId
      );
    },
    resetCart(state) {
      state = initialState;
    },
  },
});

export const { removeFromCart, resetCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
