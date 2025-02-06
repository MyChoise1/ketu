'use client'
import Layout from "@/components/layout/Layout";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";

import useFetchProducts from "@/components/useFetchProducts"; 
import BillingDetailsForm from "@/components/layout/BillingDetailsForm";

export default function Checkout() {
    const { products, error } = useFetchProducts();
    const searchParams = useSearchParams();
    const pdtId = searchParams.get("produtid");

    const cart = pdtId 
        ? products.filter((item) => item.id === pdtId) 
        : useSelector((state) => state.shop.cart) || [];

    const [shipping, setShipping] = useState(50.00);

    // Calculate Subtotal
    const subtotal = cart.reduce((acc, item) => acc + (item.qty || 1) * item.sell_price, 0);
    const total = subtotal + shipping;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
            <div>
                <section className="checkout-area mt-4 pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                    <div className="container">
                        <div className="row">
                        <BillingDetailsForm />
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
                                                                <input type="radio" name="shipping" checked={shipping === 50} onChange={() => setShipping(50)} />
                                                                <label className="ms-1">Express: <span className="amount">₹50.00</span></label>
                                                            </li>
                                                            <li>
                                                                <input type="radio" name="shipping" checked={shipping === 0} onChange={() => setShipping(0)} />
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
                                            <button type="submit" className="tp-btn tp-color-btn w-100 banner-animation">Place order</button>
                                        </div>
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