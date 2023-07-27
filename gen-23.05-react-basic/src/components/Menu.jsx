import React from 'react';

const Menu = ({ menuItems }) => {
  return (
    <div className='text-3xl pt-20 pb-10 gap-x-4 flex flex-wrap justify-center'>
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className='px-4 py-1 rounded-md text-black rounded hover:text-white transition duration-100 hover:bg-black duration-200 ease-in'
        >
          {item.text}
        </a>
      ))}
    </div>
  );
};

export default Menu;
