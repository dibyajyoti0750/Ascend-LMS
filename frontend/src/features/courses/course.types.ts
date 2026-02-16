export interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

export interface Chapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
}

interface CourseRating {
  userId: string;
  rating: number;
  _id: string;
}

export interface Educator {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  enrolledCourses: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  educator: Educator;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseThumbnail: { url: string; public_id: string };
}

export interface CourseState {
  courseData: Course | null;
  courseDataStatus: "idle" | "loading" | "succeeded" | "failed";
  courseDataError: string | null;

  allCourses: Course[];
  allCoursesStatus: "idle" | "loading" | "succeeded" | "failed";
}
