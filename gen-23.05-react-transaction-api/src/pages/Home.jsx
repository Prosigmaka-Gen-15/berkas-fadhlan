import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Menu from '../contents/Menu';
import Product from '../contents/Product';

export default function Home(props) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      {/* Menu */}
      <Menu />

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
