import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  searchQuery: "",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setJobs, setSearchQuery } = jobSlice.actions;

export default jobSlice.reducer;
