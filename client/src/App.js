import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { AuthContextProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { ProductsContextProvider } from './context/productsContext';
import Router from './Router';
import Navbar from './components/Navbar/Navbar';

axios.defaults.withCredentials = true;

function App({ loggedIn, userData }) {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <>
      {/* <Navbar
        sticky='top'
        loggedIn={loggedIn}
        setRegisterSuccess={setRegisterSuccess}
        userData={userData}
      ></Navbar> */}
      <ProductsContextProvider>
        <CartProvider>
          <div className='App'>
            <Router />
          </div>
        </CartProvider>
      </ProductsContextProvider>
    </>
  );
}

export default App;
