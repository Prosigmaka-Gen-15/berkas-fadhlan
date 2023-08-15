import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';

import Home from './pages/Home';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Product from './contents/Product';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import Admin from './pages/Admin';
import ShowProduct from './contents/ShowProduct';
import FormProduct from './contents/FormProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import Cart from './pages/Cart';
import Register from './pages/Register';
import CheckoutPage from './pages/CheckoutPage';
import OverviewPopup from './pages/OverviewPopup';
import AdminShowTransaction from './pages/AdminShowTransaction';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import AdminShowAccount from './pages/AdminShowAccount';
import AdminEditAccount from './pages/AdminEditAccount';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/:name' element={<Detail />}>
              <Route path='product' element={<Product />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/admin/' element={<Admin />} />
              <Route path='/showAccount' element={<AdminShowAccount />} />
              <Route path='/editAccount/:id' element={<AdminEditAccount />} />

              <Route path='/showProduct' element={<ShowProduct />} />
              <Route path='/formProduct' element={<FormProduct />} />
              <Route path='/editProduct/:id' element={<AdminEditProduct />} />
              <Route path='/showTransaction' element={<AdminShowTransaction />} />
              <Route path='/transactionDetails/:id' element={<TransactionDetailsPage />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/overview' element={<OverviewPopup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
