'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./UserDetail.css"; // Import external CSS

export default function UserDetail() {
    const { userId } = useParams(); // Get user ID from URL params
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="user-container">
            <h2 className="user-title">User Addresses</h2>
            {addresses.map((address) => (
                <div key={address.id} className="user-card">
                    <p><strong>Name:</strong> {address.first_name} {address.last_name}</p>
                    <p><strong>Phone:</strong> {address.phone}</p>
                    <p><strong>Address:</strong> {address.address}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Country:</strong> {address.country}</p>
                    <p><strong>ZIP Code:</strong> {address.zip}</p>
                    <p><strong>Type:</strong> {address.type}</p>
                </div>
            ))}
        </div>
    );
}
