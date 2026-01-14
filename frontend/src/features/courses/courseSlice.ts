import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyCourses } from "../../assets/assets";
import type { Course, CourseState } from "./course.types";

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

export const calculateRating = (course: Course): number => {
  if (!course.courseRatings.length) return 0;
  const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
  return total / course.courseRatings.length;
};

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
