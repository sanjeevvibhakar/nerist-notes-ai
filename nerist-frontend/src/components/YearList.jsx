import React, { useEffect, useState } from "react";
import axios from "axios";

const YearList = ({ departmentId, onSelect }) => {
  const [years, setYears] = useState([]);

useEffect(() => {
  axios
    .get(`http://127.0.0.1:8000/api/departments/${departmentId}/years/`)
    .then((res) => {
      console.log("✅ Year API response:", res.data); // Add this line
      setYears(res.data);
    })
    .catch((err) => {
      console.error("❌ Error fetching years:", err);
    });
}, [departmentId]);


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Year</h2>
      <div className="flex flex-wrap gap-3">
        {years.map((year) => (
          <button
            key={year.id}
            onClick={() => onSelect(year)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Year {year.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearList;
