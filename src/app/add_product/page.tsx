"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PRODUCT_MUTATION = gql`
    mutation CreateProduct($name: String!, $price: Float!, $image: String!, $type: String!) {
    createProduct(name: $name, price: $price, image: $image, type: $type) {
        id
        image
        name
        price
        type
    }
    }
`;

export default function AddProduct() { 

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');

  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT_MUTATION, {
    variables: { name, price: parseFloat(price), image, type },
    onCompleted: (data) => {
      console.log('GraphQL response data:', data);
      console.log('Product added successfully:', data.createProduct);
    },
    onError: (error) => {
      console.error('Add product error:', error.message);
    },
  });

  const handleAddProduct = () => {
    console.log('Name:', name);
    console.log('Price:', price);
    console.log('Image:', image);
    console.log('Type:', type);
    addProduct(); 
  };

  return (
    <div className='bg-white p-4'>
      <div className="bg-white max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-black justify-center text-center">Add Product</h2>
        <form className='justify-center items-center'>
          <div className="mb-4">
            <label htmlFor="product-name" className="block text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-price" className="block text-sm font-medium text-gray-600">Price:</label>
            <input
              type="text" // Assuming price is a string
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-image" className="block text-sm font-medium text-gray-600">Image:</label>
            <input
              type="text" // Assuming image is a string
              id="product-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-image" className="block text-sm font-medium text-gray-600">Type:</label>
            <input
              type="text" // Assuming image is a string
              id="product-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 block mx-auto"
            disabled={loading}
          >
            {loading ? 'Adding product...' : 'Add Product'}
          </button>
          {error && <p className="mt-2 text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
