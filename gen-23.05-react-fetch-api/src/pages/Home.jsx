import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Menu from '../components/Menu';
import Product from '../components/Product';

export default function Home() {
  const menuItems = [
    { text: 'T-Shirt', link: '/' },
    { text: 'Shirt', link: '/' },
    { text: 'Jacket', link: '/' },
    { text: 'Hoodie', link: '/' },
  ];

  const products = [
    { text: 'CSTL', image: '/images/CSTL.jpg', price: 'Rp 78.000' },
    { text: 'FLGG', image: '/images/FLGG.jpg', price: 'Rp 78.000' },
    { text: 'KAAP', image: '/images/KAAP.jpg', price: 'Rp 115.000' },
    { text: 'MEET', image: '/images/MEET.jpg', price: 'Rp 78.000' },
    { text: 'MODU', image: '/images/MODU.jpg', price: 'Rp 158.500' },
    { text: 'WWOD', image: '/images/WWOD.jpg', price: 'Rp 149.000' },
    { text: 'YOTT', image: '/images/YOTT.jpg', price: 'Rp 158.500' },
  ];

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      {/* Menu */}
      <Menu menuItems={menuItems} />

      {/* banner */}
      <div className='flex flex-wrap justify-center'>
        <img
          src='/images/HOME.jpg'
          className='ml-auto mr-auto pt-0.5 w-[calc(100%-2rem)] md:w-1/2 hover:scale-110 transition-transform duration-200 ease-in-out'
        ></img>
        <div className='mx-4 flex flex-wrap text-center'>
          <p className='text-md py-6 md:p-12 mb-12 md:mb-0 leading-loose border-b md:border-none border-gray-300'>
            Tempor consectetur exercitation ullamco cillum sunt quis irure mollit laborum consequat sunt fugiat. Adipisicing consequat est adipisicing
            exercitation qui mollit occaecat quis minim enim nostrud. Cupidatat occaecat duis pariatur enim ad sit nisi dolore in voluptate nulla.
            Aute esse eu exercitation aute voluptate ipsum do.
          </p>
        </div>
      </div>

      {/* produk */}
      <Product products={products} />

      {/* footer */}
      <Footer />
    </>
  );
}
