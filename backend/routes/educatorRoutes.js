import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addCourse,
  getEducatorCourses,
  updateRoleToEducator,
} from "../controllers/educatorController.js";
import { protect, protectEducator } from "../middlewares/auth.js";
import upload from "../configs/multer.js";

const educatorRouter = express.Router();

educatorRouter.get("/update-role", protect, wrapAsync(updateRoleToEducator));
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  addCourse,
);
educatorRouter.get("/courses", protectEducator, getEducatorCourses);

export default educatorRouter;
