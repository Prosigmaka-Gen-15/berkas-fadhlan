import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Produk from './components/Produk';
import Footer from './components/Footer';

export default function App() {
  const menuItems = [
    { text: 'T-Shirt', link: '/Tshirt' },
    { text: 'Shirt', link: '/Shirt' },
    { text: 'Jacket', link: '/Jacket' },
    { text: 'Hoodie', link: '/Hoodie' },
  ];

  const products = [
    { text: 'T-Shirt CSTL', image: '/images/cstl.jpg', price: 'Rp 78.000' },
    { text: 'T-Shirt FLGG', image: '/images/flgg.jpg', price: 'Rp 78.000' },
    { text: 'T-Shirt KAAP', image: '/images/kaap.jpg', price: 'Rp 115.000' },
    { text: 'T-Shirt MEET', image: '/images/meet.jpg', price: 'Rp 78.000' },
    { text: 'T-Shirt MODU', image: '/images/modu.jpg', price: 'Rp 158.500' },
    { text: 'T-Shirt WWOD', image: '/images/wwod.jpg', price: 'Rp 149.000' },
    { text: 'T-Shirt YOTT', image: '/images/yott.jpg', price: 'Rp 158.500' },
  ];

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      {/* Menu */}
      <Menu menuItems={menuItems} />

      {/* banner */}
      <div className='flex flex-wrap justify-center'>
        <img src='/images/HOME.jpg' className='ml-auto mr-auto pt-0.5 w-1/2 hover:scale-110 transition-transform duration-200 ease-in-out'></img>
        <div className='mx-4 flex flex-wrap text-center'>
          <p className='text-lg p-12'>
            Tempor consectetur exercitation ullamco cillum sunt quis irure mollit laborum consequat sunt fugiat. Adipisicing consequat est adipisicing
            exercitation qui mollit occaecat quis minim enim nostrud. Cupidatat occaecat duis pariatur enim ad sit nisi dolore in voluptate nulla.
            Aute esse eu exercitation aute voluptate ipsum do.
          </p>
        </div>
      </div>

      {/* produk */}
      <Produk products={products} />

      {/* footer */}
      <Footer />
    </>
  );
}
