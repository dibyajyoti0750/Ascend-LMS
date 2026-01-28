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
