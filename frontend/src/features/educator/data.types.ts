interface Student {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface DashboardData {
  totalEarnings: number;
  enrolledStudentsData: {
    courseTitle: string;
    student: Student;
  }[];
  totalCourses: number;
}

export interface StudentEnrolled {
  student: Student;
  courseTitle: string;
  purchaseDate: string;
}

export interface User extends Student {
  email: string;
  enrolledCourses: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EditCourse {
  courseTitle: string;
  courseDescription: string;
  courseThumbnail: string;
  coursePrice: number;
  discount: number;
  isPublished: boolean;
}
