import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const SemesterList = ({ yearId, onSelect }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    if (yearId) {
      axios.get(`years/${yearId}/semesters/`)
        .then((res) => setSemesters(res.data))
        .catch((err) => console.error("Error fetching semesters:", err));
    }
  }, [yearId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Select Semester</h2>
      <div className="flex flex-wrap gap-4">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => onSelect(sem)}
            className="bg-yellow-100 px-4 py-2 rounded hover:bg-yellow-200"
          >
            Semester {sem.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SemesterList;
