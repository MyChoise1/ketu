'use client';
import React, { useEffect, useState } from 'react';
import './OrdersTable.css'; // Import external CSS file
import useFetchProducts from '@/components/fetch/useFetchProducts';
import useFetchUsers from '@/components/fetch/useFetchUsers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { products } = useFetchProducts();
    const { users } = useFetchUsers();
    const router = useRouter()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order'); // Adjust the API endpoint if necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Handle status update
    const handleStatusUpdate = async (orderId, field, value) => {
        try {
            const response = await fetch('/api/order', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    [field]: value,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            router.refresh();

            const updatedOrder = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, ...updatedOrder } : order
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="table-container">
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th>User Details</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.toReversed().map((order) => {
                        const productName = products.find(
                            (product) => product.id === order.orderItems[0]?.productId
                        )?.name || 'N/A';
                        
                        const pdtDate = (new Date(products[0].createdAt).toLocaleDateString()) || 'N/A'
                        
                        const userName = users.find(
                            (user) => user.id === order.userId
                        )?.username || 'N/A';

                        return (
                            <tr key={order.id}>
                                <td>{productName || 'N/A'}</td>
                                <td>{order.orderItems.reduce((total, item) => total + item.quantity, 0) || 'N/A'}</td>
                                <td>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            handleStatusUpdate(order.id, 'orderStatus', e.target.value)
                                        }
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={order.paymentStatus}
                                        onChange={(e) =>
                                            handleStatusUpdate(order.id, 'paymentStatus', e.target.value)
                                        }
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="PAID">PAID</option>
                                    </select>
                                </td>
                                <Link href={`/admin/users/${order.userId}`} className='icon-link'>
                                    <td style={{ backgroundColor: "#E85100", color: "white" }} className="rounded-3">{userName || 'N/A'}</td>
                                </Link>
                                <td>{pdtDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;