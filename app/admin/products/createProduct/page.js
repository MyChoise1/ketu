"use client";
import React, { useState } from "react";
import "./CreateProductForm.css"; // External CSS file
import ImageUploaderModal from "@/components/adminPanel/ImageUploader";

const CreateProductForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        mrp: "",
        sell_price: "",
        thumbnail_one: "",
        thumbnail_two: "",
        other_images: "",
        sku: "",
        stock: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    other_images: formData.other_images.split(","), // Convert comma-separated string to array
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            const result = await response.json();
            alert(`Product Created Successfully! Product ID: ${result.product_id}`);
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
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input defaultValue={[]} type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mrp">MRP:</label>
                        <input defaultValue={[]} type="number" id="mrp" name="mrp" value={formData.mrp} onChange={handleChange} step="0.01" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sell_price">Sell Price:</label>
                        <input defaultValue={[]} type="number" id="sell_price" name="sell_price" value={formData.sell_price} onChange={handleChange} step="0.01" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="thumbnail_one">Thumbnail Image 1 URL:</label>
                        <input defaultValue={[]} type="url" id="thumbnail_one" name="thumbnail_one" value={formData.thumbnail_one} onChange={handleChange} />
                        {/* <button onClick={() => setIsModalOpen(true)}>Open Image Uploader</button>
                        {isModalOpen && (
                            <ImageUploaderModal
                                // multimage={true} // Allow multiple images
                                onClose={() => setIsModalOpen(false)}
                            />
                        )} */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="thumbnail_two">Thumbnail Image 2 URL:</label>
                        <input defaultValue={[]} type="url" id="thumbnail_two" name="thumbnail_two" value={formData.thumbnail_two} onChange={handleChange} />
                        {/* <ImageUploader /> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="other_images">
                            Other Images URLs:
                        </label>
                        <input defaultValue={[]} type="text" id="other_images" name="other_images" value={formData.other_images} onChange={handleChange} />
                        {/* <ImageUploader multimage={true} /> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="sku">SKU:</label>
                        <input defaultValue={[]} type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input defaultValue={[]} type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-button">
                        Create Product
                    </button>
                </form>
            </div>
        </>

    );
};

export default CreateProductForm;
