import React from 'react';
import Button from '../../../components/Button/Button';
import './AdminNavigationBar.css';

const NavigationBar = ({
  setCustomersDisplay,
  setProductsDisplay,
  setOrdersDisplay,
}) => {
  const displayCustomersClick = () => {
    setOrdersDisplay(false);
    setProductsDisplay(false);
    setCustomersDisplay(true);
  };

  const displayProductsClick = () => {
    setOrdersDisplay(false);
    setCustomersDisplay(false);
    setProductsDisplay(true);
  };

  const displayOrdersClick = () => {
    setProductsDisplay(false);
    setCustomersDisplay(false);
    setOrdersDisplay(true);
  };

  return (
    <div className='NavigationBar'>
      <Button onClick={displayOrdersClick}>Orders</Button>
      <Button onClick={displayCustomersClick}>Customers</Button>
      <Button onClick={displayProductsClick}>Products</Button>
    </div>
  );
};

export default NavigationBar;
