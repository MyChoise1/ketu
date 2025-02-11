"use client";
import React, { useState } from "react";
import "./CreateProductForm.css"; // External CSS file
import ImageUploaderModal from "@/components/adminPanel/ImageUploader";
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
    const [openModal, setOpenModal] = useState(null); // Single state for modal management
    const router = useRouter();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.mrp || !formData.sell_price || !formData.sku || !formData.stock || !formData.description) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                if (!response.ok) {
                    const error = await response.json();

                    alert(error.message || "Failed to add database...");
                    return;
                }
            }

            const result = await response.json();
            confirm(`Product Created Successfully! Product ID: ${result.product_id}`);
            router.push('/admin/products');
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the product.");
        }
    };

    return (
        <>
            <h2 className="title">Create New Product</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    {/* MRP */}
                    <div className="form-group">
                        <label htmlFor="mrp">MRP:</label>
                        <input type="number" id="mrp" name="mrp" value={formData.mrp} onChange={handleChange} step="0.01" required />
                    </div>

                    {/* Sell Price */}
                    <div className="form-group">
                        <label htmlFor="sell_price">Sell Price:</label>
                        <input type="number" id="sell_price" name="sell_price" value={formData.sell_price} onChange={handleChange} step="0.01" required />
                    </div>

                    {/* Thumbnail One */}
                    <div className="form-group">
                        <label>Product Image Top:</label>
                        {formData.new_images.length > 0 ? (
                            <div className="other-images-container">
                                {formData.new_images.map((image, index) => (
                                    <img key={index} src={image} alt={`Thumbnail 1 - ${index + 1}`} className="thumbnail-img" />
                                ))}
                            </div>
                        ) : (
                            <p style={{ textAlign: "center" }}>No Image</p>
                        )}
                        <button className="upload-btn" type="button" onClick={() => setOpenModal("new_images")}>
                            Upload Image
                        </button>
                        {openModal === "new_images" && (
                            <ImageUploaderModal
                                multimage={true}
                                onUploadedEnd={(bloburl) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        new_images: [...bloburl],
                                    }))
                                    setOpenModal(false);
                                }}
                                onClose={() => setOpenModal(null)}
                            />
                        )}
                    </div>

                    {/* Video */}
                    <label>Product Video:</label>
                    <input id="video" type="text" className="video" value={formData.video} style={{ width: '100%' }} />
                    <button type="button" className="upload-btn" onClick={() => setOpenModal("video")}>
                        Upload Video
                    </button>
                    {openModal === "video" && (
                        <ImageUploaderModal
                            onUploadedEnd={(bloburl) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    video: bloburl[0],
                                }));
                                setOpenModal(false);
                            }}
                            onClose={() => setOpenModal(false)}
                        />
                    )}

                    {/* Other Images */}
                    <div className="form-group">
                        <label>Product Images All:</label>
                        {formData.other_images.length > 0 ? (
                            <div className="other-images-container">
                                {formData.other_images.map((image, index) => (
                                    <img key={index} src={image} alt={`Other Image ${index + 1}`} className="other-image" />
                                ))}
                            </div>
                        ) : (
                            <p style={{ textAlign: "center" }}>No Image</p>
                        )}
                        <button className="upload-btn" type="button" onClick={() => setOpenModal("other_images")}>
                            Upload Images
                        </button>
                        {openModal === "other_images" && (
                            <ImageUploaderModal
                                multimage={true}
                                onUploadedEnd={(bloburls) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        other_images: [...prev.other_images, ...bloburls],
                                    }));
                                    setOpenModal(false);
                                }}
                                onClose={() => setOpenModal(null)}
                            />
                        )}
                    </div>


                    {/* SKU */}
                    <div className="form-group">
                        <label htmlFor="sku">SKU:</label>
                        <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
                    </div>

                    {/* Stock */}
                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required style={{ minHeight: "150px" }} />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">Create Product</button>

                    {/* Cancel Button */}
                    <p className="cancel" onClick={() => router.push('/admin/products')}>
                        Cancel Create
                    </p>
                </form>
            </div>
        </>
    );
};

export default CreateProductForm;