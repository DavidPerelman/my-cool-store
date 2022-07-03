import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import AuthContext from '../context/authContext';
import ProductsServices from '../services/ProductsServices';
import ProductsContext from '../context/productsContext';
import './CategoryProductsPage.css';
import Button from '../components/Button/Button';

const CategoryProductsPage = () => {
  let { categoryId, categoryName } = useParams();
  const { cardButtonClick } = useContext(ProductsContext);
  const [products, setProducts] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    ProductsServices.fetchAllProductsByCategory(categoryId, 1, 10).then(
      (data) => {
        setTimeout(() => {
          setNextPage(data.next.page);
          setProducts(data.results.products);
          setLoading(true);
          console.log(data);
        }, 1000);
      }
    );
  }, []);

  const loadMoreProducts = () => {
    setLoading(false);
    ProductsServices.fetchAllProductsByCategory(categoryId, nextPage, 10).then(
      (data) => {
        if (data.results.page * 10 < data.results.productsLength) {
          setLoading(true);
          setNextPage(data.next.page);
        } else {
          setLoading(false);
        }

        setProducts(products.concat(data.results.products));
      }
    );
  };

  return (
    <div className='CategoryProductsPage'>
      <h1>{categoryName}</h1>
      {(!products && <h1>Loading...</h1>) || (
        <div className='categoryProductsPage-container'>
          {products.map((product, i) => {
            return (
              <div key={i} className='categoryProductsPage-card product-card'>
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
      {loading && (
        <Button
          color='button--primary'
          className='more-products-button'
          onClick={loadMoreProducts}
        >
          More Products
        </Button>
      )}
    </div>
  );
};

export default CategoryProductsPage;
