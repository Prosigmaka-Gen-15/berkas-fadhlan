import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProdukDetail from './components/ProdukDetail';

export default function App() {
  const [frontImage, setFrontImage] = useState('images/depan.jpg');
  const [activeSize, setActiveSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  function gantiGambar(sumberGambar) {
    setFrontImage(sumberGambar);
  }

  const imageSources = ['images/depan.jpg', 'images/belakang.jpg', 'images/detail.jpg', 'images/model_depan.jpg', 'images/model_belakang.jpg'];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  function handleSizeClick(size) {
    setActiveSize((prevSize) => (prevSize === size ? null : size));
  }

  function getUkuran(size) {
    switch (size) {
      case 'S':
        return { width: '47', length: '70' };
      case 'M':
        return { width: '50', length: '72' };
      case 'L':
        return { width: '53', length: '75' };
      case 'XL':
        return { width: '60', length: '80' };
      case 'XXL':
        return { width: '66', length: '84' };
      default:
        return { width: '', length: '' };
    }
  }

  function handleSizeClick(size) {
    if (activeSize === size) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      const isConfirmed = window.confirm('Apakah Anda ingin mengganti ukuran?');
      if (isConfirmed) {
        setQuantity(1);
        setActiveSize(size);
        setLastSelectedSize(size);
      }
    }
  }

  function tambahKeKeranjang() {
    setQuantity(0);

    alert('Berhasil menambahkan ke keranjang!');
  }

  function incrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrementQuantity() {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  }

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      {/* deskripsi produk */}
      <div className='flex flex-col md:flex-row'>
        <ProdukDetail frontImage={frontImage} imageSources={imageSources} gantiGambar={gantiGambar} />

        {/* Penjelasan Produk */}
        <div className='w-full md:w-1/2'>
          <div className='mx-6'>
            <h1 className='text-2xl font-bold mb-4 md:pt-16'>T-Shirt Meet</h1>
            <p className='text-gray-600 mb-4'>
              T-Shirt Meet - Qui laboris sint adipisicing quis qui ullamco Lorem quis ipsum dolore ut sunt ipsum. Nisi sunt incididunt reprehenderit
              laborum laboris do nisi enim irure non commodo proident laborum non. Consectetur enim pariatur labore id quis officia irure laborum sunt
              cillum. Labore ex dolor qui non officia aute cupidatat ad ullamco. Quis culpa incididunt cillum eiusmod pariatur nisi minim nostrud.
              Dolor sint quis eu ea. Ullamco Lorem officia commodo commodo.
            </p>

            {/* Bagian Warna */}
            <h2 className='text-xl font-bold mb-2'>Warna</h2>
            <div
              className='w-7 h-7 bg-blue-500 mb-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
              style={{ backgroundColor: '#375DB0' }}
            ></div>

            {/* Bagian Harga */}
            <h2 className='text-xl font-bold mb-2'>Harga</h2>
            <p className='text-gray-600 mb-4'>Rp 160.000</p>

            {/* Bagian Ukuran */}
            <h2 className='text-xl font-bold mb-2'>Ukuran</h2>
            <div className='flex flex-wrap space-x-2 mb-4'>
              {sizes.map((size) => (
                <p key={size} className='text-gray-600 mb-4' onClick={() => handleSizeClick(size)}>
                  {`Size ${size}: Width - ${getUkuran(size).width}, Length - ${getUkuran(size).length}`}
                </p>
              ))}
            </div>

            {/* Tombol Ukuran */}
            <div className='flex flex-wrap space-x-2 mb-4'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`${
                    activeSize === size ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                  } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Tombol quantity */}
            <div className='flex space-x-2 mb-4'>
              <div className='flex items-center border border-gray-200 rounded'>
                <button type='button' onClick={decrementQuantity} className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'>
                  -
                </button>
                <input type='button' id='Quantity' value={quantity} className='h-10 w-16 border-transparent text-center' />
                <button type='button' onClick={incrementQuantity} className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'>
                  +
                </button>
              </div>
            </div>

            {/* Button Tambah Keranjang */}
            <button
              onClick={tambahKeKeranjang}
              className='text-black px-4 py-2 mb-4 rounded-md hover:bg-black hover:text-white border border-black transition duration-100'
            >
              Tambah ke Keranjang
            </button>
          </div>
          {/* batas detail kanan */}
        </div>
        {/* batas detail */}
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
