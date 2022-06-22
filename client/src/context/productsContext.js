import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductsServices from '../services/ProductsServices';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    ProductsServices.fetchCategoriesData().then((data) => {
      setCategories(data);
    });

    // const fetchProductsData = async () => {
    //   const products = await fetch('https://api.escuelajs.co/api/v1/products')
    //     .then((res) => res.json())
    //     .then((json) => {
    //       setAllProducts(json);
    //     });
    // };

    // fetchProductsData();
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts, categories }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsContextProvider };
