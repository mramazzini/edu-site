import React from "react";
import DashboardContainer from "../components/dashboard/DashboardComponent";
import Navbar from "../components/Navbar";
const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
