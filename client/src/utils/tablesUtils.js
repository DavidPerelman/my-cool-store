const dataTableParse = (type, data) => {
  console.log(type);
  if (type === 'userOrders') {
    const manipulatedData = data.orders.map((dataObject) => {
      const { _id, orderNumber, created, status, totalPayment } = dataObject;
      return { _id, orderNumber, created, status, totalPayment };
    });

    return manipulatedData;
  }
  if (type === 'order') {
    console.log(data);
    const manipulatedData = data.map((dataObject) => {
      const { title, price } = dataObject.product;
      return {
        title,
        price,
        quantity: dataObject.productQuantity,
        totalPayment: dataObject.productQuantity * price,
      };
    });
    console.log(manipulatedData);

    return manipulatedData;
  }
};

const rowClick = (type, orderId) => {
  if (type === 'userOrders') {
    console.log('userOrdersClick');
    console.log(type);
    console.log(orderId);
  }
};

const parseRows = (data) => {
  const orderData = data.order;
  console.log(orderData);

  let rows = [];

  // setTimeout(() => {
  for (let i = 0; i < orderData.products.length; i++) {
    // console.log(orderData.products[i]);
    // for (let z = 0; z < orderData.products[i].product.length; z++) {
    //   console.log(orderData.products[i].product);
    // }
    let item = {
      id: i + 1,
      title: orderData.products[i].product.title,
      price: orderData.products[i].product.price,
      quantity: orderData.products[i].productQuantity,
      total: orderData.products[i].totalPrice,
    };
    rows.push(item);
  }

  return rows;
  console.log(rows);

  // }, 3000);
};

export { dataTableParse, rowClick, parseRows };
