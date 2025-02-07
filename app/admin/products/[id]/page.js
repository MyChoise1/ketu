"use client";
import React, { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import useFetchProducts from "@/components/useFetchProducts";
import "./ProductDetail.css"; // External CSS file
import Preloader from "@/components/elements/Preloader";
import Link from "next/link";
import ImageUploaderModal from "@/components/adminPanel/ImageUploader";
import DeleteButton from "@/components/adminPanel/Deletebtn";
import { useRouter } from "next/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const [product, setProduct] = useState(null);
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    sell_price: "",
    thumbnail_one: "",
    thumbnail_two: "",
    thumbnail_three: "",
    other_images: [],
    sku: "",
    stock: "",
    description: "",
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id.toString() === id);
      if (foundProduct) {
        console.log("Found Product", foundProduct);
        setProduct(foundProduct);
        setFormData({
          name: foundProduct.name,
          mrp: foundProduct.mrp,
          sell_price: foundProduct.sell_price,
          thumbnail_one: foundProduct.images.thumbnail_one,
          thumbnail_two: foundProduct.images.thumbnail_two,
          thumbnail_three: foundProduct.images.thumbnail_three,
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
        confirm('Changes saved successfully');
        router.push('/admin/products');
      } else {
        confirm(result.message || "Error updating product");
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
          <img
            type="url"
            id="thumbnail_one"
            className="thumbnail_one"
            src={formData.thumbnail_one}
            onChange={handleChange}
            required
            disabled
          />
          <button type="button" onClick={() => setIsModalOpen(true)}>
            Upload Image
          </button>
          {isModalOpen && (
            <ImageUploaderModal
              onUploadedEnd={(bloburl) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail_one: bloburl,
                }));
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          <label>Thumbnail Two:</label>
          <img
            type="url"
            id="thumbnail_two"
            className="thumbnail_two"
            src={formData.thumbnail_two}
            onChange={handleChange}
            required
            disabled
          />
          <button type="button" onClick={() => setIsModalOpen2(true)}>
            Upload Image
          </button>
          {isModalOpen2 && (
            <ImageUploaderModal
              onUploadedEnd={(bloburl) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail_two: bloburl,
                }));
                setIsModalOpen2(false);
              }}
              onClose={() => setIsModalOpen2(false)}
            />
          )}

          <label>Thumbnail Three:</label>
          <img
            type="url"
            id="thumbnail_three"
            className="thumbnail_three"
            src={formData.thumbnail_three}
            onChange={handleChange}
            disabled
          />
          <button type="button" onClick={() => setIsModalOpen3(true)}>
            Upload Image
          </button>
          {isModalOpen3 && (
            <ImageUploaderModal
              onUploadedEnd={(bloburl) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail_three: bloburl,
                }));
                setIsModalOpen3(false);
              }}
              onClose={() => setIsModalOpen3(false)}
            />
          )}

          <label>Other Images:</label>
          <input
            type="text"
            id="other_images"
            className="other_images"
            src={formData.other_images}
            disabled
          />
          <button type="button" onClick={() => setIsModalOpen4(true)}>
            Upload Images
          </button>
          {isModalOpen4 && (
            <ImageUploaderModal
              multimage={true}
              onUploadedEnd={(bloburls) => {
                setFormData((prev) => ({
                  ...prev,
                  other_images: [...prev.other_images, ...bloburls],
                }));
                setIsModalOpen4(false);
              }}
              onClose={() => setIsModalOpen4(false)}
            />
          )}

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
        <DeleteButton productId={product.id} />
      </div>
    </>
  );
};

export default ProductDetail;