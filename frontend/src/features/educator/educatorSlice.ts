import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { DashboardData } from "./data.types";
import axios from "axios";
import { api } from "../../api/axios";

interface EducatorState {
  isEducator: boolean;
  dashboardData: DashboardData | null;
  loading: boolean;
}

const initialState: EducatorState = {
  isEducator: false,
  dashboardData: null,
  loading: false,
};

export const fetchDashboardData = createAsyncThunk(
  "educator/fetchDashboardData",
  async ({ token }: { token: string }, { rejectWithValue }) => {
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
  },
);

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
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setIsEducator } = educatorSlice.actions;
export default educatorSlice.reducer;
