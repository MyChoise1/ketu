import Link from "next/link";

const ShopCard = ({ item, addToCart }) => {
    return (
        <div className="col">
            <div className="tpproduct tpproductitem mb-10 p-relative">
                {/* Product Thumbnail */}
                <div className="tpproduct__thumb">
                    <div className="tpproduct__thumbitem p-relative">
                        <Link href={`/shop/${item.id}`}>
                            <img
                                src={item.images.thumbnail[0]}
                                alt={`${item.name} - Primary`}
                                className="thumbitem-primary"
                                style={{ objectFit: "cover" }}
                            />
                            <img
                                src={item.images.thumbnail[1]}
                                alt={`${item.name} - Secondary`}
                                className="thumbitem-secondary"
                                style={{ objectFit: "cover" }}
                            />
                        </Link>
                        {/* Product Actions */}
                        <div className="tpproduct__thumb-bg">
                            <div className="tpproductactionbg">
                                <button
                                    onClick={() => addToCart(item.id)}
                                    className="add-to-cart"
                                    aria-label={`Add ${item.name} to cart`}
                                >
                                    <i className="fal fa-shopping-basket" />
                                </button>
                                <Link href={`/shop/${item.id}`} aria-label={`View details of ${item.name}`}>
                                    <i className="fal fa-eye" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Content */}
                <div className="tpproduct__content-area ps-2 pe-1 d-flex flex-column">
                    <h3 className="tpproduct__title mb-5">
                        <Link href={`/shop/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className="tpproduct__priceinfo d-flex align-items-center justify-content-between">
                        <div className="tpproduct__ammount">
                            <span>₹ {item.sell_price}.00</span>
                        </div>
                        <div className="tpproduct__rating">
                            <ul>
                                {[...Array(5)].map((_, index) => (
                                    <li key={index}>
                                        <Link href="#">
                                            <i className={index < 4 ? "fas fa-star" : "far fa-star"} />
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <span>(81)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Link href={`/checkout?produtid=${item.id}`}>
                            <button className="btn buy_btn w-100">Buy Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;