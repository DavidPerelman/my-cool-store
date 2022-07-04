const OrdersServices = {
  createOrder: async (orderData) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/orders/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
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

export default OrdersServices;
