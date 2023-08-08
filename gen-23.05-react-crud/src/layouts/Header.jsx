import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <div className='nav-links bg-gray-100 gap-x-2 fixed top-0 w-full h-10 flex justify-between items-center'>
      <div className='flex items-center'>
        <Link to={'/'} className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in'>
          Home
        </Link>
        <Link
          to={'/admin'}
          className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in'
        >
          Admin
        </Link>
      </div>
      <div className='flex items-center'>
        <FontAwesomeIcon
          icon={faSearch}
          className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in cursor-pointer'
        />
        <FontAwesomeIcon
          icon={faShoppingCart}
          className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in cursor-pointer'
        />
        <Link
          to={'/login'}
          className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in'
        >
          {props.loginText}
        </Link>
        <Link to={'/'} className='px-4 py-1 rounded-md text-gray-700 hover:text-white transition duration-200 hover:bg-black duration-200 ease-in'>
          {props.registerText}
        </Link>
      </div>
    </div>
  );
}
