import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const SemesterList = ({ yearId, departmentId, onSelect }) => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    let url = "";
    if (departmentId) {
      url = `departments/${departmentId}/semesters/`;
    } else if (yearId) {
      url = `years/${yearId}/semesters/`;
    }

    if (url) {
      axios.get(url)
        .then((res) => setSemesters(res.data))
        .catch((err) => console.error("Error fetching semesters:", err));
    }
  }, [yearId, departmentId]);

  return (
    <div className="py-8">
      <div className="flex flex-wrap gap-4">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => onSelect(sem)}
            className="group px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover-lift active:scale-95 transition-all text-left flex items-center gap-4"
          >
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {sem.number}
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Semester</p>
              <p className="text-sm font-black text-gray-900 leading-none">Term {sem.number}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SemesterList;
