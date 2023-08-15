import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const AdminEditAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate to other routes
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/users/${id}`, user);
      console.log('User updated:', response.data);
      navigate('/showAccount'); // Navigate to /showAccount after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <div className='container mx-auto mt-8'>
            <h1 className='text-2xl font-semibold mb-4'>Edit Pengguna</h1>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-4'>
                <label className='block font-semibold'>Username</label>
                <input
                  type='text'
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className='w-full px-3 py-2 border rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block font-semibold'>Email</label>
                <input
                  type='email'
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className='w-full px-3 py-2 border rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block font-semibold'>Role</label>
                <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className='w-full px-3 py-2 border rounded'>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900 transition duration-200'>
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminEditAccount;
