import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  theme: "light",
  isAuthenticated: Cookies.get("token") !== undefined,
  isAdmin: false, // Add isAdmin to the initial state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isAdmin = action.payload.isAdmin || false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setIsAdmin(state, action) {
      // New action to set isAdmin
      state.isAdmin = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isAdmin = false; // Reset isAdmin on logout
      Cookies.remove("token");
    },
  },
});

export const { setLoading, setUser, setError, setTheme, setIsAdmin, logout } =
  authSlice.actions;

export default authSlice.reducer;
