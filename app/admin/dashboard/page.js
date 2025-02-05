import React from "react";
import "./dashboard.css";
import Sidebar from "@/components/adminPanel/Sidebar";

const Dashboard = () => {
  return (
    <div className="tp-container">
      {/* <Sidebar /> */}
      {/* Sidebar Component */}

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1 className="header-title">Overview</h1>
        </header>

        {/* Cards Section */}
        <div className="cards-grid">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$45,678</p>
          </div>
          <div className="card">
            <h3>Conversion Rate</h3>
            <p>3.2%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          <div className="chart">
            <h3>Sales Chart</h3>
          </div>
          <div className="chart">
            <h3>Revenue Chart</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
