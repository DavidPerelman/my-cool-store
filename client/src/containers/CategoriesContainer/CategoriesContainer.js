import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ProductsContext from '../../context/productsContext';
import CardsContainer from '../CardsContainer/CardsContainer';
import './CategoriesContainer.css';

const CategoriesContainer = () => {
  const { categories } = useContext(ProductsContext);
  const navigate = useNavigate();

  const categoryContainerClick = (categoryId, categoryName) => {
    console.log(categoryId);
    navigate(`/category/${categoryName}/${categoryId}`);
  };

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
                <div
                  className={
                    category.name === 'Electronics'
                      ? 'CategoriesContainer-Electronics-header'
                      : 'CategoriesContainer-header'
                  }
                >
                  <h1>{category.name}</h1>
                  <Button
                    color='button--whiteGray'
                    // size={size}
                    onClick={() => {
                      categoryContainerClick(category._id, category.name);
                    }}
                  >
                    All {category.name} Products
                  </Button>
                </div>
                <div className='cards-container-div'>
                  <CardsContainer categoryId={category._id}></CardsContainer>
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
