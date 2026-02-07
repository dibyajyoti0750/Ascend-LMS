import Quill from "quill";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { assets } from "../../assets/assets";
import { ChevronDown, LoaderCircle, X } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

interface LectureDetails {
  lectureTitle: string;
  lectureDuration: number | null;
  lectureUrl: string;
  isPreviewFree: boolean;
}

interface Lecture extends LectureDetails {
  lectureId: string;
  lectureOrder: number;
}

interface Chapter {
  chapterId: string;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed: boolean;
  chapterOrder: number;
}

export default function AddCourse() {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showChapterPopup, setShowChapterPopup] = useState(false);
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState("");

  const [lectureDetails, setLectureDetails] = useState<LectureDetails>({
    lectureTitle: "",
    lectureDuration: null,
    lectureUrl: "",
    isPreviewFree: false,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const addChapter = (title: string) => {
    const newChapter = {
      chapterId: uuidv4(),
      chapterTitle: title,
      chapterContent: [],
      collapsed: false,
      chapterOrder:
        chapters.length > 0
          ? chapters[chapters.length - 1].chapterOrder + 1
          : 1,
    };

    setChapters([...chapters, newChapter]);
    setChapterTitle("");
    setShowChapterPopup(false);
  };

  const handleChapter = (action: "remove" | "toggle", chapterId?: string) => {
    if (action === "remove") {
      setChapters(chapters.filter((ch) => ch.chapterId !== chapterId));
    } else if (action === "toggle") {
      setChapters(
        chapters.map((ch) =>
          ch.chapterId === chapterId ? { ...ch, collapsed: !ch.collapsed } : ch,
        ),
      );
    }
  };

  const handleLecture = (
    action: "add" | "remove",
    chapterId: string,
    lectureIndex?: number,
  ) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowLecturePopup(true);
      return;
    }

    if (action === "remove" && lectureIndex !== undefined) {
      setChapters((prev) =>
        prev.map((ch) =>
          ch.chapterId === chapterId
            ? {
                ...ch,
                chapterContent: ch.chapterContent.filter(
                  (_, i) => i !== lectureIndex,
                ),
              }
            : ch,
        ),
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((ch) => {
        if (ch.chapterId === currentChapterId) {
          const newLecture = {
            lectureId: uuidv4(),
            ...lectureDetails,
            lectureOrder:
              ch.chapterContent.length > 0
                ? ch.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
          };

          ch.chapterContent.push(newLecture);
        }

        return ch;
      }),
    );

    setShowLecturePopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: null,
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (!thumbnail) {
        toast.error("Thumbnail not selected");
        setIsSubmitting(false);
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current?.root.innerHTML,
        coursePrice,
        discount,
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", thumbnail);

      const token = await getToken();
      if (!token) return;

      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(null);
        setDiscount(null);
        setThumbnail(null);
        setChapters([]);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between p-4 pt-8 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg w-full font-medium text-gray-600"
      >
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            placeholder="Type here..."
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Price + Discount */}
          <div className="flex flex-col gap-4">
            {/* Course Price */}
            <div className="flex flex-col gap-1">
              <p>Course Price</p>
              <input
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  setCoursePrice(value === "" ? null : Number(value));
                }}
                value={coursePrice ?? ""}
                placeholder="0"
                className="outline-none py-2 px-3 w-full rounded border border-gray-500"
                required
              />
            </div>

            {/* Discount */}
            <div className="flex flex-col gap-1">
              <p>Discount %</p>
              <input
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  setDiscount(value === "" ? null : Number(value));
                }}
                value={discount ?? ""}
                placeholder="0"
                min={0}
                max={100}
                className="outline-none py-2 px-3 w-full rounded border border-gray-500"
                required
              />
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <p>Course Thumbnail</p>

            <label
              htmlFor="thumbnailImage"
              className="flex justify-center items-center w-full max-w-xs h-40 border border-gray-300 rounded cursor-pointer overflow-hidden"
            >
              {!thumbnail ? (
                <div className="flex flex-col items-center gap-1">
                  <img src={assets.upload} alt="upload" className="w-6" />
                  <p className="text-xs text-gray-500">Upload image</p>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              )}

              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Adding chapters and lectures */}
        <div>
          {chapters.map((ch, chIndex) => (
            <div
              key={chIndex}
              className="bg-white border border-gray-400 rounded-lg mb-4"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-400">
                <div className="flex items-center">
                  <ChevronDown
                    onClick={() => handleChapter("toggle", ch.chapterId)}
                    className={`mr-2 cursor-pointer transition-all ${
                      ch.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold">{ch.chapterTitle}</span>
                </div>

                <span className="text-gray-500">
                  {ch.chapterContent.length} Lectures
                </span>

                <X
                  onClick={() => handleChapter("remove", ch.chapterId)}
                  className="cursor-pointer"
                />
              </div>

              {!ch.collapsed && (
                <div className="p-4">
                  {ch.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>

                      <X
                        onClick={() =>
                          handleLecture("remove", ch.chapterId, lectureIndex)
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  ))}

                  <div
                    onClick={() => handleLecture("add", ch.chapterId)}
                    className="w-fit bg-purple-100 p-2 text-sm rounded cursor-pointer mt-1"
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            onClick={() => setShowChapterPopup(true)}
            className="flex justify-center items-center font-medium bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>
        </div>

        <button
          title="Add course"
          type="submit"
          disabled={isSubmitting}
          className={`bg-black text-white w-max py-2.5 px-8 rounded-md my-4 font-medium ${isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "ADD"}
        </button>
      </form>

      {/* Lecture popup */}
      {showLecturePopup && (
        <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-gray-700 p-4 rounded-md relative w-full max-w-96">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
              <X
                onClick={() => setShowLecturePopup(false)}
                className="w-5 cursor-pointer"
              />
            </div>

            <div className="mb-2">
              <p>Lecture Title</p>
              <input
                type="text"
                placeholder="Title"
                className="mt-1 block w-full border border-gray-500 rounded py-1 px-2"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-2">
              <p>Duration (minutes)</p>
              <input
                type="number"
                placeholder="0"
                className="mt-1 block w-full border rounded py-1 px-2"
                value={lectureDetails.lectureDuration ?? ""}
                onChange={(e) => {
                  const value = e.target.value;

                  setLectureDetails({
                    ...lectureDetails,
                    lectureDuration:
                      value === "" ? null : Number(e.target.value),
                  });
                }}
              />
            </div>

            <div className="mb-2">
              <p>Lecture URL</p>
              <input
                type="text"
                placeholder="https://youtube.com/"
                className="mt-1 block w-full border rounded py-1 px-2"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureUrl: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex items-center gap-2 my-4">
              <p>Is Preview Free?</p>
              <input
                type="checkbox"
                className="mt-1 scale-125"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    isPreviewFree: e.target.checked,
                  })
                }
              />
            </div>

            <button
              onClick={addLecture}
              type="button"
              className="w-full bg-sky-500 text-white py-2 rounded-md cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Chapter popup */}
      {showChapterPopup && (
        <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-gray-700 p-4 rounded-md relative w-full max-w-96">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4">Enter Chapter Name</h2>
              <X
                onClick={() => setShowChapterPopup(false)}
                className="w-5 cursor-pointer"
              />
            </div>

            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => setChapterTitle(e.target.value)}
              value={chapterTitle}
              className="block w-full border border-gray-500 rounded p-2 mb-4"
            />

            <button
              type="button"
              onClick={() => {
                if (!chapterTitle) return;
                addChapter(chapterTitle);
              }}
              className="w-full bg-sky-500 text-white py-2 rounded-md cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
