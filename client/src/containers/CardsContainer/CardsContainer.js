import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card/Card';
import './CardsContainer.css';
import { useNavigate } from 'react-router-dom';
import ProductsServices from '../../services/ProductsServices';

const CardsContainer = ({ categoryId }) => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    ProductsServices.fetchProductsByCategory(categoryId).then((data) => {
      setProductsByCategory(data);
    });
  }, []);

  const fetchProduct = async (productId) => {
    ProductsServices.fetchProduct(productId).then((data) => {
      return data;
    });
  };

  const cardButtonClick = async (productId) => {
    const response = await fetchProduct(productId);

    if (response !== 'error') {
      navigate(`/product/${productId}`, { state: response });
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
