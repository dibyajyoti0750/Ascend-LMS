import Quill from "quill";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { assets } from "../../assets/assets";
import { ChevronDown, X } from "lucide-react";

interface LectureDetails {
  lectureTitle: string;
  lectureDuration: number | "";
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

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);

  const [lectureDetails, setLectureDetails] = useState<LectureDetails>({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (
    action: "add" | "remove" | "toggle",
    chapterId?: string,
  ) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");

      if (title) {
        const newChapter = {
          chapterId: uuidv4(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            // chapters.slice(-1) returns a new array containing only the last element of chapters
            // sets the next chapter index, last chapterOrder + 1
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
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
      setShowPopup(true);
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

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
                onChange={(e) => setCoursePrice(Number(e.target.value))}
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
                onChange={(e) => setDiscount(Number(e.target.value))}
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
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center font-medium bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70">
              <div className="bg-white text-gray-700 p-4 rounded-md relative w-full max-w-96">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                  <X
                    onClick={() => setShowPopup(false)}
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
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: Number(e.target.value),
                      })
                    }
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
                  className="w-full bg-purple-400 text-white py-2 rounded-md cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          title="Add course"
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded-md my-4 font-medium cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
