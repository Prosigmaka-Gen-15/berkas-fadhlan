import React from 'react';
import ProductItem from './ProductItem';

export default function Product(props) {
  return (
    <div className='md:mx-10 mx-4 flex flex-wrap justify-center gap-4'>
      {props.products.map((productItemProps) => (
        <ProductItem {...productItemProps} />
      ))}
    </div>
  );
}
