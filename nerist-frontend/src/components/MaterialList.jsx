import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const MaterialList = ({ subjectId }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (subjectId) {
      axios.get(`subjects/${subjectId}/materials/`)
        .then((res) => setMaterials(res.data))
        .catch((err) => console.error("Error fetching materials:", err));
    }
  }, [subjectId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">📚 Study Materials</h2>
      {materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="border rounded p-4 bg-white shadow hover:shadow-lg"
            >
              <p className="font-medium">📄 {mat.title}</p>
              <p className="text-sm text-gray-500">Type: {mat.material_type}</p>
              <a
                href={`http://127.0.0.1:8000${mat.file}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialList;
