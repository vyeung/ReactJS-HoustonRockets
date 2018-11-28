import React from 'react';
import "./dashboard.css";

import AdminLayout from "../../hoc/adminLayout";

const dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard">
        This is your dashboard
      </div>
    </AdminLayout>
  );
};

export default dashboard;