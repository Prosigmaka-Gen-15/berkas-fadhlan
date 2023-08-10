import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AdminEditProduct = () => {
  // State untuk menyimpan data produk yang akan diupdate
  const [product, setProduct] = useState({});

  // Mendapatkan nilai parameter 'id' dari URL
  const { id } = useParams();

  // State untuk menginisialisasi data produk baru
  const initialProductState = {
    id: '',
    name: '',
    price: '',
    image: '',
    image_back: '',
    category: '',
    color: '',
    sizes: [{ size: '', width: '', length: '' }],
    description: '',
  };

  // Skema validasi untuk data produk menggunakan yup
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

  // Inisialisasi react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialProductState,
    resolver: yupResolver(validationSchema),
  });

  // Mengambil data produk dari server berdasarkan 'id' menggunakan axios dan useEffect
  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          reset(response.data);
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const navigate = useNavigate();
  // Fungsi yang akan dipanggil saat form di-submit
  const onSubmit = async (data) => {
    try {
      // Mengirim data produk yang diupdate ke server menggunakan axios
      await axios.put(`http://localhost:3001/products/${id}`, data);
      window.alert('Produk berhasil diupdate.');
      reset(data);
      // Navigate ke halaman '/showProduct'
      navigate('/showProduct');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <main className='ml-48 p-4'>
        <div className='max-w-screen mx-auto'>
          <h2 className='text-2xl font-bold mb-4'>Edit Produk</h2>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            {/* Input Nama Produk */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Nama Produk
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                type='text'
                name='name'
                {...control.register('name')}
                placeholder='Nama Artikel Produk'
              />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </div>

            {/* Input Harga */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                Harga
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='price'
                type='text'
                name='price'
                {...control.register('price')}
                placeholder='78.000'
              />
              {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
            </div>

            {/* Input URL Gambar Depan */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
                URL Gambar Depan
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='image'
                type='text'
                name='image'
                {...control.register('image')}
                placeholder='URL Gambar Depan Baju'
              />
              {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
            </div>

            {/* Input URL Gambar Belakang */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image_back'>
                URL Gambar Belakang
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='image_back'
                type='text'
                name='image_back'
                {...control.register('image_back')}
                placeholder='URL Gambar Belakang Baju'
              />
              {errors.image_back && <span className='text-red-500'>{errors.image_back.message}</span>}
            </div>

            {/* Input Kategori */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
                Kategori
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='category'
                type='text'
                name='category'
                {...control.register('category')}
                placeholder='Tshirt'
              />
              {errors.category && <span className='text-red-500'>{errors.category.message}</span>}
            </div>

            {/* Input Warna */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='color'>
                Warna
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='color'
                type='text'
                name='color'
                {...control.register('color')}
                placeholder='040404'
              />
              {errors.color && <span className='text-red-500'>{errors.color.message}</span>}
            </div>

            {/* Input Ukuran */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Ukuran</label>
              {product.sizes?.map((size, index) => (
                <div key={index} className='grid grid-cols-3 gap-4'>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].size`}
                    {...control.register(`sizes[${index}].size`)}
                    placeholder='Ukuran'
                  />
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].width`}
                    {...control.register(`sizes[${index}].width`)}
                    placeholder='Lebar'
                  />
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    name={`sizes[${index}].length`}
                    {...control.register(`sizes[${index}].length`)}
                    placeholder='Panjang'
                  />
                </div>
              ))}
            </div>

            {/* Input Deskripsi */}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                Deskripsi
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
                Update Produk
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminEditProduct;
