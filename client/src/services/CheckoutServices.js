const CheckoutServices = {
  checkout: async (orderCheckout) => {
    console.log(orderCheckout);
    return await fetch(`${process.env.REACT_APP_API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderCheckout),
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: 'error' };
      }
    });
  },
};

export default CheckoutServices;
