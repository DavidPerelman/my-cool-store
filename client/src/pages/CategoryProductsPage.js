import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import AuthContext from '../context/authContext';
import ProductsServices from '../services/ProductsServices';
import './CategoryProductsPage.css';

const CategoryProductsPage = () => {
  let { categoryId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(categoryId);
    ProductsServices.fetchAllProductsByCategory(categoryId).then((data) => {
      // console.log(data);
      setProducts(data);
    });
    ProductsServices.fetchCategoryData(categoryId).then((data) => {
      console.log(data);
      setCategory(data.category.name);
    });
  }, []);

  const cardButtonClick = async (productId) => {
    console.log(productId);
    navigate(`/product/${productId}`);
  };

  return (
    <div className='CategoryProductsPage'>
      <h1>{category}</h1>
      {(!products && <h1>Loading...</h1>) || (
        <div className='categoryProductsPage-container'>
          {products.map((product, i) => {
            return (
              <div key={i} className='categoryProductsPage-card card'>
                <Card
                  marginBottom='marinBottom'
                  productId={product._id}
                  detailsSize='product-details'
                  titleSize='product-title'
                  title={product.title}
                  img={product.images[0]}
                  category={product.category}
                  price={product.price}
                  description={product.description}
                  color='button--primary'
                  textButton='Details & Buying'
                  onClick={cardButtonClick}
                ></Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
