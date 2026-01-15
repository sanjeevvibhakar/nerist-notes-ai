import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ChatInterface from "./AIChat/ChatInterface";

import MaterialUpload from "./MaterialUpload";

const MaterialList = ({ offeringId }) => {
  const [materials, setMaterials] = useState([]);
  const [activeChatNote, setActiveChatNote] = useState(null); // { id, title }
  const [showUpload, setShowUpload] = useState(false);

  const fetchMaterials = () => {
    if (offeringId) {
      axios
        .get(`subjects/offering/${offeringId}/materials/`)
        .then((res) => setMaterials(res.data))
        .catch((err) => console.error("Error fetching materials:", err));
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [offeringId]);

  // Group materials by type
  const grouped = {
    notes: materials.filter(m => m.material_type === 'notes'),
    pyq: materials.filter(m => m.material_type === 'pyq'),
    practical: materials.filter(m => m.material_type === 'practical'),
  };

  const renderGroup = (label, items) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{label}</h4>
        <ul className="space-y-2">
          {items.map((mat) => (
            <li
              key={mat.id}
              className="bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center hover:border-blue-200 hover:shadow-sm transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{mat.title}</p>
                <p className="text-xs text-gray-400">{new Date(mat.uploaded_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChatNote({ id: mat.id, title: mat.title })}
                  className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                >
                  ✨ Ask AI
                </button>
                <a
                  href={mat.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-gray-800">Available Materials</h3>
        {localStorage.getItem('token') ? (
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${showUpload ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-100'}`}
          >
            {showUpload ? 'Close' : '+ Contribute Material'}
          </button>
        ) : (
          <p className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 italic">Login to contribute notes!</p>
        )}
      </div>

      {showUpload && (
        <div className="animate-fade-in-down">
          <MaterialUpload
            offeringId={offeringId}
            onUploadSuccess={() => {
              setShowUpload(false);
              fetchMaterials();
            }}
          />
        </div>
      )}

      <div className="bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200 min-h-[200px]">
        {materials.length === 0 && !showUpload ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">📚</div>
            <p className="text-gray-500 font-medium">No materials yet.</p>
            <p className="text-gray-400 text-sm">Be the first to upload one!</p>
          </div>
        ) : (
          <>
            {renderGroup("📝 Notes", grouped.notes)}
            {renderGroup("📄 Previous Year Questions (PYQs)", grouped.pyq)}
            {renderGroup("🧪 Practical Files", grouped.practical)}
          </>
        )}
      </div>

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
