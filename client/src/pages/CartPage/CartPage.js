import React, { useContext, useEffect, useState } from 'react';
import ProductContainer from '../../components/ProductContainer';
import SearchBar from '../../components/SearchBar';
import LoginConatiner from '../../containers/LoginConatiner/LoginConatiner';
import OrderCartContainer from '../../containers/OrderCartContainer';
import RegisterContainer from '../../containers/RegisterContainer';
import AuthContext from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import './CartPage.css';

const CartPage = () => {
  const { itemsPrice, itemsQuantity, addCartItem, cartItems } = useCart();
  const { loginModalOpen, registerModalOpen } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {(cartItems.length === 0 && <h1>Your Cart Is Empty!</h1>) ||
        (cartItems.length > 0 && (
          <div className='categoryProductsPage-container cartPage-container'>
            <OrderCartContainer
              itemsPrice={itemsPrice}
              itemsQuantity={itemsQuantity}
            ></OrderCartContainer>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {cartItems
              .filter((item) =>
                item.product.title.toLowerCase().includes(searchQuery)
              )
              .map((item, i) => {
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
      {loginModalOpen && <LoginConatiner></LoginConatiner>}
      {registerModalOpen && <RegisterContainer></RegisterContainer>}
    </div>
  );
};

export default CartPage;
