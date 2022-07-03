import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card/Card';
import './CardsContainer.css';
import ProductsServices from '../../services/ProductsServices';
import ProductsContext from '../../context/productsContext';
import LoadingGif from '../../asset/loading-gif.gif';

const CardsContainer = ({ categoryId }) => {
  const { cardButtonClick } = useContext(ProductsContext);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    ProductsServices.fetchAllProductsByCategory(categoryId, 1, 3).then(
      (data) => {
        setTimeout(() => {
          setProductsByCategory(data.results.products);
          console.log(productsByCategory);
        }, 1000);
        console.log(data.products);
        setProductsByCategory(data.products);
      }
    );
  }, []);

  return (
    <>
      {(!productsByCategory && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) ||
        productsByCategory.map((product, i) => {
          return (
            <div key={i} className='product-card'>
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
