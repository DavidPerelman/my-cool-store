import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuthContext from './context/authContext';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage/ProductPage';
import CategoryProductsPage from './pages/CategoryProductsPage/CategoryProductsPage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';

const Router = () => {
  const { loggedIn, setLoggedIn, userData } = useContext(AuthContext);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <>
      <Navbar
        sticky='top'
        loggedIn={loggedIn}
        setRegisterSuccess={setRegisterSuccess}
        userData={userData}
      ></Navbar>
      <Routes>
        {loggedIn === undefined && (
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
            <Route path='/order/:orderId' element={<OrderPage />} />
            <Route path='/cart' element={<CartPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
