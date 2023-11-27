"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import logo from "./Images/logo-no-background.png"
import { Providers } from '../../components/Providers'
import Image from 'next/image'
import user from "./Images/user.png"
import cart from "./Images/cart.png"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import sofa from "./Images/sofa.png"
import mail from "./Images/mail.png"
import { useRouter } from 'next/navigation';
import logout from "./Images/logout.png";
import { useEffect, useState } from 'react'
import { FaTelegramPlane } from "react-icons/fa";
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const router = useRouter();
  const pathname = usePathname()
  

  const isLoggedIn = () => {
    if (typeof window !== 'undefined') {
      const isToken = localStorage.getItem("token");
      return isToken !== null;
    }
    return false;
  };

  

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
    router.refresh();
  };

  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <div>
            <div className='bg-green-300 00 p-12 flex'>
              <div className='absolute top-10 left-10'>
                <Link href="/">
                    <Image 
                      src={logo}
                      alt="logo"   
                      width={100}
                      height={100}
                      className='hover:cursor-pointer'
                    />
                </Link>
              </div>
              <div className='flex absolute top-10 right-10'>
              <Link href="/">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/' ? '' : 'group'}`}>
                  Home
                  {pathname === '/' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              <Link href="/shop">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/shop' ? '' : 'group'}`}>
                  Shop
                  {pathname === '/shop' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              <Link href="/about_us">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/about_us' ? '' : 'group'}`}>
                  About us
                  {pathname === '/about_us' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              <Link href="/services">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/services' ? '' : 'group'}`}>
                  Services
                  {pathname === '/services' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              <Link href="/blog">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/blog' ? '' : 'group'}`}>
                  Blog
                  {pathname === '/blog' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              <Link href="/contact_us">
                <p className={`font-semibold relative mr-4 cursor-pointer ${pathname === '/contact_us' ? '' : 'group'}`}>
                  Contact us
                  {pathname === '/contact_us' ? (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform transition-transform scale-x-100"></span>
                  ) : (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  )}
                </p>
              </Link>
              {isLoggedIn() ? (
                // If logged in, show the logout button
                <button onClick={handleLogout} className='ml-20 cursor-pointer'>
                  <Image
                    src={logout}
                    alt='logout logo'
                    width={30}
                    height={30}
                  />
                </button>
              ) : (
                // If not logged in, show the login button
                <button onClick={handleLogin} className='ml-20 cursor-pointer'>
                  <Image
                    src={user}
                    alt="user logo"
                    width={30}
                    height={30}
                    className='ml-20 cursor-pointer'
                  />
                </button>
              )}
                <Link href="/cart">
                  <Image 
                    src={cart}
                    alt="user logo"
                    width={30}
                    height={30}
                    className='ml-5 cursor-pointer'
                  />
                </Link> 
              </div>
            </div>
            <div>
              <RecoilRoot>
                {children}
              </RecoilRoot>
            </div>
            <div className='bg-white p-32'>
              <div className='relative mt-64'>
                <div className='absolute right-1 bottom-0 '>
                  <Image 
                    src={sofa}
                    alt="sofa image"
                    width={400}
                    height={400}
                  />
                </div>
            
                <div className='flex absolute bottom-10 left-1 mb-32'>
                <Image 
                  src={mail}
                  alt='mail logo'
                  width={30}
                  height={40}
                />
                <h3 className='text-green-600 ml-3 mt-1 font-bold'>Subscribe to Newsletter</h3>
                </div>
                <div className='flex text-black mb-24 absolute bottom-3'>
                    <input 
                      type="text"
                      name="name"
                      placeholder='Enter your name'
                      className='border border-gray-400 mr-3 h-15 w-44 rounded-xl text-center'
                    />
                    <input 
                      type="text"
                      name="email"
                      placeholder='Enter your email'
                      className='border border-gray-400 h-15 w-44 rounded-xl text-center mr-3'
                    />
                    <div>
                        <button 
                        className='w-20 h-50 flex items-center justify-center bg-green-900 rounded-md'
                        >
                          <FaTelegramPlane size={40} color="white" />
                        </button>
                        </div>
                </div>
              </div>
            </div>
          </div>
          </Providers>
        </body>
    </html>
  )
}