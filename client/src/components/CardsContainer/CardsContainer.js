import React, { useState, useEffect, useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import Card from '../Card/Card';
import './CardsContainer.css';

const CardsContainer = ({ category }) => {
  const { allProducts } = useContext(ProductsContext);
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const products = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      )
        .then((res) => res.json())
        .then((json) => {
          setProductsByCategory(json.slice(0, 3));
        });
    };

    fetchProductsByCategory();
  }, []);
  console.log(productsByCategory);

  return (
    // <div className='cards-container'>
    <>
      {productsByCategory.map((product, i) => {
        return (
          <>
            <div key={i} className='card'>
              <Card
                detailsSize='product-details'
                titleSize='product-title'
                title={product.title}
                img={product.image}
                category={product.category}
                rating={product.rating}
                price={product.price}
              ></Card>
            </div>
          </>
        );
      })}
    </>
    // </div>
  );
};

export default CardsContainer;
