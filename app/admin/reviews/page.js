"use client";
import React from 'react'
import useFetchProducts from "@/components/fetch/useFetchProducts"; // Assuming this hook fetches products
import Preloader from "@/components/elements/Preloader";
import Link from "next/link";
import '../products/ProductList.css'

const reviews = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="tp-container">
      <div className="tp-row">
          {products.map((product) => (
            <Link href={`/admin/reviews/${product.id}`}>
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
        </div>
    </div>
  )
}

export default reviews;
