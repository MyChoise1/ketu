"use client";
import React, { useState } from "react";
import "./CreateProductForm.css"; // External CSS file
import ImageUploaderModal from "@/components/adminPanel/ImageUploader";
import { useRouter } from "next/navigation";

const CreateProductForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);

    const router = useRouter();
    const onChange = () => {
        router.push('/admin/products');
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                throw new Error("Failed to create product");
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
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mrp">MRP:</label>
                        <input type="number" id="mrp" name="mrp" value={formData.mrp} onChange={handleChange} step="0.01" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sell_price">Sell Price:</label>
                        <input type="number" id="sell_price" name="sell_price" value={formData.sell_price} onChange={handleChange} step="0.01" required />
                    </div>

                    {/* Thumbnail 1 */}
                    <div className="form-group">
                        <label>Thumbnail Image 1:</label>
                        {formData.thumbnail_one ? <img src={formData.thumbnail_one} alt="Thumbnail 1" className="thumbnail-img" /> : <p style={{ textAlign: "center" }}>No Image</p>}
                        <button className="upload-btn" type="button" onClick={() => setIsModalOpen(true)}>Upload Image</button>
                        {isModalOpen && (
                            <ImageUploaderModal
                                onUploadedEnd={(bloburl) => {
                                    setFormData((prev) => ({ ...prev, thumbnail_one: bloburl }));
                                    setIsModalOpen(false);
                                }}
                                onClose={() => setIsModalOpen(false)}
                            />
                        )}
                    </div>

                    {/* Thumbnail 2 */}
                    <div className="form-group">
                        <label>Thumbnail Image 2:</label>
                        {formData.thumbnail_two ? <img src={formData.thumbnail_two} alt="Thumbnail 2" className="thumbnail-img" /> : <p style={{ textAlign: "center" }}>No Image</p>}
                        <button className="upload-btn" type="button" onClick={() => setIsModalOpen2(true)}>Upload Image</button>
                        {isModalOpen2 && (
                            <ImageUploaderModal
                                onUploadedEnd={(bloburl) => {
                                    setFormData((prev) => ({ ...prev, thumbnail_two: bloburl }));
                                    setIsModalOpen2(false);
                                }}
                                onClose={() => setIsModalOpen2(false)}
                            />
                        )}
                    </div>

                    {/* Thumbnail 3 */}
                    <div className="form-group">
                        <label>Thumbnail Image 3:</label>
                        {formData.thumbnail_three ? <img src={formData.thumbnail_three} alt="Thumbnail 3" className="thumbnail-img" /> : <p style={{ textAlign: "center" }}>No Image</p>}
                        <button className="upload-btn" type="button" onClick={() => setIsModalOpen3(true)}>Upload Image</button>
                        {isModalOpen3 && (
                            <ImageUploaderModal
                                onUploadedEnd={(bloburl) => {
                                    setFormData((prev) => ({ ...prev, thumbnail_three: bloburl }));
                                    setIsModalOpen3(false);
                                }}
                                onClose={() => setIsModalOpen3(false)}
                            />
                        )}
                    </div>

                    {/* Other Images */}
                    <div className="form-group">
                        <label>Other Images:</label>
                        {formData.other_images.length > 0 ?
                            <div className="other-images-container">
                             {formData.other_images.map((image, index) => (
                                <img key={index} src={image} alt={`Other image ${index + 1}`} className="other-image" />
                                ))}
                            </div> :
                            <p style={{ textAlign: "center" }}>No Image</p>}
                        <button className="upload-btn" type="button" onClick={() => setIsModalOpen4(true)}>Upload Images</button>
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="sku">SKU:</label>
                        <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required style={{ minHeight: "150px" }} />
                    </div>

                    <button type="submit" className="submit-button">Create Product</button>
                    <p className="cancel" onClick={() => onChange()}>Cancel Create</p>
                </form>
            </div>
        </>
    );
};

export default CreateProductForm;
