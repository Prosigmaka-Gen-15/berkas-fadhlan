import React from 'react';

function OverviewPopup({ show, items, totalPrice, paymentMethod, deliveryMethod, address, handleClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Order Overview</h2>
        {items.map((item, index) => (
          <div key={index}>
            <h3>{item.product.name}</h3>
            <p>Price: {item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: {item.product.price * item.quantity}</p>
          </div>
        ))}
        <div>
          <h3>Total Price: {totalPrice}</h3>
          <h3>Payment Method: {paymentMethod}</h3>
          <h3>Delivery Method: {deliveryMethod}</h3>
          <h3>Address: {address}</h3>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default OverviewPopup;
