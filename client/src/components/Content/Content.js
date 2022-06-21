import React, { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import Card from '../Card/Card';
import CategoriesContainer from '../CategoriesContainer/CategoriesContainer';
import './Content.css';

const Content = () => {
  const { allProducts } = useContext(ProductsContext);
  return (
    <div>
      <h1>MyCoolStore</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <CategoriesContainer></CategoriesContainer>
    </div>
  );
};

export default Content;
