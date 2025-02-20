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
    const router = useRouter();
    const [refresh, setRefrest] = useState(0);

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
    }, [refresh]);

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

            setRefrest((pre) => pre + 1)

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
                        <th>Total</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th>User Details</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.toReversed().map((order) => {
                        const userName = users.find(
                            (user) => user.id === order.userId
                        )?.username || 'N/A';

                        return (
                            <React.Fragment key={order.id}>
                                {order.orderItems.map((item, index) => {
                                    const productName = products.find(
                                        (product) => product.id === item.productId
                                    )?.name || 'N/A';

                                    return (
                                        <tr key={item.id}>
                                            <td>{productName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.total}</td>
                                            {index === 0 && ( // Only show these columns once per order
                                                <>
                                                    <td rowSpan={order.orderItems.length}>
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
                                                    <td rowSpan={order.orderItems.length}>
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
                                                    <td rowSpan={order.orderItems.length}>
                                                        <Link href={`/admin/users/${order.userId}`} className='icon-link'>
                                                            <td style={{ backgroundColor: "rgb(54 78 101)", color: "white" }} className="rounded-3">{userName}</td>
                                                        </Link>
                                                    </td>
                                                    <td rowSpan={order.orderItems.length}>
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;