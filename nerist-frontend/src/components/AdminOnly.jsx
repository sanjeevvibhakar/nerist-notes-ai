// components/AdminOnly.jsx
import React from 'react';
import { getUser } from '../utils/auth';

const AdminOnly = ({ children }) => {
  const user = getUser();

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center p-6 text-red-600 font-semibold">
        ⛔ Access Denied. Admins only.
      </div>
    );
  }

  return children;
};

export default AdminOnly;
