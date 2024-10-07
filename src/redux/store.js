import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./feature/jobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
