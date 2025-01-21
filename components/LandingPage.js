'use client'
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Product1 from "@/components/sections/Product1";
import Slider3 from "@/components/sections/Slider3";
import Slider1 from "@/components/sections/Slider1";

import React from 'react'

const LandingPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 750);
        };

        // Initial check
        handleResize();

        // Add event listener for resize
        window.addEventListener("resize", handleResize);
        
        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                {isMobile ? <Slider3 /> : <Slider3 />}
                <Product1 />
            </Layout>
        </>
    );
}

export default LandingPage;
