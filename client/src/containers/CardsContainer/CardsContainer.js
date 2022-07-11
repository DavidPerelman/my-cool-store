import React, { useState, useEffect, useContext } from 'react';
import './CardsContainer.css';
import ProductsServices from '../../services/ProductsServices';
import ProductsContext from '../../context/productsContext';
import LoadingGif from '../../asset/loading-gif.gif';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const CardsContainer = ({ categoryId }) => {
  const { cardButtonClick } = useContext(ProductsContext);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    ProductsServices.fetchAllProductsByCategory(categoryId, 1, 4).then(
      (data) => {
        setTimeout(() => {
          setProductsByCategory(data.results.products);
        }, 1000);
        setProductsByCategory(data.products);
      }
    );
  }, []);

  return (
    <div className='cards-container'>
      {(!productsByCategory && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) ||
        productsByCategory.map((product, i) => {
          return (
            <Card key={i} img={product.images[0]} title={product.title}>
              <div className='title-div'>
                <h5>{product.title}</h5>
              </div>
              <div className='price-div'>
                <p className='bold-text'>Price:</p>
                <p>{product.price}$</p>
              </div>

              <Button
                onClick={() => {
                  cardButtonClick(product._id);
                }}
              >
                Details & Buying
              </Button>
            </Card>
          );
        })}
    </div>
  );
};

export default CardsContainer;
