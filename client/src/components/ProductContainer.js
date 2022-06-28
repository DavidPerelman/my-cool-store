import React, { useContext } from 'react';
import AuthContext from '../context/authContext';
import { useCart } from '../context/cartContext';
import Button from './Button/Button';

const ProductContainer = ({ existInCart, product }) => {
  const { cartItems, addCartItem, removeCartItem } = useCart();
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className='product-div'>
      <div className='product-content'>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h3>{product.price}$</h3>
        {(!existInCart && (
          <Button color='button--primary' onClick={() => addCartItem(product)}>
            <h5 className='btn-text'>Add To Cart</h5>
          </Button>
        )) || (
          <Button
            color='button--primary'
            onClick={() => removeCartItem(product._id)}
          >
            <h5 className='btn-text'>Remove From Cart</h5>
          </Button>
        )}
        {loggedIn && (
          <Button color='button--none'>
            <h5 className='btn-text'>Add To My Wishlist</h5>
          </Button>
        )}
      </div>
      <div className='product-image-div'>
        <img src={product.images[0]} className='product-image' alt='Avatar' />
      </div>
    </div>
  );
};

export default ProductContainer;
