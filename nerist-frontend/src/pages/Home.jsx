import React, { useState } from "react";
import DepartmentList from "../components/DepartmentList";
import YearList from "../components/YearList";
import SemesterList from "../components/SemesterList";
import SubjectList from "../components/SubjectList";
import MaterialList from "../components/MaterialList";
import MaterialUpload from "../components/MaterialUpload";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!selectedDepartment ? (
        <DepartmentList onSelect={setSelectedDepartment} />
      ) : !selectedYear ? (
        <YearList departmentId={selectedDepartment.id} onSelect={setSelectedYear} />
      ) : !selectedSemester ? (
        <SemesterList yearId={selectedYear.id} onSelect={setSelectedSemester} />
      ) : !selectedSubject ? (
        <SubjectList semesterId={selectedSemester.id} onSelect={setSelectedSubject} />
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">
            ✅ {selectedDepartment.name} → Year {selectedYear.number} → Sem {selectedSemester.number} → {selectedSubject.name}
          </h2>
          <MaterialUpload
            subjectId={selectedSubject.id}
            onUploadSuccess={() => setRefresh(!refresh)}
          />
          <MaterialList subjectId={selectedSubject.id} key={refresh} />
        </>
      )}
    </div>
  );
};

export default Home;
