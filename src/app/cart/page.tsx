"use client"
import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { checkoutBillState } from '../../store/recoilState';

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

const REMOVE_FROM_CART = gql`
  mutation DeleteCartProduct($userId: Int!, $productId: Int!) {
    deleteCartProduct(userId: $userId, productId: $productId) {
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

export default function CartPage() {
  const router = useRouter();
  const isClient = typeof window !== 'undefined';
  const userId = isClient ? localStorage.getItem("userId") : null;
  const parsedUserId = userId ? parseInt(userId, 10) : 0;
  let cartTotal: number = 0;
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});
  const { loading, error, data } = useQuery<CartData>(GET_CART, {
    variables: { userId: parsedUserId },
  });
  
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART, variables: { userId: parsedUserId } }],
  });

  const [checkoutBill, setCheckoutBill] = useRecoilState(checkoutBillState);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  const cart = data?.getCart;

  if (cart && cart.products && cart.products.length > 0) {
    cartTotal = cart.products.reduce((total, product) => {
      return total + ((quantities[product.id] || 0) * product.price);
    }, 0);
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };



  const handleRemoveFromCart = (productId: number) => {
    removeFromCart({
      variables: { userId: parsedUserId, productId },
    });
  };

  const handleProceed = (total: string | number) => {
    setCheckoutBill(cartTotal);
    router.push("/checkout");  
  }

  return (
    <div>
      <div className='bg-green-300 p-20'>
        <h1 className='text-7xl text-slate-150'>Cart</h1>
      </div>

      <div className='bg-white text-black p-60'>
        <h3 className='font-bold text-xl inline ml-10 mt-5 mr-24'>Image</h3>
        <h3 className='font-bold text-xl inline mr-36'>Name</h3>
        <h3 className='font-bold text-xl inline mr-36'>Price</h3>
        <h3 className='font-bold text-xl inline mr-36'>Quantity</h3>
        <h3 className='font-bold text-xl inline'>Remove</h3>

        <div className="mt-10 bg-black h-1 mb-10"></div>

        {cart && cart.products && cart.products.length > 0 ? (
        <ul>
          {cart.products.map((product: Product) => (
            <li key={product.id} className="flex items-center mt-5">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mr-8 ml-5" />
              <p className="text-xl w-48 overflow-hidden mr-8 ml-3">{product.name}</p>
              <p className="text-xl w-20 ml-7">₹{product.price}</p>
              <div className="flex items-center ml-28">
                <button
                  onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) - 1)}
                  className="bg-gray-300 px-2 py-1 rounded-full mr-2"
                >
                  -
                </button>
                <span className="text-xl">{quantities[product.id] || 0}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 0) + 1)}
                  className="bg-gray-300 px-2 py-1 rounded-full ml-2"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-full ml-48"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
        <div className='absolute right-28'>
          <h3 className='mr-48 mt-16 text-3xl'>Cart Totals</h3>
          <div className="mt-2 bg-black h-1 mb-2"></div>
          <p className="text-xl">Total: ₹{cartTotal.toFixed(2)}</p>
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 mb-10"
          onClick={() => handleProceed(cartTotal)}  
          >
          Proceed to Checkout
        </button>
      </div>
      </div>
    </div>
  );
}
