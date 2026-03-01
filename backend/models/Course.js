import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: { type: Number, required: true },
    lectureUrl: { type: String, required: true },
    isPreviewFree: { type: Boolean, required: true },
    lectureOrder: { type: Number, required: true },
  },
  { _id: false },
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    chapterContent: [lectureSchema],
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseRequirements: { type: String, required: true },
    courseThumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/600x400?text=No+Thumbnail",
      },
      public_id: {
        type: String,
        default: null,
      },
    },
    coursePrice: { type: Number, required: true },
    isPublished: { type: Boolean, default: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    isBestSeller: { type: Boolean, default: false },
    courseContent: [chapterSchema],
    courseRatings: [
      { userId: { type: String }, rating: { type: Number, min: 1, max: 5 } },
    ],
    educator: { type: String, ref: "User", required: true },
    enrolledStudents: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false },
);

export default mongoose.model("Course", courseSchema);
