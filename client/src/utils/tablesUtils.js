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

export { dataTableParse, rowClick };
