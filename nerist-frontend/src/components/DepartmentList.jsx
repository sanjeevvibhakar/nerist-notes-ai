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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Select Department</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map(dep => (
          <button
            key={dep.id}
            onClick={() => onSelect(dep)}
            className="bg-white shadow p-4 rounded hover:bg-blue-100"
          >
            {dep.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
