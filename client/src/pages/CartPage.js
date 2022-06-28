import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import { useCart } from '../context/cartContext';
import ProductsContext from '../context/productsContext';

const CartPage = () => {
  const { cardButtonClick } = useContext(ProductsContext);

  const {
    cartItems,
    addCartItemQuantity,
    removeCartItemQuantity,
    removeCartItem,
  } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {(cartItems.length === 0 && <h1>Your Cart Is Empty!</h1>) ||
        (cartItems.length > 0 && (
          <div className='categoryProductsPage-container'>
            {cartItems.map((item, i) => {
              return (
                <div key={i} className='categoryProductsPage-card product-card'>
                  <Card
                    marginBottom='marinBottom'
                    productId={item.product._id}
                    detailsSize='product-details'
                    titleSize='product-title'
                    title={item.product.title}
                    img={item.product.images[0]}
                    category={item.product.category}
                    price={item.product.price}
                    description={item.product.description}
                    color='button--primary'
                    textButton='Details & Buying'
                    onClick={cardButtonClick}
                  ></Card>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default CartPage;
