import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addCourse,
  deleteCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateCourse,
} from "../controllers/educatorController.js";
import { protect, protectEducator } from "../middlewares/auth.js";
import upload from "../configs/multer.js";

const educatorRouter = express.Router();

// educatorRouter.get("/update-role", protect, wrapAsync(updateRoleToEducator));

// Add new course
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  wrapAsync(addCourse),
);

// Get educator published courses
educatorRouter.get("/courses", protectEducator, wrapAsync(getEducatorCourses));

// Get dashboard data
educatorRouter.get(
  "/dashboard",
  protectEducator,
  wrapAsync(educatorDashboardData),
);

// Get enrolled students data
educatorRouter.get(
  "/enrolled-students",
  protectEducator,
  wrapAsync(getEnrolledStudentsData),
);

// Update a course
educatorRouter.patch(
  "/update/course/:courseId",
  upload.single("newThumbnail"),
  protectEducator,
  wrapAsync(updateCourse),
);

// Delete a course only with no enrollments
educatorRouter.delete(
  "/course/:courseId",
  protectEducator,
  wrapAsync(deleteCourse),
);

export default educatorRouter;
