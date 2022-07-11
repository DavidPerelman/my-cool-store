import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import NewButton from '../../components/NewButton/NewButton';
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
    <div className='CategoriesContainer'>
      {(!categories && <div>{''}</div>) || (
        <>
          {categories.map((category, i) => {
            return (
              <div key={i}>
                <Container>
                  <h1>{category.name}</h1>
                  <NewButton
                    size='all-category-cards-button'
                    color='button--whiteGray'
                    onClick={() => {
                      categoryContainerClick(category._id, category.name);
                    }}
                  >
                    All {category.name} Products
                  </NewButton>
                  <CardsContainer
                    categoryId={category._id}
                    apiQuantity={4}
                  ></CardsContainer>
                </Container>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CategoriesContainer;
