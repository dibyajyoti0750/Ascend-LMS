import express from "express";
import {
  getAllCourses,
  getCourseById,
} from "../controllers/courseController.js";
import wrapAsync from "../middlewares/wrapAsync.js";

const courseRouter = express.Router();

courseRouter.get("/all", wrapAsync(getAllCourses));
courseRouter.get("/:id", wrapAsync(getCourseById));

export default courseRouter;
