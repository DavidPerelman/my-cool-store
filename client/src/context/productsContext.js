import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState(undefined);

  const getAllProducts = async () => {
    const allProductsRes = await axios.get('https://fakestoreapi.com/products');
    setAllProducts(allProductsRes);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ getAllProducts, allProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
export { ProductsContextProvider };
