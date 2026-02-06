import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import type { DashboardData } from "../../features/educator/data.types";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function Dashboard() {
  const { isEducator } = useSelector((state: RootState) => state.educator);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();

  const columnStyles = {
    parentDiv:
      "flex items-center gap-3 shadow-custom-card border border-purple-600 p-4 w-56 rounded-md",
    total: "text-2xl font-medium text-gray-600",
    totalTitle: "text-base text-gray-500",
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${backendUrl}/api/educator/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!data.success) {
          toast.error(data.message);
        }

        setDashboardData(data.dashboardData);
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(msg);
      }
    };

    if (isEducator) {
      fetchDashboardData();
    }
  }, [backendUrl, getToken, isEducator]);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 p-4 pt-8 md:p-8">
      <div className="space-y-8">
        <div className="flex flex-wrap gap-5 items-center">
          <div className={columnStyles.parentDiv}>
            <img src={assets.man} alt="student" className="w-10" />
            <div>
              <p className={columnStyles.total}>
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className={columnStyles.totalTitle}>Total Enrolments</p>
            </div>
          </div>

          <div className={columnStyles.parentDiv}>
            <img src={assets.books} alt="books" className="w-10" />
            <div>
              <p className={columnStyles.total}>{dashboardData.totalCourses}</p>
              <p className={columnStyles.totalTitle}>Total Courses</p>
            </div>
          </div>

          <div className={columnStyles.parentDiv}>
            <img src={assets.money} alt="money" className="w-10" />
            <div>
              <p className={columnStyles.total}>
                {currency}
                {dashboardData.totalEarnings}
              </p>
              <p className={columnStyles.totalTitle}>Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-700 border-b border-gray-200 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
