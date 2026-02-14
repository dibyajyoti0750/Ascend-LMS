import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Course, CourseState } from "./course.types";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialState: CourseState = {
  courseData: null,
  courseDataStatus: "idle",
  courseDataError: null,

  allCourses: [],
  allCoursesStatus: "idle",
};

// Fetch all courses
export const fetchAllCourses = createAsyncThunk<Course[]>(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");

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

export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: string }
>("course/fetchCourseById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/course/${id}`);

    return data.courseData;
  } catch (error: unknown) {
    let msg = "Something went wrong";

    if (axios.isAxiosError(error)) {
      msg = error.response?.data?.message || error.message || msg;
    } else if (error instanceof Error) {
      msg = error.message;
    }

    return rejectWithValue(msg);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All courses
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
      })

      // Individual course details
      .addCase(fetchCourseById.pending, (state) => {
        state.courseDataStatus = "loading";
        state.courseDataError = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.courseDataStatus = "succeeded";
        state.courseData = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.courseDataStatus = "failed";
        state.courseDataError = action.payload || "Failed to fetch course data";
        state.courseData = null;
      });
  },
});

export default courseSlice.reducer;
