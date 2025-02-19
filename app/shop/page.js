'use client'
import Layout from "@/components/layout/Layout"
import FilterShopBox from "@/components/shop/FilterShopBox"
import { useState } from "react"
export default function Shop() {
    const [activeIndex, setActiveIndex] = useState(2)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Shop">
                <div className="product-filter-area pt-65 pb-80">
                    <div className="container">
                        <FilterShopBox itemStart={0} itemEnd={10} />
                    </div>
                </div>
            </Layout>
        </>
    )
}