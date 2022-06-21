import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const products = await fetch('https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((json) => {
          setCategories(json);
        });
    };

    fetchCategoriesData();

    const fetchProductsData = async () => {
      const products = await fetch('https://api.escuelajs.co/api/v1/products')
        .then((res) => res.json())
        .then((json) => {
          setAllProducts(json);
          console.log(json);
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
