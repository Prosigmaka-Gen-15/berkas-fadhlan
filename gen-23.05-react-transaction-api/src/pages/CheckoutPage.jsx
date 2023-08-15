import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import { useSelector, useDispatch } from 'react-redux';
import OverviewPopup from './OverviewPopup';
import { createTransaction } from '../api/transactions/createTransaction';
import { clearCart } from '../redux/cartSlice';

export default function CheckoutPage({ handleClose }) {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [address, setAddress] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0));
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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
    const tax = totalPrice * 0.1; // 10% tax
    setTaxAmount(tax);
    setTotalAmount(totalPrice + tax);
  }, [totalPrice]);

  const handleConfirmPaymentClick = async () => {
    const transactionDetails = cartItems.map((item) => ({
      product_id: item.product.id,
      size: item.size,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
    }));

    const newTransaction = {
      total: totalAmount,
      user_id: user.id,
      created_at: new Date().toISOString(),
      payment_method: paymentMethod,
      delivery_method: deliveryMethod,
      address: address,
      transaction_details: transactionDetails,
    };

    try {
      const createdTransaction = await createTransaction(newTransaction);
      console.log('Transaction created:', createdTransaction);
      setShowOverviewPopup(true);
      dispatch(clearCart());

      alert('Pembayaran berhasil dikonfirmasi! Terima kasih telah berbelanja.');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleOverviewPopupClose = () => {
    setShowOverviewPopup(false);
    handleClose();
  };

  return (
    <div>
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='mt-12 px-4'>
        <h2 className='text-3xl py-8 text-center'>Checkout Pembayaran</h2>
        <div className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label htmlFor='recipientName' className='block text-lg font-medium mb-2'>
              Nama Penerima:
            </label>
            <div className='border p-4 bg-gray-100 rounded-md'>
              <span className='text-xl font-semibold'>{user.username}</span>
            </div>
          </div>
          {cartItems.map((item, index) => (
            <div key={index} className='mb-4'>
              <label className='block text-lg font-medium mb-2'>Produk {index + 1}:</label>
              <div className='border p-4 bg-gray-100 rounded-md'>
                <span className='text-xl font-semibold'>{item.product.name}</span>
              </div>
              <label className='block text-lg font-medium mb-2'>Ukuran:</label>
              <div className='border p-4 bg-gray-100 rounded-md'>
                <span className='text-xl font-semibold'>{item.size}</span>
              </div>
              <label className='block text-lg font-medium mb-2'>Jumlah:</label>
              <div className='border p-4 bg-gray-100 rounded-md'>
                <span className='text-xl font-semibold'>{item.quantity}</span>
              </div>
            </div>
          ))}
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
          <button
            onClick={handleConfirmPaymentClick}
            className='mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900'
            disabled={showOverviewPopup} // Disable the button once the popup is shown
          >
            Konfirmasi Pembayaran
          </button>
          {showOverviewPopup && (
            <OverviewPopup
              show={showOverviewPopup}
              items={cartItems}
              totalPrice={totalPrice}
              paymentMethod={paymentMethod}
              deliveryMethod={deliveryMethod}
              address={address}
              handleClose={handleOverviewPopupClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
