"use client";

import React from "react";
import "./sidebar.css"; // Separate CSS for sidebar styling
import Link from "next/link";
import { signOut } from "@/libs/helpers";
import { redirect, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="sidebar">
      <div className="logo">
        <span>Dashboard</span>
        <span
          onClick={() =>
            signOut(() => {
              router.refresh();
            })
          }
          // className="admin-label"
        >
          Logout
        </span>
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
