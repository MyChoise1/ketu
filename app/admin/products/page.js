"use client";
import React from "react";
import "./ProductList.css"; // External CSS file
import useFetchProducts from "@/components/fetch/useFetchProducts"; // Assuming this hook fetches products
import Preloader from "@/components/elements/Preloader";
import Link from "next/link";
import ImageUploader from "@/components/adminPanel/ImageUploader";

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <>

      <div className="tp-container">
        <div className="product-top">
          <h2 className="title">Edit Product : </h2>
          <Link href="/admin/products/createProduct">
            <p className="add_btn">New Product</p>
          </Link>
        </div>
        <div className="tp-row">
          {products.map((product) => (
            <Link href={`/admin/products/${product.id}`}>
              <div key={product.id} className="tp-col">
                <div className="product-card">
                  <img
                    className="product-image"
                    src={product.images.thumbnail[0]}
                    alt="No Image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">
                      ₹{product.sell_price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* <ImageUploader multimage /> */}
        </div>
      </div>
    </>
  );
};

export default ProductList;
