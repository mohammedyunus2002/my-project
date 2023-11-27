"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client'; 
import { useRouter } from 'next/navigation';

const LOGIN_CHECK_QUERY = gql`
  query LoginQuery($loginUsername: String!, $loginPassword: String!) {
    login(username: $loginUsername, password: $loginPassword) {
      token
      user {
        id
        password
        username
        email
      }
    }
  }
`;

const CREATE_CART = gql `
  mutation CreateCart($userId: Int!) {
    createCart(userId: $userId) {
      id
      user {
        id
      }
    }
  }
`;

const GET_CART = gql`
  query GetCart($userId: Int!) {
    getCart(userId: $userId) {
      id
      products {
        image
        name
        price
        type
        id
      }
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [createCart] = useMutation(CREATE_CART);
  
  const { data, loading, error } = useQuery(LOGIN_CHECK_QUERY, {
    variables: { loginUsername, loginPassword },
    skip: !loginUsername || !loginPassword,
  });

  const { data: cartData, loading: cartLoading, error: cartError } = useQuery(GET_CART, {
    variables: { userId: data?.login.user?.id || 0 },
    skip: !data?.login.user,
  });

  
  const handleLogin = async () => {
    if (data?.login.user) {
      console.log('Login successful:', data.login);
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login.user.id);
      try {
        // Check if the user already has a cart
        const existingCart = cartData?.getCart;
  
        if (!existingCart) {
          // If the user doesn't have a cart, create a new one
          const createCartResult = await createCart({
            variables: { userId: parseInt(localStorage.getItem("userId")!) },
          });
          
        }
        localStorage.setItem("cartId", cartData?.getCart?.id);
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('User does not exist');
    }
  };  

  return (
    <div className='bg-white p-4'>
      <div className="bg-white max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-black justify-center text-center">Login</h2>
        <form className='justify-center items-center'>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              id="loginUsername"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="loginPassword"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 block mx-auto"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="mt-2 text-red-500">{error.message}</p>}
          <p className='mt-3 text-black'>Not a member? <Link href="/signup" className='text-blue-500'>Signup</Link></p>
        </form>
      </div>
    </div>
  );
}
