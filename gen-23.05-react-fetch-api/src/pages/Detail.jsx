import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ProductDetail from '../components/ProductDetail';
import { Outlet, useParams, useLocation } from 'react-router-dom';

export default function Detail(props) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [frontImage, setFrontImage] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

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

  function tambahKeKeranjang() {
    if (quantity === 0) {
      alert('Silakan pilih ukuran dan jumlah produk terlebih dahulu.');
      return;
    }
    setActiveSize('');
    setQuantity(0);

    alert('Berhasil menambahkan ke keranjang!');
  }

  function incrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrementQuantity() {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  }

  const { text } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedImage = queryParams.get('image');

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.text === text);
    setSelectedProduct(selectedProduct);

    if (selectedImage) {
      setFrontImage(selectedImage);
    } else if (selectedProduct) {
      setFrontImage(selectedProduct.image);
    }
  }, [products, text, selectedImage]);

  const changeFrontImage = (imageUrl) => {
    setFrontImage(imageUrl);
  };

  const imageSources = selectedProduct ? [selectedProduct.image, selectedProduct.image_back] : [];

  if (!selectedProduct) {
    return null;
  }

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />
      {/* Nested Route */}
      <Outlet />

      <div className='flex flex-col md:flex-row'>
        <ProductDetail frontImage={frontImage} imageSources={imageSources} gantiGambar={changeFrontImage} />

        {/* Penjelasan Produk */}
        <div className='w-full md:w-1/2'>
          <div className='mx-6'>
            <h1 className='text-2xl font-bold mb-4 md:pt-16'>{selectedProduct.text}</h1>
            <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>

            {/* Bagian Warna */}
            <h2 className='text-xl font-bold mb-2'>Warna</h2>
            <div
              className='w-7 h-7 mb-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
              style={{ backgroundColor: `#${selectedProduct.color}` }}
            ></div>

            {/* Bagian Harga */}
            <h2 className='text-xl font-bold mb-2'>Harga</h2>
            <p className='text-gray-600 mb-4'>Rp {selectedProduct.price}</p>

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
