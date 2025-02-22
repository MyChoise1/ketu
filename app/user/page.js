'use client'
import React, { useEffect, useState } from "react";
import "@/public/assets/css/new/UserProfile.css"; // External CSS file
import useFetchProducts from "@/components/fetch/useFetchProducts";
import Layout from "@/components/layout/Layout";
import Preloader from "@/components/elements/Preloader";

const UserProfile = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { products } = useFetchProducts();
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => setActiveIndex(index);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, userRes] = await Promise.all([
                    fetch("/api/order"),
                    fetch("/api/user")
                ]);

                if (!ordersRes.ok || !userRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const ordersData = await ordersRes.json();
                const userData = await userRes.json();

                setOrders(ordersData.orders || []);
                setUser(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return<Preloader />;
    if (error) return <div className="error">Error: {error}</div>;
    if (!user) return <div className="error">User not found</div>;

    const userOrders = orders.filter((order) => order.userId === user.id);

    // Correct filtering logic
    const filteredOrders = activeIndex === 1
        ? userOrders.filter((order) => order.orderStatus !== "DELIVERED")
        : userOrders.filter((order) => order.orderStatus === "DELIVERED");

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Your Orders">
            <div className="tpproduct-details__nav mb-30">
                <ul className="nav nav-tabs pro-details-nav-btn mt-4" id="myTabs" role="tablist">
                    <li className="nav-item" onClick={() => handleOnClick(1)}>
                        <button className={activeIndex === 1 ? "nav-links active" : "nav-links"}>
                            <span className="nav-text">Current Orders</span>
                        </button>
                    </li>
                    <li className="nav-item" onClick={() => handleOnClick(2)}>
                        <button className={activeIndex === 2 ? "nav-links active" : "nav-links"}>
                            <span className="nav-text">Orders History</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="tab-content tp-content-tab">
                <div className={activeIndex === 1 ? "tab-para tab-pane fade show active" : "tab-para tab-pane fade"}>
                    <OrdersList orders={filteredOrders} products={products} />
                </div>
                <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <OrdersList orders={filteredOrders} products={products} />
                </div>
            </div>
        </Layout>
    );
};

// Reusable component for displaying orders
const OrdersList = ({ orders, products }) => {
    return (
        <div className="user-profile">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="me-4">
                            <h4>Order:</h4>
                            <p><strong>Status:</strong> <span className="text-primary fw-bold">{order.orderStatus}</span></p>
                            <p><strong>Payment:</strong> <span className="text-primary">{order.paymentStatus}</span></p>
                            <p><strong>Total:</strong> <span className="text-primary">₹{order.total.toFixed(2)}</span></p>
                        </div>
                        <div>
                            <h4>Items:</h4>
                            <ul>
                                {order.orderItems.map((item) => {
                                    const product = products.find((p) => p.id === item.productId);
                                    return (
                                        <li key={item.id}>
                                            <p><strong>Product ID:</strong> {item.productId}</p>
                                            <p><strong>Product Name:</strong> {product ? product.name : "Product not found"}</p>
                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                            <p><strong>Subtotal:</strong> ₹{item.total.toFixed(2)}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserProfile;
