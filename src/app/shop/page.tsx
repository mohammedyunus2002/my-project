"use client"
import { useQuery, gql, useMutation } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from '@apollo/client/utilities/globals';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';



export default function shop() {
    if (__DEV__) {  // Adds messages only in a dev environment
        loadDevMessages();
        loadErrorMessages();
      }

      const [selectedCategory, setSelectedCategory] = useState<string>('sofas');
      const [searchTerm, setSearchTerm] = useState<string>('');
    
    return (
        <div>
            <div className='bg-white p-11'>
                <div>
                    <div className='absolute top-28 right-40 flex items-center'>
                        <input 
                            type="text"
                            name="search bar"
                            className='py-2 px-4 w-80 border border-gray-600 rounded-full focus:outline-none focus:border-blue-500 bg-white text-black'
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className='ml-2 cursor-pointer text-gray-500' />
                    </div>
                    <div className='absolute top-28 left-32 text-black border border-gray-500'>
                    <select 
                    name="furniture" 
                    id="furniture"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="sofas">Sofas</option>
                        <option value="beds">Beds</option>
                        <option value="dining">Dining</option>
                        <option value="wardrobde">Wardrobe</option>
                        <option value="recliners">Recliners</option>
                        <option value="coffe_table">Coffe table</option>
                        <option value="bookshelv">Bookshelv</option>
                        <option value="seating">Seating</option>
                        <option value="light_bulb">Light bulb</option>
                    </select>
                    </div>
                </div>
                <div className='mt-28'>
                <DisplayProducts selectedCategory={selectedCategory} searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    )
}

interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    type: string;
  }

  const Get_Products = gql`
      query Query {
        getAllProducts {
          id
          image
          name
          price
          type
        }
      }
    `;

  const Add_To_Cart = gql `
    mutation Mutation($cartId: Int!, $productId: Int!) {
      addToCart(cartId: $cartId, productId: $productId) {
        id
        products {
          id
          name
          image
          price
          type
        }
      }
    }
  `

  interface DisplayProductsProps {
    selectedCategory: string;
    searchTerm: string;
  }
  function DisplayProducts({ selectedCategory, searchTerm }: DisplayProductsProps) {
    const isClient = typeof window !== 'undefined';
    const userId = isClient ? localStorage.getItem("userId") : null;
    const parsedUserId = userId ? parseInt(userId, 10) : 0;
    const cartId = isClient ? localStorage.getItem("cartId") : null;
    const parsedCartId = cartId ? parseInt(cartId, 10) : 0;
    
    const { loading, error, data } = useQuery<{ getAllProducts: Product[] }>(Get_Products);
    const [addToCart, { data: cartData, loading: cartLoading, error: cartError }] = useMutation(Add_To_Cart);

  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAddToCart = async (cartId: number, productId: number) => {
      try {
        const { data } = await addToCart({
          variables: { cartId, productId  },
        });
    
        console.log('Data from addToCart mutation:', data);
        
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
    
    
    const filteredProducts = data?.getAllProducts?.filter((product) => {
      if (searchTerm) {
        return (
          product.type.toLowerCase() === selectedCategory.toLowerCase() &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return product.type.toLowerCase() === selectedCategory.toLowerCase();
      }
    });
  
    return (
      <div className='mt-8 flex flex-wrap '>
        {filteredProducts?.map(({ id, name, price, image, type }: Product) => (
          <div key={id} className='flex flex-col items-center justify-center text-black relative group mx-4 my-4'>
            <img
              className='w-64 h-64 object-cover transition-transform transform group-hover:scale-105'
              alt="product-reference"
              src={image} // Update here
            />
            <h3 className='text-xl mt-2'>{name}</h3>
            <p className='mt-1'>{type}</p>
            <p className='mt-1'>₹{price}</p>
            <button 
            className="absolute bottom-0 right-10 mr-10 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-700"
            onClick={() => handleAddToCart(parsedCartId, id)}
            >
              <FaPlus />
            </button>
          </div>
        ))}
      </div>
    );
  }
  