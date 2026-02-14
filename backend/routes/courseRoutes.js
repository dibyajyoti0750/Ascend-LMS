import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  getAllCourses,
  getCourseById,
} from "../controllers/courseController.js";
import wrapAsync from "../middlewares/wrapAsync.js";

const courseRouter = express.Router();

courseRouter.get("/all", wrapAsync(getAllCourses));
courseRouter.get("/:id", protect, wrapAsync(getCourseById));

export default courseRouter;
