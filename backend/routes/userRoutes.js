import express from "express";
import { protect } from "../middlewares/auth.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addUserRating,
  getSingleCourseProgress,
  getUserCourseProgress,
  getUserData,
  purchaseCourseRZP,
  purchaseCourseStripe,
  updateUserCourseProgress,
  userEnrolledCourses,
  verifyRazorpayPayment,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", protect, wrapAsync(getUserData));
userRouter.get("/enrolled-courses", protect, wrapAsync(userEnrolledCourses));

userRouter.post("/purchase-rzp", protect, wrapAsync(purchaseCourseRZP));
userRouter.post("/verify-rzp", protect, wrapAsync(verifyRazorpayPayment));

userRouter.post("/purchase-stripe", protect, wrapAsync(purchaseCourseStripe));

userRouter.get("/course-progress", protect, wrapAsync(getUserCourseProgress));

userRouter.get(
  "/course-progress/:courseId",
  protect,
  wrapAsync(getSingleCourseProgress),
);

userRouter.post(
  "/update-course-progress",
  protect,
  wrapAsync(updateUserCourseProgress),
);

userRouter.post("/add-rating", protect, wrapAsync(addUserRating));

export default userRouter;
