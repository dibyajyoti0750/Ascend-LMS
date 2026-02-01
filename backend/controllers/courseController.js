import Course from "../models/Course.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  const courses = await Course.find({ isPublished: true })
    .select(["-courseContent", "-enrolledStudents"])
    .populate({ path: "educator" });
  res.json({ success: true, courses });
};

// Get course by Id
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  const courseData = await Course.findById(id).populate({ path: "educator" });

  // remove lectureUrl of isPreviewFree is false
  courseData.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => {
      if (!lecture.isPreviewFree) {
        lecture.lectureUrl = "";
      }
    });
  });

  res.json({ success: true, courseData });
};
