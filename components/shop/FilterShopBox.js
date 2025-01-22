'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import products from "../../data/products"
import {
    addPerPage,
    addSort,
    addprice,
    clearBrand,
    clearCategory,
    clearColor,
} from "../../features/filterSlice"
import {
    clearBrandToggle,
    clearCategoryToggle,
    clearColorToggle,
} from "../../features/productSlice"
import ShopCard from "./ShopCard"
import ShopCardList from "./ShopCardList"

const FilterShopBox = () => {
    const { shopList, shopSort } = useSelector((state) => state.filter)
    const {
        price,

        category,
        color,
        brand,
    } = shopList || {}

    const { sort, perPage } = shopSort

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

    // location filter
    const priceFilter = (item) =>
        item?.price?.min >= price?.min && item?.price?.max <= price?.max

    // product-type filter



    // product-type filter
    const categoryFilter = (item) =>
        category?.length !== 0 && item?.category !== undefined ? category?.includes(item?.category[0]?.type.toLocaleLowerCase().split(" ").join("-")) : item

    // product-type filter
    const colorFilter = (item) =>
        color?.length !== 0 && item?.color !== undefined ? color?.includes(item?.color[0]?.type.toLocaleLowerCase().split(" ").join("-")) : item

    // product-type filter
    const brandFilter = (item) =>
        brand?.length !== 0 && item?.brand !== undefined ? brand?.includes(item?.brand[0]?.type.toLocaleLowerCase().split(" ").join("-")) : item

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1

    let content = products
        ?.filter(priceFilter)

        ?.filter(categoryFilter)
        ?.filter(colorFilter)
        ?.filter(brandFilter)
        ?.sort(sortFilter).slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)?.map((item, i) => (
            <Fragment key={i}>
                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} activeIndex={activeIndex} handleOnClick={handleOnClick} />
            </Fragment>
            // End all products
        ))

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value))
    }

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value)
        dispatch(addPerPage(pageData))
    }

    // clear all filters
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
                                products
                                    ?.sort(sortFilter).slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)?.map((item, i) => (
                                        <Fragment key={i}>
                                            <ShopCardList item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                        </Fragment>
                                        // End all products
                                    ))
                            }
                        </div>
                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct">
                                {
                                    products
                                        ?.sort(sortFilter).slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)?.map((item, i) => (
                                            <Fragment key={i}>
                                                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
                                            </Fragment>
                                            // End all products
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

export default FilterShopBox
