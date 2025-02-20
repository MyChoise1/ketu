'use client';
import Layout from "@/components/layout/Layout";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import useFetchProducts from "@/components/fetch/useFetchProducts";
import BillingDetailsForm from "@/components/layout/BillingDetailsForm";

export default function Checkout() {
    const { products, error } = useFetchProducts();
    const searchParams = useSearchParams();
    const pdtId = searchParams.get("produtid");
    const Selector = useSelector((state) => state.shop.cart) || [];
    const route = useRouter()

    const cart = pdtId
        ? products.filter((item) => item.id === pdtId)
        : Selector;

    // const [shipping, setShipping] = useState(0);    
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [details, setDetails] = useState(false);

    // Calculate Subtotal
    const subtotal = cart.reduce((acc, item) => acc + (item.qty || 1) * item.sell_price, 0);
    const total = subtotal;

    // Prepare products data for the API
    const prepareProductsData = () => {
        return cart.map((item) => ({
            id: item.id,
            quantity: item.qty || 1,
            total: (item.qty || 1) * item.sell_price,
        }));
    };

    // Handle Place Order Button Click
    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        setOrderError(null);
        setOrderSuccess(false);

        try {
            const productsData = prepareProductsData();

            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ products: productsData }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            const data = await response.json();
            setOrderSuccess(true);
            confirm("Order created successfully:", data);
            route.replace('/user')
        } catch (error) {
            setOrderError(error.message);
            return confirm("Error placing order:", error);
        } finally {
            setIsPlacingOrder(false);
        }
    };
    console.log(details)

    if (error) return <div>Error: {error.message}</div>;

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
            <div>
                <section className="checkout-area mt-4 pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                    <div className="container">
                        <div className="row">
                            <BillingDetailsForm isEditing={details} setIsEditing={setDetails} />
                            <div className="col-lg-6 col-md-12">
                                <div className="your-order mb-30">
                                    <h3>Your Order</h3>
                                    <div className="your-order-table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.length > 0 ? (
                                                    cart.map((item) => (
                                                        <tr className="cart_item" key={item.id}>
                                                            <td className="product-name">
                                                                {item.name} <strong className="product-quantity"> x {item.qty || 1}</strong>
                                                            </td>
                                                            <td className="product-total">
                                                                <span className="amount">₹{((item.qty || 1) * item.sell_price).toFixed(2)}</span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center text-muted">Your cart is empty.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr className="cart-subtotal">
                                                    <th>Cart Subtotal</th>
                                                    <td><span className="amount">₹{subtotal.toFixed(2)}</span></td>
                                                </tr>
                                                <tr className="shipping">
                                                    <th>Shipping</th>
                                                    <td>
                                                        <ul>
                                                            <li>
                                                                <input type="radio" name="shipping" />
                                                                <label className="ms-1">Free Shipping</label>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>Order Total</th>
                                                    <td><strong><span className="amount">₹{total.toFixed(2)}</span></strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="payment-method">
                                        <div className="order-button-payment mt-20">
                                            {details ? cart.length > 0 ? (
                                                <button
                                                    type="submit"
                                                    className="tp-btn tp-color-btn w-100 banner-animation"
                                                    onClick={handlePlaceOrder}
                                                    disabled={isPlacingOrder}
                                                >
                                                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                                                </button>
                                            ) : (
                                                <button disabled className="btn-secondary w-100" style={{ height: "50px" }}>No Order</button>
                                            ):
                                            <button disabled className="btn-secondary w-100" style={{ height: "50px" }}>Fill the Billing Details to place order</button>
                                            }
                                        </div>
                                        {orderError && <p className="text-danger mt-2">{orderError}</p>}
                                        {orderSuccess && <p className="text-success mt-2">Order placed successfully!</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}