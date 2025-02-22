"use client";
import React, { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import useFetchProducts from "@/components/fetch/useFetchProducts";
import "@/public/assets/css/new/ProductDetail.css";
import Preloader from "@/components/elements/Preloader";
import Link from "next/link";
import ImageUploaderModal from "@/components/adminPanel/ImageUploader";
import DeleteButton from "@/components/adminPanel/Deletebtn";
import { useRouter } from "next/navigation";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const [product, setProduct] = useState(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    sell_price: "",
    new_images: [],
    video: "",
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
          new_images: foundProduct.images.thumbnail || [],
          video: foundProduct.images.video,
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
        alert('Changes saved successfully');
        router.push('/admin/products');
      } else {
        alert(result.message || "Error updating product");
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
    <div className="tp-container">
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
            min="0"
          />

          <label>Sell Price:</label>
          <input
            type="number"
            name="sell_price"
            value={formData.sell_price}
            onChange={handleChange}
            required
            min="0"
          />

          <label>Product Image Top:</label>
          {formData.new_images && formData.new_images.length > 0 ? (
            <div className="other-images-container">
              {formData.new_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Other image ${index + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
          ) : (
            "No images"
          )}
          <button type="button" onClick={() => setIsModalOpen(true)}>
            Upload Image
          </button>

          {isModalOpen && (
            <ImageUploaderModal
              multimage={true}
              onUploadedEnd={(bloburl) => {
                setFormData((prev) => ({
                  ...prev,
                  new_images: [...bloburl],
                }));
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          {/* video */}
          <label>Product Video:</label>
          <input id="video" type="text" className="thumbnail_three" value={formData.video} style={{ width: '100%' }} />
          <button type="button" onClick={() => setIsModalOpen4(true)}>
            Upload Video
          </button>
          {isModalOpen4 && (
            <ImageUploaderModal
              onUploadedEnd={(bloburl) => {
                setFormData((prev) => ({
                  ...prev,
                  video: bloburl[0],
                }));
                setIsModalOpen4(false);
              }}
              video={true}
              onClose={() => setIsModalOpen4(false)}
            />
          )}

          {/* other images */}
          <label>Product Images All:</label>
          {formData.other_images.length > 0 ? (
            <div className="other-images-container">
              {formData.other_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Other image ${index + 1}`}
                  className="other_images"
                />
              ))}
            </div>
          ) : (
            "No images"
          )}
          <button type="button" onClick={() => setIsModalOpen5(true)}>
            Upload Images
          </button>
          {isModalOpen5 && (
            <ImageUploaderModal
              multimage={true}
              onUploadedEnd={(bloburls) => {
                setFormData((prev) => ({
                  ...prev,
                  other_images: [...prev.other_images, ...bloburls],
                }));
                setIsModalOpen5(false);
              }}
              onClose={() => setIsModalOpen5(false)}
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
            min="0"
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
    </div>
  );
};

export default ProductDetail;