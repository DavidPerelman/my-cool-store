import React, { useContext } from 'react';
import ProductsContext from '../context/productsContext';

const Content = () => {
  const { allProducts } = useContext(ProductsContext);
  console.log(allProducts);
  return (
    <>
      {(!allProducts && (
        <div>
          <h1>Loading Products!</h1>
        </div>
      )) || (
        <div>
          {allProducts.map((product, i) => {
            return <h1 key={i}>{product.title}</h1>;
          })}
        </div>
      )}
    </>
  );
};

export default Content;
