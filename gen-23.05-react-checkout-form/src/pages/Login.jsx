import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../layouts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const setInputValue = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/login', formData)
      .then((res) => {
        const { accessToken, user } = res.data;
        dispatch(setToken(accessToken));
        dispatch(setUser(user));
        navigate('/admin');
      })
      .catch((err) => {
        alert('Terjadi kesalahan');
        console.error(err);
        console.error(err.response);
      });
  };

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='py-20 text-center'>
        <h1 className='text-2xl mb-4'>Selamat Datang di Halaman Login</h1>
        <form className='mx-auto max-w-sm' onSubmit={handleLogin}>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1'>
              Email:
            </label>
            <input type='email' name='email' className='w-full border px-3 py-2' value={formData.email} onChange={setInputValue} required />
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block mb-1'>
              Password:
            </label>
            <div className='relative'>
              <input
                type='password'
                name='password'
                className='w-full border px-3 py-2 pr-10'
                value={formData.password}
                onChange={setInputValue}
                required
              />
            </div>
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Masuk
          </button>
        </form>
        <div className='text-red-500'></div>
        <p className='mt-4'>
          Belum memiliki akun?{' '}
          <a href='/register' className='text-blue-500 hover:underline'>
            Daftar sekarang
          </a>
        </p>
      </div>
    </>
  );
}
