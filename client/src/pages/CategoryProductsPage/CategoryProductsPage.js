import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductsServices from '../../services/ProductsServices';
import ProductsContext from '../../context/productsContext';
import './CategoryProductsPage.css';
import Button from '../../components/Button/Button';
import LoadingGif from '../../asset/loading-gif.gif';
import Container from '../../components/Container/Container';
import NewCard from '../../components/NewCard/NewCard';

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
    <Container>
      <h1>{categoryName}</h1>
      {(!products && (
        <div className='loading-gif'>
          <img src={LoadingGif} alt='loading...' />
        </div>
      )) || (
        <div className='categoryProductsPage-container'>
          {products.map((product, i) => {
            return (
              <NewCard key={i} img={product.images[0]} title={product.title}>
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
              </NewCard>
            );
          })}
        </div>
      )}
      {loading && (
        <div style={{ marginTop: '10px' }}>
          <Button
            size='order-buttons'
            color='button--primary'
            className='more-products-button'
            onClick={loadMoreProducts}
          >
            More Products
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CategoryProductsPage;
