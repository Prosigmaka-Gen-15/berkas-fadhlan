import React from 'react';

const Menu = ({ menuItems }) => {
  return (
    <div className='text-xl md:text-3xl pt-20 pb-10 gap-x-4 flex flex-col md:flex-row flex-wrap justify-center'>
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className='border-b md:border-none border-gray-300 mx-4 py-1 md:rounded-md text-black hover:text-white transition duration-100 hover:bg-black duration-200 ease-in'
        >
          {item.text}
        </a>
      ))}
    </div>
  );
};

export default Menu;
