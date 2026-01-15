// src/pages/SubjectMaterialPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialList from "../components/MaterialList";
import SmartUploadForm from "../components/SmartUploadForm";

const SubjectMaterialPage = ({ subjectId }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/status/", { withCredentials: true })
      .then((res) => {
        setIsAdmin(res.data.is_admin);
      })
      .catch((err) => {
        console.error("Admin check failed", err);
        setIsAdmin(false);
      });
  }, []);

  return (
    <div className="p-4">
      {isAdmin && (
        <SmartUploadForm
          subjectId={subjectId}
          onUploadSuccess={() => console.log("Uploaded")}
        />
      )}
      <MaterialList subjectId={subjectId} />
    </div>
  );
};

export default SubjectMaterialPage;
