"use client";
import React from "react";
import "./sidebar.css"; // Separate CSS for sidebar styling
import Link from "next/link";
import { signOut } from "@/libs/helpers";
import { useRouter } from "next/navigation";

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
          <Link href="/admin/dashboard">
            <li className="nav-item">
              Dashboard
            </li>
          </Link>
          <Link href="/admin/products">
            <li className="nav-item">
              Products
            </li>
          </Link>
          <Link href="/admin/users">
            <li className="nav-item">
              Users
            </li>
          </Link>
          <Link href="/admin/dashboard">
            <li className="nav-item">
              Settings
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
