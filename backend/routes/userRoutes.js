import express from "express";
import { protect } from "../middlewares/auth.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  getUserData,
  userEnrolledCourses,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", protect, wrapAsync(getUserData));
userRouter.get("/enrolled-courses", protect, wrapAsync(userEnrolledCourses));

export default userRouter;
