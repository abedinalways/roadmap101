import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      try {
        localStorage.setItem("auth:token", action.payload.token);
      } catch {
        /* ignore */
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      try {
        localStorage.removeItem("auth:token");
      } catch {
        /* ignore */
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hydrateAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout, setLoading, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
