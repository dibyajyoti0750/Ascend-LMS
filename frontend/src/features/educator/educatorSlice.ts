import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EducatorState {
  isEducator: boolean;
}

const initialState: EducatorState = {
  isEducator: true,
};

const educatorSlice = createSlice({
  name: "educator",
  initialState,
  reducers: {
    setIsEducator(state, action: PayloadAction<boolean>) {
      state.isEducator = action.payload;
    },
  },
});

export const { setIsEducator } = educatorSlice.actions;
export default educatorSlice.reducer;
