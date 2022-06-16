import React, { useContext } from 'react';
import ProductsContext from '../context/productsContext';

const Content = () => {
  const { allProducts } = useContext(ProductsContext);
  console.log(allProducts);
  return <div>Content</div>;
};

export default Content;
