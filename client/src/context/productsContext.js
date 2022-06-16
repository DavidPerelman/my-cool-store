import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const products = await fetch(
        'https://fakestoreapi.com/products/categories'
      )
        .then((res) => res.json())
        .then((json) => {
          setCategories(json);
        });
    };

    fetchCategoriesData();

    const fetchProductsData = async () => {
      const products = await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          setAllProducts(json);
        });
    };

    fetchProductsData();
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts, categories }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsContextProvider };
