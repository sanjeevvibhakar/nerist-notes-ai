import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const DepartmentList = ({ onSelect }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dep => (
          <button
            key={dep.id}
            onClick={() => onSelect(dep)}
            className="group relative h-48 w-full overflow-hidden rounded-3xl bg-white p-8 text-left shadow-sm border border-gray-100 hover-lift active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-blue-50 transition-transform group-hover:scale-150 group-hover:bg-blue-100/50 duration-700" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 group-hover:rotate-12 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-black leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  {dep.name}
                </h3>
                <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Department</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
