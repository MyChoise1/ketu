import React from "react";
import Sidebar from "@/components/adminPanel/Sidebar"; // Import Sidebar
import "./layout.css"; // Separate CSS for layout styling

const Layout = ({ children }) => {
  return (
    <div className="admin-container">
      <Sidebar />
      
      <main className="admin-main">
        {children} 
      </main>
    </div>
  );
};

export default Layout;
