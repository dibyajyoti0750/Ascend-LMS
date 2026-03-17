import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { DashboardData } from "./data.types";
import axios from "axios";
import { api } from "../../api/axios";
import type { Course } from "../courses/course.types";

interface EducatorState {
  isEducator: boolean;
  dashboardData: DashboardData | null;
  dashboardDataLoading: boolean;
  educatorCourses: Course[];
  educatorCoursesLoading: boolean;
}

const initialState: EducatorState = {
  isEducator: false,
  dashboardData: null,
  educatorCourses: [],
  dashboardDataLoading: false,
  educatorCoursesLoading: false,
};

export const fetchDashboardData = createAsyncThunk<
  DashboardData,
  string,
  { rejectValue: string }
>("educator/fetchDashboardData", async (token, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/api/educator/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.dashboardData;
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

export const fetchEducatorCourses = createAsyncThunk<
  Course[],
  string,
  { rejectValue: string }
>("educator/fetchEducatorCourses", async (token, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/api/educator/courses", {
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

    return rejectWithValue(msg);
  }
});

const educatorSlice = createSlice({
  name: "educator",
  initialState,
  reducers: {
    setIsEducator(state, action: PayloadAction<boolean>) {
      state.isEducator = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardDataLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardDataLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.dashboardDataLoading = false;
      })
      .addCase(fetchEducatorCourses.pending, (state) => {
        state.educatorCoursesLoading = true;
      })
      .addCase(fetchEducatorCourses.fulfilled, (state, action) => {
        state.educatorCoursesLoading = false;
        state.educatorCourses = action.payload;
      })
      .addCase(fetchEducatorCourses.rejected, (state) => {
        state.educatorCoursesLoading = false;
      });
  },
});

export const { setIsEducator } = educatorSlice.actions;
export default educatorSlice.reducer;
