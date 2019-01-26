import React from 'react';
import "./dashboard.css";

import AdminLayout from "../../hoc/adminLayout";

const dashboard = () => {

  const goToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        {goToTop()}
        This is your dashboard
      </div>
    </AdminLayout>
  );
};

export default dashboard;