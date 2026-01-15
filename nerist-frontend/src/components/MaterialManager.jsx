import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaterialManager = ({ subjectId }) => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [editId, setEditId] = useState(null);
  const [subjectOfferingId, setSubjectOfferingId] = useState(null);

  useEffect(() => {
    // Fetch materials
    axios.get(`/api/materials/?subject_id=${subjectId}`)
      .then(res => {
        setMaterials(res.data);
        if (res.data.length > 0) {
          setSubjectOfferingId(res.data[0].subject_offering); // Reuse for uploads
        }
      })
      .catch(err => console.error('Error fetching materials:', err));
  }, [subjectId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNewMaterial(prev => ({ ...prev, file: files[0] }));
    } else {
      setNewMaterial(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newMaterial.title);
    formData.append('description', newMaterial.description);
    formData.append('file', newMaterial.file);
    formData.append('subject_offering', subjectOfferingId);

    const url = editId ? `/api/materials/${editId}/` : '/api/materials/';
    const method = editId ? axios.put : axios.post;

    method(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        alert(editId ? 'Updated!' : 'Uploaded!');
        setNewMaterial({ title: '', description: '', file: null });
        setEditId(null);
        refreshMaterials();
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Something went wrong!');
      });
  };

  const refreshMaterials = () => {
    axios.get(`/api/materials/?subject_id=${subjectId}`)
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this material?')) return;
    axios.delete(`/api/materials/${id}/`)
      .then(() => {
        alert('Deleted!');
        setMaterials(prev => prev.filter(mat => mat.id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (material) => {
    setNewMaterial({
      title: material.title,
      description: material.description,
      file: null,
    });
    setEditId(material.id);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Material' : 'Upload New Material'}</h2>

      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          value={newMaterial.title}
          placeholder="Title"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={newMaterial.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="block"
          required={!editId}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update' : 'Upload'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Uploaded Materials</h2>

      {materials.length === 0 ? (
        <p>No materials uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="border p-4 rounded shadow-sm">
              <h4 className="font-semibold">{material.title}</h4>
              <p className="text-sm text-gray-600">{material.description}</p>
              <div className="mt-2 space-x-2">
                <a
                  href={material.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
                <a
                  href={material.file}
                  download
                  className="text-green-600 underline"
                >
                  Download
                </a>
                <button
                  onClick={() => handleEdit(material)}
                  className="text-yellow-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialManager;
