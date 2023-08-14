import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import { useSelector } from 'react-redux';
import OverviewPopup from './OverviewPopup';
import { navigate } from 'react-router-dom';

export default function CheckoutPage({ cartItems, totalPrice, handleClose }) {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [address, setAddress] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    const tax = totalPrice * 0.1;
    setTaxAmount(tax);
    setTotalAmount(totalPrice + tax);
  }, [totalPrice]);

  return (
    <div>
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='mt-12 px-4'>
        <h2 className='text-3xl py-8 text-center'>Checkout Pembayaran</h2>
        <div className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-lg font-medium mb-2'>
              Nama Penerima:
            </label>
            {user.username}
          </div>
          <div className='mb-4'>
            <label htmlFor='paymentMethod' className='block text-lg font-medium mb-2'>
              Metode Pembayaran:
            </label>
            <select
              id='paymentMethod'
              className='w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500'
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value='creditCard'>Kartu Kredit</option>
              <option value='bankTransfer'>Transfer Bank</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='deliveryMethod' className='block text-lg font-medium mb-2'>
              Metode Pengiriman:
            </label>
            <select
              id='deliveryMethod'
              className='w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500'
              value={deliveryMethod}
              onChange={handleDeliveryMethodChange}
            >
              <option value='standard'>Standar</option>
              <option value='express'>Ekspres</option>
              <option value='courier'>Jasa Kurir</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='address' className='block text-lg font-medium mb-2'>
              Alamat Pengiriman:
            </label>
            <textarea
              id='address'
              className='w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500'
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className='mb-8'>
            <label htmlFor='tax' className='block text-lg font-medium mb-2'>
              Tax Pajak (10%):
            </label>
            <div className='border p-4 bg-gray-100 rounded-md'>
              <span className='text-xl font-semibold'>Rp {taxAmount}</span>
            </div>
          </div>

          <div className='mb-8'>
            <label htmlFor='totalAmount' className='block text-lg font-medium mb-2'>
              Total Harga (dengan Pajak):
            </label>
            <div className='border p-4 bg-gray-100 rounded-md'>
              <span className='text-xl font-semibold'>Rp {totalAmount}</span>
            </div>
          </div>
          <button onClick={() => setShowOverviewPopup(true)} className='mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900'>
            Konfirmasi Pembayaran
          </button>
          {showOverviewPopup && <OverviewPopup cartItems={cartItems} totalPrice={totalPrice} handleClose={() => setShowOverviewPopup(false)} />}
        </div>
      </div>
    </div>
  );
}
