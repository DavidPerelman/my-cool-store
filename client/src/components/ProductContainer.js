import React, { useContext } from 'react';
import CartQuantityCounter from '../containers/CartQuantityCounter';
import AuthContext from '../context/authContext';
import { useCart } from '../context/cartContext';
import Button from './Button/Button';
import './ProductContainer.css';

const ProductContainer = ({ existInCart, product }) => {
  const { cartItems, addCartItem, removeCartItem } = useCart();
  const { loggedIn } = useContext(AuthContext);
  console.log(cartItems);
  console.log(product._id);
  console.log(cartItems.includes(product._id));

  const result = cartItems.filter((item) => item.product._id === product._id);

  console.log(result[0].quantity);

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
          <>
            {' '}
            <div className='quantity-div'>
              <h4>Quantity: </h4>
              <CartQuantityCounter
                item={{ product: product, quantity: result[0].quantity }}
              ></CartQuantityCounter>
            </div>
            <Button
              color='button--primary'
              onClick={() => removeCartItem(product._id)}
            >
              <h5 className='btn-text'>Remove From Cart</h5>
            </Button>
          </>
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
