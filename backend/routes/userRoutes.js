import express from "express";
import { protect } from "../middlewares/auth.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", protect, wrapAsync(getUserData));
userRouter.get("/enrolled-courses", protect, wrapAsync(userEnrolledCourses));
userRouter.post("/purchase", protect, wrapAsync(purchaseCourse));

userRouter.get("/course-progress", protect, getUserCourseProgress);
userRouter.post("/update-course-progress", protect, updateUserCourseProgress);
userRouter.post("/add-rating", protect, addUserRating);

export default userRouter;
