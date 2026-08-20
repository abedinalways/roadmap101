import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiReducer from "./slices/uiSlice";
import progressReducer from "./slices/progressSlice";
import authReducer from "./slices/authSlice";
import { roadmapApi } from "./services/roadmapApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      progress: progressReducer,
      auth: authReducer,
      [roadmapApi.reducerPath]: roadmapApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(roadmapApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { setupListeners };
