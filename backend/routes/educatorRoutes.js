import express from "express";
import wrapAsync from "../middlewares/wrapAsync.js";
import {
  addCourse,
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

export default educatorRouter;
