'use client';
import ImageUploaderModal from '@/components/adminPanel/imageuploadergptv';
import { useState } from 'react';
 
export default function AvatarUploadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <div>
    <button onClick={() => setIsModalOpen(true)}>Open Image Uploader</button>
    {isModalOpen && (
      <ImageUploaderModal
        multimage={true} // Allow multiple images
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </div>
 )
}