import React from 'react';
import ProdukItem from './ProdukItem';

export default function Produk(props) {
  return (
    <div className='md:mx-10 mx-4 flex flex-wrap justify-center gap-4'>
      {props.products.map(produkItemProps =>
        <ProdukItem {...produkItemProps} />
      )}
    </div>
  );
}
