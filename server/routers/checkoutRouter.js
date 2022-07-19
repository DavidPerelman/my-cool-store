const router = require('express').Router();
const Product = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const orderPayment = req.body.orderPayment;
  try {
    // get all products
    console.log(orderPayment);
    // res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/', async (req, res) => {
  try {
    res.send('<h1>Checkout!</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
