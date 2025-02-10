import { useRouter } from 'next/navigation';
import React from 'react';

const DeleteButton = ({ productId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      const data = await response.json();
      alert(data.message); // Show success message
      router.push('/admin/products');

    } catch (error) {
      alert(error.message || 'An error occurred while deleting the product');
    }
  };

  return (
  <>
    <p onClick={handleDelete} style={{ backgroundColor: 'red', width: '100%', color: 'white', marginTop: '10px', padding: '12px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      Delete
    </p>
    <i class="fa-regular fa-trash-can"></i>
  </>
  );
};

export default DeleteButton;