import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import { useCart } from '../context/cartContext';
import ProductsServices from '../services/ProductsServices';
import './ProductPage.css';

const ProductPage = () => {
  const { cartItems, addCartItem, removeCartItem } = useCart();
  let { productId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  function checkIfExistInCart() {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product['_id'] === productId) {
        return true;
      }
    }
    return false;
  }

  const existInCart = checkIfExistInCart();

  useEffect(() => {
    ProductsServices.fetchProduct(productId).then((data) => {
      setProduct(data.product);
    });
  }, []);

  return (
    <div className='ProductPage'>
      {(!product && <h1>Loading...</h1>) || (
        <div className='product-div'>
          <div className='product-content'>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h3>{product.price}$</h3>
            {(!existInCart && (
              <Button
                color='button--primary'
                onClick={() => addCartItem(product)}
              >
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
            <img src={product.images[0]} className='product-image' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
