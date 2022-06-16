import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setAllProducts(json);
          console.log(allProducts);
        });
    };
    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsContextProvider };
