const dataTableParse = (data) => {
  console.log(data);

  const manipulatedData = data.orders.map((dataObject) => {
    const { _id, orderNumber, created, status, totalPayment } = dataObject;
    return { _id, orderNumber, created, status, totalPayment };
  });

  return manipulatedData;
};

const rowClick = (type, orderId) => {
  if (type === 'userOrders') {
    console.log('userOrdersClick');
    console.log(type);
    console.log(orderId);
  }
};

export { dataTableParse, rowClick };
