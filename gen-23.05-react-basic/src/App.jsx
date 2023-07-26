import React, { useState } from 'react';

export default function App() {
  // State untuk mengelola gambar depan produk
  const [frontImage, setFrontImage] = useState('images/depan.jpg');
  // State untuk mengelola tombol ukuran
  const [activeSize, setActiveSize] = useState('');

  // Fungsi untuk mengganti gambar depan produk
  function gantiGambar(sumberGambar) {
    setFrontImage(sumberGambar);
  }

  // Fungsi untuk tombol ukuran
  function handleSizeClick(size) {
    setActiveSize((prevSize) => (prevSize === size ? null : size));
  }

  return (
    <>
      {/* navbar */}
      <div className='nav-links bg-gray-100 gap-x-2 fixed top-0 w-full h-10 flex justify-end items-center'>
        <a href='#' className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-100 hover:bg-black duration-200 ease-in'>
          Register
        </a>
        <a href='#' className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-100 hover:bg-black duration-200 ease-in'>
          Masuk
        </a>
      </div>

      {/* konten */}
      <div className='w-full px-4 md:w-4/5 mt-16 md:mt-10 md:flex md:justify-center mb-4'>
        {/* Bagian kiri */}
        <div className='w-full md:w-1/2 p-4 flex justify-center'>
          <div className='w-3/4'>
            <h2 className='text-xl font-bold mb-4'>Produk Detail</h2>
            <img
              src={frontImage}
              className='w-full mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
              alt='Product'
            />
            <div className='flex flex-wrap space-x-2'>
              <img
                src='images/depan.jpg'
                onClick={() => gantiGambar('images/depan.jpg')}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
              <img
                src='images/belakang.jpg'
                onClick={() => gantiGambar('images/belakang.jpg')}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
              <img
                src='images/detail.jpg'
                onClick={() => gantiGambar('images/detail.jpg')}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
              <img
                src='images/model_depan.jpg'
                onClick={() => gantiGambar('images/model_depan.jpg')}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
              <img
                src='images/model_belakang.jpg'
                onClick={() => gantiGambar('images/model_belakang.jpg')}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
            </div>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className='w-full md:w-1/2 p-2'>
          <div className='w-full'>
            <h1 className='text-2xl font-bold mb-4'>T-Shirt Meet</h1>
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
            <p className='text-gray-600 mb-4'>Size S: Width - 47, Length - 70</p>
            <p className='text-gray-600 mb-4'>Size M: Width - 50, Length - 72</p>
            <p className='text-gray-600 mb-4'>Size L: Width - 53, Length - 75</p>
            <p className='text-gray-600 mb-4'>Size Xl: Width - 60, Length - 80</p>
            <p className='text-gray-600 mb-4'>Size XXL: Width - 66, Length - 84</p>

            {/* Tombol Ukuran */}
            <div className='flex space-x-2 mb-4'>
              <button
                onClick={() => handleSizeClick('S')}
                className={`${
                  activeSize === 'S' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
              >
                S
              </button>
              <button
                onClick={() => handleSizeClick('M')}
                className={`${
                  activeSize === 'M' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
              >
                M
              </button>
              <button
                onClick={() => handleSizeClick('L')}
                className={`${
                  activeSize === 'L' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
              >
                L
              </button>
              <button
                onClick={() => handleSizeClick('XL')}
                className={`${
                  activeSize === 'XL' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
              >
                XL
              </button>
              <button
                onClick={() => handleSizeClick('XXL')}
                className={`${
                  activeSize === 'XXL' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-100`}
              >
                XXL
              </button>
            </div>

            {/* Tombol quantity */}
            <div className='flex space-x-2 mb-4'>
              <div className='flex items-center border border-gray-200 rounded'>
                <button type='button' class='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'>
                  &minus;
                </button>
                <input
                  type='button'
                  id='Quantity'
                  value='0'
                  class='h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none;'
                />
                <button type='button' className='w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75'>
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Button Tambah Keranjang */}
          <button class='text-black px-4 py-2 rounded-md hover:bg-black hover:text-white border border-black transition duration-100 mr-2'>
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </>
  );
}
