import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const TransactionDetailsPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/transactions/${id}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => console.error('Error fetching transaction details:', error));
  }, [id]);

  if (!transaction || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <div className='container mx-auto mt-8'>
            <h1 className='text-2xl font-semibold mb-4'>Detail Transaksi</h1>
            <div className='mb-4'>
              <p>ID: {transaction.id}</p>
              <p>Total: Rp.{transaction.total}</p>
              <p>User ID: {transaction.user_id}</p>
              <p>Tanggal Pembuatan: {transaction.created_at}</p>
              <p>Metode Pembayaran: {transaction.payment_method}</p>
              <p>Metode Pengiriman: {transaction.delivery_method}</p>
              <p>Alamat: {transaction.address}</p>
            </div>
            <h2 className='text-lg font-semibold mb-2'>Detail Pembelian</h2>
            <table className='w-full border'>
              <thead className='sticky top-0 bg-gray-200'>
                <tr className='bg-gray-200'>
                  <th className='px-4 py-2'>ID</th>
                  <th className='px-4 py-2'>Product</th>
                  <th className='px-4 py-2'>Size</th>
                  <th className='px-4 py-2'>Quantity</th>
                  <th className='px-4 py-2'>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction_details.map((detail) => {
                  const product = products.find((product) => product.id === detail.product_id);
                  const selectedSize = detail.size; // Menggunakan size dari detail pembelian

                  return (
                    <tr key={detail.id}>
                      <td className='border px-4 py-2'>{detail.product_id}</td>
                      <td className='border px-4 py-2'>{product.name}</td>
                      <td className='border px-4 py-2'>{selectedSize}</td>
                      <td className='border px-4 py-2'>{detail.quantity}</td>
                      <td className='border px-4 py-2'>{`Rp.${detail.subtotal}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default TransactionDetailsPage;
