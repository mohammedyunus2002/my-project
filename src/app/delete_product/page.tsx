"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($deleteProductId: Int!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }
`;

export default function DeleteProduct() {
  const [id, setId] = useState('');

  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { deleteProductId: parseInt(id) }, // Corrected variable name
    onCompleted: (data) => {
      console.log("Deleted product successfully");
    },
    onError: (error) => {
      console.error('Delete product error:', error.message);
    },
  });

  const handleDeleteProduct = () => {
    deleteProduct();
  };

  return (
    <div className='bg-white p-4'>
      <div className="bg-white max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-black justify-center text-center">Delete Product</h2>
        <form className='justify-center items-center'>
          <div className="mb-4">
            <label htmlFor="product-id" className="block text-sm font-medium text-gray-600">ID:</label>
            <input
              type="text"
              id="product-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleDeleteProduct}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 block mx-auto" // Changed button color
            disabled={loading}
          >
            {loading ? 'Deleting product...' : 'Delete Product'}
          </button>
          {error && <p className="mt-2 text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
