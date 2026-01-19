import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../../assets/assets";
import type { CourseState } from "./course.types";

const initialState: CourseState = {
  allCourses: [],
  loading: false,
};

export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async () => {
    return dummyCourses;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default courseSlice.reducer;
