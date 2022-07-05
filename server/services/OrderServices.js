const Order = require('../models/orderModel');

const createId = async () => {
  const ordersLength = await Order.find({}).countDocuments().exec();

  console.log(ordersLength);
  let date_ob = new Date();

  let date = ('0' + date_ob.getDate()).slice(-2);
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  return `${date}${hours}${minutes}${seconds}${ordersLength + 1}`;
};

module.exports = {
  createId,
};
