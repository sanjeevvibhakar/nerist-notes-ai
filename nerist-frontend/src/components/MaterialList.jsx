import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ChatInterface from "./AIChat/ChatInterface";

const MaterialList = ({ subjectId }) => {
  const [materials, setMaterials] = useState([]);
  const [activeChatNote, setActiveChatNote] = useState(null); // { id, title }

  useEffect(() => {
    if (subjectId) {
      // API endpoint: subjects/<id>/materials/
      axios
        .get(`subjects/${subjectId}/materials/`)
        .then((res) => setMaterials(res.data))
        .catch((err) => console.error("Error fetching materials:", err));
    }
  }, [subjectId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4 text-xl border-b pb-2">📚 available Materials</h3>
      {materials.length === 0 ? (
        <p className="text-gray-500 py-4">No materials uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {materials.map((mat) => (
            <li
              key={mat.id}
              className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{mat.title}</p>
                <div className="flex gap-2 text-xs mt-1">
                  <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700 uppercase font-bold text-[10px] tracking-wider">
                    {mat.material_type}
                  </span>
                  <span className="text-gray-400">
                    {new Date(mat.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveChatNote({ id: mat.id, title: mat.title })}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium px-3 py-1 bg-purple-50 rounded-full hover:bg-purple-100 transition"
                >
                  ✨ Ask AI
                </button>
                <a
                  href={mat.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Floating Chat Interface */}
      {activeChatNote && (
        <ChatInterface
          noteId={activeChatNote.id}
          noteTitle={activeChatNote.title}
          onClose={() => setActiveChatNote(null)}
        />
      )}
    </div>
  );
};

export default MaterialList;
