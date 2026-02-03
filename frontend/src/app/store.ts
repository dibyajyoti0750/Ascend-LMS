import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/courses/courseSlice";
import educatorReducer from "../features/educator/educatorSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    educator: educatorReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
