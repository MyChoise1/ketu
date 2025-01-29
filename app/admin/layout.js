import React from "react";
import Sidebar from "@/components/adminPanel/Sidebar"; // Import Sidebar
import "./layout.css"; // Separate CSS for layout styling

const Layout = ({ children }) => {
  return (
    <div className="admin-container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="admin-main">
        {children} {/* This will render Dashboard or other components */}
      </main>
    </div>
  );
};

export default Layout;
