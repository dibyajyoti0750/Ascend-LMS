import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { EditCourse } from "../../features/educator/data.types";
import { LoaderCircle, UploadCloud, X } from "lucide-react";
import Quill from "quill";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  course: EditCourse;
  onClose: () => void;
}

export default function EditCourseModal({ course, onClose }: Props) {
  const quillRef = useRef<Quill | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    ...course,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(
    formData.courseThumbnail?.url,
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable If Nothing Changed
  const [previousCourseData] = useState(course);
  const currentDescription =
    quillRef.current?.root.innerHTML || formData.courseDescription;
  const isChanged =
    formData.courseTitle !== previousCourseData.courseTitle ||
    formData.coursePrice !== previousCourseData.coursePrice ||
    formData.discount !== previousCourseData.discount ||
    formData.isPublished !== previousCourseData.isPublished ||
    currentDescription !== previousCourseData.courseDescription ||
    !!thumbnailFile;

  // Validate form data
  const descriptionText = quillRef.current?.getText().trim() || "";
  const isValid =
    formData.courseTitle.trim() !== "" &&
    descriptionText !== "" &&
    formData.coursePrice !== null &&
    formData.coursePrice > 0 &&
    formData.discount !== null &&
    formData.discount >= 0 &&
    formData.discount <= 100;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? value === ""
              ? null
              : Number(value)
            : value,
    }));
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);

    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      const updatedCourseData = {
        ...formData,
        courseDescription: quillRef.current?.root.innerHTML,
      };

      const formDataToSend = new FormData();

      formDataToSend.append("courseData", JSON.stringify(updatedCourseData));

      if (thumbnailFile) {
        formDataToSend.append("newThumbnail", thumbnailFile);
      }

      if (!thumbnailFile) delete updatedCourseData.courseThumbnail;

      const token = await getToken();
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      const { data } = await axios.patch(
        `${backendUrl}/api/educator/update/course/${course._id}`,
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(data.message);
      onClose();
    } catch (error: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.message || error.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && descRef.current) {
      quillRef.current = new Quill(descRef.current, {
        theme: "snow",
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && formData.courseDescription) {
      quillRef.current.root.innerHTML = formData.courseDescription;
    }
  }, [formData.courseDescription]);

  // Revoke URL on cleanup to avoid memory leak
  useEffect(() => {
    return () => {
      if (thumbnailPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Edit Course</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
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
              className="w-full outline-sky-300 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm transition"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 text-sm">
            <label className="font-medium text-gray-700">
              Course Description
            </label>
            <div ref={descRef}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Side */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Course Price
                </label>
                <input
                  type="number"
                  name="coursePrice"
                  min={0}
                  value={formData.coursePrice}
                  onChange={handleChange}
                  className="w-full outline-sky-300 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm transition"
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
                  className="w-full outline-sky-300 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm transition"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
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
                  onChange={handleThumbnailChange}
                  hidden
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                />

                {thumbnailPreview ? (
                  <div>
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <UploadCloud size={28} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <UploadCloud
                      size={32}
                      className="text-gray-500 group-hover:text-black"
                    />
                    <span className="text-xs mt-2 text-gray-500 group-hover:text-black">
                      Click to upload
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isChanged || !isValid}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg bg-purple-800 text-white transition shadow-md ${
              isSubmitting || !isChanged || !isValid
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-900 cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
