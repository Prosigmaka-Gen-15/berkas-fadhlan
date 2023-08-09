import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ProductDetail from '../contents/ProductDetail';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function Detail(props) {
  // State untuk menyimpan data produk, produk terpilih, gambar depan, ukuran aktif, jumlah, dan status loading
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [frontImage, setFrontImage] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  // Fungsi untuk mengambil data produk dari server
  const getProducts = async () => {
    try {
      let response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // Panggil fungsi getProducts saat komponen di-mount
    getProducts();
  }, []);

  // Fungsi untuk mendapatkan informasi ukuran berdasarkan ukuran yang dipilih
  function getUkuran(size) {
    if (!selectedProduct || !selectedProduct.sizes) {
      return { width: '', length: '' };
    }

    const sizeInfo = selectedProduct.sizes.find((s) => s.size === size);
    if (sizeInfo) {
      return { width: sizeInfo.width, length: sizeInfo.length };
    } else {
      return { width: '', length: '' };
    }
  }

  // State untuk mengontrol apakah ukuran telah dipilih
  const [isSizeSelected, setIsSizeSelected] = useState(false);

  // Fungsi untuk menangani klik pada ukuran produk
  function handleSizeClick(size) {
    if (!isSizeSelected) {
      setActiveSize(size);
      setIsSizeSelected(true);
      setQuantity(1); // Set quantity menjadi 1 saat ukuran pertama kali dipilih
      return;
    }

    if (activeSize === size) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      const isConfirmed = window.confirm('Apakah Anda ingin mengganti ukuran?');
      if (isConfirmed) {
        setQuantity(1);
        setActiveSize(size);
        setIsSizeSelected(true);
      }
    }
  }

  // Fungsi untuk menambahkan produk ke keranjang belanja
  function tambahKeKeranjang() {
    if (!isSizeSelected) {
      alert('Silakan pilih ukuran produk terlebih dahulu.');
      return;
    }

    if (quantity === 0) {
      alert('Silakan pilih jumlah produk terlebih dahulu.');
      return;
    }

    // Dispatch the action to add to cart
    dispatch(addToCart({ product: selectedProduct, quantity, size: activeSize }));

    setActiveSize('');
    setQuantity(0);
    setIsSizeSelected(false); // Set isSizeSelected menjadi false setelah menambahkan ke keranjang

    alert('Berhasil menambahkan ke keranjang!');
  }

  // Fungsi untuk menambahkan jumlah produk
  function incrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  // Fungsi untuk mengurangi jumlah produk
  function decrementQuantity() {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  }

  // Mendapatkan parameter URL dari React Router
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedImage = queryParams.get('image');

  useEffect(() => {
    // Cari produk terpilih berdasarkan parameter URL
    const selectedProduct = products.find((product) => product.name === name);
    setSelectedProduct(selectedProduct);

    if (selectedImage) {
      setFrontImage(selectedImage);
    } else if (selectedProduct) {
      setFrontImage(selectedProduct.image);
    }

    // Update state ukuran dengan ukuran-ukuran unik dari produk terpilih
    if (selectedProduct && selectedProduct.sizes) {
      const uniqueSizes = Array.from(new Set(selectedProduct.sizes.map((size) => size.size)));
      setSizes(uniqueSizes);
    }
  }, [products, name, selectedImage]);

  // Fungsi untuk mengubah gambar depan produk
  const changeFrontImage = (imageUrl) => {
    setFrontImage(imageUrl);
  };

  // Daftar sumber gambar produk untuk ProductDetail
  const imageSources = selectedProduct ? [selectedProduct.image, selectedProduct.image_back] : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Produk tidak ditemukan.</div>;
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
            <h1 className='text-2xl font-bold mb-4 md:pt-16'>{selectedProduct.name}</h1>
            <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
            <h2 className='text-xl font-bold mb-2'>Kategori</h2>
            <p className='text-gray-600 mb-4'>{selectedProduct.category}</p>

            {/* Bagian Warna */}
            <h2 className='text-xl font-bold mb-2'>Warna</h2>
            <div
              className='w-7 h-7 rounded mb-2 hover:scale-150 transition-transform duration-200 ease-out hover:ease-in'
              style={{ backgroundColor: `#${selectedProduct.color}` }}
              onClick={() => handleSizeClick(size)}
            ></div>

            {/* Bagian Harga */}
            <h2 className='text-xl font-bold mb-2'>Harga</h2>
            <p className='text-gray-600 mb-4'>Rp {selectedProduct.price}</p>

            {/* Bagian Ukuran */}
            <h2 className='text-xl font-bold mb-2'>Ukuran</h2>
            <div>
              {sizes.map((size) => (
                <p key={size} className='text-gray-600 mb-4' onClick={() => handleSizeClick(size)}>
                  {`Size ${size} : Lebar - ${getUkuran(size).width}cm, Panjang - ${getUkuran(size).length}cm`}
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

            {/* Button Tambah Ke Keranjang */}
            <button
              onClick={tambahKeKeranjang}
              className={`text-black px-4 py-2 mb-4 rounded-md ${
                isSizeSelected && activeSize
                  ? 'hover:bg-black hover:text-white border border-black transition duration-100'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isSizeSelected || !activeSize}
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
