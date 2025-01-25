'use client'
import Layout from "@/components/layout/Layout"
import useFetchProducts from "@/components/useFetchProducts"
import { addWishlist } from "@/features/wishlistSlice"
// import products from "@/data/products"
import { addCart, addQty } from "@/features/shopSlice"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
    spaceBetween: 25,
    autoplay: {
        delay: 3500,
    },
    breakpoints: {
        1400: {
            slidesPerView: 5,
        },
        1200: {
            slidesPerView: 5,
        },
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: '.tprelated__nxt',
        prevEl: '.tprelated__prv',
    },
}

const ShopSingleDynamicV1 = () => {
    const { id } = useParams();  // Get the 'id' from the URL params
    const { products, loading, error } = useFetchProducts();  // Fetch products using your custom hook

    const [activeIndex2, setActiveIndex2] = useState(4);
    const [activeIndex, setActiveIndex] = useState(1);

    const dispatch = useDispatch()

    // Find the specific product by ID from the fetched products
    const product = products?.find((item) => item.id === id);

    const handleOnClick2 = (index) => {
        setActiveIndex2(index);
    };

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }

    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    const qtyHandler = (id, qty) => {
        dispatch(addQty({ id, qty }));
    };

    const { cart } = useSelector((state) => state.shop) || {}
    // Loading state
    if (loading) return <p>Loading products...</p>;

    // Error state
    if (error) return <p>Error: {error}</p>;

    // If product doesn't exist or is still loading, show a fallback
    if (!product) return <p>Product not found or loading...</p>;

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Shop Details">
                <section className="product-area pt-80 pb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-12">
                                <div className="tpproduct-details__nab pr-50 mb-40">
                                    <div className="d-flex align-items-start">
                                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <button className={activeIndex2 === 4 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick2(4)}>
                                                <img src={`${product.image}`} alt="Front View" />
                                            </button>
                                            <button className={activeIndex2 === 5 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick2(5)}>
                                                <img src={`${product.image}`} alt="Back View" />
                                            </button>
                                        </div>
                                        <div className="tab-content" id="v-pills-tabContent">
                                            <div className={activeIndex2 === 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <img src={`${product.image}`} alt="Front View" style={{ maxHeight: '600px', width: 'auto' }} />
                                            </div>
                                            <div className={activeIndex2 === 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <img src={`${product.image}`} alt="Back View" style={{ maxHeight: '600px', width: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-7">
                                <div className="tpproduct-details__content">
                                    <div className="tpproduct-details__tag-area d-flex align-items-center mb-5">
                                        <span className="tpproduct-details__tag">Dryer</span>
                                        <div className="tpproduct-details__rating">
                                            <Link href="#"><i className="fas fa-star" /></Link>
                                            <Link href="#"><i className="fas fa-star" /></Link>
                                            <Link href="#"><i className="fas fa-star" /></Link>
                                        </div>
                                        <a className="tpproduct-details__reviewers">5 Reviews</a>
                                    </div>
                                    <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                                        <h3 className="tpproduct-details__title">{product?.name}</h3>
                                        <span className="tpproduct-details__stock">In Stock</span>
                                    </div>
                                    <div className="tpproduct-details__price mb-30">
                                        <del>₹{product?.mrp}</del>
                                        <span>₹{product?.sell_price}</span>
                                    </div>
                                    <div className="tpproduct-details__pera">
                                        <p>Priyoshop has brought to you the Hijab 3 Pieces Combo Pack PS23. It is a <br />completely modern design and you feel comfortable to put on this hijab. <br />Buy it at the best price.</p>
                                    </div>
                                    <div className="tpproduct-details__count d-flex align-items-center flex-wrap mb-25">
                                        <div className="product-quantity">
                                            <div className="item-quantity">
                                                <input
                                                    type="number"
                                                    className="qty"
                                                    name="qty"
                                                    defaultValue={1}
                                                    min={1}
                                                    onChange={(e) =>
                                                        qtyHandler(product?.id, e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="tpproduct-details__cart ml-20">
                                            <button onClick={() => addToCart(product.id)}><i className="fal fa-shopping-cart" /> Add To Cart</button>
                                        </div>
                                        <div className="tpproduct-details__wishlist ml-20">
                                            <button onClick={() => addToWishlist(product.id)}><i className="fal fa-heart" /></button>
                                        </div>
                                    </div>
                                    {/* <div className="tpproduct-details__information tpproduct-details__social">
                                            <p>Share:</p>
                                            <Link href="#"><i className="fab fa-facebook-f" /></Link>
                                            <Link href="#"><i className="fab fa-twitter" /></Link>
                                            <Link href="#"><i className="fab fa-behance" /></Link>
                                            <Link href="#"><i className="fab fa-youtube" /></Link>
                                            <Link href="#"><i className="fab fa-linkedin" /></Link>
                                        </div> */}
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-5">
                                <div className="tpproduct-details__condation">
                                    <ul>
                                        <li>
                                            <div className="tpproduct-details__condation-item d-flex align-items-center">
                                                <div className="tpproduct-details__condation-thumb">
                                                    <img src="/assets/img/icon/product-det-2.png" alt="" className="tpproduct-details__img-hover" />
                                                </div>
                                                <div className="tpproduct-details__condation-text">
                                                    <p>100% Stainless steel<br />Products</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="tpproduct-details__condation-item d-flex align-items-center">
                                                <div className="tpproduct-details__condation-thumb">
                                                    <img src="/assets/img/icon/product-det-3.png" alt="" className="tpproduct-details__img-hover" />
                                                </div>
                                                <div className="tpproduct-details__condation-text">
                                                    <p>1 Year free<br />Maintenance</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="product-setails-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="tpproduct-details__navtab mb-60">
                                    <div className="tpproduct-details__nav mb-30">
                                        <ul className="nav nav-tabs pro-details-nav-btn" id="myTabs" role="tablist">
                                            <li className="nav-item" onClick={() => handleOnClick(1)}>
                                                <button className={activeIndex == 1 ? "nav-links active" : "nav-links"}>Description</button>
                                            </li>
                                            <li className="nav-item" onClick={() => handleOnClick(2)}>
                                                <button className={activeIndex == 2 ? "nav-links active" : "nav-links"}>Product Images</button>
                                            </li>
                                            <li className="nav-item" onClick={() => handleOnClick(3)}>
                                                <button className={activeIndex == 3 ? "nav-links active" : "nav-links"}>Reviews (2)</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content tp-content-tab" id="myTabContent-2">
                                        <div className={activeIndex == 1 ? "tab-para tab-pane fade show active" : "tab-para tab-pane fade"}>
                                            <p className="mb-30">In marketing a product is an object or system made available for consumer use it is anything that can be offered to a market to satisfy the desire or need of a customer. In retailing, products are often referred to as
                                                merchandise, and in manufacturing, products are bought as raw materials and then sold as finished goods. A service is also regarded to as a type of product. Commodities are usually raw materials such as metals
                                                and agricultural products, but a commodity can also be anything widely available in the open market. In project management, products are the formal definition of the project deliverables that make up contribute
                                                to delivering the objectives of the project.</p>
                                            <p>A product can be classified as tangible or intangible. A tangible product is a physical object that can be perceived by touch such as a building, vehicle, gadget, or clothing. An intangible product is a product that
                                                can only be perceived indirectly such as an insurance policy. Services can be broadly classified under intangible products which can be durable or non durable. A product line is "a group of products that are
                                                closely related, either because they function in a similar manner, are sold to the same customer groups, are marketed through the same types of outlets, or fall within given price ranges."Many businesses offer a
                                                range of product lines which may be unique to a single organisation or may be common across the business's industry. In 2002 the US Census compiled revenue figures for the finance and insurance industry by
                                                various product lines such as "accident, health and medical insurance premiums" and "income from secured consumer loans.</p>
                                        </div>
                                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            {/* Images div */}
                                            <div className="d-flex justify-content-center height-200px h-50"> NO IMAGE </div>
                                        </div>
                                        <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            <div className="product-details-review">
                                                <h3 className="tp-comments-title mb-35">3 reviews for “Wide Cotton Tunic extreme hammer”</h3>
                                                <div className="latest-comments mb-55">
                                                    <ul>
                                                        <li>
                                                            <div className="comments-box d-flex">
                                                                <div className="comments-avatar mr-25">
                                                                    <img src="/assets/img/shop/reviewer-01.png" alt="" />
                                                                </div>
                                                                <div className="comments-text">
                                                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                                                        <div className="avatar-name">
                                                                            <b>Siarhei Dzenisenka</b>
                                                                            <div className="comments-date mb-20">
                                                                                <span>March 27, 2018 9:51 am</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="user-rating">
                                                                            <ul>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fal fa-star" /></Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <p className="m-0">This is cardigan is a comfortable warm classic piece. Great to layer with a light top and you can dress up or down given the jewel buttons. I'm 5'8” 128lbs a 34A and the Small fit fine.</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="comments-box d-flex">
                                                                <div className="comments-avatar mr-25">
                                                                    <img src="/assets/img/shop/reviewer-02.png" alt="" />
                                                                </div>
                                                                <div className="comments-text">
                                                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                                                        <div className="avatar-name">
                                                                            <b>Tommy Jarvis </b>
                                                                            <div className="comments-date mb-20">
                                                                                <span>March 27, 2018 9:51 am</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="user-rating">
                                                                            <ul>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fal fa-star" /></Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <p className="m-0">This is cardigan is a comfortable warm classic piece. Great to layer with a light top and you can dress up or down given the jewel buttons. I'm 5'8” 128lbs a 34A and the Small fit fine.</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="comments-box d-flex">
                                                                <div className="comments-avatar mr-25">
                                                                    <img src="/assets/img/shop/reviewer-03.png" alt="" />
                                                                </div>
                                                                <div className="comments-text">
                                                                    <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                                                        <div className="avatar-name">
                                                                            <b>Johnny Cash</b>
                                                                            <div className="comments-date mb-20">
                                                                                <span>March 27, 2018 9:51 am</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="user-rating">
                                                                            <ul>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                                                <li><Link href="#"><i className="fal fa-star" /></Link></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <p className="m-0">This is cardigan is a comfortable warm classic piece. Great to layer with a light top and you can dress up or down given the jewel buttons. I'm 5'8” 128lbs a 34A and the Small fit fine.</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="product-details-comment">
                                                    <div className="comment-title mb-20">
                                                        <h3>Add a review</h3>
                                                        <p>Your email address will not be published. Required fields are marked*</p>
                                                    </div>
                                                    <div className="comment-rating mb-20 d-flex">
                                                        <span>Overall ratings</span>
                                                        <ul>
                                                            <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                            <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                            <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                            <li><Link href="#"><i className="fas fa-star" /></Link></li>
                                                            <li><Link href="#"><i className="fal fa-star" /></Link></li>
                                                        </ul>
                                                    </div>
                                                    <div className="comment-input-box">
                                                        <form action="#">
                                                            <div className="row">
                                                                <div className="col-xxl-12">
                                                                    <div className="comment-input">
                                                                        <textarea placeholder="Your review..." />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxl-6">
                                                                    <div className="comment-input">
                                                                        <input type="text" placeholder="Your Name*" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxl-6">
                                                                    <div className="comment-input">
                                                                        <input type="email" placeholder="Your Email*" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xxl-12">
                                                                    <div className="comment-submit">
                                                                        <button type="submit" className="tp-btn pro-submit">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="related-product-area pt-65 pb-50 related-product-border">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <div className="tpsection mb-40">
                                    <h4 className="tpsection__title">Related Products</h4>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="tprelated__arrow d-flex align-items-center justify-content-end mb-40">
                                    <div className="tprelated__prv"><i className="far fa-long-arrow-left" /></div>
                                    <div className="tprelated__nxt"><i className="far fa-long-arrow-right" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-container related-product-active">
                            <Swiper {...swiperOptions}>
                                {products?.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <div className="tpproduct pb-15 mb-30">
                                            <div className="tpproduct__thumb p-relative">
                                                <Link href={`/shop/${product.id}`}>
                                                    <img
                                                        src={product.image} // Display the main product image
                                                        alt={product.name}
                                                        height={350}
                                                    />
                                                    {/* Assuming there's a secondary image */}
                                                    <img
                                                        className="product-thumb-secondary"
                                                        src={product.secondary_image} // Use a secondary image if available
                                                        alt=""
                                                        height={350}
                                                    />
                                                </Link>
                                                <div className="tpproduct__thumb-action">
                                                    <Link className="comphare" href="#"><i className="fal fa-exchange" /></Link>
                                                    <Link className="quckview" href="#"><i className="fal fa-eye" /></Link>
                                                    <Link className="wishlist" href="/wishlist"><i className="fal fa-heart" /></Link>
                                                </div>
                                            </div>
                                            <div className="tpproduct__content">
                                                <h3 className="tpproduct__title">
                                                    <Link href={`/shop-details/${product.id}`}>{product.name}</Link>
                                                </h3>
                                                <div className="tpproduct__priceinfo p-relative">
                                                    <div className="tpproduct__priceinfo-list">
                                                        <span>{`$${product.price}`}</span> {/* Assuming 'price' is part of product data */}
                                                    </div>
                                                    <div className="tpproduct__cart">
                                                        <Link href="/cart">
                                                            <i className="fal fa-shopping-cart" />Add To Cart
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ShopSingleDynamicV1
