import React, { useState } from "react";
import axios from "axios";

const FileReport = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/reports",
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Report filed successfully!");
      setForm({ title: "", description: "" });
    } catch (err) {
      setMessage("❌ Error filing report.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">File a Crisis Report</h2>
      {message && <p className="mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows={5}
          className="w-full border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default FileReport;
