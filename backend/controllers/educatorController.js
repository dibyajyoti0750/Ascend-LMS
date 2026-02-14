import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import ExpressError from "../utils/expressError.js";
import CourseProgress from "../models/CourseProgress.js";

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  const { userId } = await req.auth();

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: "educator",
    },
  });

  res
    .status(200)
    .json({ success: true, message: "You can publish a course now" });
};

// Add new course
export const addCourse = async (req, res) => {
  const { courseData } = req.body;
  const imageFile = req.file;
  const educatorId = await req.auth().userId;

  let thumbnailUrl;

  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    thumbnailUrl = imageUpload.secure_url;
  }

  const parsedCourseData = JSON.parse(courseData);
  parsedCourseData.educator = educatorId;

  if (thumbnailUrl) {
    parsedCourseData.courseThumbnail = thumbnailUrl;
  }

  const newCourse = await Course.create(parsedCourseData);

  res.status(200).json({ success: true, message: "Course published" });
};

// Get educator courses
export const getEducatorCourses = async (req, res) => {
  const educatorId = await req.auth().userId;
  const courses = await Course.find({ educatorId });
  res.status(200).json({ success: true, courses });
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const educatorId = await req.auth().userId;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ExpressError(404, "Course not found");
  }

  if (course.educator.toString() !== educatorId) {
    throw new ExpressError(403, "You are not allowed to delete this course");
  }

  if (course.enrolledStudents.length > 0) {
    throw new ExpressError(
      400,
      "Cannot delete a course with enrolled students",
    );
  }

  await Course.findByIdAndDelete(courseId);
  await CourseProgress.deleteMany({ courseId });

  res.json({
    success: true,
    message: `${course.courseTitle} was deleted`,
  });
};

// Get dashboard data
export const educatorDashboardData = async (req, res) => {
  const educatorId = await req.auth().userId;
  const courses = await Course.find({ educatorId });
  const totalCourses = courses.length;

  const courseIds = courses.map((course) => course._id);

  // calculate total earnings
  const purchases = await Purchase.find({
    courseId: { $in: courseIds },
    status: "Completed",
  });

  const totalEarnings = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );

  // collect unique enrolled student IDs with their course titles
  const enrolledStudentsData = [];
  for (const course of courses) {
    const students = await User.find(
      {
        _id: { $in: course.enrolledStudents },
      },
      "name imageUrl",
    );

    students.forEach((student) => {
      enrolledStudentsData.push({ courseTitle: course.courseTitle, student });
    });
  }

  res.json({
    success: true,
    dashboardData: { totalCourses, enrolledStudentsData, totalEarnings },
  });
};

// Get enrolled students data with purchase data
export const getEnrolledStudentsData = async (req, res) => {
  const educatorId = await req.auth().userId;
  const courses = await Course.find({ educatorId });
  const courseIds = courses.map((course) => course._id);

  const purchases = await Purchase.find({
    courseId: { $in: courseIds },
    status: "Completed",
  })
    .populate("userId", "name imageUrl")
    .populate("courseId", "courseTitle");

  const enrolledStudents = purchases.map((purchase) => ({
    student: purchase.userId,
    courseTitle: purchase.courseId.courseTitle,
    purchaseDate: purchase.createdAt,
  }));

  res.status(200).json({ success: true, enrolledStudents });
};
