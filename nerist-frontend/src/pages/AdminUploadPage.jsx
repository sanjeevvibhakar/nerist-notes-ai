import React, { useState } from "react";
import SmartUploadForm from "../components/SmartUploadForm";

const AdminUploadPage = () => {
  const [subjectId, setSubjectId] = useState("");

  const handleUploadSuccess = () => {
    alert("✅ Upload successful");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4 text-center">📤 Admin Upload Panel</h2>

      <input
        type="number"
        placeholder="Enter Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {subjectId && (
        <SmartUploadForm subjectId={subjectId} onUploadSuccess={handleUploadSuccess} />
      )}
    </div>
  );
};

export default AdminUploadPage;
