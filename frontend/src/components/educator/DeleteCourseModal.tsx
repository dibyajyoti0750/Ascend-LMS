interface DeleteModalProps {
  courseTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteCourseModal({
  courseTitle,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="px-6 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete "{courseTitle}"?
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Are you sure you want to delete this course?
          </p>
        </div>

        <div className="px-6 mt-4">
          <div className="flex items-start gap-1 rounded-lg bg-red-50 p-3">
            <span className="text-red-500 text-sm">⚠️</span>
            <p className="text-sm text-red-600">
              This action is permanent and cannot be undone!
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
