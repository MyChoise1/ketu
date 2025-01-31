"use client";
import React, { useState } from "react";
import "./ImageUploader.css"; // External CSS file

const ImageUploader = ({ multimage }) => {
  const [fileImages, setFileImages] = useState([]); // Stores image URLs
  const [previews, setPreviews] = useState([]); // Stores preview URLs

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFileImages = Array.from(files);
      const newPreviews = newFileImages.map((file) =>
        URL.createObjectURL(file)
      );

      if (multimage) {
        // If multiple images are allowed, append to the existing images
        setFileImages((prevFileImages) => [
          ...prevFileImages,
          ...newFileImages.map((file) => URL.createObjectURL(file)),
        ]);
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      } else {
        // If only a single image is allowed, replace the existing image
        setFileImages([URL.createObjectURL(newFileImages[0])]);
        setPreviews([newPreviews[0]]);
      }
    }
  };

  const handleCancel = (index) => {
    if (multimage) {
      // Remove the specific image and preview
      setFileImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    } else {
      // Clear the single image and preview
      setFileImages([]);
      setPreviews([]);
    }
  };
  console.log(fileImages);

  return (
    <div className="image-uploader">
      <div className="upload-box">
        <label htmlFor="file-upload" className="upload-label">
          <img
            src="/placeholder-image-icon.png"
            alt="Upload"
            className="upload-icon"
            defaultValue={[]}
          />
          <p>
            <span className="browse-text">Browse</span> Image{" "}
          </p>
          <p className="file-format">Supports: JPG, JPEG2000, PNG</p>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
          multiple={multimage} // Enable multiple file selection if `multimage` is true
        />
      </div>
      {previews.length > 0 && (
        <div className="preview-container">
          {previews.map((preview, index) => (
            <div key={index} className="preview-item">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="image-preview"
                defaultValue={[]}
              />
              <button
                className="cancel-button"
                onClick={() => handleCancel(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
