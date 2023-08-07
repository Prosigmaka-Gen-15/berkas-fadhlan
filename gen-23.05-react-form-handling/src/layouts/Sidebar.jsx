import React from 'react';

const Sidebar = () => {
  return (
    <div className='bg-gray-800 h-screen w-48 fixed top-0 left-0 p-4'>
      <ul className='space-y-4'>
        <li>
          <a href='/' className='text-white hover:text-black hover:bg-white rounded w-full block py-2 px-4 transition duration-300 ease-in-out'>
            Home
          </a>
        </li>
        <li>
          <a href='/admin' className='text-white hover:text-black hover:bg-white rounded w-full block py-2 px-4 transition duration-300 ease-in-out'>
            Tambah Artikel
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
