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
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((offering) => (
          <button
            key={offering.id}
            onClick={() => onSelect(offering)}
            className="group relative bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover-lift active:scale-95 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity translate-x-4 group-hover:translate-x-0">
              <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                {offering.subject_name}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-blue-600 rounded-full group-hover:w-12 transition-all duration-300"></span>
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Select</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
