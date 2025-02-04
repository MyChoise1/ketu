'use client'
import Layout from "@/components/layout/Layout"
import { useSelector } from "react-redux";
import { useState } from "react"
export default function Checkout() {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        country: 'India', // Default country
        zip: '',
        type: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create address');
            }

            const result = await response.json();
            setMessage(result.message || 'Address and billing details saved successfully');
            setFormData({
                address: '',
                city: '',
                state: '',
                country: 'India',
                zip: '',
                type: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            });
        } catch (error) {
            setMessage(error.message || 'An error occurred');
        }
    };

    const { cart } = useSelector((state) => state.shop) || {};
    const [shipping, setShipping] = useState(50.00);

    // Calculate Subtotal
    const subtotal = cart?.reduce((acc, item) => acc + item.qty * item.sell_price, 0) || 0;
    const total = subtotal + shipping;

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Chaeckout">
                <div>
                    <section className="checkout-area mt-4 pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                        <div className="container">
                            {/* <form action="#"> */}
                            <div className="row">
                                <div className="col-lg-6 mt-4 col-md-12">
                                    <div className="checkbox-form">
                                        <h3>Billing Details</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="country-select">
                                                        <label>Country <span className="required">*</span></label>
                                                        <select
                                                            name="country"
                                                            value={formData.country}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="India">India</option>
                                                            {/* Add more countries as needed */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>First Name <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Last Name <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Address <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            placeholder="Street address"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Town / City <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            placeholder="Town / City"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>State / County <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Postcode / Zip <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="zip"
                                                            value={formData.zip}
                                                            onChange={handleChange}
                                                            placeholder="Postcode / Zip"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Email Address <span className="required">*</span></label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Phone <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            minLength={10}
                                                            maxLength={10}
                                                            placeholder="Phone Number"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Address Type <span className="required">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="type"
                                                            value={formData.type}
                                                            onChange={handleChange}
                                                            placeholder="e.g., Home, Office"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        {message && <p>{message}</p>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="your-order mb-30 ">
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
                                                    {cart && cart.length > 0 ? (
                                                        cart.map((item) => (
                                                            <tr className="cart_item" key={item.id}>
                                                                <td className="product-name">
                                                                    {item.name} <strong className="product-quantity"> × {item.qty}</strong>
                                                                </td>
                                                                <td className="product-total">
                                                                    <span className="amount">₹{(item.qty * item.sell_price).toFixed(2)}</span>
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
                                                                    <input type="radio" name="shipping" checked={shipping === 50.00} onChange={() => setShipping(50.00)} />
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
                            {/* </form> */}
                        </div>
                    </section>
                </div>

            </Layout>
        </>
    )
}