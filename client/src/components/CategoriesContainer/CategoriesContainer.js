import React, { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import './CategoriesContainer.css';

const CategoriesContainer = () => {
  const { allProducts, categories } = useContext(ProductsContext);
  console.log(categories);
  const numOfContainers = categories.length;
  console.log(numOfContainers);

  return (
    <>
      {categories.map((category, i) => {
        return (
          <div key={i} className='CategoriesContainer'>
            <h1>{category}</h1>
            <div className='cards-container'>
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CategoriesContainer;
