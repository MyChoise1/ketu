'use client';
import ImageUploaderModal from '@/components/adminPanel/ImageUploader';
import { useState } from 'react';
 
export default function AvatarUploadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageurl , setImageurl] = useState([]);
 
  return (
    <div>
    <button onClick={() => setIsModalOpen(true)}>Open Image Uploader</button>
    {isModalOpen && (
      <ImageUploaderModal
        multimage={true} // Allow multiple images
        onUploadedEnd={(bloburl) => {
          setImageurl(bloburl)
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
    )}
    <p>{imageurl.map(imageurl => {
      return <><a href={imageurl} >{imageurl}</a> <br /></>
    })
      }</p>
  </div>
 )
}