const ProductsServices = {
  fetchProductsByCategory: (categoryId) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/categories/category/${categoryId}/products?page=1&limit=3`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data.results.results);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchAllProductsByCategory: (categoryId, page, limit) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/categories/category/${categoryId}/products?page=${page}&limit=${limit}`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data.results.results);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchProduct: (productId) => {
    console.log(productId);
    return fetch(
      `${process.env.REACT_APP_API_URL}/products/product/${productId}`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchCategoriesData: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories/categories`).then(
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
      `${process.env.REACT_APP_API_URL}/categories/categories/${categoryId}`
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
