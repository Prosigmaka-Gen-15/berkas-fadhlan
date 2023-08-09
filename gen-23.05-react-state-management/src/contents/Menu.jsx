import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/categories')
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((err) => {
        console.error('There was an error fetching the menu items!', err);
      });
  }, []);

  return (
    <div className='text-xl md:text-3xl pt-20 pb-10 gap-x-4 flex flex-col md:flex-row flex-wrap justify-center'>
      {menuItems.map((item, index) => (
        <a
          key={`menu_item_${index}`}
          href={item.link}
          className='border-b md:border-none border-gray-300 mx-4 py-1 md:rounded-md text-black hover:text-white transition duration-100 hover:bg-black duration-200 ease-in cursor-pointer'
          tabIndex='0'
          role='menuitem'
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Menu;
