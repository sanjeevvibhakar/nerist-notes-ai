import { useEffect, useState } from "react";
import axios from "../api/axios";

const SmartUploadForm = ({ onUploadSuccess }) => {
  const [subjectOfferings, setSubjectOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState("");
  const [materialType, setMaterialType] = useState("notes");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("subject-offerings/")
      .then(response => {
        setSubjectOfferings(response.data);
      })
      .catch(error => {
        console.error("Error fetching offerings:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedOffering || !title) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject_offering", selectedOffering);
    formData.append("material_type", materialType);
    formData.append("title", title);

    setLoading(true);
    try {
      // Assuming global auth header is set, otherwise we need to pass token here
      const response = await axios.post("materials/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(response.data.message); // "Upload successful! Waiting for admin approval."
      if (onUploadSuccess) onUploadSuccess();

      // Reset form
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold text-gray-700">Contribute Material</h3>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600">Select Subject:</label>
        <select
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
          required
        >
          <option value="">-- Select Subject --</option>
          {subjectOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>
              {offering.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-semibold text-gray-600">Type:</label>
          <select
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
          >
            <option value="notes">Notes</option>
            <option value="pyq">PYQ</option>
            <option value="practical">Practical</option>
          </select>
        </div>
        <div className="flex-[2]">
          <label className="block mb-1 text-sm font-semibold text-gray-600">Title:</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Thermodynamics Unit 1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-600">Select File (PDF/Image):</label>
        <input
          type="file"
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload Material"}
      </button>
    </form>
  );
};

export default SmartUploadForm;
