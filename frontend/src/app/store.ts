import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/courses/courseSlice";
import educatorReducer from "../features/educator/educatorSlice";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    educator: educatorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
