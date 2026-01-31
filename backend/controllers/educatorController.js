import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  const { userId } = await req.auth();

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: "educator",
    },
  });

  res.json({ success: true, message: "You can publish a course now" });
};

// Add new course
export const addCourse = async (req, res) => {
  const { courseData } = req.body;
  const imageFile = req.file;
  const educatorId = await req.auth().userId;

  if (!imageFile) {
    return res.json({ success: false, message: "Thumbnail not attached" });
  }

  const parsedCourseData = await JSON.parse(courseData);
  parsedCourseData.educator = educatorId;
  const newCourse = await Course.create(parsedCourseData);
  const imageUpload = await cloudinary.uploader.upload(imageFile.path);
  newCourse.courseThumbnail = imageUpload.secure_url;
  await newCourse.save();

  res.json({ success: true, message: "Course added" });
};

// Get educator courses
export const getEducatorCourses = async (req, res) => {
  const educator = await req.auth().userId;
  const courses = await Course.find({ educator });
  res.json({ success: true, courses });
};

// Get dashboard data
export const educatorDashboardData = async (req, res) => {
  const educator = await req.auth().userId();
  const courses = await Course.find({ educator });
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
  const educator = await req.auth().userId;
  const courses = await Course.find({ educator });
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

  res.json({ success: true, enrolledStudents });
};
