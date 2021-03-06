import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductsServices from '../../services/ProductsServices';
import ProductsContext from '../../context/productsContext';
import './CategoryProductsPage.css';
import Button from '../../components/Button/Button';
import LoadingGif from '../../asset/loading-gif.gif';
import Container from '../../components/Container/Container';
import Card from '../../components/Card/Card';
import AuthContext from '../../context/authContext';
import LoginConatiner from '../../containers/LoginConatiner/LoginConatiner';
import RegisterContainer from '../../containers/RegisterContainer';
import SearchBar from '../../components/SearchBar/SearchBar';

const CategoryProductsPage = () => {
  let { categoryId, categoryName } = useParams();
  const { cardButtonClick } = useContext(ProductsContext);
  const { loginModalOpen, registerModalOpen } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(false);
    ProductsServices.fetchAllProductsByCategory(categoryId, 1, 10).then(
      (data) => {
        setTimeout(() => {
          setNextPage(data.next.page);
          setProducts(data.results.products);
          setLoading(true);
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
    <>
      <Container>
        <h1>{categoryName}</h1>
        {(!products && (
          <div className='loading-gif'>
            <img src={LoadingGif} alt='loading...' />
          </div>
        )) || (
          <>
            {/* <input
              placeholder='Search...'
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            /> */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div
              className='categoryProductsPage-container'
              style={{ marginTop: '15px' }}
            >
              {products
                .filter((product) =>
                  product.title.toLowerCase().includes(searchQuery)
                )
                .map((product, i) => {
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
          </>
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
      {loginModalOpen && <LoginConatiner></LoginConatiner>}
      {registerModalOpen && <RegisterContainer></RegisterContainer>}
    </>
  );
};

export default CategoryProductsPage;
