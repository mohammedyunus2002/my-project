"use client"
import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
}

interface CartData {
  getCart: {
    id: number;
    products: Product[];
  };
}

const GET_CART = gql`
  query Query($userId: Int!) {
    getCart(userId: $userId) {
      id
      products {
        id
        image
        name
        price
        type
      }
    }
  }
`;

const Cart = () => {
  // Replace 'userId' with the actual user ID from your application
  const userId = 1; // Example user ID, replace with your logic to get the user ID
  const { loading, error, data } = useQuery<CartData>(GET_CART, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const cart = data?.getCart;
  console.log(cart)

  return (
    <div>
      {cart ? (
        <>
          <h2>Shopping Cart</h2>
          {cart.products && cart.products.length > 0 ? (
            <ul>
              {cart.products.map((product: Product) => (
                <li key={product.id}>
                  {/* ... */}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </>
      ) : (
        <p>No cart found for the user.</p>
      )}
    </div>
  );
};

export default Cart;
