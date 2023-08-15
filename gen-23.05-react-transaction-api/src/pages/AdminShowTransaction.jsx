import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const AdminShowTransaction = () => {
  // State untuk menyimpan daftar transaksi
  const [transactions, setTransactions] = useState([]);

  // Mengambil data transaksi dari server menggunakan useEffect
  useEffect(() => {
    axios
      .get('http://localhost:3001/transactions')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setTransactions(response.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <div className='container mx-auto mt-8'>
            <h1 className='text-2xl font-semibold mb-4'>Daftar Transaksi</h1>
            <div className='max-h-96 overflow-y-auto mt-4'>
              <table className='w-full border mt-4'>
                <thead className='sticky top-0 bg-gray-200'>
                  <tr className='bg-gray-200'>
                    <th className='px-4 py-2'>ID</th>
                    <th className='px-4 py-2'>Total</th>
                    <th className='px-4 py-2'>User ID</th>
                    <th className='px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className='border px-4 py-2'>{transaction.id}</td>
                      <td className='border px-4 py-2'>{`Rp.${transaction.total}`}</td>
                      <td className='border px-4 py-2'>{transaction.user_id}</td>
                      <td className='border px-4 py-2'>
                        <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-900 transition duration-200'>
                          <Link to={`/transactionDetails/${transaction.id}`}>Detail</Link>
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

export default AdminShowTransaction;
