import React from 'react';
import Header from '../layouts/Header';

export default function Login() {
  return (
    <>
      {/* header */}
      <Header registerText='Daftar' loginText='Masuk' />

      <h1 className='py-20 text-center text-2xl'>Ini Halaman Login</h1>
    </>
  );
}
