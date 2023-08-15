import React from 'react';

function OverviewPopup({ show, items, totalPrice, paymentMethod, deliveryMethod, address, handleClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Ringkasan Pesanan</h2>
        {items.map((item, index) => (
          <div key={index}>
            <h3>{item.product.name}</h3>
            <p>Harga: Rp. {item.product.price}</p>
            <p>Jumlah: {item.quantity}</p>
            <p>Total Harga: Rp. {item.product.price * item.quantity}</p>
          </div>
        ))}
        <div>
          <h3>Total Harga: Rp. {totalPrice}</h3>
          <h3>Metode Pembayaran: {paymentMethod === 'creditCard' ? 'Kartu Kredit' : 'Transfer Bank'}</h3>
          <h3>Metode Pengiriman: {deliveryMethod === 'standard' ? 'Standar' : deliveryMethod === 'express' ? 'Ekspres' : 'Jasa Kurir'}</h3>
          <h3>Alamat: {address}</h3>
        </div>
        <button onClick={handleClose}>Tutup</button>
      </div>
    </div>
  );
}

export default OverviewPopup;
