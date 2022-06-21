import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import './ProductPage.css';

const ProductPage = () => {
  const { loggedIn } = useContext(AuthContext);
  const { state } = useLocation();
  console.log(state);

  const [item, setItem] = useState(null);

  useEffect(() => {
    // load product
  }, []);

  //todo:  render spinner when load product

  return (
    <div className='ProductPage'>
      <div className='product-div'>
        <div className='product-content'>
          <h1>{state.title}</h1>
          <p>{state.description}</p>
          <h3>{state.price}$</h3>
          <Button color='button--primary'>
            <h5 className='btn-text'>Add To Cart</h5>
          </Button>
          {loggedIn && (
            <Button color='button--none'>
              <h5 className='btn-text'>Add To My Wishlist</h5>
            </Button>
          )}
        </div>
        <div className='product-image-div'>
          <img src={state.images[0]} className='product-image' />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
