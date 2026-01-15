import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const SubjectList = ({ semesterId, onSelect }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (semesterId) {
      axios.get(`semesters/${semesterId}/subjects/`)
        .then((res) => setSubjects(res.data))
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  }, [semesterId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Select Subject</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((offering) => (
          <button
            key={offering.id}
            onClick={() => onSelect(offering)}
            className="text-left bg-white border border-blue-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
          >
            <p className="font-semibold text-gray-800 group-hover:text-blue-600 uppercase text-sm tracking-tight">{offering.subject_name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
