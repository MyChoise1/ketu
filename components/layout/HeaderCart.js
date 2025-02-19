'use client'
import { addQty, deleteCart } from "@/features/shopSlice"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Scrollbars } from 'react-custom-scrollbars-2'

export default function HeaderCart({ isCartSidebar, handleCartSidebar }) {
    const { cart } = useSelector((state) => state.shop) || {}

    const dispatch = useDispatch()

    const handleDeleteCart = (id) => {
        dispatch(deleteCart(id))
    }

    let total = 0;
    cart?.forEach((item) => {
        const price = item.qty * item.sell_price;
        total = total + price;
    });
    return (
        <>
            <div className={`tpcartinfo tp-cart-info-area p-relative ${isCartSidebar ? "tp-sidebar-opened" : ""}`}>
                <button className="tpcart__close" onClick={handleCartSidebar}><i className="fal fa-times" /></button>
                <div className="tpcart">
                    <h4 className="tpcart__title">Your Cart</h4>
                    <div className="tpcart__product">
                        <div className="tpcart__product-list" style={{ overflowX: 'hidden' }}>
                            <Scrollbars style={{ width: 400, height: 470, }} autoHide>
                                <ul className="list-unstyled">
                                    {cart && cart.length > 0 ? (
                                        cart.map((item, i) => (
                                            <li key={i} className="mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="tpcart__img me-3">
                                                        <img
                                                            src={item.images.thumbnail[0] || ""}
                                                            alt="img"
                                                            className="rounded"
                                                            style={{ width: 70, height: 70 }}
                                                        />
                                                        <div
                                                            className="tpcart__del text-danger"
                                                            onClick={() => handleDeleteCart(item?.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <i className="far fa-times-circle" />
                                                        </div>
                                                    </div>
                                                    <div className="tpcart__content">
                                                        <span className="tpcart__content-title d-block fw-bold mb-1">
                                                            <Link href={`/shop/${item.id}`}>{item.name}</Link>
                                                        </span>
                                                        <div className="tpcart__cart-price">
                                                            <span className="quantity text-muted">{item?.qty} x </span>
                                                            <span className="new-price fw-bold text-dark">₹ {item.sell_price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="py-4">
                                            <p className="text-muted">Your cart is currently empty.</p>
                                        </li>
                                    )}
                                </ul>
                            </Scrollbars>
                        </div>
                        <div className="tpcart__checkout position-sticky bottom-0 bg-white mx-4">
                            <div className="bg-white tpcart__total-price d-flex justify-content-between align-items-center">
                                <span>Subtotal:</span>
                                <span className="heilight-price">₹{total.toFixed(2)}</span>
                            </div>
                            <div className="tpcart__checkout-btn mb-3">
                                <Link className="tpcart-btn mb-10" href="/cart" target="_parent">View Cart</Link>
                                <Link className="tpcheck-btn" href="/checkout" target="_parent">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`cartbody-overlay ${isCartSidebar ? "opened" : ""}`} onClick={handleCartSidebar} />
        </>
    )
};
