import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProgressState {
  completed: Record<string, boolean>;
}

const STORAGE_KEY = "roadmap:progress";

const initialState: ProgressState = {
  completed: {},
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.completed[id] = !state.completed[id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completed));
      } catch {
        /* ignore */
      }
    },
    hydrate(state, action: PayloadAction<Record<string, boolean>>) {
      state.completed = action.payload;
    },
    reset(state) {
      state.completed = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    },
  },
});

export const { toggleItem, hydrate, reset } = progressSlice.actions;

export default progressSlice.reducer;
