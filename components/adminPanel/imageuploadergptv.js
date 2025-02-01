"use client";
import React, { useState, useRef } from "react";
import "./ImageUploader.css"; // External CSS file

const ImageUploaderModal = ({ multimage, onClose, setBlobUrl }) => {
  const inputFileRef = useRef(null);
  const [fileImages, setFileImages] = useState([]); // Stores image files
  const [previews, setPreviews] = useState([]); // Stores preview URLs
  const [blob, setBlob] = useState(null); // Stores the uploaded blob data

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFileImages = Array.from(files);
      const newPreviews = newFileImages.map((file) => URL.createObjectURL(file));

      if (multimage) {
        setFileImages((prevFileImages) => [...prevFileImages, ...newFileImages]);
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      } else {
        setFileImages(newFileImages);
        setPreviews(newPreviews);
      }
    }
  };

  const uploadImage = async (file) => {
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (response.ok) {
        const newBlob = await response.json();
        setBlob(newBlob);
        if (setBlobUrl) setBlobUrl(newBlob.url); // Pass the blob URL to the parent component
        console.log("Image uploaded successfully:", newBlob);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCancel = (index) => {
    if (multimage) {
      setFileImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    } else {
      setFileImages([]);
      setPreviews([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fileImages.length) {
      alert("Please select an image first!");
      return;
    }

    for (const file of fileImages) {
      await uploadImage(file);
    }

    // Close the modal after successful upload
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="image-uploader-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h1>Upload Your Avatar</h1>
        <form onSubmit={handleSubmit}>
          <div className="upload-box">
            <label htmlFor="file-upload" className="upload-label">
              <img
                src="/placeholder-image-icon.png"
                alt="Upload"
                className="upload-icon"
              />
              <p><span className="browse-text">Browse</span> Image</p>
              <p className="file-format">Supports: JPG, JPEG2000, PNG</p>
            </label>
            <input
              id="file-upload"
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              multiple={multimage}
              required
            />
          </div>
          <button type="submit" className="upload-button">Upload</button>
        </form>
        
        {previews.length > 0 && (
          <div className="preview-container">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="image-preview"
                />
                <button className="cancel-button" onClick={() => handleCancel(index)}>X</button>
              </div>
            ))}
          </div>
        )}
        
        {blob && (
          <div className="blob-url">
            Blob URL: <a href={blob.url} target="_blank" rel="noopener noreferrer">{blob.url}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploaderModal;
