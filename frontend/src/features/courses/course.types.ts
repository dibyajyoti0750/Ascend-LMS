interface Lecture {
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

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  educator: string;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseThumbnail: string;
}

export interface CourseState {
  allCourses: Course[];
  loading: boolean;
}
