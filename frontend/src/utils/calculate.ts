import type { Chapter, Course } from "../features/courses/course.types";
import humanizeDuration from "humanize-duration";

export const calculateRating = (course: Course): number => {
  if (!course.courseRatings.length) return 0;
  const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
  return Math.floor(total / course.courseRatings.length);
};

// calculate chapter time
export const calculateChapterTime = (chapter: Chapter) => {
  let time = 0;
  chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
  return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
};

// calculate course duration
export const calculateCourseDuration = (course: Course) => {
  let minutes = 0;

  course.courseContent.forEach((chapter) =>
    chapter.chapterContent.forEach((lecture) => {
      minutes += lecture.lectureDuration;
    }),
  );

  const hours = minutes / 60;
  return `${hours.toFixed(1)} hours`;
};

// calculate total number of lectures in the course
export const calculateNoOfLectures = (course: Course) => {
  let totalLectures = 0;

  course.courseContent.forEach((chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      totalLectures += chapter.chapterContent.length;
    }
  });

  return totalLectures;
};
