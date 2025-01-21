'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
    },

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.slider-pagination',
        clickable: true,
    },

}

import Link from "next/link"

export default function Slider1() {
    return (
        <>
            <section className="slider-area">
                <div className="tpslider-banner">
                    <Link href="/shop-details">
                        <div className="tpslider-banner__img">
                            <img src="/assets/img/slider/banner-slider-02.jpg" alt="" />
                            <div className="tpslider-banner__content">
                                <span className="tpslider-banner__sub-title">Popular</span>
                                <h4 className="tpslider-banner__title">Energy with our <br /> newest
                                    collection</h4>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}
