import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormProduct = () => {
  // State awal untuk produk
  const initialProductState = {
    id: '',
    name: '',
    price: '',
    image: '',
    image_back: '',
    category: '',
    color: '',
    sizes: [
      { size: 'S', width: '47', length: '70' },
      { size: 'M', width: '50', length: '72' },
      { size: 'L', width: '53', length: '75' },
      { size: 'XL', width: '60', length: '80' },
      { size: 'XXL', width: '66', length: '84' },
    ],
    description: '',
  };

  // Skema validasi menggunakan yup
  const validationSchema = yup.object().shape({
    name: yup.string().required('Nama Produk wajib diisi'),
    price: yup.number().typeError('Harga harus berupa angka').required('Harga wajib diisi'),
    image: yup.string().required('URL Gambar Depan wajib diisi'),
    image_back: yup.string().required('URL Gambar Belakang wajib diisi'),
    category: yup.string().required('Kategori wajib diisi'),
    color: yup.string().nullable(),
    sizes: yup.array().of(
      yup.object().shape({
        size: yup.string().required('Ukuran wajib diisi'),
        width: yup.number().typeError('Lebar harus berupa angka').required('Lebar wajib diisi'),
        length: yup.number().typeError('Panjang harus berupa angka').required('Panjang wajib diisi'),
      }),
    ),
    description: yup.string().required('Deskripsi wajib diisi'),
  });

  // Menggunakan useForm dari react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialProductState, // Nilai awal form sesuai state di atas
    resolver: yupResolver(validationSchema), // Skema validasi menggunakan yupResolver
  });

  const navigate = useNavigate();

  // Fungsi untuk menangani submit form
  const onSubmit = async (data) => {
    try {
      // Kirim permintaan POST untuk menyimpan data produk ke JSON server
      const response = await axios.post('http://localhost:3001/products', data);

      // Jika permintaan berhasil, Anda dapat menampilkan respons atau mengambil tindakan lain yang sesuai
      console.log('Data berhasil disimpan:', response.data);

      // Reset form ke nilai awal
      reset(initialProductState);

      // Tampilkan pesan sukses menggunakan alert
      window.alert('Produk berhasil ditambahkan.');

      // Navigate ke halaman '/showProduct'
      navigate('/showProduct');
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <h2 className='text-2xl font-bold mb-4'>Form Tambah Artikel</h2>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            {/* Input Nama Produk */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Product Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='text'
                name='name'
                {...control.register('name')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='Nama Artikel Produk'
              />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </div>

            {/* Input Harga */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                Price
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='price'
                type='text'
                name='price'
                {...control.register('price')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='78000'
              />
              {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
            </div>

            {/* Input URL Gambar Depan */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
                Image URL
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='image'
                type='text'
                name='image'
                {...control.register('image')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='URL Gambar Depan Baju'
              />
              {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
            </div>

            {/* Input URL Gambar Belakang */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image_back'>
                Back Image URL
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='image_back'
                type='text'
                name='image_back'
                {...control.register('image_back')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='URL Gambar Belakang Baju'
              />
              {errors.image_back && <span className='text-red-500'>{errors.image_back.message}</span>}
            </div>

            {/* Input Kategori */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
                Category
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='category'
                type='text'
                name='category'
                {...control.register('category')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='Tshirt'
              />
              {errors.category && <span className='text-red-500'>{errors.category.message}</span>}
            </div>

            {/* Input Warna */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='color'>
                Color
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='color'
                type='text'
                name='color'
                {...control.register('color')} // Menghubungkan input dengan react-hook-form menggunakan control.register
                placeholder='040404'
              />
              {errors.color && <span className='text-red-500'>{errors.color.message}</span>}
            </div>

            {/* Input Ukuran */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Sizes</label>
              {initialProductState.sizes.map((size, index) => (
                <div key={index} className='grid grid-cols-3 gap-4'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].size`}
                    {...control.register(`sizes[${index}].size`)} // Menghubungkan input dengan react-hook-form menggunakan control.register
                    placeholder='Size'
                  />
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].width`}
                    {...control.register(`sizes[${index}].width`)} // Menghubungkan input dengan react-hook-form menggunakan control.register
                    placeholder='Width'
                  />
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].length`}
                    {...control.register(`sizes[${index}].length`)} // Menghubungkan input dengan react-hook-form menggunakan control.register
                    placeholder='Length'
                  />
                </div>
              ))}
            </div>

            {/* Input Deskripsi */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                Description
              </label>
              <Controller
                name='description'
                control={control}
                defaultValue={initialProductState.description}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Deskripsi Artikel'
                    rows='4'
                  />
                )}
              />
              {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
            </div>

            {/* Tombol Submit */}
            <div className='flex items-center justify-center mt-4'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Tambah Artikel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default FormProduct;
