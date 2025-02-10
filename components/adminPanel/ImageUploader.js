"use client";
import React, { useState, useRef } from "react";
import "./ImageUploader.css";
import { put } from "@/libs/storage";

const ImageUploaderModal = ({ multimage, onUploadedEnd, onClose, video }) => {
  const inputFileRef = useRef(null);
  const [images, setImages] = useState([]); // Stores file objects
  const [previews, setPreviews] = useState([]); // Stores preview URLs
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imagesArray = Array.from(files);
      const previewURLs = imagesArray.map((file) => URL.createObjectURL(file));

      if (multimage) {
        setImages((prevImages) => [...prevImages, ...imagesArray]);
        setPreviews((prevPreviews) => [...prevPreviews, ...previewURLs]);
      } else {
        setImages(imagesArray);
        setPreviews(previewURLs);
      }
    }
  };

  const uploadImage = async (file) => {
    try {
      const response = await put(file.name, file);
      if (response.ok) {
        const newBlob = await response.json();
        return newBlob.data;
      } else {
        console.error("Error while uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCancel = (index) => {
    if (multimage) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    } else {
      setImages([]);
      setPreviews([]);
    }
  };

  const handleUpload = async () => {
    if (!images.length) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true); // Set loading to true before upload

    const data = await Promise.all(images.map((image) => uploadImage(image)));

    setLoading(false); // Set loading to false after upload

    if (data.length > 0) {
      onUploadedEnd(data.length === 1 ? data[0] : data);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="image-uploader-modal">
        <h1>Upload Your Avatar</h1>
        <button className="close-button" onClick={onClose} disabled={loading}>
          X
        </button>
        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <img
              src="/placeholder-image-icon.png"
              alt="Upload"
              className="upload-icon"
            />
            <p>
              <span className="browse-text">Browse</span> Image
            </p>
            <p className="file-format">Supports: JPG, JPEG2000, PNG</p>
          </label>
          <input
            id="file-upload"
            name="file"
            ref={inputFileRef}
            type="file"
            accept={`${video ? "video/*" : "image/*"}`}
            onChange={handleImageChange}
            className="file-input"
            multiple={multimage}
            required
          />
        </div>
        <button
          onClick={handleUpload}
          type="button"
          className="upload-button"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {previews.length > 0 && (
          <div className="preview-container">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="image-preview"
                />
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(index)}
                  disabled={loading} // Disable cancel button while uploading
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploaderModal;
