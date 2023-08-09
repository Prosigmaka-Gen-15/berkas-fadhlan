import React, { useState } from 'react';
import Header from '../layouts/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Lakukan logika untuk mengirim data login ke server atau melakukan validasi di sini
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      <div className='py-20 text-center'>
        <h1 className='text-2xl mb-4'>Selamat Datang di Halaman Login</h1>
        <form className='mx-auto max-w-sm' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1'>
              Email:
            </label>
            <input type='email' id='email' className='w-full border px-3 py-2' value={email} onChange={handleEmailChange} required />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-1'>
              Password:
            </label>
            <input type='password' id='password' className='w-full border px-3 py-2' value={password} onChange={handlePasswordChange} required />
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Masuk
          </button>
        </form>
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
