import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../layouts/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        console.log('Login berhasil');
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage('Login gagal. Periksa email dan password Anda.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Terjadi kesalahan saat melakukan login. Silakan coba lagi.');
    }
  };

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' onLogout={handleLogout} />

      <div className='py-20 text-center'>
        <h1 className='text-2xl mb-4'>Selamat Datang di Halaman Login</h1>
        <form className='mx-auto max-w-sm' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1'>
              Email:
            </label>
            <input type='email' id='email' className='w-full border px-3 py-2' value={email} onChange={handleEmailChange} required />
          </div>
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block mb-1'>
              Password:
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full border px-3 py-2 pr-10'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700'
                onClick={handleToggleShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Masuk
          </button>
        </form>
        <div className='text-red-500'>{errorMessage}</div>
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
