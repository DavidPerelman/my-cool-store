import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ProductContainer from '../../components/ProductContainer';
import AuthContext from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import ProductsServices from '../../services/ProductsServices';
import LoadingGif from '../../asset/loading-gif.gif';
import LoginConatiner from '../../containers/LoginConatiner/LoginConatiner';
import './ProductPage.css';
import RegisterContainer from '../../containers/RegisterContainer';

const ProductPage = () => {
  const { cartItems, addCartItem, removeCartItem, checkIfExistInCart } =
    useCart();
  let { productId } = useParams();
  const { loginModalOpen, registerModalOpen } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductsServices.fetchProduct(productId).then((data) => {
      setProduct(data.product);
    });
  }, []);

  const existInCart = checkIfExistInCart(productId);

  return (
    <div className='ProductPage'>
      {(!product && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <ProductContainer
          product={product}
          existInCart={existInCart}
          addCartItem={addCartItem}
        ></ProductContainer>
        // <div className='product-div'>
        //   <div className='product-content'>
        //     <h1>{product.title}</h1>
        //     <p>{product.description}</p>
        //     <h3>{product.price}$</h3>
        //     {(!existInCart && (
        //       <Button
        //         color='button--primary'
        //         onClick={() => addCartItem(product)}
        //       >
        //         <h5 className='btn-text'>Add To Cart</h5>
        //       </Button>
        //     )) || (
        //       <Button
        //         color='button--primary'
        //         onClick={() => removeCartItem(product._id)}
        //       >
        //         <h5 className='btn-text'>Remove From Cart</h5>
        //       </Button>
        //     )}
        //     {loggedIn && (
        //       <Button color='button--none'>
        //         <h5 className='btn-text'>Add To My Wishlist</h5>
        //       </Button>
        //     )}
        //   </div>
        //   <div className='product-image-div'>
        //     <img
        //       src={product.images[0]}
        //       className='product-image'
        //       alt='Avatar'
        //     />
        //   </div>
        // </div>
      )}
      {loginModalOpen && <LoginConatiner></LoginConatiner>}
      {registerModalOpen && <RegisterContainer></RegisterContainer>}
    </div>
  );
};

export default ProductPage;
