import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
      username: name,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      console.log('Response:', response.data);

      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {/* Header */}
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='py-20 text-center'>
        <h1 className='text-2xl mb-4'>Daftar Akun Baru</h1>
        <form className='mx-auto max-w-sm' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1'>
              Nama:
            </label>
            <input type='text' id='name' className='w-full border px-3 py-2' value={name} onChange={handleNameChange} required />
          </div>
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
            Daftar
          </button>
        </form>
        <div className='text-red-500'>{errorMessage}</div>
        <p className='mt-4'>
          Sudah memiliki akun?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Masuk di sini
          </Link>
        </p>
      </div>
    </>
  );
}
