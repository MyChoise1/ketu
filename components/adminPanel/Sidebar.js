import React from "react";
import "./sidebar.css"; // Separate CSS for sidebar styling
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span>Dashboard</span>
        <span className="admin-label">Admin</span>
      </div>
      <nav className="">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/dashboard">Reports</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/dashboard">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
