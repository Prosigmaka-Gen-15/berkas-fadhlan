import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ProductItem from './ProductItem';
import { Link, useNavigate } from 'react-router-dom';

export default function Product(props) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  const handleDetail = (product) => {
    navigate(`/${product.name}`);
  };

  return (
    <div className='md:mx-10 mx-4 flex flex-wrap justify-center gap-4'>
      {/* {props.products.map((productItemProps) => (
        <ProductItem {...productItemProps} />
      ))} */}

      {products.map((product, index) => (
        <div key={index} className='mb-5 md:w-auto w-full'>
          <img
            src={product.image}
            className='h-48 md:w-auto w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
            alt={product.name}
            onClick={() => handleDetail(product)}
          />

          <div className='text-center'>
            <Link
              to={`/${product.name}`}
              className='text-2xl font-bold mb-2 cursor-pointer hover:scale-110 transition-all duration-200 ease-in hover:bg-yellow-400 rounded'
            >
              {product.name}
            </Link>
            <p className='text-lg mb-2'>Rp.{product.price}</p>
            <button
              className='text-black px-2 py-1 rounded-md hover:bg-black hover:text-white border border-black transition duration-100 mr-2'
              onClick={() => handleDetail(product)}
            >
              Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
