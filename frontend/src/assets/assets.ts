import logo from "./rocket.png";
import userIcon from "./user.png";
import stroke from "./stroke.png";
import microsoft from "./microsoft.png";
import youtube from "./youtube.png";
import openai from "./openai.png";
import samsung from "./samsung.png";
import sony from "./sony.png";

export const assets = {
  logo,
  userIcon,
  stroke,
  microsoft,
  youtube,
  openai,
  samsung,
  sony,
};

export const dummyCourses = [
  {
    _id: "605c72efb3f1c2b1f8e4e1a1",
    courseTitle: "Introduction to JavaScript",
    courseDescription:
      "<h2>Learn the Basics of JavaScript</h2><p>JavaScript is a versatile programming language that powers the web. In this course, you will learn the fundamentals of JavaScript, including syntax, data types, and control structures.</p><p>This course is perfect for beginners who want to start their journey in web development. By the end of this course, you will be able to create interactive web pages and understand the core concepts of JavaScript.</p><ul><li>Understand the basics of programming</li><li>Learn how to manipulate the DOM</li><li>Create dynamic web applications</li></ul>",
    coursePrice: 49.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Getting Started with JavaScript",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is JavaScript?",
            lectureDuration: 16,
            lectureUrl: "https://youtu.be/CBWnBi-awSA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Setting Up Your Environment",
            lectureDuration: 19,
            lectureUrl: "https://youtu.be/4l87c2aeB4I",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Variables and Data Types",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Understanding Variables",
            lectureDuration: 20,
            lectureUrl: "https://youtu.be/pZQeBJsGoDQ",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Data Types in JavaScript",
            lectureDuration: 10,
            lectureUrl: "https://youtu.be/ufHT2WEkkC4",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [
      {
        userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
        rating: 5,
        _id: "6773e37360cb0ab974342314",
      },
    ],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T04:47:44.701Z",
    __v: 4,
    courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg",
  },

  {
    _id: "675ac1512100b91a6d9b8b24",
    courseTitle: "Advanced Python Programming",
    courseDescription:
      "<h2>Deep Dive into Python Programming</h2><p>This course is designed for those who have a basic understanding of Python and want to take their skills to the next level. You will explore advanced topics such as decorators, generators, and context managers.</p><p>By the end of this course, you will be able to write efficient and clean Python code, and understand how to leverage Python's powerful features for real-world applications.</p><ul><li>Master advanced data structures</li><li>Implement object-oriented programming concepts</li><li>Work with libraries and frameworks</li></ul>",
    coursePrice: 79.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Advanced Data Structures",
        chapterContent: [
          {
            lectureId: " lecture1",
            lectureTitle: "Lists and Tuples",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Dictionaries and Sets",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Object-Oriented Programming",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Classes and Objects",
            lectureDuration: 900,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Inheritance and Polymorphism",
            lectureDuration: 950,
            lectureUrl: "https://youtu.be/HdLIMoQkXFA",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [
      {
        userId: "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
        rating: 5,
        _id: "6776369244daad0f313d81a9",
      },
    ],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2025-01-02T06:47:54.446Z",
    __v: 3,
    courseThumbnail: "https://img.youtube.com/vi/HdLIMoQkXFA/maxresdefault.jpg",
  },

  {
    _id: "605c72efb3f1c2b1f8e4e1ae",
    courseTitle: "Cybersecurity Basics",
    courseDescription:
      "<h2>Protect Systems and Networks</h2><p>Cybersecurity is critical in today's digital age. This course introduces the fundamentals of cybersecurity, including threat analysis, ethical hacking, and secure programming practices.</p><p>By the end of this course, you will understand how to identify vulnerabilities and implement security measures effectively.</p><ul><li>Understand security protocols</li><li>Learn about encryption techniques</li><li>Conduct basic penetration testing</li></ul>",
    coursePrice: 69.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "Introduction to Cybersecurity",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "What is Cybersecurity?",
            lectureDuration: 10,
            lectureUrl: "https://youtu.be/samplelink5",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Types of Cyber Threats",
            lectureDuration: 18,
            lectureUrl: "https://youtu.be/samplelink6",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "Basic Security Practices",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "Password Management",
            lectureDuration: 15,
            lectureUrl: "https://youtu.be/samplelink7",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "Network Security Essentials",
            lectureDuration: 20,
            lectureUrl: "https://youtu.be/samplelink8",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [],
    createdAt: "2024-12-27T11:30:00.000Z",
    updatedAt: "2024-12-31T04:14:49.773Z",
    __v: 2,
    courseThumbnail: "https://img.youtube.com/vi/jZFaMEqEqEQ/maxresdefault.jpg",
  },

  {
    _id: "605c72efb3f1c2b1f8e4e1a7",
    courseTitle: "Web Development Bootcamp",
    courseDescription:
      "<h2>Become a Full-Stack Web Developer</h2><p>This comprehensive bootcamp covers everything you need to know to become a full-stack web developer. From HTML and CSS to JavaScript and backend technologies, this course is designed to take you from beginner to job-ready.</p><p>Throughout the course, you will work on real-world projects, build a portfolio, and gain the skills necessary to succeed in the tech industry.</p><ul><li>Learn front-end and back-end development</li><li>Build responsive and dynamic web applications</li><li>Understand databases and server-side programming</li></ul>",
    coursePrice: 99.99,
    isPublished: true,
    discount: 25,
    courseContent: [
      {
        chapterId: "chapter1",
        chapterOrder: 1,
        chapterTitle: "HTML & CSS Basics",
        chapterContent: [
          {
            lectureId: "lecture1",
            lectureTitle: "Introduction to HTML",
            lectureDuration: 600,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture2",
            lectureTitle: "Styling with CSS",
            lectureDuration: 720,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
      {
        chapterId: "chapter2",
        chapterOrder: 2,
        chapterTitle: "JavaScript Fundamentals",
        chapterContent: [
          {
            lectureId: "lecture3",
            lectureTitle: "JavaScript Basics",
            lectureDuration: 800,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "lecture4",
            lectureTitle: "DOM Manipulation",
            lectureDuration: 850,
            lectureUrl: "https://youtu.be/-HeadgoqJ7A",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: "675ac1512100b91a6d9b8b24",
    enrolledStudents: [
      "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
      "user_2qjlgkAqIMpiR2flWIRzvWKtE0w",
    ],
    courseRatings: [],
    createdAt: "2024-12-17T08:16:53.622Z",
    updatedAt: "2024-12-31T05:31:27.290Z",
    __v: 2,
    courseThumbnail: "https://img.youtube.com/vi/lpx2zFkapIk/maxresdefault.jpg",
  },
];
