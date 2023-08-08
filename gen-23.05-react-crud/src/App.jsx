import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Product from './contents/Product';
import ProtectedRoute from './contents/ProtectedRoute';
import Admin from './pages/Admin';
import ShowProduct from './contents/ShowProduct';
import FormProduct from './contents/FormProduct';
import AdminEditProduct from './pages/AdminEditProduct';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:name' element={<Detail />}>
            <Route path='product' element={<Product />} />
          </Route>
          <Route
            path='/admin/*'
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path='/showProduct' element={<ShowProduct />} />
          <Route path='/formProduct' element={<FormProduct />} />
          <Route path='/editProduct/:id' element={<AdminEditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
