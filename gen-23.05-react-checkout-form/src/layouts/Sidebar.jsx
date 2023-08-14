import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuthData } from '../redux/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(resetAuthData());
    navigate('/');
  };

  return (
    <div className='bg-gray-800 h-screen w-48 fixed top-0 left-0 p-4'>
      <h3 className='text-white'>Info Admin:</h3>
      <p className='text-white'>ID: {user.id}</p>
      <p className='text-white'>Email: {user.email}</p>
      <p className='text-white'>User Name: {user.username}</p>
      <hr />

      <ul className='space-y-4'>
        <li>
          <a href='/' className='text-white hover:text-black hover:bg-white rounded w-full block py-2 px-4 transition duration-300 ease-in-out'>
            Home
          </a>
        </li>
        <li>
          <a
            onClick={handleLogout}
            className='text-white cursor-pointer hover:text-black hover:bg-white rounded w-full block py-2 px-4 transition duration-300 ease-in-out'
          >
            Keluar
          </a>
        </li>
        <li>
          <a
            href='/showProduct'
            className='text-white hover:text-black hover:bg-white rounded w-full block py-2 px-4 transition duration-300 ease-in-out'
          >
            Daftar Produk
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
