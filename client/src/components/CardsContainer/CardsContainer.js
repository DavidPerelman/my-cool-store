import React, { useState, useEffect, useContext } from 'react';
import Card from '../Card/Card';
import './CardsContainer.css';
import { useNavigate } from 'react-router-dom';

const CardsContainer = ({ categoryId }) => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const products = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      )
        .then((res) => res.json())
        .then((json) => {
          setProductsByCategory(json.slice(0, 3));
        });
    };

    fetchProductsByCategory();
  }, []);

  const cardButtonClick = (productId) => {
    navigate('/product', {
      state: {
        productId: productId,
      },
    });
    console.log(productId);
  };

  return (
    // <div className='cards-container'>
    <>
      {productsByCategory.map((product, i) => {
        return (
          <div key={i} className='card'>
            <Card
              productId={product.id}
              detailsSize='product-details'
              titleSize='product-title'
              title={product.title}
              img={product.images[0]}
              category={product.category['name']}
              price={product.price}
              description={product.description}
              color='button--primary'
              size='user-popover-button'
              textButton='Details & Buying'
              onClick={cardButtonClick}
            ></Card>
          </div>
        );
      })}
    </>
    // </div>
  );
};

export default CardsContainer;
