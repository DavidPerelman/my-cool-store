import React, { useState, useEffect, useContext } from 'react';
import Card from '../Card/Card';
import './CardsContainer.css';
import { useNavigate } from 'react-router-dom';

const CardsContainer = ({ categoryId }) => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [product, setProduct] = useState({});
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

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      )
        .then((res) => res.json())
        .then((json) => {
          return json;
        });

      return response;
    } catch (err) {
      console.log(err);
      return 'error';
    }
  };

  const cardButtonClick = async (productId) => {
    const response = await fetchProduct(productId);

    if (response !== 'error') {
      navigate('/product', { state: response });
    }
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
