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
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Helper to reset states based on breadcrumb click
  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      // Home
      setSelectedDepartment(null);
      setSelectedYear(null);
      setSelectedSemester(null);
      setSelectedSubject(null);
      setBreadcrumbs([]);
    } else if (index === 0) {
      // Department selected
      setSelectedYear(null);
      setSelectedSemester(null);
      setSelectedSubject(null);
      setBreadcrumbs(breadcrumbs.slice(0, 1));
    } else if (index === 1) {
      // Year selected
      setSelectedSemester(null);
      setSelectedSubject(null);
      setBreadcrumbs(breadcrumbs.slice(0, 2));
    } else if (index === 2) {
      // Semester selected
      setSelectedSubject(null);
      setBreadcrumbs(breadcrumbs.slice(0, 3));
    }
  };

  const selectDept = (dept) => {
    setSelectedDepartment(dept);
    setBreadcrumbs([{ label: dept.name, id: dept.id }]);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    setBreadcrumbs([...breadcrumbs, { label: `Year ${year.number}`, id: year.id }]);
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
        <div className="flex items-center text-sm mb-8 text-gray-600 bg-white p-3 rounded shadow-sm">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className="hover:text-blue-600 font-medium px-2"
          >
            🏠 Home
          </button>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => handleBreadcrumbClick(idx)}
                className={`px-2 hover:text-blue-600 ${idx === breadcrumbs.length - 1 && !selectedSubject ? 'font-bold text-gray-800' : ''}`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}

          {selectedSubject && (
            <>
              <span className="text-gray-400">/</span>
              <span className="px-2 font-bold text-gray-800">{selectedSubject.name}</span>
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
          ) : !selectedYear ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Year</h2>
              <YearList departmentId={selectedDepartment.id} onSelect={selectYear} />
            </div>
          ) : !selectedSemester ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Semester</h2>
              <SemesterList yearId={selectedYear.id} onSelect={selectSem} />
            </div>
          ) : !selectedSubject ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Subject</h2>
              <SubjectList semesterId={selectedSemester.id} onSelect={selectSub} />
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <MaterialList subjectId={selectedSubject.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
