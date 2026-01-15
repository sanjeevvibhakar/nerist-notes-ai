
// src/pages/AdminUpload.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subjectOfferingId, setSubjectOfferingId] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [subjectOfferings, setSubjectOfferings] = useState([]);

  useEffect(() => {
    const fetchSubjectOfferings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/subject-offerings/');
        setSubjectOfferings(res.data);
      } catch (error) {
        console.error('Error fetching subject offerings:', error);
      }
    };
    fetchSubjectOfferings();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !subjectOfferingId) {
      alert('Please select a file and subject offering.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);
    formData.append('subject_offering', subjectOfferingId);

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/materials/upload/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      alert('File uploaded successfully!');
      setSelectedFile(null);
      setTitle('');
      setSubjectOfferingId('');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded-xl mt-10">
      <h2 className="text-xl font-semibold mb-4">📤 Admin Upload Material</h2>

      <input
        type="text"
        placeholder="Material Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />

      <select
        value={subjectOfferingId}
        onChange={(e) => setSubjectOfferingId(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      >
        <option value="">Select Subject Offering</option>
        {subjectOfferings.map((offering) => (
          <option key={offering.id} value={offering.id}>
            {offering.subject.name} - {offering.semester} Sem ({offering.department.name})
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="block w-full mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default AdminUpload;