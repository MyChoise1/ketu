'use client'
import { addCart } from "@/features/shopSlice"
import { Fragment } from "react"
import { useDispatch } from "react-redux"
import ShopCard from "./ShopCard"
import useFetchProducts from "@/components/fetch/useFetchProducts"
import Preloader from "../elements/Preloader"

const FilterShopBox = () => {
    const { products, loading, error } = useFetchProducts();


    const dispatch = useDispatch()

    const addToCart = (id) => {
        const item = products?.find((item) => item.id === id)
        dispatch(addCart({ product: item }))
    }

    if (loading) return <Preloader />;
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
                        <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 tpproduct">
                            {
                                products?.map((item, i) => (
                                    <Fragment key={i}>
                                        <ShopCard item={item} addToCart={addToCart} />
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterShopBox;
