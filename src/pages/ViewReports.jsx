import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
};

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userRes = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      const reportRes = await axios.get("/api/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(reportRes.data);
    };
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `/api/reports/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReports((prev) =>
      prev.map((report) => (report.id === id ? { ...report, status } : report))
    );
  };

  const deleteReport = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/reports/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  if (!user) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6">
        Crisis Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow-md hover:shadow-lg rounded-xl p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {report.title}
              </h2>
              <span
                className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${statusColors[report.status] || "bg-gray-100 text-gray-800"}`}
              >
                {report.status}
              </span>
            </div>

            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              {report.description}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Submitted: {new Date(report.createdAt).toLocaleString()}
            </p>

            {user.role === "admin" && report.user && (
              <p className="text-xs text-blue-600 mt-1">
                By: {report.user.name} ({report.user.email})
              </p>
            )}

            {user.role === "admin" && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <select
                  value={report.status}
                  onChange={(e) => updateStatus(report.id, e.target.value)}
                  className="w-full sm:w-auto border border-gray-300 rounded px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReports;
