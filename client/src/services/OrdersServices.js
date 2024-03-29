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
  getAllOrders: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/orders/orders`).then(
      (res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } else {
          return { message: 'error' };
        }
      }
    );
  },
  getOrder: (orderId) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/orders/order/${orderId}`
    ).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
  getUserOrders: (userId) => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/orders/orders/${userId}`
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
  updateOrder: async (orderId, orderData, totalPayment) => {
    console.log(orderId);
    return await fetch(
      `${process.env.REACT_APP_API_URL}/orders/order/${orderId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData: orderData,
          totalPayment: totalPayment,
        }),
      }
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
