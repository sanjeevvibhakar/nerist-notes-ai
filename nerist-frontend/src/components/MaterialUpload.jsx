import React, { useState } from "react";
import axios from "../api/axios";

const MaterialUpload = ({ offeringId, onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("notes");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please provide both a title and a file.");

    const formData = new FormData();
    formData.append("subject_offering", offeringId);
    formData.append("title", title);
    formData.append("material_type", type);
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("materials/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Material submitted for approval!");
      setTitle("");
      setFile(null);
      if (onUploadSuccess) onUploadSuccess(res.data.data);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6 animate-fade-in">
      <h3 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        📂 Share Study Material
      </h3>
      <form onSubmit={handleUpload} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Material Title</label>
          <input
            type="text"
            value={title}
            placeholder="e.g. Calculus Unit 1 Notes"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium appearance-none"
            >
              <option value="notes">Notes</option>
              <option value="pyq">PYQ</option>
              <option value="practical">Practical</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select File (PDF)</label>
            <label className="relative flex items-center justify-center w-full h-[46px] px-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-blue-400 transition-all group">
              <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 truncate">
                {file ? file.name : "Choose PDF..."}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md ${uploading ? 'bg-gray-200 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 active:scale-[0.98]'}`}
        >
          {uploading ? "Uploading..." : "Click to Submit for Review"}
        </button>
      </form>
    </div>
  );
};

export default MaterialUpload;
