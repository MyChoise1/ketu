import Link from "next/link"
const ShopCard = ({ item, addToCart, addToWishlist }) => {
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-10 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/shop/${item.id}`}>
                                <img src={item.images.thumbnail_one} alt="product-thumb" className="thumbitem-primary" />
                                <img className="thumbitem-secondary" src={item.images.thumbnail_one} alt="product-thumb" />
                            </Link>
                            <div className="tpproduct__thumb-bg">
                                <div className="tpproductactionbg">
                                    <a onClick={() => addToCart(item.id)} className="add-to-cart"><i className="fal fa-shopping-basket" /></a>
                                    <Link href={`/shop/${item.id}`}><i className="fal fa-eye" /></Link>
                                    <a onClick={() => addToWishlist(item.id)} className="wishlist" ><i className="fal fa-heart" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tpproduct__content-area ps-2 pe-1 d-flex flex-column">
                        <h3 className="tpproduct__title mb-5" style={{height: "32px"}} ><Link href={`/shop/${item.id}`}>{item.name}</Link></h3>
                        <div className="tpproduct__priceinfo d-flex align-items-center justify-content-between">
                            <div className="tpproduct__ammount">
                                <span>₹ {item.sell_price}.00</span>
                            </div>
                            <div className="tpproduct__rating">
                                <ul>
                                    <li>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="fas fa-star" /></Link>
                                        <Link href="#"><i className="far fa-star" /></Link>
                                    </li>
                                    <li>
                                        <span>(81)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard