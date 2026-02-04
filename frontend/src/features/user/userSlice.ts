import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../educator/data.types";
import axios from "axios";
import toast from "react-hot-toast";
import type { Course } from "../courses/course.types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface UserData {
  userData: User | null;
  enrolledCourses: Course[];
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  coursesStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserData = {
  userData: null,
  enrolledCourses: [],
  userStatus: "idle",
  coursesStatus: "idle",
};

export const fetchUserData = createAsyncThunk<User, string>(
  "user/fetchUserData",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const fetchUserEnrolledCourses = createAsyncThunk<Course[], string>(
  "user/fetchUserEnrolledCourses",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/enrolled-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!data.success) {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }

      return data.enrolledCourses;
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // USER DATA
      .addCase(fetchUserData.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.userStatus = "failed";
        state.userData = null;
      })

      // ENROLLED COURSES
      .addCase(fetchUserEnrolledCourses.pending, (state) => {
        state.coursesStatus = "loading";
      })
      .addCase(fetchUserEnrolledCourses.fulfilled, (state, action) => {
        state.coursesStatus = "succeeded";
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchUserEnrolledCourses.rejected, (state) => {
        state.coursesStatus = "failed";
        state.enrolledCourses = [];
      });
  },
});

export default userSlice.reducer;
