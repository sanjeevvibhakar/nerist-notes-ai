import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/materials/');
        setMaterials(res.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        alert('Failed to load materials.');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">📚 Study Materials</h2>
      {loading ? (
        <p>Loading materials...</p>
      ) : materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((mat) => (
            <li key={mat.id} className="border p-4 rounded shadow-sm">
              <div className="font-semibold">{mat.title}</div>
              <div className="text-sm text-gray-600">
                {mat.subject_offering.subject.name} - {mat.subject_offering.semester} Sem
                ({mat.subject_offering.department.name})
              </div>
              <a
                href={mat.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                📄 View / Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudyMaterials;
