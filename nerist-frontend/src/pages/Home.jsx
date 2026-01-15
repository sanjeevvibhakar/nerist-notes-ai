import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DepartmentList from "../components/DepartmentList";
import YearList from "../components/YearList";
import SemesterList from "../components/SemesterList";
import SubjectList from "../components/SubjectList";
import MaterialList from "../components/MaterialList";

const Home = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Helper to reset states based on breadcrumb click
  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      // Home
      setSelectedDepartment(null);
      setSelectedSemester(null);
      setSelectedSubject(null);
      setBreadcrumbs([]);
    } else if (index === 0) {
      // Department selected
      setSelectedSemester(null);
      setSelectedSubject(null);
      setBreadcrumbs(breadcrumbs.slice(0, 1));
    } else if (index === 1) {
      // Semester selected
      setSelectedSubject(null);
      setBreadcrumbs(breadcrumbs.slice(0, 2));
    }
  };

  const selectDept = (dept) => {
    setSelectedDepartment(dept);
    setBreadcrumbs([{ label: dept.name, id: dept.id }]);
  };

  const selectSem = (sem) => {
    setSelectedSemester(sem);
    setBreadcrumbs([...breadcrumbs, { label: `Sem ${sem.number}`, id: sem.id }]);
  };

  const selectSub = (sub) => {
    setSelectedSubject(sub);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8 text-gray-600 bg-white p-3 rounded shadow-sm overflow-x-auto">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className="hover:text-blue-600 font-medium px-2 whitespace-nowrap"
          >
            🏠 Home
          </button>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => handleBreadcrumbClick(idx)}
                className={`px-2 hover:text-blue-600 whitespace-nowrap ${idx === breadcrumbs.length - 1 && !selectedSubject ? 'font-bold text-gray-800' : ''}`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}

          {selectedSubject && (
            <>
              <span className="text-gray-400">/</span>
              <span className="px-2 font-bold text-gray-800 whitespace-nowrap">{selectedSubject.name}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {!selectedDepartment ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Select Department</h2>
              <DepartmentList onSelect={selectDept} />
            </div>
          ) : !selectedSemester ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Select Semester</h2>
                <button onClick={() => handleBreadcrumbClick(-1)} className="text-blue-600 hover:underline text-sm">← Back to Departments</button>
              </div>
              <SemesterList departmentId={selectedDepartment.id} onSelect={selectSem} />
            </div>
          ) : !selectedSubject ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Select Subject</h2>
                <button onClick={() => handleBreadcrumbClick(0)} className="text-blue-600 hover:underline text-sm">← Back to Semesters</button>
              </div>
              <SubjectList semesterId={selectedSemester.id} onSelect={selectSub} />
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedSubject.name}</h2>
                  <p className="text-gray-500 text-sm">{selectedDepartment.name} • Semester {selectedSemester.number}</p>
                </div>
                <button onClick={() => handleBreadcrumbClick(1)} className="text-blue-600 hover:underline text-sm">← Select Different Subject</button>
              </div>
              <MaterialList subjectId={selectedSubject.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
