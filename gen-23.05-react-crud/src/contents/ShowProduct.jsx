import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const ShowProduct = () => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState([]);

  // Mengambil data produk dari server menggunakan useEffect
  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Fungsi untuk menghapus produk berdasarkan ID
  const handleDeleteProduct = async (productId) => {
    // Tampilkan pesan konfirmasi sebelum menghapus
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');

    if (confirmDelete) {
      try {
        // Kirim permintaan DELETE ke JSON server berdasarkan ID produk
        await axios.delete(`http://localhost:3001/products/${productId}`);

        // Setelah produk dihapus, update daftar produk dengan data terbaru
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

        // Tampilkan pesan sukses
        window.alert('Produk berhasil dihapus.');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <div className='container mx-auto mt-8'>
            <h1 className='text-2xl font-semibold mb-4'>Daftar Produk</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-black transition duration-200'>
              <Link to='/formProduct'>Tambah Produk</Link>
            </button>
            <div className='max-h-96 overflow-y-auto mt-4'>
              <table className='w-full border mt-4'>
                <thead className='sticky top-0 bg-gray-200'>
                  <tr className='bg-gray-200'>
                    <th className='px-4 py-2'>ID</th>
                    <th className='px-4 py-2'>Nama</th>
                    <th className='px-4 py-2'>Harga</th>
                    <th className='px-4 py-2'>Gambar</th>
                    <th className='px-4 py-2'>Kategori</th>
                    <th className='px-4 py-2'>Warna</th>
                    <th className='px-4 py-2'>Ukuran</th>
                    <th className='px-4 py-2'>Deskripsi</th>
                    <th className='border px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className='border px-4 py-2'>{product.id}</td>
                      <td className='border px-4 py-2'>{product.name}</td>
                      <td className='border px-4 py-2'>{`Rp.${product.price}`}</td>
                      <td className='border px-4 py-2'>
                        <img src={product.image} alt={product.name} className='w-20 h-20 mr-2' />
                        <br />
                        <img src={product.image_back} alt={`${product.name} Belakang`} className='w-20 h-20' />
                      </td>
                      <td className='border px-4 py-2'>{product.category}</td>
                      <td className='border px-4 py-2'>{product.color}</td>
                      <td className='border px-4 py-2'>
                        <ul>
                          {product.sizes.map((size) => (
                            <li key={`${product.id}-${size.size}`}>{`${size.size} - ${size.width}x${size.length}`}</li>
                          ))}
                        </ul>
                      </td>
                      <td className='border px-4 py-2'>{product.description}</td>
                      <td className='border px-4 py-2'>
                        <button className='bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-black transition duration-200'>
                          <Link to={`/editProduct/${product.id}`}>Edit</Link>
                        </button>
                        <button
                          className='bg-red-500 text-white px-2 py-1 rounded hover:bg-black transition duration-200'
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ShowProduct;
