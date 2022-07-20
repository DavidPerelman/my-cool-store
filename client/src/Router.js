import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

const Router = () => {
  const { loggedIn, setLoggedIn, userData } = useContext(AuthContext);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  if (loggedIn === undefined) {
    return null;
  }

  return (
    <>
      <Navbar
        sticky='top'
        loggedIn={loggedIn}
        setRegisterSuccess={setRegisterSuccess}
        userData={userData}
      ></Navbar>
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
            {/* <Route path='/payment' element={<StripeContainer />} /> */}
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
