import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsServices from '../../services/ProductsServices';
import './NavbarInput.css';

const NavbarInput = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    ProductsServices.fetchAllProducts().then((data) => {
      setAllProducts(data.products);
    });
  }, []);

  const handleFilter = (e) => {
    const searchQuery = e.target.value;
    setInputValue(searchQuery);
    const newFilter = allProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (searchQuery === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const productClick = (productId) => {
    setFilteredData([]);
    setInputValue('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className='search'>
        <div className='search-input'>
          <input
            className='search-products-input'
            type='text'
            placeholder='Search...'
            value={inputValue}
            onChange={handleFilter}
          />
        </div>
        {filteredData.length !== 0 && (
          <div className='data-results'>
            {filteredData.map((product, i) => {
              return (
                <div
                  key={i}
                  className='data-item'
                  onClick={() => productClick(product._id)}
                >
                  <p>{product.title}</p>
                  <p className='product-price-p'>{product.price}$</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* <input
        className='navbar-input'
        placeholder='Search...'
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />

      <div>
        <p style={{ backgroundColor: 'white', color: 'black' }}>dsd</p>
      </div>

      <ul className='products-list'>
        <li style={{ backgroundColor: 'white', color: 'black' }}>dsd</li>
      </ul> */}
    </>
  );
};

export default NavbarInput;
