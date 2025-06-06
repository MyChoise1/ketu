'use client'
import Layout from "@/components/layout/Layout"
import useFetchProducts from "@/components/fetch/useFetchProducts"
import { addCart, addQty } from "@/features/shopSlice"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Preloader from "@/components/elements/Preloader"
import useFetchActive from "@/components/fetch/useFetchActive"
import ReviewForm from "@/components/reviews/ReviewForm"
import ReviewsList from "@/components/reviews/ReviewsList"

const ShopSingleDynamicV1 = () => {
    const { id } = useParams();  // Get the 'id' from the URL params
    const { products, loading, error } = useFetchProducts();  // Fetch products using your custom hook
    const { user } = useFetchActive();

    const [activeIndex2, setActiveIndex2] = useState(0);
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

    const qtyHandler = (id, qty) => {
        dispatch(addQty({ id, qty }));
    };


    if (loading) return <Preloader />

    if (error) return <p>Error: {error}</p>;

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
                                        <div className="nav flex-column nav-pills me-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            {product.images.thumbnail && product.images.thumbnail.map((value, index) => (
                                                <button
                                                    key={index}
                                                    className={activeIndex2 === index ? "nav-link active" : "nav-link"}
                                                    onClick={() => handleOnClick2(index)}
                                                >
                                                    <img src={value} alt={`Thumbnail ${index + 1}`} className="product_display-preview" />
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handleOnClick2(product.images.thumbnail.length)}
                                            >
                                                <video src={product.images.video} className="product_display-preview" alt="video" muted />
                                            </button>
                                        </div>
                                        <div className="tab-content" id="v-pills-tabContent">
                                            {[...product.images.thumbnail, product.images.video].map((value, index) => (
                                                <div
                                                    key={index}
                                                    className={activeIndex2 === index ? "tab-pane fade show active" : "tab-pane fade"}
                                                >
                                                    {value && value.match(/\.(mp4|mov|avi|mkv|webm|flv|wmv|mpeg|mpg|3gp|m4v)$/i) ? (
                                                        <video src={value} className="product_display-video" controls />
                                                    ) : (
                                                        <img src={value} alt={`Product Image ${index + 1}`} className="product_display" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-7">
                                <div className="tpproduct-details__content">
                                    <div className="tpproduct-details__tag-area d-flex align-items-center mb-5">
                                        <span className="tpproduct-details__tag">{product.category}</span>
                                        <div className="tpproduct-details__rating">
                                            {[...Array(5)].map((_, i) => (
                                                <Link key={i} href="#"><i className="fas fa-star" /></Link>
                                            ))}
                                        </div>
                                        <a className="tpproduct-details__reviewers">5 Reviews</a>
                                    </div>
                                    <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                                        <h3 className="tpproduct-details__title">{product.name}</h3>
                                        <span className="tpproduct-details__stock">In Stock</span>
                                    </div>
                                    <div className="tpproduct-details__price mb-30">
                                        <del>₹{product.mrp}</del>
                                        <span>₹{product.sell_price}</span>
                                    </div>
                                    <div className="tpproduct-details__actions">
                                        <div className="tpproduct-details__quantity">
                                            <div className="product-quantity">
                                                <div className="item-quantity">
                                                    <input
                                                        type="number"
                                                        className="qty"
                                                        name="qty"
                                                        defaultValue={1}
                                                        min={1}
                                                        max={10}
                                                        onChange={(e) => qtyHandler(product.id, e.target.value)}
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="tpproduct-details__cart-btn" onClick={() => addToCart(product.id)}>
                                            Add to cart
                                        </button>
                                        <Link href={`/checkout?produtid=${product.id}`}>
                                            <button className="tpproduct-details__buy-btn">
                                                Buy it now
                                            </button>
                                        </Link>
                                    </div>
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
                                                <button className={activeIndex == 3 ? "nav-links active" : "nav-links"}>Reviews</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content tp-content-tab" id="myTabContent-2">
                                        <div className={activeIndex == 1 ? "tab-para tab-pane fade show active" : "tab-para tab-pane fade"}>
                                            {product.description.length > 0 ?
                                                <p className="description_sec">{product.description}</p> :
                                                <p>No Description</p>}
                                        </div>
                                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            {product.images.other.length > 0 ? (
                                                <div className="related_product">
                                                    {product.images.other.map((image, index) => (
                                                        <img key={index} src={image} alt={`Product Image ${index + 1}`} className="img-fluid" />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-center height-200px h-50"> NO IMAGE </div>
                                            )}
                                        </div>
                                        <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            <div className="product-details-review">
                                                <ReviewsList productId={product.id} />
                                                {user.id &&
                                                <ReviewForm product_id={product.id} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container py-4">
                    <div className="tpsection mb-40">
                        <h4 className="tpsection__title">Related Products</h4>
                    </div>
                    <div className="row g-4 row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                        {products?.filter(p => p.id !== id).slice(0, 4).map((product) => (
                            <div key={product.id} className="col-md-6 p-2">
                                <Link href={`/shop/${product.id}`}>
                                    <div className="card product-card">
                                        <div className="position-relative">
                                            <img src={product.images.thumbnail[0]} alt="No Image" className="card-img-top product-image" />
                                        </div>
                                        <div className="tpproduct__content-area ps-1 pe-1 mb-4 d-flex flex-column">
                                            <h3 className="tpproduct__title mb-5">{product.name}</h3>
                                            <div className="tpproduct__priceinfo d-flex align-items-center justify-content-between">
                                                <div className="tpproduct__ammount">
                                                    <span>₹ {product.sell_price}.00</span>
                                                </div>
                                                <div className="tpproduct__rating">
                                                    <ul>
                                                        {[...Array(5)].map((_, i) => (
                                                            <li key={i}>
                                                                <Link href="#"><i className={i < 4 ? "fas fa-star" : "far fa-star"} /></Link>
                                                            </li>
                                                        ))}
                                                        <li>
                                                            <span>(81)</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div>
                                                <Link href={`/checkout?produtid=${product.id}`}><button className="btn buy_btn">Buy Now</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ShopSingleDynamicV1;
