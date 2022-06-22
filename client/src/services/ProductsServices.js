const url = 'https://api.escuelajs.co/';

const ProductsServices = {
  fetchProductsByCategory: (categoryId) => {
    return fetch(
      `${url}api/v1/categories/${categoryId}/products?offset=0&limit=3`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchProduct: (productId) => {
    return fetch(`${url}api/v1/products/${productId}`).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  fetchCategoriesData: () => {
    return fetch(`${url}api/v1/categories`).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
};

export default ProductsServices;
