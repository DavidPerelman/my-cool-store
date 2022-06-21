import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = (props) => {
  const { state } = useLocation();

  useEffect(() => {}, []);

  console.log(state);

  return (
    <div className='ProductPage'>
      <div className='product-div'>
        <div className='product-content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className='product-image-div'>
          <img src={state.images[0]} className='product-image' />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
