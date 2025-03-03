'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./UserDetail.css"; // Import external CSS
import useFetchUsers from "@/components/fetch/useFetchUsers";

export default function UserDetail() {
    const { userId } = useParams(); // Get user ID from URL params
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const {users} = useFetchUsers();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/admin/user/${userId}`); // Fetch user address from API
                if (!response.ok) {
                    throw new Error("Failed to fetch user addresses");
                }
                const data = await response.json();
                setAddresses(data);
            } catch (error) {
                console.error("Error fetching user addresses:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) {
        return <p className="loading">Loading user details...</p>;
    }

    if (!addresses.length) {
        return <p className="error">No address found for this user.</p>;
    }

    const userEmail = users.find(user => user.id === userId);

    return (
        <div className="user-container">
            <h2 className="user-title">User Addresses</h2>
            {addresses.map((address) => (
                <div key={address.id} className="user-card">
                    <p><strong>Name:</strong> {address.first_name || "N/A"} {address.last_name || "N/A"}</p>
                    <p><strong>Phone:</strong> {address.phone || "N/A"}</p>
                    <p><strong>Address:</strong> {address.address || "N/A"}</p>
                    <p><strong>City:</strong> {address.city || "N/A"}</p>
                    <p><strong>State:</strong> {address.state || "N/A"}</p>
                    <p><strong>Country:</strong> {address.country || "N/A"}</p>
                    <p><strong>ZIP Code:</strong> {address.zip || "N/A"}</p>
                    <p><strong>Type:</strong> {address.type || "N/A"}</p>
                    <p><strong>email:</strong> {userEmail ? userEmail.email : "no email"}</p>
                </div>
            ))}
        </div>
    );
}
