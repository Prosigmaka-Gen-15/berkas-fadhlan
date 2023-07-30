import React from 'react';

export default function ProdukDetail({ frontImage, imageSources, gantiGambar }) {
  return (
    <div className=' w-full md:w-1/2 mt-16 md:mt-10 md:flex md:justify-center'>
      {/* Bagian kiri */}
      <div className='w-full flex justify-center'>
        <div className='w-3/4'>
          <h2 className='text-2xl font-bold my-4'>Produk Detail</h2>
          <img
            src={frontImage}
            className='w-auto h-auto md:w-96 md:h-96 mb-8 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
            alt='Product'
          />
          <div className='flex flex-wrap space-x-2'>
            {imageSources.map((source) => (
              <img
                key={source}
                src={source}
                onClick={() => gantiGambar(source)}
                className='w-10 h-10 mb-4 rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out'
                alt='Product'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
