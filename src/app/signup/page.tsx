"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'

const SIGNUP_MUTATION = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    id
    password
    username
    email
  }
}
`;

export default function Signup() {
  const router = useRouter()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: { username, password, email }, // Corrected password variable here
    onCompleted: (data) => {
    // Log the entire data object to inspect its structure
    console.log('GraphQL response data:', data);

    // Handle successful signup
    console.log('Signed up successfully:', data.createUser);
    // Use the correct key: data.insert_users.returning[0]
    const user = data.createUser;
    console.log('User details:', user);
    router.push("/login");
    },
    onError: (error) => {
      // Handle signup error
      console.error('Signup error:', error.message);
    },
  });
  const handleSignup = () => {
    // Call the signup mutation
    console.log('Signup values:', { username, password, email });

    signup();
  };

  return (
    <div className='bg-white p-4'>
      <div className="bg-white max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-black justify-center text-center">Signup</h2>
        <form className='justify-center items-center'>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 block mx-auto"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          {error && <p className="mt-2 text-red-500">{error.message}</p>}
          <p className='mt-3 text-black'>Already a member? <Link href="/login" className='text-blue-500'>Login</Link></p>
        </form>
      </div>
    </div>
  );
}