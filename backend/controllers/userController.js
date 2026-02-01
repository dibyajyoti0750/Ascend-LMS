import User from "../models/User.js";
import ExpressError from "../utils/expressError.js";

// Get user data
export const getUserData = async (req, res) => {
  const { userId } = await req.auth();
  const user = await User.findById(userId);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  res.json({ success: true, user });
};

// Get user enrolled courses with lectureUrl
export const userEnrolledCourses = async (req, res) => {
  const { userId } = await req.auth();
  const userData = await User.findById(userId).populate("enrolledCourses");

  res.json({ success: true, enrolledCourses: userData.enrolledCourses });
};
