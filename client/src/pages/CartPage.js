import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import ProductContainer from '../components/ProductContainer';
import { useCart } from '../context/cartContext';
import './CartPage.css';

const CartPage = () => {
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();

  return (
    <div>
      {(cartItems.length === 0 && <h1>Your Cart Is Empty!</h1>) ||
        (cartItems.length > 0 && (
          <div className='categoryProductsPage-container cartPage-container'>
            <div className='order-div'>
              <h1>Your Order</h1>
              <div className='order-details'>
                <p className='order-paragraphs'>
                  Items Quantity: {itemsQuantity}
                </p>
                <p className='order-paragraphs'>Pay: {itemsPrice}$</p>
                <Button>Order</Button>
              </div>
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
