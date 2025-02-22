'use client'
import React from "react";
import "@/public/assets/css/new/dashboard.css";
import useFetchUsers from "@/components/fetch/useFetchUsers";

const Dashboard = () => {
  const { users, error, loading } = useFetchUsers();

  if (loading) {
    return <p className="state">loading...</p>
  }

  if (error) {
    return <div className="state">Error: {error.message}</div>;
  }

  return (
    <div className="tp-container">

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1 className="header-title">Overview</h1>
        </header>

        {/* Cards Section */}
        <div className="cards-grid">
          <div className="card">
            <h3>Total Users</h3>
            <p className="dynamic">{users.length}</p>
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
