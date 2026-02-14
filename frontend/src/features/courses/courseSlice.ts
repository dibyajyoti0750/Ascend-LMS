import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Course, CourseState } from "./course.types";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialState: CourseState = {
  allCourses: [],
  allCoursesStatus: "idle",
};

// Fetch all courses
export const fetchAllCourses = createAsyncThunk<Course[], string>(
  "courses/fetchAllCourses",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data.courses;
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.allCoursesStatus = "loading";
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.allCoursesStatus = "succeeded";
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state) => {
        state.allCoursesStatus = "failed";
        state.allCourses = [];
      });
  },
});

export default courseSlice.reducer;
