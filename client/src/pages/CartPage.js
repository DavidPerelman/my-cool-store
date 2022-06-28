import React, { useContext } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import ProductContainer from '../components/ProductContainer';
import { useCart } from '../context/cartContext';
import ProductsContext from '../context/productsContext';
import './CartPage.css';
import ProductPage from './ProductPage';

const CartPage = () => {
  const { cardButtonClick } = useContext(ProductsContext);

  //   const existInCart = checkIfExistInCart(productId);

  const {
    addCartItem,
    cartItems,
    checkIfExistInCart,
    removeCartItemQuantity,
    removeCartItem,
  } = useCart();

  return (
    <div>
      {(cartItems.length === 0 && <h1>Your Cart Is Empty!</h1>) ||
        (cartItems.length > 0 && (
          <div className='categoryProductsPage-container cartPage-container'>
            {/* <h1>Check Out</h1> */}
            <div>
              <Button>Check Out</Button>
            </div>
            {cartItems.map((item, i) => {
              return (
                <div key={i}>
                  <ProductContainer
                    product={item.product}
                    existInCart={true}
                    addCartItem={addCartItem}
                  ></ProductContainer>
                </div>
                // <div key={i} className='product-div'>
                //   <Card
                //     marginBottom='marinBottom'
                //     productId={item.product._id}
                //     detailsSize='product-details'
                //     titleSize='product-title'
                //     title={item.product.title}
                //     img={item.product.images[0]}
                //     category={item.product.category}
                //     price={item.product.price}
                //     description={item.product.description}
                //     color='button--primary'
                //     textButton='Details & Buying'
                //     onClick={cardButtonClick}
                //   ></Card>
                // </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default CartPage;
