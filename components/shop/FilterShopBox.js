'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import ShopCard from "./ShopCard"
import ShopCardList from "./ShopCardList"
import useFetchProducts from "@/components/useFetchProducts"

const FilterShopBox = () => {
    const { products, loading, error } = useFetchProducts();


    const dispatch = useDispatch()

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }
    const addToWishlist = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addWishlist({ product: item }))
    }

    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const clearAll = () => {
        dispatch(addprice({ min: 0, max: 100 }))




        dispatch(clearCategory())
        dispatch(clearCategoryToggle())

        dispatch(clearColor())
        dispatch(clearColorToggle())

        dispatch(clearBrand())
        dispatch(clearBrandToggle())

        dispatch(addSort(""))
        dispatch(addPerPage({ start: 0, end: 0 }))
    }

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <>
            <div className="product-filter-content mb-40">
                <div className="tpsection mb-40">
                    <h4 className="tpsection__title">All <span> Products <img src="/assets/img/icon/title-shape-01.jpg" alt="" /></span></h4>
                </div>
            </div>

            <div className="row mb-50">
                <div className="col-lg-12">
                    <div className="tab-content" id="nav-tabContent">
                        <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                            {
                                products?.map((item, i) => (
                                    <Fragment key={i}>
                                        <ShopCardList item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                    </Fragment>
                                ))
                            }
                        </div>
                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct">
                                {
                                    products?.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterShopBox;
