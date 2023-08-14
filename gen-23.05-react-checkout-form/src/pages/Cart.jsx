import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import Header from '../layouts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleDelete = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const navigateToCheckoutPage = () => {
    navigate('/checkout');
  };

  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const showCheckoutPage = () => {
    setCheckoutVisible(true);
  };

  return (
    <div>
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='mt-12 px-4'>
        <h2 className='text-3xl py-8 text-center'>Keranjang Belanja</h2>
        {cartItems.length === 0 ? (
          <p className='text-center'>Keranjang Anda kosong.</p>
        ) : (
          <>
            <div className='overflow-x-auto max-h-64 overflow-y-auto'>
              <table className='table-auto w-full h-auto border-collapse border' role='table'>
                <thead>
                  <tr role='row'>
                    {/* Should include role and aria-label attributes for columns */}
                    <th className='px-4 py-2 bg-gray-100 border' role='columnheader' aria-label='Product'>
                      Produk
                    </th>
                    <th className='px-4 py-2 bg-gray-100 border' role='columnheader' aria-label='Price'>
                      Harga
                    </th>
                    <th className='px-4 py-2 bg-gray-100 border' role='columnheader' aria-label='Size'>
                      Ukuran
                    </th>
                    <th className='px-4 py-2 bg-gray-100 border' role='columnheader' aria-label='Quantity'>
                      Jumlah
                    </th>
                    <th className='px-4 py-2 bg-gray-100 border' role='columnheader' aria-label='Total Price'>
                      Total Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className='text-center' role='row'>
                      <td className='px-4 py-2 flex items-center justify-center' role='cell'>
                        <img src={item.product.image} alt={item.product.name} className='w-16 h-16 object-cover mr-4' />
                        <span>{item.product.name}</span>
                      </td>
                      <td className='px-4 py-2' role='cell'>
                        Rp {item.product.price}
                      </td>
                      <td className='px-4 py-2' role='cell'>
                        {item.size}
                      </td>
                      <td className='px-4 py-2 flex items-center justify-center' role='cell'>
                        <div className='flex items-center justify-center'>
                          <button
                            className='mx-2 w-8 h-8 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-full flex justify-center items-center transition duration-100'
                            onClick={() => handleDecrement(item)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className='mx-2 text-lg'>{item.quantity}</span>
                          <button
                            className='mx-2 w-8 h-8 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-full flex justify-center items-center transition duration-100'
                            onClick={() => handleIncrement(item)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <button
                            className='mx-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-900 transition duration-200'
                            onClick={() => handleDelete(item)}
                          >
                            <FontAwesomeIcon icon={faTrash} className='mr-1' />
                          </button>
                        </div>
                      </td>
                      <td className='px-4 py-2' role='cell'>
                        Rp {item.product.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-end items-center pr-4 py-2'>
              <div className='text-lg font-semibold mr-4'>Total: Rp {totalPrice}</div>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900'
                onClick={showCheckoutPage}
                disabled={cartItems.length === 0}
              >
                Buat Pesanan
              </button>
            </div>
            {checkoutVisible && <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} handleClose={() => setCheckoutVisible(false)} />}
          </>
        )}
      </div>
    </div>
  );
}
