import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const AdminShowAccount = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      // Refresh the users list after successful deletion
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      // Show alert
      window.alert('Pengguna berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <div className='container mx-auto mt-8'>
            <h1 className='text-2xl font-semibold mb-4'>Daftar Pengguna</h1>
            <div className='max-h-96 overflow-y-auto mt-4'>
              <table className='w-full border mt-4'>
                <thead className='sticky top-0 bg-gray-200'>
                  <tr className='bg-gray-200'>
                    <th className='px-4 py-2'>ID</th>
                    <th className='px-4 py-2'>Username</th>
                    <th className='px-4 py-2'>Email</th>
                    <th className='px-4 py-2'>Role</th>
                    <th className='px-4 py-2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className='border px-4 py-2'>{user.id}</td>
                      <td className='border px-4 py-2'>{user.username}</td>
                      <td className='border px-4 py-2'>{user.email}</td>
                      <td className='border px-4 py-2'>{user.role}</td>
                      <td className='border px-4 py-2'>
                        <Link
                          to={`/editAccount/${user.id}`}
                          className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-900 transition duration-200 mr-2'
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200'
                        >
                          Delete
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

export default AdminShowAccount;
