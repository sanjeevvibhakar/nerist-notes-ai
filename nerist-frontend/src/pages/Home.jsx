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
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Modern Hero / Header */}
        {!selectedDepartment && (
          <div className="mb-20 text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6">
              Empowering <span className="text-blue-600">Learning</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore a curated library of notes, PYQs, and practicals tailored for your academic success at NERIST.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <div className="px-6 py-2 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-200">
                400+ Subjects
              </div>
              <div className="px-6 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                AI Powered
              </div>
            </div>
          </div>
        )}

        {/* Breadcrumbs with Glassmorphism */}
        <div className="glass sticky top-24 z-50 mb-12 flex items-center gap-2 p-2 rounded-2xl overflow-x-auto no-scrollbar border-white/50">
          <button
            onClick={() => handleBreadcrumbClick(-1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!selectedDepartment ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-blue-600 hover:bg-white'}`}
          >
            🏠 Home
          </button>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <div className="text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </div>
              <button
                onClick={() => handleBreadcrumbClick(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${idx === breadcrumbs.length - 1 && !selectedSubject ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-blue-600 hover:bg-white'}`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}

          {selectedSubject && (
            <>
              <div className="text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </div>
              <span className="px-4 py-2 bg-blue-600 text-white shadow-lg rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                {selectedSubject.subject_name}
              </span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="transition-all duration-500 ease-in-out">
          {!selectedDepartment ? (
            <div className="animate-fade-in-up">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Browse Catalog</h2>
                  <h3 className="text-3xl font-black text-gray-900">Departments</h3>
                </div>
              </div>
              <DepartmentList onSelect={selectDept} />
            </div>
          ) : !selectedSemester ? (
            <div className="animate-fade-in-up">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">{selectedDepartment.name}</h2>
                  <h3 className="text-4xl font-black text-gray-900">Which Semester?</h3>
                </div>
                <button onClick={() => handleBreadcrumbClick(-1)} className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Cancel
                </button>
              </div>
              <SemesterList departmentId={selectedDepartment.id} onSelect={selectSem} />
            </div>
          ) : !selectedSubject ? (
            <div className="animate-fade-in-up">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-2">Semester {selectedSemester.number}</h2>
                  <h3 className="text-4xl font-black text-gray-900 font-mono italic underline decoration-blue-500 underline-offset-8">Subjects</h3>
                </div>
                <button onClick={() => handleBreadcrumbClick(0)} className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Back
                </button>
              </div>
              <SubjectList semesterId={selectedSemester.id} onSelect={selectSub} />
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
                  <svg className="w-48 h-48 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {selectedDepartment.name}
                        </span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                          Semester {selectedSemester.number}
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{selectedSubject.subject_name}</h2>
                    </div>
                    <button onClick={() => handleBreadcrumbClick(1)} className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-gray-100 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                      Switch Subject
                    </button>
                  </div>
                  <MaterialList offeringId={selectedSubject.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">NERIST Study Portal • Designed for Excellence</p>
      </footer>
    </div>
  );
};

export default Home;
