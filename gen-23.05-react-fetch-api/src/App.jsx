import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Product from './components/Product';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/:text'
            element={
              <ProtectedRoute>
                <Detail />
              </ProtectedRoute>
            }
          >
            <Route path='product' element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
