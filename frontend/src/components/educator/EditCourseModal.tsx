import { useState } from "react";
import type { EditCourse } from "../../features/educator/data.types";
import { UploadCloud, X } from "lucide-react";

interface Props {
  course: EditCourse;
  onClose: () => void;
  onSave: () => void;
}

export default function EditCourseModal({ course, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    courseTitle: course.courseTitle,
    courseDescription: course.courseDescription,
    coursePrice: course.coursePrice,
    discount: course.discount,
    isPublished: course.isPublished,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    course.courseThumbnail,
  );

  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {};

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Edit Course</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSave} className="px-6 py-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="coursePrice"
                  min={0}
                  value={formData.coursePrice}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Discount %
                </label>
                <input
                  type="number"
                  name="discount"
                  min={0}
                  max={100}
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label className="text-sm text-gray-700">Published</label>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="md:col-span-2 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Course Thumbnail
              </p>

              <label
                htmlFor="thumbnail"
                className="relative block w-full h-48 rounded-lg border-2 border-dashed bg-gray-50 overflow-hidden cursor-pointer group"
              >
                <input
                  hidden
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />

                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-black transition">
                    <UploadCloud size={32} />
                    <span className="text-xs mt-2">Click to upload</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <UploadCloud size={28} className="text-white" />
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-purple-800 text-white hover:bg-purple-900 transition shadow-md cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
