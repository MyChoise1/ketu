"use client";
import React, { useState, useRef } from "react";
import "./ImageUploader.css"; // External CSS file

const ImageUploaderModal = ({ multimage, onClose, bloburl }) => {
  const inputFileRef = useRef(null);
  const [fileImages, setFileImages] = useState([]); // Stores image URLs
  const [previews, setPreviews] = useState([]); // Stores preview URLs
  const [blob, setBlob] = useState(null); // Stores the uploaded blob data

  const handleImageChange = async (e) => {
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

      // Upload images to the server
      for (const file of newFileImages) {
        await uploadImage(file);
      }
    }
  };

  const uploadImage = async (file) => {
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    if (response.ok) {
      const newBlob = await response.json();
      setBlob(newBlob);
      console.log("Image uploaded successfully:", newBlob);
    } else {
      console.error("Failed to upload image");
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

  return (
    <div className="modal-overlay">
      <div className="image-uploader-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h1>Upload Your Avatar</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];
            await uploadImage(file);
          }}
        >
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
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              multiple={multimage} // Enable multiple file selection if `multimage` is true
              required
            />
          </div>
          <button type="submit" 
          onClick={() => {
            setBlob(null)
            handleCancel()
          }}
          className="upload-button">
            Upload
          </button>
        </form>
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
        {blob && (
          <div className="blob-url">
            Blob url: <a href={blob.url}>{blob.url}</a>
            <span className="d-none">{bloburl = blob.url}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploaderModal;