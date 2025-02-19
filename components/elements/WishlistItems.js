'use client'
import { addCart } from "@/features/shopSlice"
import { addQty, deleteWishlist } from "@/features/wishlistSlice"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import useFetchProducts from "../fetch/useFetchProducts"
import Preloader from "./Preloader"

const WishlistItems = () => {
    const { wishlist = [] } = useSelector((state) => state.wishlist) || {};
    const { products, loading, error } = useFetchProducts();
    const dispatch = useDispatch()

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id);
        if (item) {
            dispatch(addCart({ product: item }));
        }
    }

    const deleteCartHandler = (id) => {
        dispatch(deleteWishlist(id));
    }

    const qtyHandler = (id, qty) => {
        dispatch(addQty({ id, qty }));
    }

    if (loading) return <Preloader />;
    if (error) return <p>Error: {error.message || error}</p>;

    return (
        <>
            {wishlist.map((item) => (
                <tr className="cart-item" key={item.id}>
                    <td className="product-thumbnail">
                        <Link href={`/shop/${item.id}`}>
                            <img
                                src={`${item.images.thumbnail[0]}`} alt="cart added product" />
                        </Link>
                    </td>

                    <td className="product-name">
                        <Link href={`/shop/${item.id}`}>
                            {item.name}
                        </Link>
                    </td>

                    <td className="product-price">${item.sell_price}</td>

                    <td className="product-quantity">
                        <div className="item-quantity">
                            <input
                                type="number"
                                className="qty"
                                name="qty"
                                value={item?.qty || 1}
                                min={1}
                                onChange={(e) =>
                                    qtyHandler(item.id, e.target.value)
                                }
                            />
                        </div>
                    </td>

                    <td className="product-subtotal">
                        <span className="amount">
                            ${(item.qty * item.sell_price).toFixed(2)}
                        </span>
                    </td>
                    <td className="product-add-to-cart">
                        <a onClick={() => addToCart(item.id)} className="tp-btn tp-color-btn  tp-wish-cart banner-animation">Add To Cart</a>
                    </td>
                    <td className="product-remove">
                        <button
                            onClick={() => deleteCartHandler(item.id)}
                            className="remove"
                        >
                            <span className="flaticon-dustbin">Remove</span>
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default WishlistItems;
