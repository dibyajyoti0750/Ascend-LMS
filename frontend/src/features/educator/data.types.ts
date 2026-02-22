interface Student {
  _id: string;
  name: string;
  email: string;
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
  _id: string;
  courseTitle: string;
  courseDescription: string;
  courseThumbnail?: {
    url: string;
    public_id: string;
  };
  coursePrice: number;
  discount: number;
  isPublished: boolean;
}
