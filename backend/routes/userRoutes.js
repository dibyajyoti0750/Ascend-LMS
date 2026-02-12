import express from "express";
import { protect } from "../middlewares/auth.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addUserRating,
  getSingleCourseProgress,
  getUserCourseProgress,
  getUserData,
  purchaseCourseRZP,
  updateUserCourseProgress,
  userEnrolledCourses,
  verifyRazorpayPayment,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", protect, wrapAsync(getUserData));
userRouter.get("/enrolled-courses", protect, wrapAsync(userEnrolledCourses));

userRouter.post("/purchase-rzp", protect, wrapAsync(purchaseCourseRZP));
userRouter.post("/verify-rzp", protect, wrapAsync(verifyRazorpayPayment));

userRouter.get("/course-progress", protect, getUserCourseProgress);
userRouter.get("/course-progress/:courseId", protect, getSingleCourseProgress);
userRouter.post("/update-course-progress", protect, updateUserCourseProgress);
userRouter.post("/add-rating", protect, addUserRating);

export default userRouter;
