import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card/Card';
import './CardsContainer.css';
import ProductsServices from '../../services/ProductsServices';
import ProductsContext from '../../context/productsContext';

const CardsContainer = ({ categoryId }) => {
  const { cardButtonClick } = useContext(ProductsContext);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    ProductsServices.fetchProductsByCategory(categoryId).then((data) => {
      console.log(data.products);
      setProductsByCategory(data.products);
    });
  }, []);

  return (
    <>
      {productsByCategory.map((product, i) => {
        return (
          <div key={i} className='product-card'>
            {/* <Card product={product} /> */}
            <Card
              productId={product._id}
              detailsSize='product-details'
              titleSize='product-title'
              title={product.title}
              img={product.images[0]}
              category={product.category}
              price={product.price}
              description={product.description}
              color='button--primary'
              // size='user-popover-button'
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
