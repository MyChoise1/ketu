"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useFetchProducts from "@/components/useFetchProducts";
import ImageUploader from "@/components/adminPanel/UploadImage"; // Import the ImageUploader component
import "./ProductDetail.css"; // External CSS file
import Preloader from "@/components/elements/Preloader";
import Link from "next/link";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    sell_price: "",
    thumbnail_one: "",
    thumbnail_two: "",
    other_images: [],
    sku: "",
    stock: "",
    description: "",
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setFormData({
          name: foundProduct.name,
          mrp: foundProduct.mrp,
          sell_price: foundProduct.sell_price,
          thumbnail_one: foundProduct.images.thumbnail_one,
          thumbnail_two: foundProduct.images.thumbnail_two,
          other_images: foundProduct.images.other || [],
          sku: foundProduct.sku,
          stock: foundProduct.stock,
          description: foundProduct.description,
        });
      }
    }
  }, [products, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (name, images) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: images,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setUpdateStatus("Product Updated Successfully");
      } else {
        setUpdateStatus(result.message || "Error updating product");
      }
    } catch (error) {
      console.error(error);
      setUpdateStatus("An error occurred");
    }
  };

  if (loading) return <Preloader />;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!product) return <div className="error-message">Product not found.</div>;

  return (
    <>
      <div className="product-top">
        <h2 className="title">Edit Product : </h2>
        <Link href="/admin/products/createProduct">
          <p className="add_btn">New Product</p>
        </Link>
      </div>

      <div className="product-detail-container">
        {updateStatus && <div className="update-status">{updateStatus}</div>}
        <form onSubmit={handleSubmit} className="product-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>MRP:</label>
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            required
          />

          <label>Sell Price:</label>
          <input
            type="number"
            name="sell_price"
            value={formData.sell_price}
            onChange={handleChange}
            required
          />

          <label>Thumbnail One:</label>
          <button>Upload Image</button>
          <label>Thumbnail Two:</label>
          <ImageUploader
            name="thumbnail_two"
            onImageUpload={(images) =>
              handleImageUpload("thumbnail_two", images[0])
            }
          />

          <label>Other Images:</label>
          <ImageUploader
            name="other_images"
            multimage={true}
            onImageUpload={(images) =>
              handleImageUpload("other_images", images)
            }
          />

          <label>SKU:</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />

          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default ProductDetail;
