import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { dummyCourses } from "../../assets/assets";
import type { Course, CourseState } from "./course.types";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialState: CourseState = {
  allCourses: [],
  enrolledCourses: [],
  loading: false,
};

// Fetch all courses
export const fetchAllCourses = createAsyncThunk<Course[], string>(
  "courses/fetchAllCourses",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.courses;
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      return rejectWithValue(msg);
    }
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
        (state, action) => {
          state.loading = false;
          state.allCourses = [];
          toast.error(String(action.payload));
        },
      );
  },
});

export default courseSlice.reducer;
