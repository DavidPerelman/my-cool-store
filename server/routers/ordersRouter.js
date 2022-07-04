const router = require('express').Router();
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body;
    console.log(orderData);

    const order = await new Order({
      user: orderData.user,
      products: orderData.products,
      totalProductsQuantity: orderData.totalProductsQuantity,
      totalPayment: orderData.totalPayment,
    }).save();

    console.log(order);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
