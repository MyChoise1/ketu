
'use client'
import FilterShopBox from "../shop/FilterShopBox"
import FilterShopBox2 from "../shop/FilterShopBox2"

export default function Product1() {

    return (
        <>
            <section className="product-area pt-95 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="tpsection mb-40">
                                <h4 className="tpsection__title">Popular <span> Products <img src="/assets/img/icon/title-shape-01.jpg" alt="" /></span></h4>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div>
                            <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                                <FilterShopBox2 itemStart={0} itemEnd={10} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
