const router = require('express').Router();
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { createId } = require('../services/OrderServices');

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body;

    const order = await new Order({
      orderNumber: await createId(),
      user: orderData.user,
      products: orderData.products,
      totalPayment: orderData.totalPayment,
    }).save();

    res.json(order._id);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/order/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // get single product
    const order = await Order.findById(orderId)
      .populate('products.product')
      .exec();

    res.json({ order: order });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // get single product
    const orders = await Order.find({ user: userId })
      .populate('products.product')
      .exec();

    res.json({ orders: orders });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
