import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialToken = localStorage.getItem("token");

const initialState = {
  token: initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// Create a selector to compute isLoggedIn
export const selectIsLoggedIn = createSelector(
  (state) => state.auth.token,
  (token) => !!token // This will return true if the token is present, false otherwise
);
