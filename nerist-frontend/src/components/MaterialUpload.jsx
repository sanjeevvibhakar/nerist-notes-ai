import React, { useState } from "react";
import axios from "../api/axios";

const MaterialUpload = ({ subjectId, onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("notes");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("subject", subjectId);
    formData.append("title", title);
    formData.append("material_type", type);
    formData.append("file", file);

    try {
      const res = await axios.post("materials/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Uploaded!");
      setTitle("");
      setFile(null);
      onUploadSuccess(res.data.data);  // optional refresh
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4 bg-white rounded shadow my-4">
      <h3 className="text-lg font-bold mb-3">Upload Study Material</h3>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 px-2 py-1 border"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="block w-full mb-2 px-2 py-1 border"
      >
        <option value="notes">Notes</option>
        <option value="pyq">PYQ</option>
        <option value="practical">Practical</option>
      </select>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
        Upload
      </button>
    </form>
  );
};

export default MaterialUpload;
