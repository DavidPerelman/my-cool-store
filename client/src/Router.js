import React, { useContext, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './context/authContext';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage/ProductPage';
import CategoryProductsPage from './pages/CategoryProductsPage/CategoryProductsPage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';
import Order from './pages/Order/Order';
import MyOrders from './pages/MyOrders/MyOrders';
import RegisterConfirm from './pages/RegisterConfirm';
import RegisterSuccess from './pages/RegisterSuccess';
import SuccessPayment from './pages/SuccessPayment';
import PaymentSuccess from './pages/PaymentSuccess';
import Admin from './admin/pages/Admin/Admin';
import AdminLogin from './admin/pages/AdminLogin';
import ManageProducts from './admin/pages/ManageProducts/ManageProducts';
import ManageCustomers from './admin/pages/ManageCustomers';
import ManageOrders from './admin/pages/ManageOrders/ManageOrders';
import AdminNavbar from './admin/containers/Navbar/Navbar.js';
import AdminServices from './services/AdminServices';

const Router = () => {
  const location = useLocation();
  const {
    loggedIn,
    isAdminlLoggedIn,
    setIsAdminlLoggedIn,
    getIsAdminlsLoggedIn,
    setLoggedIn,
    userData,
  } = useContext(AuthContext);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  if (loggedIn === undefined) {
    return null;
  }

  if (isAdminlLoggedIn === undefined) {
    return null;
  }

  const logout = async () => {
    try {
      console.log('logout');
      const res = await AdminServices.logout();
      await getIsAdminlsLoggedIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {location.pathname.includes('admin') ? (
        <AdminNavbar logout={logout}></AdminNavbar>
      ) : (
        <Navbar
          sticky='top'
          loggedIn={loggedIn}
          setRegisterSuccess={setRegisterSuccess}
          userData={userData}
        ></Navbar>
      )}
      <Routes>
        {loggedIn === false && (
          <>
            <Route
              exact
              path='/'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route path='/product/:productId' element={<ProductPage />} />
            <Route path='/confirmRegister' element={<RegisterConfirm />} />
            <Route
              path='/registerSuccess/:userName'
              element={<RegisterSuccess />}
            />
            <Route
              path='/category/:categoryName/:categoryId'
              element={<CategoryProductsPage />}
            />
            <Route path='/cart' element={<CartPage />} />
          </>
        )}
        {loggedIn === true && (
          <>
            <Route
              exact
              path='/'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route
              path='/:status/:userName'
              element={
                <Home
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route path='/product/:productId' element={<ProductPage />} />
            <Route
              path='/category/:categoryName/:categoryId'
              element={<CategoryProductsPage />}
            />
            {/* <Route path='/order/:orderId' element={<OrderPage />} /> */}
            <Route path='/order/:orderId' element={<Order />} />
            <Route path='/orders/:userId' element={<MyOrders />} />
            <Route path='/cart' element={<CartPage />} />
            <Route
              path='/order/paymentSuccess/:paymentId/:orderId'
              element={<PaymentSuccess />}
            />
            {/* <Route path='/payment' element={<StripeContainer />} /> */}
          </>
        )}

        {(isAdminlLoggedIn === true && (
          <>
            <Route
              exact
              path='/admin'
              element={
                <Admin
                  isAdminlLoggedIn={isAdminlLoggedIn}
                  setIsAdminlLoggedIn={setIsAdminlLoggedIn}
                  userData={userData}
                />
              }
            />
            <Route path='/admin/manage-products' element={<ManageProducts />} />
            <Route
              path='/admin/manage-customers'
              element={<ManageCustomers />}
            />
            <Route path='/admin/manage-orders' element={<ManageOrders />} />
          </>
        )) || (
          <>
            <Route
              exact
              path='/admin'
              element={
                <AdminLogin
                  isAdminlLoggedIn={isAdminlLoggedIn}
                  setIsAdminlLoggedIn={setIsAdminlLoggedIn}
                  userData={userData}
                />
              }
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
