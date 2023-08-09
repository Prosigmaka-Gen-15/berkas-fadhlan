import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';

import Home from './pages/Home';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Product from './contents/Product';
import ProtectedRoute from './contents/ProtectedRoute';
import Admin from './pages/Admin';
import ShowProduct from './contents/ShowProduct';
import FormProduct from './contents/FormProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Cart from './pages/Cart';
import Register from './pages/Register';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
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
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
