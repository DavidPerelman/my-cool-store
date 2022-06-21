import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
import AuthContext from '../context/authContext';
import './ProductPage.css';

const ProductPage = () => {
  const { loggedIn } = useContext(AuthContext);
  let { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      )
        .then((res) => res.json())
        .then((json) => {
          setProduct(json);
        });
    };

    fetchProduct();
  }, []);

  return (
    <div className='ProductPage'>
      {(!product && <h1>Loading...</h1>) || (
        <div className='product-div'>
          <div className='product-content'>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h3>{product.price}$</h3>
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
            <img src={product.images[0]} className='product-image' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
