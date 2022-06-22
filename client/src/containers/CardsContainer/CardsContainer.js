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

  const cardButtonClick = async (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
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
  );
};

export default CardsContainer;
