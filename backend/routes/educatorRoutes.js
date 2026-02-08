import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addCourse,
  deleteCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator,
} from "../controllers/educatorController.js";
import { protect, protectEducator } from "../middlewares/auth.js";
import upload from "../configs/multer.js";

const educatorRouter = express.Router();

// educatorRouter.get("/update-role", protect, wrapAsync(updateRoleToEducator));

educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  wrapAsync(addCourse),
);

educatorRouter.get("/courses", protectEducator, wrapAsync(getEducatorCourses));

educatorRouter.get(
  "/dashboard",
  protectEducator,
  wrapAsync(educatorDashboardData),
);

educatorRouter.get(
  "/enrolled-students",
  protectEducator,
  wrapAsync(getEnrolledStudentsData),
);

educatorRouter.delete(
  "/course/:courseId",
  protectEducator,
  wrapAsync(deleteCourse),
);

export default educatorRouter;
