'use client'
import { addCart } from "@/features/shopSlice"
import { addWishlist } from "@/features/wishlistSlice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetchProducts from "@/components/useFetchProducts"
// import products from "../../data/products"
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

const FilterShopBox2 = ({ itemStart, itemEnd }) => {
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
    
    let content = products.slice(itemStart, itemEnd)
    ?.map((item, i) => (
        <Fragment key={i}>
                <ShopCard item={item} addToCart={addToCart} addToWishlist={addToWishlist} />
            </Fragment>
            // End all products
        ))
        
        
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
        
        if (loading) return <p>Loading products...</p>;
        if (error) return <p>Error: {error}</p>;
        
        return (
            <>
            {content}

        </>
    )
}


export default FilterShopBox2
