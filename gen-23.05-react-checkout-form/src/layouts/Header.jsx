import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { resetAuthData } from '../redux/authSlice';

export default function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    dispatch(resetAuthData());
    navigate('/');
  };

  const handleToggleLogoutMenu = () => {
    setShowLogoutMenu((prevShowLogoutMenu) => !prevShowLogoutMenu);
  };

  const isAdmin = storedUser && storedUser.role === 'admin';
  const isLoggedIn = useSelector((state) => state.auth.token !== '');

  return (
    <div className='nav-links bg-gray-300 gap-x-2 fixed top-0 w-full h-10 flex justify-between items-center'>
      <div className='flex items-center'>
        <Link to={'/'} className='px-4 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in'>
          Home
        </Link>
        {isAdmin && (
          <Link
            to={'/admin'}
            className='px-4 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in'
          >
            Dashboard Admin
          </Link>
        )}
      </div>
      <div className='flex items-center'>
        <div className='relative flex items-center'>
          <form action='/search' method='get' className='flex items-center'>
            <input
              type='text'
              name='query'
              placeholder='Search...'
              className='px-2 py-1 pr-8 rounded-md text-black hover:bg-gray-200 transition duration-200 focus:outline-none'
            />
            <button type='submit' className='absolute right-0 top-0 p-1'>
              <FontAwesomeIcon
                icon={faSearch}
                className='px-2 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in cursor-pointer'
              />
            </button>
          </form>
        </div>

        <Link to={'/cart'}>
          <div className='relative'>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className='px-4 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in cursor-pointer'
            />
            {totalQuantity > 0 && (
              <div className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs'>
                {totalQuantity}
              </div>
            )}
          </div>
        </Link>
        {isLoggedIn ? (
          <div className='relative'>
            <div
              onClick={handleToggleLogoutMenu}
              className='px-4 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in cursor-pointer'
            >
              {storedUser.username}
            </div>
            {showLogoutMenu && (
              <div className='absolute top-8 right-0 bg-white shadow-md py-2 px-4 rounded-md'>
                <div onClick={handleLogout} className='cursor-pointer'>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={'/login'}
            className='px-4 py-1 rounded-md text-black hover:text-white transition duration-200 hover:bg-gray-800 duration-200 ease-in'
          >
            Masuk
          </Link>
        )}
      </div>
    </div>
  );
}
