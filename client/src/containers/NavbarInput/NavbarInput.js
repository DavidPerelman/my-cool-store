import React, { useEffect, useState, useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import ProductsServices from '../../services/ProductsServices';
import './NavbarInput.css';

const NavbarInput = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { cardButtonClick } = useContext(ProductsContext);

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
    cardButtonClick(productId);
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
    </>
  );
};

export default NavbarInput;
