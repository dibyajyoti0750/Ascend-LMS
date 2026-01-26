import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { dummyCourses } from "../../assets/assets";
import type { CourseState } from "./course.types";

const initialState: CourseState = {
  allCourses: [],
  enrolledCourses: [],
  loading: false,
};

// Fetch all courses
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async () => {
    return dummyCourses;
  },
);

// Fetch user enrolled courses
export const fetchUserEnrolledCourses = createAsyncThunk(
  "courses/fetchUserEnrolledCourses",
  async () => {
    return dummyCourses;
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchUserEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })

      // common
      .addMatcher(
        isPending(fetchAllCourses, fetchUserEnrolledCourses),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        isRejected(fetchAllCourses, fetchUserEnrolledCourses),
        (state) => {
          state.loading = false;
        },
      );
  },
});

export default courseSlice.reducer;
