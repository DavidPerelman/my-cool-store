import React, { useContext, useEffect, useState } from 'react';
import ProductContainer from '../../components/ProductContainer';
import OrderCartContainer from '../../containers/OrderCartContainer';
import { useCart } from '../../context/cartContext';
import './CartPage.css';

const CartPage = () => {
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();

  return (
    <div>
      {(cartItems.length === 0 && <h1>Your Cart Is Empty!</h1>) ||
        (cartItems.length > 0 && (
          <div className='categoryProductsPage-container cartPage-container'>
            <OrderCartContainer
              itemsPrice={itemsPrice}
              itemsQuantity={itemsQuantity}
            ></OrderCartContainer>
            {cartItems.map((item, i) => {
              return (
                <div key={i}>
                  <ProductContainer
                    product={item.product}
                    existInCart={true}
                    addCartItem={addCartItem}
                  ></ProductContainer>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default CartPage;
