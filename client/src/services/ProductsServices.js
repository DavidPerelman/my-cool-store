const ProductsServices = {
  fetchProductsByCategory: (categoryId) => {
    return fetch(
      `${process.env.REACT_APP_api_URL}/categories/category/${categoryId}/productsLimits`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data.products);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchAllProductsByCategory: (categoryId) => {
    return fetch(
      `${process.env.REACT_APP_api_URL}/categories/category/${categoryId}/products`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data.products);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchProduct: (productId) => {
    console.log(productId);
    return fetch(
      `${process.env.REACT_APP_api_URL}/products/product/${productId}`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchCategoriesData: () => {
    return fetch(`${process.env.REACT_APP_api_URL}/categories/categories`).then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } else {
          return { message: 'error' };
        }
      }
    );
  },
  fetchCategoryData: (categoryId) => {
    return fetch(
      `${process.env.REACT_APP_api_URL}/categories/categories/${categoryId}`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
};

export default ProductsServices;
