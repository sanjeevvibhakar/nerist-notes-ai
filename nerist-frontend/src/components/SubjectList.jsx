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
      <div className="flex flex-wrap gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject)}
            className="bg-blue-100 px-4 py-2 rounded hover:bg-blue-200"
          >
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
