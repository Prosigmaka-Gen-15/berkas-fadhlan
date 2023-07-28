import React from 'react';
import ProdukItem from './ProdukItem';

export default function Produk(props) {
  return (
    <div className='mr-10 ml-10 flex flex-wrap justify-center gap-4'>
      {props.products.map(produkItemProps =>
        <ProdukItem {...produkItemProps} />
      )}
    </div>
  );
}
