import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartAction';
import Header from '../layouts/Header';

// Komponen Cart
export default function Cart() {
  // Mengambil data cartItems dari Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Menghitung total harga dari semua item dalam keranjang
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Fungsi untuk menghapus item dari keranjang
  const handleDelete = (item) => {
    dispatch(removeFromCart(item));
  };

  // Fungsi untuk menangani proses checkout
  const handleCheckout = () => {
    alert('Pesanan Anda telah dibuat!');
  };

  // Fungsi untuk menambah jumlah quantity
  const handleIncrement = (item) => {
    // Lakukan dispatch untuk menambah quantity
    dispatch(addToCart(item.product, item.quantity + 1, item.size));
  };

  // Fungsi untuk mengurangi jumlah quantity
  const handleDecrement = (item) => {
    // Pastikan quantity tidak kurang dari 1
    if (item.quantity > 1) {
      // Lakukan dispatch untuk mengurangi quantity
      dispatch(addToCart(item.product, item.quantity - 1, item.size));
    }
  };

  return (
    <div>
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='mt-4 px-4'>
        <h2 className='text-3xl py-8 text-center'>Keranjang Belanja</h2>
        {cartItems.length === 0 ? (
          <p className='text-center'>Keranjang Anda kosong.</p>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className='table-auto w-full border-collapse border'>
                <thead>
                  <tr>
                    <th className='px-4 py-2 bg-gray-100 border'>Image</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Name</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Price</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Size</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Quantity</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Total</th>
                    <th className='px-4 py-2 bg-gray-100 border'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping dan rendering item-item dalam keranjang */}
                  {cartItems.map((item, index) => (
                    <tr key={index} className='text-center'>
                      <td className='px-4 py-2 flex justify-center items-center'>
                        <img src={item.product.image} alt={item.product.name} className='w-16 h-16 object-cover' />
                      </td>

                      <td className='px-4 py-2'>{item.product.name}</td>
                      <td className='px-4 py-2'>Rp {item.product.price}</td>
                      <td className='px-4 py-2'>{item.size}</td>
                      <td className='px-4 py-2'>{item.quantity}</td>
                      <td className='px-4 py-2'>Rp {item.product.price * item.quantity}</td>
                      <td className='px-4 py-2'>
                        <button
                          className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-900 transition duration-200'
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Baris total harga */}
                  <tr className='font-semibold'>
                    <td colSpan='5' className='text-right pr-4 py-2'>
                      Total:
                    </td>
                    <td className='px-4 py-2'>Rp {totalPrice}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Tombol checkout */}
            <div className='flex justify-end pr-4 py-2'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900'
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Buat Pesanan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
