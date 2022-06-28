import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductsServices from '../services/ProductsServices';
import { useNavigate } from 'react-router-dom';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    ProductsServices.fetchCategoriesData().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  const cardButtonClick = async (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ProductsContext.Provider
      value={{ allProducts, categories, cardButtonClick }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsContextProvider };
