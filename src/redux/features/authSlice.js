import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: false,
  user: {
    _id: "",
    name: "",
    username: "",
    email: "",
    alternateEmail: "",
    mobileNo: "",
    profileImg: "",
    website: "",
    address: "",
    city: "",
    country: "",
    pinCode: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    loggedWith: "",
    createdAt: "",
    updatedAt: "",
    type: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload.authState;
      state.user = action.payload.user;
    },
    setAuthLogout(state) {
      state.authState = false;
      state.user = initialState.user;
    },
  },
});

export const { setAuthState, setAuthLogout } = authSlice.actions;

export default authSlice.reducer;
