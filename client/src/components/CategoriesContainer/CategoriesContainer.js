import React, { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import CardsContainer from '../CardsContainer/CardsContainer';
import './CategoriesContainer.css';

const CategoriesContainer = () => {
  const { allProducts, categories } = useContext(ProductsContext);
  console.log(categories);

  return (
    <>
      {(!categories && (
        <div>
          <h1>Loading...</h1>
        </div>
      )) || (
        <>
          {categories.map((category, i) => {
            return (
              <div key={i} className='CategoriesContainer'>
                <h1>{category}</h1>
                <div className='cards-container-div'>
                  <CardsContainer category={category}></CardsContainer>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default CategoriesContainer;
