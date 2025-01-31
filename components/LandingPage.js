"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Product1 from "@/components/sections/Product1";
import Slider3 from "@/components/sections/Slider3";

import React from "react";

import Banner4 from "./sections/Banner4";
import Preloader from "./elements/Preloader";
import Faq from "@/components/layout/FAQ";

const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMounted(true);

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

  if (!isMounted) {
    return <Preloader />;
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        {isMobile ? <Banner4 /> : <Slider3 />}
        <Product1 />
        <Faq />
      </Layout>
    </>
  );
};

export default LandingPage;
