import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductPage = (props) => {
  const { state } = useLocation();
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log(state.productId);
    const fetchProduct = async () => {
      const product = await fetch(
        `https://api.escuelajs.co/api/v1/products/${state.productId}`
      )
        .then((res) => res.json())
        .then((json) => {
          setProduct(json);
        });
    };

    fetchProduct();
  }, []);

  console.log(product);
  return <div>ProductPage</div>;
};

export default ProductPage;
